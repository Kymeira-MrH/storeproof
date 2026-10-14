// Plain-English "how to fix" guidance for findings that need human judgement,
// shown inline in the dashboard. Each entry can include a concrete before/after
// example so non-technical merchants can see the actual change, not just read words.
export interface FixGuidance {
  text: string;
  bad?: string;
  good?: string;
}

const GUIDANCE: Record<string, FixGuidance> = {
  "image-alt": {
    text: "We generate accurate alt text from each image with Claude vision and write it to your product.",
    bad: `<img src="snowboard.jpg">`,
    good: `<img src="snowboard.jpg"
  alt="Navy snowboard with blue mountain graphic">`,
  },
  "html-has-lang": {
    text: "We set the page language so screen readers use the right pronunciation.",
    bad: `<html>`,
    good: `<html lang="en">`,
  },
  "document-title": {
    text: "We set a descriptive page title.",
    bad: `<title></title>`,
    good: `<title>Winter Jackets — Your Store</title>`,
  },
  "meta-viewport": {
    text: "We fix the viewport tag so visitors can pinch-to-zoom.",
    bad: `<meta name="viewport"
  content="width=device-width, maximum-scale=1">`,
    good: `<meta name="viewport"
  content="width=device-width, initial-scale=1">`,
  },
  "duplicate-id": {
    text: "We make conflicting element IDs unique.",
    bad: `<div id="main"> … <div id="main">`,
    good: `<div id="main"> … <div id="main-2">`,
  },
  "frame-title": {
    text: "We add a title to embedded frames.",
    bad: `<iframe src="…">`,
    good: `<iframe src="…" title="Size guide">`,
  },
  "color-contrast": {
    text: "Make the text darker (or its background lighter) so it's easy to read. Text needs a contrast ratio of at least 4.5:1 against its background. You can change this in your theme's colour settings.",
    bad: `Light grey on white — too faint:
color: #aaaaaa;   /* fails */`,
    good: `Darker grey — easy to read:
color: #595959;   /* passes 4.5:1 */`,
  },
  "link-name": {
    text: "Every link needs text that says where it goes. If a link is just an icon or image, add a hidden label so a screen reader can announce it.",
    bad: `<a href="/cart"><img src="cart.svg"></a>`,
    good: `<a href="/cart" aria-label="View your cart">
  <img src="cart.svg" alt="">
</a>`,
  },
  "button-name": {
    text: "Every button needs a name. If it's an icon-only button (like a close ✕ or a search 🔍), add a label so people using screen readers know what it does.",
    bad: `<button>✕</button>`,
    good: `<button aria-label="Close">✕</button>`,
  },
  label: {
    text: "Every form box needs a visible label that's properly linked to it, so screen-reader users know what to type. Placeholder text alone is not enough.",
    bad: `<input type="email" placeholder="Email">`,
    good: `<label for="email">Email</label>
<input id="email" type="email">`,
  },
  "select-name": {
    text: "Give each dropdown a linked label, the same way you would a text box.",
    bad: `<select>…</select>`,
    good: `<label for="size">Size</label>
<select id="size">…</select>`,
  },
  "heading-order": {
    text: "Headings should go in order — a big heading (H1), then H2, then H3 — without skipping a level. Think of it like a document's table of contents.",
    bad: `<h1>Shop</h1>
<h4>New arrivals</h4>   <!-- skipped H2 and H3 -->`,
    good: `<h1>Shop</h1>
<h2>New arrivals</h2>`,
  },
  "empty-heading": {
    text: "Remove headings that have no text, or give them wording. An empty heading confuses screen-reader navigation.",
    bad: `<h2></h2>`,
    good: `<h2>Featured products</h2>`,
  },
  "link-in-text-block": {
    text: "Links sitting inside a paragraph must stand out by more than colour — add an underline — so colour-blind readers can spot them.",
    bad: `a { color: green; text-decoration: none; }`,
    good: `a { color: green; text-decoration: underline; }`,
  },
  list: {
    text: "A list (<ul> or <ol>) should contain only list items (<li>) — don't put other elements directly between them.",
    bad: `<ul>
  <div>Item</div>
</ul>`,
    good: `<ul>
  <li>Item</li>
</ul>`,
  },
  listitem: {
    text: "Every list item (<li>) must sit directly inside a <ul> or <ol>.",
    bad: `<div><li>Item</li></div>`,
    good: `<ul><li>Item</li></ul>`,
  },
  "target-size": {
    text: "Make buttons and tap targets big enough to press on a phone — at least 24×24 pixels, ideally larger — with a little space around them.",
    bad: `.icon-btn { width: 16px; height: 16px; }`,
    good: `.icon-btn { width: 44px; height: 44px; }`,
  },
  "scrollable-region-focusable": {
    text: "If an area scrolls, make it reachable by keyboard so people who don't use a mouse can scroll it too.",
    bad: `<div class="scroll">…</div>`,
    good: `<div class="scroll" tabindex="0">…</div>`,
  },
  "nested-interactive": {
    text: "Don't put one clickable thing inside another (like a button inside a link). Keep one control per element.",
    bad: `<a href="/p"><button>Buy</button></a>`,
    good: `<a href="/p" class="button">Buy</a>`,
  },
  region: {
    text: "Wrap your page content in landmark areas (header, nav, main, footer) so screen-reader users can jump between the main sections quickly.",
    bad: `<div>…page content…</div>`,
    good: `<main>…page content…</main>`,
  },
  "aria-allowed-attr": {
    text: "Remove ARIA attributes that aren't valid for this element. ARIA used incorrectly is worse than none — if you're unsure, it's safest to leave it out.",
  },
  "aria-valid-attr-value": {
    text: "An ARIA attribute here has an invalid value. Correct it so assistive technology can understand the element.",
  },
  "aria-required-attr": {
    text: "This element's ARIA role needs extra attributes to make sense to a screen reader. Add the required ones, or remove the role.",
  },
};

const FALLBACK: FixGuidance = {
  text: "Fix this in your theme or product content so it meets WCAG 2.2 AA. On the Fix & Watch plan we walk through the exact change with you during remediation.",
};

export function fixGuidance(ruleId: string): FixGuidance {
  return GUIDANCE[ruleId] ?? FALLBACK;
}
