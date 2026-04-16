import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { outfit } from "../fonts";
import { routing } from "@/i18n/routing";
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
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
