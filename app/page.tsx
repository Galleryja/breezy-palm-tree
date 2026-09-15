import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";
import { PRODUCTS, formatPrice } from "@/data/products";

export default function HomePage() {
  const hero = PRODUCTS[2]; // the vitamin C serum photographs best
  const routineTotal = PRODUCTS.reduce((n, p) => n + p.priceCents, 0);

  return (
    <>
      <section className="wrap grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
            The complete routine
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-5xl">
            Six products.
            <br />
            Nothing spare.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Most shelves hold twenty things and three that work. We make the six
            steps with evidence behind them, at concentrations that do something,
            and stop there.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-accent"
            >
              Shop the six
            </Link>
            <Link
              href="/about"
              className="text-sm text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
            >
              Why only six?
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-faint">
            The full routine comes to {formatPrice(routineTotal)}.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-paper-deep">
          <ProductArt product={hero} className="h-auto w-full" priority />
        </div>
      </section>

      <section className="wrap rule py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-2xl text-ink">The routine, in order</h2>
          <Link
            href="/products"
            className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink"
          >
            All six products
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="wrap rule py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            {
              title: "Concentrations on the front",
              body: "If it says 12% vitamin C, it is 12%. The percentage is part of the name because it is the part that matters.",
            },
            {
              title: "Full INCI, every product",
              body: "The complete ingredient list is on every product page before you buy, not folded into a carton you get later.",
            },
            {
              title: "No routine creep",
              body: "We will not launch a seventh product to fix a problem the first six created. The range is the range.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-serif text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
