"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { handoffToApp } from "@/lib/auth/handoff";
import { isMobileUserAgent } from "@/lib/auth/redirect";

type Stage = "preparing" | "redirecting" | "desktop" | "no-session";

export function CallbackClient() {
  const t = useTranslations("auth.callback");
  const [stage, setStage] = useState<Stage>("preparing");
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let cancelled = false;

    async function go() {
      // Wait a bit for detectSessionInUrl (fragment) to populate the session.
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (cancelled) return;
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setStage("no-session");
        return;
      }

      if (!isMobileUserAgent(navigator.userAgent)) {
        // Don't auto-redirect desktop to shiftgoapp:// — won't work.
        setStage("desktop");
        return;
      }

      // Email-initiated flows (magic link, verify) won't have sessionStorage
      // context from the app side — fall back to the default app deep link.
      const result = handoffToApp(data.session, { fallbackToDefault: true });
      if (result.status === "redirected") {
        setPendingUrl(result.url);
        setStage("redirecting");
      } else {
        setStage("no-session");
      }
    }

    go();
    return () => {
      cancelled = true;
    };
  }, []);

  if (stage === "preparing") {
    return (
      <div className="space-y-4 py-10 text-center" role="status">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eeff] text-[#341657]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#341657] border-t-transparent" />
        </div>
        <p className="text-[15px] text-[#686276]">{t("redirecting")}</p>
      </div>
    );
  }

  if (stage === "redirecting") {
    return (
      <div className="space-y-5 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eeff] text-[#341657]">
          <AppIcon />
        </div>
        <div className="space-y-2">
          <h2 className="text-[20px] font-bold tracking-tight text-[#17131f]">
            {t("redirecting")}
          </h2>
          <p className="text-[14px] text-[#686276]">{t("redirectingBody")}</p>
        </div>
        {pendingUrl ? (
          <a
            href={pendingUrl}
            className="inline-flex items-center justify-center rounded-full bg-[#341657] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#5a2d82]"
          >
            {t("openInApp")}
          </a>
        ) : null}
        <p className="text-[13px] text-[#a49fb0]">
          {t("noApp")}{" "}
          <a href="/#download" className="font-semibold text-[#341657] hover:underline">
            {t("download")}
          </a>
        </p>
      </div>
    );
  }

  if (stage === "desktop") {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eeff] text-[#341657]">
          <PhoneIcon />
        </div>
        <h2 className="text-[20px] font-bold tracking-tight text-[#17131f]">
          {t("desktopTitle")}
        </h2>
        <p className="text-[14px] text-[#686276]">{t("desktopBody")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fef2f2] text-[#ef4444]">
        <AlertIcon />
      </div>
      <h2 className="text-[20px] font-bold tracking-tight text-[#17131f]">
        {t("noApp")}
      </h2>
      <a
        href="/auth/signin"
        className="inline-flex items-center justify-center rounded-full bg-[#341657] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#5a2d82]"
      >
        {t("openInApp")}
      </a>
    </div>
  );
}

function AppIcon() {
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
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function PhoneIcon() {
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
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <circle cx="12" cy="18" r="1" />
    </svg>
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
