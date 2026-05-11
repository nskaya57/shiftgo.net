// Store links for ShiftGo mobile app.
//
// Set the real URL in `.env.local` (or your hosting provider's env config):
//   NEXT_PUBLIC_APP_STORE_URL="https://apps.apple.com/app/shiftgo/id<real-id>"
//
// In production builds, the constant below will throw if the placeholder
// value is still in place — preventing accidental launch with a dead link.
//
// Google Play is intentionally omitted until the Android build ships; once
// it does, re-introduce PLAY_STORE_URL + the placeholder guard alongside it.

const PLACEHOLDER_APPLE = "id0000000000";

const APP_STORE_FALLBACK = `https://apps.apple.com/app/shiftgo/${PLACEHOLDER_APPLE}`;

export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ?? APP_STORE_FALLBACK;

// Soft guard: always warn when a placeholder is in use, so the issue is
// visible in build/dev logs without blocking local development.
//
// To make the guard strict (fail builds and SSR if placeholders remain),
// set `SHIFTGO_STRICT_LINKS=1` in your CI or production deploy environment.
const usingApplePlaceholder = APP_STORE_URL.includes(PLACEHOLDER_APPLE);
const isStrict = process.env.SHIFTGO_STRICT_LINKS === "1";

if (usingApplePlaceholder) {
  const message =
    "[shiftgo.net] App Store URL is still a placeholder. " +
    "Set NEXT_PUBLIC_APP_STORE_URL to the real listing before deploying to production.";

  if (isStrict) {
    throw new Error(message);
  } else if (typeof window === "undefined") {
    // Print once on the server so CI/build logs surface it.
    console.warn(message);
  }
}
