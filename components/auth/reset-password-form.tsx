"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { handoffToApp } from "@/lib/auth/handoff";
import {
  mapSupabaseError,
  validatePassword,
} from "@/lib/auth/validation";
import { PasswordField } from "./password-field";
import { SubmitButton } from "./submit-button";
import { ErrorBanner } from "./error-banner";
import { SuccessPanel } from "./success-panel";

type Stage = "checking" | "form" | "invalid" | "success";

export function ResetPasswordForm() {
  const t = useTranslations("auth.resetPassword");
  const tShared = useTranslations("auth.shared");
  const tErrors = useTranslations("auth.errors");

  const [stage, setStage] = useState<Stage>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Supabase's detectSessionInUrl + PKCE flow handles the recovery token
    // via the URL fragment on mount. If a session is present within a short
    // window, we're ready to accept a new password.
    const supabase = getSupabaseBrowserClient();
    let cancelled = false;

    async function check() {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        setStage("form");
      } else {
        // Small delay to allow detectSessionInUrl to populate
        setTimeout(async () => {
          if (cancelled) return;
          const result = await supabase.auth.getSession();
          setStage(result.data.session ? "form" : "invalid");
        }, 500);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setPwError(null);
    setConfirmError(null);

    const pwResult = validatePassword(password);
    if (!pwResult.ok) {
      setPwError(pwResult.error);
      return;
    }
    if (!confirmPassword || confirmPassword !== password) {
      setConfirmError("passwordsDontMatch");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setFormError(tErrors(mapSupabaseError(error.code, error.message)));
        return;
      }
      const { data } = await supabase.auth.getSession();
      setStage("success");
      if (data.session) {
        setTimeout(() => {
          handoffToApp(data.session!);
        }, 800);
      }
    } catch (err) {
      console.error(err);
      setFormError(tErrors("network"));
    } finally {
      setSubmitting(false);
    }
  }

  if (stage === "checking") {
    return (
      <div
        className="flex items-center justify-center gap-3 py-8 text-[14px] text-[#686276]"
        role="status"
      >
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#341657] border-t-transparent" />
        <span>{tShared("loading")}</span>
      </div>
    );
  }

  if (stage === "invalid") {
    return (
      <SuccessPanel
        icon={<AlertIcon />}
        title={t("tokenInvalid")}
        footer={
          <a
            href="/auth/forgot"
            className="inline-flex items-center justify-center rounded-full bg-[#341657] px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-[#5a2d82]"
          >
            {t("requestNew")}
          </a>
        }
      >
        {t("tokenInvalidBody")}
      </SuccessPanel>
    );
  }

  if (stage === "success") {
    return (
      <SuccessPanel title={t("success")}>{t("successBody")}</SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <ErrorBanner message={formError} />

      <PasswordField
        label={tShared("password")}
        name="new-password"
        autoComplete="new-password"
        showLabel={tShared("passwordShow")}
        hideLabel={tShared("passwordHide")}
        hint={tShared("passwordHint")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={pwError ? tErrors(pwError) : null}
        required
      />

      <PasswordField
        label={tShared("password")}
        name="confirm-password"
        autoComplete="new-password"
        showLabel={tShared("passwordShow")}
        hideLabel={tShared("passwordHide")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={confirmError ? tErrors(confirmError) : null}
        required
      />

      <SubmitButton loading={submitting} loadingLabel={tShared("loading")}>
        {t("submit")}
      </SubmitButton>
    </form>
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
