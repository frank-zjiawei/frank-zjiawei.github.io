import { Hero } from '@/components/Hero';
import { ResearchFocus } from '@/components/ResearchFocus';
import { SelectedPublications } from '@/components/SelectedPublications';
import { EducationStrip } from '@/components/EducationStrip';
import { PlaceGallery } from '@/components/PlaceGallery';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ResearchFocus />
      <SelectedPublications />
      <EducationStrip />
      <PlaceGallery eyebrow="Along the way" title="Places" />
    </>
  );
}
