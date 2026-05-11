import { useTranslations } from "next-intl";
import { PhoneMockup } from "../phone-mockup";
import { StoreBadges } from "../store-badges";

export function Hero() {
  const t = useTranslations("hero");
  const title = t("title");

  return (
    <section className="relative overflow-hidden bg-[#fcfbff] pt-16 md:pt-24">
      {/* soft brand wash behind phone */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-20%] top-[-10%] h-[120%] w-[60%] rounded-full bg-[#f4eeff] opacity-70 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1120px] px-5 lg:px-8">
        <div className="grid gap-14 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-12">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#f4eeff] px-4 py-1.5 text-[13px] font-semibold tracking-wide text-[#341657]">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[#7b4ba3]"
              />
              {t("eyebrow")}
            </p>

            <h1 className="text-[clamp(2.625rem,6.2vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-[#17131f]">
              {title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-[#686276] md:text-[18px]">
              {t("subtitle")}
            </p>

            <div className="mt-8">
              <StoreBadges size="large" priority hidePlay />
            </div>

          </div>

          <div className="flex justify-center md:justify-end">
            <PhoneMockup
              src="/screenshots/home-active-shift.png"
              alt="ShiftGo home screen showing an active shift with a live earnings counter"
              size="hero"
            />
          </div>
        </div>
      </div>

      <div className="h-24 md:h-32" />
    </section>
  );
}
