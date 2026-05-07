import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ShareLinkFallback } from "@/components/share-link-fallback";

export const metadata: Metadata = {
  title: "Subscribe in ShiftGo",
  description:
    "Open this ShiftGo calendar share directly in the app, or download it from the App Store.",
  // No SEO surface — Universal Link landing only, not a discoverable
  // destination.
  robots: { index: false, follow: false },
};

/**
 * UUID v4/v1 token format — `gen_random_uuid()` output. The page
 * 404s on anything else so `/share/<garbage>` doesn't leak a
 * generic install page; the only legitimate inbound traffic is taps
 * on share links the owner generated through the app.
 *
 * Pairs with `/.well-known/apple-app-site-association` `/share/*`
 * component (Phase C.8). On iOS with the ShiftGo app installed, the
 * OS intercepts the link via Associated Domains and opens the app —
 * this page is never rendered. Without the app (or on browsers that
 * don't honour App Links), the user lands here and gets the
 * App Store / Play Store CTAs.
 */
const TOKEN_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function SharePage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);

  if (!TOKEN_REGEX.test(token)) {
    notFound();
  }

  return <ShareLinkFallback token={token} />;
}
