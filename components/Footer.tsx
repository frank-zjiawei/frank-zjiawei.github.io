'use client';

import { profile } from '@/content/profile';
import { zhProfile } from '@/content/zh';
import { ui } from '@/lib/i18n';
import { useTx } from '@/components/LocaleText';

export function Footer() {
  const { locale, pick } = useTx();
  const location =
    locale === 'zh' ? zhProfile.location : profile.location;
  const name = locale === 'zh' ? '张家炜' : profile.name;

  const links = [
    { label: pick(ui.footer.email), href: `mailto:${profile.email}` },
    { label: pick(ui.footer.scholar), href: profile.links.scholar },
    { label: 'LinkedIn', href: profile.links.linkedin },
    { label: 'GitHub', href: profile.links.github },
    { label: 'Instagram', href: profile.links.instagram },
    { label: 'CV · EN', href: profile.cv.en, download: true },
    { label: 'CV · 中文', href: profile.cv.cn, download: true },
  ];

  return (
    <footer className="border-t border-hairline py-10">
      <div className="container-prose flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <p className="font-serif text-lg text-fg">{name}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {location} · {new Date().getFullYear()}
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-fg-muted">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="transition-colors hover:text-fg"
                {...(link.download ? { download: true } : {})}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
