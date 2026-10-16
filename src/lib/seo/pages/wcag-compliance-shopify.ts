import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "wcag-compliance-shopify",
  metaTitle: "WCAG 2.2 AA Compliance for Shopify — What It Really Means",
  metaDescription:
    "What WCAG 2.2 AA actually means for a Shopify store, the failures that show up most on Shopify themes, and how to reach and maintain conformance — with monitoring, not a one-click promise.",
  eyebrow: "WCAG compliance for Shopify",
  h1: "WCAG 2.2 AA on Shopify: what it means and how to maintain it",
  lede: "WCAG 2.2 Level AA is the standard regulators, courts and the European Accessibility Act point to. Here's what it actually requires of a Shopify store, where Shopify themes most often fall short, and how you reach conformance and keep it — because it's not a one-and-done.",
  sections: [
    {
      h2: "What WCAG 2.2 AA means in practice for a Shopify store",
      body: [
        "The Web Content Accessibility Guidelines (WCAG) 2.2 are organised around four principles: your store should be perceivable, operable, understandable and robust. Level AA is the conformance target almost everyone is held to — it's what the European Accessibility Act and EN 301 549 effectively require for e-commerce.",
        "On a real storefront that translates into concrete things: a shopper using a screen reader can tell what every product image shows and what every button does; a shopper using only a keyboard can browse, filter, add to cart and complete checkout without a mouse; text meets AA contrast against its background; form errors are announced clearly; and nothing flashes or moves in a way that causes harm. WCAG 2.2 also added criteria that matter for commerce — larger, clearer focus indicators, controls that aren't hidden behind sticky headers, and not forcing people to re-enter information they've already given.",
      ],
    },
    {
      h2: "Where Shopify themes most often fail AA",
      body: [
        "Most Shopify stores aren't inaccessible on purpose — the gaps come from theme defaults, app widgets and day-to-day merchandising. These are the failures we see again and again:",
      ],
      bullets: [
        "Product and lifestyle images with missing or useless alt text (file names, or nothing at all)",
        "Icon-only buttons — cart, search, menu, quantity steppers — with no accessible name",
        "Colour contrast that fails AA on sale badges, placeholder text, and muted secondary buttons",
        "Carousels, drawers and pop-ups that trap keyboard focus or can't be dismissed with a keyboard",
        "Form fields relying on placeholder text instead of real labels, and errors shown only by colour",
        "Low-contrast or invisible focus states, which WCAG 2.2 tightened up specifically",
      ],
    },
    {
      h2: "How to reach conformance — and be honest about the limits",
      body: [
        "Start by measuring. An automated scan against WCAG 2.2 AA finds the machine-detectable issues fast — and that's a genuinely useful share of the work. But be clear-eyed: automated tools reliably catch only about a third to a half of WCAG issues. The rest — does the checkout flow actually make sense to a screen-reader user, is the alt text meaningful, is the focus order logical — needs human judgement. Any product claiming a scan or a one-click toggle makes you 'compliant' is misleading you.",
        "StoreProof fixes the automatable share properly, at the source — correct alt text on your product images, accessible names and labels put right in your theme — and flags everything that needs a person, with guidance. We never bolt on an accessibility overlay; overlays try to patch issues in the browser, courts have found they don't deliver conformance, and merchants using them have still been sued. You get a store that's genuinely closer to AA and a signed accessibility statement that reflects your true position, not a rubber stamp.",
      ],
    },
    {
      h2: "Maintaining conformance, not just reaching it",
      body: [
        "Reaching AA once is the easy part to understand; keeping it is where most stores slip. Every new product, theme update, installed app or seasonal homepage can reintroduce a failure you'd already cleared — and nobody notices until a customer complains or a regulator asks.",
        "Conformance is a state you maintain, not a certificate you file. Monthly monitoring re-scans your store against WCAG 2.2 AA and alerts you the moment something regresses, so the automatable issues get caught again and your accessibility statement keeps telling the truth. That's how you hold a conformance position over time instead of watching it quietly decay.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is WCAG 2.2 AA and does my Shopify store need it?",
      a: "WCAG 2.2 Level AA is the web accessibility standard that regulators, courts and the European Accessibility Act point to for e-commerce. If you sell to customers in the EU — or simply want to reduce legal risk and serve disabled shoppers — AA is the target your Shopify store should be measured against.",
    },
    {
      q: "Can a tool make my Shopify store WCAG compliant automatically?",
      a: "No, and claims to the contrary are a red flag. Automated tools reliably detect only around a third to a half of WCAG issues. The remainder need human judgement. We fix the automatable share at the source, flag the rest for a person, and document both — rather than pretending a one-click toggle does the job.",
    },
    {
      q: "What are the most common WCAG failures on Shopify?",
      a: "Missing or unhelpful image alt text, icon-only buttons with no accessible name, colour contrast failures on badges and secondary buttons, keyboard traps in carousels and pop-ups, form fields without real labels, and weak focus indicators — the last of which WCAG 2.2 specifically tightened.",
    },
    {
      q: "Is an accessibility overlay a quick way to get WCAG compliance?",
      a: "No. Overlays are exactly what we're an alternative to. They inject a script that tries to patch problems in the browser, courts have found they don't deliver conformance, and businesses using them have still faced legal action. Fixing issues at the source and documenting them is the honest route.",
    },
    {
      q: "How do I keep my store conformant after I've fixed it?",
      a: "Treat conformance as ongoing. Because theme changes, new products and apps can reintroduce failures, monthly monitoring re-scans your store against WCAG 2.2 AA and alerts you when something regresses, keeping your accessibility statement accurate instead of letting your position decay.",
    },
  ],
  ctaHeading: "Measure your store against WCAG 2.2 AA",
  ctaSub: "Run a free scan, see your exposure band, and get a draft accessibility statement. No sales call.",
  related: [
    { href: "/shopify-accessibility-checker", label: "Free Shopify accessibility checker" },
    { href: "/european-accessibility-act-shopify", label: "The EAA and your Shopify store" },
    { href: "/accessibility-overlay-alternative", label: "The honest alternative to overlays" },
    { href: "/how-it-works", label: "How StoreProof works" },
  ],
  keywords: [
    "WCAG compliance Shopify",
    "WCAG 2.2 AA Shopify",
    "Shopify WCAG compliance",
    "Shopify WCAG 2.2",
    "WCAG AA Shopify store",
  ],
};
