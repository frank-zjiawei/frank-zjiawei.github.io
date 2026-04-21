import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '@/content/journal';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function JournalPost({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const paragraphs = post.body.split(/\n\n+/);

  return (
    <article className="container-prose pb-24 pt-16 md:pt-24">
      <Link
        href="/journal"
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400 transition-colors hover:text-ink-50"
      >
        ← Journal
      </Link>

      <header className="mt-10 border-b border-ink-700 pb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          · {post.readingMinutes} min read
        </p>
        <h1 className="mt-6 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] tracking-tightest text-ink-50">
          {post.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink-700 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-300"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert mt-10 max-w-none prose-p:text-ink-200 prose-p:leading-relaxed prose-a:text-ink-50 prose-headings:font-serif prose-headings:text-ink-50">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
