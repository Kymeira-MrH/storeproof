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
            <div className="hero-side">
              <ScanHero />
              <ul className="hero-points">
                <li>A real WCAG 2.2 AA scan of your store — in under a minute.</li>
                <li>Plain-English issue list and your exposure band.</li>
                <li>A draft EAA accessibility statement on the spot.</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="w">
          The European Accessibility Act is <b>enforced since June 2025</b>. Fines reach{" "}
          <b>&euro;500,000</b>. More than <b>11 new accessibility lawsuits</b> are filed every day.
        </div>
      </div>

      <section className="block">
        <div className="w">
          <div className="head">
            <span className="eyebrow">Overlay vs source-fix</span>
            <h2>Two ways to answer a demand letter. Only one holds up.</h2>
            <p>
              The cheap widget is the most-sued fix there is. We do the opposite — fix the code and
              keep the receipts.
            </p>
          </div>
          <div className="compare">
            <div className="compare-col bad">
              <div className="compare-h">An accessibility overlay</div>
              <ul>
                <li>Runs after the page loads — screen readers never see it.</li>
                <li>Can&rsquo;t touch form labels, keyboard traps or heading structure.</li>
                <li>FTC-fined $1M; 800+ overlay users were sued anyway.</li>
                <li>In court, it reads as an admission you knew and took a shortcut.</li>
              </ul>
            </div>
            <div className="compare-col good">
              <div className="compare-h">StoreProof</div>
              <ul>
                <li>Fixes the source — real alt text written to your products.</li>
                <li>Flags what needs human judgement plainly, never faked.</li>
                <li>Gives you an EN 301 549 statement and a dated evidence pack.</li>
                <li>Keeps it current with monthly re-scans and regression alerts.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
