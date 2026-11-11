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

const SIZE = 104;
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
          className="pointer-events-none fixed z-[45] w-[150px] rounded-xl border border-hairline bg-surface/95 px-3 py-2 text-center shadow-[0_8px_24px_rgba(var(--shadow),0.12)] backdrop-blur-md"
          style={{
            left:
              corner === 'tr' || corner === 'br'
                ? Math.max(12, pos.x - 48)
                : pos.x,
            top: Math.max(12, pos.y - 56),
          }}
        >
          <p className="text-[11px] leading-snug text-fg-muted">
            Tap to open · drag to a corner
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Open site map — drag to move"
        title="Site map — drag to a corner"
        className={clsx(
          'nebula-orb fixed z-40 touch-none select-none',
          dragging ? 'cursor-grabbing nebula-orb--dragging' : 'cursor-grab',
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
        <span className="nebula-orb__shadow" aria-hidden />
        <span className="nebula-orb__lift" aria-hidden>
          <span className="nebula-orb__sphere">
            <span className="nebula-orb__atmosphere" />
            <span className="nebula-orb__globe" aria-hidden>
              <svg viewBox="0 0 100 100" className="nebula-orb__svg">
                <defs>
                  <clipPath id="nebula-clip">
                    <circle cx="50" cy="50" r="46" />
                  </clipPath>
                  <radialGradient id="nebula-fill" cx="32%" cy="28%" r="70%">
                    <stop offset="0%" stopColor="#f7f1e6" stopOpacity="0.95" />
                    <stop offset="42%" stopColor="#c4b39a" stopOpacity="0.9" />
                    <stop offset="78%" stopColor="#6e6356" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#2f2a25" />
                  </radialGradient>
                </defs>
                <g clipPath="url(#nebula-clip)">
                  <circle cx="50" cy="50" r="46" fill="url(#nebula-fill)" />
                  <g className="nebula-orb__latlong">
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="46"
                      ry="18"
                      fill="none"
                      stroke="rgba(255,248,236,0.28)"
                      strokeWidth="0.6"
                    />
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="46"
                      ry="32"
                      fill="none"
                      stroke="rgba(255,248,236,0.18)"
                      strokeWidth="0.55"
                    />
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="18"
                      ry="46"
                      fill="none"
                      stroke="rgba(255,248,236,0.22)"
                      strokeWidth="0.55"
                    />
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="32"
                      ry="46"
                      fill="none"
                      stroke="rgba(184,137,62,0.28)"
                      strokeWidth="0.55"
                    />
                    <path
                      d="M4 50 H96"
                      fill="none"
                      stroke="rgba(255,248,236,0.2)"
                      strokeWidth="0.5"
                    />
                  </g>
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="url(#nebula-fill)"
                    opacity="0.22"
                    style={{ mixBlendMode: 'soft-light' }}
                  />
                </g>
                <circle
                  cx="50"
                  cy="50"
                  r="46.6"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="0.8"
                />
              </svg>
            </span>
            <span className="nebula-orb__specular" />
            <span className="nebula-orb__glass" />
          </span>
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:p-6 md:items-center md:p-8">
          <button
            type="button"
            aria-label="Close site map"
            className="absolute inset-0 bg-[rgb(var(--fg))]/35 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site map"
            className="relative z-10 flex h-[min(88vh,820px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_24px_64px_rgba(var(--shadow),0.22)] md:rounded-3xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4 md:px-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
                  Navigation
                </p>
                <h2 className="mt-1 font-serif text-2xl text-fg">Site map</h2>
                <p className="mt-1 max-w-xl text-sm text-fg-muted">
                  About · Experience · Papers. Drag a node, hover for links,
                  click to open.
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
