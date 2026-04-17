"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  buildHandoffUrl,
  sanitizeRedirect,
  sessionToHandoffParams,
} from "@/lib/auth/redirect";
import { mapSupabaseError, validateEmail } from "@/lib/auth/validation";
import { TextField } from "./text-field";
import { PasswordField } from "./password-field";
import { SubmitButton } from "./submit-button";
import { ErrorBanner } from "./error-banner";
import { Captcha, isCaptchaRequired } from "./captcha";
import { useAuthQueryForward } from "./use-query-forward";

type FieldErrors = {
  email?: string;
  password?: string;
};

export function SignInForm() {
  const tShared = useTranslations("auth.shared");
  const tErrors = useTranslations("auth.errors");
  const t = useTranslations("auth.signIn");
  const captchaRef = useRef<TurnstileInstance>(null);
  const captchaTokenRef = useRef<string | null>(null);
  const { redirectTo, state, queryToForward } = useAuthQueryForward();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function waitForCaptchaToken(timeoutMs = 4000): Promise<string | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (captchaTokenRef.current) return captchaTokenRef.current;
      await new Promise((r) => setTimeout(r, 100));
    }
    return null;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const nextErrors: FieldErrors = {};
    const emailResult = validateEmail(email);
    if (!emailResult.ok) nextErrors.email = emailResult.error;
    if (!password) nextErrors.password = "passwordRequired";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      let captchaToken: string | undefined;
      if (isCaptchaRequired()) {
        const token = await waitForCaptchaToken();
        if (!token) {
          setFormError(tErrors("captchaFailed"));
          setSubmitting(false);
          return;
        }
        captchaToken = token;
      }

      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
        options: captchaToken ? { captchaToken } : undefined,
      });

      captchaRef.current?.reset();
      captchaTokenRef.current = null;

      if (error) {
        setFormError(tErrors(mapSupabaseError(error.code, error.message)));
        return;
      }
      if (!data.session) {
        setFormError(tErrors("generic"));
        return;
      }

      const target = sanitizeRedirect(redirectTo);
      const handoffUrl = buildHandoffUrl(
        target,
        sessionToHandoffParams(data.session, state),
      );
      if (typeof window !== "undefined") {
        window.location.href = handoffUrl;
      }
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

      <PasswordField
        label={tShared("password")}
        name="password"
        autoComplete="current-password"
        showLabel={tShared("passwordShow")}
        hideLabel={tShared("passwordHide")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password ? tErrors(fieldErrors.password) : null}
        required
      />

      <div className="flex justify-end">
        <a
          href={`/auth/forgot${queryToForward}`}
          className="text-[13px] font-semibold text-[#341657] hover:underline"
        >
          {t("forgot")}
        </a>
      </div>

      <Captcha
        ref={captchaRef}
        onSuccess={(token) => (captchaTokenRef.current = token)}
        onExpire={() => (captchaTokenRef.current = null)}
        onError={() => (captchaTokenRef.current = null)}
      />

      <SubmitButton loading={submitting} loadingLabel={tShared("loading")}>
        {t("submit")}
      </SubmitButton>
    </form>
  );
}
