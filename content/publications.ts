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
  /** Short title shown on the book cover */
  shortTitle: string;
  venue?: string;
  status: PublicationStatus;
  award?: string;
  pdf?: string;
  awardImage?: string;
  cover?: string;
  figures?: string[];
  tags: string[];
  /** Soft accent for typographic covers when no figure cover exists */
  coverTone?: 'ink' | 'wine' | 'forest' | 'slate' | 'clay' | 'navy';
}

export const publications: Publication[] = [
  {
    id: 1,
    year: 2026,
    authors:
      'H. Zhou, S. Li, J. Qin, J. W. Zhang, Z. Di, L. Jia, and G. Wang',
    title:
      'Multi-Agent Collaborative Learning with Multimodal Foundation Models for Cross-Modal AVI Assessment',
    shortTitle: 'Multi-Agent AVI Assessment',
    venue: 'ACM Multimedia 2026 · AVI Grand Challenge',
    status: 'published',
    award: 'First Prize',
    pdf: '/papers/MultiAgent_AVI_ACMMM2026.pdf',
    awardImage: '/images/awards/acm-mm-2026-first-prize.jpg',
    cover: '/images/papers/avi-cover.jpg',
    figures: ['/images/papers/avi-fig2.jpg'],
    tags: ['Multimodal', 'Multi-Agent', 'AVI'],
    coverTone: 'navy',
  },
  {
    id: 2,
    year: 2026,
    authors:
      'X. Guo, L. Jia, J. W. Zhang, Z. Li, J. Qin, L. Zhang, Z. Di, and G. Wang',
    title:
      'ActiveVideoAgent: Agent-Driven Spatio-Temporal Indexing for Long Video Reasoning',
    shortTitle: 'ActiveVideoAgent',
    venue:
      'IEEE IVMSP 2026, Shenzhen, China',
    status: 'published',
    award: 'Best Paper Runner-Up',
    pdf: '/papers/ActiveVideoAgent_IVMSP2026.pdf',
    awardImage: '/images/awards/ivmsp-2026-best-paper-runner-up.jpg',
    cover: '/images/papers/ava-cover.jpg',
    figures: [
      '/images/papers/ava-fig2.jpg',
      '/images/papers/ava-fig3.jpg',
    ],
    tags: ['Video QA', 'Agents', 'RAG'],
    coverTone: 'slate',
  },
  {
    id: 3,
    year: 2026,
    authors: 'J. W. Zhang, J. Basmaci, and B. Schneider',
    title:
      'Individual Differences in Makerspace Learning: Pose-Based Student Profiles and Their Relation to Self-Efficacy',
    shortTitle: 'Makerspace Self-Efficacy',
    venue: 'Under review · Learning and Individual Differences',
    status: 'under-review',
    cover: '/images/papers/makerspace-cover.jpg',
    tags: ['Learning Analytics', 'Self-efficacy'],
    coverTone: 'forest',
  },
  {
    id: 4,
    year: 2026,
    authors:
      'X. Chang, J. W. Zhang, S. Yu, Z. Ma, F. Hao, Z. Su, G. Wang, and D. Jiang',
    title:
      'LifeMenu: A Lifestyle-Medicine-Oriented System for Menu-Grounded Restaurant Ordering',
    shortTitle: 'LifeMenu',
    venue: 'Under review · EMNLP 2026 System Demo',
    status: 'under-review',
    cover: '/images/papers/lifemenu-cover.jpg',
    tags: ['NLP', 'Recommendation'],
    coverTone: 'clay',
  },
  {
    id: 5,
    year: 2027,
    authors: 'J. W. Zhang et al.',
    title:
      'Projective Probing: Measuring Generative Fixation and Session-Level Diversity in Aligned Language Models',
    shortTitle: 'Projective Probing',
    venue: 'In preparation · ACL 2027',
    status: 'in-preparation',
    cover: '/images/papers/probing-cover.jpg',
    tags: ['LLMs', 'Evaluation'],
    coverTone: 'wine',
  },
  {
    id: 6,
    year: 2024,
    authors: 'J. W. Zhang',
    title:
      'Optimizing Supply Chain Hubs for Global Humanitarian Logistics Using Network Flow and Linear Programming',
    shortTitle: 'Supply Chain Hubs',
    status: 'working-paper',
    tags: ['Operations Research'],
    coverTone: 'ink',
  },
  {
    id: 7,
    year: 2024,
    authors: 'J. W. Zhang, X. Zhang, X. Lyu, Y. Yang, Y. Wang, and Z. Gu',
    title:
      'Optimizing U.S. Investment Portfolios Using CAPM and Linear Programming: A Debt-to-Equity Analysis Across Industries',
    shortTitle: 'Portfolio Optimization',
    status: 'working-paper',
    tags: ['Finance'],
    coverTone: 'navy',
  },
  {
    id: 8,
    year: 2023,
    authors: 'J. W. Zhang, X. Shen, Y. Wang, and Y. Wang',
    title:
      'Optimizing Coffee Bean Sales Strategy for B2C Company Bean Symphony through Data Analytics and Visualization',
    shortTitle: 'Bean Symphony',
    status: 'working-paper',
    tags: ['Data Analytics'],
    coverTone: 'clay',
  },
];

export const STATUS_LABEL: Record<PublicationStatus, string> = {
  published: 'Published',
  'under-review': 'Under review',
  'in-preparation': 'In preparation',
  'working-paper': 'Working paper',
};
