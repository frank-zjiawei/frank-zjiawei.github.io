'use client';

import { X } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const KnowledgeGraph = dynamic(
  () =>
    import('@/components/KnowledgeGraph').then((m) => m.KnowledgeGraph),
  { ssr: false },
);

type Corner = 'tl' | 'tr' | 'bl' | 'br';

const SIZE = 112; // ~3.5× theme toggle (32px)
const MARGIN = 24;
const STORAGE_KEY = 'nebula-corner';
const HINT_KEY = 'nebula-hint-seen';

function cornerToPos(corner: Corner, vw: number, vh: number) {
  const x = corner === 'tl' || corner === 'bl' ? MARGIN : vw - SIZE - MARGIN;
  const y = corner === 'tl' || corner === 'tr' ? MARGIN : vh - SIZE - MARGIN;
  // keep below sticky nav on top corners
  const topSafe = corner === 'tl' || corner === 'tr' ? Math.max(MARGIN, 88) : y;
  return {
    x: corner === 'tl' || corner === 'bl' ? MARGIN : vw - SIZE - MARGIN,
    y: topSafe,
  };
}

function nearestCorner(x: number, y: number, vw: number, vh: number): Corner {
  const cx = x + SIZE / 2;
  const cy = y + SIZE / 2;
  const left = cx < vw / 2;
  const top = cy < vh / 2;
  if (top && left) return 'tl';
  if (top && !left) return 'tr';
  if (!top && left) return 'bl';
  return 'br';
}

export function NebulaFab() {
  const pathname = usePathname();
  const onGraphPage = pathname === '/graph' || pathname?.startsWith('/graph/');
  const isHome = pathname === '/' || pathname === '';

  const [open, setOpen] = useState(false);
  const [corner, setCorner] = useState<Corner>('br');
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);

  const placeCorner = useCallback((c: Corner) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setCorner(c);
    setPos(cornerToPos(c, vw, vh));
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {}
  }, []);

  useEffect(() => {
    if (onGraphPage) return;
    let initial: Corner = 'br';
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Corner | null;
      if (stored === 'tl' || stored === 'tr' || stored === 'bl' || stored === 'br') {
        initial = stored;
      }
    } catch {}
    placeCorner(initial);
    setReady(true);
  }, [onGraphPage, placeCorner]);

  useEffect(() => {
    if (!ready) return;
    const onResize = () => placeCorner(corner);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [ready, corner, placeCorner]);

  // Soft “look here” hint on first home visit
  useEffect(() => {
    if (!isHome || onGraphPage) return;
    try {
      if (localStorage.getItem(HINT_KEY)) return;
    } catch {}
    setShowHint(true);
    const t = setTimeout(() => {
      setShowHint(false);
      try {
        localStorage.setItem(HINT_KEY, '1');
      } catch {}
    }, 5200);
    return () => clearTimeout(t);
  }, [isHome, onGraphPage]);

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

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      ox: e.clientX - pos.x,
      oy: e.clientY - pos.y,
      moved: false,
    };
    setDragging(true);
    setShowHint(false);
    try {
      localStorage.setItem(HINT_KEY, '1');
    } catch {}
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const nx = e.clientX - d.ox;
    const ny = e.clientY - d.oy;
    if (Math.hypot(nx - pos.x, ny - pos.y) > 4) d.moved = true;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPos({
      x: Math.min(Math.max(8, nx), vw - SIZE - 8),
      y: Math.min(Math.max(8, ny), vh - SIZE - 8),
    });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const moved = d.moved;
    dragRef.current = null;
    setDragging(false);
    const next = nearestCorner(pos.x, pos.y, window.innerWidth, window.innerHeight);
    placeCorner(next);
    if (!moved) setOpen(true);
  };

  if (onGraphPage || !ready) return null;

  return (
    <>
      {/* hint bubble */}
      {showHint && !open ? (
        <div
          className="pointer-events-none fixed z-[45] w-[168px] rounded-2xl border border-hairline bg-surface/95 px-3 py-2 text-center shadow-lg backdrop-blur-md"
          style={{
            left:
              corner === 'tr' || corner === 'br'
                ? Math.max(12, pos.x - 56)
                : pos.x,
            top: Math.max(12, pos.y - 62),
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg">
            Look here · Nebula
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-fg-muted">
            Tap to open · drag to any corner
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Open Nav Nebula — drag to move"
        title="Nav Nebula — drag to a corner"
        className={clsx(
          'nebula-orb fixed z-40 touch-none select-none',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
          showHint && 'nebula-orb--hint',
        )}
        style={{
          width: SIZE,
          height: SIZE,
          left: pos.x,
          top: pos.y,
          transition: dragging
            ? 'none'
            : 'left 320ms cubic-bezier(0.22,1,0.36,1), top 320ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span className="nebula-orb__glow" aria-hidden />
        <span className="nebula-orb__ring" aria-hidden />
        <span className="nebula-orb__core" aria-hidden>
          <span className="nebula-orb__shine" />
          <span className="nebula-orb__label">Nebula</span>
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:p-6 md:items-center md:p-8">
          <button
            type="button"
            aria-label="Close Nav Nebula"
            className="absolute inset-0 bg-[#0b1020]/55 backdrop-blur-[3px]"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Nav Nebula"
            className="relative z-10 flex h-[min(88vh,820px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-surface shadow-[0_24px_80px_rgba(10,16,40,0.35)] md:rounded-3xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4 md:px-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
                  Site map
                </p>
                <h2 className="mt-1 font-serif text-2xl text-fg">Nav Nebula</h2>
                <p className="mt-1 max-w-xl text-sm text-fg-muted">
                  Three hubs: About · Experience · Papers. Drag a node, hover to
                  see links, click to open.
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
