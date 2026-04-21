import type { Project } from '@/content/projects';

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article
      id={project.id}
      className="group grid grid-cols-1 gap-6 border-t border-ink-700 py-10 md:grid-cols-[200px_1fr] md:gap-10"
    >
      <div className="space-y-2 md:sticky md:top-24 md:self-start">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-400">
          {project.period}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-300">
          {project.role}
        </p>
        <p className="font-mono text-[11px] text-ink-500">{project.location}</p>
      </div>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-400">
          {project.org}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-ink-50 md:text-3xl">
          {project.title}
        </h3>
        {project.metric ? (
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-200">
            {project.metric}
          </p>
        ) : null}
        <p className="mt-5 text-base leading-relaxed text-ink-300">{project.summary}</p>

        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-sm leading-relaxed text-ink-300"
            >
              <span className="mt-2 h-px w-3 shrink-0 bg-ink-500" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink-700 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
