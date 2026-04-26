import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { OpenInAppFallback } from "@/components/open-in-app-fallback";

export const metadata: Metadata = {
  title: "Open in ShiftGo",
  description:
    "Open this ShiftGo entity directly in the app, or download it from the App Store.",
  // No SEO surface for this route — it's a Universal Link landing page,
  // not a discoverable destination.
  robots: { index: false, follow: false },
};

const ALLOWED_TYPES = new Set(["shift", "reminder"]);

/**
 * Universal Link landing page.
 *
 * Pairs with `/.well-known/apple-app-site-association`:
 *  - On iOS with the ShiftGo app installed, the OS intercepts the link
 *    via Associated Domains and opens the app — this page is never
 *    rendered.
 *  - Without the app (or on browsers that don't honour App Links),
 *    the user lands here and gets a "Download / Open" CTA.
 *
 * The dynamic segments are validated against an allowlist; anything
 * else 404s so /open/<garbage> doesn't generate a page.
 */
export default async function OpenInAppPage({
  params,
}: {
  params: Promise<{ locale: string; type: string; id: string }>;
}) {
  const { locale, type, id } = await params;
  setRequestLocale(locale);

  if (!ALLOWED_TYPES.has(type) || !id) {
    notFound();
  }

  return <OpenInAppFallback type={type as "shift" | "reminder"} id={id} />;
}
