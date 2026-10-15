import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe, isStripeConfigured, resolvePriceId } from "@/lib/stripe/client";

export const runtime = "nodejs";

// Move an existing subscriber up to the Fix & Watch (£49) plan.
// - If they already have a live Stripe subscription, we swap its price in place
//   with proration — no second subscription, no re-entering card details.
// - If there's no live Stripe subscription yet (e.g. a legacy/manual row), we
//   fall back to a normal checkout session for the Fix tier.
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Billing is not configured yet." }, { status: 503 });
  }
  const { priceId: fixPrice, error: priceError } = resolvePriceId("fix");
  if (!fixPrice) {
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

    // Try an in-place upgrade of a live subscription first.
    if (subscriptionId) {
      try {
        const current = await stripe.subscriptions.retrieve(subscriptionId);
        const live = current.status === "active" || current.status === "trialing";
        const itemId = current.items?.data?.[0]?.id;
        const currentPrice = current.items?.data?.[0]?.price?.id;
        if (live && itemId) {
          if (currentPrice === fixPrice) {
            return NextResponse.json({ url: `${origin}/dashboard?sub=success` });
          }
          await stripe.subscriptions.update(subscriptionId, {
            items: [{ id: itemId, price: fixPrice }],
            proration_behavior: "create_prorations",
          });
          return NextResponse.json({ url: `${origin}/dashboard?sub=upgraded` });
        }
      } catch {
        // Subscription id is stale/cancelled — fall through to a fresh checkout.
      }
    }

    // No live subscription: reuse the Stripe customer if we have one, else create.
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

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: fixPrice, quantity: 1 }],
      success_url: `${origin}/dashboard?sub=success`,
      cancel_url: `${origin}/dashboard?sub=cancel`,
      allow_promotion_codes: true,
      metadata: { account_id: user.id },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("stripe upgrade failed", err);
    const message = err instanceof Error ? err.message : "Could not start the upgrade.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
