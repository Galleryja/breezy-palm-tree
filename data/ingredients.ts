/**
 * Ingredient reference.
 *
 * These entries describe the RAW MATERIALS, not the finished products, and
 * that distinction is the whole point of the file. Keep to it:
 *
 *   - Say what a material is made of, what it has traditionally been used
 *     for, and what laboratory or published work reports about it.
 *   - Never say or imply that a Six product does any of those things.
 *   - Never name a disease or condition — no eczema, acne, inflammation,
 *     psoriasis, rosacea, dermatitis, wound healing. A cosmetic that claims
 *     to act on a condition is a drug in the FDA's reading, whichever way the
 *     sentence is arranged.
 *   - Prefer appearance and feel: "looking", "feels", "leaves skin soft".
 *
 * Safe verbs: is, contains, exhibits, has been studied for, is reported to,
 * has traditionally been used for, is documented as.
 *
 * Unsafe verbs, whatever follows them: treats, heals, cures, prevents,
 * repairs, reduces (a condition), fights, combats, soothes (irritation),
 * calms (skin).
 *
 * This page lives apart from the product pages on purpose. Regulators read
 * labelling as a whole, so the same sentence carries more risk printed beside
 * an Add to Bag button than it does in a reference list.
 */

export type IngredientKind = "base" | "oil";

export type Ingredient = {
  slug: string;
  /** Common name, as it appears in the ingredient lists. */
  name: string;
  /** Botanical or source name, italicised on the page. */
  source: string;
  kind: IngredientKind;
  /** Which blends it appears in. Empty for the shared base materials. */
  usedIn: string[];
  /** What the material is, compositionally. */
  composition: string;
  /**
   * What is documented about it. Each line stands on its own and is phrased
   * as a property of the material.
   */
  properties: string[];
  /**
   * An honest correction where the category routinely overstates something.
   * Optional, and more valuable than another bullet when it applies.
   */
  caveat?: string;
};

export const INGREDIENTS: Ingredient[] = [
  {
    slug: "tallow",
    name: "Grass-fed beef tallow",
    source: "Bos taurus",
    kind: "base",
    usedIn: [],
    composition:
      "Rendered beef fat, made up mainly of oleic, palmitic and stearic acids, with smaller amounts of conjugated linoleic acid and palmitoleic acid.",
    properties: [
      "Its fatty acid profile is close to that of human sebum, which is the usual explanation offered for how readily it absorbs.",
      "It is occlusive: it forms a layer that slows the rate at which water leaves the skin's surface.",
      "Grass-fed tallow carries the fat-soluble vitamins A, D, E and K, which come from the animal's diet.",
      "It has been used as a topical preparation for centuries across many cultures, long predating modern emulsified lotions.",
    ],
    caveat:
      "Vitamin content varies considerably with the animal's diet and with how the fat was rendered. Grass-fed tallow carries more than grain-fed, but no batch should be treated as a standardised source of any vitamin.",
  },
  {
    slug: "shea-butter",
    name: "Organic shea butter",
    source: "Butyrospermum parkii",
    kind: "base",
    usedIn: [],
    composition:
      "Fat pressed from the nut of the shea tree, chiefly oleic and stearic acids, with an unusually large unsaponifiable fraction of triterpenes and tocopherols.",
    properties: [
      "It holds one of the higher unsaponifiable fractions of any plant butter — the portion that does not convert to soap, and where much of its emollient character sits.",
      "It contains naturally occurring tocopherols, the vitamin E family.",
      "It is solid at room temperature and softens at skin temperature, which is what gives a whipped balm its body.",
      "It has been prepared and used topically in West Africa for centuries.",
    ],
  },
  {
    slug: "jojoba",
    name: "Organic jojoba oil",
    source: "Simmondsia chinensis",
    kind: "base",
    usedIn: [],
    composition:
      "A liquid wax rather than a triglyceride oil, composed almost entirely of long-chain wax esters. Native to the Sonoran Desert.",
    properties: [
      "Its wax esters resemble those in human sebum more closely than any other plant material in common use.",
      "Being a wax rather than an oil, it is markedly resistant to oxidation, so it keeps far longer than most plant oils before turning.",
      "It is light in feel and is widely used to lighten heavier butters and fats without diluting their occlusive effect.",
    ],
  },
  {
    slug: "jasmine",
    name: "Organic jasmine absolute",
    source: "Jasminum grandiflorum",
    kind: "oil",
    usedIn: ["Jasmine, Vanilla & Ylang Ylang"],
    composition:
      "An absolute rather than a distilled oil, rich in benzyl acetate, benzyl benzoate, linalool and indole.",
    properties: [
      "It has been valued in perfumery and in traditional preparation for centuries.",
      "Its heavier aromatic molecules evaporate slowly, which is why a jasmine note persists on skin for hours rather than minutes.",
    ],
    caveat:
      "Jasmine is a fragrance material first. Its documented work is aromatic rather than topical, and it is listed here for what it does to a blend rather than for anything it does to skin.",
  },
  {
    slug: "ylang-ylang",
    name: "Organic ylang ylang oil",
    source: "Cananga odorata",
    kind: "oil",
    usedIn: ["Jasmine, Vanilla & Ylang Ylang"],
    composition:
      "Steam-distilled from the flowers. Contains linalool, geranyl acetate, benzyl benzoate and caryophyllene.",
    properties: [
      "It has traditionally been used in hair and skin preparations across Southeast Asia.",
      "Small human studies of inhaled ylang ylang have measured lowered blood pressure and heart rate in participants.",
    ],
    caveat:
      "Those measurements come from inhalation studies of the isolated oil, not from wearing a balm that contains it. Ylang ylang is also a recognised fragrance sensitiser, which is why its allergen components are published on every product that contains it.",
  },
  {
    slug: "vanilla",
    name: "Organic vanilla CO2 extract",
    source: "Vanilla planifolia",
    kind: "oil",
    usedIn: ["Jasmine, Vanilla & Ylang Ylang"],
    composition:
      "Extracted from cured beans with supercritical carbon dioxide, a solvent-free method that leaves no residue. Its principal aromatic compound is vanillin.",
    properties: [
      "Vanillin exhibits antioxidant activity in laboratory testing.",
      "That activity is most usefully understood as a formulation property: antioxidants slow the oxidation of the oils around them, which is how an oil-based product stays fresh.",
    ],
  },
  {
    slug: "frankincense",
    name: "Organic frankincense oil",
    source: "Boswellia carterii",
    kind: "oil",
    usedIn: ["Frankincense & Myrrh"],
    composition:
      "Steam-distilled from the tree's resin. The distilled oil is mainly monoterpenes — alpha-pinene and limonene among them.",
    properties: [
      "It has been traded, burned and used in preparation for at least four thousand years.",
      "It has long been used in traditional skincare for smooth, radiant-looking skin.",
    ],
    caveat:
      "Worth knowing, because the category gets this wrong constantly: boswellic acids, the compounds behind almost all published frankincense research, are non-volatile. They stay in the resin and do not carry over into the steam-distilled essential oil in meaningful amounts. Any claim that rests on boswellic acids does not apply to frankincense oil.",
  },
  {
    slug: "myrrh",
    name: "Organic myrrh oil",
    source: "Commiphora myrrha",
    kind: "oil",
    usedIn: ["Frankincense & Myrrh"],
    composition:
      "Steam-distilled from the resin. Rich in sesquiterpenes, chiefly furanoeudesma-1,3-diene and curzerene.",
    properties: [
      "It was among the most valued materials of ancient Egyptian and Middle Eastern preparation, and was traded alongside frankincense.",
      "Laboratory studies report antimicrobial activity for its sesquiterpene fraction.",
      "Its heavy sesquiterpenes evaporate slowly, which is why myrrh gives a blend weight and a long finish.",
    ],
    caveat:
      "Antimicrobial activity measured in a dish is not a preservative system, and it is not a claim about skin. It is reported here as a property of the material.",
  },
  {
    slug: "neroli",
    name: "Organic neroli oil",
    source: "Citrus aurantium amara, flower",
    kind: "oil",
    usedIn: ["Neroli & Petitgrain"],
    composition:
      "Steam-distilled from bitter orange blossom. Contains linalool, linalyl acetate, limonene and nerolidol.",
    properties: [
      "It has long been favoured in preparation for mature skin.",
      "It contains naturally occurring antioxidant compounds.",
      "It carries no furocoumarins, so unlike oils pressed from citrus peel it does not make skin sensitive to sunlight.",
    ],
  },
  {
    slug: "petitgrain",
    name: "Organic petitgrain oil",
    source: "Citrus aurantium amara, leaf",
    kind: "oil",
    usedIn: ["Neroli & Petitgrain"],
    composition:
      "Steam-distilled from the leaves and twigs of the same tree that gives neroli. Chiefly linalyl acetate and linalool.",
    properties: [
      "It has traditionally been used for clear, balanced-looking skin.",
      "Like neroli, it is free of furocoumarins and is not phototoxic.",
      "It is a fraction of the cost of neroli and shares much of its character, which is why the two are so often distilled and blended together.",
    ],
  },
  {
    slug: "cedarwood",
    name: "Organic cedarwood oil",
    source: "Cedrus atlantica",
    kind: "oil",
    usedIn: ["Cedarwood & Vetiver"],
    composition:
      "Steam-distilled from the wood. Composed largely of sesquiterpenes including himachalenes and atlantones.",
    properties: [
      "It has been used in perfumery and in the preservation of materials since antiquity.",
      "Its sesquiterpenes are heavy and slow to evaporate, which is what makes cedarwood read as dry and persistent rather than bright.",
    ],
  },
  {
    slug: "vetiver",
    name: "Organic vetiver oil",
    source: "Chrysopogon zizanioides",
    kind: "oil",
    usedIn: ["Cedarwood & Vetiver"],
    composition:
      "Distilled from the roots of a grass grown as much for the way its roots bind soil as for its oil. One of the most sesquiterpene-rich essential oils there is.",
    properties: [
      "Its very high sesquiterpene content makes it a fixative: it slows the evaporation of lighter materials blended with it, so the whole blend lasts longer.",
      "It has been used in traditional preparation across India and Southeast Asia for centuries.",
    ],
  },
];

export function ingredientsByKind(kind: IngredientKind): Ingredient[] {
  return INGREDIENTS.filter((i) => i.kind === kind);
}
