"use client";

import { useEffect } from "react";
import {
  extractHandoffFromSearchParams,
  writeHandoffContext,
} from "@/lib/auth/session-params";

/**
 * Reads ?redirect_to=... &state=... from the current URL and persists the
 * handoff context into sessionStorage. Uses `window.location.search` directly
 * instead of `useSearchParams` so the host page can render statically — the
 * context only needs to be read once per mount, which matches real usage.
 */
export function HandoffBootstrap() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const search = new URLSearchParams(window.location.search);
    const ctx = extractHandoffFromSearchParams(search);
    if (ctx) writeHandoffContext(ctx);
  }, []);

  return null;
}
