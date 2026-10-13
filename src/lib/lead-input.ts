export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// The sign-up gate: a scan request must carry a valid email and a store URL.
export function parseSignup(body: unknown): { email: string; url: string } | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (!isValidEmail(b.email)) return null;
  if (typeof b.url !== "string" || b.url.trim().length === 0) return null;
  return { email: b.email, url: b.url };
}
