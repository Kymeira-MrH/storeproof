import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "audioeye-alternative",
  metaTitle: "AudioEye Alternative for Shopify — Source-Level Fixes and Evidence",
  metaDescription:
    "Looking for an AudioEye alternative? StoreProof fixes Shopify accessibility issues at the source, documents them in a signed evidence pack, and monitors for regressions. A fair comparison of the overlay approach versus real fixes.",
  eyebrow: "Honest comparison",
  h1: "An AudioEye alternative built on source fixes and real evidence",
  lede: "AudioEye combines an accessibility overlay with managed services. StoreProof works differently: it fixes the issues automation can handle properly inside your Shopify source, flags what needs a human, and hands you a signed evidence pack. Here's a fair, factual comparison.",
  sections: [
    {
      h2: "The managed-overlay approach versus source-level fixes",
      body: [
        "AudioEye is best known for an accessibility overlay — a script that loads a widget in the visitor's browser and attempts to remediate issues at runtime — alongside managed-service options. The widget runs on top of your store's existing HTML; the underlying markup your store serves is left unchanged.",
        "StoreProof takes a different route. It scans your storefront against WCAG 2.2 AA and writes the safe, automatable corrections directly into your store's source. The result is a page that is more accessible by default for every visitor, rather than one patched after load by an injected script.",
      ],
      bullets: [
        "Managed overlay: a browser-side widget plus services, over unchanged markup",
        "StoreProof: corrections written into the source your store actually serves",
        "Overlay: remediation attempted at runtime in each visitor's browser",
        "StoreProof: the fix lives in the page itself, documented and verifiable",
      ],
    },
    {
      h2: "Honest limits — what no automated tool can promise",
      body: [
        "Automated tooling, ours included, reliably catches only about a third to a half of WCAG issues: the machine-detectable ones such as missing alt text, unlabelled fields, contrast failures and controls with no accessible name. The rest require human judgement. We say so plainly instead of implying a widget or a service tier delivers compliance on its own.",
        "This is the fair, defensible point to make about overlays in general: they have been widely criticised by the accessibility community, and using one has not reliably prevented legal claims. We won't characterise AudioEye's own outcomes or quote figures we can't stand behind. What we will say is that patching the browser is not the same as fixing your store — and that nobody can honestly guarantee compliance from an automated tool.",
      ],
    },
    {
      h2: "Fixes, a signed evidence pack and ongoing monitoring",
      body: [
        "StoreProof fixes what can genuinely be fixed at the source — proper alt text on product images and the corrections automation applies reliably — and flags the issues that need a person, so nothing is quietly hidden behind a widget.",
        "It then produces a signed accessibility statement and a dated evidence pack: a documented record of what was tested, fixed and flagged that holds up when someone asks for proof. Monthly monitoring re-scans your store and alerts you when a theme update or a new product reintroduces a problem, so your compliance position doesn't erode unnoticed.",
      ],
    },
  ],
  faqs: [
    {
      q: "How is StoreProof different from AudioEye?",
      a: "AudioEye centres on an accessibility overlay plus managed services, running a widget in the visitor's browser over unchanged markup. StoreProof instead fixes the automatable issues inside your Shopify source, flags what needs human review, and gives you a signed evidence pack with ongoing monitoring. Different layer, different deliverable.",
    },
    {
      q: "If I move off an overlay, will my store be compliant?",
      a: "No automated tool can promise compliance, and we won't. Automated scanning reliably catches roughly a third to a half of WCAG 2.2 issues. StoreProof fixes that automatable share at the source and clearly flags the rest for human testing, which is what full conformance still requires.",
    },
    {
      q: "Is there really a problem with accessibility overlays?",
      a: "Factually and generally: overlays have been widely criticised by the accessibility community, and businesses using them have still faced legal claims. We won't speak for any specific vendor or cite numbers we can't support. The honest distinction is the approach — an overlay remediates in the browser at runtime, StoreProof changes the source and documents it.",
    },
    {
      q: "Does AudioEye's managed service make it equivalent to StoreProof?",
      a: "They're not the same thing. A managed service around an overlay still leaves your store's underlying markup unchanged and the widget doing the work in the browser. StoreProof's value is that the fixes live in your source, everything is captured in a dated evidence pack, and monitoring catches regressions — a documented position, not a layer on top.",
    },
    {
      q: "What do I get with StoreProof that an overlay doesn't give me?",
      a: "Source-level fixes that improve the page for everyone by default, a signed accessibility statement, an evidence pack showing exactly what was tested, fixed and flagged, and monitoring that alerts you to regressions. It's a defensible, documented record rather than a script running over markup that never changed.",
    },
  ],
  ctaHeading: "See how source-level fixes compare for your store",
  ctaSub: "Run a free WCAG 2.2 AA scan, see your exposure, and weigh it honestly against the overlay approach. No sales call.",
  related: [
    { href: "/accessibility-overlay-alternative", label: "The honest overlay alternative" },
    { href: "/overlays", label: "Why overlays get you sued" },
    { href: "/accessibe-alternative", label: "accessiBe alternative" },
    { href: "/proof", label: "What the evidence pack contains" },
  ],
  keywords: [
    "AudioEye alternative",
    "AudioEye alternative Shopify",
    "accessibility overlay alternative",
    "Shopify accessibility fixes",
    "AudioEye vs StoreProof",
  ],
};
