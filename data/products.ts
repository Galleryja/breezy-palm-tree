/**
 * The SIX catalogue.
 *
 * This file is the single source of truth for what is for sale and at what
 * price. The checkout route reads prices from here on the server, so a browser
 * can never talk SIX into charging less than the listed amount.
 *
 * To change the range: edit this array. Nothing else needs to know.
 */

export type Product = {
  /** URL segment. Must be unique and stable — it is the permalink. */
  slug: string;
  /** Position in the routine, 1-6. Also drives the "Step n" label. */
  step: number;
  name: string;
  /** Shown under the name in listings. One line, no full stop. */
  tagline: string;
  /** Price in minor units (cents). Integer only — never a float. */
  priceCents: number;
  size: string;
  /** Two or three sentences for the product page. */
  description: string;
  /** The actives worth putting on the label, with why they are there. */
  keyIngredients: { name: string; note: string }[];
  /** Full INCI list, as it would appear on the carton. */
  inci: string;
  howToUse: string;
  /** Drives the generated artwork. Two hex colours, light then deep.
   *  Keep these cool and desaturated; the palette carries the brand, not
   *  the product art. Two warm notes are deliberate, for the vitamin C and
   *  the sunscreen, which are warm-toned products. */
  swatch: [string, string];
  skinTypes: string;
};

export const CURRENCY = "usd";

export const PRODUCTS: Product[] = [
  {
    slug: "clarifying-gel-cleanser",
    step: 1,
    name: "Clarifying Gel Cleanser",
    tagline: "A low-foam gel that leaves the barrier intact",
    priceCents: 2800,
    size: "150ml",
    description:
      "A pH-balanced gel that lifts sunscreen, sebum and the day without stripping. It foams just enough to feel like it is working, then rinses clean and leaves nothing behind. No squeak, no tightness, no need to rush to moisturiser.",
    keyIngredients: [
      { name: "Coco-Betaine", note: "A gentle surfactant that cleans without the harshness of sulfates" },
      { name: "Glycerin 5%", note: "Draws water into the skin so cleansing does not cost you hydration" },
      { name: "Panthenol", note: "Provitamin B5, calms the low-grade irritation that washing can cause" },
    ],
    inci:
      "Aqua, Coco-Betaine, Glycerin, Sodium Cocoyl Isethionate, Panthenol, Sodium Chloride, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    howToUse:
      "Morning and evening. Massage half a pump into damp skin for thirty seconds, rinse with lukewarm water, pat dry. In the evening, use after an oil cleanser if you wear heavy sunscreen or makeup.",
    swatch: ["#eef3f6", "#5c7d92"],
    skinTypes: "All skin types, including sensitive",
  },
  {
    slug: "hydrating-essence",
    step: 2,
    name: "Hydrating Essence",
    tagline: "Watery hydration that makes everything after it work harder",
    priceCents: 3400,
    size: "120ml",
    description:
      "A thin, fast-sinking layer of humectants applied to damp skin. It is the least glamorous step in the routine and the one people notice most when they stop. Think of it as priming the skin so your serums are not landing on a dry surface.",
    keyIngredients: [
      { name: "Hyaluronic Acid, three weights", note: "Hydrates at different depths rather than sitting on top" },
      { name: "Beta-Glucan", note: "Holds water and calms reactive skin at the same time" },
      { name: "Trehalose", note: "A sugar that helps skin hold moisture when the air is dry" },
    ],
    inci:
      "Aqua, Glycerin, Butylene Glycol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Hyaluronate Crosspolymer, Beta-Glucan, Trehalose, Panthenol, Allantoin, Sodium Benzoate, Potassium Sorbate, Citric Acid.",
    howToUse:
      "After cleansing, while skin is still damp. Press two to three pushes into the face with your palms rather than wiping. Follow within a minute so the water has something to sit under.",
    swatch: ["#eaf1f8", "#47698c"],
    skinTypes: "All skin types, especially dehydrated",
  },
  {
    slug: "vitamin-c-serum-12",
    step: 3,
    name: "Vitamin C Serum 12%",
    tagline: "Morning antioxidant for tone and dullness",
    priceCents: 5800,
    size: "30ml",
    description:
      "Twelve percent L-ascorbic acid stabilised with ferulic acid and vitamin E — the combination with the most evidence behind it. It brightens unevenness over weeks, not days, and meaningfully reduces the daily oxidative load that ages skin. Twelve percent is the point where results plateau but irritation does not.",
    keyIngredients: [
      { name: "L-Ascorbic Acid 12%", note: "The most studied form of vitamin C for tone and photoprotection" },
      { name: "Ferulic Acid 0.5%", note: "Stabilises the formula and extends its antioxidant life" },
      { name: "Tocopherol 1%", note: "Vitamin E, works with C to cover a wider range of free radicals" },
    ],
    inci:
      "Aqua, Ascorbic Acid, Propylene Glycol, Ethoxydiglycol, Glycerin, Ferulic Acid, Tocopherol, Panthenol, Sodium Hyaluronate, Triethanolamine, Sodium Metabisulfite.",
    howToUse:
      "Mornings only, after essence and before moisturiser. Four to five drops over face and neck. Always follow with sunscreen. New to vitamin C? Use every other morning for two weeks first.",
    swatch: ["#f6f1e8", "#9a7f4f"],
    skinTypes: "Normal, combination and oily. Introduce slowly if sensitive",
  },
  {
    slug: "niacinamide-serum-10",
    step: 4,
    name: "Niacinamide Serum 10%",
    tagline: "For pores, oil balance and a calmer barrier",
    priceCents: 4200,
    size: "30ml",
    description:
      "Ten percent niacinamide with zinc PCA, aimed at visible pores, shine and the redness that comes with a stressed barrier. It is one of the few actives that works for oily and sensitive skin at once. Results on texture show up around week four.",
    keyIngredients: [
      { name: "Niacinamide 10%", note: "Regulates oil, supports ceramide production, evens tone" },
      { name: "Zinc PCA 1%", note: "Helps control shine through the day" },
      { name: "Allantoin", note: "Soothes, and takes the edge off niacinamide for reactive skin" },
    ],
    inci:
      "Aqua, Niacinamide, Pentylene Glycol, Zinc PCA, Glycerin, Allantoin, Sodium Hyaluronate, Xanthan Gum, Sodium Benzoate, Potassium Sorbate, Citric Acid.",
    howToUse:
      "Evenings, after essence. Three to four drops on face and neck. Can be used mornings too — if you also use the vitamin C serum, put niacinamide in the evening to keep each step simple.",
    swatch: ["#eeeef7", "#5d6188"],
    skinTypes: "Oily, combination and blemish-prone",
  },
  {
    slug: "barrier-repair-moisturiser",
    step: 5,
    name: "Barrier Repair Moisturiser",
    tagline: "Ceramides in the ratio skin actually uses",
    priceCents: 4600,
    size: "50ml",
    description:
      "A cream built around the 3:1:1 ceramide-to-cholesterol-to-fatty-acid ratio that research links to barrier recovery. It is rich enough to seal in the steps beneath it but finishes matte enough to wear under sunscreen. This is the step that stops actives from turning into irritation.",
    keyIngredients: [
      { name: "Ceramides NP, AP, EOP", note: "Replaces the lipids that cleansing and actives deplete" },
      { name: "Cholesterol + Fatty Acids", note: "The other two thirds of a barrier that repairs properly" },
      { name: "Squalane", note: "A light emollient that softens without a greasy film" },
    ],
    inci:
      "Aqua, Glycerin, Squalane, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Cholesterol, Phytosphingosine, Sodium Lauroyl Lactylate, Panthenol, Tocopherol, Xanthan Gum, Carbomer, Sodium Hydroxide, Phenoxyethanol, Ethylhexylglycerin.",
    howToUse:
      "Morning and evening, as the last step before sunscreen. A pea-sized amount for the face. Use more at night or in winter if skin feels tight by morning.",
    swatch: ["#f0f2f4", "#6f7880"],
    skinTypes: "All skin types, especially dry or compromised",
  },
  {
    slug: "mineral-sunscreen-spf50",
    step: 6,
    name: "Mineral Sunscreen SPF 50",
    tagline: "Zinc oxide that does not leave you grey",
    priceCents: 3800,
    size: "50ml",
    description:
      "Broad-spectrum SPF 50 from non-nano zinc oxide, in a base tinted just enough to cancel the white cast mineral filters are known for. It sits under makeup without pilling and does not sting the eyes. The single highest-value step in this routine, and the one most often skipped.",
    keyIngredients: [
      { name: "Zinc Oxide 20%, non-nano", note: "Broad-spectrum UVA and UVB cover in one mineral filter" },
      { name: "Iron Oxides", note: "A universal tint that offsets white cast and screens visible light" },
      { name: "Niacinamide", note: "Keeps the base from feeling tight through the day" },
    ],
    inci:
      "Aqua, Zinc Oxide, Caprylic/Capric Triglyceride, Glycerin, Niacinamide, Dimethicone, Silica, Iron Oxides (CI 77491, CI 77492, CI 77499), Polyglyceryl-3 Polyricinoleate, Tocopherol, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin.",
    howToUse:
      "Every morning as the final step, rain or shine. Two fingers' length for face and neck. Reapply every two hours in direct sun.",
    swatch: ["#f7f3e9", "#a08a58"],
    skinTypes: "All skin types, including sensitive and post-procedure",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY.toUpperCase(),
  }).format(cents / 100);
}
