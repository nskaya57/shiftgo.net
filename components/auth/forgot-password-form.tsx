"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type HCaptcha from "@hcaptcha/react-hcaptcha";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { sanitizeRedirect } from "@/lib/auth/redirect";
import { mapSupabaseError, validateEmail } from "@/lib/auth/validation";
import { TextField } from "./text-field";
import { SubmitButton } from "./submit-button";
import { ErrorBanner } from "./error-banner";
import { Captcha, isCaptchaRequired } from "./captcha";
import { SuccessPanel, MailIcon } from "./success-panel";
import { useAuthQueryForward } from "./use-query-forward";

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgot");
  const tShared = useTranslations("auth.shared");
  const tErrors = useTranslations("auth.errors");
  const captchaRef = useRef<HCaptcha>(null);
  const { redirectTo } = useAuthQueryForward();

  const [view, setView] = useState<"form" | "sent">("form");
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldError(null);
    setCaptchaError(null);

    const emailResult = validateEmail(email);
    if (!emailResult.ok) {
      setFieldError(emailResult.error);
      return;
    }
    if (isCaptchaRequired() && !captchaToken) {
      setCaptchaError("captchaRequired");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const appRedirect = sanitizeRedirect(redirectTo);
      const resetUrl = new URL(
        `${window.location.origin}/auth/reset-password`
      );
      resetUrl.searchParams.set("redirect_to", appRedirect);

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: resetUrl.toString(),
          captchaToken: captchaToken ?? undefined,
        }
      );
      if (error) {
        setFormError(tErrors(mapSupabaseError(error.code, error.message)));
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
        return;
      }
      setView("sent");
    } catch (err) {
      console.error(err);
      setFormError(tErrors("network"));
    } finally {
      setSubmitting(false);
    }
  }

  if (view === "sent") {
    return (
      <SuccessPanel icon={<MailIcon />} title={t("sent")}>
        {t("sentBody", { email: email.trim() })}
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
        error={fieldError ? tErrors(fieldError) : null}
        required
      />

      {isCaptchaRequired() ? (
        <div>
          <Captcha
            ref={captchaRef}
            onVerify={(token) => {
              setCaptchaToken(token);
              setCaptchaError(null);
            }}
            onExpire={() => setCaptchaToken(null)}
            onError={() => setCaptchaToken(null)}
          />
          {captchaError ? (
            <p className="mt-2 text-center text-[13px] font-medium text-[#ef4444]">
              {tErrors(captchaError)}
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
