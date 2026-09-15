import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Why Six makes whipped tallow balm with grass-fed tallow, organic shea and organic jojoba — and why the range stays at six.",
};

export default function AboutPage() {
  return (
    <article className="wrap max-w-2xl py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
        Approach
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
        Why tallow, and why only six
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-soft">
        <p>
          Tallow is an old ingredient that fell out of fashion and is coming
          back, mostly because people tried it. It is rich, it melts at body
          temperature, and its fatty acid profile is unusually close to what
          skin produces itself — which is why it sinks in rather than sitting
          on top the way a water-and-emulsifier lotion often does.
        </p>
        <p>
          We whip it with organic shea butter and organic jojoba. The shea
          gives it body, the jojoba keeps it from feeling heavy, and the
          whipping turns something firm into something you can scoop with a
          fingertip. The base is the same in every jar. Only the blend on top
          changes.
        </p>
        <p>
          That base is three ingredients. You can read the whole list in one
          breath, and one of the four balms has nothing added to it at all.
          If you came to tallow because everything on the shelf irritated your
          skin, that jar is the one to start with.
        </p>
        <p>
          Six is the range, not a milestone on the way to twenty. Small means
          every batch gets attention and nothing sits in a warehouse losing its
          scent. If the range ever grows, it will be because something is
          genuinely missing from it — not because we needed a launch.
        </p>
      </div>

      <h2 className="mt-14 font-serif text-2xl text-ink">
        On essential oils
      </h2>
      <div className="mt-5 space-y-5 text-base leading-relaxed text-ink-soft">
        <p>
          The blends are chosen for how they smell and how they wear, and every
          oil in them is certified organic. Several have long traditions behind
          them — frankincense and myrrh have been traded for four thousand
          years — and we will tell you about that history. We will not tell you
          a moisturiser treats a medical condition, because it does not.
        </p>
        <p>
          We also publish the fragrance allergens that occur naturally in each
          blend, on the product page, before you buy. No regulator makes us do
          that here. It seemed like the obvious thing to do.
        </p>
      </div>

      <h2 className="mt-14 font-serif text-2xl text-ink">What we will not do</h2>
      <ul className="mt-5 space-y-3 text-base leading-relaxed text-ink-soft">
        <li className="rule pt-3">
          Claim a cosmetic product treats or cures anything.
        </li>
        <li className="rule pt-3">
          Use phototoxic citrus oils in a balm you wear outdoors.
        </li>
        <li className="rule pt-3">
          Hide an ingredient list until after you have paid for it.
        </li>
      </ul>

      <Link
        href="/products"
        className="mt-12 inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
      >
        See the six
      </Link>
    </article>
  );
}
