import { PageHeader } from '@/components/PageHeader';
import { ExperienceTabs } from '@/components/ExperienceTabs';

export const metadata = {
  title: 'Experience',
  description:
    'Research, professional, and leadership experience — Harvard Graduate School of Education Learning Innovation and Technology Lab, Tsinghua Shenzhen International Graduate School, and Harvard Business School Foundry.',
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Experience"
        description="Research first, then the professional roles and team projects that shaped how I work."
      />
      <div className="container-prose pb-24">
        <ExperienceTabs />
      </div>
    </>
  );
}
