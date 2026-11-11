/**
 * Who Jiawei is, in one place. The home page, About page, footer, command
 * menu, and page metadata all read from here so they cannot drift apart.
 * Facts follow the current CV; edit the wording here, not in the components.
 */

export const profile = {
  name: 'Jiawei Zhang',
  preferredName: 'Frank',
  pronunciation: 'Jee-ah-way Jahng',
  location: 'Cambridge, MA',

  /** Shown above the name on the home page and on the About page. */
  interests: [
    'AI in Education',
    'Learning Sciences',
    'Learning Analytics',
    'Multimodal AI',
    'AI Evaluation',
  ],

  /** The one sentence a reader should leave with. */
  statement:
    'I study how AI can make hands-on learning visible, and how to turn what it sees into feedback learners can actually use.',

  intro:
    'I am a research assistant in the Learning Innovation and Technology Lab at the Harvard Graduate School of Education, working with Prof. Bertrand Schneider. My work combines multimodal learning analytics with LLM-based tools: from pose-based learner profiles in makerspaces to an AI teaching fellow that gives students weekly, theory-grounded feedback.',

  metaDescription:
    'Jiawei Zhang is a research assistant at the Harvard Graduate School of Education’s Learning Innovation and Technology Lab, working on multimodal learning analytics and LLM-based feedback for hands-on learning.',

  email: 'frankwei312@gmail.com',
  links: {
    scholar: 'https://scholar.google.com/citations?user=iy7QXcAAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/frank-zhang-7a8944198/',
    github: 'https://github.com/frank-zjiawei',
    instagram: 'https://www.instagram.com/frankjiaweizhang/',
  },
  cv: {
    en: '/cv/Jiawei_Zhang_CV_EN.pdf',
    cn: '/cv/Jiawei_Zhang_CV_CN.pdf',
  },
} as const;

export interface ResearchThread {
  id: string;
  title: string;
  body: string;
  link: { href: string; label: string };
}

/** The three strands of work, ordered from most to least education-facing. */
export const researchThreads: ResearchThread[] = [
  {
    id: 'learning-analytics',
    title: 'Multimodal learning analytics',
    body: 'What can movement and interaction reveal about how a learner is doing? In makerspace courses, I build learner profiles from pose data and relate them to self-efficacy, using clustering and Ordered Network Analysis grounded in Bandura’s theory.',
    link: {
      href: '/research#paper-5',
      label: 'First-author paper, under review at Computers & Education',
    },
  },
  {
    id: 'ai-feedback',
    title: 'AI feedback for learners',
    body: 'I designed and prototyped an LLM-based AI Teaching Fellow and learning dashboard that give 22 students in a Harvard makerspace course weekly personalized feedback, delivered as written letters, annotated project photos, and growth charts.',
    link: {
      href: '/experience#hgse-lit',
      label: 'Research at the Learning Innovation and Technology Lab',
    },
  },
  {
    id: 'multimodal-ai',
    title: 'Multimodal and agentic AI',
    body: 'With collaborators at Tsinghua Shenzhen International Graduate School, I work on agents that reason over long videos and assess multimodal interviews. I am also preparing a study of generative fixation and session-level diversity in language models.',
    link: {
      href: '/research',
      label: 'Two award-winning papers and manuscripts under review',
    },
  },
];

export interface Honor {
  title: string;
  detail: string;
  year: string;
}

export const honors: Honor[] = [
  {
    title: 'First Prize, AVI Grand Challenge',
    detail: 'ACM Multimedia 2026',
    year: '2026',
  },
  {
    title: 'Best Paper Runner-Up Award',
    detail: 'IEEE IVMSP 2026',
    year: '2026',
  },
  {
    title: 'Semi-finalist, Harvard President’s Innovation Challenge',
    detail: 'Team lead',
    year: '2025–26',
  },
  {
    title: 'Shortlisted, MIT Media Lab AI Venture Demo Day',
    detail: 'Team lead',
    year: '2025',
  },
  {
    title: 'Third Place, Google Hackathon',
    detail: 'Vancouver · Team lead',
    year: '2024',
  },
  {
    title: 'High Distinction',
    detail: 'University of Toronto · Dean’s List Scholar, 2021–2023',
    year: '2023',
  },
];
