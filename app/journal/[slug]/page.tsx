import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  POSTS,
  getPost,
  formatPostDate,
  PUBLISHED,
  type Block,
} from "@/data/journal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  if (!PUBLISHED) return [];
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.standfirst };
}

function Body({ block }: { block: Block }) {
  if (block.kind === "h2") {
    return (
      <h2 className="rule mt-12 pt-10 font-serif text-2xl text-ink">
        {block.text}
      </h2>
    );
  }
  if (block.kind === "aside") {
    return (
      <p className="my-8 border-l-2 border-accent pl-5 font-serif text-xl leading-snug text-ink">
        {block.text}
      </p>
    );
  }
  return (
    <p className="mt-5 text-base leading-relaxed text-ink-soft">{block.text}</p>
  );
}

export default async function PostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post || !PUBLISHED) notFound();

  return (
    <div className="wrap py-16">
      <article className="measure">
        <Link
          href="/journal"
          className="text-xs uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-ink"
        >
          ← Journal
        </Link>

        <h1 className="mt-6 font-serif text-4xl leading-tight text-ink">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {post.standfirst}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink-faint">
          {formatPostDate(post.date)} · {post.readingMinutes} min
        </p>

        <div className="mt-10">
          {post.body.map((block, i) => (
            <Body key={i} block={block} />
          ))}
        </div>

        <p className="rule mt-14 pt-10 text-sm leading-relaxed text-ink-faint">
          Every material in the range is set out on the{" "}
          <Link href="/ingredients" className="text-ink underline underline-offset-4">
            ingredients page
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
