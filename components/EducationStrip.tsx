import Link from 'next/link';
import { schools } from '@/content/education';

/** Compact education summary for the home page; full details live on About. */
export function EducationStrip() {
  return (
    <section className="border-t border-hairline">
      <div className="container-prose py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Background</p>
            <h2 className="mt-3 font-serif text-2xl text-fg md:text-3xl">
              Education
            </h2>
          </div>
          <Link
            href="/about/"
            className="link-quiet shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted"
          >
            About me →
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-x-10 border-t border-hairline sm:grid-cols-2">
          {schools.map((s) => (
            <li key={s.id} className="border-b border-hairline py-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-serif text-lg text-fg">{s.shortSchool}</p>
                <p className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-fg-dim">
                  {s.years}
                </p>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                {s.degree}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
