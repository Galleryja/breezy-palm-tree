import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "The Six",
  description:
    "All six Six Skincare Products, in the order they are meant to be used: cleanser, essence, vitamin C, niacinamide, barrier cream and mineral SPF 50.",
};

export default function ProductsPage() {
  return (
    <section className="wrap py-16">
      <header className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
          The range
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
          All six, in order
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          Each step earns its place. Use them in sequence, or take the two or
          three you are missing — they were designed to work either way.
        </p>
      </header>

      <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
