import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "accessibility-statement-generator",
  metaTitle: "Accessibility Statement Generator — Honest, WCAG-Based",
  metaDescription:
    "Free accessibility statement generator for Shopify. Get a draft statement from your WCAG 2.2 AA scan, then a signed, kept-current statement on paid plans. Honest — it reflects your real conformance, not a template that overclaims.",
  eyebrow: "Accessibility statement generator",
  h1: "Generate an accessibility statement that tells the truth",
  lede: "An accessibility statement is the public record of how your store measures up to WCAG 2.2 AA — and the European Accessibility Act expects you to have one. StoreProof drafts yours free from a real scan, then keeps a signed, current version on paid plans. No copy-paste template that overclaims conformance you don't actually have.",
  sections: [
    {
      h2: "What an accessibility statement is — and why it matters",
      body: [
        "An accessibility statement is a page on your store that sets out how accessible your site is, which standard you measure against, where you still fall short, and how people can report a problem or ask for help. It is the written counterpart to the work itself.",
        "The European Accessibility Act (EAA) and the harmonised standard behind it, EN 301 549 — which adopts WCAG 2.2 at Level AA for web content — expect businesses in scope to document their conformance and make that information available. A statement is how you do that. It signals to customers, to regulators and to anyone considering a complaint that you know your position and are managing it.",
      ],
      bullets: [
        "The standard you conform to — WCAG 2.2 AA, as adopted by EN 301 549",
        "How conformant you currently are, stated honestly",
        "Known issues you have not yet resolved, and your plan for them",
        "A contact route so a disabled customer can flag a barrier",
        "The date it was prepared and last reviewed",
      ],
    },
    {
      h2: "Draft free from your scan, signed and current on paid plans",
      body: [
        "Run the free WCAG 2.2 AA scan and StoreProof produces a draft accessibility statement for you on the spot — pre-filled with the standard, your exposure band and the issues the scan actually found. It is a genuine starting point you can read, edit and understand, not a blank template.",
        "On paid plans the statement becomes something you can stand behind: signed, dated and tied to the fixes we applied at the source. Because monitoring re-scans your store, the statement is kept current — when a theme change or a new product reintroduces a problem, the record moves with it rather than drifting out of date the moment you publish it.",
      ],
    },
    {
      h2: "Why an honest statement protects you — and a template doesn't",
      body: [
        "A statement must reflect your real conformance. A generic template that declares you \"fully WCAG 2.2 AA compliant\" when your store isn't is worse than no statement at all: it is a written, dated claim that can be held against you if a customer or regulator finds barriers you said weren't there.",
        "Automated scanning reliably catches only around a third to a half of WCAG issues — the machine-detectable ones. The rest need human judgement. An honest statement says so: it names what has been fixed, what is known and outstanding, and what still needs human review. That candour is the point. It shows you are managing accessibility rather than papering over it, and it is far more defensible than an overclaim.",
        "This is also why StoreProof is not an accessibility overlay. Overlays bolt a widget onto your site and often generate a statement implying instant compliance. Those claims have drawn legal and regulatory criticism, and they do not guarantee a defence. We fix the automatable share at the source, flag the rest for a person, and write a statement that matches what was genuinely done.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the accessibility statement generator free?",
      a: "Yes. A draft accessibility statement comes with the free WCAG 2.2 AA scan — pre-filled from the issues actually found on your store, no sales call. Paid plans add a signed, dated statement tied to the source-level fixes we apply, kept current by ongoing monitoring.",
    },
    {
      q: "Does publishing an accessibility statement make my store compliant?",
      a: "No. A statement documents your conformance; it does not create it. Compliance comes from the underlying fixes plus human testing, since automated tools catch only a third to a half of WCAG issues. The statement's job is to record that position honestly, not to manufacture one.",
    },
    {
      q: "Why not just use a free template I found online?",
      a: "Because most templates declare full conformance regardless of your actual state. That is a dated, public claim that can be used against you if barriers remain. A statement should reflect your real position — what's fixed, what's known and outstanding, and what still needs review. Ours is generated from your actual scan for exactly that reason.",
    },
    {
      q: "Does the EAA actually require an accessibility statement?",
      a: "The European Accessibility Act and EN 301 549 (which adopts WCAG 2.2 AA for web content) expect businesses in scope to document and communicate their accessibility position, and a statement is the standard way to do that. This is general information, not legal advice — check your specific obligations for the markets you sell into.",
    },
    {
      q: "How is this different from the statement an overlay gives me?",
      a: "Overlay widgets typically generate a statement implying one-click compliance. Those claims have faced legal and regulatory criticism and don't guarantee a defence. StoreProof fixes issues at the source, flags what needs a person, and writes a statement that matches the work actually done.",
    },
  ],
  ctaHeading: "Generate your draft accessibility statement free",
  ctaSub: "Run the scan and get a statement pre-filled from your real WCAG 2.2 AA results. No sales call, no card.",
  related: [
    { href: "/shopify-accessibility-checker", label: "Free Shopify accessibility checker" },
    { href: "/european-accessibility-act-shopify", label: "The EAA and your Shopify store" },
    { href: "/accessibility-overlay-alternative", label: "An honest alternative to overlays" },
    { href: "/how-it-works", label: "How StoreProof works" },
  ],
  keywords: [
    "accessibility statement generator",
    "accessibility statement",
    "WCAG accessibility statement",
    "Shopify accessibility statement",
    "EAA accessibility statement",
  ],
};
