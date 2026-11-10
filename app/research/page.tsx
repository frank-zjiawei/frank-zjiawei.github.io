import { PageHeader } from '@/components/PageHeader';
import { BookShelf } from '@/components/BookShelf';
import { publications } from '@/content/publications';

export const metadata = {
  title: 'Papers',
  description:
    'A shelf of papers — ACM Multimedia 2026 First Prize, IVMSP 2026 Best Paper Runner-Up, and manuscripts under review.',
};

export default function ResearchPage() {
  const published = publications.filter((p) => p.status === 'published').length;
  const awards = publications.filter((p) => p.award).length;

  return (
    <>
      <PageHeader
        eyebrow="Papers"
        title="Papers"
        description={`A bookshelf of publications — ${published} published, ${awards} conference awards. Click a volume and its page slides open from the right.`}
      />

      <section id="publications" className="container-prose pb-24">
        <BookShelf />
      </section>
    </>
  );
}
