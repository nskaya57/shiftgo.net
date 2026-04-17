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
  terms?: string;
};

export function SignupForm() {
  const t = useTranslations("auth.signUp");
  const tShared = useTranslations("auth.shared");
  const tErrors = useTranslations("auth.errors");
  const captchaRef = useRef<HCaptcha>(null);
  const { redirectTo, state } = useAuthQueryForward();

  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function redirectBackToApp(trimmedEmail: string) {
    const appRedirect = sanitizeRedirect(redirectTo);
    try {
      const pendingUrl = new URL(appRedirect);
      pendingUrl.searchParams.set("signup_pending", "1");
      pendingUrl.searchParams.set("email", trimmedEmail);
      if (state) pendingUrl.searchParams.set("state", state);
      window.location.href = pendingUrl.toString();
    } catch {
      const params = new URLSearchParams({
        signup_pending: "1",
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

    const nextErrors: FieldErrors = {};
    const emailResult = validateEmail(email);
    if (!emailResult.ok) nextErrors.email = emailResult.error;
    if (!termsAccepted) nextErrors.terms = "termsRequired";

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
      verifyUrl.searchParams.set("flow", "signup");

      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo: verifyUrl.toString(),
          shouldCreateUser: true,
          captchaToken,
        },
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

      <Captcha ref={captchaRef} />

      <SubmitButton loading={submitting} loadingLabel={tShared("loading")}>
        {t("submit")}
      </SubmitButton>
    </form>
  );
}
