import Stripe from "stripe";

// Dormant until STRIPE_SECRET_KEY is set. Callers that need Stripe check isStripeConfigured() first.
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is required");
  return new Stripe(key);
}
