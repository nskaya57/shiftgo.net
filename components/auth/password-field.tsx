"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { TextField } from "./text-field";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  showLabel: string;
  hideLabel: string;
  error?: string | null;
  hint?: string;
};

export function PasswordField({
  label,
  showLabel,
  hideLabel,
  error,
  hint,
  ...rest
}: Props) {
  const [shown, setShown] = useState(false);

  return (
    <TextField
      label={label}
      type={shown ? "text" : "password"}
      autoComplete={rest.autoComplete ?? "current-password"}
      error={error ?? null}
      hint={hint}
      trailing={
        <button
          type="button"
          onClick={() => setShown((prev) => !prev)}
          aria-label={shown ? hideLabel : showLabel}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#686276] transition-colors hover:bg-[#f6f4fb] hover:text-[#341657]"
        >
          {shown ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
      {...rest}
    />
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.46 20.46 0 0 1 5.06-6.06" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a20.83 20.83 0 0 1-4.05 5.06" />
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
    </svg>
  );
}
