import Link from 'next/link';
import { publications, type Publication } from '@/content/publications';

/**
 * Home-page shortlist. Ids refer to content/publications.ts, so titles,
 * authors, and venues stay in sync with the Papers bookshelf.
 * Order: first-author education paper, then the two award papers.
 */
const SELECTED: { id: number; note?: string }[] = [
  { id: 5, note: 'First author' },
  { id: 2 },
  { id: 1 },
];

const SELF = 'J. W. Zhang';

/** Author list with Jiawei's own name set in a heavier weight. */
function Authors({ authors }: { authors: string }) {
  const parts = authors.split(SELF);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 ? (
            <span className="font-semibold text-fg">{SELF}</span>
          ) : null}
        </span>
      ))}
    </>
  );
}

function Entry({ pub, note }: { pub: Publication; note?: string }) {
  const badge = pub.award ?? note;
  return (
    <li>
      <Link
        href={`/research#paper-${pub.id}`}
        className="group grid grid-cols-1 gap-x-10 gap-y-2 py-6 md:grid-cols-[minmax(0,1fr)_200px]"
      >
        <div className="min-w-0">
          <h3 className="text-pretty font-serif text-lg leading-snug text-fg md:text-[1.3rem]">
            <span className="bg-gradient-to-r from-gold/70 to-gold/70 bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
              {pub.title}
            </span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            <Authors authors={pub.authors} />
          </p>
        </div>
        <div className="md:text-right">
          {badge ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
              {badge}
            </p>
          ) : null}
          <p className="mt-1 text-[13px] leading-snug text-fg-muted">
            {pub.venue}
          </p>
        </div>
      </Link>
    </li>
  );
}

export function SelectedPublications() {
  const items = SELECTED.flatMap(({ id, note }) => {
    const pub = publications.find((p) => p.id === id);
    return pub ? [{ pub, note }] : [];
  });

  return (
    <section className="border-t border-hairline">
      <div className="container-prose py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Publications</p>
            <h2 className="mt-3 font-serif text-2xl text-fg md:text-3xl">
              Selected papers
            </h2>
          </div>
          <Link
            href="/research/"
            className="link-quiet shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted"
          >
            All papers →
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
          {items.map(({ pub, note }) => (
            <Entry key={pub.id} pub={pub} note={note} />
          ))}
        </ul>
      </div>
    </section>
  );
}
