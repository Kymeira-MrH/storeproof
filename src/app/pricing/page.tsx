import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";

export const metadata = {
  title: "Pricing",
  description:
    "Start with the free scan. Subscribe when you're ready: £49/month to fix and watch, or £29/month to stay monitored and defensible. No retainer.",
  alternates: { canonical: "/pricing" },
};

export default function Page() {
  return (
    <>
      <MarketingNav active="pricing" />
      <main>
        <section className="block">
          <div className="w">
            <div className="head">
              <span className="eyebrow">Fixed price, no retainer games</span>
              <h1>Start with the free scan. Subscribe when you&rsquo;re ready.</h1>
              <p>
                No sales call, no setup fee. See your exposure for free, then pick the plan that
                matches how much you want handled for you.
              </p>
            </div>
            <div className="prices">
              <div className="price">
                <span className="k">The scan</span>
                <div className="amt">Free</div>
                <ul>
                  <li>Real WCAG 2.2 AA scan, one page</li>
                  <li>Exposure band &amp; issue list</li>
                  <li>Draft accessibility statement</li>
                  <li>Honest: a scan is not full compliance</li>
                </ul>
                <a className="go" href="/#scan">Scan my store</a>
              </div>
              <div className="price feature">
                <span className="k">The fix &amp; watch</span>
                <div className="amt">&pound;49<small> /month</small></div>
                <ul>
                  <li>Automated source-level fixes</li>
                  <li>Alt text written to your products</li>
                  <li>Evidence pack + signed statement</li>
                  <li>Continuous monthly monitoring</li>
                </ul>
                <a className="go" href="/#scan">Start free, then subscribe</a>
              </div>
              <div className="price">
                <span className="k">The record</span>
                <div className="amt">&pound;29<small> /month</small></div>
                <ul>
                  <li>Monthly re-scan</li>
                  <li>Regression alerts</li>
                  <li>Statement kept current</li>
                  <li>Fresh evidence timestamp</li>
                </ul>
                <a className="go" href="/#scan">Stay defensible</a>
              </div>
            </div>
          </div>
        </section>
        <FinalCta
          heading="Not sure which plan? Start with the free scan."
          sub="You'll see your exposure first. Upgrade only once you know what you're dealing with."
        />
      </main>
      <SiteFooter />
    </>
  );
}
