import { ScanHero } from "./scan-hero";
import { MarketingNav } from "./marketing-nav";
import { SiteFooter } from "./site-footer";
import { FinalCta } from "./final-cta";

export default function Page() {
  return (
    <>
      <MarketingNav active="home" />

      <header className="hero" id="scan">
        <div className="lines" aria-hidden="true" />
        <div className="w">
          <div className="grid">
            <div>
              <span className="retag">Re: the letter on your desk</span>
              <h1>
                You got a demand letter.
                <br />
                Let&rsquo;s make it <em>go away</em>, properly.
              </h1>
              <p className="lede">
                Accessibility overlays got 800+ stores sued anyway and cost one vendor a $1M
                FTC fine. We scan your Shopify store, fix what can be fixed at the source, and
                give you the <b>evidence pack your lawyer actually needs</b>.
              </p>
              <span className="chip">Not an overlay · we fix the code</span>
              <div className="ledger">
                <div><div className="n">6,176</div><div className="l">EU/US suits, 2026</div></div>
                <div><div className="n">&euro;500k</div><div className="l">Max EAA fine</div></div>
                <div><div className="n">Live</div><div className="l">EAA enforced now</div></div>
              </div>
            </div>
            <ScanHero />
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="w">
          The European Accessibility Act is <b>enforced since June 2025</b>. Fines reach{" "}
          <b>&euro;500,000</b>. More than <b>11 new accessibility lawsuits</b> are filed every day.
        </div>
      </div>

      <section className="block alt">
        <div className="w">
          <div className="head">
            <span className="eyebrow">The short version</span>
            <h2>No wall of text. Just the bits that matter.</h2>
            <p>Pick what you need — and the free scanner is always one click away.</p>
          </div>
          <div className="navcards">
            <a className="navcard" href="/overlays">
              <span className="kick">The trap</span>
              <h3>Why overlays backfire</h3>
              <p>The $1M FTC fine, 800+ stores sued anyway, and why a widget can&rsquo;t save you.</p>
              <span className="arrow">Read →</span>
            </a>
            <a className="navcard" href="/how-it-works">
              <span className="kick">The method</span>
              <h3>How it works</h3>
              <p>Scan, fix at the source, document — hands-off, one fixed monthly price.</p>
              <span className="arrow">Read →</span>
            </a>
            <a className="navcard" href="/proof">
              <span className="kick">The paperwork</span>
              <h3>What you walk away with</h3>
              <p>The EAA statement and evidence pack that actually make a letter go away.</p>
              <span className="arrow">Read →</span>
            </a>
            <a className="navcard" href="/pricing">
              <span className="kick">The price</span>
              <h3>Simple pricing</h3>
              <p>Start free. Subscribe when you&rsquo;re ready. No retainer, no games.</p>
              <span className="arrow">Read →</span>
            </a>
          </div>
        </div>
      </section>

      <FinalCta />
      <SiteFooter />
    </>
  );
}
