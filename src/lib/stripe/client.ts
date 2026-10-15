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

export type Tier = "fix" | "monitoring";

// Resolve the configured Stripe Price ID for a tier, with a friendly guard for
// the single most common setup mistake: pasting a Product ID (prod_…) where a
// Price ID (price_…) belongs. Stripe's own error for that is cryptic, so we
// catch it here and say exactly what to fix.
export function resolvePriceId(tier: Tier): { priceId?: string; error?: string } {
  const priceId = tier === "fix" ? process.env.STRIPE_PRICE_FIX : process.env.STRIPE_PRICE_MONITORING;
  const envName = tier === "fix" ? "STRIPE_PRICE_FIX" : "STRIPE_PRICE_MONITORING";
  if (!priceId) {
    return { error: `Billing isn't finished setting up (${envName} is missing).` };
  }
  if (priceId.startsWith("prod_")) {
    return {
      error:
        `${envName} is set to a Product ID (${priceId}). Stripe needs the Price ID, ` +
        `which starts with "price_". Open the product in Stripe, click its price, and copy the API ID.`,
    };
  }
  if (!priceId.startsWith("price_")) {
    return {
      error: `${envName} doesn't look like a Stripe Price ID (should start with "price_").`,
    };
  }
  return { priceId };
}
