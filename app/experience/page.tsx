import { PageHeader } from '@/components/PageHeader';
import { ProjectEntry } from '@/components/ProjectEntry';
import { projects } from '@/content/projects';

export const metadata = {
  title: 'Experience',
  description:
    'AI engineering, analytics, and venture work — HGSE LIT Lab, HBS Foundry, MIT Media Lab, and industry roles.',
};

export default function ExperiencePage() {
  const current = projects.filter((p) => p.category === 'current');
  const ai = projects.filter((p) => p.category === 'ai');
  const analytics = projects.filter((p) => p.category === 'analytics');

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Experience"
        description="Research, product, and analytics work — from HGSE LIT Lab and Harvard Business School Foundry to AI engineering and data roles."
      />

      <div className="container-prose pb-24">
        {current.length > 0 ? (
          <section className="mb-6">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
              Now
            </p>
            {current.map((p) => (
              <ProjectEntry key={p.id} project={p} />
            ))}
          </section>
        ) : null}

        <section className="mb-6">
          <p className="mb-2 border-t border-hairline pt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
            AI · Engineering & ventures
          </p>
          {ai.map((p) => (
            <ProjectEntry key={p.id} project={p} />
          ))}
        </section>

        <section>
          <p className="mb-2 border-t border-hairline pt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
            Business Analytics
          </p>
          {analytics.map((p) => (
            <ProjectEntry key={p.id} project={p} />
          ))}
        </section>
      </div>
    </>
  );
}
