import { useTranslations } from "next-intl";

const items = ["1", "2", "3"] as const;

function Stars({ size = "sm" }: { size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "h-[18px] w-[18px]" : "h-[14px] w-[14px]";
  return (
    <div
      aria-label="5 out of 5 stars"
      className="flex items-center gap-[2px] text-[#f59e0b]"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden
          className={`fill-current ${sizeClass}`}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77 4.8 17.5l.99-5.78L1.58 7.62l5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [featuredKey, ...restKeys] = items;

  return (
    <section className="bg-[#f6f4fb] py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 lg:px-8">
        <div className="max-w-[26ch]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#7b4ba3]">
            {t("eyebrow")}
          </p>
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em] text-[#17131f]">
            {t("title")}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-[1.35fr_1fr] md:gap-8">
          {/* Featured */}
          <figure className="flex flex-col justify-between rounded-[18px] border border-[#e8e0f1] bg-white p-8 elev-2 md:p-12">
            <div>
              <Stars size="lg" />
              <h3 className="mt-6 text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#17131f]">
                {t(`items.${featuredKey}.title`)}
              </h3>
              <blockquote className="mt-6 text-[17px] leading-relaxed text-[#17131f] md:text-[18px]">
                “{t(`items.${featuredKey}.body`)}”
              </blockquote>
            </div>
            <figcaption className="mt-10 flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4eeff] text-[16px] font-semibold text-[#341657]"
              >
                {t(`items.${featuredKey}.name`)
                  .split(" ")
                  .map((part) => part.charAt(0))
                  .join("")}
              </span>
              <div>
                <p className="text-[15px] font-semibold leading-tight text-[#17131f]">
                  {t(`items.${featuredKey}.name`)}
                </p>
                <p className="mt-1 text-[13px] text-[#686276]">
                  {t(`items.${featuredKey}.date`)}
                </p>
              </div>
            </figcaption>
          </figure>

          {/* Two smaller cards stacked */}
          <div className="flex flex-col gap-6 md:gap-8">
            {restKeys.map((key) => (
              <figure
                key={key}
                className="flex flex-1 flex-col justify-between rounded-[14px] border border-[#ece7f2] bg-white p-6 elev-1"
              >
                <div>
                  <Stars />
                  <h3 className="mt-4 text-[16px] font-bold leading-snug text-[#17131f]">
                    {t(`items.${key}.title`)}
                  </h3>
                  <blockquote className="mt-3 text-[14px] leading-relaxed text-[#686276]">
                    {t(`items.${key}.body`)}
                  </blockquote>
                </div>
                <figcaption className="mt-6 text-[13px] font-medium text-[#a49fb0]">
                  <span className="text-[#17131f]">{t(`items.${key}.name`)}</span>
                  <span className="mx-2">·</span>
                  <span>{t(`items.${key}.date`)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
