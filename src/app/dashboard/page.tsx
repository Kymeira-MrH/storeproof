import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AddStore } from "./add-store";
import { Billing } from "./billing";

export const dynamic = "force-dynamic";

const BAND_LABEL: Record<string, string> = {
  low: "Low",
  elevated: "Elevated",
  high: "High",
  severe: "Severe",
};

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
  const { data: scans } = await supabase
    .from("scans")
    .select("store_id, band, scanned_at")
    .order("scanned_at", { ascending: false });

  const latest = new Map<string, { band: string; scanned_at: string }>();
  for (const s of (scans ?? []) as Array<{ store_id: string; band: string; scanned_at: string }>) {
    if (!latest.has(s.store_id)) latest.set(s.store_id, { band: s.band, scanned_at: s.scanned_at });
  }

  const { data: subRow } = await supabase.from("subscriptions").select("status").maybeSingle();
  const subStatus = (subRow?.status as string | undefined) ?? "none";

  const storeList = (stores ?? []) as Array<{ id: string; url: string; created_at: string }>;

  return (
    <main>
      <div className="mast">
        <div className="w">
          <span>STOREPROOF</span>
          <span>Dashboard</span>
          <span>{user.email}</span>
        </div>
      </div>
      <section className="block">
        <div className="w">
          <div className="head">
            <span className="eyebrow">Dashboard</span>
            <h2>Your stores</h2>
          </div>

          <div style={{ marginBottom: "22px" }}>
            <Billing status={subStatus} />
          </div>

          <AddStore />

          {storeList.length > 0 ? (
            <div className="prices" style={{ marginTop: "28px" }}>
              {storeList.map((s) => {
                const l = latest.get(s.id);
                return (
                  <div className="price" key={s.id}>
                    <span className="k">
                      {l ? `${BAND_LABEL[l.band] ?? l.band} exposure` : "Not scanned yet"}
                    </span>
                    <div className="amt" style={{ fontSize: "20px", wordBreak: "break-all" }}>
                      {s.url}
                    </div>
                    <p className="micro">
                      {l ? `Last scan ${new Date(l.scanned_at).toLocaleDateString()}` : "Scan pending"}
                    </p>
                    <a className="go" href={`/dashboard/stores/${s.id}`}>
                      View &amp; history
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="micro" style={{ marginTop: "20px" }}>
              No stores yet. Add your store URL above to run your first scan.
            </p>
          )}

          <form action="/auth/signout" method="post" style={{ marginTop: "28px" }}>
            <button className="btn" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
