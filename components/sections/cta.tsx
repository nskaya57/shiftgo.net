import { useTranslations } from "next-intl";
import { StoreBadges } from "../store-badges";

export function Cta() {
  const t = useTranslations("cta");

  return (
    <section
      id="download"
      className="relative overflow-hidden scroll-mt-24 bg-[#341657] py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 brand-gradient opacity-60"
      />

      <div className="relative mx-auto max-w-[1120px] px-5 lg:px-8">
        <div className="max-w-[24ch]">
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            {t("title")}
          </h2>
        </div>

        <p className="mt-8 max-w-[52ch] text-[18px] leading-relaxed text-[#f4eeff]">
          {t("body")}
        </p>

        <div className="mt-10">
          <StoreBadges size="large" />
        </div>

        <p className="mt-6 text-[13px] font-medium text-[#e8e0f1]">
          {t("storeHint")}
        </p>
      </div>
    </section>
  );
}
