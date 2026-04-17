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

const EMAIL_OTP_TYPES = [
  "email",
  "signup",
  "magiclink",
  "recovery",
  "invite",
  "email_change",
] as const;
type EmailOtpType = (typeof EMAIL_OTP_TYPES)[number];

function isEmailOtpType(v: string | null): v is EmailOtpType {
  return v !== null && (EMAIL_OTP_TYPES as readonly string[]).includes(v);
}

function isExpiredMessage(msg?: string | null) {
  return Boolean(msg && msg.toLowerCase().includes("expired"));
}

export function VerifyClient() {
  const t = useTranslations("auth.verify");
  const tShared = useTranslations("auth.shared");
  const [stage, setStage] = useState<Stage>("verifying");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let cancelled = false;

    async function run() {
      const search = new URLSearchParams(window.location.search);
      const ctx = extractHandoffFromSearchParams(search);
      if (ctx) writeHandoffContext(ctx);

      const flow = search.get("flow");
      const baseExtra: Record<string, string> = flow ? { flow } : {};

      // --- 1. Implicit-flow fragment (#access_token=...&refresh_token=...)
      const hash = window.location.hash;
      if (hash.length > 1) {
        const hashParams = new URLSearchParams(hash.substring(1));
        const fragErr =
          hashParams.get("error_description") ?? hashParams.get("error");
        if (fragErr) {
          setStage(isExpiredMessage(fragErr) ? "expired" : "failed");
          return;
        }
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (cancelled) return;
          if (error || !data.session) {
            setStage(isExpiredMessage(error?.message) ? "expired" : "failed");
            return;
          }
          setStage("success");
          const fragmentType = hashParams.get("type");
          const extra = fragmentType
            ? { ...baseExtra, type: fragmentType }
            : baseExtra;
          setTimeout(
            () =>
              handoffToApp(data.session!, {
                fallbackToDefault: true,
                extraQuery: Object.keys(extra).length ? extra : undefined,
              }),
            500,
          );
          return;
        }
      }

      // --- 2. Token hash in query params (older templates)
      const tokenHash = search.get("token_hash");
      const type = search.get("type");
      if (tokenHash && isEmailOtpType(type)) {
        const { data: verifyData, error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type,
        });
        if (cancelled) return;
        if (error || !verifyData.session) {
          setStage(isExpiredMessage(error?.message) ? "expired" : "failed");
          return;
        }
        setStage("success");
        const extra = { ...baseExtra, type } as Record<string, string>;
        setTimeout(
          () =>
            handoffToApp(verifyData.session!, {
              fallbackToDefault: true,
              extraQuery: extra,
            }),
          500,
        );
        return;
      }

      // --- 3. PKCE code
      const code = search.get("code");
      if (code) {
        const { data: exchangeData, error } =
          await supabase.auth.exchangeCodeForSession(code);
        if (cancelled) return;
        if (error || !exchangeData.session) {
          setStage(isExpiredMessage(error?.message) ? "expired" : "failed");
          return;
        }
        setStage("success");
        setTimeout(
          () =>
            handoffToApp(exchangeData.session!, {
              fallbackToDefault: true,
              extraQuery: Object.keys(baseExtra).length ? baseExtra : undefined,
            }),
          500,
        );
        return;
      }

      // --- 4. Last-chance fallback: maybe detectSessionInUrl already ran
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (cancelled) return;
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        setStage("success");
        setTimeout(
          () =>
            handoffToApp(sessionData.session!, {
              fallbackToDefault: true,
              extraQuery: Object.keys(baseExtra).length ? baseExtra : undefined,
            }),
          500,
        );
        return;
      }

      // --- 5. Surface Supabase query-param errors
      const errorParam = search.get("error_code") ?? search.get("error");
      const errorDesc = search.get("error_description");
      if (isExpiredMessage(errorParam) || isExpiredMessage(errorDesc)) {
        setStage("expired");
        return;
      }
      if (errorParam || errorDesc) {
        setStage("failed");
        return;
      }

      // Nothing matched — link was probably opened without tokens.
      setStage("expired");
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
