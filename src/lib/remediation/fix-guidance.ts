// Our own plain-English "how to fix" guidance for the findings that need human
// judgement — shown inline in the dashboard instead of linking merchants out to
// a third-party reference site.
const GUIDANCE: Record<string, string> = {
  "color-contrast":
    "Increase the contrast between the text and its background to at least 4.5:1 (3:1 for large text). Adjust the colours in your theme settings or CSS — usually darkening the text or lightening the background.",
  "link-name":
    "Give the link real, descriptive text. If it only holds an icon or image, add visible text or an aria-label so its destination is clear to a screen reader.",
  "button-name":
    "Give the button an accessible name — visible text, or an aria-label when it's icon-only (e.g. a cart or close button).",
  label:
    "Associate every form field with a <label> using matching for and id attributes, so screen readers announce what each field is for.",
  "select-name": "Give each dropdown (<select>) an associated <label>.",
  "form-field-multiple-labels": "Make sure each form field has exactly one label, not several competing ones.",
  "heading-order":
    "Use headings in order (h1 → h2 → h3) without skipping levels, so the page outline is logical for screen-reader navigation.",
  "empty-heading": "Remove empty headings or give them text. A heading with no content disrupts navigation.",
  "landmark-one-main": "Wrap your primary content in a single <main> landmark so users can jump straight to it.",
  region:
    "Place page content inside landmark regions (header, nav, main, footer) so assistive-tech users can move between sections.",
  list: "Ensure <ul>/<ol> contain only <li> children — don't wrap other elements directly inside a list.",
  listitem: "Make sure every <li> sits directly inside a <ul> or <ol>.",
  "link-in-text-block":
    "Distinguish links from surrounding text by more than colour alone — add an underline so colour-blind users can spot them.",
  tabindex: "Avoid positive tabindex values. Let the natural DOM order control keyboard focus.",
  "nested-interactive": "Don't nest interactive controls (e.g. a button inside a link). Keep one interactive element per control.",
  "scrollable-region-focusable":
    "Make scrollable areas keyboard-focusable (tabindex=\"0\") so keyboard-only users can scroll them.",
  "target-size": "Make tap targets at least 24×24 CSS pixels so they're easy to activate on touch screens.",
  "aria-allowed-attr": "Remove or correct ARIA attributes that aren't allowed on this element's role.",
  "aria-required-attr": "Add the ARIA attributes this role requires to be understood by assistive tech.",
  "aria-required-children": "Ensure this ARIA role contains the child roles it needs (e.g. a list containing list items).",
  "aria-required-parent": "Ensure this element sits inside the parent role its ARIA role requires.",
  "aria-roles": "Use a valid ARIA role that matches what the element actually does.",
  "aria-valid-attr-value": "Correct the value of this ARIA attribute so it's valid.",
  "aria-hidden-focus": "Don't place focusable elements inside an aria-hidden container — they become unreachable yet still focusable.",
};

const FALLBACK =
  "Fix this at the source in your theme or product content so it meets WCAG 2.2 AA. On the Fix & Watch plan we walk through the exact change during remediation.";

export function fixGuidance(ruleId: string): string {
  return GUIDANCE[ruleId] ?? FALLBACK;
}
