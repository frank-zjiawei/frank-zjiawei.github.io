'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== 'undefined'
      ? localStorage.getItem('theme')
      : null) as Theme | null;
    const current: Theme =
      stored ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-fg-muted transition-colors hover:border-fg-muted hover:text-fg"
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        {mounted ? (
          theme === 'dark' ? (
            <Sun className="h-[14px] w-[14px]" strokeWidth={1.5} />
          ) : (
            <Moon className="h-[14px] w-[14px]" strokeWidth={1.5} />
          )
        ) : null}
      </span>
    </button>
  );
}
