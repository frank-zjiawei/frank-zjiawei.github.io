'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, ExternalLink } from 'lucide-react';
import { OrgLogo } from '@/components/OrgLogo';
import { getOrg } from '@/content/orgs';
import type { Project } from '@/content/projects';
import { zhOrgs, zhProjects } from '@/content/zh';
import { ui } from '@/lib/i18n';
import { useTx } from '@/components/LocaleText';

/**
 * One experience entry. The organisation leads (logo, name, lab), then the
 * role and dates, then the work itself.
 */
export function ProjectEntry({ project }: { project: Project }) {
  const { locale, pick } = useTx();
  const org = getOrg(project.orgId);
  const zh = zhProjects[project.id];
  const zhOrg = zhOrgs[project.orgId];

  const orgName =
    locale === 'zh' && zhOrg?.name ? zhOrg.name : org.name;
  const title = locale === 'zh' && zh ? zh.title : project.title;
  const unit =
    locale === 'zh' && zh?.unit !== undefined ? zh.unit : project.unit;
  const role = locale === 'zh' && zh ? zh.role : project.role;
  const location =
    locale === 'zh' && zh ? zh.location : project.location;
  const period = locale === 'zh' && zh ? zh.period : project.period;
  const summary = locale === 'zh' && zh ? zh.summary : project.summary;
  const highlights =
    locale === 'zh' && zh ? zh.highlights : project.highlights;
  const stack =
    locale === 'zh' && zh?.stack ? zh.stack : project.stack;
  const metric =
    locale === 'zh' && zh?.metric !== undefined ? zh.metric : project.metric;
  const count = highlights.length;
  const showHighlights =
    project.category === 'research' || project.period.endsWith('Present');

  const unitMark = project.unitLogo ? (
    <span className="shrink-0 overflow-hidden rounded-md border border-hairline bg-white px-1.5 py-1">
      <Image
        src={project.unitLogo}
        alt=""
        width={53}
        height={30}
        className="block h-[30px] w-auto"
      />
    </span>
  ) : null;

  return (
    <article
      id={project.id}
      className="scroll-mt-28 border-t border-hairline py-9 first:border-t-0 md:py-10"
    >
      <header className="flex items-start gap-4 md:gap-5">
        <OrgLogo org={org} size={64} className="mt-0.5" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-x-6 gap-y-1 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-balance font-serif text-[1.45rem] leading-tight tracking-tight text-fg md:text-[1.75rem]">
              {orgName}
            </h3>
            <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
              {period}
            </p>
          </div>

          {unit ? (
            project.unitHref ? (
              <a
                href={project.unitHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2.5 inline-flex max-w-full items-center gap-2.5 rounded-full bg-accent/10 px-3 py-1.5 text-[15px] font-medium leading-snug text-accent transition-colors hover:bg-accent hover:text-accent-fg md:text-[16px]"
              >
                {unitMark}
                <span className="min-w-0 truncate">{unit}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
              </a>
            ) : (
              <p className="mt-2.5 inline-flex max-w-full items-center gap-2.5 rounded-full bg-surface-2 px-3 py-1.5 text-[15px] font-medium leading-snug text-fg md:text-[16px]">
                {unitMark}
                <span className="min-w-0 truncate">{unit}</span>
              </p>
            )
          ) : null}

          <p className="mt-2 text-[15px] leading-snug text-fg-muted">
            <span className="text-fg">{role}</span>
            <span className="mx-2 text-fg-faint">·</span>
            {location}
          </p>
        </div>
      </header>

      <div className="mt-5 md:pl-[84px]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-pretty text-[15px] font-medium leading-snug text-fg md:text-base">
            {title}
          </p>
          {metric ? <span className="badge-accent">{metric}</span> : null}
        </div>

        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-fg-muted">
          {summary}
        </p>

        {project.figures?.length ? (
          <ul className="mt-5 grid max-w-xl grid-cols-2 gap-3">
            {project.figures.map((figure, fi) => {
              const caption =
                locale === 'zh' && zh?.figures?.[fi]?.caption
                  ? zh.figures[fi].caption
                  : figure.caption;
              return (
                <li key={figure.src}>
                  <Link href={figure.href} className="group/figure block">
                    <span className="relative block aspect-[3/2] overflow-hidden rounded-xl border border-hairline bg-white transition-colors group-hover/figure:border-accent/60">
                      <Image
                        src={figure.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 280px, 50vw"
                        className="object-contain p-1.5 transition-transform duration-500 group-hover/figure:scale-[1.04]"
                      />
                    </span>
                    <span className="mt-2 block text-[12px] leading-snug text-fg-muted transition-colors group-hover/figure:text-accent">
                      {caption}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}

        <details open={showHighlights} className="group/details mt-4">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-[13px] font-medium text-accent [&::-webkit-details-marker]:hidden">
            <span className="group-open/details:hidden">
              {pick(ui.experience.showHighlights)} {count}{' '}
              {count === 1
                ? pick(ui.experience.highlight)
                : pick(ui.experience.highlightsPlural)}
            </span>
            <span className="hidden group-open/details:inline">
              {pick(ui.experience.highlights)}
            </span>
            <ChevronDown
              className="h-3.5 w-3.5 transition-transform group-open/details:rotate-180"
              strokeWidth={2}
            />
          </summary>
          <ul className="mt-3 max-w-3xl space-y-2.5">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 text-sm leading-relaxed text-fg-muted"
              >
                <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </details>

        <ul className="mt-5 flex flex-wrap gap-2">
          {stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>

        {project.links?.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.links.map((link, li) => {
              const internal = link.href.startsWith('/');
              const label =
                locale === 'zh' && zh?.links?.[li]?.label
                  ? zh.links[li].label
                  : link.label;
              return (
                <li key={link.href}>
                  {internal ? (
                    <Link href={link.href} className="link-pill">
                      {label}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-pill"
                    >
                      {label}
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
