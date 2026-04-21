import { PageHeader } from '@/components/PageHeader';
import { ProjectEntry } from '@/components/ProjectEntry';
import { projects } from '@/content/projects';

export const metadata = {
  title: 'AI Initiatives',
  description:
    'AI projects, ventures, and engineering work — YOLOv8, MIT Media Lab AI Venture, Harvard President\'s Innovation Challenge.',
};

export default function AIPage() {
  const aiProjects = projects.filter((p) => p.category === 'ai');

  return (
    <>
      <PageHeader
        eyebrow="01 / AI"
        title="AI Initiatives"
        description="Engineering, entrepreneurship, and applied research in AI — from computer vision in production to agentic ventures pitched at MIT Media Lab and Harvard i-Lab."
      />
      <div className="container-prose pb-24">
        {aiProjects.map((p) => (
          <ProjectEntry key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}
