/**
 * The Six catalogue.
 *
 * This file is the single source of truth for what is for sale and at what
 * price. The checkout route reads prices from here on the server, so a browser
 * can never talk Six into charging less than the listed amount.
 *
 * Six products: four whipped tallow balms and two perfume rollers, sharing
 * two of their blends. To change the range, edit this array — the homepage,
 * listing, product pages and cart all follow.
 */

export type Format = "balm" | "roller";

export type Product = {
  /** URL segment. Must be unique and stable — it is the permalink. */
  slug: string;
  /** Sort order across the whole range. Balms first, then rollers. */
  order: number;
  format: Format;
  /** The blend name, e.g. "Floral Jasmine". Unscented has no blend. */
  name: string;
  /** Shown under the name in listings. One line, no full stop. */
  tagline: string;
  /** Price in minor units (cents). Integer only — never a float. */
  priceCents: number;
  size: string;
  /** Two or three sentences for the product page. */
  description: string;
  /** How the blend reads on skin. Empty for the unscented balm. */
  notes: { name: string; note: string }[];
  /** Full ingredient list, as it would appear on the label. */
  ingredients: string;
  /**
   * Fragrance allergens that occur naturally in the essential oils. Not
   * required in the US, but it is the honest thing to publish and it is
   * required if these are ever sold into the EU or UK. Empty when unscented.
   */
  allergens: string;
  howToUse: string;
  /**
   * Drives the generated artwork. Two hex colours, light then deep.
   *
   * These run warm while the site's palette runs cool, and that is
   * deliberate: tallow is cream and jojoba is gold, so the products should
   * look like what is actually in the jar. Keep them muted — the contrast
   * with the blue chrome is doing the work, not saturation.
   */
  swatch: [string, string];
  bestFor: string;
};

export const CURRENCY = "usd";

/** Shared across all four balms. */
const TALLOW_BASE =
  "Grass-fed beef tallow, organic shea butter (Butyrospermum Parkii), organic jojoba oil (Simmondsia Chinensis)";

/** Shared by both rollers. */
const ROLLER_BASE = "Organic jojoba oil (Simmondsia Chinensis)";

export const PRODUCTS: Product[] = [
  {
    slug: "floral-jasmine-balm",
    order: 1,
    format: "balm",
    name: "Floral Jasmine",
    tagline: "Jasmine and ylang ylang over vanilla",
    priceCents: 3000,
    size: "6 oz",
    description:
      "The richest thing we make. Jasmine and ylang ylang sit over vanilla and stay warm and sweet on skin for most of the day — a tallow base holds fragrance far longer than a lotion does. People tend to love this one immediately or find it too much; there is not much middle ground.",
    notes: [
      { name: "Jasmine", note: "Heady and honeyed, the centre of the blend" },
      { name: "Ylang Ylang", note: "Creamy and slightly banana-sweet, softens the jasmine's edge" },
      { name: "Vanilla", note: "The warm base everything else settles onto" },
    ],
    ingredients: `${TALLOW_BASE}, organic jasmine absolute (Jasminum Grandiflorum), organic ylang ylang oil (Cananga Odorata), organic vanilla extract (Vanilla Planifolia).`,
    allergens:
      "Contains benzyl benzoate, benzyl salicylate, linalool, farnesol, geraniol and isoeugenol, occurring naturally in the essential oils.",
    howToUse:
      "A little goes a long way. Warm a pea-sized amount between your fingers until it melts, then press into damp skin — straight out of the shower is best, while there is still water to seal in. Face, hands, elbows, anywhere dry.",
    swatch: ["#f7f3ec", "#b9a07f"],
    bestFor: "Dry skin. Rich, so patch test if you are acne-prone",
  },
  {
    slug: "frankincense-myrrh-balm",
    order: 2,
    format: "balm",
    name: "Frankincense & Myrrh",
    tagline: "Two resins, traded for four thousand years",
    priceCents: 3000,
    size: "6 oz",
    description:
      "Dry, warm and faintly smoky — closer to incense than to perfume. It is the most grounding thing in the range and the one that reads properly unisex. If florals feel cloying to you, start here.",
    notes: [
      { name: "Frankincense", note: "Clean and resinous, with a cool citrus edge" },
      { name: "Myrrh", note: "Darker and balsamic, gives the blend its weight" },
    ],
    ingredients: `${TALLOW_BASE}, organic frankincense oil (Boswellia Carterii), organic myrrh oil (Commiphora Myrrha).`,
    allergens:
      "Contains limonene, occurring naturally in the essential oils.",
    howToUse:
      "Warm a pea-sized amount between your fingers until it melts, then press into damp skin. Best straight after a shower. The scent settles and deepens over the first half hour rather than announcing itself.",
    swatch: ["#f2eee7", "#8a7358"],
    bestFor: "Dry skin, and anyone who finds floral scents too sweet",
  },
  {
    slug: "unscented-balm",
    order: 3,
    format: "balm",
    name: "Unscented",
    tagline: "Three ingredients, nothing added",
    priceCents: 3000,
    size: "6 oz",
    description:
      "Grass-fed tallow, organic shea and organic jojoba. That is the entire formula. For sensitive skin, for anyone whose fragrance is already spoken for, and for the people who came to tallow in the first place because they wanted a list they could read in one breath.",
    notes: [],
    ingredients: `${TALLOW_BASE}.`,
    allergens: "",
    howToUse:
      "Warm a pea-sized amount between your fingers until it melts, then press into damp skin. Layer a perfume roller over the top if you want scent — the balm will hold it longer than bare skin does.",
    swatch: ["#f5f4f1", "#9a978f"],
    bestFor: "Sensitive skin, fragrance-free routines, and layering",
  },
  {
    slug: "orange-blossom-petitgrain-balm",
    order: 4,
    format: "balm",
    name: "Orange Blossom & Petitgrain",
    tagline: "One bitter orange tree, two harvests",
    priceCents: 3000,
    size: "6 oz",
    description:
      "Neroli comes from the blossom and petitgrain from the leaves and twigs of the same tree. Together they read light and green-edged — citrus without the sharpness of peel oils. This is the morning option in a range that otherwise leans rich.",
    notes: [
      { name: "Neroli", note: "Honeyed orange blossom, used sparingly because it is precious" },
      { name: "Petitgrain", note: "Green and faintly bitter, carries the blend" },
    ],
    ingredients: `${TALLOW_BASE}, organic neroli oil (Citrus Aurantium Amara flower), organic petitgrain oil (Citrus Aurantium Amara leaf).`,
    allergens:
      "Contains linalool, limonene, geraniol and citral, occurring naturally in the essential oils.",
    howToUse:
      "Warm a pea-sized amount between your fingers until it melts, then press into damp skin. Neither oil in this blend is phototoxic, so unlike lemon or bergamot it is fine to wear in daylight.",
    swatch: ["#f6f4e9", "#a8a56d"],
    bestFor: "Dry skin, daytime wear, and anyone who wants scent kept light",
  },
  {
    slug: "floral-jasmine-roller",
    order: 5,
    format: "roller",
    name: "Floral Jasmine",
    tagline: "The balm's blend, in an oil you can carry",
    priceCents: 2200,
    size: "10 ml",
    description:
      "Jasmine, ylang ylang and vanilla in organic jojoba. Oil-based fragrance sits closer to the skin than an alcohol perfume and unfolds over the first twenty minutes instead of arriving all at once. Jojoba is the carrier because it is closest to what skin makes itself, so it sinks in rather than sitting on top.",
    notes: [
      { name: "Jasmine", note: "Heady and honeyed, the centre of the blend" },
      { name: "Ylang Ylang", note: "Creamy and slightly banana-sweet" },
      { name: "Vanilla", note: "The warm base everything settles onto" },
    ],
    ingredients: `${ROLLER_BASE}, organic jasmine absolute (Jasminum Grandiflorum), organic ylang ylang oil (Cananga Odorata), organic vanilla extract (Vanilla Planifolia).`,
    allergens:
      "Contains benzyl benzoate, benzyl salicylate, linalool, farnesol, geraniol and isoeugenol, occurring naturally in the essential oils.",
    howToUse:
      "Roll onto pulse points — wrists, throat, behind the ears. Over the unscented balm it lasts noticeably longer than on bare skin. Reapply through the day as you like.",
    swatch: ["#f8f2e4", "#c2a361"],
    bestFor: "Evening wear, and layering over the unscented balm",
  },
  {
    slug: "frankincense-myrrh-roller",
    order: 6,
    format: "roller",
    name: "Frankincense & Myrrh",
    tagline: "Incense you can wear",
    priceCents: 2200,
    size: "10 ml",
    description:
      "The same two resins as the balm, in organic jojoba. Dry, warm and quiet — it stays close to the skin rather than filling a room, which is the point. Deliberately kept to two oils; the blend is stronger for not being softened.",
    notes: [
      { name: "Frankincense", note: "Clean and resinous, with a cool citrus edge" },
      { name: "Myrrh", note: "Darker and balsamic, gives the blend its weight" },
    ],
    ingredients: `${ROLLER_BASE}, organic frankincense oil (Boswellia Carterii), organic myrrh oil (Commiphora Myrrha).`,
    allergens: "Contains limonene, occurring naturally in the essential oils.",
    howToUse:
      "Roll onto pulse points — wrists, throat, behind the ears. Warm it in with a fingertip; the resins open up with skin heat. Unisex, and it wears well in cold weather.",
    swatch: ["#f3ece1", "#96784f"],
    bestFor: "Anyone who prefers resin and wood to florals",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByFormat(format: Format): Product[] {
  return PRODUCTS.filter((p) => p.format === format);
}

export function formatLabel(format: Format): string {
  return format === "balm" ? "Whipped tallow balm" : "Perfume roller";
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY.toUpperCase(),
  }).format(cents / 100);
}
