import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap max-w-lg py-24 text-center">
      <h1 className="font-serif text-3xl text-ink">We could not find that</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        The page you were after does not exist. The range is small, so it
        should not take long to find what you wanted.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
      >
        Shop the range
      </Link>
    </section>
  );
}
