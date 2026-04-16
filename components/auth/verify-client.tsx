"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { handoffToApp } from "@/lib/auth/handoff";
import {
  extractHandoffFromSearchParams,
  writeHandoffContext,
} from "@/lib/auth/session-params";
import { SuccessPanel } from "./success-panel";

type Stage = "verifying" | "success" | "expired" | "failed";

export function VerifyClient() {
  const t = useTranslations("auth.verify");
  const tShared = useTranslations("auth.shared");
  const [stage, setStage] = useState<Stage>("verifying");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let cancelled = false;

    async function run() {
      // Store handoff context from query params so it's available after
      // detectSessionInUrl consumes the fragment.
      const search = new URLSearchParams(window.location.search);
      const ctx = extractHandoffFromSearchParams(search);
      if (ctx) writeHandoffContext(ctx);

      // Small delay to allow detectSessionInUrl to process the fragment.
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (cancelled) return;

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // Try legacy query-param token flow as fallback.
        const tokenHash = search.get("token_hash");
        const type = search.get("type");
        if (tokenHash && (type === "email" || type === "signup")) {
          const { data: verifyData, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "email",
          });
          if (error || !verifyData.session) {
            if (cancelled) return;
            setStage(
              error?.message?.toLowerCase().includes("expired")
                ? "expired"
                : "failed"
            );
            return;
          }
          if (cancelled) return;
          setStage("success");
          setTimeout(() => handoffToApp(verifyData.session!), 800);
          return;
        }
        if (cancelled) return;
        setStage("expired");
        return;
      }

      if (cancelled) return;
      setStage("success");
      setTimeout(() => handoffToApp(data.session!), 800);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (stage === "verifying") {
    return (
      <div className="space-y-4 text-center" role="status">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eeff] text-[#341657]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#341657] border-t-transparent" />
        </div>
        <p className="text-[16px] font-semibold text-[#17131f]">
          {t("title")}
        </p>
        <p className="text-[14px] text-[#686276]">{tShared("loading")}</p>
      </div>
    );
  }

  if (stage === "success") {
    return <SuccessPanel title={t("success")}>{t("successBody")}</SuccessPanel>;
  }

  if (stage === "expired") {
    return (
      <SuccessPanel icon={<AlertIcon />} title={t("expired")}>
        {t("expiredBody")}
      </SuccessPanel>
    );
  }

  return (
    <SuccessPanel icon={<AlertIcon />} title={t("failed")}>
      {t("failedBody")}
    </SuccessPanel>
  );
}

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
