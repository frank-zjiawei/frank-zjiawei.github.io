import { PageHeader } from '@/components/PageHeader';
import { BookShelf } from '@/components/BookShelf';
import { publications } from '@/content/publications';

export const metadata = {
  title: 'Research',
  description:
    'A shelf of papers — ACM Multimedia 2026 First Prize, IVMSP 2026 Best Paper Runner-Up, and manuscripts under review.',
};

export default function ResearchPage() {
  const published = publications.filter((p) => p.status === 'published').length;
  const awards = publications.filter((p) => p.award).length;

  return (
    <>
      <PageHeader
        eyebrow="04 / Research"
        title="Research"
        description={`A bookshelf of publications — ${published} published papers, ${awards} conference awards. Click a volume to open the abstract, figures, and PDF. Research roles live on the CV.`}
      />

      <section id="publications" className="container-prose pb-24">
        <BookShelf />
      </section>
    </>
  );
}
