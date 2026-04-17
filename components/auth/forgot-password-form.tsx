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
import { useAuthQueryForward } from "./use-query-forward";

type FieldErrors = {
  email?: string;
};

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgot");
  const tShared = useTranslations("auth.shared");
  const tErrors = useTranslations("auth.errors");
  const captchaRef = useRef<HCaptcha>(null);
  const { redirectTo, state } = useAuthQueryForward();

  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function redirectBackToApp(trimmedEmail: string) {
    const appRedirect = sanitizeRedirect(redirectTo);
    try {
      const pendingUrl = new URL(appRedirect);
      pendingUrl.searchParams.set("reset_pending", "1");
      pendingUrl.searchParams.set("email", trimmedEmail);
      if (state) pendingUrl.searchParams.set("state", state);
      window.location.href = pendingUrl.toString();
    } catch {
      const params = new URLSearchParams({
        reset_pending: "1",
        email: trimmedEmail,
      });
      if (state) params.set("state", state);
      window.location.href = `${appRedirect}?${params.toString()}`;
    }
  }

  async function resolveCaptchaToken(): Promise<string | undefined> {
    if (!isCaptchaRequired()) return undefined;
    try {
      const result = await captchaRef.current?.execute({ async: true });
      captchaRef.current?.resetCaptcha();
      return result?.response;
    } catch {
      return undefined;
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const nextErrors: FieldErrors = {};
    const emailResult = validateEmail(email);
    if (!emailResult.ok) nextErrors.email = emailResult.error;

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const captchaToken = await resolveCaptchaToken();
      if (isCaptchaRequired() && !captchaToken) {
        setFormError(tErrors("captchaFailed"));
        setSubmitting(false);
        return;
      }

      const trimmed = email.trim();
      const supabase = getSupabaseBrowserClient();
      const appRedirect = sanitizeRedirect(redirectTo);
      const verifyUrl = new URL(`${window.location.origin}/auth/verify`);
      verifyUrl.searchParams.set("redirect_to", appRedirect);
      verifyUrl.searchParams.set("flow", "recovery");

      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
        redirectTo: verifyUrl.toString(),
        captchaToken,
      });

      if (error) {
        setFormError(tErrors(mapSupabaseError(error.code, error.message)));
        return;
      }
      redirectBackToApp(trimmed);
    } catch (err) {
      console.error(err);
      setFormError(tErrors("network"));
      setSubmitting(false);
    }
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

      <Captcha ref={captchaRef} />

      <SubmitButton loading={submitting} loadingLabel={tShared("loading")}>
        {t("submit")}
      </SubmitButton>
    </form>
  );
}
