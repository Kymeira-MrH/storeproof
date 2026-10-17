import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe, isStripeConfigured } from "@/lib/stripe/client";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Billing is not configured yet." }, { status: 503 });
  }

  const admin = createAdminClient();
  const { data: sub } = await admin
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("account_id", user.id)
    .maybeSingle();
  const customerId = sub?.stripe_customer_id as string | null;
  if (!customerId) {
    return NextResponse.json({ error: "No billing account yet." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const origin = new URL(req.url).origin;
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("stripe portal failed", err);
    // Most common cause: the Stripe Customer Portal has not been activated in the
    // Stripe dashboard (Settings → Billing → Customer portal). Return a clear,
    // non-500 message so the UI shows something useful instead of "unavailable".
    const raw = err instanceof Error ? err.message : "";
    const code =
      (err as { raw?: { code?: string } })?.raw?.code ?? (err as { code?: string })?.code;
    let message = "Couldn't open the billing portal. Please try again.";
    if (code === "resource_missing") {
      message =
        "Your saved billing details are out of date. Choose a plan again from the dashboard to re-link your account, then Manage billing will work.";
    } else if (/portal|configuration/i.test(raw)) {
      message =
        "The billing portal isn't switched on yet. You can still upgrade or downgrade with the buttons here; contact us to cancel.";
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
