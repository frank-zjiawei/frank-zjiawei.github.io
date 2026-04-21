import Link from 'next/link';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';

export function GraphSection() {
  return (
    <section className="container-prose pb-16 md:pb-24">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="section-eyebrow">Knowledge Graph</p>
          <h2 className="section-title mt-3">A map of what I work on</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-300 md:text-base">
            Hover a node to follow its connections. Click to open the related
            project, lab, or paper. This doubles as a navigation alternative to
            the menu above.
          </p>
        </div>
        <Link
          href="/graph"
          className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-300 transition-colors hover:text-ink-50 md:inline-flex"
        >
          Full screen ↗
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-sm border border-ink-700 bg-ink-950/40">
        <KnowledgeGraph height={560} />
      </div>
    </section>
  );
}
