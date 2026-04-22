import type { Project } from '@/content/projects';

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article
      id={project.id}
      className="group grid grid-cols-1 gap-6 border-t border-hairline py-10 md:grid-cols-[200px_1fr] md:gap-10"
    >
      <div className="space-y-2 md:sticky md:top-24 md:self-start">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
          {project.period}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          {project.role}
        </p>
        <p className="font-mono text-[11px] text-fg-faint">{project.location}</p>
      </div>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-dim">
          {project.org}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-fg md:text-3xl">
          {project.title}
        </h3>
        {project.metric ? (
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-fg">
            {project.metric}
          </p>
        ) : null}
        <p className="mt-5 text-base leading-relaxed text-fg-muted">{project.summary}</p>

        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-sm leading-relaxed text-fg-muted"
            >
              <span className="mt-2 h-px w-3 shrink-0 bg-fg-faint" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
