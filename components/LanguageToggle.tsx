'use client';

import { useLocale } from '@/lib/locale';
import { ui } from '@/lib/i18n';

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();
  // Show the language you can switch to.
  const label = locale === 'en' ? '/Cn' : '/En';
  const title =
    locale === 'en' ? ui.language.switchToZh[locale] : ui.language.switchToEn[locale];

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={title}
      title={title}
      className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-hairline px-2.5 font-mono text-[12px] leading-none tracking-tight text-fg-muted transition-colors hover:border-fg-muted hover:text-fg"
    >
      {label}
    </button>
  );
}
