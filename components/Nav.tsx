'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { href: '/ai', label: 'AI' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/research', label: 'Research' },
  { href: '/academic', label: 'Academic' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
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
          ? 'border-b border-ink-700 bg-ink-950/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="container-prose flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg tracking-tightest text-ink-50 transition-opacity hover:opacity-70"
          aria-label="Frank Zhang — Home"
        >
          FZ
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'nav-link',
                      active && 'text-ink-50',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="kbd cursor-pointer transition-colors hover:border-ink-300 hover:text-ink-50"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-command-menu'));
            }}
            aria-label="Open command menu"
          >
            <span className="text-[13px] leading-none">⌘</span>
            <span>K</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
