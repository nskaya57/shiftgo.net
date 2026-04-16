import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { outfit } from "../fonts";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    metadataBase: new URL("https://shiftgo.net"),
    applicationName: "ShiftGo",
    keywords: [
      "shift tracker",
      "earnings tracker",
      "hourly worker",
      "shift schedule",
      "pay calculator",
      "overtime calculator",
      "work hours tracker",
      "shift planner",
      "timesheet app",
      "ShiftGo",
    ],
    authors: [{ name: "BE ADS Yazılım Teknoloji San. ve Tic. Ltd. Şti." }],
    creator: "ShiftGo",
    publisher: "BE ADS Yazılım Teknoloji San. ve Tic. Ltd. Şti.",
    openGraph: {
      title,
      description,
      siteName: "ShiftGo",
      type: "website",
      locale: "en_US",
      url: "https://shiftgo.net",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://shiftgo.net",
    },
    category: "productivity",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "ShiftGo",
              applicationCategory: "BusinessApplication",
              operatingSystem: "iOS, Android",
              description:
                "A shift and earnings tracker for hourly workers. Log shifts, calculate pay, export reports.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "BE ADS Yazılım Teknoloji San. ve Tic. Ltd. Şti.",
                url: "https://shiftgo.net",
              },
            }),
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#341657] focus:px-6 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <NextIntlClientProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
