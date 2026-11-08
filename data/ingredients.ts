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
      "Dry rendered grass-fed beef suet, made up mainly of oleic, palmitic and stearic acids, with smaller amounts of conjugated linoleic acid and palmitoleic acid.",
    properties: [
      "Its fatty acid profile is close to that of human sebum, which is the usual explanation offered for how readily it absorbs.",
      "It is occlusive: it forms a layer that slows the rate at which water leaves the skin's surface.",
      "Grass-fed tallow carries the fat-soluble vitamins A, D, E and K, which come from the animal's diet.",
      "It has been used as a topical preparation for centuries across many cultures, long predating modern lotions.",
    ],
    caveat:
      "Vitamin content varies considerably with the animal's diet and with how the fat was rendered. Grass-fed tallow carries more than grain-fed, but no batch should be treated as a standardised source of any vitamin.",
  },
  {
    slug: "mango-butter",
    name: "Organic mango butter",
    source: "Mangifera indica",
    kind: "base",
    usedIn: [],
    composition:
      "Oils pressed from the mango stone — the part nobody eats. Chiefly oleic and stearic acids, with naturally occurring tocopherols.",
    properties: [
      "It is solid at room temperature and softens at skin temperature, which is what gives a whipped balm its body.",
      "It contains naturally occurring tocopherols, the vitamin E family.",
      "Published work puts it forward as a substitute for cocoa butter in cosmetic formulation, on the strength of that fatty acid profile.",
      "It carries polyphenols and catechins, and has traditionally been used in preparations for firm, smooth-looking skin and where skin felt uncomfortable.",
      "It carries almost no smell of its own. Unrefined shea has a distinct nutty, faintly smoky scent that competes with a delicate blend; mango butter leaves the essential oils to do the talking.",
      "It is silky, and absorbs without the drag that heavier butters can leave, while still providing rich nourishment.",
      "Mango belongs to the Anacardiaceae family, alongside cashew and pistachio. The butter comes from the kernel rather than the skin and reactions are rare, but patch test first if you have a known cashew or pistachio allergy.",
    ],
    caveat:
      "Vitamin C, fibre and beta carotene belong to the mango, not to a fat pressed from its stone, so treat any list of those as being about the fruit. You will also see mango butter credited with sun protection, on the strength of a study that treated wool rather than skin. Nothing here is a sunscreen.",
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
      "It is silky and light, absorbing easily and maintaining hydration, and is widely used to lighten heavier butters and fats without diluting their occlusive effect.",
      "Traditional use has been to provide moisture. It carries antioxidants and has been used in preparations for supple, comfortable-looking skin, and it contains vitamin E, which helps skin maintain moisture and leaves it feeling softer.",
    ],
  },
  {
    slug: "squalane",
    name: "Squalane",
    source: "Olea europaea, hydrogenated",
    kind: "base",
    usedIn: [],
    composition:
      "A single saturated hydrocarbon. Ours is made from olives: squalene is isolated from the oil and hydrogenated to squalane, which is the stable form of the same molecule.",
    properties: [
      "Squalene — the unsaturated version — is already present in human sebum, where it makes up roughly a tenth of what skin puts out on its own.",
      "Saturating it removes the double bonds that make squalene go off. Squalane is among the most oxidation-resistant materials in cosmetics and will outlast everything else in the jar.",
      "It is remarkably light and dry to the touch, which is what lets it take the weight out of butters without diluting what they do.",
      "Traditionally used for deep hydration and for protection against environmental stressors, and it is non-comedogenic. It has also been used on skin that felt uncomfortable, and in preparations for smooth, unlined-looking skin.",
    ],
    caveat:
      "Worth saying plainly, because the industry spent decades not saying it: squalane was historically rendered from shark liver, and some still is. Ours is from olives. If a brand does not tell you which, it is worth asking.",
  },
  {
    slug: "jasmine",
    name: "Organic jasmine absolute",
    source: "Jasminum grandiflorum",
    kind: "oil",
    usedIn: ["Floral Jasmine"],
    composition:
      "An absolute rather than a distilled oil, rich in benzyl acetate, benzyl benzoate, linalool and indole.",
    properties: [
      "It has been valued in perfumery and in traditional preparation for centuries, with a long documented history in Ayurvedic and traditional Chinese use.",
      "It cannot be steam-distilled — heat destroys the scent — so it is solvent-extracted to a concrete and then to an absolute. That is why it is an absolute and why it costs what it does.",
      "The flowers are picked before dawn, when their scent is strongest.",
      "Its heavier aromatic molecules evaporate slowly, which is why a jasmine note persists on skin for hours rather than minutes.",
    ],
    caveat:
      "Jasmine is a fragrance material first. Its documented work is aromatic rather than topical, and it is listed here for what it does to a blend rather than for anything it does to skin. It is also a recognised fragrance sensitiser, which is why its allergen components are published on every product containing it and why we say to patch test.",
  },
  {
    slug: "vanilla",
    name: "Organic vanilla CO2 extract",
    source: "Vanilla planifolia",
    kind: "oil",
    usedIn: ["Floral Jasmine"],
    composition:
      "Vanilla is an orchid, native to Mexico and Central America. Extracted from cured beans with supercritical carbon dioxide, a solvent-free method that leaves no residue. Its principal aromatic compound is vanillin, with eugenol and piperonal underneath it.",
    properties: [
      "It was first cultivated by the Totonac people of what is now Veracruz, and later taken up by the Aztecs.",
      "The flower opens for about a day and is pollinated in the wild by a single kind of bee that lives only in Mexico. Everywhere else, every flower is pollinated by hand — a technique worked out in 1841 by Edmond Albius, a twelve-year-old boy enslaved on Réunion, and still the method used today. It is the reason vanilla can be grown at all outside Mexico.",
      "It is the second most expensive spice in the world, after saffron, and the hand-pollination is most of why.",
      "Vanilla will not steam-distil — the beans do not give up their aromatics to steam — so it has to be extracted another way.",
      "The CO2 extract is thick and close to solid at room temperature, and has to be warmed before it will blend.",
      "Vanillin exhibits antioxidant activity in laboratory testing.",
      "That activity is most usefully understood as a formulation property: antioxidants slow the oxidation of the oils around them, which is how an oil-based product stays fresh.",
      "Traditionally used for its antioxidant and stress-soothing character, and for supporting skin against free radicals.",
    ],
    caveat:
      "Vanilla's long history is as a fragrance. Worth knowing when comparing suppliers: most vanilla sold for perfumery is an oleoresin, pulled out of the bean with ethanol. This is the CO2 extract, which uses no solvent at all. They are different materials at different prices, and most of what is written about vanilla describes the oleoresin.",
  },
  {
    slug: "ylang-ylang",
    name: "Organic ylang ylang oil",
    source: "Cananga odorata",
    kind: "oil",
    usedIn: ["Floral Jasmine"],
    composition:
      "Steam-distilled from the flowers. Contains linalool, geranyl acetate, benzyl benzoate and caryophyllene.",
    properties: [
      "It has traditionally been used in skin preparations across Southeast Asia.",
      "Small human studies of inhaled ylang ylang have measured lowered blood pressure and heart rate in participants.",
    ],
    caveat:
      "Those measurements come from inhalation studies of the isolated oil, not from wearing a balm that contains it. Ylang ylang is also a recognised fragrance sensitiser, which is why its allergen components are published on every product that contains it.",
  },
  {
    slug: "frankincense",
    name: "Organic frankincense oil",
    source: "Boswellia carterii",
    kind: "oil",
    usedIn: ["Suede"],
    composition:
      "Steam-distilled from the gum resin of Boswellia trees, which grow in Oman, Yemen and Somalia. Also sold as olibanum. The distilled oil is mainly monoterpenes — alpha-pinene and limonene among them.",
    properties: [
      "It has been used on skin for at least four thousand years, ground into the perfumed unguents and salves that Egyptian and Arabian cosmetic practice was built on.",
      "It smells rich, warm and woody, with citrus at the top and something faintly spicy under it.",
      "It has long been used in traditional skincare for smooth, radiant-looking skin, and in preparations for firm, supple-looking skin and where skin felt uncomfortable. In aromatherapy it is associated with grounding and with easing a busy mind.",
      "Being rich in monoterpenes, it oxidises over time, and oxidised monoterpenes are more sensitising than fresh ones. This is the reason for the storage advice on the jar rather than a formality.",
      "Like any essential oil it can disagree with some people. Patch test first, and stop using anything that leaves skin uncomfortable.",
    ],
    caveat:
      "Worth knowing, because the category gets this wrong constantly: boswellic acids, the compounds behind almost all published frankincense research, are non-volatile. They stay in the resin and do not carry over into the steam-distilled essential oil in meaningful amounts. Any claim that rests on boswellic acids does not apply to frankincense oil.",
  },
  {
    slug: "myrrh",
    name: "Organic myrrh oil",
    source: "Commiphora myrrha",
    kind: "oil",
    usedIn: ["Suede"],
    composition:
      "Steam-distilled from the resin. Rich in sesquiterpenes, chiefly furanoeudesma-1,3-diene and curzerene.",
    properties: [
      "It was among the most valued materials of ancient Egyptian and Middle Eastern skincare, and was blended into salves and perfumed oils alongside frankincense.",
      "Laboratory studies report antimicrobial activity for its sesquiterpene fraction.",
      "Its heavy sesquiterpenes evaporate slowly, which is why myrrh gives a blend weight and a long finish.",
      "It has traditionally been used as an astringent, on dry and weathered skin, and where skin looked uneven in tone. It is also noted for grounding character in aromatherapy.",
      "The oil is thick, dark and nearly solid at room temperature. It has to be warmed before it will pour, let alone blend.",
      "It is conventionally classed as an emmenagogue, and aromatherapy practice is to avoid it during pregnancy and breastfeeding. We pass that on rather than leave anyone to find it elsewhere.",
    ],
    caveat:
      "Antimicrobial activity measured in a dish is not a preservative system, and it is not a claim about skin. It is reported here as a property of the material.",
  },
  {
    slug: "neroli",
    name: "Organic neroli oil",
    source: "Citrus aurantium amara, flower",
    kind: "oil",
    usedIn: ["Balanced Light"],
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
    usedIn: ["Balanced Light"],
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
    usedIn: ["Dry Cedar"],
    composition:
      "Steam-distilled from the wood. Composed largely of sesquiterpenes including himachalenes and atlantones.",
    properties: [
      "It has been used in perfumery since antiquity.",
      "Its sesquiterpenes are heavy and slow to evaporate, which is what makes cedarwood read as dry and persistent rather than bright.",
      "Cedrol, the compound most associated with the smell of cedar, is the one usually named when cedarwood is studied.",
    ],
  },
  {
    slug: "vetiver",
    name: "Organic vetiver oil",
    source: "Chrysopogon zizanioides",
    kind: "oil",
    usedIn: ["Dry Cedar"],
    composition:
      "Distilled from the roots of a grass grown as much for the way its roots bind soil as for its oil. One of the most sesquiterpene-rich essential oils there is.",
    properties: [
      "Its very high sesquiterpene content slows the evaporation of the lighter materials blended with it, so the whole blend lasts longer.",
      "It has been used in traditional preparation across India and Southeast Asia for centuries, and is known in aromatherapy as the oil of tranquillity.",
    ],
  },
];

export function ingredientsByKind(kind: IngredientKind): Ingredient[] {
  return INGREDIENTS.filter((i) => i.kind === kind);
}
