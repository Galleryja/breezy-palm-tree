import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { CURRENCY, formatLabel, getProduct } from "@/data/products";

/**
 * Creates a Stripe Checkout Session and hands back its URL.
 *
 * SECURITY: the request body carries slugs and quantities only. Every price,
 * name and currency is read from the server-side catalogue. A client that
 * posts `{ priceCents: 1 }` changes nothing, because nothing in the body is
 * used for money. This is the whole reason the route exists rather than the
 * browser talking to Stripe directly.
 */

export const runtime = "nodejs";

const MAX_QTY = 10;
const MAX_LINES = 6; // the catalogue only has six products

type IncomingLine = { slug: unknown; quantity: unknown };

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Payments are not configured yet. Add STRIPE_SECRET_KEY to .env.local and restart the dev server.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const rawLines = (body as { lines?: unknown })?.lines;
  if (!Array.isArray(rawLines) || rawLines.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }
  if (rawLines.length > MAX_LINES) {
    return NextResponse.json({ error: "Too many items." }, { status: 400 });
  }

  const lineItems = [];
  const seen = new Set<string>();

  for (const raw of rawLines as IncomingLine[]) {
    if (typeof raw?.slug !== "string") {
      return NextResponse.json({ error: "Malformed line item." }, { status: 400 });
    }

    // Unknown or retired slug: refuse rather than silently dropping it, so the
    // shopper is never charged for less than what they thought was in the bag.
    const product = getProduct(raw.slug);
    if (!product) {
      return NextResponse.json(
        { error: `"${raw.slug}" is no longer available.` },
        { status: 400 },
      );
    }

    if (seen.has(product.slug)) {
      return NextResponse.json(
        { error: "Duplicate item in bag." },
        { status: 400 },
      );
    }
    seen.add(product.slug);

    const quantity = Math.floor(Number(raw.quantity));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return NextResponse.json(
        { error: `Quantity for ${product.name} must be between 1 and ${MAX_QTY}.` },
        { status: 400 },
      );
    }

    lineItems.push({
      quantity,
      price_data: {
        currency: CURRENCY,
        // Prices come from the catalogue, never from the request.
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          description: `${formatLabel(product.format)} · ${product.size} · ${product.tagline}`,
        },
      },
    });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "http://localhost:3000";

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB"] },
      phone_number_collection: { enabled: false },
    });

    if (!session.url) {
      throw new Error("Stripe returned a session without a checkout URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Log the real reason for the operator; return a generic message to the
    // shopper so Stripe internals are never echoed to the browser.
    console.error("[checkout] Stripe session creation failed:", error);
    return NextResponse.json(
      { error: "We could not start checkout. Please try again." },
      { status: 502 },
    );
  }
}
