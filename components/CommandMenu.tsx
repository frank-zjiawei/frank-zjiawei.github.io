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
import { ui } from '@/lib/i18n';
import { useTx } from '@/components/LocaleText';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { pick } = useTx();

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

  const items = [
    {
      href: '/',
      label: pick(ui.command.home),
      icon: Home,
      group: pick(ui.command.navigate),
    },
    {
      href: '/about',
      label: pick(ui.command.about),
      icon: User,
      group: pick(ui.command.navigate),
    },
    {
      href: '/about/interests',
      label: pick(ui.command.interests),
      icon: Dumbbell,
      group: pick(ui.command.navigate),
    },
    {
      href: '/experience',
      label: pick(ui.command.experience),
      icon: Briefcase,
      group: pick(ui.command.navigate),
    },
    {
      href: '/research',
      label: pick(ui.command.papers),
      icon: BookOpen,
      group: pick(ui.command.navigate),
    },
    {
      href: '/graph',
      label: pick(ui.command.graph),
      icon: Network,
      group: pick(ui.command.navigate),
    },
    {
      href: '/cv/Jiawei_Zhang_CV_EN.pdf',
      label: pick(ui.command.cvEn),
      icon: FileDown,
      group: pick(ui.command.downloads),
      external: true,
    },
    {
      href: '/cv/Jiawei_Zhang_CV_CN.pdf',
      label: pick(ui.command.cvZh),
      icon: FileDown,
      group: pick(ui.command.downloads),
      external: true,
    },
    {
      href: `mailto:${profile.email}`,
      label: pick(ui.command.email),
      icon: Mail,
      group: pick(ui.command.connect),
      external: true,
    },
    {
      href: profile.links.scholar,
      label: 'Google Scholar',
      icon: GraduationCap,
      group: pick(ui.command.connect),
      external: true,
    },
    {
      href: profile.links.instagram,
      label: 'Instagram',
      icon: Instagram,
      group: pick(ui.command.connect),
      external: true,
    },
    {
      href: profile.links.linkedin,
      label: 'LinkedIn',
      icon: Linkedin,
      group: pick(ui.command.connect),
      external: true,
    },
    {
      href: profile.links.github,
      label: 'GitHub',
      icon: Github,
      group: pick(ui.command.connect),
      external: true,
    },
  ];

  const groups = Array.from(new Set(items.map((i) => i.group)));

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
          placeholder={
            pick({
              en: 'Type a command or search...',
              zh: '输入命令或搜索…',
            })
          }
          className="w-full border-b border-hairline bg-transparent px-4 py-3.5 text-sm text-fg outline-none placeholder:text-fg-dim"
        />
        <Command.List className="max-h-80 overflow-y-auto px-2 py-2">
          <Command.Empty className="px-3 py-8 text-center font-mono text-xs text-fg-dim">
            {pick({ en: 'No results found.', zh: '没有找到结果。' })}
          </Command.Empty>
          {groups.map((group) => (
            <Command.Group
              key={group}
              heading={group}
              className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-fg-dim"
            >
              {items
                .filter((i) => i.group === group)
                .map((item) => {
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
          <span>{pick(ui.command.navigate)}</span>
          <span>{pick({ en: 'Esc to close', zh: 'Esc 关闭' })}</span>
        </div>
      </Command>
    </div>
  );
}
