import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";

export const metadata = {
  title: "How it works",
  description:
    "Scanned, fixed and documented online. A hands-off, fixed monthly price: scan, auto-fix at the source, flag what needs judgement, and keep the evidence current.",
  alternates: { canonical: "/how-it-works" },
};

export default function Page() {
  return (
    <>
      <MarketingNav active="how" />
      <main>
        <section className="block">
          <div className="w">
            <div className="head">
              <span className="eyebrow">How the automation works</span>
              <h1>Scanned, fixed and documented online. Hands-off.</h1>
              <p>
                A fixed monthly price, no retainer. You connect your store once; the rest runs
                itself. What a machine cannot safely fix, we flag plainly rather than fake.
              </p>
            </div>
            <div className="steps">
              <div className="step">
                <div className="no">01 — Scan</div>
                <h3>We find what a claimant would find</h3>
                <p>
                  A full WCAG 2.2 AA scan of your store. You get the exposure band and a
                  plain-English issue list in under a minute.
                </p>
              </div>
              <div className="step">
                <div className="no">02 — Auto-fix &amp; flag</div>
                <h3>Real fixes in the code, not a widget</h3>
                <p>
                  We write proper alt text to your product data and apply safe theme fixes at
                  the source. Anything needing human judgement is flagged, never faked.
                </p>
              </div>
              <div className="step">
                <div className="no">03 — Document &amp; monitor</div>
                <h3>The evidence pack, kept current</h3>
                <p>
                  A signed EAA statement and evidence pack, refreshed on every re-scan, so you
                  stay defensible as the store changes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="block alt">
          <div className="w">
            <div className="prose2">
              <div>
                <h3>What we fix automatically, and what we flag</h3>
                <p>
                  Automated tools can only reliably resolve about 30 to 40 percent of WCAG issues.
                  That is the honest ceiling, and we work inside it rather than pretend it does not
                  exist. StoreProof fixes the safe, unambiguous subset: it writes real, descriptive
                  alt text to your product images through the Shopify Admin API, and corrects
                  theme-level attributes such as a missing page language, an absent page title, the
                  viewport setting, and duplicate element IDs.
                </p>
                <p>
                  Everything that needs human judgement, we flag instead of faking. That includes
                  colour contrast, keyboard operation, meaningful link text (not &ldquo;click
                  here&rdquo;), proper form labels, heading order, and ARIA usage. A machine cannot
                  reliably decide whether text is readable against its background or whether a link
                  makes sense out of context, so we hand those to you with clear notes rather than
                  tick a box that is not true.
                </p>
              </div>
              <div>
                <h3>Your data, handled simply</h3>
                <p>
                  To write alt text and apply fixes, StoreProof needs a Shopify token with
                  read_products and write_products scope. That token is stored for one reason only:
                  to apply the fixes you have asked for. We never sell it, never share it, and never
                  pass your catalogue to anyone else.
                </p>
                <p>
                  A free scan reads a single page so you can see real findings before committing to
                  anything. When you run full fixes, we read your products, make the changes, and
                  log what we did. You can revoke the token in Shopify or ask us to delete your data
                  at any time, and it is gone — no lock-in, no quiet retention.
                </p>
              </div>
            </div>
          </div>
        </section>
        <FinalCta
          heading="See it work on your store."
          sub="Run the free scan now — the exposure band and issue list land in under a minute."
        />
      </main>
      <SiteFooter />
    </>
  );
}
