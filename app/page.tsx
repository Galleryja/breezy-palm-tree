import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { productsByFormat } from "@/data/products";
import { Hero } from "@/components/hero";

export default function HomePage() {
  const balms = productsByFormat("balm");
  const rollers = productsByFormat("roller");

  return (
    <>
      <Hero />

      <section className="wrap rule py-16">
        <div className="mb-10">
          <h2 className="font-serif text-2xl text-ink">The Balms</h2>
          <p className="measure mt-2 text-sm leading-relaxed text-ink-soft">
            Same base every time — grass-fed tallow, organic mango butter,
            organic jojoba, squalane. Three blends on top of it.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {balms.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="wrap rule py-16">
        <div className="mb-10">
          <h2 className="font-serif text-2xl text-ink">The Rollers</h2>
          <p className="measure mt-2 text-sm leading-relaxed text-ink-soft">
            The same three blends in organic jojoba, to carry. They wear longest
            layered over their matching balm.
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
              title: "Grass-Fed, Always",
              body: "Tallow from grass-fed cattle, rendered clean. It is the whole reason the balm works the way it does, so it is not something we would quietly downgrade.",
            },
            {
              title: "Organic Botanicals",
              body: "Mango butter, jojoba and every essential oil are certified organic. The full ingredient list is on every product page — read it before you buy, not after the carton arrives.",
            },
            {
              title: "Two Ways to Wear It",
              body: "Every blend comes as a balm and as a roller. Wear either alone, or layer the roller over the balm — tallow holds a scent far longer than bare skin does.",
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
