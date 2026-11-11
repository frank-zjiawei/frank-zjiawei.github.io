import Link from 'next/link';
import {
  ArrowRight,
  MessageSquareText,
  PersonStanding,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { researchThreads } from '@/content/profile';

/** One icon per research thread, keyed by the ids in content/profile.ts. */
const ICONS: Record<string, LucideIcon> = {
  'learning-analytics': PersonStanding,
  'ai-feedback': MessageSquareText,
  'multimodal-ai': Workflow,
};

/** The three strands of research, each a card that opens the evidence for it. */
export function ResearchFocus() {
  return (
    <section className="border-t border-hairline">
      <div className="container-prose py-16 md:py-20">
        <p className="section-eyebrow">Research</p>
        <h2 className="mt-3 font-serif text-2xl text-fg md:text-3xl">
          What I work on
        </h2>

        <ol className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-3">
          {researchThreads.map((thread, i) => {
            const Icon = ICONS[thread.id] ?? Workflow;
            return (
              <li key={thread.id}>
                <Link
                  href={thread.link.href}
                  className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_36px_-22px_rgb(var(--shadow)/0.45)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-xl leading-snug text-fg">
                    {thread.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">
                    {thread.body}
                  </p>

                  <p className="mt-5 flex items-start gap-1.5 text-[13px] font-medium leading-snug text-accent">
                    <span>{thread.link.label}</span>
                    <ArrowRight
                      className="mt-[0.15em] h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
