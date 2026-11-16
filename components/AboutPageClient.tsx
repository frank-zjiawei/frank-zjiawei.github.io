'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award } from 'lucide-react';
import { schools } from '@/content/education';
import { honors, profile } from '@/content/profile';
import { OrgLogo } from '@/components/OrgLogo';
import { getOrg } from '@/content/orgs';
import { zhHonors, zhProfile, zhSchools } from '@/content/zh';
import { ui } from '@/lib/i18n';
import { useTx } from '@/components/LocaleText';

const inlineLink = 'link-inline';

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-2xl text-fg md:text-3xl">{title}</h2>
    </>
  );
}

export function AboutPageClient() {
  const { locale, pick } = useTx();
  const interests =
    locale === 'zh' ? zhProfile.interests : [...profile.interests];
  const statement =
    locale === 'zh' ? zhProfile.statement : profile.statement;
  const location =
    locale === 'zh' ? zhProfile.location : profile.location;
  const cvHref = locale === 'zh' ? profile.cv.cn : profile.cv.en;

  return (
    <>
      <header className="container-prose pt-16 pb-10 md:pt-24 md:pb-12">
        <p className="section-eyebrow">{pick(ui.about.eyebrow)}</p>
        <h1 className="mt-5 font-serif text-[clamp(2rem,5.5vw,3.75rem)] font-normal leading-[1.12] tracking-tight text-fg">
          {pick(ui.about.title)}
        </h1>
      </header>

      <section className="container-prose pb-16 md:pb-20">
        <div className="grid grid-cols-1 gap-10 border-t border-hairline pt-10 md:grid-cols-[260px_minmax(0,1fr)] md:gap-14">
          <figure className="md:sticky md:top-28 md:self-start">
            <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[20px] border border-hairline bg-surface-2">
              <Image
                src="/images/portrait.jpg"
                alt={pick(ui.hero.portraitAlt)}
                fill
                sizes="260px"
                className="object-cover object-[52%_50%]"
                priority
              />
            </div>
            <figcaption className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-fg-dim">
              {locale === 'zh' ? '张家炜' : profile.name} ·{' '}
              {profile.pronunciation}
              <br />
              {location}
              <br />
              <span className="text-fg-faint">
                {pick(ui.about.photoCredit)}
              </span>
            </figcaption>
          </figure>

          <div className="space-y-5 text-[17px] leading-[1.75] text-fg-muted md:text-[18px]">
            <p className="font-serif text-[1.3rem] leading-[1.5] text-fg md:text-[1.5rem]">
              {statement}
            </p>

            {locale === 'zh' ? (
              <>
                <p>
                  我是张家炜，也叫 {profile.preferredName}。我在
                  <a
                    href="https://lit.gse.harvard.edu/"
                    target="_blank"
                    rel="noreferrer"
                    className={inlineLink}
                  >
                    Learning Innovation and Technology Lab
                  </a>
                  （哈佛大学教育学院）担任研究助理，与
                  <a
                    href="https://www.gse.harvard.edu/directory/faculty/bertrand-schneider"
                    target="_blank"
                    rel="noreferrer"
                    className={inlineLink}
                  >
                    Bertrand Schneider 教授
                  </a>
                  合作，研究多模态学习分析与面向动手学习的 AI 工具。
                </p>
                <p>
                  我的
                  <Link href="/research#paper-5" className={inlineLink}>
                    第一作者论文
                  </Link>
                  （投稿 <em>Computers &amp; Education</em>，审稿中）表明，两类基于姿态的学习者画像对创客空间学生自我效能感的联合解释力强于任一画像单独作用。在此基础上，我设计并原型化了基于大语言模型的 AI 助教与学习仪表盘，为哈佛一门创客空间课程的 22 名学生提供每周个性化、有理论依据的反馈。
                </p>
                <p>
                  来哈佛之前，我在清华大学深圳国际研究生院担任研究助理，从事时空多模态决策智能体研究。与合作者的论文获得
                  <Link href="/research#paper-2" className={inlineLink}>
                    IEEE IVMSP 2026 最佳论文亚军奖
                  </Link>
                  ，以及
                  <Link href="/research#paper-1" className={inlineLink}>
                    ACM Multimedia 2026 AVI Grand Challenge 一等奖
                  </Link>
                  。
                </p>
                <p>
                  我同时在哈佛商学院 Foundry 担任商务拓展与研究分析师，与 Tom
                  Eisenmann
                  教授合作，识别高潜力创始人的早期信号，包括 AI
                  与人类评审何时、为何产生分歧。
                </p>
              </>
            ) : (
              <>
                <p>
                  I am Jiawei Zhang, and I also go by {profile.preferredName}. I
                  am a research assistant in the{' '}
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
                  , under review at <em>Computers &amp; Education</em>, shows
                  that two pose-based learner profiles jointly relate to
                  makerspace students&rsquo; self-efficacy more strongly than
                  either does alone. Building on that work, I designed and
                  prototyped an LLM-based AI Teaching Fellow and learning
                  dashboard that give 22 students in a Harvard makerspace course
                  weekly personalized, theory-grounded feedback.
                </p>
                <p>
                  Before Harvard, I was a research assistant at Tsinghua
                  Shenzhen International Graduate School, working on
                  spatiotemporal multimodal decision agents. Papers with my
                  collaborators there received the{' '}
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
                  I am also a Business Development &amp; Research Analyst at
                  Harvard Business School Foundry, where I work with Prof. Tom
                  Eisenmann on identifying early signals of high-potential
                  founders, including when and why AI and human reviewers
                  disagree.
                </p>
              </>
            )}

            <div className="pt-3">
              <p className="section-eyebrow">{pick(ui.about.interests)}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-full bg-accent/10 px-3.5 py-1.5 text-[13px] font-medium leading-none text-accent"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-3">
              <Link href="/experience/" className="link-pill">
                {pick(ui.about.experienceCta)}
              </Link>
              <a href={cvHref} download className="link-pill">
                {pick(ui.about.downloadCv)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="border-t border-hairline">
        <div className="container-prose py-16 md:py-20">
          <SectionHeading
            eyebrow={pick(ui.about.background)}
            title={pick(ui.about.education)}
          />
          <ul className="mt-8">
            {schools.map((s) => {
              const zh = zhSchools[s.id];
              const school =
                locale === 'zh' && zh ? zh.school : s.school;
              const degree =
                locale === 'zh' && zh ? zh.degree : s.degree;
              const detail =
                locale === 'zh' && zh?.detail !== undefined
                  ? zh.detail
                  : s.detail;
              const loc =
                locale === 'zh' && zh ? zh.location : s.location;
              const distinction =
                locale === 'zh' && zh?.distinction !== undefined
                  ? zh.distinction
                  : s.distinction;
              return (
                <li
                  key={s.id}
                  id={s.id}
                  className="flex scroll-mt-28 items-start gap-4 border-t border-hairline py-6 md:gap-5"
                >
                  <OrgLogo org={getOrg(s.orgId)} size={64} className="mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-x-6 gap-y-1 md:flex-row md:items-baseline md:justify-between">
                      <p className="font-serif text-[1.4rem] leading-tight text-fg md:text-[1.7rem]">
                        {school}
                      </p>
                      <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
                        {s.period}
                      </p>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-fg md:text-base">
                      {degree}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">
                      {[loc, detail, distinction].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="honors" className="border-t border-hairline">
        <div className="container-prose py-16 md:py-20">
          <SectionHeading
            eyebrow={pick(ui.about.recognition)}
            title={pick(ui.about.honors)}
          />
          <ul className="mt-8 border-t border-hairline">
            {honors.map((h) => {
              const zh = zhHonors[h.title];
              return (
                <li
                  key={h.title}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-b border-hairline py-4"
                >
                  <span
                    aria-hidden
                    className="grid h-9 w-9 place-items-center rounded-full bg-accent/10 text-accent"
                  >
                    <Award className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-serif text-lg leading-snug text-fg">
                      {locale === 'zh' && zh ? zh.title : h.title}
                    </p>
                    <p className="mt-1 text-sm text-fg-muted">
                      {locale === 'zh' && zh ? zh.detail : h.detail}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.08em] text-fg-dim">
                    {h.year}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

    </>
  );
}

/** Contact / boxing block below the photo gallery on About. */
export function AboutContactClient() {
  const { locale, pick } = useTx();

  const contacts = [
    {
      label: pick(ui.hero.email),
      href: `mailto:${profile.email}`,
      display: profile.email,
    },
    {
      label: 'Scholar',
      href: profile.links.scholar,
      display:
        locale === 'zh' ? 'Google Scholar 主页' : 'Google Scholar profile',
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

  return (
    <section className="border-t border-hairline">
      <div className="container-prose grid grid-cols-1 gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-20">
        <div>
          <SectionHeading
            eyebrow={pick(ui.about.contact)}
            title={pick(ui.about.reachMe)}
          />
          <ul className="mt-8 space-y-3 text-[16px] text-fg">
            {contacts.map((c) => (
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
          <SectionHeading
            eyebrow={pick(ui.about.beyond)}
            title={pick(ui.about.offDesk)}
          />
          <p className="mt-8 max-w-md text-base leading-relaxed text-fg-muted">
            {pick(ui.about.boxing)}
          </p>
          <p className="mt-5">
            <Link href="/about/interests/" className="link-pill">
              {pick(ui.about.interestsCta)}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
