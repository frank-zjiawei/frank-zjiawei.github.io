'use client';

import { useLocale, type Locale } from '@/lib/locale';
import { pick, type Bilingual } from '@/lib/i18n';

/** Renders the string that matches the current language. */
export function LocaleText({ en, zh }: Bilingual) {
  const { locale } = useLocale();
  return <>{pick(locale, { en, zh })}</>;
}

/** Convenience hook for components that need many translated strings. */
export function useTx() {
  const { locale } = useLocale();
  return {
    locale,
    t: (en: string, zh: string) => (locale === 'zh' ? zh : en),
    pick: (value: Bilingual) => pick(locale, value),
  };
}

export function useLocalized<T>(en: T, zh: T): T {
  const { locale } = useLocale();
  return locale === 'zh' ? zh : en;
}

export type { Locale };
