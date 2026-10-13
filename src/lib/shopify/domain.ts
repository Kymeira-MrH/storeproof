// Shopify Admin API is only addressable via the *.myshopify.com host. Validating
// against this exact shape is also our SSRF guard: a merchant-supplied "domain"
// can never be pointed at an internal host.
const SHOP_RE = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/;

export function normalizeShopDomain(input: string): string | null {
  const s = (input || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/\s/g, "");
  return SHOP_RE.test(s) ? s : null;
}
