import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-deep">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <Wordmark className="h-12 w-auto text-ink" title="Six" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            Whipped grass-fed tallow and perfume oil, made in small batches
            and kept to a short list.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium text-ink">Shop</p>
          <ul className="space-y-2 text-ink-soft">
            <li>
              <Link href="/products" className="hover:text-ink">
                The full range
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-ink">
                Your bag
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium text-ink">Company</p>
          <ul className="space-y-2 text-ink-soft">
            <li>
              <Link href="/about" className="hover:text-ink">
                Our approach
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap rule flex flex-col gap-2 py-6 text-xs text-ink-faint sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Six Skincare Products LLC.</p>
        <p>Cosmetic products. Not intended to diagnose or treat any condition.</p>
      </div>
    </footer>
  );
}
