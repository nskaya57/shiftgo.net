"use client";

import { useEffect, useState } from "react";

type ForwardContext = {
  queryToForward: string;
  redirectTo: string;
  state: string | null;
};

const DEFAULT_CONTEXT: ForwardContext = {
  queryToForward: "",
  redirectTo: "shiftgoapp://auth/callback",
  state: null,
};

function readFromLocation(): ForwardContext {
  if (typeof window === "undefined") return DEFAULT_CONTEXT;
  const search = new URLSearchParams(window.location.search);
  const redirectTo = search.get("redirect_to") ?? "";
  const state = search.get("state");
  const params = new URLSearchParams();
  if (redirectTo) params.set("redirect_to", redirectTo);
  if (state) params.set("state", state);
  const str = params.toString();
  return {
    queryToForward: str ? `?${str}` : "",
    redirectTo: redirectTo || DEFAULT_CONTEXT.redirectTo,
    state,
  };
}

/**
 * Client-only helper that reads the current URL search params and exposes the
 * forward query + redirect target to auth forms. Uses `window.location.search`
 * directly (not `useSearchParams`) so the auth pages can render statically —
 * Next.js doesn't bail out of prerender when we don't touch its reactive
 * search-param hook. The URL is captured once on mount, which matches how the
 * flow actually works (params are fixed per load).
 */
export function useAuthQueryForward(): ForwardContext {
  const [ctx, setCtx] = useState<ForwardContext>(DEFAULT_CONTEXT);

  useEffect(() => {
    setCtx(readFromLocation());
  }, []);

  return ctx;
}
