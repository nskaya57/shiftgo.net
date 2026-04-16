import type { ReactNode } from "react";

export function PolicyPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-[#fcfbff] py-24 md:py-32">
      <div className="mx-auto max-w-[68ch] px-5 lg:px-8">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#17131f]">
          {title}
        </h1>
        <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-[#686276]">
          {children}
        </div>
      </div>
    </article>
  );
}
