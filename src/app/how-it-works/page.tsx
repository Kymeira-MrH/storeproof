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
        <FinalCta
          heading="See it work on your store."
          sub="Run the free scan now — the exposure band and issue list land in under a minute."
        />
      </main>
      <SiteFooter />
    </>
  );
}
