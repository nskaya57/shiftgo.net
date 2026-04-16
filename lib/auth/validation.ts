const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationResult = { ok: true } | { ok: false; error: string };

export function validateEmail(value: string): ValidationResult {
  const trimmed = value.trim();
  if (!trimmed) return { ok: false, error: "emailRequired" };
  if (!EMAIL_RE.test(trimmed)) return { ok: false, error: "emailInvalid" };
  return { ok: true };
}

export function validatePassword(value: string): ValidationResult {
  if (!value) return { ok: false, error: "passwordRequired" };
  if (value.length < 8) return { ok: false, error: "passwordTooShort" };
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  if (!hasLetter || !hasNumber) {
    return { ok: false, error: "passwordNoLetterNumber" };
  }
  return { ok: true };
}

const SUPABASE_ERROR_MAP: Record<string, string> = {
  invalid_credentials: "invalidCredentials",
  email_not_confirmed: "emailNotConfirmed",
  user_already_exists: "userAlreadyRegistered",
  weak_password: "weakPassword",
  over_email_send_rate_limit: "rateLimit",
  over_request_rate_limit: "rateLimit",
  rate_limit_exceeded: "rateLimit",
};

export function mapSupabaseError(
  code: string | null | undefined,
  message?: string | null
): string {
  if (code && SUPABASE_ERROR_MAP[code]) return SUPABASE_ERROR_MAP[code];
  const haystack = `${code ?? ""} ${message ?? ""}`.toLowerCase();
  if (haystack.includes("network") || haystack.includes("fetch")) return "network";
  if (haystack.includes("rate limit")) return "rateLimit";
  if (haystack.includes("invalid login")) return "invalidCredentials";
  if (haystack.includes("email not confirmed")) return "emailNotConfirmed";
  if (haystack.includes("already registered")) return "userAlreadyRegistered";
  return "generic";
}
