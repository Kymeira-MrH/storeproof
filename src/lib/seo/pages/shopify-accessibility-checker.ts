import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "shopify-accessibility-checker",
  metaTitle: "Shopify Accessibility Checker — Free WCAG 2.2 Scan",
  metaDescription:
    "Free Shopify accessibility checker. Scan your store against WCAG 2.2 AA, see your exposure, and get a draft accessibility statement. Honest source-level fixes, not an overlay.",
  eyebrow: "Free accessibility checker",
  h1: "Check your Shopify store's accessibility in under a minute",
  lede: "Run a real WCAG 2.2 AA scan of your storefront, see exactly where you're exposed, and get a draft accessibility statement — free, no sales call. Then fix what can genuinely be fixed at the source.",
  sections: [
    {
      h2: "What the checker actually tests",
      body: [
        "StoreProof scans a page of your live store against the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA — the standard regulators, courts and the European Accessibility Act point to. It checks the issues that automated testing can reliably detect.",
      ],
      bullets: [
        "Images missing alt text that screen-reader users rely on",
        "Buttons and links with no accessible name",
        "Form fields without proper labels",
        "Colour contrast that fails AA thresholds",
        "Headings, landmarks and structure a keyboard user needs",
      ],
    },
    {
      h2: "Honest about what a scan can and can't tell you",
      body: [
        "An automated scan is a starting point, not a certificate. Tools like this reliably catch roughly a third to a half of WCAG issues — the machine-detectable ones. The rest need human judgement, and we say so plainly.",
        "That's the difference between StoreProof and an accessibility overlay widget. We never claim a one-click fix makes you compliant. We fix what can be fixed properly, flag what needs a person, and give you the evidence either way.",
      ],
    },
    {
      h2: "From checker to fixed and documented",
      body: [
        "The free scan shows your exposure band and a plain-English issue list. When you're ready, StoreProof writes the safe, source-level fixes back to your store — proper alt text on your product images and the corrections automation can handle reliably — then produces a signed accessibility statement and an evidence pack your lawyer can actually use.",
        "After that, monthly monitoring re-scans your store and alerts you if a theme change or new product reintroduces a problem, so your compliance position doesn't quietly decay.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the Shopify accessibility checker really free?",
      a: "Yes. The one-page WCAG 2.2 AA scan, your exposure band, the issue list and a draft accessibility statement are free with no sales call. Paid plans add automated source-level fixes, the evidence pack and ongoing monitoring.",
    },
    {
      q: "Does a passing scan mean my store is legally compliant?",
      a: "No, and anyone who tells you otherwise is selling you something. Automated scanning catches the machine-detectable share of WCAG issues. Full conformance also needs human testing. We're explicit about which issues we fixed and which we flagged for review.",
    },
    {
      q: "Will the checker change anything on my store?",
      a: "The free scan is read-only — it only looks at a public page and changes nothing. Fixes are applied only later, and only when you connect your store and ask for them.",
    },
    {
      q: "How is this different from an accessibility overlay?",
      a: "Overlays bolt a script onto your site that tries to patch things in the browser. Courts have found they don't deliver compliance, and businesses using them have still been sued. StoreProof fixes issues at the source and documents them, rather than hiding them behind a widget.",
    },
  ],
  ctaHeading: "Run your free Shopify accessibility check",
  ctaSub: "See your exposure band and issue list in under a minute. No sales call, no card.",
  related: [
    { href: "/how-it-works", label: "How StoreProof works" },
    { href: "/overlays", label: "Why overlays get you sued" },
    { href: "/european-accessibility-act-shopify", label: "The EAA and your Shopify store" },
    { href: "/pricing", label: "Pricing" },
  ],
  keywords: [
    "Shopify accessibility checker",
    "Shopify accessibility scan",
    "WCAG 2.2 checker",
    "Shopify WCAG",
    "accessibility checker Shopify",
  ],
};
