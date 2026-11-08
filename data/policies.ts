/**
 * Policies, and the business facts behind them.
 *
 * The constants at the top are the single source of truth. The checkout route
 * reads them to build Stripe's shipping options, and the shipping policy page
 * reads them to tell shoppers what they will pay. Change a number here and
 * both follow, so the page can never promise a rate the checkout does not
 * charge.
 *
 * These pages are written to describe what this site actually does — what is
 * collected, who it goes to, what happens on a return. They are a starting
 * point put together by looking at the code, not legal advice, and the places
 * that need a decision or a lawyer are marked in the README.
 */

/** Flat domestic shipping, in cents. */
export const SHIPPING_FLAT_CENTS = 700;

/** Order subtotal at or above which shipping is free, in cents. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;

/**
 * Where we ship. US only to start, deliberately.
 *
 * Selling cosmetics into the UK requires a UK Responsible Person and product
 * notification to the SCPN; Canada requires a Cosmetic Notification Form to
 * Health Canada. Neither is in place, so neither is offered.
 */
export const SHIPS_TO = ["US"] as const;

export const PROCESSING_TIME = "2 to 3 business days";

/** Carrier estimate, in business days. Also handed to Stripe at checkout. */
export const DELIVERY_MIN_DAYS = 3;
export const DELIVERY_MAX_DAYS = 7;
export const DELIVERY_ESTIMATE = `${DELIVERY_MIN_DAYS} to ${DELIVERY_MAX_DAYS} business days`;
export const RETURN_WINDOW_DAYS = 30;

export const CONTACT_EMAIL = "hello@sixskincareproducts.com";
export const BUSINESS_NAME = "Six Skincare Products LLC";
export const BUSINESS_LOCATION = "Cave Creek, Arizona";

export type Policy = {
  slug: string;
  title: string;
  /** Sits under the title; also the page description. */
  summary: string;
  body: PolicyBlock[];
};

export type PolicyBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "list"; items: string[] };

const money = (cents: number) =>
  `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;

export const POLICIES: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping",
    summary: `Flat ${money(SHIPPING_FLAT_CENTS)} within the United States, free over ${money(FREE_SHIPPING_THRESHOLD_CENTS)}.`,
    body: [
      {
        kind: "h2",
        text: "What it costs",
      },
      {
        kind: "list",
        items: [
          `${money(SHIPPING_FLAT_CENTS)} flat rate anywhere in the United States, however much you order.`,
          `Free on orders of ${money(FREE_SHIPPING_THRESHOLD_CENTS)} or more, before tax.`,
        ],
      },
      { kind: "h2", text: "How long it takes" },
      {
        kind: "p",
        text: `Orders are made and packed in ${BUSINESS_LOCATION}, and go out within ${PROCESSING_TIME}. Delivery after that is usually ${DELIVERY_ESTIMATE}. Both are estimates rather than guarantees — once a parcel is with the carrier it is out of our hands.`,
      },
      {
        kind: "p",
        text: "You will get a tracking number by email when the parcel ships.",
      },
      { kind: "h2", text: "Where we ship" },
      {
        kind: "p",
        text: "The United States only, for now. Selling cosmetics into other countries means registering the products with each country's regulator first, and we would rather not ship somewhere until we have done that properly.",
      },
      { kind: "h2", text: "Warm weather" },
      {
        kind: "p",
        text: "A whipped tallow balm is a solid fat. In a hot delivery truck it can soften or melt, and if it does it will set again in a different shape. The balm is unharmed and works exactly as it did — it just will not look whipped any more. Putting the closed jar in the fridge for an hour firms it up. If a jar arrives liquid and you would rather not have it, tell us and we will sort it out.",
      },
      { kind: "h2", text: "If something goes wrong" },
      {
        kind: "p",
        text: `Lost, damaged or never arrived — email ${CONTACT_EMAIL} with your order number and we will replace it or refund it. We would rather fix it than argue about whose fault it was.`,
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns",
    summary: `Unopened items back within ${RETURN_WINDOW_DAYS} days. If something is wrong with your order, that is on us.`,
    body: [
      { kind: "h2", text: "Unopened items" },
      {
        kind: "p",
        text: `Send back anything unopened and unused within ${RETURN_WINDOW_DAYS} days of delivery for a full refund of the item price. Return postage is yours to cover, and the original shipping is not refunded.`,
      },
      { kind: "h2", text: "Opened items" },
      {
        kind: "p",
        text: "We cannot take back an opened jar or roller. This is not meanness about money: a used cosmetic cannot be resold or given to anyone else, so it goes in the bin. Every maker you buy from has the same rule, and the ones who do not are reselling returns.",
      },
      {
        kind: "p",
        text: "Which is a real problem when you cannot smell something before you buy it, so — if a scent is wrong for you, tell us anyway. We would rather hear it than have you quietly not come back.",
      },
      { kind: "h2", text: "If the order is wrong or damaged" },
      {
        kind: "p",
        text: `Different rules entirely. Wrong item, broken jar, a reaction to something — email ${CONTACT_EMAIL} within ${RETURN_WINDOW_DAYS} days with your order number and a photo if there is something to photograph. We refund or replace it, we pay the postage, and you do not need to send the jar back.`,
      },
      { kind: "h2", text: "How to start one" },
      {
        kind: "p",
        text: `Email ${CONTACT_EMAIL} with your order number and what you would like to do. There is no form to fill in. Refunds go back to the card you paid with, usually within a few days of the return arriving.`,
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    summary:
      "What we collect, which is very little, and who else sees it. No tracking, no advertising pixels, no selling anything to anyone.",
    body: [
      {
        kind: "p",
        text: "This page describes what this website actually does, written by looking at what it is built from rather than copied off another shop.",
      },
      { kind: "h2", text: "What the site stores on your device" },
      {
        kind: "p",
        text: "Your bag, and nothing else. It lives in your own browser's storage and holds a list of product names and quantities. It never reaches us until you check out. Clearing your browser data empties it.",
      },
      {
        kind: "p",
        text: "We use Vercel Web Analytics, which counts how many people open each page so we know which ones are actually read. It sets no cookies, it does not follow you to other sites, and it does not identify you — it is a tally, not a profile. Beyond that there are no advertising cookies, no tracking pixels and no third-party ad scripts on these pages.",
      },
      { kind: "h2", text: "What we collect when you buy something" },
      {
        kind: "list",
        items: [
          "Your name, email address and shipping address, so we can send you the thing and tell you it is coming.",
          "Your billing address, which the card networks require.",
          "What you ordered and what you paid.",
        ],
      },
      {
        kind: "p",
        text: "We never see your card number. Payment is handled entirely by Stripe on their own pages; your card details go to them and never touch this website or any computer we control.",
      },
      { kind: "h2", text: "Who else sees it" },
      {
        kind: "list",
        items: [
          "Stripe, who process the payment and hold the order record.",
          "The shipping carrier, who need the address to deliver the parcel.",
          "Vercel, who run the servers this site is served from, and who count the page views described above.",
        ],
      },
      {
        kind: "p",
        text: "That is the whole list. We do not sell, rent or trade customer information, and we do not send it to advertising networks or data brokers.",
      },
      { kind: "h2", text: "How long we keep it" },
      {
        kind: "p",
        text: "Order records are kept as long as tax and accounting rules require. If you ask us to delete everything else, we will.",
      },
      { kind: "h2", text: "Asking us about your own data" },
      {
        kind: "p",
        text: `Email ${CONTACT_EMAIL}. You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted, and we will do it. Depending on where you live you may have a legal right to all three; we would do it anyway.`,
      },
      { kind: "h2", text: "Children" },
      {
        kind: "p",
        text: "This shop is not intended for children under 13 and we do not knowingly collect anything from them.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms",
    summary: "The plain version: who we are, what you are buying, and what it is not.",
    body: [
      { kind: "h2", text: "Who you are buying from" },
      {
        kind: "p",
        text: `${BUSINESS_NAME}, trading as Six, in ${BUSINESS_LOCATION}. Questions go to ${CONTACT_EMAIL}.`,
      },
      { kind: "h2", text: "Orders and prices" },
      {
        kind: "p",
        text: "Prices are in US dollars and shown before tax; tax is added at checkout where it applies. We make things in small batches, so an item can sell out between you adding it to the bag and paying for it. If that happens we will tell you and refund you in full rather than substitute something.",
      },
      {
        kind: "p",
        text: "If a price is listed wrongly through an obvious error, we will contact you before charging you rather than hold you to it or quietly cancel.",
      },
      { kind: "h2", text: "What these products are" },
      {
        kind: "p",
        text: "Cosmetics. They moisturise, they soften, and they smell good. They are not drugs and are not intended to diagnose, treat, cure or prevent any condition. Nothing on this site — including the ingredient reference pages, which describe raw materials rather than our products — should be read as a medical claim or as medical advice.",
      },
      { kind: "h2", text: "Using them" },
      {
        kind: "p",
        text: "For external use only. Essential oils are potent and some people react to them, so patch test on a small area before first use, keep the products away from your eyes, and stop using anything that leaves your skin uncomfortable. The naturally occurring fragrance allergens in each blend are published on its product page before you buy, and every material we use is set out on the ingredients page. If you are pregnant, breastfeeding or have a known fragrance allergy, read those pages first.",
      },
      { kind: "h2", text: "Returns and shipping" },
      {
        kind: "p",
        text: "Covered on their own pages, and those terms form part of these.",
      },
      { kind: "h2", text: "Our content" },
      {
        kind: "p",
        text: "The writing, photographs and artwork on this site are ours. The ingredient and journal pages are there to be read and quoted with credit; please do not lift them wholesale onto another shop.",
      },
      { kind: "h2", text: "Liability" },
      {
        kind: "p",
        text: "We stand behind what we make, and if a product is faulty or an order is wrong we will put it right. Beyond that, our liability for any order is limited to what you paid for it. Nothing here limits anything that cannot legally be limited.",
      },
      { kind: "h2", text: "Which law applies" },
      {
        kind: "p",
        text: "Arizona law, and the courts of Arizona.",
      },
      { kind: "h2", text: "Changes" },
      {
        kind: "p",
        text: "If we change these terms, the version in force for your order is the one published when you placed it.",
      },
    ],
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return POLICIES.find((p) => p.slug === slug);
}

/** Shipping in cents for a given subtotal, after the free-shipping threshold. */
export function shippingForSubtotal(subtotalCents: number): number {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
    ? 0
    : SHIPPING_FLAT_CENTS;
}
