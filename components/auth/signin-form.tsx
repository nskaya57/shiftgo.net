"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type HCaptcha from "@hcaptcha/react-hcaptcha";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { handoffToApp } from "@/lib/auth/handoff";
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
import { useAuthQueryForward } from "./use-query-forward";

type FieldErrors = {
  email?: string;
  password?: string;
  captcha?: string;
};

export function SignInForm() {
  const t = useTranslations("auth.signIn");
  const tShared = useTranslations("auth.shared");
  const tErrors = useTranslations("auth.errors");
  const router = useRouter();
  const captchaRef = useRef<HCaptcha>(null);
  const { queryToForward } = useAuthQueryForward();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors: FieldErrors = {};
    const emailResult = validateEmail(email);
    if (!emailResult.ok) nextErrors.email = emailResult.error;
    if (!password) nextErrors.password = "passwordRequired";

    if (isCaptchaRequired() && !captchaToken) {
      nextErrors.captcha = "captchaRequired";
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
        options: captchaToken ? { captchaToken } : undefined,
      });

      if (error) {
        setFormError(tErrors(mapSupabaseError(error.code, error.message)));
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
        return;
      }
      if (!data.session) {
        setFormError(tErrors("generic"));
        return;
      }

      const result = handoffToApp(data.session);
      if (result.status === "no-context") {
        router.push(`/auth/callback?web=1`);
      }
    } catch (err) {
      console.error(err);
      setFormError(tErrors("network"));
    } finally {
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

      <SubmitButton
        loading={submitting}
        loadingLabel={tShared("loading")}
      >
        {t("submit")}
      </SubmitButton>

      <div className="relative py-2 text-center">
        <span className="absolute inset-x-0 top-1/2 h-px bg-[#ece7f2]" aria-hidden="true" />
        <span className="relative inline-block bg-white px-3 text-[12px] font-medium uppercase tracking-wider text-[#a49fb0]">
          {tShared("orDivider")}
        </span>
      </div>

      <a
        href={`/auth/magic-link${queryToForward}`}
        className="inline-flex w-full items-center justify-center rounded-full border border-[#e8e0f1] bg-white px-6 py-3 text-[14px] font-semibold text-[#17131f] transition-colors hover:border-[#341657] hover:text-[#341657]"
      >
        {t("magicLink")}
      </a>
    </form>
  );
}

// Passes the validation fn (unused warning guard, referenced for eventual multi-step validation)
void validatePassword;
