import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, isStripeConfigured } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!isStripeConfigured() || !secret) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const stripe = getStripe();
  const signature = req.headers.get("stripe-signature");
  const raw = await req.text(); // raw body required for signature verification

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature ?? "", secret);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  const admin = createAdminClient();

  async function upsertFromSubscription(sub: Stripe.Subscription, accountIdHint?: string) {
    const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
    let accountId = accountIdHint;
    if (!accountId) {
      const { data } = await admin
        .from("subscriptions")
        .select("account_id")
        .eq("stripe_customer_id", customerId)
        .maybeSingle();
      accountId = (data?.account_id as string | undefined) ?? undefined;
    }
    if (!accountId) return;
    const periodEnd = (sub as unknown as { current_period_end?: number }).current_period_end;
    const priceId = sub.items?.data?.[0]?.price?.id;
    const tier = priceId && priceId === process.env.STRIPE_PRICE_FIX ? "fix" : "monitoring";
    await admin.from("subscriptions").upsert({
      account_id: accountId,
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      tier,
      status: sub.status,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      updated_at: new Date().toISOString(),
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const accountId = session.metadata?.account_id ?? undefined;
      if (session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        await upsertFromSubscription(sub, accountId);
      }
    } else if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted" ||
      event.type === "customer.subscription.created"
    ) {
      await upsertFromSubscription(event.data.object as Stripe.Subscription);
    }
  } catch (err) {
    console.error("stripe webhook handling failed", err);
    return NextResponse.json({ error: "handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
