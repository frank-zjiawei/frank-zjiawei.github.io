import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const SECTIONS = [
  {
    href: '/about',
    eyebrow: '01',
    title: 'About Me',
    description:
      'Academic path from Toronto to Cambridge — HGSE LIT Lab, HBS Foundry, MIT, and the interests that keep the rest honest.',
    meta: 'Story · Education · Interests',
  },
  {
    href: '/experience',
    eyebrow: '02',
    title: 'Experience',
    description:
      'AI engineering, ventures, and business analytics — YOLOv8, MIT Media Lab, Foundry, Wyloo, HireBeat, Accenture, Google Hackathon.',
    meta: 'AI · Analytics · Ventures',
  },
  {
    href: '/research',
    eyebrow: '03',
    title: 'Papers',
    description:
      'A bookshelf of publications — ACM MM First Prize, IVMSP Best Paper Runner-Up, and manuscripts under review.',
    meta: 'Shelf · PDFs · Figures',
  },
];

export function SectionCards() {
  return (
    <section className="container-prose py-24 md:py-32">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div>
          <p className="section-eyebrow">Index</p>
          <h2 className="section-title mt-3">Selected work</h2>
        </div>
        <Link
          href="/graph"
          className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted transition-colors hover:text-fg md:inline-flex"
        >
          Open Nav Nebula ↗
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className="group card-link">
            <div>
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
                  {s.eyebrow}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-fg-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-6 font-serif text-2xl tracking-tight text-fg">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {s.description}
              </p>
            </div>
            <div className="mt-8 border-t border-hairline pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
              {s.meta}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
