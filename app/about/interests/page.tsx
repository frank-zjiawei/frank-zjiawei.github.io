import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Interests · Boxing',
  description:
    'More about Jiawei — boxing notes, sparring reflections, and what training teaches about research.',
};

export default function InterestsPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Me · Interests"
        title="Interests"
        description="The parts of the week that keep the rest honest. Boxing first — more interests may land here later."
      />

      <section className="container-prose pb-8">
        <p className="mb-8">
          <Link
            href="/about/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
          >
            ← Back to About Me
          </Link>
        </p>
      </section>

      <section id="boxing" className="container-prose pb-24">
        <div className="border-t border-hairline pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
            Boxing
          </p>
          <h2 className="mt-3 font-serif text-3xl text-fg md:text-4xl">
            Off the desk
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
            Boxing is the part of my week that has nothing to do with slides —
            and precisely because of that, it keeps the research honest. An hour
            on the bag is a reminder that iteration, timing, and taking a hit
            are skills, not metaphors.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="border border-hairline bg-surface-2/40 p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
              Why this page exists
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted md:text-base">
              I plan to post short entries here: what I drilled, what I got hit
              with, and the occasional idea that only lands somewhere between
              rounds.
            </p>
          </div>
          <div className="border border-hairline bg-surface-2/40 p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
              Coming soon
            </p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted md:text-base">
              <li>— Week log: what I trained &amp; why</li>
              <li>— Sparring diaries</li>
              <li>— Cross-overs: footwork ↔ research iteration</li>
              <li>— Gear &amp; gym notes</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
