"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { forwardRef } from "react";
import type { Ref } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Props = {
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
};

/**
 * Cloudflare Turnstile, invisible size + managed dashboard mode. The
 * widget auto-executes on mount and delivers a token via `onSuccess`.
 * We call `ref.current?.reset()` after each use so the next submission
 * gets a fresh token.
 */
export const Captcha = forwardRef(function Captcha(
  { onSuccess, onExpire, onError }: Props,
  ref: Ref<TurnstileInstance>,
) {
  if (!SITE_KEY) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="rounded-[8px] border border-dashed border-[#e8e0f1] px-3 py-2 text-[12px] text-[#a49fb0]">
          Turnstile site key missing — set NEXT_PUBLIC_TURNSTILE_SITE_KEY
        </div>
      );
    }
    return null;
  }

  return (
    <Turnstile
      ref={ref}
      siteKey={SITE_KEY}
      options={{ size: "invisible", theme: "light" }}
      onSuccess={onSuccess}
      onExpire={onExpire}
      onError={onError}
    />
  );
});

export function isCaptchaRequired(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
