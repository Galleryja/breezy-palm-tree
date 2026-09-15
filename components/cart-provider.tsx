"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, getProduct, type Product } from "@/data/products";

/**
 * Cart state lives in localStorage, not a database.
 *
 * We persist only slug + quantity. Prices, names and copy are read back out of
 * the catalogue at render time, which means a price edit takes effect for
 * everyone immediately and a stale cart can never quote an old price. The
 * server re-resolves the same way at checkout, so the numbers below are for
 * display only — they are never trusted as input.
 */

const STORAGE_KEY = "six.cart.v1";
const MAX_QTY = 10;

export type CartLine = { slug: string; quantity: number };

export type ResolvedLine = CartLine & {
  product: Product;
  lineTotalCents: number;
};

type CartContextValue = {
  lines: ResolvedLine[];
  count: number;
  subtotalCents: number;
  /** True until localStorage has been read, so the UI can avoid flashing. */
  ready: boolean;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Drops anything that is not a live product or a sane quantity. */
function sanitize(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: CartLine[] = [];

  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) continue;
    const { slug, quantity } = entry as Record<string, unknown>;
    if (typeof slug !== "string" || seen.has(slug)) continue;
    if (!PRODUCTS.some((p) => p.slug === slug)) continue;

    const qty = Math.floor(Number(quantity));
    if (!Number.isFinite(qty) || qty < 1) continue;

    seen.add(slug);
    out.push({ slug, quantity: Math.min(qty, MAX_QTY) });
  }

  return out;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // Read once on mount. Deliberately not during render: localStorage does not
  // exist on the server and would break hydration.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setLines(sanitize(JSON.parse(stored)));
    } catch {
      // Private mode, disabled storage, or corrupt JSON. An empty cart is the
      // right fallback — never let this take the page down.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Out of quota or blocked. The cart still works for this page view.
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, quantity = 1) => {
    if (!getProduct(slug)) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (!existing) {
        return [...prev, { slug, quantity: Math.min(quantity, MAX_QTY) }];
      }
      return prev.map((l) =>
        l.slug === slug
          ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_QTY) }
          : l,
      );
    });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((prev) =>
      quantity < 1
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) =>
            l.slug === slug
              ? { ...l, quantity: Math.min(quantity, MAX_QTY) }
              : l,
          ),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const resolved: ResolvedLine[] = [];

    for (const line of lines) {
      const product = getProduct(line.slug);
      if (!product) continue; // Product was retired since this cart was saved.
      resolved.push({
        ...line,
        product,
        lineTotalCents: product.priceCents * line.quantity,
      });
    }

    resolved.sort((a, b) => a.product.order - b.product.order);

    return {
      lines: resolved,
      count: resolved.reduce((n, l) => n + l.quantity, 0),
      subtotalCents: resolved.reduce((n, l) => n + l.lineTotalCents, 0),
      ready,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, ready, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
