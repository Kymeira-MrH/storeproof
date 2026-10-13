import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: stores } = await supabase
    .from("stores")
    .select("id, url, created_at")
    .order("created_at", { ascending: false });

  return (
    <main>
      <section className="block">
        <div className="w">
          <div className="head">
            <span className="eyebrow">Dashboard</span>
            <h2>Your stores</h2>
            <p>Signed in as {user.email}.</p>
          </div>

          {stores && stores.length > 0 ? (
            <ul className="checklist">
              {stores.map((s) => (
                <li key={s.id}>
                  <span className="mono">{s.url}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="micro">
              No stores yet. Adding a store, scan history, the evidence pack and billing land here
              next.
            </p>
          )}

          <form action="/auth/signout" method="post" style={{ marginTop: "20px" }}>
            <button className="btn" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
