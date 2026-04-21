export interface Project {
  id: string;
  category: 'ai' | 'analytics';
  title: string;
  org: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  metric?: string;
  link?: { href: string; label: string };
}

export const projects: Project[] = [
  {
    id: 'yolov8',
    category: 'ai',
    title: 'Improved YOLOv8 for real-time object detection',
    org: 'UsingAI',
    role: 'AI Engineer',
    location: 'Shenzhen, China',
    period: 'Aug 2024 – Mar 2025',
    summary:
      'Enhanced YOLOv8 for real-time splitter port detection in high-concurrency environments. Paper submitted to MDPI Electronics.',
    highlights: [
      'Achieved 98.55% detection accuracy under high-concurrency load.',
      'Designed lightweight network architecture and attention mechanisms.',
      'Reduced inference time to millisecond-level for real-time deployment.',
      'Owned data preprocessing, training, and fine-tuning pipelines.',
    ],
    stack: ['Python', 'PyTorch', 'YOLOv8', 'CUDA', 'Attention'],
    metric: '98.55% accuracy · ms-level latency',
  },
  {
    id: 'mit-venture',
    category: 'ai',
    title: 'AI Venture — shortlisted at MIT Media Lab Demo Day',
    org: 'MIT Media Lab · AI Venture Studio',
    role: 'Team Lead',
    location: 'Cambridge, MA',
    period: 'Aug 2024 – Dec 2025',
    summary:
      'Led an AI venture from concept to public demo, integrating agentic system design, user feedback, and rapid prototyping.',
    highlights: [
      'Shortlisted among peer teams for Media Lab Demo Day.',
      'Refined product strategy and technical narrative for public pitch.',
      'Drove integration of agentic systems with user research loops.',
    ],
    stack: ['Agentic systems', 'Prototyping', 'User research'],
  },
  {
    id: 'harvard-ilab',
    category: 'ai',
    title: 'Harvard President\'s Innovation Challenge — AI venture',
    org: 'Harvard Innovation Lab',
    role: 'Team Lead',
    location: 'Cambridge, MA',
    period: 'Dec 2025 – Present',
    summary:
      'Leading a cross-disciplinary team (engineers, finance, design) on an AI-driven innovation entering the Harvard President\'s Innovation Challenge.',
    highlights: [
      'Defined problem scope, user needs, and venture positioning.',
      'Drove concept development from framing to prototype to pitch.',
      'Coordinated timelines and decision-making across disciplines.',
    ],
    stack: ['Product strategy', 'Prototyping', 'Pitching'],
  },
  {
    id: 'wyloo',
    category: 'analytics',
    title: 'Document architecture & meeting automation for enterprise search',
    org: 'Wyloo Metals',
    role: 'Data Analyst Co-op',
    location: 'Toronto, CA',
    period: 'May 2024 – Aug 2024',
    summary:
      'Oversaw document architecture for enterprise chatbot and search initiatives, delivered an MVP plan, and built Python automation for meetings.',
    highlights: [
      'Delivered MVP plan with resource allocation and risk mitigation.',
      'Python-based meeting documentation automation → 50% efficiency gain.',
      'Resolved data quality issues in Databricks with cross-functional teams.',
    ],
    stack: ['Python', 'Databricks', 'Agile / JIRA'],
    metric: '+50% operational efficiency',
  },
  {
    id: 'hirebeat',
    category: 'analytics',
    title: 'HR analytics & performance review tool',
    org: 'HireBeat',
    role: 'Business & Data Analyst Intern',
    location: 'New York, US',
    period: 'Jul 2023 – Nov 2023',
    summary:
      'Built Power BI dashboards tracking engagement and turnover, and shipped a self-assessment feature that cut review cycle time by 30%.',
    highlights: [
      '-15% employee turnover via targeted retention signals.',
      '-30% review cycle time through self-assessment tool.',
      '-25% onboarding time with a digital checklist.',
    ],
    stack: ['Power BI', 'SQL', 'Agile / JIRA'],
    metric: '-15% turnover · -30% review time',
  },
  {
    id: 'accenture',
    category: 'analytics',
    title: 'Sales BI dashboard & enterprise data warehouse',
    org: 'Accenture Strategy & Consulting',
    role: 'Business Analyst Intern',
    location: 'Shanghai, China',
    period: 'May 2022 – Jul 2022',
    summary:
      'Built a sales performance dashboard and helped design a client-facing data warehouse with proper SCDs.',
    highlights: [
      'SQL + Power BI dashboard → 40% reduction in manual processing.',
      'Defined fact/dimension tables and Type 1 & 2 slowly changing dimensions.',
      'Accelerated BI adoption across departments.',
    ],
    stack: ['SQL', 'Power BI', 'Data modeling'],
    metric: '-40% manual processing',
  },
  {
    id: 'google-hackathon',
    category: 'analytics',
    title: 'Google Hackathon 2024 — 3rd place',
    org: 'Google · Vancouver',
    role: 'Team Lead',
    location: 'Vancouver, Canada',
    period: 'Jan 2023 – Mar 2024',
    summary:
      'Designed an E-commerce dashboard integrating real-time analytics for web, customer, product, and logistics signals.',
    highlights: [
      'BigQuery-backed warehouse unifying multi-source data.',
      'Hyper-personalized marketing automation with Gemini + Google Analytics.',
      'Democratized insights across technical and non-technical stakeholders.',
    ],
    stack: ['BigQuery', 'Gemini', 'Google Analytics', 'Looker'],
    metric: '3rd place — team lead',
  },
];
