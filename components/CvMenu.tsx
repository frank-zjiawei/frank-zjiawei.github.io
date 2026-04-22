'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';

const CVS = [
  { lang: 'EN', label: 'English', href: '/cv/Jiawei_Zhang_CV_EN.pdf' },
  { lang: 'CN', label: '中文', href: '/cv/Jiawei_Zhang_CV_CN.pdf' },
];

export function CvMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:border-gold hover:text-fg"
      >
        CV
        <ChevronDown
          className={
            'h-3 w-3 transition-transform ' + (open ? 'rotate-180' : '')
          }
          strokeWidth={2}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-sm border border-hairline bg-surface-2 shadow-xl"
        >
          {CVS.map((cv) => (
            <a
              key={cv.lang}
              href={cv.href}
              download
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 border-b border-hairline px-3 py-2.5 text-sm text-fg transition-colors last:border-b-0 hover:bg-hairline/50"
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                  {cv.lang}
                </span>
                <span>{cv.label}</span>
              </span>
              <Download className="h-3.5 w-3.5 text-fg-dim" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
