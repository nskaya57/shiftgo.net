import { NextResponse } from "next/server";

/**
 * Apple App Site Association (AASA) — served at
 *   https://shiftgo.net/.well-known/apple-app-site-association
 *
 * iOS fetches this file once after a fresh install / domain association
 * change and caches it on-device. The `applinks` payload pairs the
 * Apple Developer Team ID with the ShiftGo bundle id so taps on
 * `https://shiftgo.net/open/shift/{id}` and `/open/reminder/{id}` open
 * the app directly instead of falling through to the browser.
 *
 * Content-Type **must** be `application/json` and the response **must
 * not** be served from a redirect — Apple rejects either case silently
 * and Universal Links revert to in-browser links. The Content-Type +
 * Cache-Control headers are also enforced at the framework layer (see
 * `next.config.ts`).
 */
export const dynamic = "force-static";

export async function GET() {
  const teamId = process.env.APPLE_TEAM_ID;
  if (!teamId) {
    // Fail loudly in build/dev so we don't ship an AASA payload missing
    // the team prefix (which would 200 OK but never link an app).
    throw new Error(
      "APPLE_TEAM_ID env var is missing — required to build the AASA payload",
    );
  }

  const payload = {
    applinks: {
      details: [
        {
          appIDs: [`${teamId}.net.shiftgo.app`],
          components: [
            {
              "/": "/open/shift/*",
              comment: "Open a shift directly in ShiftGo",
            },
            {
              "/": "/open/reminder/*",
              comment: "Open a reminder directly in ShiftGo",
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
