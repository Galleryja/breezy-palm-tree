/**
 * The journal.
 *
 * These posts live on our own domain, which means regulators read them as
 * labelling for the products we sell. A post is not a looser place to write
 * than a product page — it is the same place with more room. So the same
 * rules hold, and one more besides:
 *
 *   - Never name a condition. Not even at arm's length, not even as
 *     "traditionally used for", and not even in a sentence about an
 *     ingredient rather than a product. A post about frankincense published
 *     by a company selling a frankincense balm is evidence of what that balm
 *     is intended to do.
 *   - Never claim an action on skin structure: collagen, elastin, barrier
 *     repair, cell turnover, healing, prevention of ageing.
 *   - Appearance and feel are the safe register. "Looks", "feels", "leaves
 *     skin soft" are cosmetic. "Repairs", "stimulates", "treats" are not.
 *   - Write it ourselves. Ingredient copy circulates between a hundred shops
 *     with the same four claims and the same two errors in it. Lifting it
 *     borrows the liability along with the words.
 *
 * What is left is better material anyway: what a thing actually is, where it
 * comes from, and where the category is wrong about it.
 */

export type Post = {
  /** URL segment. Permalink — do not change once published. */
  slug: string;
  title: string;
  /** One line under the title, and the listing card's summary. */
  standfirst: string;
  /** ISO date. Drives sort order, newest first. */
  date: string;
  /** Minutes, rounded. Honest rather than flattering. */
  readingMinutes: number;
  /**
   * Body, as blocks. Kept structured rather than as a markdown blob so the
   * page controls its own typography and nothing can inject markup.
   */
  body: Block[];
};

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  /** A line that matters more than the paragraph around it. */
  | { kind: "aside"; text: string };

export const POSTS: Post[] = [
  {
    slug: "frankincense-resin-and-oil",
    title: "Frankincense Is Two Different Things",
    standfirst:
      "Almost everything written about frankincense and skin is about the resin. What goes into a balm is the distilled oil. They are not the same material, and the difference is not small.",
    date: "2026-10-02",
    readingMinutes: 4,
    body: [
      {
        kind: "p",
        text: "Frankincense comes out of a tree that looks like it has had a hard life. Boswellia grows in some of the driest country on earth — Oman, Somalia, Yemen, parts of the Horn of Africa — and it is harvested by scoring the bark and walking away. The tree pushes out sap to seal the cut. The sap hardens in the air into lumps the trade calls tears, and someone comes back weeks later to collect them by hand. That is the whole process, and it has not changed in any way that matters in four thousand years.",
      },
      {
        kind: "p",
        text: "What happens next is where the confusion starts, because those tears can go in two directions, and the two results have almost nothing in common.",
      },
      { kind: "h2", text: "The resin and the oil part ways" },
      {
        kind: "p",
        text: "Put the tears through steam distillation and you get frankincense essential oil: a clear, mobile, peppery-bright liquid made up mostly of small molecules called monoterpenes — alpha-pinene and limonene among them. Light things. They are light enough to be carried off in steam, which is precisely why they are in the bottle.",
      },
      {
        kind: "p",
        text: "The heavy fraction does not come with them. Chief among what stays behind are the boswellic acids, a group of large triterpene molecules that are not volatile at all. They sit in the resin. They do not evaporate, they do not travel in steam, and they do not turn up in the distilled oil in any meaningful quantity.",
      },
      {
        kind: "aside",
        text: "Nearly all the published research on frankincense is research on boswellic acids — and boswellic acids are not in frankincense essential oil.",
      },
      {
        kind: "p",
        text: "That sentence is the reason this post exists. Search for frankincense and skin and you will find the same list of impressive-sounding findings reproduced across hundreds of shops, almost all of it tracing back to work done on resin extracts, standardised boswellia preparations, or isolated boswellic acids. Then it gets attached to a bottle of essential oil, which contains none of them.",
      },
      {
        kind: "p",
        text: "Nobody is usually lying on purpose. The copy gets written by someone reading someone else's copy, and twelve shops down the line nobody remembers that the original study was about a different substance. But the result is that a very large share of what is said about frankincense oil is evidence about a material that is not in the jar.",
      },
      { kind: "h2", text: "What the oil actually is" },
      {
        kind: "p",
        text: "A fine aromatic material, is the honest answer. Dry, resinous, faintly citrus at the top and quietly balsamic underneath. It evaporates slowly enough to hold a blend together for hours and never announces itself the way a floral does. In our balm it sits with myrrh, which is heavier still, and the two of them together are the oldest pairing in perfumery for a reason.",
      },
      {
        kind: "p",
        text: "Historically it went on skin as much as into the air. Egyptian and Arabian cosmetic practice was built on perfumed fats and resins — ground aromatics worked into animal fat or oil and rubbed into the face and body. That is a tallow balm with a four-thousand-year head start, and frankincense was one of the staples of it.",
      },
      { kind: "h2", text: "A practical consequence" },
      {
        kind: "p",
        text: "Monoterpenes oxidise. Alpha-pinene and limonene both pick up oxygen over time, and the oxidised forms are meaningfully more likely to irritate skin than fresh ones. This is not a theoretical concern; it is the single most common reason a citrus or conifer oil that was fine last year is not fine now.",
      },
      {
        kind: "p",
        text: "Which is why the jar says to keep it somewhere cool and dark, and why that line is not decoration. Heat and light are what age an oil like this. Keeping the lid on and the jar out of a sunny bathroom window does more for the product than anything else you could do to it.",
      },
      { kind: "h2", text: "What we will and will not tell you" },
      {
        kind: "p",
        text: "We will tell you where a material comes from, what is in it, how it behaves, and what it does to a blend. We will tell you when the category is wrong about something, as it is here, even when being wrong would flatter us.",
      },
      {
        kind: "p",
        text: "What we will not do is tell you a balm treats a medical condition. Our products are cosmetics. They moisturise, they soften, they smell good, and they are not intended to diagnose, treat, cure or prevent anything. Anyone telling you otherwise about a jar of scented fat is either mistaken or selling you something on a claim they cannot support.",
      },
      {
        kind: "p",
        text: "The real case for frankincense is narrower than the internet's and, we would argue, more interesting. It is a material people have wanted on their skin for four millennia because of how it smells and how it wears. That is enough. It does not need help.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Newest first. */
export function postsByDate(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
