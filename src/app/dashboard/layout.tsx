import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MarketingNav } from "../marketing-nav";
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
