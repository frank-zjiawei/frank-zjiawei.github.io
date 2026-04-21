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
        title="Graphic view"
        description="Drag a node to pull on the web — connected nodes follow. Hover to trace relationships, click to open the related project, lab, or paper."
      />
      <div className="container-prose pb-24">
        <div className="relative overflow-hidden rounded-sm border border-hairline bg-surface/40">
          <KnowledgeGraph height={720} />
        </div>
      </div>
    </>
  );
}
