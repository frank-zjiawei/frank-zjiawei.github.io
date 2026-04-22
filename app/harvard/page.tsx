import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Harvard',
  description:
    'Thinking, articles, and experiences from Harvard Graduate School of Education.',
};

export default function HarvardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cambridge, MA"
        title="Harvard"
        description="A running notebook of what I am learning, building, and questioning at Harvard Graduate School of Education — essays on learning design, classroom experiments, and cross-registrations at MIT Media Lab."
      />

      <section className="container-prose pb-24">
        <div className="rounded-sm border border-hairline bg-surface-2/40 p-10 md:p-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
            In progress
          </p>
          <h2 className="mt-4 font-serif text-2xl leading-snug text-fg md:text-3xl">
            Writing lives here soon.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
            This space will collect short reflections, course artefacts, and
            project post-mortems from my Ed.M. in Learning Design, Innovation
            &amp; Technology — things I wish someone had written down for me
            before I started.
          </p>

          <ul className="mt-8 space-y-3 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-dim">
            <li>· Notes from the LIT Lab</li>
            <li>· Cross-registered at MIT Media Lab</li>
            <li>· Teaching &amp; classroom experiments</li>
            <li>· Readings worth returning to</li>
          </ul>
        </div>
      </section>
    </>
  );
}
