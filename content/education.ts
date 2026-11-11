import type { OrgId } from './orgs';

export interface School {
  id: string;
  /** Looked up in content/orgs.ts for the logo. */
  orgId: OrgId;
  school: string;
  /** Short name for compact lists */
  shortSchool: string;
  degree: string;
  detail?: string;
  location: string;
  period: string;
  /** Year range for compact lists */
  years: string;
  distinction?: string;
}

export const schools: School[] = [
  {
    id: 'harvard',
    orgId: 'harvard-gse',
    school: 'Harvard Graduate School of Education',
    shortSchool: 'Harvard University',
    degree: 'Ed.M. in Learning Design, Innovation, and Technology',
    detail: 'CGPA 3.90 / 4.00 · Graduated',
    location: 'Cambridge, MA',
    period: 'Aug 2025 – May 2026',
    years: '2025–26',
  },
  {
    id: 'mit',
    orgId: 'mit',
    school: 'Massachusetts Institute of Technology (MIT)',
    shortSchool: 'MIT',
    degree:
      'Cross-registered at MIT Media Lab AI Venture Studio and MIT Sloan School of Management',
    detail: 'Completed',
    location: 'Cambridge, MA',
    period: 'Aug 2025 – Jun 2026',
    years: '2025–26',
  },
  {
    id: 'ubc',
    orgId: 'ubc',
    school: 'UBC Sauder School of Business',
    shortSchool: 'University of British Columbia',
    degree: 'Master of Business Analytics',
    detail: 'CGPA 3.70 / 4.00 · Graduated',
    location: 'Vancouver, BC',
    period: 'Aug 2023 – Aug 2024',
    years: '2023–24',
  },
  {
    id: 'uoft',
    orgId: 'uoft',
    school: 'University of Toronto',
    shortSchool: 'University of Toronto',
    degree:
      'Honours Bachelor of Arts with High Distinction · Specialist in Digital Enterprise Management',
    detail: 'CGPA 3.74 / 4.00 · Graduated',
    distinction: 'Dean’s List Scholar, 2021–2023',
    location: 'Toronto, ON',
    period: 'Aug 2019 – Jun 2023',
    years: '2019–23',
  },
];
