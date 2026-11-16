import { Hero } from '@/components/Hero';
import { ResearchFocus } from '@/components/ResearchFocus';
import { SelectedPublications } from '@/components/SelectedPublications';
import { AffiliationBar } from '@/components/AffiliationBar';
import { PlaceGallery } from '@/components/PlaceGallery';
import { ui } from '@/lib/i18n';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AffiliationBar />
      <ResearchFocus />
      <SelectedPublications />
      <PlaceGallery eyebrow={ui.places.alongTheWay} title={ui.places.places} />
    </>
  );
}
