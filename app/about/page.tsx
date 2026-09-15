import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Why Six makes six products and no more: evidence-led actives, honest concentrations and a routine you can finish.",
};

export default function AboutPage() {
  return (
    <article className="wrap max-w-2xl py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
        Approach
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
        Why only six?
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-soft">
        <p>
          Skincare has an abundance problem. The average bathroom shelf holds
          more than a dozen products, most bought to solve a problem another
          product on the same shelf created. Complexity gets sold as
          thoroughness, and the routine becomes something to manage rather than
          something that works.
        </p>
        <p>
          There are six things that consistently hold up: cleanse without
          stripping, hydrate, use a morning antioxidant, use something for tone
          and oil balance, repair the barrier, and wear sunscreen every day.
          Everything beyond that is refinement, and most of it is marketing.
        </p>
        <p>
          So we make those six. Each at a concentration with evidence behind it,
          each with its full ingredient list published before you buy, and each
          designed to work alongside the other five rather than compete for a
          place in your morning.
        </p>
        <p>
          We are not planning a seventh. If we ever do add one, it will be
          because something in the six became obsolete — not because we needed
          a launch.
        </p>
      </div>

      <h2 className="mt-14 font-serif text-2xl text-ink">What we will not do</h2>
      <ul className="mt-5 space-y-3 text-base leading-relaxed text-ink-soft">
        <li className="rule pt-3">
          Claim a cosmetic product treats a medical condition.
        </li>
        <li className="rule pt-3">
          Hide a concentration because it is lower than you would expect.
        </li>
        <li className="rule pt-3">
          Sell a &ldquo;booster&rdquo; that fixes a problem our own routine caused.
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
