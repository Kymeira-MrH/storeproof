import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MarketingNav } from "../marketing-nav";
import { PhotoHero } from "../photo-hero";
import { SiteFooter } from "../site-footer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <>
      <MarketingNav />
      <PhotoHero
        image="/img/shoppers.jpg"
        alt="Shoppers on a busy high street"
        kicker="Dashboard"
        title={<>Your StoreProof <em>account.</em></>}
        lede="Scan, monitor and document accessibility compliance — and keep the evidence your lawyer needs on hand."
      />
      <nav className="dash-subnav" aria-label="Dashboard">
        <div className="dash-subnav-in">
          <div className="dash-subnav-links">
            <a href="/dashboard">Stores</a>
            <a href="/dashboard/account">Account</a>
          </div>
          <div className="dash-account">
            <span className="dash-email">{user.email}</span>
            <form action="/auth/signout" method="post">
              <button className="dash-signout" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>
      <main className="dash-body">{children}</main>
      <SiteFooter />
    </>
  );
}
