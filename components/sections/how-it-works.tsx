import { useTranslations } from "next-intl";
import { PhoneMockup } from "../phone-mockup";

type StepKey = "step1" | "step2" | "step3";

const screenshots: Record<StepKey, { src: string; alt: string }> = {
  step1: {
    src: "/screenshots/add-shift-modal.png",
    alt: "Add Shift screen with time picker and hourly rate",
  },
  step2: {
    src: "/screenshots/home-weekly-summary.png",
    alt: "Home screen showing weekly earnings summary",
  },
  step3: {
    src: "/screenshots/reports-monthly.png",
    alt: "Reports screen with monthly earnings breakdown",
  },
};

const steps: StepKey[] = ["step1", "step2", "step3"];

export function HowItWorks() {
  const t = useTranslations("how");

  return (
    <section
      id="how"
      className="relative bg-[#fcfbff] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1120px] px-5 lg:px-8">
        <div className="max-w-[28ch]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7b4ba3]">
            {t("eyebrow")}
          </p>
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em] text-[#17131f]">
            {t("title")}
          </h2>
        </div>

        <ol className="mt-20 grid gap-16 md:grid-cols-3 md:gap-8">
          {steps.map((key, i) => (
            <li key={key} className="flex flex-col items-center text-center md:items-start md:text-left">
              <PhoneMockup
                src={screenshots[key].src}
                alt={screenshots[key].alt}
                size="default"
              />

              <div className="mt-8 flex items-center gap-3">
                <span className="tabular inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#341657] text-[13px] font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="text-[22px] font-bold tracking-[-0.01em] text-[#17131f]">
                  {t(`${key}.title`)}
                </h3>
              </div>

              <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-[#686276]">
                {t(`${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
