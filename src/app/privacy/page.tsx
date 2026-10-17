import { MarketingNav } from "../marketing-nav";
import { PhotoHero } from "../photo-hero";
import { SiteFooter } from "../site-footer";

export const metadata = {
  title: "Privacy policy",
  description:
    "How StoreProof handles your data: what we collect, why, who processes it, how long we keep it, and your rights under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <>
      <MarketingNav />
      <main>
        <PhotoHero
          image="/img/packing.jpg"
          alt="A small-business owner packing an order"
          kicker="Privacy"
          title="Privacy policy"
          lede="StoreProof is operated by VantagePoint Networks. This policy explains what personal data we handle and why. We collect the minimum we need to run the service."
        />
        <section className="block">
          <div className="w legal">
            <p className="updated">Last updated 13 October 2026</p>

            <h2>Who we are</h2>
            <p>
              The data controller is VantagePoint Networks. For any privacy question, contact{" "}
              <a href="mailto:info@vpnetworks.co.uk">info@vpnetworks.co.uk</a>.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>
                <b>Account details</b> &mdash; your email address and password (passwords are
                stored only as a secure hash by our authentication provider).
              </li>
              <li>
                <b>Store information</b> &mdash; the store URLs you add and the accessibility scan
                results we generate for them.
              </li>
              <li>
                <b>Shopify connection</b> &mdash; if you connect a store, your myshopify.com domain
                and an Admin API access token, used solely to read products and apply the fixes you
                request.
              </li>
              <li>
                <b>Billing</b> &mdash; handled by Stripe. We never see or store your full card
                details.
              </li>
            </ul>

            <h2>Why we use it (legal basis)</h2>
            <ul>
              <li>To provide the service you signed up for &mdash; performance of a contract.</li>
              <li>To send you scan reports and service emails &mdash; contract / legitimate interest.</li>
              <li>To secure the service and prevent abuse &mdash; legitimate interest.</li>
            </ul>

            <h2>Who processes your data</h2>
            <p>We use a small set of trusted processors to run StoreProof:</p>
            <ul>
              <li><b>Supabase</b> &mdash; database and authentication (EU region).</li>
              <li><b>Vercel</b> &mdash; application hosting.</li>
              <li><b>Stripe</b> &mdash; payment processing.</li>
              <li><b>Resend</b> &mdash; transactional email.</li>
              <li><b>Anthropic</b> &mdash; generating alt-text descriptions from product image URLs when you run fixes.</li>
              <li><b>Shopify</b> &mdash; your own store, which you authorise us to access.</li>
            </ul>

            <h2>How long we keep it</h2>
            <p>
              We keep account and scan data for as long as your account is active. Delete your
              account or email us and we will erase your personal data, except where we must retain
              records to meet a legal obligation.
            </p>

            <h2>Your rights</h2>
            <p>
              Under UK GDPR you can request access to, correction of, or deletion of your personal
              data, and object to certain processing. Email{" "}
              <a href="mailto:info@vpnetworks.co.uk">info@vpnetworks.co.uk</a> and we will respond
              within one month.
            </p>

            <h2 id="cookies">Cookies &amp; analytics</h2>
            <p>
              We use strictly necessary cookies to keep you signed in &mdash; these are always on,
              because the service can&rsquo;t work without them, and no consent is required for them
              under UK GDPR.
            </p>
            <p>
              Beyond that, we use privacy-friendly, aggregate analytics (Vercel Analytics) to
              understand which pages and steps work &mdash; and only if you choose{" "}
              <b>&ldquo;Accept all&rdquo;</b> on the cookie banner. Pick <b>&ldquo;Essential
              only&rdquo;</b> and no analytics run at all. We never use third-party advertising or
              cross-site tracking cookies. You can change your mind any time by clearing this
              site&rsquo;s data in your browser.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
