import { Hero } from '@/components/Hero';
import { FeaturedWork } from '@/components/FeaturedWork';
import { SectionCards } from '@/components/SectionCards';
import { PlaceGallery } from '@/components/PlaceGallery';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlaceGallery eyebrow="Along the way" title="Places & photos" />
      <FeaturedWork />
      <SectionCards />
    </>
  );
}
