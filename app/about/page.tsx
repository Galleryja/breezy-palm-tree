import type { Metadata } from "next";
import Link from "next/link";
import { WHY_TALLOW } from "@/data/products";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "What grass-fed tallow actually does for skin, what goes into every jar, and why the range stays at six.",
};

/** Shared marker for the lists on this page. */
function Marker() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent"
    />
  );
}

export default function AboutPage() {
  return (
    <article className="wrap max-w-2xl py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
        Approach
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
        Why tallow
      </h1>

      <p className="mt-6 text-base leading-relaxed text-ink-soft">
        Tallow fell out of fashion for a few decades and is coming back, mostly
        because people tried it. Here is what it actually does.
      </p>

      <ul className="mt-8 space-y-5">
        {WHY_TALLOW.map((item) => (
          <li key={item.title} className="flex gap-4">
            <Marker />
            <div>
              <p className="font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-base leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-serif text-2xl text-ink">
        The same base, every jar
      </h2>
      <div className="mt-5 space-y-5 text-base leading-relaxed text-ink-soft">
        <p>
          Every balm starts the same way: grass-fed tallow whipped with organic
          shea butter and organic jojoba. The shea gives it body, the jojoba
          keeps it from feeling heavy, and the whipping turns something firm
          into something you can lift with a fingertip.
        </p>
        <p>
          That is three ingredients before anything is added. The blend on top
          is the only thing that changes between jars, and each of the three
          comes again as a perfume roller in organic jojoba — so you can wear a
          scent lightly, or layer it over the balm and have it last.
        </p>
      </div>

      <h2 className="mt-14 font-serif text-2xl text-ink">Why only six</h2>
      <div className="mt-5 space-y-5 text-base leading-relaxed text-ink-soft">
        <p>
          Six is the range, not a step on the way to twenty. Small batches mean
          nothing sits in a warehouse losing its scent, and every jar gets made
          properly. If we ever add to it, it will be because something is
          genuinely missing — not because we needed a launch.
        </p>
      </div>

      <h2 className="mt-14 font-serif text-2xl text-ink">On essential oils</h2>
      <div className="mt-5 space-y-5 text-base leading-relaxed text-ink-soft">
        <p>
          Every oil in the blends is certified organic, chosen for how it
          smells and how it wears. Some carry long histories — frankincense and
          myrrh have been traded for four thousand years — and we will happily
          tell you about them. What we will not do is tell you a balm treats a
          medical condition.
        </p>
        <p>
          We publish the fragrance allergens that occur naturally in each blend
          on the product page, before you buy, and the citrus blend uses
          blossom and leaf rather than peel oils so it will not make skin
          sun-sensitive. No regulator requires either of those here. They
          seemed like the obvious things to do.
        </p>
      </div>

      <Link
        href="/products"
        className="mt-12 inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
      >
        See the six
      </Link>
    </article>
  );
}
