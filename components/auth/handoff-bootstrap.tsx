"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  extractHandoffFromSearchParams,
  writeHandoffContext,
} from "@/lib/auth/session-params";

function HandoffBootstrapInner() {
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

/**
 * Reads ?redirect_to=... &state=... from the current URL and persists the
 * handoff context into sessionStorage. Mounted once at the top of every auth
 * page. Wraps the `useSearchParams` reader in a Suspense boundary so Next.js
 * doesn't bail the entire page out of static generation during build.
 */
export function HandoffBootstrap() {
  return (
    <Suspense fallback={null}>
      <HandoffBootstrapInner />
    </Suspense>
  );
}
