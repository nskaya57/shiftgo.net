import type { Session } from "@supabase/supabase-js";

const DEFAULT_REDIRECT = "https://shiftgo.net/auth/callback";

function getAllowedRedirects(): string[] {
  const raw = process.env.NEXT_PUBLIC_ALLOWED_REDIRECTS ?? "";
  return raw
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
}

export function isAllowedRedirect(target: string | null | undefined): boolean {
  if (!target) return false;
  const allowed = getAllowedRedirects();
  if (allowed.length === 0) return false;
  try {
    const url = new URL(target);
    return allowed.some((candidate) => {
      try {
        const allowedUrl = new URL(candidate);
        return (
          url.protocol === allowedUrl.protocol &&
          url.host === allowedUrl.host &&
          url.pathname === allowedUrl.pathname
        );
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

export function sanitizeRedirect(target: string | null | undefined): string {
  return isAllowedRedirect(target) ? (target as string) : DEFAULT_REDIRECT;
}

export type HandoffParams = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  state?: string | null;
  type?: string;
};

export function buildHandoffUrl(target: string, params: HandoffParams): string {
  const fragment = new URLSearchParams({
    access_token: params.accessToken,
    refresh_token: params.refreshToken,
    expires_at: String(params.expiresAt),
    token_type: "bearer",
    type: params.type ?? "session",
  });
  if (params.state) fragment.set("state", params.state);
  return `${target}#${fragment.toString()}`;
}

export function sessionToHandoffParams(
  session: Session,
  state: string | null
): HandoffParams {
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at ?? Math.floor(Date.now() / 1000) + 3600,
    state,
  };
}

const MOBILE_UA_PATTERNS = [/iPhone/i, /iPad/i, /iPod/i, /Android/i];

export function isMobileUserAgent(ua: string | null | undefined): boolean {
  if (!ua) return false;
  return MOBILE_UA_PATTERNS.some((pattern) => pattern.test(ua));
}
