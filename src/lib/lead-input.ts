export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Real users type "mystore.com" without a scheme. Assume https:// when it is missing.
export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// The sign-up gate: a scan request must carry a valid email and a usable store URL.
// Normalising + validating here (before the rate limiter and lead save) means a typo
// never burns a scan quota or stores a junk lead.
export function parseSignup(body: unknown): { email: string; url: string } | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (!isValidEmail(b.email)) return null;
  if (typeof b.url !== "string" || b.url.trim().length === 0) return null;
  const url = normalizeUrl(b.url);
  if (!isHttpUrl(url)) return null;
  return { email: b.email, url };
}
