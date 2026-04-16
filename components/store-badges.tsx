import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/store-links";

type StoreBadgesProps = {
  size?: "default" | "large";
  className?: string;
  priority?: boolean;
};

export function StoreBadges({ size = "default", className, priority = false }: StoreBadgesProps) {
  const locale = useLocale();
  const t = useTranslations("stores");
  const h = size === "large" ? 56 : 48;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("appStoreAria")}
        className="transition-opacity hover:opacity-85"
      >
        <Image
          src={`/badges/app-store-${locale}.svg`}
          alt={t("appStoreAlt")}
          width={Math.round(h * 3)}
          height={h}
          style={{ height: h, width: "auto" }}
          priority={priority}
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("playStoreAria")}
        className="transition-opacity hover:opacity-85"
      >
        <Image
          src={`/badges/google-play-${locale}.svg`}
          alt={t("playStoreAlt")}
          width={Math.round(h * 3.38)}
          height={h}
          style={{ height: h, width: "auto" }}
          priority={priority}
        />
      </a>
    </div>
  );
}
