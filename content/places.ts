/** Photo slots for Home / About — drop files into public/images/places/ */
export interface PlaceSlot {
  id: string;
  title: string;
  subtitle: string;
  /** Path under /public — leave file missing until you drop the photo in */
  image: string;
  href?: string;
}

export const placeSlots: PlaceSlot[] = [
  {
    id: 'toronto',
    title: 'Toronto',
    subtitle: 'University of Toronto',
    image: '/images/places/toronto.jpg',
    href: '/about#uoft',
  },
  {
    id: 'vancouver',
    title: 'Vancouver',
    subtitle: 'UBC Sauder · MBAN',
    image: '/images/places/vancouver.jpg',
    href: '/about#ubc',
  },
  {
    id: 'tsinghua',
    title: 'Tsinghua',
    subtitle: 'Beijing',
    image: '/images/places/tsinghua.jpg',
  },
  {
    id: 'harvard-gse',
    title: 'Harvard Graduate School of Education',
    subtitle: 'Cambridge, MA',
    image: '/images/places/harvard-gse.jpg',
    href: '/about#harvard',
  },
  {
    id: 'harvard-business-school',
    title: 'Harvard Business School',
    subtitle: 'Foundry · Boston',
    image: '/images/places/harvard-business-school.jpg',
    href: '/experience#hbs-foundry',
  },
  {
    id: 'mit',
    title: 'MIT',
    subtitle: 'Cambridge, MA',
    image: '/images/places/mit.jpg',
    href: '/about#mit',
  },
  {
    id: 'innovation-lab',
    title: 'Harvard Innovation Lab',
    subtitle: 'President’s Innovation Challenge',
    image: '/images/places/innovation-lab.jpg',
    href: '/experience#harvard-ilab',
  },
];
