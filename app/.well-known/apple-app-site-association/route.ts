import { NextResponse } from "next/server";

/**
 * Apple App Site Association (AASA) — served at
 *   https://shiftgo.net/.well-known/apple-app-site-association
 *
 * iOS fetches this file once after a fresh install / domain association
 * change and caches it on-device. The `applinks` payload pairs the
 * Apple Developer Team ID with the ShiftGo bundle id so taps on
 *  - `https://shiftgo.net/open/shift/{id}` and `/open/reminder/{id}`
 *    open the entity directly in the app (push-notification + Apple
 *    Calendar mirror "Open" button surfaces).
 *  - `https://shiftgo.net/share/{token}` opens the in-app subscribe
 *    flow when an owner shares their calendar (Phase C.8).
 * In every case the OS intercepts the link via Associated Domains
 * before the browser sees it; the matching marketing pages only
 * render for users without the app installed.
 *
 * Content-Type **must** be `application/json` and the response **must
 * not** be served from a redirect — Apple rejects either case silently
 * and Universal Links revert to in-browser links. The Content-Type +
 * Cache-Control headers are also enforced at the framework layer (see
 * `next.config.ts`).
 */
export const dynamic = "force-static";

// Apple Team ID + ShiftGo iOS bundle id, hardcoded.
//
// Earlier shape templated `${process.env.APPLE_TEAM_ID}.net.shiftgo.app`
// at build time — production traffic surfaced an AASA payload with no
// resolvable Team prefix (likely an absent/blank Vercel env value
// silently producing a "undefined.net.shiftgo.app" entry rather than
// firing the build guard, since `force-static` was pre-rendered in an
// earlier deploy where the env was set). Universal Links can't bind
// to that, and the Phase C.8 share-token deep link smoke chain breaks
// end-to-end.
//
// Both values are stable for v1: the Team ID belongs to the personal
// Apple Developer enrollment (Enes KAYA, individual), and the bundle
// id is locked to `net.shiftgo.app` across the build pipeline (see
// `eas.json` → submit.production.appleTeamId, app.json →
// ios.bundleIdentifier). A future change to either is a deliberate
// release-engineering decision that warrants its own commit.
const APPLE_APP_ID = "4PSK9UZA65.net.shiftgo.app";

export async function GET() {
  const payload = {
    applinks: {
      details: [
        {
          appIDs: [APPLE_APP_ID],
          components: [
            {
              "/": "/open/shift/*",
              comment: "Open a shift directly in ShiftGo",
            },
            {
              "/": "/open/reminder/*",
              comment: "Open a reminder directly in ShiftGo",
            },
            {
              "/": "/share/*",
              comment: "Subscribe to a shared ShiftGo calendar",
            },
          ],
        },
      ],
    },
  };

  return NextResponse.json(payload, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store",
    },
  });
}
