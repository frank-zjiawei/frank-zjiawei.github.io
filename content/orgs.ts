/**
 * Organisations that appear across the site: experience entries, education,
 * and the logo bar on the home page. One entry per organisation keeps names
 * and logos consistent everywhere.
 *
 * Each logo is the organisation's own published icon, saved locally in
 * public/images/logos/. Leave `logo` out and the site draws a lettered tile
 * instead, so an entry never needs a logo to look finished.
 */
export interface Org {
  name: string;
  /** Shorter name for tight spaces such as the home-page logo bar. */
  short: string;
  logo?: string;
  /**
   * 'contain' (default): the mark sits inside a white tile with a margin.
   * 'cover': the icon is already a full square and fills the tile.
   */
  fit?: 'contain' | 'cover';
  /** Drawn when there is no logo. Without it the tile shows initials. */
  icon?: 'trophy';
}

const registry = {
  'harvard-gse': {
    name: 'Harvard Graduate School of Education',
    short: 'Harvard GSE',
    logo: '/images/logos/harvard-gse.png',
  },
  hbs: {
    name: 'Harvard Business School',
    short: 'Harvard Business School',
    logo: '/images/logos/hbs.png',
  },
  'harvard-ilab': {
    name: 'Harvard Innovation Labs',
    short: 'i-lab',
    logo: '/images/logos/harvard-ilab.png',
    fit: 'cover',
  },
  mit: {
    name: 'Massachusetts Institute of Technology',
    short: 'AI Venture Studio',
    logo: '/images/logos/mit.svg',
  },
  'mit-media-lab': {
    name: 'MIT Media Lab',
    short: 'Media Lab',
    logo: '/images/logos/mit-media-lab.png',
    fit: 'cover',
  },
  'tsinghua-sigs': {
    name: 'Tsinghua Shenzhen International Graduate School',
    short: '数据与信息学院',
    logo: '/images/logos/tsinghua.png',
  },
  ubc: {
    name: 'University of British Columbia',
    short: 'UBC Sauder',
    logo: '/images/logos/ubc.png',
    fit: 'cover',
  },
  uoft: {
    name: 'University of Toronto',
    short: 'U of T',
    logo: '/images/logos/uoft.png',
  },
  accenture: {
    name: 'Accenture',
    short: 'Accenture',
    logo: '/images/logos/accenture.svg',
  },
  wyloo: {
    name: 'Wyloo Metals',
    short: 'Wyloo',
    logo: '/images/logos/wyloo.svg',
    fit: 'cover',
  },
  hirebeat: {
    name: 'HireBeat',
    short: 'HireBeat',
    logo: '/images/logos/hirebeat.png',
    fit: 'cover',
  },
  // No logo on purpose: a small company whose mark could not be verified.
  usingai: {
    name: 'UsingAI',
    short: 'UsingAI',
  },
  // A competition, not an employer, so it gets a trophy rather than Google's logo.
  'google-hackathon': {
    name: 'Google Hackathon 2024',
    short: 'Google Hackathon',
    icon: 'trophy',
  },
} satisfies Record<string, Org>;

export type OrgId = keyof typeof registry;

export const getOrg = (id: OrgId): Org => registry[id];
