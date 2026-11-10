'use client';

import { Globe2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const KnowledgeGraph = dynamic(
  () =>
    import('@/components/KnowledgeGraph').then((m) => m.KnowledgeGraph),
  { ssr: false },
);

export function NebulaFab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onGraphPage = pathname === '/graph' || pathname?.startsWith('/graph/');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (onGraphPage) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Nav Nebula"
        title="Nav Nebula"
        className="fixed bottom-6 right-6 z-40 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full border border-hairline bg-surface/90 text-fg shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:border-gold/60 md:bottom-8 md:right-8"
      >
        <Globe2 className="h-9 w-9 text-fg" strokeWidth={1.25} />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-fg-dim">
          Nebula
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-8">
          <button
            type="button"
            aria-label="Close Nav Nebula"
            className="absolute inset-0 bg-[#111]/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Nav Nebula"
            className="relative z-10 flex h-[min(88vh,820px)] w-full max-w-5xl flex-col overflow-hidden border border-hairline bg-surface shadow-2xl md:rounded-sm"
          >
            <header className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4 md:px-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
                  Navigation map
                </p>
                <h2 className="mt-1 font-serif text-2xl text-fg">Nav Nebula</h2>
                <p className="mt-1 max-w-xl text-sm text-fg-muted">
                  Drag a node to pull the web. Hover to trace links. Click to
                  open a page.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href="/graph/"
                  className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted transition-colors hover:text-fg sm:inline"
                  onClick={() => setOpen(false)}
                >
                  Full screen ↗
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-fg-muted transition-colors hover:text-fg"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </header>
            <div className="min-h-0 flex-1 bg-surface">
              <KnowledgeGraph height={640} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
