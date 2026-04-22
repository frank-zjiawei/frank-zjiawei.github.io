import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'About Jiawei',
  description:
    'About Jiawei (Frank) Zhang — Harvard GSE, MIT Media Lab. Learning designer, AI engineer, researcher, and occasional boxer.',
};

const SOCIALS: { label: string; href: string; display: string }[] = [
  { label: 'Email', href: 'mailto:frankwei312@gmail.com', display: 'frankwei312@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/frank-zhang-7a8944198/', display: 'linkedin.com/in/frank-zhang' },
  { label: 'Instagram', href: 'https://www.instagram.com/frankjiaweizhang/', display: '@frankjiaweizhang' },
  { label: 'GitHub', href: 'https://github.com/frank-zjiawei', display: 'github.com/frank-zjiawei' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Jiawei"
      />

      <section className="container-prose pb-24">
        {/* Portrait + lead paragraph — Zara-style intro block */}
        <div className="grid grid-cols-1 gap-10 border-t border-hairline pt-10 md:grid-cols-[minmax(0,260px)_1fr] md:gap-14">
          <figure className="mx-auto w-full max-w-[280px] md:mx-0">
            <div className="relative aspect-[1/1.06] w-full overflow-hidden rounded-sm border border-hairline bg-surface-2">
              <Image
                src="/images/profile.png"
                alt="Jiawei (Frank) Zhang"
                fill
                sizes="(min-width: 768px) 260px, 80vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
              Jiawei · Cambridge, MA
            </figcaption>
          </figure>

          <div className="space-y-5 font-serif text-[17px] leading-[1.75] text-fg md:text-[18px]">
            <p>
              <span className="font-semibold">Jiawei Zhang</span>{' '}
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-fg-dim">
                · Frank ·
              </span>{' '}
              is a learning designer and AI engineer currently pursuing an{' '}
              <em>Ed.M. in Learning Design, Innovation, and Technology</em> at
              Harvard Graduate School of Education, with cross‑registrations at{' '}
              MIT Media Lab and MIT Sloan. His work lives at the intersection
              of artificial intelligence, education, and business analytics —
              building tools that help people learn more like themselves.
            </p>

            <p>
              Before Harvard, he read business analytics at{' '}
              <em>UBC Sauder</em> (Master of Business Analytics) and digital
              enterprise management at the <em>University of Toronto</em>,
              graduating with High Distinction. Along the way, he has shipped
              computer‑vision models in production, built agentic systems for
              enterprise workflows, and placed in competitions ranging from
              the Google Hackathon to the Harvard President&apos;s Innovation
              Challenge.
            </p>
          </div>
        </div>

        {/* Long-form prose — Zara-style writing block */}
        <div className="mt-16 space-y-6 border-t border-hairline pt-10 font-serif text-[17px] leading-[1.8] text-fg md:text-[18px]">
          <p>
            Frank grew up in northeastern China and has since lived in Toronto,
            Vancouver, Boston, and Cambridge. That long zig‑zag across
            classrooms and cultures is the thread that ties his work together:
            he is drawn to the quiet problem of <em>how humans learn things</em>{' '}
            — especially when the thing is hard, the learner is tired, and the
            teacher is a piece of software.
          </p>

          <p>
            His current work at Harvard GSE&apos;s <em>LIT Lab</em> focuses on
            how generative AI changes the shape of learning design — not just
            the <em>content</em> students receive, but the <em>loops</em> in
            which they practice, fail, and get feedback. At MIT Media Lab, he
            has been shortlisted for an AI venture and continues to build
            small, opinionated tools that try to respect a learner&apos;s
            attention rather than consume it.
          </p>

          <p>
            Outside of work, Frank trains in boxing, reads widely across
            philosophy and design, and keeps a running notebook of things
            he&apos;d like to understand better — a habit that quietly
            informs most of what he builds.
          </p>

          <p>
            He is always happy to hear from students, educators, researchers,
            and builders who care about the same questions. The best way to
            reach him is by email.
          </p>
        </div>

        {/* Contact / social strip — under the prose, like Zara's page */}
        <div className="mt-16 border-t border-hairline pt-10">
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
            <li className="flex items-baseline gap-5">
              <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
                CV
              </span>
              <span className="space-x-4">
                <a
                  href="/cv/Jiawei_Zhang_CV_EN.pdf"
                  download
                  className="border-b border-transparent transition-colors hover:border-gold"
                >
                  Download (EN)
                </a>
                <a
                  href="/cv/Jiawei_Zhang_CV_CN.pdf"
                  download
                  className="border-b border-transparent transition-colors hover:border-gold"
                >
                  下载中文版
                </a>
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
