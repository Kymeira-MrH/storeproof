// Axe rule IDs StoreProof actually remediates automatically today: alt text
// written to product images via the Shopify Admin API. Everything else —
// including theme-level attributes we may automate later — is flagged for human
// review and never faked, so the "we fix these" claim only promises what the
// write-back engine genuinely does.
export const AUTO_FIXABLE: ReadonlySet<string> = new Set([
  "image-alt",
  "role-img-alt",
  "svg-img-alt",
  "input-image-alt",
  "object-alt",
  "area-alt",
]);

export function isAutoFixable(ruleId: string): boolean {
  return AUTO_FIXABLE.has(ruleId);
}

// Plain-English description of the automated fix (only alt-text today).
export function fixAction(_ruleId: string): string {
  return "We write descriptive alt text to your images and product media.";
}
