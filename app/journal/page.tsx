import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { posts } from '@/content/journal';

export const metadata = {
  title: 'Journal',
  description: 'Essays and reflections on learning design, AI, and building.',
};

export default function JournalIndex() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <PageHeader
        eyebrow="05 / Journal"
        title="Learning Journal"
        description="Slow notes on learning design, AI, and building things at the edges of disciplines."
      />
      <div className="container-prose pb-24">
        <ul className="divide-y divide-hairline border-t border-hairline">
          {sorted.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/journal/${p.slug}`}
                className="group flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:gap-10"
              >
                <p className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
                  {new Date(p.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </p>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl leading-tight text-fg transition-colors group-hover:text-fg md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-dim">
                    <span>{p.readingMinutes} min read</span>
                    {p.tags.map((t) => (
                      <span key={t} className="text-fg0">
                        · {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
