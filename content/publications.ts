export type PublicationStatus =
  | 'published'
  | 'under-review'
  | 'ready-to-submit'
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
    venue: 'IEEE IVMSP 2026, Shenzhen, China',
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
    pdf: '/papers/Makerspace_SelfEfficacy_UnderReview.pdf',
    cover: '/images/papers/makerspace-cover.jpg',
    figures: [
      '/images/papers/makerspace-fig1.jpg',
      '/images/papers/makerspace-fig2.jpg',
    ],
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
    pdf: '/papers/LifeMenu_EMNLP2026_UnderReview.pdf',
    cover: '/images/papers/lifemenu-cover.jpg',
    figures: [
      '/images/papers/lifemenu-fig1.jpg',
      '/images/papers/lifemenu-fig2.jpg',
    ],
    tags: ['NLP', 'Recommendation'],
    coverTone: 'clay',
  },
  {
    id: 5,
    year: 2026,
    authors: 'J. W. Zhang et al.',
    title:
      'Distributed Acoustic Sensing for Integrated Sensing and Communication: Event Classification under Field Constraints',
    shortTitle: 'DAS Sensing',
    venue: 'Under review · Tsinghua-SIGS × industry collaboration',
    status: 'under-review',
    tags: ['DAS', 'Sensing', 'Signal Processing'],
    coverTone: 'slate',
  },
  {
    id: 6,
    year: 2027,
    authors: 'J. W. Zhang et al.',
    title:
      'Projective Probing: Measuring Generative Fixation and Session-Level Diversity in Aligned Language Models',
    shortTitle: 'Projective Probing',
    venue: 'Manuscript ready to submit · ACL 2027',
    status: 'ready-to-submit',
    pdf: '/papers/Projective_Probing_ACL2027_Ready.pdf',
    cover: '/images/papers/probing-cover.jpg',
    tags: ['LLMs', 'Evaluation'],
    coverTone: 'wine',
  },
  {
    id: 7,
    year: 2027,
    authors: 'Anonymous ACL submission',
    title:
      'Probability-Augmented Flowchart Prompting: A Bayesian Approach to Uncertainty-Aware Agent Workflows',
    shortTitle: 'PAFP',
    venue: 'Manuscript ready to submit · ACL',
    status: 'ready-to-submit',
    pdf: '/papers/PAFP_ACL_Ready.pdf',
    cover: '/images/papers/pafp-cover.jpg',
    tags: ['Agents', 'Bayesian', 'Prompting'],
    coverTone: 'navy',
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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
  'ready-to-submit': 'Ready to submit',
  'working-paper': 'Working paper',
};
