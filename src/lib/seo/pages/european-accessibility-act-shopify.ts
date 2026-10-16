import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "european-accessibility-act-shopify",
  metaTitle: "European Accessibility Act & Shopify — What EAA Means for Your Store",
  metaDescription:
    "The European Accessibility Act has applied since 28 June 2025. Here's what the EAA means for Shopify merchants selling into the EU — who it covers, the EN 301 549 / WCAG 2.1 benchmark, and honest next steps. Not legal advice.",
  eyebrow: "The EAA, explained for merchants",
  h1: "The European Accessibility Act and your Shopify store",
  lede: "If you sell to consumers in the EU, the European Accessibility Act now shapes what your storefront has to do. Here's a measured, jargon-free explanation of what the EAA is, who it covers, the standard it points to, and the practical steps that put you in a defensible position — without the scare tactics.",
  sections: [
    {
      h2: "What the European Accessibility Act is",
      body: [
        "The European Accessibility Act (EAA) is an EU directive that sets common accessibility requirements for a range of products and services, including e-commerce. Rather than leaving every country to invent its own rules, it establishes a shared baseline so that goods and services sold across the EU are accessible to people with disabilities.",
        "Because it's a directive, each EU member state transposes it into its own national law. That means the broad obligations are consistent across the bloc, but the fine detail — how it's worded, who enforces it, and what happens when you fall short — is set country by country.",
        "For an online shop, the headline is simple: your storefront and checkout should be usable by people who rely on screen readers, keyboard navigation, sufficient colour contrast and other assistive approaches. Accessibility stops being a nice-to-have and becomes a baseline expectation of selling online in the EU.",
      ],
    },
    {
      h2: "It has applied since 28 June 2025 — and who it covers",
      body: [
        "The EAA's requirements have applied since 28 June 2025. That date has passed, so this is a live obligation, not something on the horizon. If you're reading this and you sell into the EU, the relevant question is where you stand today, not whether you have time to prepare.",
        "In broad terms it covers businesses that offer products or services to consumers in the EU, and e-commerce services sit squarely within scope. If EU shoppers can buy from your Shopify store, you should treat yourself as in scope and check your position properly.",
        "There are some limited exemptions — notably, very small micro-enterprises providing services can fall outside parts of the regime. But the thresholds and exactly how they apply vary by member state, and the safe assumption is that you are covered unless you've confirmed otherwise. Don't talk yourself out of checking on the strength of a half-remembered exemption; verify it against the national law that applies to you.",
      ],
      bullets: [
        "Businesses selling products or services to consumers in the EU",
        "E-commerce services, including online storefronts and checkout",
        "Micro-enterprises providing services may have limited exemptions — but should still check their national transposition rather than assume",
      ],
    },
    {
      h2: "Enforcement, penalties and the technical benchmark",
      body: [
        "Enforcement and penalties are set by each EU member state, so they vary. Some countries lean on market-surveillance authorities and complaints-driven investigations; others attach financial penalties. We won't quote a specific figure here, because any single number would be misleading across 27 different national regimes — the honest answer is that it depends on where your customers are and how that country has implemented the directive.",
        "On the technical side, the picture is clearer. The harmonised standard referenced for digital accessibility in the EU is EN 301 549, and its web requirements map onto the Web Content Accessibility Guidelines (WCAG) at version 2.1 / 2.2, Level AA. In practice that means building and maintaining your store to WCAG 2.1 / 2.2 AA is the concrete, testable target that demonstrates you're taking the EAA seriously.",
        "That's useful, because WCAG is something you can actually measure against. It turns a legal directive into a checklist of real, specific things — alt text, labelled form fields, keyboard operability, contrast — that you can test, fix and document.",
      ],
      bullets: [
        "Penalties and enforcement differ per member state — there is no single EU-wide fine",
        "EN 301 549 is the harmonised standard the EU points to",
        "EN 301 549's web requirements align with WCAG 2.1 / 2.2 Level AA",
      ],
    },
    {
      h2: "Practical next steps for a Shopify merchant",
      body: [
        "You don't need a compliance consultant to make meaningful progress. The sensible path is the same one any honest provider would give you: find out where you stand, fix what can genuinely be fixed, be transparent about the rest, and keep it from drifting back out of shape.",
        "A word of caution on what no tool can promise. Automated scanning reliably catches only about a third to a half of WCAG issues — the machine-detectable ones. The remainder need human judgement, so anyone selling you a one-click route to full compliance is overstating it. StoreProof fixes the automatable share at the source, flags what needs a person, and documents both — which is exactly what a defensible position looks like, and the opposite of an accessibility overlay that bolts a script on top and hides problems rather than solving them.",
      ],
      bullets: [
        "Scan your store against WCAG 2.1 / 2.2 AA to see where you're exposed",
        "Fix what can be fixed properly — at the source, not with an overlay widget",
        "Publish an honest accessibility statement describing your conformance and known gaps",
        "Keep it monitored so a theme change or new product doesn't quietly reintroduce problems",
      ],
    },
  ],
  faqs: [
    {
      q: "When did the European Accessibility Act take effect?",
      a: "The EAA's requirements have applied since 28 June 2025. That date has passed, so it's a current obligation. The practical question now is whether your store meets the standard today, not whether you still have time to prepare.",
    },
    {
      q: "Does the EAA apply to my Shopify store if I'm based outside the EU?",
      a: "What matters is whether you offer products or services to consumers in the EU, not only where your business is registered. If EU shoppers can buy from your store, you should treat yourself as in scope and confirm your position against the relevant national law. This is general information, not legal advice.",
    },
    {
      q: "What standard do I actually have to meet?",
      a: "The harmonised standard referenced in the EU is EN 301 549, whose web requirements map onto WCAG 2.1 / 2.2 at Level AA. Building and maintaining your store to WCAG 2.1 / 2.2 AA is the concrete, testable target that shows you're taking the EAA seriously.",
    },
    {
      q: "What are the penalties for non-compliance?",
      a: "Enforcement and penalties are set by each EU member state, so they genuinely vary — there is no single EU-wide figure. We won't quote a specific amount, because it depends on which country your customers are in and how that country implemented the directive. Check the national transposition that applies to you.",
    },
    {
      q: "Can a scan make my Shopify store EAA compliant?",
      a: "No, and be wary of anyone who claims it can. Automated tools reliably catch roughly a third to a half of WCAG issues; the rest need human judgement. StoreProof fixes the automatable share at the source, flags what needs a person, and documents both — a genuinely defensible position rather than a false promise of guaranteed compliance.",
    },
  ],
  ctaHeading: "See where your Shopify store stands against the EAA",
  ctaSub: "Run a free WCAG 2.1 / 2.2 AA scan, get your exposure band and a draft accessibility statement. No sales call, no card.",
  related: [
    { href: "/shopify-accessibility-checker", label: "Free Shopify accessibility checker" },
    { href: "/accessibility-statement-generator", label: "Generate an accessibility statement" },
    { href: "/overlays", label: "Why overlays get you sued" },
    { href: "/how-it-works", label: "How StoreProof works" },
  ],
  keywords: [
    "European Accessibility Act Shopify",
    "EAA Shopify",
    "European Accessibility Act",
    "EAA e-commerce",
    "EN 301 549 Shopify",
    "EAA 28 June 2025",
  ],
};
