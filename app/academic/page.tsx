import { PageHeader } from '@/components/PageHeader';
import { schools } from '@/content/education';

export const metadata = {
  title: 'Academic',
  description:
    'Harvard Ed.M., MIT Media Lab, UBC MBAN, University of Toronto.',
};

export default function AcademicPage() {
  return (
    <>
      <PageHeader
        eyebrow="03 / Academic"
        title="Academic"
        description="Four universities, two countries, one throughline: how humans and intelligent systems can learn to work together better."
      />
      <div className="container-prose pb-24">
        {schools.map((s) => (
          <article
            key={s.id}
            id={s.id}
            className="grid grid-cols-1 gap-6 border-t border-ink-700 py-10 md:grid-cols-[200px_1fr] md:gap-10"
          >
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-400">
                {s.period}
              </p>
              <p className="font-mono text-[11px] text-ink-500">{s.location}</p>
              {s.distinction ? (
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-300">
                  {s.distinction}
                </p>
              ) : null}
            </div>
            <div>
              <h3 className="font-serif text-2xl leading-tight text-ink-50 md:text-3xl">
                {s.school}
              </h3>
              <p className="mt-3 text-base text-ink-300">{s.degree}</p>
              {s.detail ? (
                <p className="mt-2 font-mono text-xs text-ink-400">{s.detail}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
