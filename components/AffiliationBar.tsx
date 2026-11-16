'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { OrgLogo } from '@/components/OrgLogo';
import { getOrg } from '@/content/orgs';
import { affiliations } from '@/content/profile';
import { zhAffiliations, zhOrgs } from '@/content/zh';
import { ui } from '@/lib/i18n';
import { useTx } from '@/components/LocaleText';

/**
 * Logo bar under the hero: where Jiawei has studied and worked. Each logo
 * links to the matching entry; on wide screens, hovering or focusing one
 * opens a small card with the details.
 */
export function AffiliationBar() {
  const { locale, pick } = useTx();
  const last = affiliations.length - 1;

  return (
    <section aria-labelledby="affiliations-title" className="border-t border-hairline">
      <div className="container-prose py-9 md:py-10">
        <h2 id="affiliations-title" className="section-eyebrow">
          {pick(ui.affiliations.title)}
        </h2>

        <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-5 min-[420px]:grid-cols-2 md:grid-cols-6 md:gap-x-3">
          {affiliations.map((a, i) => {
            const org = getOrg(a.orgId);
            const zhOrg = zhOrgs[a.orgId];
            const zhAff = zhAffiliations[a.orgId];
            const short =
              locale === 'zh' && zhOrg?.short ? zhOrg.short : org.short;
            const name =
              locale === 'zh' && zhOrg?.name ? zhOrg.name : org.name;
            const role =
              locale === 'zh' && zhAff ? zhAff.role : a.role;
            const detail =
              locale === 'zh' && zhAff ? zhAff.detail : a.detail;
            const cta = locale === 'zh' && zhAff ? zhAff.cta : a.cta;
            const period =
              locale === 'zh' && zhAff?.period ? zhAff.period : a.period;

            return (
              <li key={a.orgId} className="group relative">
                <Link
                  href={a.href}
                  className="flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface md:flex-col md:items-center md:gap-3 md:text-center"
                >
                  <OrgLogo
                    org={org}
                    size={56}
                    className="transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_22px_-10px_rgb(var(--shadow)/0.45)]"
                  />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium leading-snug text-fg transition-colors group-hover:text-accent">
                      {short}
                    </span>
                    <span className="mt-0.5 block whitespace-pre-line text-[12px] leading-snug text-fg-muted">
                      {role}
                    </span>
                  </span>
                </Link>

                <div
                  aria-hidden
                  className={clsx(
                    'pointer-events-none absolute bottom-full z-30 mb-3 hidden w-60 translate-y-1 rounded-xl border border-hairline bg-surface p-4 text-left opacity-0 shadow-[0_18px_40px_-18px_rgb(var(--shadow)/0.45)] transition duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:block',
                    i === 0
                      ? 'left-0'
                      : i === last
                        ? 'right-0'
                        : 'left-1/2 -translate-x-1/2',
                  )}
                >
                  <p className="font-serif text-[15px] leading-snug text-fg">
                    {name}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">
                    {detail}
                  </p>
                  <p className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                    <span className="text-fg-dim">{period}</span>
                    <span className="text-accent">{cta} →</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
