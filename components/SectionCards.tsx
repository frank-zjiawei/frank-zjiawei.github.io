import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const SECTIONS = [
  {
    href: '/ai',
    eyebrow: '01',
    title: 'AI Initiatives',
    description:
      'YOLOv8 real-time object detection (98.55%), MIT Media Lab AI Venture, Harvard President\'s Innovation Challenge.',
    meta: 'Engineering · Entrepreneurship',
  },
  {
    href: '/analytics',
    eyebrow: '02',
    title: 'Business Analytics',
    description:
      'Data and ML work at Wyloo Metals, HireBeat, Accenture. Google Hackathon 2024 — 3rd place.',
    meta: 'Python · SQL · R · Power BI',
  },
  {
    href: '/academic',
    eyebrow: '03',
    title: 'Academic',
    description:
      'Harvard Ed.M. (Learning Design, Innovation & Technology), MIT Media Lab, UBC MBAN, University of Toronto.',
    meta: 'Coursework · Projects',
  },
  {
    href: '/research',
    eyebrow: '04',
    title: 'Research & Publications',
    description:
      'Harvard GSE LIT Lab, Tsinghua-SIGS, UsingAI. Ten publications across computer vision, operations research, and analytics.',
    meta: '10 Papers · 3 Labs',
  },
  {
    href: '/harvard',
    eyebrow: '05',
    title: 'Harvard',
    description:
      'A running notebook from Harvard GSE — Ed.M. in Learning Design, Innovation & Technology, and cross-registrations at MIT Media Lab.',
    meta: 'Cambridge, MA · Notes',
  },
  {
    href: '/boxing',
    eyebrow: '06',
    title: 'Boxing',
    description:
      'The part of the week that has nothing to do with slides. Training notes, sparring reflections, and what footwork teaches good research.',
    meta: 'Off the desk',
  },
  {
    href: '/journal',
    eyebrow: '07',
    title: 'Other writings',
    description:
      'Essays and reflections on learning design, AI, and building things at the edges of disciplines.',
    meta: 'Writing · Notes',
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
