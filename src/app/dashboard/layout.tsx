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
          <a href="/dashboard" className="dash-brand">
            STOREPROOF
          </a>
          <nav className="dash-nav">
            <a href="/dashboard">Stores</a>
            <a href="/dashboard/account">Account</a>
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
