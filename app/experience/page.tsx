import { PageHeader } from '@/components/PageHeader';
import { ExperienceTabs } from '@/components/ExperienceTabs';

export const metadata = {
  title: 'Experience',
  description:
    'Professional experience and projects — Harvard Graduate School of Education LIT Lab, Harvard Business School Foundry, AI ventures, and analytics roles.',
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Experience"
        description="Professional roles and selected projects — research, analytics, AI engineering, and ventures."
      />
      <div className="container-prose pb-24">
        <ExperienceTabs />
      </div>
    </>
  );
}
