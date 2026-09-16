import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductArt } from "@/components/product-art";
import {
  PRODUCTS,
  getProduct,
  baseNotesFor,
  formatLabel,
  formatPrice,
  CURRENCY,
} from "@/data/products";

// The whole catalogue is known at build time — prerender every product.
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

  const title = `${product.name} ${formatLabel(product.format).toLowerCase()}`;

  return {
    title,
    description: product.tagline,
    openGraph: {
      title: `${title} — Six`,
      description: product.tagline,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const ordered = [...PRODUCTS].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((p) => p.slug === product.slug);
  const previous = ordered[index - 1];
  const next = ordered[index + 1];

  // The matching product in the other format, when there is one.
  const sibling = PRODUCTS.find(
    (p) => p.name === product.name && p.format !== product.format,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${formatLabel(product.format).toLowerCase()}`,
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
          The range
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="overflow-hidden rounded-xl border border-line bg-paper-deep md:sticky md:top-28 md:self-start">
          <ProductArt product={product} className="h-auto w-full" priority />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
            {formatLabel(product.format)} · {product.size}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base text-ink-soft">{product.tagline}</p>

          <p className="mt-6 font-serif text-2xl tabular-nums text-ink">
            {formatPrice(product.priceCents)}
          </p>

          <AddToCart slug={product.slug} className="mt-6 w-full sm:w-auto" />

          <p className="mt-5 text-sm text-ink-faint">Best for: {product.bestFor}</p>

          {sibling ? (
            <p className="mt-1.5 text-sm text-ink-faint">
              Also as a{" "}
              <Link
                href={`/products/${sibling.slug}`}
                className="text-ink-soft underline underline-offset-4 hover:text-ink"
              >
                {formatLabel(sibling.format).toLowerCase()}
              </Link>
              .
            </p>
          ) : null}

          <p className="mt-8 text-base leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <section className="mt-10">
            <h2 className="font-serif text-xl text-ink">
              {product.format === "balm" ? "The base" : "The carrier"}
            </h2>
            <dl className="mt-4 space-y-4">
              {baseNotesFor(product.format).map((n) => (
                <div key={n.name} className="rule pt-4">
                  <dt className="text-sm font-medium text-ink">{n.name}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {n.note}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {product.notes.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-serif text-xl text-ink">The blend</h2>
              <dl className="mt-4 space-y-4">
                {product.notes.map((n) => (
                  <div key={n.name} className="rule pt-4">
                    <dt className="text-sm font-medium text-ink">{n.name}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {n.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <section className="mt-10">
            <h2 className="font-serif text-xl text-ink">How to use</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {product.howToUse}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-serif text-xl text-ink">Ingredients</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {product.ingredients}
            </p>
            {product.allergens ? (
              <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                {product.allergens}
              </p>
            ) : null}
          </section>
        </div>
      </div>

      <nav className="rule mt-20 flex flex-wrap justify-between gap-4 pt-8 text-sm">
        {previous ? (
          <Link
            href={`/products/${previous.slug}`}
            className="text-ink-soft hover:text-ink"
          >
            ← {previous.name} {formatLabel(previous.format).toLowerCase()}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/products/${next.slug}`}
            className="text-ink-soft hover:text-ink"
          >
            {next.name} {formatLabel(next.format).toLowerCase()} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
