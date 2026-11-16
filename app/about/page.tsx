import {
  AboutContactClient,
  AboutPageClient,
} from '@/components/AboutPageClient';
import { PlaceGallery } from '@/components/PlaceGallery';
import { profile } from '@/content/profile';
import { ui } from '@/lib/i18n';

export const metadata = {
  title: 'About Me',
  description: profile.metaDescription,
};

export default function AboutPage() {
  return (
    <>
      <AboutPageClient />
      <PlaceGallery eyebrow={ui.places.places} title={ui.places.campuses} />
      <AboutContactClient />
    </>
  );
}
