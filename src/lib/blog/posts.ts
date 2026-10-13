export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMins: number;
  blocks: Block[];
}

export const POSTS: Post[] = [
  {
    slug: "european-accessibility-act-shopify",
    title: "The European Accessibility Act: what Shopify merchants actually need to do",
    description:
      "The EAA has been enforced since June 2025, with fines up to €500,000. Here's what it means for a Shopify store that sells into the EU — in plain English.",
    date: "2026-10-13",
    readMins: 5,
    blocks: [
      {
        type: "p",
        text: "If you sell to customers in the EU, the European Accessibility Act (EAA) now applies to your online store — whether or not your business is based in Europe. It has been enforced since 28 June 2025, and penalties reach €500,000. This is a plain-English guide to what it means for a Shopify merchant.",
      },
      { type: "h2", text: "What the EAA requires" },
      {
        type: "p",
        text: "The EAA says that e-commerce services must be accessible to people with disabilities. In practice, that means your store needs to meet the technical standard EN 301 549, which adopts WCAG 2.2 Level AA — the same accessibility rules used around the world.",
      },
      { type: "h2", text: "Does Shopify handle this for me?" },
      {
        type: "p",
        text: "No. Shopify's platform is built to be accessible, but your finished store — your theme, your product content, your customisations — is your legal responsibility. Independent testing has found Shopify themes typically cover only about a fifth of the WCAG criteria out of the box. \"I used Shopify\" has never been a successful legal defence.",
      },
      { type: "h2", text: "What a compliant store looks like" },
      {
        type: "ul",
        items: [
          "Every product image has meaningful alternative text.",
          "The whole store can be operated with a keyboard, not just a mouse.",
          "Text has enough contrast against its background to be readable.",
          "Forms (checkout, search, newsletter) have properly labelled fields.",
          "There is a published accessibility statement.",
        ],
      },
      { type: "h2", text: "Where to start" },
      {
        type: "p",
        text: "Start with a scan to see where you stand. An automated scan reliably finds roughly a third of issues in a minute; the rest need human judgement. StoreProof fixes the automatable issues at the source, flags the rest honestly, and produces the accessibility statement and evidence pack the EAA expects — without resorting to an overlay widget.",
      },
    ],
  },
  {
    slug: "why-accessibility-overlays-get-you-sued",
    title: "Why accessibility overlays get you sued",
    description:
      "The 'accessibility button' in the corner of a site is the most-sued fix there is. The FTC fined a leading vendor $1M, and 800+ overlay users were sued anyway. Here's why.",
    date: "2026-10-12",
    readMins: 4,
    blocks: [
      {
        type: "p",
        text: "You have probably seen them: a little accessibility icon in the corner of a website that pops open a panel of toggles. These are accessibility overlays, and they are sold as a one-click route to compliance. They are also the single most-litigated accessibility 'fix' on the market. Here is why.",
      },
      { type: "h2", text: "They run too late to help" },
      {
        type: "p",
        text: "An overlay is JavaScript that loads after your page does. Screen readers have already read the page by then. So the overlay cannot fix the things a claim is actually built on — missing form labels, keyboard traps, unlabelled buttons, bad heading structure. Those live in the code underneath, untouched.",
      },
      { type: "h2", text: "The regulators have noticed" },
      {
        type: "p",
        text: "In April 2025 the US Federal Trade Commission fined a leading overlay vendor $1,000,000 for claiming its widget made sites compliant when it did not. More than 800 businesses running an overlay have been sued anyway — and in court, the widget is treated as evidence that the business knew about the problem and chose a shortcut.",
      },
      { type: "h2", text: "What works instead" },
      {
        type: "p",
        text: "The only durable fix is to correct the source: write real alt text into your product data, fix the theme, and label your forms. Then document it. That is slower than installing a widget — but it is the thing that actually makes a demand letter go away, and it does not expose you to a fresh claim.",
      },
    ],
  },
  {
    slug: "accessibility-evidence-pack",
    title: "What's in an accessibility evidence pack — and why your lawyer wants one",
    description:
      "When a demand letter lands, the thing that resolves it isn't a widget — it's paperwork. Here's what a proper accessibility evidence pack contains.",
    date: "2026-10-11",
    readMins: 4,
    blocks: [
      {
        type: "p",
        text: "When an accessibility demand letter arrives, the question your lawyer asks is simple: what can we show that you have done? The answer is an evidence pack. It is the difference between a stressful, open-ended dispute and a documented, defensible position.",
      },
      { type: "h2", text: "What a good evidence pack contains" },
      {
        type: "ul",
        items: [
          "An accessibility statement written to EN 301 549, with your business details, the conformance level, and a remediation timeline.",
          "A dated fix log showing every issue found and exactly how it was resolved in the code.",
          "A clearly flagged list of items that still need human judgement — stated plainly, not hidden.",
          "A conformance declaration you can hand straight to a lawyer or a supervisory authority.",
          "A re-scan schedule, so the record stays current as your store changes.",
        ],
      },
      { type: "h2", text: "Why honesty matters here" },
      {
        type: "p",
        text: "It is tempting to claim full compliance. Don't. An automated scan catches roughly a third of issues; claiming more than you can evidence is exactly what got the overlay vendors fined. A credible pack states what has been fixed, what is outstanding, and when it will be addressed. That honesty is what makes it stand up.",
      },
      { type: "h2", text: "Keeping it current" },
      {
        type: "p",
        text: "A store changes every week — new products, new apps, new theme tweaks. An evidence pack is only as good as its last update, which is why monitoring and a refreshed, timestamped statement matter as much as the original fix.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
