import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POLICIES, getPolicy, type PolicyBlock } from "@/data/policies";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const policy = getPolicy((await params).slug);
  if (!policy) return {};
  return { title: policy.title, description: policy.summary };
}

function Block({ block }: { block: PolicyBlock }) {
  if (block.kind === "h2") {
    return (
      <h2 className="rule mt-10 pt-8 font-serif text-xl text-ink">
        {block.text}
      </h2>
    );
  }
  if (block.kind === "list") {
    return (
      <ul className="mt-4 space-y-2">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent"
            />
            <span className="text-base leading-relaxed text-ink-soft">
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-4 text-base leading-relaxed text-ink-soft">{block.text}</p>
  );
}

export default async function PolicyPage({ params }: Params) {
  const policy = getPolicy((await params).slug);
  if (!policy) notFound();

  return (
    <div className="wrap py-16">
      <article className="measure">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-faint">
          Policies
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
          {policy.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {policy.summary}
        </p>

        <div className="mt-6">
          {policy.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <nav className="rule mt-14 flex flex-wrap gap-x-6 gap-y-2 pt-8 text-sm">
          {POLICIES.filter((p) => p.slug !== policy.slug).map((p) => (
            <Link
              key={p.slug}
              href={`/policies/${p.slug}`}
              className="text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
            >
              {p.title}
            </Link>
          ))}
        </nav>
      </article>
    </div>
  );
}
