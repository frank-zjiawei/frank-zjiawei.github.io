import { PageHeader } from '@/components/PageHeader';
import { schools } from '@/content/education';

export const metadata = {
  title: 'About',
  description:
    'About Frank (Jiawei) Zhang — Learning Designer, AI Engineer, Researcher.',
};

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: 'Programming',
    items: ['Python', 'SQL', 'R', 'Processing (Java)', 'Excel VBA', 'HTML / CSS / JS', 'Arduino'],
  },
  {
    group: 'AI / ML',
    items: ['PyTorch', 'YOLOv8', 'Agentic Systems', 'Attention', 'Fine-tuning'],
  },
  {
    group: 'Data',
    items: ['Power BI', 'Tableau', 'Looker', 'BigQuery', 'Databricks', 'MongoDB', 'CQL'],
  },
  {
    group: 'Design',
    items: ['Photoshop', 'Illustrator', 'Animate', 'Premiere', 'CorelDRAW'],
  },
  {
    group: 'Certificates',
    items: ['PMEC', 'Bloomberg BFF & BMC', 'Accenture Data Analytics'],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Frank (Jiawei) Zhang"
        description="I am a learning designer and AI engineer interested in how people and intelligent systems learn alongside each other. Currently at Harvard GSE, cross-registered at MIT Media Lab and Sloan."
      />

      <section className="container-prose pb-16">
        <div className="grid grid-cols-1 gap-10 border-t border-hairline py-10 md:grid-cols-[200px_1fr] md:gap-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
            Biography
          </p>
          <div className="space-y-5 text-base leading-relaxed text-fg-muted">
            <p>
              I work at the intersection of AI, learning design, and business
              analytics. My path has moved between engineering (computer vision
              shipped in production), research (learning analytics at Harvard
              GSE), and entrepreneurship (AI ventures shortlisted at MIT Media
              Lab and competing at the Harvard President&apos;s Innovation
              Challenge).
            </p>
            <p>
              I was trained in business analytics at UBC Sauder and digital
              enterprise management at the University of Toronto (High
              Distinction). I read widely across disciplines and care deeply
              about craft — from clean data pipelines to elegant typography.
            </p>
            <p>
              Outside of work, I have served as Vice President of International
              at UBC Sauder&apos;s MBAN Student Council, supporting 100+
              international students through cultural transitions and community
              events.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-t border-hairline py-10 md:grid-cols-[200px_1fr]">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
            Education
          </p>
          <ul className="space-y-6">
            {schools.map((s) => (
              <li key={s.id}>
                <p className="font-serif text-lg text-fg">{s.school}</p>
                <p className="mt-1 text-sm text-fg-muted">{s.degree}</p>
                <p className="mt-1 font-mono text-[11px] text-fg-faint">
                  {s.period} · {s.location}
                  {s.detail ? ` · ${s.detail}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-10 border-t border-hairline py-10 md:grid-cols-[200px_1fr]">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
            Skills
          </p>
          <div className="space-y-6">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                  {s.group}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] text-fg-muted"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-t border-hairline py-10 md:grid-cols-[200px_1fr]">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-fg-muted">
            <li>
              <span className="inline-block w-20 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-faint">
                Email
              </span>
              <a
                className="transition-colors hover:text-fg"
                href="mailto:jiaweizhang@gse.harvard.edu"
              >
                jiaweizhang@gse.harvard.edu
              </a>
            </li>
            <li>
              <span className="inline-block w-20 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-faint">
                Phone
              </span>
              +1 (617) 599-0738
            </li>
            <li>
              <span className="inline-block w-20 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-faint">
                Base
              </span>
              Cambridge, MA, US
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
