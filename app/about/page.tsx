import Image from 'next/image';
import Link from 'next/link';
import { schools } from '@/content/education';
import { PlaceGallery } from '@/components/PlaceGallery';

export const metadata = {
  title: 'About Me',
  description:
    'Jiawei Zhang — Researcher at the Harvard Graduate School of Education LIT Lab; Business Analytics & BD at Harvard Business School Foundry.',
};

const SOCIALS: { label: string; href: string; display: string }[] = [
  { label: 'Email', href: 'mailto:frankwei312@gmail.com', display: 'frankwei312@gmail.com' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/frank-zhang-7a8944198/',
    display: 'linkedin.com/in/frank-zhang',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/frankjiaweizhang/',
    display: '@frankjiaweizhang',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/frank-zjiawei',
    display: 'github.com/frank-zjiawei',
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="container-prose pt-20 pb-10 md:pt-28 md:pb-14">
        <p className="section-eyebrow">About Me</p>
        <h1 className="mt-5 font-serif text-[clamp(2rem,5.5vw,3.75rem)] font-normal leading-[1.12] tracking-tight text-fg">
          About Me
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
          Researcher at the Harvard Graduate School of Education&apos;s Learning
          Innovation and Technology Lab, and Business Analytics &amp; BD member
          at Harvard Business School Foundry — exploring how product thinking
          and technology can shape meaningful learning experiences.
        </p>
      </header>

      <section className="container-prose pb-12">
        <div className="grid grid-cols-1 gap-8 border-t border-hairline pt-10 md:grid-cols-[minmax(0,240px)_1fr] md:gap-12">
          <figure>
            <div className="relative mx-auto aspect-[1/1.05] w-full max-w-[240px] overflow-hidden border border-hairline bg-surface-2 md:mx-0">
              <Image
                src="/images/profile.png"
                alt="Jiawei Zhang"
                fill
                sizes="240px"
                className="object-cover"
                priority
              />
            </div>
          </figure>
          <div className="space-y-4 font-serif text-[17px] leading-[1.75] text-fg md:text-[18px]">
            <p>
              <span className="font-semibold">Jiawei Zhang</span>{' '}
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
                · Frank ·
              </span>
            </p>
            <p className="text-fg-muted">
              I work at the intersection of AI, learning design, and business
              analytics. My current research studies how people learn in
              makerspaces at the Harvard Graduate School of Education, while at
              Harvard Business School Foundry I build the analytics and
              partnership systems that help founders learn faster.
            </p>
            <p>
              <Link
                href="/about/interests/"
                className="border-b border-gold/60 font-mono text-[12px] uppercase tracking-[0.16em] text-fg transition-colors hover:border-gold"
              >
                More about me · Interests (Boxing) →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <PlaceGallery eyebrow="Places" title="Campuses & cities" />

      <section id="education" className="container-prose pb-16">
        <div className="border-t border-hairline pt-12">
          <p className="section-eyebrow">Education</p>
          <h2 className="mt-3 font-serif text-3xl text-fg md:text-4xl">
            Education
          </h2>
          <ul className="mt-10 space-y-8">
            {schools.map((s) => (
              <li
                key={s.id}
                id={s.id}
                className="grid grid-cols-1 gap-2 border-t border-hairline pt-6 md:grid-cols-[200px_1fr] md:gap-10"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
                  {s.period}
                </p>
                <div>
                  <p className="font-serif text-xl text-fg md:text-2xl">
                    {s.school}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted md:text-base">
                    {s.degree}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-fg-faint">
                    {s.location}
                    {s.detail ? ` · ${s.detail}` : ''}
                    {s.distinction ? ` · ${s.distinction}` : ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-prose pb-24">
        <div className="border-t border-hairline pt-12">
          <p className="section-eyebrow mb-6">Reach Jiawei</p>
          <ul className="space-y-3 font-serif text-[17px] text-fg">
            {SOCIALS.map((s) => (
              <li key={s.label} className="flex items-baseline gap-5">
                <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
                  {s.label}
                </span>
                <Link
                  href={s.href}
                  className="border-b border-transparent transition-colors hover:border-gold hover:text-fg"
                  {...(s.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  {s.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
