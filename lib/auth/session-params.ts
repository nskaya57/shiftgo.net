export type HandoffContext = {
  redirectTo: string;
  state: string | null;
};

export const HANDOFF_STORAGE_KEY = "shiftgo_auth_handoff";

export function readHandoffContext(): HandoffContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(HANDOFF_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as HandoffContext;
    if (typeof parsed.redirectTo !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeHandoffContext(ctx: HandoffContext): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify(ctx));
  } catch {
    // ignore storage errors (e.g. private mode quota)
  }
}

export function clearHandoffContext(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(HANDOFF_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function extractHandoffFromSearchParams(
  searchParams: URLSearchParams
): HandoffContext | null {
  const redirectTo = searchParams.get("redirect_to");
  if (!redirectTo) return null;
  const state = searchParams.get("state");
  return { redirectTo, state };
}
