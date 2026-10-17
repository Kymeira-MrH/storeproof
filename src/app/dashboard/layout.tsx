import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteFooter } from "../site-footer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <>
      <header className="dash-top">
        <div className="dash-top-inner">
          <a href="/dashboard" className="dash-brand" aria-label="StoreProof dashboard">
            <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="29" stroke="#c9a24b" strokeWidth="2.6" />
              <path d="M22 32.5l7 7 14-15" stroke="#e3c67e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Store<b>Proof</b>
          </a>
          <nav className="dash-nav">
            <a href="/dashboard">Stores</a>
            <a href="/dashboard/account">Account</a>
            <a href="/">Main site</a>
          </nav>
          <div className="dash-account">
            <span className="dash-email">{user.email}</span>
            <form action="/auth/signout" method="post">
              <button className="dash-signout" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="dash-body">{children}</main>
      <SiteFooter />
    </>
  );
}
