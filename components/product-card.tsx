import Link from "next/link";
import { ProductArt } from "@/components/product-art";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg border border-line bg-paper-deep">
        <ProductArt
          product={product}
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
          Step {product.step}
        </p>
        <h3 className="mt-1 font-serif text-lg leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {product.tagline}
        </p>
        <p className="mt-2 text-sm tabular-nums text-ink">
          {formatPrice(product.priceCents)}
          <span className="text-ink-faint"> · {product.size}</span>
        </p>
      </div>
    </Link>
  );
}
