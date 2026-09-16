import type { Metadata } from "next";
import Link from "next/link";
import { ClearCartOnMount } from "@/components/clear-cart-on-mount";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

type PageProps = { searchParams: Promise<{ session_id?: string }> };

export default async function SuccessPage({ searchParams }: PageProps) {
  const { session_id: sessionId } = await searchParams;

  // Don't take the redirect's word for it — anyone can visit /success. Ask
  // Stripe whether this session was actually paid before confirming anything
  // or clearing the shopper's bag.
  let paid = false;
  let email: string | null = null;

  if (sessionId && isStripeConfigured()) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? null;
    } catch (error) {
      console.error("[success] could not retrieve session:", error);
    }
  }

  return (
    <section className="wrap max-w-xl py-24">
      {paid ? (
        <>
          <ClearCartOnMount />
          <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
            Order confirmed
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-ink">
            Thank you — your order is in.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            {email
              ? `A receipt is on its way to ${email}.`
              : "A receipt is on its way to your email."}{" "}
            Orders are packed within two working days.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-serif text-3xl leading-tight text-ink">
            We could not confirm this order
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            If you completed payment, your receipt is still on its way and your
            order is safe — this page just could not verify it. Your bag has
            been left as it was.
          </p>
        </>
      )}

      <Link
        href="/products"
        className="mt-8 inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
      >
        Back to the range
      </Link>
    </section>
  );
}
