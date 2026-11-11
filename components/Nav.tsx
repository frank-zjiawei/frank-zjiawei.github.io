'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ThemeToggle } from './ThemeToggle';
import { CvMenu } from './CvMenu';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/experience', label: 'Experience' },
  { href: '/research', label: 'Papers' },
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

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-site-nav
      className={clsx(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-hairline bg-surface/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-6 md:h-[4.5rem] md:px-10">
        <Link
          href="/"
          className="shrink-0 font-serif text-[1.35rem] tracking-tight text-fg transition-opacity hover:opacity-70"
          aria-label="Jiawei Zhang — Home"
        >
          JZ
        </Link>

        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-1 items-center justify-end gap-6"
        >
          <ul className="hidden min-w-0 items-center gap-x-7 gap-y-1 md:flex md:flex-wrap md:justify-end">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-active={isActive(item.href) || undefined}
                  className={clsx(
                    'nav-link whitespace-nowrap',
                    isActive(item.href) && 'text-fg',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-3">
            <CvMenu />

            <button
              type="button"
              className="kbd hidden cursor-pointer transition-colors hover:border-fg-muted hover:text-fg md:inline-flex"
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

      {/* Small screens: the same links as a second row, so navigation never
          depends on a keyboard shortcut. */}
      <nav aria-label="Pages" className="md:hidden">
        <ul className="mx-auto flex w-full max-w-7xl items-center gap-x-6 overflow-x-auto px-6 pb-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                data-active={isActive(item.href) || undefined}
                className={clsx(
                  'nav-link whitespace-nowrap !text-[15px]',
                  isActive(item.href) && 'text-fg',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
