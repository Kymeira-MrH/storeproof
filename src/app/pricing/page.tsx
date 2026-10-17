import { MarketingNav } from "../marketing-nav";
import { PhotoHero } from "../photo-hero";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";
import { PlanCheckout } from "./plan-checkout";

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
        <PhotoHero
          image="/img/boutique.jpg"
          alt="Inside an independent boutique"
          kicker="Fixed price, no retainer games"
          title={<>Start with the free scan. Subscribe <em>when you&rsquo;re ready.</em></>}
          lede="No sales call, no setup fee. See your exposure for free, then pick the plan that matches how much you want handled for you."
        />
        <section className="block">
          <div className="w">
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
                <PlanCheckout tier="fix" label="Get Fix & Watch" />
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
                <PlanCheckout tier="monitoring" label="Get Monitoring" />
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
