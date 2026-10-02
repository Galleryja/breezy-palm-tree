import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { postsByDate, formatPostDate, PUBLISHED } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "What the materials in our range actually are, where they come from, and where the category tends to be wrong about them.",
};

export default function JournalPage() {
  if (!PUBLISHED) notFound();
  const posts = postsByDate();

  return (
    <div className="wrap py-16">
      <article className="measure">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
          Journal
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
          Notes on the Materials
        </h1>
        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Longer pieces about what goes into the range — what a material is,
          where it comes from, how it behaves, and where the category tends to
          overstate it.
        </p>

        <div className="mt-12 space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="rule block pt-8 group"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                {formatPostDate(post.date)} · {post.readingMinutes} min
              </p>
              <h2 className="mt-2 font-serif text-2xl text-ink group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">
                {post.standfirst}
              </p>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
