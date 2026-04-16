"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type HCaptcha from "@hcaptcha/react-hcaptcha";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { sanitizeRedirect } from "@/lib/auth/redirect";
import {
  mapSupabaseError,
  validateEmail,
  validatePassword,
} from "@/lib/auth/validation";
import { TextField } from "./text-field";
import { PasswordField } from "./password-field";
import { SubmitButton } from "./submit-button";
import { ErrorBanner } from "./error-banner";
import { Captcha, isCaptchaRequired } from "./captcha";
import { SuccessPanel, MailIcon } from "./success-panel";
import { useAuthQueryForward } from "./use-query-forward";

type FieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  captcha?: string;
};

const RESEND_COOLDOWN_SECONDS = 60;

export function SignupForm() {
  const t = useTranslations("auth.signUp");
  const tShared = useTranslations("auth.shared");
  const tErrors = useTranslations("auth.errors");
  const captchaRef = useRef<HCaptcha>(null);
  const { redirectTo } = useAuthQueryForward();

  const [view, setView] = useState<"form" | "sent">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  function startCooldown() {
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function submitSignup(trimmedEmail: string) {
    const supabase = getSupabaseBrowserClient();
    const verifyRedirect = `${window.location.origin}/auth/verify`;
    const appRedirect = sanitizeRedirect(redirectTo);
    const emailRedirectTo = `${verifyRedirect}?redirect_to=${encodeURIComponent(appRedirect)}`;

    return supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        emailRedirectTo,
        captchaToken: captchaToken ?? undefined,
      },
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors: FieldErrors = {};
    const emailResult = validateEmail(email);
    if (!emailResult.ok) nextErrors.email = emailResult.error;

    const passwordResult = validatePassword(password);
    if (!passwordResult.ok) nextErrors.password = passwordResult.error;

    if (!confirmPassword || confirmPassword !== password) {
      nextErrors.confirmPassword = "passwordsDontMatch";
    }
    if (!termsAccepted) nextErrors.terms = "termsRequired";
    if (isCaptchaRequired() && !captchaToken) {
      nextErrors.captcha = "captchaRequired";
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const { error } = await submitSignup(email.trim());
      if (error) {
        setFormError(tErrors(mapSupabaseError(error.code, error.message)));
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
        return;
      }
      setView("sent");
      startCooldown();
    } catch (err) {
      console.error(err);
      setFormError(tErrors("network"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setSubmitting(true);
    try {
      const { error } = await submitSignup(email.trim());
      if (error) {
        setFormError(tErrors(mapSupabaseError(error.code, error.message)));
        return;
      }
      startCooldown();
    } finally {
      setSubmitting(false);
    }
  }

  if (view === "sent") {
    return (
      <SuccessPanel
        icon={<MailIcon />}
        title={t("verifySent")}
        footer={
          <div className="space-y-3">
            <p className="text-[13px] text-[#a49fb0]">
              {t("verifyResend")}
            </p>
            {resendCooldown > 0 ? (
              <p className="text-[13px] text-[#a49fb0]">
                {t("verifyResendCooldown", { seconds: resendCooldown })}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={submitting}
                className="text-[14px] font-semibold text-[#341657] hover:underline disabled:opacity-60"
              >
                {t("verifyResendAction")}
              </button>
            )}
            {formError ? (
              <p className="text-[13px] font-medium text-[#ef4444]" role="alert">
                {formError}
              </p>
            ) : null}
          </div>
        }
      >
        {t("verifyBody", { email: email.trim() })}
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <ErrorBanner message={formError} />

      <TextField
        label={tShared("email")}
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder={tShared("emailPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email ? tErrors(fieldErrors.email) : null}
        required
      />

      <PasswordField
        label={tShared("password")}
        name="new-password"
        autoComplete="new-password"
        showLabel={tShared("passwordShow")}
        hideLabel={tShared("passwordHide")}
        hint={tShared("passwordHint")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password ? tErrors(fieldErrors.password) : null}
        required
      />

      <PasswordField
        label={t("passwordConfirm")}
        name="confirm-password"
        autoComplete="new-password"
        showLabel={tShared("passwordShow")}
        hideLabel={tShared("passwordHide")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={
          fieldErrors.confirmPassword
            ? tErrors(fieldErrors.confirmPassword)
            : null
        }
        required
      />

      <label className="flex cursor-pointer items-start gap-3 text-[14px] text-[#686276]">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-[#e8e0f1] text-[#341657] focus:ring-[#341657]"
        />
        <span>
          {t.rich("terms", {
            termsLink: (chunks) => (
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#341657] hover:underline"
              >
                {chunks}
              </a>
            ),
            privacyLink: (chunks) => (
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#341657] hover:underline"
              >
                {chunks}
              </a>
            ),
          })}
        </span>
      </label>
      {fieldErrors.terms ? (
        <p className="-mt-3 text-[13px] font-medium text-[#ef4444]" role="alert">
          {tErrors(fieldErrors.terms)}
        </p>
      ) : null}

      {isCaptchaRequired() ? (
        <div>
          <Captcha
            ref={captchaRef}
            onVerify={(token) => {
              setCaptchaToken(token);
              setFieldErrors((prev) => ({ ...prev, captcha: undefined }));
            }}
            onExpire={() => setCaptchaToken(null)}
            onError={() => setCaptchaToken(null)}
          />
          {fieldErrors.captcha ? (
            <p className="mt-2 text-center text-[13px] font-medium text-[#ef4444]">
              {tErrors(fieldErrors.captcha)}
            </p>
          ) : null}
        </div>
      ) : null}

      <SubmitButton loading={submitting} loadingLabel={tShared("loading")}>
        {t("submit")}
      </SubmitButton>
    </form>
  );
}
