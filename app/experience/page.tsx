import { PageHeader } from '@/components/PageHeader';
import { ExperienceTabs } from '@/components/ExperienceTabs';
import { ui } from '@/lib/i18n';

export const metadata = {
  title: 'Experience',
  description:
    'Research, professional, and leadership experience — Harvard Graduate School of Education Learning Innovation and Technology Lab, Tsinghua Shenzhen International Graduate School, and Harvard Business School Foundry.',
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow={ui.experience.eyebrow}
        title={ui.experience.title}
        description={ui.experience.description}
      />
      <div className="container-prose pb-24">
        <ExperienceTabs />
      </div>
    </>
  );
}
