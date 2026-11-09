'use client';

import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import clsx from 'clsx';
import {
  publications,
  STATUS_LABEL,
  type Publication,
  type PublicationStatus,
} from '@/content/publications';

const STATUS_ORDER: PublicationStatus[] = [
  'published',
  'under-review',
  'in-preparation',
  'working-paper',
];

const TONE: Record<
  NonNullable<Publication['coverTone']>,
  string
> = {
  ink: 'from-[#1c1917] to-[#44403c]',
  wine: 'from-[#4c1d24] to-[#7f1d1d]',
  forest: 'from-[#1c2e24] to-[#365314]',
  slate: 'from-[#1e293b] to-[#475569]',
  clay: 'from-[#44403c] to-[#a16207]',
  navy: 'from-[#0f172a] to-[#1e3a5f]',
};

function groupByStatus(items: Publication[]) {
  const map = Object.fromEntries(
    STATUS_ORDER.map((s) => [s, [] as Publication[]]),
  ) as Record<PublicationStatus, Publication[]>;
  for (const p of items) map[p.status].push(p);
  return STATUS_ORDER.filter((s) => map[s].length > 0).map((s) => ({
    status: s,
    items: map[s],
  }));
}

function BookCover({
  pub,
  selected,
  onSelect,
}: {
  pub: Publication;
  selected: boolean;
  onSelect: () => void;
}) {
  const tone = TONE[pub.coverTone ?? 'ink'];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={clsx(
        'group relative flex w-full flex-col text-left outline-none transition-transform duration-300',
        selected ? '-translate-y-2' : 'hover:-translate-y-2',
      )}
    >
      <div
        className={clsx(
          'relative aspect-[2/3] w-full overflow-hidden rounded-[2px] border bg-surface-2 shadow-[4px_6px_18px_rgba(0,0,0,0.12)] transition-[box-shadow,border-color] duration-300',
          selected
            ? 'border-gold shadow-[6px_10px_24px_rgba(0,0,0,0.18)]'
            : 'border-hairline group-hover:border-gold/50',
        )}
      >
        {/* spine edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-white/25 via-black/20 to-black/40"
        />

        {pub.cover ? (
          <Image
            src={pub.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 180px, 42vw"
            className="object-cover"
          />
        ) : (
          <div
            className={clsx(
              'flex h-full w-full flex-col justify-between bg-gradient-to-br p-4 text-white',
              tone,
            )}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
              {pub.year}
            </p>
            <p className="font-serif text-[15px] leading-snug tracking-tight">
              {pub.shortTitle}
            </p>
          </div>
        )}

        {/* title overlay on photo covers */}
        {pub.cover ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pb-3 pt-10">
            <p className="font-serif text-[13px] leading-snug text-white md:text-[14px]">
              {pub.shortTitle}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/70">
              {pub.year}
            </p>
          </div>
        ) : null}

        {pub.award ? (
          <span className="absolute right-2 top-2 max-w-[70%] truncate rounded-sm bg-gold/95 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#1c1917]">
            {pub.award}
          </span>
        ) : null}
      </div>

      <span
        aria-hidden
        className={clsx(
          'mx-auto mt-3 h-[2px] w-10 origin-center bg-gold transition-transform duration-300',
          selected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
        )}
      />
    </button>
  );
}

function BookDetail({ pub }: { pub: Publication }) {
  return (
    <article className="animate-fade-in border border-hairline bg-surface-2/50 p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={clsx(
            'rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em]',
            pub.status === 'published'
              ? 'border-gold/50 bg-gold/10 text-fg'
              : 'border-hairline text-fg-dim',
          )}
        >
          {STATUS_LABEL[pub.status]}
        </span>
        {pub.award ? (
          <span className="rounded-full border border-gold/60 bg-gold/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg">
            {pub.award}
          </span>
        ) : null}
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint">
          {pub.year}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-2xl leading-snug text-fg md:text-3xl">
        {pub.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{pub.authors}</p>
      {pub.venue ? (
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-fg-faint">
          {pub.venue}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        {pub.pdf ? (
          <a
            href={pub.pdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-fg px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors hover:border-gold hover:bg-gold/10"
          >
            Open paper PDF
            <span aria-hidden>↗</span>
          </a>
        ) : (
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-faint">
            Full text not public yet
          </p>
        )}
        {pub.awardImage ? (
          <a
            href={pub.awardImage}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
          >
            Certificate ↗
          </a>
        ) : null}
      </div>

      {pub.figures && pub.figures.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {pub.figures.map((src, i) => (
            <figure
              key={src}
              className="overflow-hidden border border-hairline bg-surface"
            >
              <Image
                src={src}
                alt={`Figure from ${pub.shortTitle}`}
                width={1400}
                height={900}
                className="h-auto w-full object-contain"
              />
              <figcaption className="border-t border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
                Figure {i + 1}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {pub.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-dim"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export function BookShelf() {
  const groups = groupByStatus(publications);
  const [selectedId, setSelectedId] = useState<number>(
    publications.find((p) => p.status === 'published')?.id ??
      publications[0]?.id ??
      0,
  );
  const detailId = useId();
  const selected = publications.find((p) => p.id === selectedId);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('paper-')) {
      const id = Number(hash.replace('paper-', ''));
      if (publications.some((p) => p.id === id)) setSelectedId(id);
    }
  }, []);

  return (
    <div className="space-y-14">
      {groups.map(({ status, items }) => (
        <section key={status} aria-labelledby={`shelf-${status}`}>
          <div className="mb-6 flex items-end justify-between gap-4">
            <p
              id={`shelf-${status}`}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim"
            >
              {STATUS_LABEL[status]}
              <span className="ml-2 text-fg-faint">· {items.length}</span>
            </p>
          </div>

          {/* shelf plank */}
          <div className="relative">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((pub) => (
                <li key={pub.id} id={`paper-${pub.id}`}>
                  <BookCover
                    pub={pub}
                    selected={selectedId === pub.id}
                    onSelect={() => {
                      setSelectedId(pub.id);
                      history.replaceState(null, '', `#paper-${pub.id}`);
                      document
                        .getElementById(detailId)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }}
                  />
                </li>
              ))}
            </ul>
            <div
              aria-hidden
              className="mt-2 h-[3px] w-full bg-gradient-to-r from-hairline via-[#c4b59a] to-hairline shadow-[0_6px_10px_rgba(0,0,0,0.08)]"
            />
          </div>
        </section>
      ))}

      <div id={detailId} className="scroll-mt-28">
        {selected ? <BookDetail pub={selected} /> : null}
      </div>
    </div>
  );
}
