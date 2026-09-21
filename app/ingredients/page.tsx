import type { Metadata } from "next";
import Link from "next/link";
import { INGREDIENTS, ingredientsByKind, type Ingredient } from "@/data/ingredients";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "What each material in the range is, what it is made of, and what is documented about it — written about the ingredients themselves, not about the products.",
};

function Entry({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="rule pt-8">
      <h3 className="font-serif text-xl text-ink">{ingredient.name}</h3>
      <p className="mt-1 text-sm italic text-ink-faint">{ingredient.source}</p>

      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        {ingredient.composition}
      </p>

      <ul className="mt-4 space-y-3">
        {ingredient.properties.map((line) => (
          <li key={line} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent"
            />
            <span className="text-base leading-relaxed text-ink-soft">
              {line}
            </span>
          </li>
        ))}
      </ul>

      {ingredient.caveat ? (
        <p className="mt-4 border-l-2 border-line pl-4 text-sm leading-relaxed text-ink-faint">
          {ingredient.caveat}
        </p>
      ) : null}

      {ingredient.usedIn.length > 0 ? (
        <p className="mt-4 text-sm text-ink-faint">
          In: {ingredient.usedIn.join(", ")}
        </p>
      ) : null}
    </div>
  );
}

export default function IngredientsPage() {
  const base = ingredientsByKind("base");
  const oils = ingredientsByKind("oil");

  return (
    <div className="wrap py-16">
      <article className="measure">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
          Reference
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
          What Is in These, and What It Does
        </h1>

        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Every material we use, what it is made of, and what is documented
          about it. Some of these have centuries of traditional use behind
          them; some have been studied in a laboratory; and one or two are here
          purely because of how they smell, which we say plainly rather than
          dress up.
        </p>

        {/* The single most important paragraph on the page. It is what makes
            the rest of it a reference rather than a set of product claims. */}
        <p className="mt-6 rounded-lg bg-paper-deep p-5 text-sm leading-relaxed text-ink-soft">
          <span className="font-medium text-ink">
            This page describes ingredients, not products.
          </span>{" "}
          Everything below is about the raw material — what it is, how it has
          been used, what published work reports about it. None of it is a
          claim about what a Six balm or roller will do for your skin. Our
          products are cosmetics: they moisturise, they soften, and they smell
          good. They are not intended to diagnose, treat, cure or prevent
          anything.
        </p>

        <h2 className="rule mt-14 pt-12 font-serif text-2xl text-ink">
          The Base
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Three materials, in every balm. The rollers are jojoba alone.
        </p>
        <div className="mt-8 space-y-10">
          {base.map((i) => (
            <Entry key={i.slug} ingredient={i} />
          ))}
        </div>

        <h2 className="rule mt-14 pt-12 font-serif text-2xl text-ink">
          The Essential Oils
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Every one certified organic. Listed in the order the blends appear.
        </p>
        <div className="mt-8 space-y-10">
          {oils.map((i) => (
            <Entry key={i.slug} ingredient={i} />
          ))}
        </div>

        <p className="rule mt-14 pt-12 text-sm leading-relaxed text-ink-faint">
          {INGREDIENTS.length} materials in total. The full list for any single
          product, with its naturally occurring fragrance allergens, is on that
          product&apos;s own page.
        </p>

        <Link
          href="/products"
          className="mt-10 inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          See the Range
        </Link>
      </article>
    </div>
  );
}
