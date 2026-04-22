import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Boxing',
  description:
    'Training notes, sparring reflections, and what boxing teaches me about design, research, and life.',
};

export default function BoxingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Off the desk"
        title="Boxing"
        description="What an hour on the bag teaches me that the desk cannot. Training notes, sparring reflections, and the strange overlap between footwork and good research."
      />

      <section className="container-prose pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr]">
          <div className="rounded-sm border border-hairline bg-surface-2/40 p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
              Why this page exists
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted md:text-base">
              Boxing is the part of my week that has nothing to do with AI,
              research, or slides — and precisely because of that, it keeps the
              rest honest. I plan to post short entries here: what I drilled,
              what I got hit with, and the occasional idea that only lands
              somewhere between rounds.
            </p>
          </div>

          <div className="rounded-sm border border-hairline bg-surface-2/40 p-8 md:p-10">
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
