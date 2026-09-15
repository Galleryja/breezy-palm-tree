"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

/**
 * Empties the bag once the order is confirmed paid. Rendered only on the
 * success page, and only when Stripe reported the session as paid — so a
 * shopper who abandons checkout keeps their bag.
 */
export function ClearCartOnMount() {
  const { clear, ready } = useCart();

  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);

  return null;
}
