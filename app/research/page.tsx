import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { research } from '@/content/research';
import {
  publications,
  STATUS_LABEL,
  type Publication,
  type PublicationStatus,
} from '@/content/publications';

export const metadata = {
  title: 'Research & Publications',
  description:
    'Research at Harvard GSE, Tsinghua-SIGS, and UsingAI — including ACM Multimedia 2026 First Prize and IVMSP 2026 Best Paper Runner-Up.',
};

const STATUS_ORDER: PublicationStatus[] = [
  'published',
  'under-review',
  'in-preparation',
  'working-paper',
];

function groupByStatus(items: Publication[]) {
  const map = STATUS_ORDER.reduce(
    (acc, s) => {
      acc[s] = [];
      return acc;
    },
    {} as Record<PublicationStatus, Publication[]>,
  );
  for (const p of items) map[p.status].push(p);
  return STATUS_ORDER.filter((s) => map[s].length > 0).map((s) => ({
    status: s,
    items: map[s],
  }));
}

export default function ResearchPage() {
  const groups = groupByStatus(publications);
  const publishedCount = publications.filter((p) => p.status === 'published').length;
  const awardCount = publications.filter((p) => p.award).length;

  return (
    <>
      <PageHeader
        eyebrow="04 / Research"
        title="Research & Publications"
        description={`Labs, papers, and awards — ${publishedCount} published, with ${awardCount} conference awards, plus manuscripts under review and in preparation.`}
      />

      <section className="container-prose pb-8">
        {research.map((r) => (
          <article
            key={r.id}
            id={r.id}
            className="grid grid-cols-1 gap-6 border-t border-hairline py-10 md:grid-cols-[200px_1fr] md:gap-10"
          >
            <div className="space-y-2 md:sticky md:top-24 md:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
                {r.period}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                {r.role}
              </p>
              <p className="font-mono text-[11px] text-fg-faint">{r.location}</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl leading-tight text-fg md:text-3xl">
                {r.lab}
              </h3>
              <ul className="mt-6 space-y-2.5">
                {r.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-fg-faint" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-muted"
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
          <p className="section-eyebrow">
            Publications · {publications.length}
          </p>
          <h2 className="section-title mt-3">Papers & manuscripts</h2>
        </div>

        {groups.map(({ status, items }) => (
          <div key={status} className="border-t border-hairline py-8">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
              {STATUS_LABEL[status]}
            </p>
            <ol className="space-y-10">
              {items.map((p) => (
                <li key={p.id} className="grid grid-cols-[36px_1fr] gap-4">
                  <span className="pt-1 font-mono text-[11px] text-fg-faint">
                    [{p.id}]
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={
                          status === 'published'
                            ? 'rounded-full border border-gold/50 bg-gold/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg'
                            : 'rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-dim'
                        }
                      >
                        {STATUS_LABEL[status]}
                      </span>
                      {p.award ? (
                        <span className="rounded-full border border-gold/60 bg-gold/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg">
                          {p.award}
                        </span>
                      ) : null}
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint">
                        {p.year}
                      </span>
                    </div>

                    <p className="mt-3 font-serif text-lg leading-snug text-fg md:text-xl">
                      {p.title}
                    </p>
                    <p className="mt-1 text-sm text-fg-dim">{p.authors}</p>
                    {p.venue ? (
                      <p className="mt-1 font-mono text-[11px] leading-relaxed text-fg-faint">
                        {p.venue}
                      </p>
                    ) : null}

                    {(p.pdf || p.awardImage) && (
                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        {p.pdf ? (
                          <a
                            href={p.pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
                          >
                            PDF ↗
                          </a>
                        ) : null}
                        {p.awardImage ? (
                          <a
                            href={p.awardImage}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
                          >
                            Certificate ↗
                          </a>
                        ) : null}
                      </div>
                    )}

                    {p.awardImage ? (
                      <figure className="mt-5 max-w-md overflow-hidden rounded-sm border border-hairline bg-surface-2">
                        <Image
                          src={p.awardImage}
                          alt={`${p.award ?? 'Award'} certificate for ${p.title}`}
                          width={900}
                          height={600}
                          className="h-auto w-full object-cover"
                        />
                        <figcaption className="border-t border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                          {p.award}
                        </figcaption>
                      </figure>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-dim"
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
