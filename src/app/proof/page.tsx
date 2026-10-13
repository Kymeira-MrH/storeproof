import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";

export const metadata = {
  title: "The proof — StoreProof",
  description:
    "What you walk away with: an EN 301 549 EAA accessibility statement, a dated fix log, a flagged human-review list, a conformance declaration, and monthly re-scans.",
};

export default function Page() {
  return (
    <>
      <MarketingNav active="proof" />
      <main>
        <section className="block">
          <div className="w">
            <div className="deliver">
              <div>
                <span className="eyebrow">What you walk away with</span>
                <h1 className="proof-h2">
                  The point is the paperwork. That is what makes a letter go away.
                </h1>
                <ul className="checklist">
                  <li>
                    <span className="tick">[✓]</span> EAA accessibility statement, written to EN
                    301 549, with your details, conformance level and remediation timeline.
                  </li>
                  <li>
                    <span className="tick">[✓]</span> A dated fix log showing every issue found
                    and how it was resolved in the code.
                  </li>
                  <li>
                    <span className="tick">[✓]</span> A flagged list of items that still need
                    human judgement, stated plainly.
                  </li>
                  <li>
                    <span className="tick">[✓]</span> A conformance declaration you can hand
                    straight to a lawyer or a supervisory authority.
                  </li>
                  <li>
                    <span className="tick">[✓]</span> Monthly re-scan and a refreshed, timestamped
                    statement, so you stay defensible.
                  </li>
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
        <FinalCta
          heading="Get your evidence pack started."
          sub="The free scan produces a draft statement on the spot — subscribe to keep it signed and current."
        />
      </main>
      <SiteFooter />
    </>
  );
}
