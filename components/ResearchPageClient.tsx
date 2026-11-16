'use client';

import { PageHeader } from '@/components/PageHeader';
import { BookShelf } from '@/components/BookShelf';
import { publications } from '@/content/publications';
import { ui } from '@/lib/i18n';
import { useTx } from '@/components/LocaleText';

export function ResearchPageClient() {
  const { pick } = useTx();
  const published = publications.filter((p) => p.status === 'published').length;
  const awards = publications.filter((p) => p.award).length;

  return (
    <>
      <PageHeader
        eyebrow={ui.papersPage.eyebrow}
        title={ui.papersPage.title}
        description={pick(ui.papersPage.description(published, awards))}
      />

      <section id="publications" className="container-prose pb-24">
        <BookShelf />
      </section>
    </>
  );
}
