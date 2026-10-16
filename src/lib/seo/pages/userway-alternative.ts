import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "userway-alternative",
  metaTitle: "UserWay Alternative for Shopify — Source-Level Fixes, Not an Overlay",
  metaDescription:
    "Looking for a UserWay alternative? StoreProof fixes accessibility issues in your Shopify source, documents them in a signed evidence pack, and keeps monitoring. An honest comparison of overlays versus real fixes.",
  eyebrow: "Honest comparison",
  h1: "A UserWay alternative that fixes the source, not the surface",
  lede: "UserWay is a widget you add to your store. StoreProof is different: it fixes the accessibility issues automation can handle properly at the source, flags the rest for a human, and gives you a signed evidence pack. Here's a fair, factual comparison for Shopify merchants.",
  sections: [
    {
      h2: "How an overlay widget works, and how StoreProof differs",
      body: [
        "UserWay is an accessibility overlay: you add a small script to your store and it loads a widget in the visitor's browser. It offers a toolbar for things like larger text or higher contrast, and it tries to patch certain issues on the page at runtime. The underlying HTML of your store is left as it was.",
        "StoreProof takes the opposite approach. It scans your storefront against WCAG 2.2 AA, then writes the safe, automatable corrections back into your store's source — so the fix is in the page itself, not bolted on top of it by a script that runs after the page loads.",
      ],
      bullets: [
        "Overlay: a browser-side widget layered over unchanged markup",
        "StoreProof: corrections written into the source your store actually serves",
        "Overlay: toolbar controls the visitor must find and switch on",
        "StoreProof: the page is more accessible by default, for everyone, with no toolbar to discover",
      ],
    },
    {
      h2: "What we're honest about, and what no overlay should claim",
      body: [
        "Automated tooling — ours included — reliably catches only about a third to a half of WCAG issues. Those are the machine-detectable ones: missing alt text, unlabelled form fields, contrast failures, buttons with no accessible name. The remainder need human judgement, and we say so plainly rather than implying a single script makes you compliant.",
        "This matters because accessibility overlays have been widely criticised by the accessibility community, and using one has not reliably prevented legal claims. We won't speak for UserWay's own results, and we won't invent figures. The general, defensible point is simply this: a widget that patches the browser is not the same as fixing your store, and it is not a compliance guarantee. Nobody can honestly promise guaranteed compliance from an automated tool.",
      ],
    },
    {
      h2: "Fixes, evidence and monitoring for Shopify",
      body: [
        "StoreProof fixes what can be fixed properly at the source — proper alt text on your product images and the corrections automation can apply reliably — and flags the issues that genuinely need a person, so nothing is quietly papered over.",
        "It then produces a signed accessibility statement and an evidence pack: a dated, documented record of what was tested, what was fixed and what was flagged, that your lawyer can actually use. Monthly monitoring re-scans your store and alerts you when a theme change or a new product reintroduces a problem, so your position doesn't silently decay between audits.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is StoreProof a drop-in replacement for the UserWay widget?",
      a: "Not in the sense of a toolbar. StoreProof doesn't add an overlay widget to your store. It fixes the automatable issues in your source, documents everything in an evidence pack, and monitors for regressions. If what you want is a visitor-facing toolbar, that's a different product category; if you want your store to actually be more accessible and to have proof, that's what StoreProof does.",
    },
    {
      q: "Will switching from an overlay make my store compliant?",
      a: "No automated tool can promise that, and we won't. Automated scanning reliably catches roughly a third to a half of WCAG 2.2 issues. StoreProof fixes that automatable share at the source and clearly flags what still needs human testing. Full conformance requires human judgement on top — we're explicit about the boundary.",
    },
    {
      q: "Are accessibility overlays actually a problem?",
      a: "Factually and generally: overlays have been widely criticised by the accessibility community, and businesses using them have still faced legal claims. We won't put words in any vendor's mouth or quote figures we can't stand behind. The difference in approach is the honest point — an overlay patches the browser at runtime, StoreProof changes the source and documents it.",
    },
    {
      q: "Do I need to remove UserWay before using StoreProof?",
      a: "You don't have to for StoreProof to work, because the two operate at different layers — StoreProof edits your source while an overlay runs in the browser. That said, many merchants choose to remove the overlay once their source is fixed and documented, so they're not paying for a widget that no longer earns its place.",
    },
    {
      q: "What do I actually get that an overlay doesn't provide?",
      a: "Source-level fixes that improve the page for everyone by default, a signed accessibility statement, a dated evidence pack showing exactly what was tested, fixed and flagged, and ongoing monitoring that catches regressions. That's a documented, defensible position rather than a script layered over unchanged markup.",
    },
  ],
  ctaHeading: "See what a real fix looks like for your store",
  ctaSub: "Run a free WCAG 2.2 AA scan, see your exposure, and compare it honestly against the overlay approach. No sales call.",
  related: [
    { href: "/accessibility-overlay-alternative", label: "The honest overlay alternative" },
    { href: "/overlays", label: "Why overlays get you sued" },
    { href: "/accessibe-alternative", label: "accessiBe alternative" },
    { href: "/how-it-works", label: "How StoreProof works" },
  ],
  keywords: [
    "UserWay alternative",
    "UserWay alternative Shopify",
    "accessibility overlay alternative",
    "Shopify accessibility fixes",
    "UserWay vs StoreProof",
  ],
};
