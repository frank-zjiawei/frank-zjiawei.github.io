export type PublicationStatus =
  | 'published'
  | 'under-review'
  | 'in-preparation'
  | 'working-paper';

export interface Publication {
  id: number;
  year: number;
  authors: string;
  title: string;
  venue?: string;
  status: PublicationStatus;
  award?: string;
  pdf?: string;
  awardImage?: string;
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: 1,
    year: 2026,
    authors:
      'H. Zhou, S. Li, J. Qin, J. W. Zhang, Z. Di, L. Jia, and G. Wang',
    title:
      'Multi-Agent Collaborative Learning with Multimodal Foundation Models for Cross-Modal AVI Assessment',
    venue: 'ACM Multimedia 2026 · AVI Grand Challenge',
    status: 'published',
    award: 'First Prize',
    pdf: '/papers/MultiAgent_AVI_ACMMM2026.pdf',
    awardImage: '/images/awards/acm-mm-2026-first-prize.jpg',
    tags: ['Multimodal', 'Multi-Agent', 'AVI Assessment'],
  },
  {
    id: 2,
    year: 2026,
    authors:
      'X. Guo, L. Jia, J. W. Zhang, Z. Li, J. Qin, L. Zhang, Z. Di, and G. Wang',
    title:
      'ActiveVideoAgent: Agent-Driven Spatio-Temporal Indexing for Long Video Reasoning',
    venue:
      'IEEE 15th Image, Video, and Multidimensional Signal Processing Workshop (IVMSP 2026), Shenzhen, China',
    status: 'published',
    award: 'Best Paper Runner-Up Award',
    pdf: '/papers/ActiveVideoAgent_IVMSP2026.pdf',
    awardImage: '/images/awards/ivmsp-2026-best-paper-runner-up.jpg',
    tags: ['Video QA', 'Agents', 'RAG'],
  },
  {
    id: 3,
    year: 2026,
    authors: 'J. W. Zhang, J. Basmaci, and B. Schneider',
    title:
      'Individual Differences in Makerspace Learning: Pose-Based Student Profiles and Their Relation to Self-Efficacy',
    venue: 'Manuscript under review at Learning and Individual Differences, 2026',
    status: 'under-review',
    tags: ['Learning Analytics', 'Self-efficacy', 'Makerspace'],
  },
  {
    id: 4,
    year: 2026,
    authors:
      'X. Chang, J. W. Zhang, S. Yu, Z. Ma, F. Hao, Z. Su, G. Wang, and D. Jiang',
    title:
      'LifeMenu: A Lifestyle-Medicine-Oriented System for Menu-Grounded Restaurant Ordering',
    venue: 'Submitted to EMNLP 2026 System Demonstration Track · Under review',
    status: 'under-review',
    tags: ['NLP', 'Recommendation', 'System Demo'],
  },
  {
    id: 5,
    year: 2027,
    authors: 'J. W. Zhang et al.',
    title:
      'Projective Probing: Measuring Generative Fixation and Session-Level Diversity in Aligned Language Models',
    venue: 'Manuscript in preparation for ACL 2027',
    status: 'in-preparation',
    tags: ['LLMs', 'Evaluation', 'Diversity'],
  },
  {
    id: 6,
    year: 2024,
    authors: 'J. W. Zhang',
    title:
      'Optimizing Supply Chain Hubs for Global Humanitarian Logistics Using Network Flow and Linear Programming',
    status: 'working-paper',
    tags: ['Operations Research', 'Optimization'],
  },
  {
    id: 7,
    year: 2024,
    authors: 'J. W. Zhang, X. Zhang, X. Lyu, Y. Yang, Y. Wang, and Z. Gu',
    title:
      'Optimizing U.S. Investment Portfolios Using CAPM and Linear Programming: A Debt-to-Equity Analysis Across Industries',
    status: 'working-paper',
    tags: ['Finance', 'Optimization'],
  },
  {
    id: 8,
    year: 2023,
    authors: 'J. W. Zhang, X. Shen, Y. Wang, and Y. Wang',
    title:
      'Optimizing Coffee Bean Sales Strategy for B2C Company Bean Symphony through Data Analytics and Visualization',
    status: 'working-paper',
    tags: ['Data Analytics', 'Visualization'],
  },
];

export const STATUS_LABEL: Record<PublicationStatus, string> = {
  published: 'Published',
  'under-review': 'Under review',
  'in-preparation': 'In preparation',
  'working-paper': 'Working paper',
};
