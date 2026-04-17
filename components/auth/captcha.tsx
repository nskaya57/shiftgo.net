"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { forwardRef } from "react";
import type { Ref } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

type Props = {
  onVerify?: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
};

/**
 * Invisible hCaptcha. Widget never renders a checkbox; the form calls
 * `ref.current.execute({ async: true })` on submit to obtain a token.
 * Challenges only appear if hCaptcha's risk score is high.
 */
export const Captcha = forwardRef(function Captcha(
  { onVerify, onExpire, onError }: Props,
  ref: Ref<HCaptcha>,
) {
  if (!SITE_KEY) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="rounded-[8px] border border-dashed border-[#e8e0f1] px-3 py-2 text-[12px] text-[#a49fb0]">
          hCaptcha site key missing — set NEXT_PUBLIC_HCAPTCHA_SITE_KEY
        </div>
      );
    }
    return null;
  }

  return (
    <HCaptcha
      ref={ref}
      sitekey={SITE_KEY}
      size="invisible"
      theme="light"
      onVerify={(token) => onVerify?.(token)}
      onExpire={onExpire}
      onError={onError}
    />
  );
});

export function isCaptchaRequired(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY);
}
