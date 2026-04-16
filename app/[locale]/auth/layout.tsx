import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("auth.shared");
  const tFooter = await getTranslations("footer.legal");

  return (
    <div className="min-h-[100dvh] bg-[#f6f4fb] text-[#17131f]">
      <header className="mx-auto flex w-full max-w-[520px] items-center justify-between px-5 pt-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#17131f] transition-opacity hover:opacity-80"
          aria-label={t("appName")}
        >
          <Image
            src="/brand/logo-black.png"
            alt=""
            width={32}
            height={32}
            priority
            className="h-8 w-8"
          />
          <span className="text-[22px] font-bold leading-none tracking-tight">
            {t("appName")}
          </span>
        </Link>
        <Link
          href="/"
          className="text-[14px] font-medium text-[#686276] transition-colors hover:text-[#341657]"
        >
          {t("back")}
        </Link>
      </header>

      <main className="mx-auto flex min-h-[calc(100dvh-140px)] w-full max-w-[520px] items-center justify-center px-5 py-12">
        <div className="w-full">{children}</div>
      </main>

      <footer className="mx-auto flex w-full max-w-[520px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 pb-8 text-[13px] text-[#a49fb0]">
        <Link href="/privacy" className="hover:text-[#686276]">
          {tFooter("privacy")}
        </Link>
        <Link href="/terms" className="hover:text-[#686276]">
          {tFooter("terms")}
        </Link>
        <Link href="/help" className="hover:text-[#686276]">
          {tFooter("help")}
        </Link>
      </footer>
    </div>
  );
}
