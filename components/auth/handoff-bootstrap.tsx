"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  extractHandoffFromSearchParams,
  writeHandoffContext,
} from "@/lib/auth/session-params";

/**
 * Reads ?redirect_to=... &state=... from the current URL and persists the
 * handoff context into sessionStorage. Mounted once at the top of every auth
 * page. Idempotent — only writes when the params are present.
 */
export function HandoffBootstrap() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    const ctx = extractHandoffFromSearchParams(
      new URLSearchParams(searchParams.toString())
    );
    if (ctx) writeHandoffContext(ctx);
  }, [searchParams]);

  return null;
}
