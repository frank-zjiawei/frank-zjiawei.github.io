'use client';

import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Briefcase,
  User,
  Network,
  Home,
  Mail,
  Instagram,
  Linkedin,
  Github,
  FileDown,
  Dumbbell,
  GraduationCap,
} from 'lucide-react';
import { profile } from '@/content/profile';

const ITEMS = [
  { href: '/', label: 'Home', icon: Home, group: 'Navigate' },
  { href: '/about', label: 'About Me', icon: User, group: 'Navigate' },
  { href: '/about/interests', label: 'Interests · Boxing', icon: Dumbbell, group: 'Navigate' },
  { href: '/experience', label: 'Experience', icon: Briefcase, group: 'Navigate' },
  { href: '/research', label: 'Papers', icon: BookOpen, group: 'Navigate' },
  { href: '/graph', label: 'Site map (full graph)', icon: Network, group: 'Navigate' },
  {
    href: '/cv/Jiawei_Zhang_CV_EN.pdf',
    label: 'Download CV — English',
    icon: FileDown,
    group: 'Downloads',
    external: true,
  },
  {
    href: '/cv/Jiawei_Zhang_CV_CN.pdf',
    label: '下载简历 — 中文',
    icon: FileDown,
    group: 'Downloads',
    external: true,
  },
  {
    href: `mailto:${profile.email}`,
    label: 'Email Jiawei',
    icon: Mail,
    group: 'Connect',
    external: true,
  },
  {
    href: profile.links.scholar,
    label: 'Google Scholar',
    icon: GraduationCap,
    group: 'Connect',
    external: true,
  },
  {
    href: 'https://www.instagram.com/frankjiaweizhang/',
    label: 'Instagram',
    icon: Instagram,
    group: 'Connect',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/frank-zhang-7a8944198/',
    label: 'LinkedIn',
    icon: Linkedin,
    group: 'Connect',
    external: true,
  },
  {
    href: 'https://github.com/frank-zjiawei',
    label: 'GitHub',
    icon: Github,
    group: 'Connect',
    external: true,
  },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-menu', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-menu', onOpen);
    };
  }, []);

  const go = (href: string, external?: boolean) => {
    setOpen(false);
    if (external) {
      window.location.href = href;
    } else {
      router.push(href);
    }
  };

  if (!open) return null;

  const groups = Array.from(new Set(ITEMS.map((i) => i.group)));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="fixed inset-0 bg-surface/80 backdrop-blur-sm"
        aria-hidden
      />
      <Command
        label="Command Menu"
        className="relative w-full max-w-xl overflow-hidden rounded-sm border border-hairline bg-surface-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input
          placeholder="Type a command or search..."
          className="w-full border-b border-hairline bg-transparent px-4 py-3.5 text-sm text-fg outline-none placeholder:text-fg-dim"
        />
        <Command.List className="max-h-80 overflow-y-auto px-2 py-2">
          <Command.Empty className="px-3 py-8 text-center font-mono text-xs text-fg-dim">
            No results found.
          </Command.Empty>
          {groups.map((group) => (
            <Command.Group
              key={group}
              heading={group}
              className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-fg-dim"
            >
              {ITEMS.filter((i) => i.group === group).map((item) => {
                const Icon = item.icon;
                return (
                  <Command.Item
                    key={item.href}
                    value={item.label}
                    onSelect={() => go(item.href, item.external)}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-fg aria-selected:bg-hairline/60 aria-selected:text-fg"
                  >
                    <Icon className="h-4 w-4 text-fg-dim" strokeWidth={1.5} />
                    <span>{item.label}</span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          ))}
        </Command.List>
        <div className="flex items-center justify-between border-t border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span>Navigate</span>
          <span>Esc to close</span>
        </div>
      </Command>
    </div>
  );
}
