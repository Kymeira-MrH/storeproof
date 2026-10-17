import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe, isStripeConfigured, resolvePriceId, type Tier } from "@/lib/stripe/client";

export const runtime = "nodejs";

// Change an existing subscriber's plan in either direction — upgrade to Fix &
// Watch (£49) or downgrade to Monitoring (£29) — by swapping the subscription's
// price in place with proration. No Stripe Customer Portal required, no second
// subscription, no re-entering card details. Falls back to a fresh checkout if
// there is no live Stripe subscription yet.
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Billing is not configured yet." }, { status: 503 });
  }

  const body = (await req.json().catch(() => null)) as { tier?: string } | null;
  const tier = body?.tier;
  if (tier !== "fix" && tier !== "monitoring") {
    return NextResponse.json({ error: "Choose a plan to switch to." }, { status: 400 });
  }
  const { priceId, error: priceError } = resolvePriceId(tier as Tier);
  if (!priceId) {
    return NextResponse.json({ error: priceError ?? "Billing price is not configured." }, { status: 503 });
  }

  try {
    const stripe = getStripe();
    const admin = createAdminClient();
    const origin = new URL(req.url).origin;

    const { data: sub } = await admin
      .from("subscriptions")
      .select("stripe_customer_id, stripe_subscription_id")
      .eq("account_id", user.id)
      .maybeSingle();

    const subscriptionId = (sub?.stripe_subscription_id as string | null) ?? null;

    // Swap the price on a live subscription in place.
    if (subscriptionId) {
      try {
        const current = await stripe.subscriptions.retrieve(subscriptionId);
        const live = current.status === "active" || current.status === "trialing";
        const itemId = current.items?.data?.[0]?.id;
        const currentPrice = current.items?.data?.[0]?.price?.id;
        if (live && itemId) {
          if (currentPrice === priceId) {
            return NextResponse.json({ url: `${origin}/dashboard?sub=success` });
          }
          await stripe.subscriptions.update(subscriptionId, {
            items: [{ id: itemId, price: priceId }],
            proration_behavior: "create_prorations",
          });
          const marker = tier === "fix" ? "upgraded" : "downgraded";
          return NextResponse.json({ url: `${origin}/dashboard?sub=${marker}` });
        }
      } catch {
        // Stale/cancelled subscription id — fall through to a fresh checkout.
      }
    }

    // No live subscription: reuse the Stripe customer only if it still exists in
    // THIS Stripe account; otherwise forget it and make a fresh one. Guards against
    // stale sandbox customer IDs left in the database (which caused the
    // "No such customer" errors on portal/checkout for test accounts).
    let customerId = (sub?.stripe_customer_id as string | null) ?? undefined;
    if (customerId) {
      try {
        const existing = await stripe.customers.retrieve(customerId);
        if ((existing as { deleted?: boolean }).deleted) customerId = undefined;
      } catch {
        customerId = undefined;
      }
    }
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { account_id: user.id },
      });
      customerId = customer.id;
      await admin.from("subscriptions").upsert({
        account_id: user.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: null,
        status: "none",
        updated_at: new Date().toISOString(),
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard?sub=success`,
      cancel_url: `${origin}/dashboard?sub=cancel`,
      allow_promotion_codes: true,
      metadata: { account_id: user.id },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("stripe change-plan failed", err);
    const message = err instanceof Error ? err.message : "Could not change your plan.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
