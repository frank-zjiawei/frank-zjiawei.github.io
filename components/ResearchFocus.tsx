import Link from 'next/link';
import { researchThreads } from '@/content/profile';

/** The three strands of research, each pointing at the evidence for it. */
export function ResearchFocus() {
  return (
    <section className="border-t border-hairline">
      <div className="container-prose py-16 md:py-20">
        <p className="section-eyebrow">Research</p>
        <h2 className="mt-3 font-serif text-2xl text-fg md:text-3xl">
          What I work on
        </h2>

        <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {researchThreads.map((thread, i) => (
            <li key={thread.id} className="flex flex-col border-t border-fg/80 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-serif text-xl leading-snug text-fg">
                {thread.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">
                {thread.body}
              </p>
              <Link
                href={thread.link.href}
                className="group mt-5 inline-flex items-baseline gap-1.5 text-[13px] leading-snug text-fg"
              >
                <span className="border-b border-fg/30 pb-px transition-colors group-hover:border-fg">
                  {thread.link.label}
                </span>
                <span
                  aria-hidden
                  className="text-fg-dim transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
