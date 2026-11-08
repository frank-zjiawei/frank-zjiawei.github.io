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
      'Built a multimodal learning analytics dataset for learners across three semesters by integrating pose-derived behavioral traces, peer-interaction records, survey responses, and weekly reflections into a unified student-level data structure.',
      "Operationalized Bandura's four sources of self-efficacy into behavioral and survey indicators, then applied clustering, statistical tests, and cohort diagnostics to identify learner profiles and test their relationships with self-efficacy and belonging.",
      'Translated the resulting profiles into hypotheses for personalized feedback and learning support; audited engineered variables against raw files, identified a cohort-level inconsistency, and validated analyses for research implications.',
      'Contribute to design-based research in the lab, deploying faculty-led AI learning tools into classroom settings and supporting data collection for ongoing studies.',
    ],
    tags: ['Learning Analytics', 'Self-efficacy', 'MMLA'],
  },
  {
    id: 'tsinghua',
    lab: 'Tsinghua Shenzhen International Graduate School (Tsinghua-SIGS)',
    role: 'Research Assistant',
    location: 'Shenzhen, China',
    period: 'Sept 2024 – Aug 2025',
    bullets: [
      'Developed an 8-module evaluation framework covering 120+ standards for a multimodal LLM testing platform, identifying 29 missing and 18 conflicting criteria and translating the audit into model-training and retrieval recommendations.',
      'Collaborated with engineering researchers on OldPilot, a multimodal decision-agent system for older-adult mobility; translated route-safety and mobility constraints into user-facing logic and led field testing that surfaced usability gaps for iterative product improvements.',
      'Led field testing and iterative improvements to refine system functionalities.',
    ],
    tags: ['Agents', 'Evaluation', 'HCI'],
  },
  {
    id: 'usingai',
    lab: 'UsingAI',
    role: 'AI Researcher',
    location: 'Shenzhen, China',
    period: 'Aug 2024 – Mar 2025',
    bullets: [
      'Enhanced YOLOv8 for real-time splitter port detection, achieving 98.55% accuracy in high-concurrency environments.',
      'Worked with the technical team to improve YOLOv8-based detection performance, helping evaluate model outputs, error cases, and user-facing reliability requirements.',
      'Coordinated preprocessing, training, fine-tuning, and validation workflows with the engineering team, helping move the model from experimentation toward practical implementation.',
    ],
    tags: ['Computer Vision', 'Deep Learning'],
  },
];
