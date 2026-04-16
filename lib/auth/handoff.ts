"use client";

import type { Session } from "@supabase/supabase-js";
import {
  buildHandoffUrl,
  sanitizeRedirect,
  sessionToHandoffParams,
} from "./redirect";
import { clearHandoffContext, readHandoffContext } from "./session-params";

export type HandoffResult =
  | { status: "redirected"; url: string }
  | { status: "no-context" };

export const DEFAULT_APP_REDIRECT = "shiftgoapp://auth/callback";

/**
 * Given an authenticated Supabase session, look up the handoff context the app
 * wrote into sessionStorage (set when the app launched this flow) and build
 * the deep-link redirect URL with tokens in the fragment.
 *
 * When `fallbackToDefault` is true and no sessionStorage context exists (e.g.
 * user clicked an email magic link on mobile — no prior app-set context), we
 * still redirect to the default app deep-link target using the session we
 * already have. State will be absent in that case, which is expected.
 *
 * When false and no context exists, returns "no-context" so the caller can
 * render a desktop fallback UI.
 */
export function handoffToApp(
  session: Session,
  { fallbackToDefault = false }: { fallbackToDefault?: boolean } = {}
): HandoffResult {
  const ctx = readHandoffContext();

  if (!ctx && !fallbackToDefault) return { status: "no-context" };

  const target = ctx ? sanitizeRedirect(ctx.redirectTo) : DEFAULT_APP_REDIRECT;
  const params = sessionToHandoffParams(session, ctx?.state ?? null);
  const url = buildHandoffUrl(target, params);

  if (ctx) clearHandoffContext();

  if (typeof window !== "undefined") {
    window.location.href = url;
  }
  return { status: "redirected", url };
}
