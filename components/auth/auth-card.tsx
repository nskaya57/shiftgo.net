import type { ReactNode } from "react";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="w-full rounded-[24px] bg-white p-8 elev-2 md:p-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-[26px] font-bold leading-tight tracking-tight text-[#17131f]">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-[15px] leading-relaxed text-[#686276]">
            {subtitle}
          </p>
        ) : null}
      </header>
      {children}
      {footer ? (
        <footer className="mt-8 border-t border-[#ece7f2] pt-6 text-center text-[14px] text-[#686276]">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
