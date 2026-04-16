"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null;
  hint?: string;
  trailing?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, error, hint, trailing, id, className, ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId}
          className="text-[13px] font-semibold text-[#17131f]"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={
              "w-full rounded-[12px] border bg-white px-4 py-3 text-[15px] text-[#17131f] outline-none transition-colors placeholder:text-[#a49fb0] focus:border-[#341657] focus:ring-2 focus:ring-[#341657]/20 disabled:cursor-not-allowed disabled:bg-[#f6f4fb] " +
              (error ? "border-[#ef4444]" : "border-[#e8e0f1]") +
              (className ? ` ${className}` : "")
            }
            {...rest}
          />
          {trailing ? (
            <div className="absolute inset-y-0 right-2 flex items-center">
              {trailing}
            </div>
          ) : null}
        </div>
        {error ? (
          <p
            id={`${fieldId}-error`}
            className="text-[13px] font-medium text-[#ef4444]"
            role="alert"
          >
            {error}
          </p>
        ) : hint ? (
          <p id={`${fieldId}-hint`} className="text-[12px] text-[#a49fb0]">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
