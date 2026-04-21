export interface ResearchPosition {
  id: string;
  lab: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export const research: ResearchPosition[] = [
  {
    id: 'harvard-gse',
    lab: 'Harvard Graduate School of Education · Learning Innovation and Technology Lab',
    role: 'Research Assistant',
    location: 'Cambridge, MA',
    period: 'Feb 2026 – Present',
    bullets: [
      'Independent project on individual differences in makerspace learning across 3 cohorts (56 students), integrating multimodal behavioral, interaction, and survey data into a unified longitudinal dataset.',
      "Theory-driven analytical framework based on Bandura's self-efficacy model, combining K-means clustering with ANOVA / t-tests to identify student profiles and link behavioral patterns to changes in self-efficacy and sense of belonging.",
      'Audited data quality by tracing variables to source files, caught a calculation inconsistency in one cohort and re-ran analyses for reliable evidence-based interpretation.',
    ],
    tags: ['Learning Analytics', 'Clustering', 'Self-efficacy'],
  },
  {
    id: 'tsinghua',
    lab: 'Tsinghua Shenzhen International Graduate School (Tsinghua-SIGS)',
    role: 'Research Assistant',
    location: 'Shenzhen, China',
    period: 'Sept 2024 – Aug 2025',
    bullets: [
      'Developed optimization algorithms for the "OldPilot" system — elderly mobility and safety through personalized routing and real-time health monitoring.',
      'Contributed to spatiotemporal multimodal decision agents optimizing path safety and efficiency under dynamic constraints.',
      'Led field testing and iterative refinement of system functionalities.',
    ],
    tags: ['Agents', 'Optimization', 'HCI'],
  },
  {
    id: 'usingai',
    lab: 'UsingAI',
    role: 'AI Engineer',
    location: 'Shenzhen, China',
    period: 'Aug 2024 – Mar 2025',
    bullets: [
      'Enhanced YOLOv8 for real-time splitter port detection, 98.55% accuracy in high-concurrency environments.',
      'Lightweight network architecture and attention mechanisms reducing latency to milliseconds.',
      'Owned data preprocessing, training, and fine-tuning in collaboration with the model team.',
    ],
    tags: ['Computer Vision', 'Deep Learning'],
  },
];
