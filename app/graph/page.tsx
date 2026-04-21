import { PageHeader } from '@/components/PageHeader';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';

export const metadata = {
  title: 'Knowledge Graph',
  description:
    'Full-screen knowledge graph — map of projects, labs, publications, and courses.',
};

export default function GraphPage() {
  return (
    <>
      <PageHeader
        eyebrow="Map"
        title="Knowledge Graph"
        description="Hover a node to follow its connections. Click to open the related project, lab, or paper."
      />
      <div className="container-prose pb-24">
        <div className="relative overflow-hidden rounded-sm border border-ink-700 bg-ink-950/40">
          <KnowledgeGraph height={720} />
        </div>
      </div>
    </>
  );
}
