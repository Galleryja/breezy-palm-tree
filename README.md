# SIX

Storefront for SIX Skincare — a six-product range sold as one routine.

Next.js 15 (App Router, **webpack**), TypeScript, Tailwind v4, and Stripe
Checkout. No database, no CMS, no Shopify subscription.

## Getting started

### In a Codespace

Open the repo in a Codespace. `.devcontainer/devcontainer.json` runs
`npm install` on create, so all you type is:

```bash
npm run dev
```

Port 3000 is forwarded automatically and VS Code opens it. If you miss the
prompt, use the **PORTS** tab.

Forwarded ports are private by default. To show someone, right-click the port
→ Port Visibility → Public.

### Locally

```bash
npm install
npm run dev   # http://localhost:3000
```

The site runs without a Stripe key — browse, add to bag, everything works.
Only the Checkout button needs one, and it returns a clear message until you
add it.

## Environment

Copy `.env.example` to `.env.local` when you are ready to test payments.

| Variable | Required | Notes |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | for checkout | Test keys start `sk_test_`. [Dashboard →](https://dashboard.stripe.com/test/apikeys) |
| `NEXT_PUBLIC_SITE_URL` | production only | Leave unset in development — see below |

**Leave `NEXT_PUBLIC_SITE_URL` unset while developing.** The checkout route
falls back to the request's own origin, which is right on localhost and right
behind a Codespaces forwarded URL. Hard-coding `http://localhost:3000` is the
usual way to break checkout in a Codespace: Stripe sends shoppers back to an
address their browser cannot reach.

`.env.local` is gitignored. Never commit a live key.

Test the checkout flow with Stripe's test card `4242 4242 4242 4242`, any
future expiry, any CVC.

## How it fits together

```
data/products.ts        The catalogue. Single source of truth for what is
                        sold and at what price. Edit this to change the range.

app/api/checkout/       Builds a Stripe Checkout Session. Reads prices from
                        the catalogue, never from the request body.

components/cart-*.tsx   Cart state in localStorage. Stores slug + quantity
                        only; prices are re-read from the catalogue.
```

**Money never comes from the client.** The browser posts `{slug, quantity}`
and nothing else. The server looks up the price. A tampered request cannot
change what is charged.

## Editing the range

Everything shopper-facing lives in `data/products.ts` — name, price, size,
copy, key ingredients, full INCI, how-to-use, and the two swatch colours that
generate the artwork. Add or remove an entry and the homepage, listing page,
static routes and cart all follow. Bump `MAX_LINES` in
`app/api/checkout/route.ts` if the range grows past six.

Prices are integers in cents. `2800` is $28.00. Never use floats for money.

## Product photography

There is none yet. `components/product-art.tsx` draws a deterministic bottle
from each product's swatch colours as a considered placeholder. When real
photos arrive, replace that one component.

## Jar labels

`design/labels/` holds print artwork for the 120 ml Eris Jar, generated from
this catalogue by `scripts/make-labels.py`. See the README in that folder —
three things (lid diameter, net weight, business address) have to be settled
before anything goes to a printer.

## Launch timeline

`docs/launch-timeline.md` sets out what has to happen, in what order, to
get from here to a jar someone has paid for.

## Commands

```bash
npm run dev        # webpack dev server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

## Notes on the setup

- **Turbopack is deliberately off.** `dev` and `build` use webpack. Do not add
  `--turbopack`.
- Next is pinned to `15.5.x`. Next 16 makes Turbopack the default; upgrading
  means opting back out every release.
- `postcss` and `sharp` are pinned via `overrides` in `package.json` to clear
  advisories that would otherwise only be fixable by moving to Next 16. Check
  `npm audit` before removing them.
- Most components are Server Components. Client components are limited to the
  cart, the header's bag count and the add-to-bag button, which keeps the
  bundle — and webpack's memory use — small.

## Not built yet

Order emails beyond Stripe's receipt, inventory tracking, discount codes,
customer accounts, and a real shipping-rate table (Stripe currently collects
addresses for US/CA/GB with no rates attached).

Four blend descriptions and the eight ingredient notes are the owner's copy.
The four **roller** descriptions are still placeholder text written during the
build and should be replaced before launch.

## Parked: the six-step routine

An idea worth keeping, not currently built. The range today is four blends in
two formats; this would be a second line alongside it.

One product per step of a routine, and nothing spare:

| Step | Product | Indicative price |
| --- | --- | --- |
| 1 | Clarifying gel cleanser, 150ml | $28 |
| 2 | Hydrating essence, 120ml | $34 |
| 3 | Vitamin C serum 12% | $58 |
| 4 | Niacinamide serum 10% | $42 |
| 5 | Barrier repair moisturiser, 50ml | $46 |
| 6 | Mineral sunscreen SPF 50, 50ml | $38 |

The argument: most shelves hold a dozen products and half were bought to fix a
problem another one caused. Six things consistently hold up — cleanse without
stripping, hydrate, a morning antioxidant, something for tone and oil balance,
repair the barrier, wear sunscreen daily. Everything past that is refinement.
So make those six, at concentrations with evidence behind them, and stop.

Three things to know before picking it up again:

- **It is a different business.** Formulating actives is not whipping tallow.
  Vitamin C in particular is unstable and needs real shelf-life testing — a
  contract manufacturer, not a kitchen.
- **The site would need grouping, not rebuilding.** `Format` in
  `data/products.ts` is `"balm" | "roller"`; a routine would add its own
  values and the listing page would group by them the way it groups balms and
  rollers now. An hour or two, not a rewrite.
- **"Six" is the brand, not a count.** The copy was deliberately stripped of
  counting so the range can change without contradicting itself. Do not put it
  back.

## Parked: essential oil usage levels

A line was drafted for the approach page saying every essential oil is kept
within the usage levels recommended for leave-on skincare, then removed
because it had not been checked against the formulas. It is the most specific
and most persuasive trust claim available here, and almost nobody at this
scale makes it. IFRA publishes the rates and they are free to look up. Jasmine
absolute and ylang ylang carry the lowest ceilings in this range, so check
those first. If the formulas are within them, put the line back.
