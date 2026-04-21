import { PageHeader } from '@/components/PageHeader';
import { research } from '@/content/research';
import { publications } from '@/content/publications';

export const metadata = {
  title: 'Research & Publications',
  description:
    'Research positions at Harvard GSE, Tsinghua-SIGS, and UsingAI, plus ten publications across computer vision, operations research, and analytics.',
};

export default function ResearchPage() {
  const byYear = publications.reduce<Record<number, typeof publications>>(
    (acc, p) => {
      acc[p.year] ||= [];
      acc[p.year].push(p);
      return acc;
    },
    {},
  );
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <PageHeader
        eyebrow="04 / Research"
        title="Research & Publications"
        description="Research labs, projects, and ten publications spanning deep learning, operations research, and data-driven analytics for behavior and finance."
      />

      <section className="container-prose pb-8">
        {research.map((r) => (
          <article
            key={r.id}
            id={r.id}
            className="grid grid-cols-1 gap-6 border-t border-ink-700 py-10 md:grid-cols-[200px_1fr] md:gap-10"
          >
            <div className="space-y-2 md:sticky md:top-24 md:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-400">
                {r.period}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-300">
                {r.role}
              </p>
              <p className="font-mono text-[11px] text-ink-500">{r.location}</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl leading-tight text-ink-50 md:text-3xl">
                {r.lab}
              </h3>
              <ul className="mt-6 space-y-2.5">
                {r.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-relaxed text-ink-300"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-ink-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink-700 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="publications" className="container-prose pb-24 pt-12">
        <div className="mb-10">
          <p className="section-eyebrow">Publications · {publications.length}</p>
          <h2 className="section-title mt-3">Selected writings & papers</h2>
        </div>

        {years.map((y) => (
          <div key={y} className="border-t border-ink-700 py-8">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-400">
              {y}
            </p>
            <ol className="space-y-6">
              {byYear[y].map((p) => (
                <li key={p.id} className="grid grid-cols-[36px_1fr] gap-4">
                  <span className="pt-1 font-mono text-[11px] text-ink-500">
                    [{p.id}]
                  </span>
                  <div>
                    <p className="font-serif text-lg leading-snug text-ink-50">
                      {p.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-400">{p.authors}</p>
                    {p.venue ? (
                      <p className="mt-1 font-mono text-[11px] text-ink-500">
                        {p.venue}
                      </p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-ink-700 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </>
  );
}
