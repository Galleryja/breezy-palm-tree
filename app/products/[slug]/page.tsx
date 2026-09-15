import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductArt } from "@/components/product-art";
import { PRODUCTS, getProduct, formatPrice, CURRENCY } from "@/data/products";

// Six products, all known at build time — prerender every one.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

// In Next 15 `params` is a Promise and must be awaited.
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: `${product.name} — Six`,
      description: product.tagline,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const next = PRODUCTS.find((p) => p.step === product.step + 1);
  const previous = PRODUCTS.find((p) => p.step === product.step - 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: "Six" },
    offers: {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: CURRENCY.toUpperCase(),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <article className="wrap py-12">
      <script
        type="application/ld+json"
        // Content is ours, from the catalogue above — not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-8 text-sm text-ink-faint">
        <Link href="/products" className="hover:text-ink">
          The Six
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="overflow-hidden rounded-xl border border-line bg-paper-deep md:sticky md:top-24 md:self-start">
          <ProductArt product={product} className="h-auto w-full" priority />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
            Step {product.step} of 6 · {product.size}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base text-ink-soft">{product.tagline}</p>

          <p className="mt-6 font-serif text-2xl tabular-nums text-ink">
            {formatPrice(product.priceCents)}
          </p>

          <AddToCart slug={product.slug} className="mt-6 w-full sm:w-auto" />

          <p className="mt-4 text-sm text-ink-faint">
            Suits: {product.skinTypes}
          </p>

          <p className="mt-8 text-base leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <section className="mt-10">
            <h2 className="font-serif text-xl text-ink">What is in it</h2>
            <dl className="mt-4 space-y-4">
              {product.keyIngredients.map((ingredient) => (
                <div key={ingredient.name} className="rule pt-4">
                  <dt className="text-sm font-medium text-ink">
                    {ingredient.name}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {ingredient.note}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-xl text-ink">How to use</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {product.howToUse}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-xl text-ink">Full ingredients</h2>
            <p className="mt-3 text-xs leading-relaxed text-ink-faint">
              {product.inci}
            </p>
          </section>
        </div>
      </div>

      <nav className="rule mt-20 flex flex-wrap justify-between gap-4 pt-8 text-sm">
        {previous ? (
          <Link href={`/products/${previous.slug}`} className="text-ink-soft hover:text-ink">
            ← Step {previous.step}: {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/products/${next.slug}`} className="text-ink-soft hover:text-ink">
            Step {next.step}: {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
