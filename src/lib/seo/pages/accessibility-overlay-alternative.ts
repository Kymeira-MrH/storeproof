import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "accessibility-overlay-alternative",
  metaTitle: "Accessibility Overlay Alternative — Source-Level Shopify Fixes",
  metaDescription:
    "A real alternative to accessibility overlay widgets. StoreProof fixes WCAG 2.2 AA issues at the source, flags what needs a person, and documents both — no runtime script bolted on.",
  eyebrow: "Overlay alternative",
  h1: "The honest alternative to an accessibility overlay",
  lede: "Overlay widgets promise one-click compliance by injecting a script into your store at runtime. They don't fix the underlying code, the accessibility community broadly rejects them, and businesses using them have still been sued. StoreProof does the opposite: it fixes what it can at the source, flags what needs human judgement, and gives you the evidence either way.",
  sections: [
    {
      h2: "Why overlay widgets fail",
      body: [
        "An accessibility overlay is a snippet of JavaScript you paste into your theme. When a visitor loads a page, the script tries to detect and patch problems live in the browser — adding labels, adjusting contrast, offering a toolbar of toggles. The original code is never touched. The moment the script fails to load, is blocked, or misreads your markup, the barriers are back.",
        "The accessibility community has broadly rejected this approach, and for concrete reasons, not ideology. Real assistive-technology users report overlays interfering with the screen readers and browser settings they already rely on. And crucially, using an overlay has not protected businesses from legal action — companies running well-known widgets have still faced accessibility complaints and lawsuits.",
      ],
      bullets: [
        "Patches symptoms in the browser instead of fixing the source code",
        "Can conflict with the screen readers and settings disabled users already run",
        "Breaks silently if the script is blocked, slow, or misreads your markup",
        "Has not reliably protected merchants from accessibility complaints",
        "Markets a one-click fix that no automated tool can honestly deliver",
      ],
    },
    {
      h2: "What a source-level alternative looks like",
      body: [
        "StoreProof scans a page of your live store against the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA — the standard the European Accessibility Act and EN 301 549 point to. Then, instead of hiding issues behind a widget, it writes the safe, reliable corrections back into your store's own content: proper alt text on product images, accessible names on buttons and links, the fixes automation can handle without guessing.",
        "The result is a store that is genuinely more accessible whether or not any script loads, because the improvement lives in your markup rather than in a browser overlay that runs on top of it.",
      ],
    },
    {
      h2: "Honest about the automatable share",
      body: [
        "Here is the part overlay marketing never admits: automated tooling reliably catches only roughly a third to a half of WCAG issues. The rest — meaningful alt text that describes intent, logical reading order, genuinely usable keyboard flows — need human judgement. No widget and no scanner changes that.",
        "So StoreProof fixes the automatable share at the source, flags the rest in plain English for a person to review, and documents both. You get a signed accessibility statement and an evidence pack that records exactly what was fixed and what was flagged — the opposite of a black-box toolbar that claims it handled everything.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is wrong with accessibility overlays?",
      a: "Overlays inject a script that tries to patch accessibility problems live in the browser without fixing the underlying code. The accessibility community broadly rejects them, assistive-technology users report them interfering with their own tools, and businesses that installed them have still been sued. They treat the symptom, not the cause.",
    },
    {
      q: "How is StoreProof different from an overlay?",
      a: "StoreProof fixes issues in your store's actual content at the source — proper alt text, accessible names, the corrections automation can make reliably — rather than bolting a runtime widget on top. The improvement stays in your markup even if no script runs, and every change is documented.",
    },
    {
      q: "Does a source-level fix guarantee compliance?",
      a: "No, and we won't claim it does. Automated tooling catches only about a third to a half of WCAG issues; the rest need human judgement. We fix the automatable share properly, flag what a person needs to review, and document both so your compliance position is honest and evidenced.",
    },
    {
      q: "Can I remove an overlay and switch to StoreProof?",
      a: "Yes. You can remove the overlay script and let StoreProof fix issues in your store's own content instead. Because the corrections live in your markup rather than a widget, your store stays improved without depending on a script loading on every visit.",
    },
    {
      q: "Will switching from an overlay slow down my store?",
      a: "Source-level fixes add nothing for the browser to run on each visit — there is no extra widget loading on top of your pages. Overlays, by contrast, inject a script that executes for every visitor.",
    },
  ],
  ctaHeading: "See what a source-level fix finds",
  ctaSub: "Run a free WCAG 2.2 AA scan and get your exposure band in under a minute. No sales call, no card.",
  related: [
    { href: "/overlays", label: "Why overlays get you sued" },
    { href: "/how-it-works", label: "How StoreProof works" },
    { href: "/shopify-accessibility-checker", label: "Free Shopify accessibility checker" },
    { href: "/proof", label: "The evidence pack explained" },
  ],
  keywords: [
    "accessibility overlay alternative",
    "overlay alternative",
    "accessibility widget alternative",
    "alternative to accessibility overlay",
    "source-level accessibility fixes",
  ],
};
