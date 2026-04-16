import type { ReactNode } from "react";

export function SuccessPanel({
  icon,
  title,
  children,
  footer,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="space-y-5 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d1fae5] text-[#10b981]">
        {icon ?? <CheckIcon />}
      </div>
      <div className="space-y-2">
        <h2 className="text-[22px] font-bold tracking-tight text-[#17131f]">
          {title}
        </h2>
        <div className="text-[15px] leading-relaxed text-[#686276]">
          {children}
        </div>
      </div>
      {footer ? <div className="pt-2">{footer}</div> : null}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
