import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";
import { PRODUCTS, productsByFormat } from "@/data/products";

export default function HomePage() {
  const hero = PRODUCTS[0];
  const balms = productsByFormat("balm");
  const rollers = productsByFormat("roller");

  return (
    <>
      <section className="wrap grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
            Whipped tallow &amp; perfume oil
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-5xl">
            Elevated skincare.
          </h1>
          {/* Client-written, set exactly as written: four lines broken where
              they were broken, no paragraph gaps between them, and no line
              given more weight than another. The breaks are hard rather than
              left to wrap, so the rhythm holds at every width. */}
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Grass-fed tallow, whipped with organic shea and jojoba. Scented with
            essential oils.
            <br />
            Natural ingredients, chosen for what they do.
            <br />
            No fillers. No synthetic bulk. No cutting corners.
            <br />
            Clean. Made properly.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-accent"
            >
              Shop the range
            </Link>
            <Link
              href="/about"
              className="text-sm text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
            >
              Why tallow?
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-paper-deep">
          <ProductArt product={hero} className="h-auto w-full" priority />
        </div>
      </section>

      <section className="wrap rule py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-ink">The balms</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
              Same base every time — grass-fed tallow, organic shea butter,
              organic jojoba. Four blends on top of it.
            </p>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {balms.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="wrap rule py-16">
        <div className="mb-10">
          <h2 className="font-serif text-2xl text-ink">The rollers</h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
            The same four blends in organic jojoba, to carry. They wear
            longest layered over their matching balm.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {rollers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="wrap rule py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            {
              title: "Grass-fed, always",
              body: "Tallow from grass-fed cattle, rendered clean. It is the whole reason the balm works the way it does, so it is not something we would quietly downgrade.",
            },
            {
              title: "Organic through the list",
              body: "Shea, jojoba and every essential oil are certified organic. The full ingredient list is on each product page before you buy, not folded inside the carton.",
            },
            {
              title: "Two ways to wear it",
              body: "Every blend comes as a balm and as a roller. Wear either on its own, or layer the roller over the balm, which holds the scent longer than bare skin does.",
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
