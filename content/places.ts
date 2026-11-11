/**
 * Photo slots for the Home and About pages.
 *
 * To fill a slot, drop a photo named after its `id` into
 * public/images/places/ — for example `toronto.jpg`. JPG, PNG, and WebP all
 * work. A slot only appears on the live site once its photo exists, so
 * visitors never see an empty frame.
 */
export interface PlaceSlot {
  id: string;
  title: string;
  subtitle: string;
  href?: string;
}

export const placeSlots: PlaceSlot[] = [
  {
    id: 'harvard-gse',
    title: 'Harvard Graduate School of Education',
    subtitle: 'Cambridge, MA',
    href: '/about#harvard',
  },
  {
    id: 'mit',
    title: 'MIT',
    subtitle: 'Cambridge, MA',
    href: '/about#mit',
  },
  {
    id: 'harvard-business-school',
    title: 'Harvard Business School',
    subtitle: 'Foundry · Boston, MA',
    href: '/experience#hbs-foundry',
  },
  {
    id: 'innovation-lab',
    title: 'Harvard Innovation Labs',
    subtitle: 'President’s Innovation Challenge',
    href: '/experience#harvard-ilab',
  },
  {
    id: 'tsinghua',
    title: 'Tsinghua SIGS',
    subtitle: 'Shenzhen, China',
    href: '/experience#tsinghua-sigs',
  },
  {
    id: 'vancouver',
    title: 'Vancouver',
    subtitle: 'UBC Sauder School of Business',
    href: '/about#ubc',
  },
  {
    id: 'toronto',
    title: 'Toronto',
    subtitle: 'University of Toronto',
    href: '/about#uoft',
  },
];
