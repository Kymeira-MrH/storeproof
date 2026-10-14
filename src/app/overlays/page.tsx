import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";

export const metadata = {
  title: "The overlay trap",
  description:
    "Why accessibility overlay widgets backfire: the $1M FTC fine, 800+ stores sued anyway, and what a widget can never fix.",
  alternates: { canonical: "/overlays" },
};

export default function Page() {
  return (
    <>
      <MarketingNav active="overlays" />
      <main>
        <section className="block">
          <div className="w">
            <div className="head">
              <span className="eyebrow">The cheap fix that backfires</span>
              <h1>An overlay widget is not a defence. Courts treat it as an admission.</h1>
              <p>
                The &ldquo;accessibility button&rdquo; in the corner of a site is the most-sued
                fix there is. It runs after the page loads, so screen readers never see it, and
                it cannot touch the code underneath.
              </p>
            </div>
            <div className="cols">
              <div className="c">
                <div className="big mono">$1M</div>
                <h3>FTC penalty</h3>
                <p>
                  The best-known overlay vendor was fined $1,000,000 in April 2025 for claiming
                  its widget made sites compliant when it did not.
                </p>
              </div>
              <div className="c">
                <div className="big mono">800+</div>
                <h3>Still sued</h3>
                <p>
                  More than 800 businesses running an overlay were sued anyway. In court the
                  widget was treated as evidence they knew and chose a shortcut.
                </p>
              </div>
              <div className="c">
                <div className="big mono">0</div>
                <h3>Code fixed</h3>
                <p>
                  Overlays cannot fix form labels, keyboard traps or heading structure. Those
                  live in the code. So do the claims against you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="block alt">
          <div className="w">
            <div className="prose2">
              <div>
                <h3>How an overlay actually works</h3>
                <p>
                  An overlay is a single line of JavaScript you paste into your theme. When a shopper
                  loads a page, that script runs <em>after</em> the browser has already built the
                  page, then tries to patch what it finds — guessing at image descriptions, injecting
                  ARIA attributes, bolting on a widget with contrast and font-size toggles.
                </p>
                <p>
                  The important part is what it cannot touch. It does not change your theme&rsquo;s
                  Liquid templates, your product data, your heading order, or the HTML your server
                  actually sends. It sits on top — a layer of guesses laid over code that still has
                  the original problems underneath.
                </p>
              </div>
              <div>
                <h3>Overlays don&rsquo;t stop lawsuits</h3>
                <p>
                  This isn&rsquo;t an opinion. In April 2025 the US Federal Trade Commission finalised
                  a $1,000,000 order against accessiBe, one of the largest overlay vendors, for
                  claiming its product could automatically make any site meet WCAG 2.1 AA, and for
                  passing off paid and affiliated reviews as independent (FTC, 2025).
                </p>
                <p>
                  The litigation data says the same thing: 800-plus overlay-using businesses were sued
                  across 2023&ndash;2024, and in the first half of 2025, 456 web-accessibility
                  lawsuits — 22.6% of the total — named sites that <em>had</em> an overlay installed
                  (UsableNet / LFLegal, 2025). Buying the widget did not move the risk.
                </p>
              </div>
            </div>
            <div style={{ maxWidth: "860px", marginTop: "40px" }}>
              <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 10px", letterSpacing: "-.015em" }}>
                What fixing the source actually looks like
              </h3>
              <p style={{ fontSize: "15.5px", color: "var(--ink-2)", lineHeight: 1.72, margin: 0 }}>
                Fixing the source means changing the code a claim is built on. Real alt text is
                written into each product&rsquo;s image fields in Shopify, so a screen reader
                announces &ldquo;navy wool overcoat, front view&rdquo; instead of a filename or a
                guess. Theme corrections happen in the Liquid templates themselves: a single logical
                heading order, form fields with real <code>&lt;label&gt;</code> elements, variant
                pickers and the search box properly named, focus states that follow the visual order,
                colour contrast adjusted in the theme&rsquo;s own CSS. Those fixes ship in the HTML
                your server sends, so they work with the shopper&rsquo;s own assistive technology and
                survive with or without any widget. That is why source fixes hold up where an overlay
                does not — though automated tooling reliably resolves only around 30&ndash;40% of
                WCAG issues, and the rest still needs human review.
              </p>
            </div>
          </div>
        </section>
        <FinalCta
          heading="So skip the shortcut."
          sub="A free scan shows exactly what's in your code — the things an overlay can never reach."
        />
      </main>
      <SiteFooter />
    </>
  );
}
