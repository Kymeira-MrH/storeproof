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
        <FinalCta
          heading="So skip the shortcut."
          sub="A free scan shows exactly what's in your code — the things an overlay can never reach."
        />
      </main>
      <SiteFooter />
    </>
  );
}
