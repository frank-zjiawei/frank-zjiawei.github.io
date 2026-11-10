'use client';

import { useState } from 'react';
import Link from 'next/link';
import { placeSlots, type PlaceSlot } from '@/content/places';

function PlaceTile({ place }: { place: PlaceSlot }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const body = (
    <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={place.image}
          alt={place.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : null}

      {failed || !loaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-hairline bg-[linear-gradient(160deg,#f7f7f5,#ebeae6)] dark:bg-[linear-gradient(160deg,#1a1816,#12100e)]">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
            Add photo
          </span>
          <span className="font-mono text-[11px] text-fg-dim">
            places/{place.id}.jpg
          </span>
        </div>
      ) : null}

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 p-4 pt-16 ${
          loaded && !failed
            ? 'bg-gradient-to-t from-black/55 via-black/15 to-transparent'
            : 'bg-gradient-to-t from-black/25 via-transparent to-transparent'
        }`}
      >
        <p
          className={`font-serif text-lg drop-shadow-sm ${
            loaded && !failed ? 'text-white' : 'text-fg'
          }`}
        >
          {place.title}
        </p>
        <p
          className={`mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] ${
            loaded && !failed ? 'text-white/85' : 'text-fg-dim'
          }`}
        >
          {place.subtitle}
        </p>
      </div>
    </div>
  );

  if (place.href) {
    return (
      <Link href={place.href} className="block">
        {body}
      </Link>
    );
  }
  return body;
}

export function PlaceGallery({
  eyebrow = 'Places',
  title = 'Where I’ve been',
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="container-prose pb-20">
      <div className="border-t border-hairline pt-12">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl text-fg md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted md:text-base">
          Drop photos into{' '}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[12px] text-fg">
            public/images/places/
          </code>{' '}
          — each tile lights up when its file appears.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeSlots.map((p) => (
            <li
              key={p.id}
              id={`place-${p.id}`}
              className="overflow-hidden rounded-xl border border-hairline bg-surface transition-transform duration-300 hover:-translate-y-0.5"
            >
              <PlaceTile place={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
