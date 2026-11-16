'use client';

import { useTx } from '@/components/LocaleText';
import type { Bilingual } from '@/lib/i18n';

interface PageHeaderProps {
  eyebrow: Bilingual | string;
  title: Bilingual | string;
  description?: Bilingual | string;
}

function resolve(
  locale: 'en' | 'zh',
  value: Bilingual | string | undefined,
): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'string') return value;
  return value[locale];
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  const { locale } = useTx();

  return (
    <header className="container-prose pt-20 pb-10 md:pt-28 md:pb-14">
      <p className="section-eyebrow">{resolve(locale, eyebrow)}</p>
      <h1 className="mt-5 font-serif text-[clamp(2rem,5.5vw,3.75rem)] font-normal leading-[1.12] tracking-tight text-fg">
        {resolve(locale, title)}
      </h1>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
          {resolve(locale, description)}
        </p>
      ) : null}
    </header>
  );
}
