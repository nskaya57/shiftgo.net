"use client";

import { useEffect, useState } from "react";
import { StoreBadges } from "@/components/store-badges";

type ShareLinkFallbackProps = {
  token: string;
};

/**
 * Universal Link landing for share-token taps —
 * `https://shiftgo.net/share/{token}` (Phase C.8).
 *
 * Strategy mirrors `OpenInAppFallback`:
 *  1. On mount we try the custom-scheme bounce
 *     (`shiftgoapp://share/{token}`). If the recipient has the app
 *     installed, iOS/Android intercept the scheme and the user lands
 *     in the in-app subscribe flow without ever seeing this page
 *     beyond a flicker.
 *  2. If nothing intercepts, the fallback CTAs (App Store / Play
 *     Store) stay visible.
 *
 * Critical: this page renders **NO calendar data**. The plan lock for
 * Phase C is in-app-only consumption — recipients must have the app
 * to see the owner's shifts. The token is opaque to the web; it's
 * only forwarded into the custom scheme.
 */
export function ShareLinkFallback({ token }: ShareLinkFallbackProps) {
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (tried) return;
    setTried(true);
    const isMobile =
      typeof navigator !== "undefined" &&
      /iphone|ipad|ipod|android/i.test(navigator.userAgent);
    if (!isMobile) return;
    const target = `shiftgoapp://share/${token}`;
    window.location.assign(target);
  }, [tried, token]);

  return (
    <article className="bg-[#fcfbff] py-24 md:py-32">
      <div className="mx-auto max-w-[68ch] px-5 lg:px-8 text-center">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#17131f]">
          Subscribe in ShiftGo
        </h1>
        <p className="mt-6 text-[16px] leading-relaxed text-[#686276]">
          Someone shared their calendar with you on ShiftGo. To subscribe and
          see their shifts, you&apos;ll need the app installed.
        </p>
        <div className="mt-10 flex flex-col items-center gap-6">
          <StoreBadges size="large" />
          <p className="text-[14px] text-[#9a93ad]">
            After installing, return to your previous app and tap the link
            again to subscribe.
          </p>
        </div>
      </div>
    </article>
  );
}
