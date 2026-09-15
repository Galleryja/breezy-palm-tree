import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { productsByFormat } from "@/data/products";

export const metadata: Metadata = {
  title: "The Six",
  description:
    "Four whipped tallow balms in organic essential oil blends, and two perfume rollers. Grass-fed tallow, organic shea and organic jojoba throughout.",
};

export default function ProductsPage() {
  const balms = productsByFormat("balm");
  const rollers = productsByFormat("roller");

  return (
    <section className="wrap py-16">
      <header className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
          The range
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
          Four balms, two rollers
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          Every balm shares the same base — grass-fed tallow, organic shea
          butter, organic jojoba — and differs only in the blend on top. Two of
          those blends come again as perfume oil.
        </p>
      </header>

      <div className="mt-14">
        <h2 className="font-serif text-xl text-ink">Whipped tallow balm · 6 oz</h2>
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {balms.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      <div className="rule mt-20 pt-12">
        <h2 className="font-serif text-xl text-ink">Perfume roller · 10 ml</h2>
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {rollers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
