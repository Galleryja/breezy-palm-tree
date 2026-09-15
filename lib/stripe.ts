import Stripe from "stripe";

/**
 * Lazily constructed Stripe client.
 *
 * Deliberately not a module-level `new Stripe(...)`: that throws at import
 * time when the key is absent, which would break `next build` and every page
 * in the app on a fresh clone. Checkout is the only thing that needs Stripe,
 * so only checkout should fail when it is not configured.
 */
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (client) return client;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Copy .env.example to .env.local and add a test key from https://dashboard.stripe.com/test/apikeys",
    );
  }

  client = new Stripe(key, { typescript: true });
  return client;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
