"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { Wordmark } from "@/components/wordmark";

const NAV = [
  { href: "/products", label: "The Six" },
  { href: "/about", label: "Approach" },
];

export function SiteHeader() {
  const { count, ready } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Six, home" className="text-ink">
          <Wordmark className="h-11 w-auto" title="Six" />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-ink underline underline-offset-4"
                    : "text-ink-soft transition-colors hover:text-ink"
                }
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/cart"
            className="text-ink-soft transition-colors hover:text-ink"
          >
            Bag
            {/* Render the count only after hydration, or server and client
                markup disagree and React logs a mismatch. */}
            <span className="tabular-nums">
              {ready && count > 0 ? ` (${count})` : ""}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
