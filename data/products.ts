/**
 * The Six catalogue.
 *
 * This file is the single source of truth for what is for sale and at what
 * price. The checkout route reads prices from here on the server, so a browser
 * can never talk Six into charging less than the listed amount.
 *
 * Four blends, each as a whipped tallow balm and as a perfume roller. To
 * change the range, edit this array — the homepage, listing, product pages
 * and cart all follow. "Six" is the brand, not a count.
 */

export type Format = "balm" | "roller";

export type Product = {
  /** URL segment. Must be unique and stable — it is the permalink. */
  slug: string;
  /** Sort order across the whole range. Balms first, then rollers. */
  order: number;
  format: Format;
  /** The blend name, e.g. "Sheer Suede". */
  name: string;
  /**
   * Shown directly under the name, on cards and on the product page.
   * Where the name is evocative rather than descriptive — Sheer Suede — this
   * is what tells a shopper what is actually in the jar, so it carries the
   * blend, not atmosphere.
   */
  tagline: string;
  /** Price in minor units (cents). Integer only — never a float. */
  priceCents: number;
  size: string;
  /** Two or three sentences for the product page. */
  description: string;
  /** The oils in the blend, and what each one does. */
  notes: { name: string; note: string }[];
  /** Full ingredient list, as it would appear on the label. */
  ingredients: string;
  /**
   * Fragrance allergens that occur naturally in the essential oils. Not
   * required in the US, but it is the honest thing to publish and it is
   * required if these are ever sold into the EU or UK.
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

/** Shared by all four rollers. */
const ROLLER_BASE = "Organic jojoba oil (Simmondsia Chinensis)";

/**
 * The base every balm shares, and the jojoba the rollers are built on.
 *
 * Client-written copy — keep the wording unless asked to change it. It stays
 * to composition and feel ("naturally carries vitamins A, D, E and K",
 * "used as a skin balm for centuries") and never says the product treats
 * anything, which is the line that separates a cosmetic from a drug claim.
 */
const BALM_BASE_NOTES = [
  {
    name: "Grass-fed beef tallow",
    note: "Lipids your skin recognizes. Rich in the same fatty acids found in skin's natural oils, tallow melts in easily and leaves skin soft and supple. It naturally carries vitamins A, D, E, and K, and has been used as a skin balm for centuries.",
  },
  {
    name: "Organic shea butter",
    note: "Naturally rich in vitamin E, shea is velvety and slow to fade, giving the balm its cushioned texture and leaving a soft layer of moisture that lasts well into the day.",
  },
  {
    name: "Organic jojoba oil",
    note: "Native to the Sonoran Desert. Jojoba is a liquid wax and the closest match to skin's natural oils found in any plant, so it sinks in easily and feels right at home on skin. Lightweight and naturally rich in vitamin E, it lightens the balm and leaves a silky, glowing finish.",
  },
];

/** The rollers are jojoba alone, so the balm-specific clause is dropped. */
const ROLLER_BASE_NOTES = [
  {
    name: "Organic jojoba oil",
    note: "Native to the Sonoran Desert. Jojoba is a liquid wax and the closest match to skin's natural oils found in any plant, so it sinks in easily and feels right at home on skin. Lightweight and naturally rich in vitamin E, it carries the blend without weighing it down.",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "floral-jasmine-balm",
    order: 1,
    format: "balm",
    name: "Floral Jasmine",
    tagline: "Jasmine, Vanilla, and Ylang Ylang",
    priceCents: 3000,
    size: "6 oz",
    description:
      "Whipped tallow balm with jasmine, ylang ylang and natural vanilla. This is a beautiful floral blend and a feeling of elevation from the natural elements.",
    notes: [
      {
        name: "Organic jasmine absolute",
        note: "Prized in skincare and perfumery for centuries, Jasminum grandiflorum gives the balm its warm floral heart and a scent that lasts for hours.",
      },
      {
        name: "Organic ylang ylang oil",
        note: "Steam-distilled from the flowers of Cananga odorata, ylang ylang adds a creamy sweetness that balances the jasmine and rounds out the blend.",
      },
      {
        name: "Organic vanilla CO2 extract",
        note: "Extracted from cured Vanilla planifolia beans using supercritical CO2, a solvent-free method that preserves the bean's full profile. Naturally contains vanillin, an antioxidant that helps keep the balm's oils fresh, and adds a warm base that lingers after the florals fade.",
      },
    ],
    ingredients: `${TALLOW_BASE}, organic jasmine absolute (Jasminum Grandiflorum), organic ylang ylang oil (Cananga Odorata), organic vanilla CO2 extract (Vanilla Planifolia).`,
    allergens:
      "Contains benzyl benzoate, benzyl salicylate, linalool, farnesol, geraniol and isoeugenol, occurring naturally in the essential oils.",
    howToUse:
      "A little goes a long way. Warm a pea-sized amount between your fingers until it melts, then press into damp skin — straight out of the shower is best, while there is still water to seal in. Face, hands, elbows, anywhere dry.",
    swatch: ["#f7f3ec", "#b9a07f"],
    bestFor: "Dry skin. Rich, so patch test if you are acne-prone",
  },
  {
    slug: "sheer-suede-balm",
    order: 2,
    format: "balm",
    name: "Sheer Suede",
    tagline: "Frankincense and Myrrh",
    priceCents: 3000,
    size: "6 oz",
    description:
      "Frankincense and myrrh, dry and faintly resinous, with a lift that keeps it from sitting heavy. It is the most grounding thing in the range and the one that reads properly unisex. If florals feel cloying to you, start here.",
    notes: [
      {
        name: "Organic frankincense oil",
        note: "Steam-distilled from the resin of Boswellia carterii, frankincense has been prized in skincare and ritual for thousands of years. Its bright, resinous scent adds clarity to the blend, and it has long been used in traditional skincare for smooth, radiant-looking skin.",
      },
      {
        name: "Organic myrrh oil",
        note: "Steam-distilled from the resin of Commiphora myrrha, myrrh was among the most valued ingredients of ancient Egyptian and Middle Eastern skincare. Warm, earthy, and slightly smoky, it deepens the frankincense and grounds the blend.",
      },
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
    slug: "balanced-light-balm",
    order: 3,
    format: "balm",
    name: "Balanced Light",
    tagline: "Neroli and Petitgrain",
    priceCents: 3000,
    size: "6 oz",
    description:
      "Neroli comes from the blossom and petitgrain from the leaves and twigs of the same tree. Together they read light and green-edged — citrus without the sharpness of peel oils. This is the bright option in a range that otherwise leans rich.",
    notes: [
      {
        name: "Organic neroli oil",
        note: "Steam-distilled from Citrus aurantium blossoms and long favored for mature skin. Naturally rich in antioxidant compounds, neroli adds a bright floral note and leaves skin looking fresh and radiant.",
      },
      {
        name: "Organic petitgrain oil",
        note: "From the leaves of the same bitter orange tree. Traditionally used for clear, balanced-looking skin, petitgrain adds a crisp, green edge that keeps the blend clean.",
      },
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
    slug: "dry-cedar-balm",
    order: 4,
    format: "balm",
    name: "Dry Cedar",
    tagline: "Cedarwood and Vetiver",
    priceCents: 3000,
    size: "6 oz",
    description:
      "Cedarwood and vetiver — dry wood over damp earth. The most grounded thing in the range and the one that reads most masculine, though it suits anyone who would rather smell like a place than a flower. It wears close and lasts all day on a tallow base.",
    notes: [
      {
        name: "Organic cedarwood oil",
        note: "Steam-distilled from the wood of Cedrus atlantica, cedarwood has been used in perfumery and preservation since antiquity. Dry and softly resinous, it gives the blend its backbone.",
      },
      {
        name: "Organic vetiver oil",
        note: "Distilled from the roots of Chrysopogon zizanioides, a grass grown as much for the way its roots hold soil together as for its oil. Deep, earthy and faintly smoky, vetiver grounds the cedar and gives the blend its long finish.",
      },
    ],
    ingredients: `${TALLOW_BASE}, organic cedarwood oil (Cedrus Atlantica), organic vetiver oil (Chrysopogon Zizanioides).`,
    allergens:
      "Contains limonene, occurring naturally in the essential oils.",
    howToUse:
      "Warm a pea-sized amount between your fingers until it melts, then press into damp skin. Best straight after a shower. Vetiver opens up slowly, so give it half an hour before deciding what you think of it.",
    swatch: ["#f1efe9", "#7a705f"],
    bestFor: "Dry skin, cold weather, and anyone who finds florals too sweet",
  },
  {
    slug: "floral-jasmine-roller",
    order: 5,
    format: "roller",
    name: "Floral Jasmine",
    tagline: "Jasmine, Vanilla, and Ylang Ylang",
    priceCents: 2200,
    size: "10 ml",
    description:
      "Jasmine, ylang ylang and vanilla in organic jojoba. Oil-based fragrance sits closer to the skin than an alcohol perfume and unfolds over the first twenty minutes instead of arriving all at once. Jojoba is the carrier because it is closest to what skin makes itself, so it sinks in rather than sitting on top.",
    notes: [
      {
        name: "Organic jasmine absolute",
        note: "Prized in skincare and perfumery for centuries, Jasminum grandiflorum gives the balm its warm floral heart and a scent that lasts for hours.",
      },
      {
        name: "Organic ylang ylang oil",
        note: "Steam-distilled from the flowers of Cananga odorata, ylang ylang adds a creamy sweetness that balances the jasmine and rounds out the blend.",
      },
      {
        name: "Organic vanilla CO2 extract",
        note: "Extracted from cured Vanilla planifolia beans using supercritical CO2, a solvent-free method that preserves the bean's full profile. Naturally contains vanillin, an antioxidant that helps keep the balm's oils fresh, and adds a warm base that lingers after the florals fade.",
      },
    ],
    ingredients: `${ROLLER_BASE}, organic jasmine absolute (Jasminum Grandiflorum), organic ylang ylang oil (Cananga Odorata), organic vanilla CO2 extract (Vanilla Planifolia).`,
    allergens:
      "Contains benzyl benzoate, benzyl salicylate, linalool, farnesol, geraniol and isoeugenol, occurring naturally in the essential oils.",
    howToUse:
      "Roll onto pulse points — wrists, throat, behind the ears. Over a balm it lasts noticeably longer than on bare skin. Reapply through the day as you like.",
    swatch: ["#f8f2e4", "#c2a361"],
    bestFor: "Evening wear, and layering over the matching balm",
  },
  {
    slug: "sheer-suede-roller",
    order: 6,
    format: "roller",
    name: "Sheer Suede",
    tagline: "Frankincense and Myrrh",
    priceCents: 2200,
    size: "10 ml",
    description:
      "The same two resins as the balm — frankincense and myrrh — in organic jojoba. Dry, warm and quiet, it stays close to the skin rather than filling a room, which is the point. Deliberately kept to two oils; the blend is stronger for not being softened.",
    notes: [
      {
        name: "Organic frankincense oil",
        note: "Steam-distilled from the resin of Boswellia carterii, frankincense has been prized in skincare and ritual for thousands of years. Its bright, resinous scent adds clarity to the blend, and it has long been used in traditional skincare for smooth, radiant-looking skin.",
      },
      {
        name: "Organic myrrh oil",
        note: "Steam-distilled from the resin of Commiphora myrrha, myrrh was among the most valued ingredients of ancient Egyptian and Middle Eastern skincare. Warm, earthy, and slightly smoky, it deepens the frankincense and grounds the blend.",
      },
    ],
    ingredients: `${ROLLER_BASE}, organic frankincense oil (Boswellia Carterii), organic myrrh oil (Commiphora Myrrha).`,
    allergens: "Contains limonene, occurring naturally in the essential oils.",
    howToUse:
      "Roll onto pulse points — wrists, throat, behind the ears. Warm it in with a fingertip; the resins open up with skin heat. Unisex, and it wears well in cold weather.",
    swatch: ["#f3ece1", "#96784f"],
    bestFor: "Anyone who prefers resin and wood to florals",
  },
  {
    slug: "balanced-light-roller",
    order: 7,
    format: "roller",
    name: "Balanced Light",
    tagline: "Neroli and Petitgrain",
    priceCents: 2200,
    size: "10 ml",
    description:
      "Neroli and petitgrain in organic jojoba — blossom and leaf from the same bitter orange tree. The lightest thing we make, and the one that wears best in warm weather. Neither oil is phototoxic, unlike the peel oils a citrus scent usually reaches for, so it is safe to wear in daylight.",
    notes: [
      {
        name: "Organic neroli oil",
        note: "Steam-distilled from Citrus aurantium blossoms and long favored for mature skin. Naturally rich in antioxidant compounds, neroli adds a bright floral note and leaves skin looking fresh and radiant.",
      },
      {
        name: "Organic petitgrain oil",
        note: "From the leaves of the same bitter orange tree. Traditionally used for clear, balanced-looking skin, petitgrain adds a crisp, green edge that keeps the blend clean.",
      },
    ],
    ingredients: `${ROLLER_BASE}, organic neroli oil (Citrus Aurantium Amara flower), organic petitgrain oil (Citrus Aurantium Amara leaf).`,
    allergens:
      "Contains linalool, limonene, geraniol and citral, occurring naturally in the essential oils.",
    howToUse:
      "Roll onto pulse points — wrists, throat, behind the ears. Lighter than the other two, so it suits daytime and reapplying without it building up. Safe to wear in sun.",
    swatch: ["#f7f4e6", "#a89a5e"],
    bestFor: "Daytime wear, warm weather, and anyone who wants scent kept light",
  },
  {
    slug: "dry-cedar-roller",
    order: 8,
    format: "roller",
    name: "Dry Cedar",
    tagline: "Cedarwood and Vetiver",
    priceCents: 2200,
    size: "10 ml",
    description:
      "The same cedar and vetiver in organic jojoba. It sits very close to the skin — this is the one people notice when they are already standing next to you, not across a room. Two oils and nothing to soften them.",
    notes: [
      {
        name: "Organic cedarwood oil",
        note: "Steam-distilled from the wood of Cedrus atlantica, cedarwood has been used in perfumery and preservation since antiquity. Dry and softly resinous, it gives the blend its backbone.",
      },
      {
        name: "Organic vetiver oil",
        note: "Distilled from the roots of Chrysopogon zizanioides, a grass grown as much for the way its roots hold soil together as for its oil. Deep, earthy and faintly smoky, vetiver grounds the cedar and gives the blend its long finish.",
      },
    ],
    ingredients: `${ROLLER_BASE}, organic cedarwood oil (Cedrus Atlantica), organic vetiver oil (Chrysopogon Zizanioides).`,
    allergens:
      "Contains limonene, occurring naturally in the essential oils.",
    howToUse:
      "Roll onto pulse points — wrists, throat, behind the ears. Warm it in with a fingertip; vetiver needs skin heat to open. Wears well in cold weather and layers over any of the balms.",
    swatch: ["#efece4", "#6f6857"],
    bestFor: "Anyone who prefers wood and earth to florals",
  },
];

/**
 * The case for tallow, shown on the approach page.
 *
 * Client-written copy — keep the wording unless asked to change it. Every
 * line here is composition ("carries vitamins A, D, E and K") or feel
 * ("helping dry, weathered skin feel comfortable again") rather than a claim
 * to treat anything.
 */
export const WHY_TALLOW: { title: string; body: string }[] = [
  {
    title: "Skin-familiar moisture",
    body: "Tallow's fatty acids resemble those in skin's natural oils, so it melts in easily and softens skin without a heavy, greasy feel.",
  },
  {
    title: "Locks in moisture",
    body: "Rich in stearic, oleic, and palmitic acids, tallow forms a soft layer that holds moisture in, helping dry, weathered skin feel comfortable again.",
  },
  {
    title: "Naturally contains fat-soluble vitamins",
    body: "Grass-fed tallow carries vitamins A, D, E, and K, nutrients that come from the fresh grass the cattle eat.",
  },
  {
    title: "Gentle and nourishing",
    body: "Grass-fed tallow naturally contains conjugated linoleic acid (CLA) and palmitoleic acid, giving it a rich, nourishing feel that suits dry and sensitive skin.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByFormat(format: Format): Product[] {
  return PRODUCTS.filter((p) => p.format === format);
}

/** What the product is built on, before any blend goes in. */
export function baseNotesFor(format: Format): { name: string; note: string }[] {
  return format === "balm" ? BALM_BASE_NOTES : ROLLER_BASE_NOTES;
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

