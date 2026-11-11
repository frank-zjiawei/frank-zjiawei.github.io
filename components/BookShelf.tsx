'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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
  'ready-to-submit',
  'working-paper',
];

const TONE: Record<NonNullable<Publication['coverTone']>, string> = {
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
      aria-haspopup="dialog"
      className={clsx(
        'group relative flex w-full flex-col text-left outline-none transition-transform duration-300',
        selected ? '-translate-y-2' : 'hover:-translate-y-2',
      )}
    >
      <div
        className={clsx(
          'relative aspect-[2/3] w-full overflow-hidden rounded-[2px] border bg-surface-2 shadow-[4px_6px_18px_rgba(0,0,0,0.12)] transition-[box-shadow,border-color] duration-300',
          selected
            ? 'border-fg shadow-[6px_10px_24px_rgba(0,0,0,0.18)]'
            : 'border-hairline group-hover:border-fg/40',
        )}
      >
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
          <span className="absolute right-2 top-2 max-w-[70%] truncate rounded-sm bg-fg px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-surface">
            {pub.award}
          </span>
        ) : null}
      </div>

      <span
        aria-hidden
        className={clsx(
          'mx-auto mt-3 h-[2px] w-10 origin-center bg-fg transition-transform duration-300',
          selected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
        )}
      />
    </button>
  );
}

function BookPagePanel({
  pub,
  open,
  onClose,
}: {
  pub: Publication | null;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[60] flex justify-end',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      {/* dimmed shelf behind the open page */}
      <button
        type="button"
        aria-label="Close paper"
        onClick={onClose}
        className={clsx(
          'absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* page that turns in from the right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={pub ? pub.shortTitle : 'Paper detail'}
        className={clsx(
          'relative z-10 flex h-full w-full max-w-xl flex-col border-l border-hairline bg-[rgb(var(--surface))] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:max-w-[34rem]',
          // The shadow belongs to the open page only: while the page is parked
          // off-screen, its shadow would otherwise spill back onto the shelf.
          open
            ? 'translate-x-0 shadow-[-24px_0_60px_rgba(28,25,23,0.18)]'
            : 'translate-x-full shadow-none',
        )}
        style={{
          transformOrigin: 'left center',
        }}
      >
        {/* binding / gutter — reads as the book hinge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/[0.08] via-black/[0.03] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-px bg-hairline"
        />

        <header className="relative z-10 flex items-start justify-between gap-4 border-b border-hairline px-6 py-5 pl-10 md:px-8 md:pl-12">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
              Opened page
            </p>
            <p className="mt-1 truncate font-serif text-lg text-fg">
              {pub?.shortTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
          >
            Close ✕
          </button>
        </header>

        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-7 pl-10 md:px-8 md:pl-12 md:py-8">
          {pub ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={clsx(
                    'rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em]',
                    pub.status === 'published'
                      ? 'border-fg/40 bg-fg/5 text-fg'
                      : 'border-hairline text-fg-dim',
                  )}
                >
                  {STATUS_LABEL[pub.status]}
                </span>
                {pub.award ? (
                  <span className="rounded-full border border-fg bg-fg px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-surface">
                    {pub.award}
                  </span>
                ) : null}
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint">
                  {pub.year}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-[1.65rem] leading-[1.25] text-fg md:text-[1.85rem]">
                {pub.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                {pub.authors}
              </p>
              {pub.venue ? (
                <p className="mt-3 border-l-2 border-fg/30 pl-3 font-mono text-[11px] leading-relaxed text-fg-faint">
                  {pub.venue}
                </p>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-4">
                {pub.pdf ? (
                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-fg px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition-colors hover:bg-fg hover:text-surface"
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
                <div className="mt-8 space-y-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
                    Figures
                  </p>
                  {pub.figures.map((src, i) => (
                    <figure
                      key={src}
                      className="overflow-hidden border border-hairline bg-surface-2"
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

              <div className="mt-8 flex flex-wrap gap-2">
                {pub.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

export function BookShelf() {
  const groups = groupByStatus(publications);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = publications.find((p) => p.id === selectedId) ?? null;
  const open = selectedId !== null;

  const close = () => {
    setSelectedId(null);
    if (window.location.hash.startsWith('#paper-')) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('paper-')) {
        const id = Number(hash.replace('paper-', ''));
        if (publications.some((p) => p.id === id)) setSelectedId(id);
      }
    };
    openFromHash();
    // also follow links to a paper made while already on this page
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <>
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
                      }}
                    />
                  </li>
                ))}
              </ul>
              <div
                aria-hidden
                className="mt-2 h-[3px] w-full bg-gradient-to-r from-hairline via-fg-faint to-hairline shadow-[0_6px_10px_rgba(0,0,0,0.08)]"
              />
            </div>
          </section>
        ))}
      </div>

      <BookPagePanel pub={selected} open={open} onClose={close} />
    </>
  );
}
