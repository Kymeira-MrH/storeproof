import { ScanHero } from "./scan-hero";

export default function Page() {
  return (
    <>
      <div className="mast">
        <div className="w">
          <span>STOREPROOF</span>
          <span>Case EAA-2026-0417 · Re: Accessibility Demand</span>
          <span>EU · EAA Ready</span>
        </div>
      </div>

      <nav>
        <div className="w">
          <span className="brand">STOREPROOF</span>
          <ul>
            <li><a href="#overlays">The overlay trap</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#proof">The proof</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="/login">Log in</a></li>
          </ul>
          <a className="navcta" href="#scan">Scan my store</a>
        </div>
      </nav>

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

      <section className="block" id="overlays">
        <div className="w">
          <div className="head">
            <span className="eyebrow">The cheap fix that backfires</span>
            <h2>An overlay widget is not a defence. Courts treat it as an admission.</h2>
            <p>
              The &ldquo;accessibility button&rdquo; in the corner of a site is the most-sued
              fix there is. It runs after the page loads, so screen readers never see it, and it
              cannot touch the code underneath.
            </p>
          </div>
          <div className="cols">
            <div className="c">
              <div className="big mono">$1M</div>
              <h3>FTC penalty</h3>
              <p>The best-known overlay vendor was fined $1,000,000 in April 2025 for claiming its widget made sites compliant when it did not.</p>
            </div>
            <div className="c">
              <div className="big mono">800+</div>
              <h3>Still sued</h3>
              <p>More than 800 businesses running an overlay were sued anyway. In court the widget was treated as evidence they knew and chose a shortcut.</p>
            </div>
            <div className="c">
              <div className="big mono">0</div>
              <h3>Code fixed</h3>
              <p>Overlays cannot fix form labels, keyboard traps or heading structure. Those live in the code. So do the claims against you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="block alt" id="how">
        <div className="w">
          <div className="head">
            <span className="eyebrow">How the automation works</span>
            <h2>Scanned, fixed and documented online. Hands-off.</h2>
            <p>
              A fixed monthly price, no retainer. You connect your store once; the rest runs
              itself. What a machine cannot safely fix, we flag plainly rather than fake.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="no">01 — Scan</div>
              <h3>We find what a claimant would find</h3>
              <p>A full WCAG 2.2 AA scan of your store. You get the exposure band and a plain-English issue list in under a minute.</p>
            </div>
            <div className="step">
              <div className="no">02 — Auto-fix &amp; flag</div>
              <h3>Real fixes in the code, not a widget</h3>
              <p>We write proper alt text to your product data and apply safe theme fixes at the source. Anything needing human judgement is flagged, never faked.</p>
            </div>
            <div className="step">
              <div className="no">03 — Document &amp; monitor</div>
              <h3>The evidence pack, kept current</h3>
              <p>A signed EAA statement and evidence pack, refreshed on every re-scan, so you stay defensible as the store changes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="proof">
        <div className="w">
          <div className="deliver">
            <div>
              <span className="eyebrow">What you walk away with</span>
              <h2 className="proof-h2">The point is the paperwork. That is what makes a letter go away.</h2>
              <ul className="checklist">
                <li><span className="tick">[✓]</span> EAA accessibility statement, written to EN 301 549, with your details, conformance level and remediation timeline.</li>
                <li><span className="tick">[✓]</span> A dated fix log showing every issue found and how it was resolved in the code.</li>
                <li><span className="tick">[✓]</span> A flagged list of items that still need human judgement, stated plainly.</li>
                <li><span className="tick">[✓]</span> A conformance declaration you can hand straight to a lawyer or a supervisory authority.</li>
                <li><span className="tick">[✓]</span> Monthly re-scan and a refreshed, timestamped statement, so you stay defensible.</li>
              </ul>
            </div>
            <div className="packet">
              <span className="cap">Evidence pack — contents</span>
              <div className="doc">{`STOREPROOF / EVIDENCE PACK
RE: your-store.com

01  Accessibility statement ....... EN 301 549
02  Conformance declaration ....... WCAG 2.2 AA
03  Remediation log ............... dated
04  Items needing human review .... flagged
05  Re-scan schedule .............. monthly
—
Prepared by StoreProof.
Not an overlay. Fixed at source.`}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="block alt" id="pricing">
        <div className="w">
          <div className="head">
            <span className="eyebrow">Fixed price, no retainer games</span>
            <h2>Start with the free scan. Subscribe when you are ready.</h2>
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
              <a className="go" href="#scan">Scan my store</a>
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
              <a className="go" href="#scan">Start free, then subscribe</a>
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
              <a className="go" href="#scan">Stay defensible</a>
            </div>
          </div>
        </div>
      </section>

      <section className="block faq" id="faq">
        <div className="w" style={{ maxWidth: "860px" }}>
          <div className="head">
            <span className="eyebrow">Straight answers</span>
            <h2>The questions every merchant asks.</h2>
          </div>
          <details open>
            <summary>Doesn&rsquo;t Shopify make my store compliant?</summary>
            <p>No. Shopify&rsquo;s platform is accessible, but the finished store is your legal responsibility. Shopify themes cover only about a fifth of the WCAG criteria, and &ldquo;I used Shopify&rdquo; has never been a successful defence.</p>
          </details>
          <details>
            <summary>Isn&rsquo;t a free scan enough on its own?</summary>
            <p>No, and we will not pretend otherwise. An automated scan reliably catches around a third of accessibility issues. The rest, like whether a screen reader can complete your checkout, needs human judgement. We flag those items plainly.</p>
          </details>
          <details>
            <summary>Will an overlay widget protect me instead?</summary>
            <p>No. Overlays were fined by the FTC, are rejected by courts, and sit on more than 800 sued businesses. They cannot change the code a claim is built on.</p>
          </details>
          <details>
            <summary>I only sell in the UK. Does this still apply?</summary>
            <p>Yes. The UK Equality Act already requires accessible services, and if you sell to anyone in the EU the European Accessibility Act applies regardless of where you are based.</p>
          </details>
        </div>
      </section>

      <section className="final">
        <div className="w">
          <h2>Stop guessing whether you are a target.</h2>
          <p>Scan your store free in under a minute. See the exposure. Decide from facts, not fear.</p>
          <a className="cta" href="#scan">Scan my store</a>
        </div>
      </section>

      <footer>
        <div className="w">
          <span>© 2026 StoreProof · EU · EAA Ready</span>
          <span>
            <a href="/login">Sign in</a> &nbsp;·&nbsp; <a href="#">Accessibility statement</a> &nbsp;·&nbsp;{" "}
            <a href="#">Privacy</a> &nbsp;·&nbsp; <a href="#scan">Scan my store</a>
          </span>
          <span>We pass our own WCAG 2.2 AA test.</span>
        </div>
      </footer>
    </>
  );
}
