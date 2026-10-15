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

  const body = (await req.json().catch(() => null)) as { tier?: string } | null;
  const price =
    body?.tier === "fix" ? process.env.STRIPE_PRICE_FIX : process.env.STRIPE_PRICE_MONITORING;
  if (!isStripeConfigured() || !price) {
    return NextResponse.json({ error: "Billing is not configured yet." }, { status: 503 });
  }

  try {
    const stripe = getStripe();
    const admin = createAdminClient();

    // Reuse the Stripe customer if we already made one for this account.
    const { data: sub } = await admin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("account_id", user.id)
      .maybeSingle();
    let customerId = (sub?.stripe_customer_id as string | null) ?? undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { account_id: user.id },
      });
      customerId = customer.id;
      await admin.from("subscriptions").upsert({
        account_id: user.id,
        stripe_customer_id: customerId,
        status: "none",
        updated_at: new Date().toISOString(),
      });
    }

    const origin = new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/dashboard?sub=success`,
      cancel_url: `${origin}/dashboard?sub=cancel`,
      allow_promotion_codes: true,
      metadata: { account_id: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("stripe checkout failed", err);
    const message = err instanceof Error ? err.message : "Could not start checkout.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
