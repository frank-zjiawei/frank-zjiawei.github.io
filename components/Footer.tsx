import { profile } from '@/content/profile';

const LINKS: { label: string; href: string; download?: boolean }[] = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'Google Scholar', href: profile.links.scholar },
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'GitHub', href: profile.links.github },
  { label: 'Instagram', href: profile.links.instagram },
  { label: 'CV · EN', href: profile.cv.en, download: true },
  { label: 'CV · 中文', href: profile.cv.cn, download: true },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="container-prose flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <p className="font-serif text-lg text-fg">{profile.name}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {profile.location} · {new Date().getFullYear()}
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-fg-muted">
          {LINKS.map((link) => (
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
