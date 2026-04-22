import Link from 'next/link';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';

export function GraphSection() {
  return (
    <section className="container-prose pb-16 md:pb-24">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 className="section-title">Nav Nebula</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
            Drag a node to pull on the web — everything it touches will follow.
            Hover to trace connections, click to open the related project, lab,
            or paper. Toggle <span className="font-mono">Compact</span> and{' '}
            <span className="font-mono">Zoom&nbsp;in</span> to change the view.
          </p>
        </div>
        <Link
          href="/graph"
          className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted transition-colors hover:text-fg md:inline-flex"
        >
          Full screen ↗
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-sm border border-hairline bg-surface/40">
        <KnowledgeGraph height={560} />
      </div>
    </section>
  );
}
