/**
 * Experience entries, grouped the way the CV groups them:
 * research → professional → leadership. Wording follows the current CV.
 *
 * `id` doubles as the URL anchor (/experience#<id>) and is referenced by the
 * navigation graph in content/graph.ts — keep ids stable when editing.
 */

export type ExperienceCategory = 'research' | 'professional' | 'leadership';

export interface ExperienceLink {
  /** Site path (starts with "/") or an external URL. */
  href: string;
  label: string;
}

export interface Project {
  id: string;
  category: ExperienceCategory;
  title: string;
  org: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  metric?: string;
  links?: ExperienceLink[];
}

export const CATEGORY_LABEL: Record<ExperienceCategory, string> = {
  research: 'Research',
  professional: 'Professional',
  leadership: 'Leadership & Ventures',
};

export const projects: Project[] = [
  // ───────────────────────────── Research ─────────────────────────────
  {
    id: 'hgse-lit',
    category: 'research',
    title: 'Multimodal learning analytics and an AI Teaching Fellow for makerspace learning',
    org: 'Harvard Graduate School of Education · Learning Innovation and Technology Lab',
    role: 'Research Assistant',
    location: 'Cambridge, MA',
    period: 'Feb 2026 – Present',
    summary:
      'Studying how students learn in makerspace courses with Prof. Bertrand Schneider, and building AI tools that turn those findings into personalized feedback.',
    highlights: [
      'Showed that two pose-based learner profiles jointly relate to makerspace students’ self-efficacy more strongly than either alone, using clustering and Ordered Network Analysis grounded in Bandura’s theory.',
      'Led the resulting first-author paper with Prof. Bertrand Schneider (under review at Computers & Education), auditing the data pipeline back to raw files and resolving a cohort-level inconsistency before submission.',
      'Designed and prototyped, end to end, an LLM-based AI Teaching Fellow and learning dashboard that give 22 students in a Harvard makerspace course weekly personalized, theory-grounded feedback.',
      'Delivered the feedback across media (written letters, annotated project photos, growth charts) by combining student reflections and surveys with pose-based and interpersonal-synchrony signals, iterating weekly with the instructor.',
    ],
    stack: [
      'Multimodal learning analytics',
      'Ordered Network Analysis',
      'Clustering',
      'LLM feedback',
      'Python · R',
    ],
    links: [
      { href: '/research#paper-5', label: 'Read the paper' },
      { href: 'https://lit.gse.harvard.edu/', label: 'LIT Lab' },
    ],
  },
  {
    id: 'tsinghua-sigs',
    category: 'research',
    title: 'Multimodal decision agents and long-video reasoning',
    org: 'Tsinghua Shenzhen International Graduate School',
    role: 'Research Assistant',
    location: 'Shenzhen, China',
    period: 'Sept 2024 – Aug 2025',
    summary:
      'Research on spatiotemporal multimodal agents, from a mobility system for older adults to agents that reason over long videos.',
    highlights: [
      'Developed optimization algorithms for the “OldPilot” system, improving elderly mobility and safety through personalized route planning and real-time health monitoring.',
      'Contributed to the design and implementation of spatiotemporal multimodal decision agents, optimizing path safety and efficiency under dynamic constraints.',
      'Led field testing and iterative improvements to refine system functionalities.',
      'Co-authored four papers with lab collaborators on long-video reasoning (IEEE IVMSP 2026 Best Paper Runner-Up), multimodal interview assessment (ACM Multimedia 2026 Grand Challenge First Prize), and distributed acoustic sensing.',
    ],
    stack: ['Multimodal agents', 'Video reasoning', 'Optimization', 'Field testing'],
    links: [
      { href: '/research#paper-2', label: 'ActiveVideoAgent' },
      { href: '/research#paper-1', label: 'AVI assessment' },
      { href: 'https://www.sigs.tsinghua.edu.cn/en/', label: 'Tsinghua SIGS' },
    ],
  },
  {
    id: 'yolov8',
    category: 'research',
    title: 'Improved YOLOv8 for real-time object detection',
    org: 'UsingAI',
    role: 'AI Engineer',
    location: 'Shenzhen, China',
    period: 'Aug 2024 – Mar 2025',
    summary:
      'Improved a YOLOv8 detector for real-time splitter-port detection and helped move it from experimentation toward deployment.',
    highlights: [
      'Enhanced YOLOv8 for real-time splitter port detection, achieving 98.55% accuracy in high-concurrency environments.',
      'Worked with the technical team to improve detection performance, helping evaluate model outputs, error cases, and user-facing reliability requirements.',
      'Supported iteration on lightweight model design and attention-mechanism experiments to improve detection precision and processing speed for real-time use.',
      'Coordinated preprocessing, training, fine-tuning, and validation workflows with the engineering team.',
    ],
    stack: ['Computer vision', 'YOLOv8', 'PyTorch'],
    metric: '98.55% detection accuracy',
  },

  // ─────────────────────────── Professional ───────────────────────────
  {
    id: 'hbs-foundry',
    category: 'professional',
    title: 'Founder signals, evaluation research, and partnership analytics',
    org: 'Harvard Business School · Foundry',
    role: 'Business Development & Research Analytics Fellow',
    location: 'Boston, MA',
    period: '2026 – Present',
    summary:
      'Research analytics and business development for Harvard Business School’s AI-native venture-building platform.',
    highlights: [
      'Partner with Prof. Tom Eisenmann to identify early signals of high-potential founders in the Catalyst program by analyzing founder and evaluation data, including when and why AI and human reviewers disagree.',
      'Synthesize Prof. Eisenmann’s founder office-hour transcripts into structured profiles (venture, founder traits, gaps, mentor fit) that the program team uses to track and support each founder.',
      'Built the B2B partnership pipeline and board-meeting dashboard for university programs (stage funnel, conversion metrics, regional coverage map), automating weekly updates with Office Scripts and Power Automate.',
    ],
    stack: ['Evaluation research', 'Human–AI judgment', 'Analytics', 'Partnerships'],
    links: [{ href: 'https://hbsfoundry.org/', label: 'Foundry' }],
  },
  {
    id: 'wyloo',
    category: 'professional',
    title: 'Document architecture and meeting automation for enterprise search',
    org: 'Wyloo Metals',
    role: 'Data Analyst Co-op',
    location: 'Toronto, ON',
    period: 'May 2024 – Aug 2024',
    summary:
      'Oversaw document architecture for chatbot and enterprise-search initiatives and automated meeting documentation.',
    highlights: [
      'Used Agile project management to oversee document architecture for chatbot and enterprise search initiatives, delivering an MVP plan, and resolved data quality issues in Databricks with cross-functional teams.',
      'Developed a Python-based automation system for meeting documentation, enhancing operational efficiency by 50% and providing critical data for AI tool development.',
    ],
    stack: ['Python', 'Databricks', 'Agile'],
    metric: '+50% operational efficiency',
    links: [{ href: 'https://wyloo.com/', label: 'Wyloo' }],
  },
  {
    id: 'hirebeat',
    category: 'professional',
    title: 'HR analytics and a performance-review tool',
    org: 'HireBeat',
    role: 'Business & Data Analyst Intern',
    location: 'New York, NY',
    period: 'Jul 2023 – Nov 2023',
    summary:
      'Built engagement and turnover dashboards and shipped review and onboarding features.',
    highlights: [
      'Developed Power BI dashboards to track employee engagement and turnover, identifying trends and enabling targeted retention strategies that reduced turnover by 15%.',
      'Delivered a performance review feature through Agile sprints in JIRA and launched a self-assessment tool that cut review cycle time by 30%.',
      'Implemented a digital onboarding checklist, reducing onboarding time by 25%.',
    ],
    stack: ['Power BI', 'SQL', 'JIRA'],
    metric: '−15% turnover · −30% review time',
    links: [{ href: 'https://hirebeat.co/', label: 'HireBeat' }],
  },
  {
    id: 'accenture',
    category: 'professional',
    title: 'Sales dashboard and enterprise data warehouse',
    org: 'Accenture Strategy & Consulting',
    role: 'Business Analyst Intern',
    location: 'Shanghai, China',
    period: 'May 2022 – Jul 2022',
    summary:
      'Built a sales performance dashboard and supported the design of an enterprise data warehouse.',
    highlights: [
      'Built a sales performance dashboard using SQL and Power BI, automating data aggregation and reducing manual processing time by 40%, accelerating BI adoption across departments.',
      'Supported the design of an enterprise data warehouse, defining fact and dimension tables with client partners and implementing Type 1 & 2 slowly changing dimensions.',
    ],
    stack: ['SQL', 'Power BI', 'Data modeling'],
    metric: '−40% manual processing',
  },

  // ────────────────────── Leadership & ventures ──────────────────────
  {
    id: 'harvard-ilab',
    category: 'leadership',
    title: 'Harvard President’s Innovation Challenge — semi-finalist',
    org: 'Harvard Innovation Labs',
    role: 'Team Lead',
    location: 'Cambridge, MA',
    period: 'Dec 2025 – Present',
    summary:
      'Leading a cross-disciplinary team, from financial experts to engineers, on an AI-driven innovation project.',
    highlights: [
      'Led and organized the team to define problem scope, user needs, and venture positioning.',
      'Drove end-to-end concept development, from problem framing and prototyping to pitch refinement for competition review; selected as a semi-finalist.',
    ],
    stack: ['Team leadership', 'Prototyping', 'Pitching'],
    metric: 'Semi-finalist',
    links: [
      { href: 'https://innovationlabs.harvard.edu/', label: 'Harvard Innovation Labs' },
    ],
  },
  {
    id: 'mit-venture',
    category: 'leadership',
    title: 'MIT Media Lab AI Venture Demo Day — shortlisted',
    org: 'MIT Media Lab · AI Venture Studio',
    role: 'Team Lead',
    location: 'Cambridge, MA',
    period: 'Aug 2024 – Dec 2025',
    summary:
      'Led an AI venture from concept to demo, integrating agentic system design, user feedback, and rapid prototyping.',
    highlights: [
      'Shortlisted among peer teams for the public Demo Day presentation.',
      'Refined the technical narrative and product strategy for the pitch.',
    ],
    stack: ['Agentic systems', 'Prototyping', 'User research'],
    metric: 'Shortlisted',
    links: [{ href: 'https://www.media.mit.edu/', label: 'MIT Media Lab' }],
  },
  {
    id: 'google-hackathon',
    category: 'leadership',
    title: 'Google Hackathon 2024 — third place',
    org: 'Google · Vancouver',
    role: 'Team Lead',
    location: 'Vancouver, BC',
    period: 'Jan 2023 – Mar 2024',
    summary:
      'Designed an e-commerce dashboard integrating real-time analytics for web, customer, product, and logistics data on Google Cloud.',
    highlights: [
      'Built on BigQuery, simplifying complex datasets into actionable insights.',
      'Consolidated multi-source data into a unified warehouse to improve cross-platform analysis.',
      'Used AI for hyper-personalized marketing and automated real-time insights for technical and non-technical stakeholders by integrating Gmail, Google Analytics, and Gemini.',
    ],
    stack: ['BigQuery', 'Gemini', 'Google Analytics'],
    metric: 'Third place',
  },
  {
    id: 'ubc-council',
    category: 'leadership',
    title: 'Supporting 100+ international students through their transition',
    org: 'UBC Sauder Student Council · Master of Business Analytics',
    role: 'Vice President of International',
    location: 'Vancouver, BC',
    period: 'Aug 2023 – May 2024',
    summary:
      'Represented and supported international students in the Master of Business Analytics cohort.',
    highlights: [
      'Supported 100+ international students by holding seminars for smooth cultural transitions.',
      'Coordinated major cultural events and career sessions, fostering community engagement and professional growth.',
      'Eased work overload and conflicts during high-pressure periods by planning activities such as beach outings, hiking trips, and boxing sessions.',
    ],
    stack: ['Community', 'Event planning', 'Peer support'],
  },
];
