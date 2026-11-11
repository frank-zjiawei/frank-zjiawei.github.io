import { Hero } from '@/components/Hero';
import { ResearchFocus } from '@/components/ResearchFocus';
import { SelectedPublications } from '@/components/SelectedPublications';
import { AffiliationBar } from '@/components/AffiliationBar';
import { PlaceGallery } from '@/components/PlaceGallery';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AffiliationBar />
      <ResearchFocus />
      <SelectedPublications />
      <PlaceGallery eyebrow="Along the way" title="Places" />
    </>
  );
}
