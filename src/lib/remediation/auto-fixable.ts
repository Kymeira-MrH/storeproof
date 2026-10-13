// Axe rule IDs StoreProof can remediate automatically at the source —
// alt text written to product/theme data, and safe theme attribute fixes.
// Everything NOT in this set is flagged for human review and never faked.
export const AUTO_FIXABLE: ReadonlySet<string> = new Set([
  "image-alt",
  "role-img-alt",
  "svg-img-alt",
  "input-image-alt",
  "object-alt",
  "area-alt",
  "document-title",
  "html-has-lang",
  "html-lang-valid",
  "html-xml-lang-mismatch",
  "valid-lang",
  "meta-viewport",
  "meta-viewport-large",
  "duplicate-id",
  "duplicate-id-active",
  "duplicate-id-aria",
  "frame-title",
]);

export function isAutoFixable(ruleId: string): boolean {
  return AUTO_FIXABLE.has(ruleId);
}

// Plain-English description of what the automated fix does, by rule family.
export function fixAction(ruleId: string): string {
  if (["image-alt", "role-img-alt", "svg-img-alt", "input-image-alt", "object-alt", "area-alt"].includes(ruleId))
    return "We write descriptive alt text to your images and product media.";
  if (["html-has-lang", "html-lang-valid", "html-xml-lang-mismatch", "valid-lang"].includes(ruleId))
    return "We set the correct page language in your theme.";
  if (ruleId === "document-title") return "We set a descriptive page title in your theme.";
  if (["meta-viewport", "meta-viewport-large"].includes(ruleId))
    return "We fix the viewport tag so visitors can zoom.";
  if (["duplicate-id", "duplicate-id-active", "duplicate-id-aria"].includes(ruleId))
    return "We de-duplicate conflicting element IDs in your theme.";
  if (ruleId === "frame-title") return "We add titles to embedded frames.";
  return "Remediated automatically at the source.";
}
