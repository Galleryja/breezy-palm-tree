"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";

export function AddToCart({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    add(slug, 1);
    setJustAdded(true);
    // Revert the label so repeat adds still feel responsive.
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-accent ${className}`}
    >
      {justAdded ? "Added to bag" : "Add to bag"}
      <span aria-live="polite" className="sr-only">
        {justAdded ? "Added to bag" : ""}
      </span>
    </button>
  );
}
