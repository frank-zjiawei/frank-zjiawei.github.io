import Image from 'next/image';
import Link from 'next/link';
import { schools } from '@/content/education';
import { honors, profile } from '@/content/profile';
import { PlaceGallery } from '@/components/PlaceGallery';

export const metadata = {
  title: 'About Me',
  description: profile.metaDescription,
};

const CONTACTS: { label: string; href: string; display: string }[] = [
  { label: 'Email', href: `mailto:${profile.email}`, display: profile.email },
  {
    label: 'Scholar',
    href: profile.links.scholar,
    display: 'Google Scholar profile',
  },
  {
    label: 'LinkedIn',
    href: profile.links.linkedin,
    display: 'linkedin.com/in/frank-zhang',
  },
  {
    label: 'GitHub',
    href: profile.links.github,
    display: 'github.com/frank-zjiawei',
  },
  {
    label: 'Instagram',
    href: profile.links.instagram,
    display: '@frankjiaweizhang',
  },
];

const inlineLink =
  'border-b border-gold/60 text-fg transition-colors hover:border-gold';

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-2xl text-fg md:text-3xl">{title}</h2>
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <header className="container-prose pt-16 pb-10 md:pt-24 md:pb-12">
        <p className="section-eyebrow">About</p>
        <h1 className="mt-5 font-serif text-[clamp(2rem,5.5vw,3.75rem)] font-normal leading-[1.12] tracking-tight text-fg">
          About Me
        </h1>
      </header>

      <section className="container-prose pb-16 md:pb-20">
        <div className="grid grid-cols-1 gap-10 border-t border-hairline pt-10 md:grid-cols-[260px_minmax(0,1fr)] md:gap-14">
          <figure className="md:sticky md:top-28 md:self-start">
            <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[20px] border border-hairline bg-surface-2">
              <Image
                src="/images/profile-900.jpg"
                alt="Portrait of Jiawei Zhang"
                fill
                sizes="260px"
                className="object-cover object-[50%_18%]"
                priority
              />
            </div>
            <figcaption className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-fg-dim">
              {profile.name} · {profile.pronunciation}
              <br />
              {profile.location}
            </figcaption>
          </figure>

          <div className="space-y-5 text-[17px] leading-[1.75] text-fg-muted md:text-[18px]">
            <p className="font-serif text-[1.3rem] leading-[1.5] text-fg md:text-[1.5rem]">
              {profile.statement}
            </p>
            <p>
              I am Jiawei Zhang, and I also go by {profile.preferredName}. I am
              a research assistant in the{' '}
              <a
                href="https://lit.gse.harvard.edu/"
                target="_blank"
                rel="noreferrer"
                className={inlineLink}
              >
                Learning Innovation and Technology Lab
              </a>{' '}
              at the Harvard Graduate School of Education, where I work with{' '}
              <a
                href="https://www.gse.harvard.edu/directory/faculty/bertrand-schneider"
                target="_blank"
                rel="noreferrer"
                className={inlineLink}
              >
                Prof. Bertrand Schneider
              </a>{' '}
              on multimodal learning analytics and AI tools for hands-on
              learning.
            </p>
            <p>
              My{' '}
              <Link href="/research#paper-5" className={inlineLink}>
                first-author paper
              </Link>
              , under review at <em>Computers &amp; Education</em>, shows that
              two pose-based learner profiles jointly relate to makerspace
              students&rsquo; self-efficacy more strongly than either does
              alone. Building on that work, I designed and prototyped an
              LLM-based AI Teaching Fellow and learning dashboard that give 22
              students in a Harvard makerspace course weekly personalized,
              theory-grounded feedback.
            </p>
            <p>
              Before Harvard, I was a research assistant at Tsinghua Shenzhen
              International Graduate School, working on spatiotemporal
              multimodal decision agents. Papers with my collaborators there
              received the{' '}
              <Link href="/research#paper-2" className={inlineLink}>
                Best Paper Runner-Up Award at IEEE IVMSP 2026
              </Link>{' '}
              and{' '}
              <Link href="/research#paper-1" className={inlineLink}>
                First Prize in the ACM Multimedia 2026 AVI Grand Challenge
              </Link>
              .
            </p>
            <p>
              I am also a Business Development &amp; Research Analytics Fellow
              at Harvard Business School Foundry, where I work with Prof. Tom
              Eisenmann on identifying early signals of high-potential
              founders, including when and why AI and human reviewers disagree.
            </p>

            <div className="pt-3">
              <p className="section-eyebrow">Research interests</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-full border border-hairline px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-3 font-mono text-[12px] uppercase tracking-[0.16em]">
              <Link href="/experience/" className={inlineLink}>
                Research experience →
              </Link>
              <a href={profile.cv.en} download className={inlineLink}>
                Download CV ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="border-t border-hairline">
        <div className="container-prose py-16 md:py-20">
          <SectionHeading eyebrow="Background" title="Education" />
          <ul className="mt-8">
            {schools.map((s) => (
              <li
                key={s.id}
                id={s.id}
                className="grid scroll-mt-28 grid-cols-1 gap-2 border-t border-hairline py-6 md:grid-cols-[200px_1fr] md:gap-10"
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
                  <p className="mt-2 font-mono text-[11px] text-fg-dim">
                    {[s.location, s.detail, s.distinction]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="honors" className="border-t border-hairline">
        <div className="container-prose py-16 md:py-20">
          <SectionHeading eyebrow="Recognition" title="Honors & awards" />
          <ul className="mt-8 border-t border-hairline">
            {honors.map((h) => (
              <li
                key={h.title}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-hairline py-4"
              >
                <div>
                  <p className="font-serif text-lg leading-snug text-fg">
                    {h.title}
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">{h.detail}</p>
                </div>
                <p className="font-mono text-[11px] tracking-[0.08em] text-fg-dim">
                  {h.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PlaceGallery eyebrow="Places" title="Campuses & cities" />

      <section className="border-t border-hairline">
        <div className="container-prose grid grid-cols-1 gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-20">
          <div>
            <SectionHeading eyebrow="Contact" title="Reach me" />
            <ul className="mt-8 space-y-3 text-[16px] text-fg">
              {CONTACTS.map((c) => (
                <li key={c.label} className="flex items-baseline gap-5">
                  <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
                    {c.label}
                  </span>
                  <a
                    href={c.href}
                    className="link-quiet min-w-0 break-words"
                    {...(c.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {c.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Beyond research" title="Off the desk" />
            <p className="mt-8 max-w-md text-base leading-relaxed text-fg-muted">
              Boxing is the part of my week that has nothing to do with slides,
              and it keeps the research honest.
            </p>
            <p className="mt-5">
              <Link
                href="/about/interests/"
                className={`${inlineLink} font-mono text-[12px] uppercase tracking-[0.16em]`}
              >
                Interests · Boxing →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
