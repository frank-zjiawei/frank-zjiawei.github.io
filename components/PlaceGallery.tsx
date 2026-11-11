import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { placeSlots, type PlaceSlot } from '@/content/places';

const PHOTO_DIR = path.join(process.cwd(), 'public', 'images', 'places');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/** Public URL of the photo dropped in for a slot, or null if there is none yet. */
function findPhoto(id: string): string | null {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(PHOTO_DIR, id + ext))) {
      return `/images/places/${id}${ext}`;
    }
  }
  return null;
}

function Tile({ place, photo }: { place: PlaceSlot; photo: string | null }) {
  const body = (
    <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
      {photo ? (
        <>
          <Image
            src={photo}
            alt={`${place.title} — ${place.subtitle}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 pt-16">
            <p className="font-serif text-lg leading-snug text-white">
              {place.title}
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85">
              {place.subtitle}
            </p>
          </div>
        </>
      ) : (
        // Only rendered while developing locally: shows where a photo will go.
        <div className="absolute inset-0 flex flex-col justify-between border border-dashed border-hairline p-4">
          <p className="font-mono text-[11px] text-fg-dim">
            public/images/places/
            <span className="text-fg">{place.id}.jpg</span>
          </p>
          <div>
            <p className="font-serif text-lg leading-snug text-fg">
              {place.title}
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
              {place.subtitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return place.href ? (
    <Link href={place.href} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group">{body}</div>
  );
}

/**
 * Photo grid. On the live site it shows only the slots that have a photo and
 * disappears entirely while there are none; in local development it also
 * shows the empty slots, labelled with the file name each one is waiting for.
 */
export function PlaceGallery({
  eyebrow = 'Places',
  title = 'Where I’ve been',
}: {
  eyebrow?: string;
  title?: string;
}) {
  const showEmptySlots = process.env.NODE_ENV === 'development';
  const tiles = placeSlots
    .map((place) => ({ place, photo: findPhoto(place.id) }))
    .filter((t) => t.photo || showEmptySlots);

  if (tiles.length === 0) return null;

  return (
    <section className="border-t border-hairline">
      <div className="container-prose py-16 md:py-20">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-2xl text-fg md:text-3xl">{title}</h2>
        {showEmptySlots && tiles.some((t) => !t.photo) ? (
          <p className="mt-3 max-w-2xl font-mono text-[11px] leading-relaxed text-fg-dim">
            Local preview only: dashed slots are hidden on the live site until
            their photo is added.
          </p>
        ) : null}

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map(({ place, photo }) => (
            <li
              key={place.id}
              id={`place-${place.id}`}
              className="overflow-hidden rounded-xl border border-hairline bg-surface"
            >
              <Tile place={place} photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
