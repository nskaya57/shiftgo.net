"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
};

export function SubmitButton({
  children,
  loading,
  loadingLabel,
  disabled,
  className,
  ...rest
}: Props) {
  return (
    <button
      type={rest.type ?? "submit"}
      disabled={disabled || loading}
      className={
        "inline-flex w-full items-center justify-center rounded-full bg-[#341657] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[#5a2d82] hover:shadow-[0_6px_18px_-4px_#24143a33] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#341657] disabled:hover:shadow-none " +
        (className ?? "")
      }
      {...rest}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Spinner />
          <span>{loadingLabel ?? children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
    />
  );
}
