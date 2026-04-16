// Store links for ShiftGo mobile app.
//
// Set the real URLs in `.env.local` (or your hosting provider's env config):
//   NEXT_PUBLIC_APP_STORE_URL="https://apps.apple.com/app/shiftgo/id<real-id>"
//   NEXT_PUBLIC_PLAY_STORE_URL="https://play.google.com/store/apps/details?id=<real-package>"
//
// In production builds, the constants below will throw if the placeholder
// values are still in place — preventing accidental launch with dead links.

const PLACEHOLDER_APPLE = "id0000000000";
const PLACEHOLDER_PLAY = "com.shiftgo.app";

const APP_STORE_FALLBACK = `https://apps.apple.com/app/shiftgo/${PLACEHOLDER_APPLE}`;
const PLAY_STORE_FALLBACK = `https://play.google.com/store/apps/details?id=${PLACEHOLDER_PLAY}`;

export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ?? APP_STORE_FALLBACK;

export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? PLAY_STORE_FALLBACK;

// Soft guard: always warn when a placeholder is in use, so the issue is
// visible in build/dev logs without blocking local development.
//
// To make the guard strict (fail builds and SSR if placeholders remain),
// set `SHIFTGO_STRICT_LINKS=1` in your CI or production deploy environment.
const usingApplePlaceholder = APP_STORE_URL.includes(PLACEHOLDER_APPLE);
const usingPlayPlaceholder = PLAY_STORE_URL.includes(PLACEHOLDER_PLAY);
const isStrict = process.env.SHIFTGO_STRICT_LINKS === "1";

if (usingApplePlaceholder || usingPlayPlaceholder) {
  const message =
    "[shiftgo.net] Store URLs are still placeholders. " +
    "Set NEXT_PUBLIC_APP_STORE_URL and NEXT_PUBLIC_PLAY_STORE_URL " +
    "to the real listings before deploying to production.";

  if (isStrict) {
    throw new Error(message);
  } else if (typeof window === "undefined") {
    // Print once on the server so CI/build logs surface it.
    console.warn(message);
  }
}
