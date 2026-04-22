'use client';

import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain,
  LineChart,
  GraduationCap,
  BookOpen,
  PenLine,
  User,
  Network,
  Home,
  Mail,
  Instagram,
  Linkedin,
  Github,
  FileDown,
  School,
  Dumbbell,
} from 'lucide-react';

const ITEMS = [
  { href: '/', label: 'Home', icon: Home, group: 'Navigate' },
  { href: '/about', label: 'About Jiawei', icon: User, group: 'Navigate' },
  { href: '/ai', label: 'AI Initiatives', icon: Brain, group: 'Navigate' },
  { href: '/analytics', label: 'Business Analytics', icon: LineChart, group: 'Navigate' },
  { href: '/research', label: 'Research & Publications', icon: BookOpen, group: 'Navigate' },
  { href: '/academic', label: 'Academic', icon: GraduationCap, group: 'Navigate' },
  { href: '/harvard', label: 'Harvard', icon: School, group: 'Navigate' },
  { href: '/boxing', label: 'Boxing', icon: Dumbbell, group: 'Navigate' },
  { href: '/journal', label: 'Other writings', icon: PenLine, group: 'Navigate' },
  { href: '/graph', label: 'Nav Nebula (full graph)', icon: Network, group: 'Navigate' },
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
    href: 'mailto:frankwei312@gmail.com',
    label: 'Email Jiawei',
    icon: Mail,
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
