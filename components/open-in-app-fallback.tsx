"use client";

import { useEffect, useState } from "react";
import { StoreBadges } from "@/components/store-badges";

type OpenInAppFallbackProps = {
  type: "shift" | "reminder";
  id: string;
};

/**
 * Universal Link landing — rendered when the OS didn't intercept the
 * `https://shiftgo.net/open/{type}/{id}` URL and routed it to the web
 * instead (Safari without the app installed, desktop browser, link
 * shared into Slack/email, etc.).
 *
 * Strategy:
 *  1. On mount we synchronously try the custom-scheme variant
 *     (`shiftgoapp://{type}/{id}`). If the app is installed, iOS/Android
 *     handle the scheme and the user lands inside ShiftGo without ever
 *     seeing this page beyond a flicker.
 *  2. If nothing intercepts the scheme, the page stays visible and we
 *     show the App Store / Play Store CTAs so the user can install the
 *     app and try again.
 */
export function OpenInAppFallback({ type, id }: OpenInAppFallbackProps) {
  const [tried, setTried] = useState(false);

  useEffect(() => {
    // Only attempt the custom-scheme bounce once and only on touch
    // devices — desktop browsers prompt a permission dialog that's
    // worse UX than the static fallback page.
    if (tried) return;
    setTried(true);
    const isMobile =
      typeof navigator !== "undefined" &&
      /iphone|ipad|ipod|android/i.test(navigator.userAgent);
    if (!isMobile) return;
    const target = `shiftgoapp://${type}/${id}`;
    // Use location.assign so the browser back stack stays clean if the
    // scheme handler bounces back here.
    window.location.assign(target);
  }, [tried, type, id]);

  return (
    <article className="bg-[#fcfbff] py-24 md:py-32">
      <div className="mx-auto max-w-[68ch] px-5 lg:px-8 text-center">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#17131f]">
          Open ShiftGo
        </h1>
        <p className="mt-6 text-[16px] leading-relaxed text-[#686276]">
          We&apos;re trying to open this {type === "shift" ? "shift" : "reminder"} in
          the ShiftGo app. If nothing happens, you may not have the app
          installed yet.
        </p>
        <div className="mt-10 flex flex-col items-center gap-6">
          <StoreBadges size="large" />
          <p className="text-[14px] text-[#9a93ad]">
            After installing, return to your previous app and tap the link again.
          </p>
        </div>
      </div>
    </article>
  );
}
