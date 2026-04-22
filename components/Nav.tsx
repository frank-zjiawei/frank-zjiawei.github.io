'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ThemeToggle } from './ThemeToggle';
import { CvMenu } from './CvMenu';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Jiawei' },
  { href: '/ai', label: 'AI' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/research', label: 'Research' },
  { href: '/academic', label: 'Academic' },
  { href: '/harvard', label: 'Harvard' },
  { href: '/boxing', label: 'Boxing' },
  { href: '/journal', label: 'Other writings' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-hairline bg-surface/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-6 md:px-10">
        <Link
          href="/"
          className="shrink-0 font-serif text-xl tracking-tight text-fg transition-opacity hover:opacity-70"
          aria-label="Jiawei Zhang — Home"
        >
          JZ
        </Link>

        <nav className="flex min-w-0 flex-1 items-center justify-end gap-5">
          <ul className="hidden min-w-0 items-center gap-x-6 gap-y-1 md:flex md:flex-wrap md:justify-end">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active || undefined}
                    className={clsx(
                      'nav-link whitespace-nowrap',
                      active && 'text-fg',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-3">
            <CvMenu />

            <button
              type="button"
              className="kbd cursor-pointer transition-colors hover:border-fg-muted hover:text-fg"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-command-menu'));
              }}
              aria-label="Open command menu"
            >
              <span className="text-[13px] leading-none">⌘</span>
              <span>K</span>
            </button>

            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
