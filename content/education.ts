export interface School {
  id: string;
  school: string;
  degree: string;
  detail?: string;
  location: string;
  period: string;
  distinction?: string;
}

export const schools: School[] = [
  {
    id: 'harvard',
    school: 'Harvard Graduate School of Education',
    degree: 'Ed.M. in Learning Design, Innovation, and Technology',
    detail: 'CGPA 3.90 / 4.00 · Graduated',
    location: 'Cambridge, MA',
    period: 'Aug 2025 – Jun 2026',
  },
  {
    id: 'mit',
    school: 'Massachusetts Institute of Technology (MIT)',
    degree:
      'Cross-registered · AI Venture Studio & Sloan School of Management',
    detail: 'Completed',
    location: 'Cambridge, MA',
    period: 'Aug 2025 – Jun 2026',
  },
  {
    id: 'ubc',
    school: 'UBC Sauder School of Business',
    degree: 'Master of Business Analytics',
    detail: 'CGPA 3.70 / 4.00 · Graduated',
    location: 'Vancouver, BC',
    period: 'Aug 2023 – Aug 2024',
  },
  {
    id: 'uoft',
    school: 'University of Toronto',
    degree: 'Bachelor of Digital Enterprise Management',
    detail: 'CGPA 3.74 / 4.00',
    distinction: 'High Distinction · Graduated',
    location: 'Toronto, ON',
    period: 'Aug 2019 – Jun 2023',
  },
];
