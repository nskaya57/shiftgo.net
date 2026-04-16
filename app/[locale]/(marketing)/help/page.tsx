import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HelpContent } from "@/components/help-content";

export const metadata: Metadata = {
  title: "Help · ShiftGo",
  description:
    "Answers to common questions about ShiftGo — shifts, earnings, calendar sync, Premium, and troubleshooting.",
  alternates: { canonical: "https://shiftgo.net/help" },
};

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HelpContent />;
}
