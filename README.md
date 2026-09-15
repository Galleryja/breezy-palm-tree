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
