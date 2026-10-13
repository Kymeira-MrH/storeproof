import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";

export const metadata = {
  title: "Terms of service",
  description:
    "The terms for using StoreProof: what the service does and doesn't guarantee, subscriptions, cancellation and refunds, and liability.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <>
      <MarketingNav />
      <main>
        <section className="block">
          <div className="w legal">
            <div className="head">
              <span className="eyebrow">StoreProof</span>
              <h1>Terms of service</h1>
            </div>
            <p className="updated">Last updated 13 October 2026</p>

            <p className="lead">
              These terms govern your use of StoreProof, operated by VantagePoint Networks. By using
              the service you agree to them.
            </p>

            <h2>What the service does</h2>
            <p>
              StoreProof scans your store for WCAG 2.2 Level AA issues, automatically remediates the
              subset that can be safely fixed at the source (such as image alt text), flags the rest
              for human review, and produces an accessibility statement and evidence pack.
            </p>

            <h2>What it does not do</h2>
            <p>
              An automated scan is <b>not a determination of full legal compliance</b>. It reliably
              detects roughly a third of accessibility issues; the remainder require human
              judgement and are flagged plainly. StoreProof does not provide legal advice and does
              not guarantee any particular legal outcome, including the dismissal or prevention of a
              claim or demand letter. You remain responsible for your store&rsquo;s compliance.
            </p>

            <h2>Your responsibilities</h2>
            <ul>
              <li>Provide accurate information and keep your login secure.</li>
              <li>Only connect stores you own or are authorised to manage.</li>
              <li>Review flagged items and automated fixes before relying on them.</li>
            </ul>

            <h2>Subscriptions, billing and cancellation</h2>
            <p>
              Paid plans are billed monthly in advance through Stripe. You can cancel at any time
              from your billing portal; cancellation stops future billing and takes effect at the
              end of the current period. The free scan requires no payment.
            </p>

            <h2>Refunds</h2>
            <p>
              If StoreProof materially fails to deliver the service during a billing period, contact{" "}
              <a href="mailto:info@vpnetworks.co.uk">info@vpnetworks.co.uk</a> and we will review a
              refund for that period in good faith. We do not offer refunds simply for unused time
              after a cancellation.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the extent permitted by law, StoreProof is provided &ldquo;as is&rdquo;, and
              VantagePoint Networks is not liable for indirect or consequential loss, or for legal
              outcomes relating to your store&rsquo;s accessibility. Nothing in these terms excludes
              liability that cannot be excluded by law.
            </p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of England and Wales.</p>

            <h2>Changes</h2>
            <p>
              We may update these terms; material changes will be reflected by the date above and,
              where appropriate, notified by email.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
