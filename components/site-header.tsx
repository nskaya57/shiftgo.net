import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-30 border-b border-[#ece7f2]/60 bg-[#fcfbff]/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center text-[#17131f] transition-opacity hover:opacity-80"
        >
          <Image
            src="/brand/logo-black.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span className="text-[28px] font-bold leading-none tracking-tight">
            ShiftGo
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden items-center gap-8 text-[15px] font-medium text-[#686276] md:flex">
            <a
              href="/#how"
              className="transition-colors hover:text-[#341657]"
            >
              {t("how")}
            </a>
            <Link
              href="/help"
              className="transition-colors hover:text-[#341657]"
            >
              {t("help")}
            </Link>
          </nav>

          <a
            href="/#download"
            className="hidden items-center rounded-full bg-[#341657] px-5 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-[#5a2d82] hover:shadow-[0_6px_18px_-4px_#24143a33] md:inline-flex md:px-6 md:py-3 md:text-[15px]"
          >
            {t("getApp")}
          </a>

          <MobileMenu
            howLabel={t("how")}
            helpLabel={t("help")}
            menuLabel={t("menu")}
          />
        </div>
      </div>
    </header>
  );
}
