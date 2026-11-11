import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';
import { publications, type Publication } from '@/content/publications';

/**
 * Home-page shortlist. Ids refer to content/publications.ts, so titles,
 * authors, and venues stay in sync with the Papers bookshelf.
 * Order: first-author education paper, then the two award papers.
 * `figure` is a figure from the paper itself, shown as the thumbnail.
 */
const SELECTED: { id: number; figure: string; note?: string }[] = [
  {
    id: 5,
    figure: '/images/papers/makerspace-profiles.jpg',
    note: 'First author',
  },
  { id: 2, figure: '/images/papers/ava-fig2.jpg' },
  { id: 1, figure: '/images/papers/avi-fig2.jpg' },
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

function Entry({
  pub,
  figure,
  note,
}: {
  pub: Publication;
  figure: string;
  note?: string;
}) {
  return (
    <li>
      <Link
        href={`/research#paper-${pub.id}`}
        className="group -mx-3 grid grid-cols-1 gap-x-6 gap-y-4 rounded-2xl px-3 py-5 transition-colors hover:bg-surface-2 sm:grid-cols-[168px_minmax(0,1fr)] md:gap-x-7"
      >
        {/* Figures are drawn on white, so the frame stays white in both themes. */}
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-hairline bg-white">
          <Image
            src={figure}
            alt=""
            fill
            sizes="(min-width: 640px) 168px, 100vw"
            className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {pub.award ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium leading-none text-accent-fg">
                <Award className="h-3.5 w-3.5" strokeWidth={2} />
                {pub.award}
              </span>
            ) : null}
            {note ? <span className="badge-accent">{note}</span> : null}
            <span className="text-[13px] leading-snug text-fg-muted">
              {pub.venue}
            </span>
          </div>

          <h3 className="mt-2.5 text-pretty font-serif text-lg leading-snug text-fg transition-colors group-hover:text-accent md:text-[1.3rem]">
            {pub.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            <Authors authors={pub.authors} />
          </p>
        </div>
      </Link>
    </li>
  );
}

export function SelectedPublications() {
  const items = SELECTED.flatMap(({ id, figure, note }) => {
    const pub = publications.find((p) => p.id === id);
    return pub ? [{ pub, figure, note }] : [];
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
          <Link href="/research/" className="link-pill shrink-0">
            All papers
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>

        <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
          {items.map(({ pub, figure, note }) => (
            <Entry key={pub.id} pub={pub} figure={figure} note={note} />
          ))}
        </ul>
      </div>
    </section>
  );
}
