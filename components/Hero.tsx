import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { profile } from '@/content/profile';

/**
 * Staggered entrance for elements with the `rise` class. Pure CSS, so the
 * text is readable before (or without) any JavaScript.
 */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Keep compounds like "hands-on" on one line in large display type. */
const noBreakHyphens = (text: string) =>
  text.replace(/(\w)-(\w)/g, '$1\u2011$2');

export function Hero() {
  return (
    <section className="container-prose pt-14 pb-16 md:pt-24 md:pb-24">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-16">
        <div className="min-w-0">
          <p
            style={delay(0)}
            className="rise flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim md:text-[11px]"
          >
            {profile.interests.slice(0, 3).map((interest, i, shown) => (
              <span key={interest} className="whitespace-nowrap">
                {interest}
                {i < shown.length - 1 ? (
                  <span className="ml-3 text-fg-faint">·</span>
                ) : null}
              </span>
            ))}
          </p>

          <h1
            style={delay(60)}
            className="rise mt-6 font-serif text-[clamp(2.6rem,6.4vw,4.75rem)] font-normal leading-[1.04] tracking-tight text-fg"
          >
            {profile.name}
          </h1>

          <p
            style={delay(110)}
            className="rise mt-3 font-mono text-xs tracking-[0.12em] text-fg-dim md:text-[13px]"
          >
            <span aria-label={`Pronounced ${profile.pronunciation}`}>
              {profile.pronunciation}
            </span>
            <span className="mx-2 text-fg-faint">·</span>
            goes by {profile.preferredName}
          </p>

          <p
            style={delay(170)}
            className="rise mt-8 max-w-2xl text-pretty font-serif text-[1.35rem] leading-[1.45] text-fg md:text-[1.7rem] md:leading-[1.4]"
          >
            {noBreakHyphens(profile.statement)}
          </p>

          <p
            style={delay(230)}
            className="rise mt-6 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted md:text-[17px]"
          >
            {profile.intro}
          </p>

          <div style={delay(300)} className="rise mt-9 flex flex-wrap items-center gap-x-3 gap-y-4">
            <Link
              href="/research/"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-85"
            >
              Read the papers
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </Link>
            <a
              href={profile.cv.en}
              download
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-fg"
            >
              <Download className="h-4 w-4 text-fg-dim" strokeWidth={1.75} />
              CV
            </a>
            <span className="flex items-center gap-x-5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted sm:pl-2">
              <a
                href={profile.links.scholar}
                target="_blank"
                rel="noreferrer"
                className="link-quiet"
              >
                Google Scholar
              </a>
              <a href={`mailto:${profile.email}`} className="link-quiet">
                Email
              </a>
            </span>
          </div>
        </div>

        {/* Comes after the text in source order, so on a phone the words
            lead and the photo follows; on wide screens it sits to the right. */}
        <figure style={delay(200)} className="rise">
          <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl border border-hairline bg-surface-2 md:max-w-none">
            <Image
              src="/images/portrait.jpg"
              alt="Jiawei Zhang standing in front of green doors"
              fill
              sizes="(min-width: 768px) 280px, 260px"
              className="object-cover object-[52%_50%]"
              priority
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
