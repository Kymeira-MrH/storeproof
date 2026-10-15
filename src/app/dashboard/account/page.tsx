import { createClient } from "@/lib/supabase/server";
import { Billing } from "../billing";
import { DeleteAccount } from "./delete-account";

export const dynamic = "force-dynamic";

const TIER_LABEL: Record<string, string> = {
  record: "Monitoring — £29/month",
  monitoring: "Monitoring — £29/month",
  fix: "Fix & Watch — £49/month",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("tier, status, current_period_end")
    .maybeSingle();

  const status = (sub?.status as string | undefined) ?? "none";
  const active = status === "active" || status === "trialing";
  const tier = (sub?.tier as string | undefined) ?? "";

  return (
    <>
      <p className="crumb">
        <a href="/dashboard">&larr; Stores</a>
      </p>
      <h1 className="dash-h1">Account &amp; billing</h1>
      <p className="dash-sub">Manage your plan and sign-in details.</p>

      <div className="section-label">Signed in as</div>
      <p className="remsum" style={{ marginTop: "8px" }}>
        {user?.email}
      </p>

      <div className="section-label">Your plan</div>
      <p className="remsum" style={{ marginTop: "8px" }}>
        {active ? (
          <>
            You&rsquo;re on <b>{TIER_LABEL[tier] ?? "an active plan"}</b>.
          </>
        ) : (
          <>No active subscription — you can still run the free scan on any store.</>
        )}
      </p>
      <div style={{ marginTop: "14px" }}>
        <Billing status={status} tier={tier} />
      </div>
      <p className="remnote" style={{ marginTop: "12px" }}>
        Paid plans add automated source-level fixes, the signed evidence pack and monthly
        monitoring. You can manage or cancel any time — cancelling stops future billing at the end
        of the current period.
      </p>

      <div className="section-label">Password</div>
      <p className="remnote" style={{ marginTop: "8px" }}>
        Need to change your password? Use the{" "}
        <a href="/forgot-password" style={{ color: "var(--green-d)" }}>
          password reset link
        </a>
        .
      </p>

      <div className="section-label" style={{ color: "var(--red)" }}>
        Danger zone
      </div>
      <p className="remnote" style={{ marginTop: "8px" }}>
        Delete your account and all of the data we hold. This cannot be undone.
      </p>
      <div style={{ marginTop: "14px" }}>
        <DeleteAccount />
      </div>
    </>
  );
}
