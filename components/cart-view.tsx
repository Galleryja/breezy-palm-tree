"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { ProductArt } from "@/components/product-art";
import { formatLabel, formatPrice } from "@/data/products";

export function CartView() {
  const { lines, subtotalCents, setQuantity, remove, ready } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Slugs and quantities only. The server decides what things cost.
        body: JSON.stringify({
          lines: lines.map((l) => ({ slug: l.slug, quantity: l.quantity })),
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "We could not start checkout. Please try again.");
        setPending(false);
        return;
      }

      // Hand off to Stripe's hosted page. Deliberately not clearing the cart
      // here — the shopper may come back via "cancel" and expect their bag.
      window.location.href = data.url;
    } catch {
      setError("Network error. Check your connection and try again.");
      setPending(false);
    }
  }

  if (!ready) {
    return <p className="py-10 text-sm text-ink-faint">Loading your bag…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="py-10">
        <p className="text-base text-ink-soft">Your bag is empty.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Shop the range
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 py-10 lg:grid-cols-[1fr_20rem]">
      <ul className="space-y-6">
        {lines.map((line) => (
          <li key={line.slug} className="rule flex gap-5 pt-6">
            <Link
              href={`/products/${line.slug}`}
              className="w-24 shrink-0 overflow-hidden rounded border border-line bg-paper-deep"
            >
              <ProductArt product={line.product} className="h-auto w-full" />
            </Link>

            <div className="flex-1">
              <Link
                href={`/products/${line.slug}`}
                className="font-serif text-lg text-ink hover:underline"
              >
                {line.product.name}
              </Link>
              <p className="mt-1 text-sm text-ink-faint">
                {formatLabel(line.product.format)} · {line.product.size}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="sr-only">
                    Quantity for {line.product.name}
                  </span>
                  <select
                    value={line.quantity}
                    onChange={(e) =>
                      setQuantity(line.slug, Number(e.target.value))
                    }
                    className="rounded border border-line bg-paper px-2 py-1 text-sm text-ink"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={() => remove(line.slug)}
                  className="text-sm text-ink-faint underline underline-offset-4 hover:text-ink"
                >
                  Remove
                </button>
              </div>
            </div>

            <p className="shrink-0 text-sm tabular-nums text-ink">
              {formatPrice(line.lineTotalCents)}
            </p>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-lg border border-line bg-paper-deep p-6">
        <h2 className="font-serif text-lg text-ink">Summary</h2>

        <div className="mt-4 flex justify-between text-sm text-ink-soft">
          <span>Subtotal</span>
          <span className="tabular-nums text-ink">
            {formatPrice(subtotalCents)}
          </span>
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          Shipping and tax are calculated at checkout.
        </p>

        <button
          type="button"
          onClick={checkout}
          disabled={pending}
          className="mt-6 w-full rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Redirecting…" : "Checkout"}
        </button>

        {error ? (
          <p role="alert" className="mt-4 text-sm leading-relaxed text-red-700">
            {error}
          </p>
        ) : null}

        <p className="mt-4 text-xs leading-relaxed text-ink-faint">
          Payment is handled by Stripe. Card details never touch this site.
        </p>
      </aside>
    </div>
  );
}
