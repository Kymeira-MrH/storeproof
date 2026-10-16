import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "accessibe-alternative",
  metaTitle: "accessiBe Alternative — Source-Level Fixes, Not an Overlay",
  metaDescription:
    "An honest accessiBe alternative for Shopify. accessiBe is an accessibility overlay; StoreProof fixes WCAG 2.2 AA issues at the source, flags what needs a person, and documents both.",
  eyebrow: "accessiBe alternative",
  h1: "A fair, honest alternative to accessiBe",
  lede: "accessiBe is one of the best-known accessibility overlay vendors. Its product works one way — a widget that adjusts your site in the browser. StoreProof works differently: it fixes issues in your store's source, flags what needs human judgement, and documents both. Here's the straight comparison, no spin.",
  sections: [
    {
      h2: "How the two approaches differ",
      body: [
        "accessiBe is an accessibility overlay. Like other widgets in that category, it loads a script onto your site that attempts to detect and adjust accessibility issues live in the visitor's browser, plus a toolbar of toggles for things like contrast and text size. The approach is to patch the experience at runtime rather than change your underlying code.",
        "StoreProof takes the source-level route. It scans against WCAG 2.2 AA, then writes the safe, reliable corrections back into your store's own content — proper alt text, accessible names on controls, the fixes automation can make without guessing. The improvement lives in your markup, so it holds whether or not any script loads. That's the honest difference: overlays work on top of your site; StoreProof works inside it.",
      ],
      bullets: [
        "Overlay: a runtime widget adjusts the page in the browser",
        "Source-level: corrections are written into your store's own content",
        "Overlay: depends on a script loading correctly on every visit",
        "Source-level: the fix stays in your markup with nothing extra to run",
      ],
    },
    {
      h2: "What's fair to say about overlays and the law",
      body: [
        "It's worth being factual here rather than scaremongering. Overlay widgets have faced regulatory scrutiny over how they are marketed — notably, the US Federal Trade Commission took action in 2025 against an overlay vendor over claims that its product could make websites compliant. The broader, well-established point is simpler: regulators and courts look at whether a site is genuinely accessible, and an overlay does not by itself guarantee that outcome. Businesses using overlays have still faced accessibility complaints.",
        "We won't invent figures, quotes or case details to make a vendor look bad. The defensible point stands on its own: a widget layered over your site is not the same as fixing the site, and no automated product — overlay or otherwise — can honestly promise compliance.",
      ],
    },
    {
      h2: "Honest about what automation can and can't do",
      body: [
        "Any vendor promising one-click or guaranteed compliance is overselling. Automated tooling reliably catches only roughly a third to a half of WCAG issues. The rest — meaningful alt text, logical reading order, genuinely usable keyboard journeys — need human judgement, full stop.",
        "StoreProof fixes the automatable share at the source, flags everything else in plain English for a person to review, and documents both. You get a signed accessibility statement and an evidence pack recording exactly what was fixed and what was flagged — so your compliance position is honest and defensible, not a black box that claims it handled everything.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is StoreProof the same kind of product as accessiBe?",
      a: "No. accessiBe is an accessibility overlay — a widget that adjusts your site in the browser at runtime. StoreProof fixes issues in your store's actual source content and documents them. They solve the problem in fundamentally different places: on top of your site versus inside it.",
    },
    {
      q: "Is it true that overlay vendors have faced legal scrutiny?",
      a: "Yes, factually. Overlay widgets have drawn regulatory attention over compliance-related marketing claims — for example, the US FTC took action in 2025 against an overlay vendor over claims its product could make sites compliant. More generally, regulators and courts judge whether a site is genuinely accessible, and an overlay does not guarantee that on its own.",
    },
    {
      q: "Can StoreProof promise my store will be compliant?",
      a: "No, and neither can any overlay. Automated tooling catches only about a third to a half of WCAG issues; the rest need human judgement. We fix the automatable share properly at the source, flag what a person must review, and document both — honestly, with evidence.",
    },
    {
      q: "Why choose a source-level approach over an overlay?",
      a: "Because the fix lives in your store's own content rather than a script running on top of it. That means the improvement holds even if a widget fails to load, there's nothing extra executing on every visit, and you get a documented record of exactly what changed — which is what evidence-minded regulators and lawyers actually want to see.",
    },
    {
      q: "Can I switch from accessiBe to StoreProof?",
      a: "Yes. You can remove the overlay script and let StoreProof correct issues in your store's own content instead. Start with a free WCAG 2.2 AA scan to see your exposure band, then decide what you'd like fixed and documented.",
    },
  ],
  ctaHeading: "Compare for yourself — run a free scan",
  ctaSub: "See your WCAG 2.2 AA exposure band and issue list in under a minute. No sales call, no card.",
  related: [
    { href: "/overlays", label: "Why overlays get you sued" },
    { href: "/userway-alternative", label: "UserWay alternative" },
    { href: "/audioeye-alternative", label: "AudioEye alternative" },
    { href: "/how-it-works", label: "How StoreProof works" },
  ],
  keywords: [
    "accessiBe alternative",
    "alternative to accessiBe",
    "accessiBe vs StoreProof",
    "accessiBe overlay alternative",
    "Shopify accessiBe alternative",
  ],
};
