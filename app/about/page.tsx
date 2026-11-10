import Image from 'next/image';
import Link from 'next/link';
import { schools } from '@/content/education';

export const metadata = {
  title: 'About Me',
  description:
    'Jiawei Zhang — Researcher at Harvard GSE LIT Lab; Business Analytics & BD at Harvard Business School Foundry. Academic path from Toronto to Cambridge.',
};

const CHAPTERS: {
  id: string;
  period: string;
  place: string;
  title: string;
  body: string[];
  imageNote?: string;
  imageSrc?: string;
}[] = [
  {
    id: 'toronto',
    period: '2019 – 2023',
    place: 'Toronto, Canada',
    title: 'University of Toronto',
    body: [
      'I studied Digital Enterprise Management and graduated with High Distinction. Those years taught me how product, data, and people systems fit together — and left me curious about how learning itself could be designed.',
    ],
    imageNote: 'Graduation photo — drop into /public/images/about/graduation.jpg',
    imageSrc: '/images/about/graduation.jpg',
  },
  {
    id: 'vancouver',
    period: '2023 – 2024',
    place: 'Vancouver, Canada',
    title: 'UBC Sauder · Master of Business Analytics',
    body: [
      'At UBC I sharpened the analytics craft — Python, SQL, modeling, and decision systems — while serving as VP International for the MBAN Student Council. Industry co-ops at Wyloo Metals and earlier roles at HireBeat and Accenture made the numbers feel real.',
    ],
  },
  {
    id: 'cambridge',
    period: '2025 – Now',
    place: 'Cambridge & Boston, MA',
    title: 'Harvard GSE · MIT · HBS Foundry',
    body: [
      'I am a Researcher at the Harvard GSE Learning Innovation and Technology Lab, studying how makerspace learners build self-efficacy — and how AI tools can support that process without flattening it.',
      'At Harvard Business School Foundry I work as a Business Analytics & BD member: founder-signal research, evaluation design, and the data infrastructure behind AI-native venture building.',
      'I also cross-register at MIT (AI Venture Studio / Sloan), keeping one foot in the lab and one in the product room.',
    ],
    imageNote: 'HBS Foundry team photo — drop into /public/images/about/foundry.jpg',
    imageSrc: '/images/about/foundry.jpg',
  },
];

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

function PhotoSlot({
  src,
  alt,
  note,
}: {
  src?: string;
  alt: string;
  note?: string;
}) {
  return (
    <figure className="overflow-hidden border border-hairline bg-surface-2">
      <div className="relative aspect-[16/10] w-full">
        {src ? (
          // next/image will 404 gracefully only at runtime if missing — use img with onError via unoptimized path check
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-2 px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
              {note ?? 'Photo coming soon'}
            </p>
          </div>
        )}
      </div>
      {note && src ? (
        <figcaption className="border-t border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function AboutPage() {
  return (
    <>
      <header className="container-prose pt-20 pb-10 md:pt-28 md:pb-14">
        <p className="section-eyebrow">About Me</p>
        <h1 className="mt-5 font-serif text-[clamp(2rem,5.5vw,3.75rem)] font-normal leading-[1.12] tracking-tight text-fg">
          About Me
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
          From Toronto to Cambridge — Researcher at Harvard GSE LIT Lab, and
          Business Analytics &amp; BD member at Harvard Business School Foundry.
          Exploring how product thinking and technology can shape meaningful
          learning experiences.
        </p>
      </header>

      <section className="container-prose pb-10">
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
              analytics. Right now that means research on how people learn in
              makerspaces at HGSE, and building the analytics and partnership
              systems that help founders learn faster at HBS Foundry.
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

      <section className="container-prose pb-16">
        <div className="border-t border-hairline pt-12">
          <p className="section-eyebrow">My story</p>
          <h2 className="mt-3 font-serif text-3xl text-fg md:text-4xl">
            Academic path
          </h2>
        </div>

        <div className="mt-12 space-y-16">
          {CHAPTERS.map((c) => (
            <article
              key={c.id}
              id={c.id}
              className="grid grid-cols-1 gap-8 border-t border-hairline pt-10 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <div className="space-y-2 md:sticky md:top-28 md:self-start">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
                  {c.period}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                  {c.place}
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-fg md:text-3xl">
                  {c.title}
                </h3>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-fg-muted md:text-base">
                  {c.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {c.imageSrc ? (
                  <div className="mt-8">
                    <PhotoSlot
                      src={undefined}
                      alt={c.title}
                      note={c.imageNote}
                    />
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-prose pb-16">
        <div className="border-t border-hairline pt-12">
          <p className="section-eyebrow">Education</p>
          <ul className="mt-8 space-y-6">
            {schools.map((s) => (
              <li key={s.id} className="grid grid-cols-1 gap-1 md:grid-cols-[200px_1fr]">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
                  {s.period}
                </p>
                <div>
                  <p className="font-serif text-lg text-fg">{s.school}</p>
                  <p className="mt-1 text-sm text-fg-muted">{s.degree}</p>
                  <p className="mt-1 font-mono text-[11px] text-fg-faint">
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
