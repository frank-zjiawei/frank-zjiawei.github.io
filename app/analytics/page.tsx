import { PageHeader } from '@/components/PageHeader';
import { ProjectEntry } from '@/components/ProjectEntry';
import { projects } from '@/content/projects';

export const metadata = {
  title: 'Business Analytics',
  description:
    'Data and ML work at Wyloo Metals, HireBeat, Accenture, and Google Hackathon.',
};

export default function AnalyticsPage() {
  const items = projects.filter((p) => p.category === 'analytics');

  return (
    <>
      <PageHeader
        eyebrow="02 / Analytics"
        title="Business Analytics"
        description="Turning messy data into decisions. Engagements range from enterprise data warehouses and BI dashboards to hackathon-speed prototypes of AI-assisted analytics."
      />
      <div className="container-prose pb-24">
        {items.map((p) => (
          <ProjectEntry key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}
