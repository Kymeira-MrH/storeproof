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

  const stripe = getStripe();
  const origin = new URL(req.url).origin;
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/dashboard`,
  });
  return NextResponse.json({ url: session.url });
}
