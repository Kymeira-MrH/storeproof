import { Suspense } from "react";
import { AuthHeader } from "../../auth-header";
import { SiteFooter } from "../../site-footer";
import { StartCheckout } from "./start-checkout";

export const metadata = {
  title: "Opening checkout",
  robots: { index: false, follow: false },
};

// Landing point right after sign-up / sign-in when the visitor picked a paid
// plan on the pricing page. It starts Stripe checkout for that plan and hands
// off, so the order is always: choose plan → create account → pay.
export default function Page() {
  return (
    <>
      <AuthHeader />
      <main>
        <section className="block">
          <div className="w" style={{ maxWidth: "520px" }}>
            <Suspense fallback={<p className="remsum">Preparing secure checkout…</p>}>
              <StartCheckout />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
