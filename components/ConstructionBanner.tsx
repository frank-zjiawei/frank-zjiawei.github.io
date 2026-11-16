'use client';

import { ui } from '@/lib/i18n';
import { useTx } from '@/components/LocaleText';

export function ConstructionBanner() {
  const { pick } = useTx();

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-50 w-full border-b border-hairline bg-surface-2 text-fg"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-6 py-2 md:px-10">
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 animate-pulse-slow rounded-full bg-fg"
        />
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted md:text-[12px]">
          {pick(ui.banner)}
        </p>
      </div>
    </div>
  );
}
