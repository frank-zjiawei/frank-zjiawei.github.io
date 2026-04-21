export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
  body: string;
}

export const posts: JournalPost[] = [
  {
    slug: 'why-a-graph-for-a-portfolio',
    title: 'Why a graph for a portfolio',
    date: '2026-04-16',
    readingMinutes: 4,
    tags: ['Design', 'Learning'],
    excerpt:
      'Most portfolios are linear. My work is not. A knowledge graph felt closer to how I actually think about what I do.',
    body: `Most portfolios are organized like a CV: roles in reverse chronological order, each a silo. That framing has never described how I work. A computer-vision model for a Chinese AI lab, a learning analytics study at Harvard GSE, and an AI venture pitched at the MIT Media Lab are not separate things that happen to share a person. They are overlapping responses to a single question — how do humans and intelligent systems learn together?

A graph made the answer visible. Every node is a project, a lab, a paper, a class. Every edge is a relationship I actually feel: my Harvard i-Lab team inherits from the MIT Media Lab venture I led last year; my work at UsingAI is mechanically related to the YOLOv8 paper; the learning analytics research at Harvard GSE shares methods with the hackathon we built at Google.

Linear resumes hide these edges. A graph foregrounds them.

I also wanted the navigation itself to be part of the message. If you come here as a recruiter looking for ML experience, you can click "AI" and walk the subtree. If you come here as a fellow researcher, you might follow a different chain — from publications to labs to courses to blog posts — that tells a subtler story. Either path is legitimate.

The implementation is a lightweight force-directed canvas. It is not meant to impress; it is meant to get out of the way.`,
  },
  {
    slug: 'cv-to-substance',
    title: 'From a CV line to substance',
    date: '2026-03-02',
    readingMinutes: 6,
    tags: ['Writing', 'Learning'],
    excerpt:
      'Every line on a CV hides three months of work. A portfolio is where that work gets to breathe.',
    body: `"YOLOv8 at 98.55% accuracy" is one line on a CV. It took the better part of a year. The portfolio is where that year gets room to breathe — the dataset decisions, the attention module experiments, the trade-offs between latency and accuracy, the parts that did not work.

I want this site to become a living archive of those back-stories, not a billboard.

So I am writing them down, slowly, one project at a time.`,
  },
];
