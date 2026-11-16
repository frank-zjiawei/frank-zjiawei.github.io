'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'en' | 'zh';

const STORAGE_KEY = 'locale';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  mounted: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  document.documentElement.dataset.locale = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {}
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const next: Locale = stored === 'zh' ? 'zh' : 'en';
    setLocaleState(next);
    applyLocale(next);
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    applyLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === 'en' ? 'zh' : 'en';
      applyLocale(next);
      return next;
    });
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, mounted }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}
