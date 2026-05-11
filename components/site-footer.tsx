import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { StoreBadges } from "./store-badges";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[#ece7f2] bg-[#f6f4fb] pb-14 pt-20">
      <div className="mx-auto max-w-[1120px] px-5 lg:px-8">
        <div className="grid gap-14 md:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-0 text-[#17131f]">
              <Image
                src="/brand/logo-black.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-[32px] font-bold leading-none tracking-tight">
                ShiftGo
              </span>
            </div>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-[#686276]">
              {t("tagline")}
            </p>
            <div className="mt-6">
              <StoreBadges hidePlay />
            </div>
          </div>

          <nav className="flex flex-col gap-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a49fb0]">
              {t("sections.product")}
            </p>
            <Link
              href="/help"
              className="text-[14px] text-[#686276] transition-colors hover:text-[#341657]"
            >
              {t("legal.help")}
            </Link>
            <Link
              href="/privacy"
              className="text-[14px] text-[#686276] transition-colors hover:text-[#341657]"
            >
              {t("legal.privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-[14px] text-[#686276] transition-colors hover:text-[#341657]"
            >
              {t("legal.terms")}
            </Link>
            <Link
              href="/imprint"
              className="text-[14px] text-[#686276] transition-colors hover:text-[#341657]"
            >
              {t("legal.imprint")}
            </Link>
            <Link
              href="/cancel"
              className="text-[14px] text-[#686276] transition-colors hover:text-[#341657]"
            >
              {t("legal.cancel")}
            </Link>
          </nav>

          <div className="flex flex-col gap-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a49fb0]">
              {t("sections.contact")}
            </p>
            <a
              href="mailto:support@shiftgo.net"
              className="text-[14px] text-[#686276] transition-colors hover:text-[#341657]"
            >
              support@shiftgo.net
            </a>
            <p className="max-w-[28ch] text-[13px] leading-relaxed text-[#a49fb0]">
              {t("contactHint")}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[#ece7f2] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-[#a49fb0]">{t("copyright")}</p>
          <p className="text-[12px] text-[#a49fb0]">{t("builtFor")}</p>
        </div>
      </div>
    </footer>
  );
}
