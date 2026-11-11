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
import { createOrb, type Orb, type OrbTheme } from '@/lib/orb';

const KnowledgeGraph = dynamic(
  () =>
    import('@/components/KnowledgeGraph').then((m) => m.KnowledgeGraph),
  { ssr: false },
);

type Corner = 'tl' | 'tr' | 'bl' | 'br';

const MARGIN = 20;
const DRAG_THRESHOLD = 5;
const STORAGE_KEY = 'nebula-corner';
const HINT_KEY = 'nebula-hint-seen';

const orbSize = (vw: number) => (vw < 640 ? 88 : 104);

const currentTheme = (): OrbTheme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/**
 * How far down the top corners must sit to clear the site header. Measured
 * rather than hard-coded: the nav is taller on phones (links wrap to a second
 * row), and the banner above it adds height at the top of the page.
 */
function topClearance() {
  const nav = document.querySelector<HTMLElement>('[data-site-nav]');
  if (!nav) return 96;
  const banner = nav.previousElementSibling as HTMLElement | null;
  return (banner?.offsetHeight ?? 0) + nav.offsetHeight + 12;
}

function cornerToPos(corner: Corner, vw: number, vh: number, size: number) {
  const left = corner === 'tl' || corner === 'bl';
  const top = corner === 'tl' || corner === 'tr';
  return {
    x: left ? MARGIN : vw - size - MARGIN,
    y: top ? topClearance() : vh - size - MARGIN,
  };
}

function nearestCorner(
  x: number,
  y: number,
  vw: number,
  vh: number,
  size: number,
): Corner {
  const left = x + size / 2 < vw / 2;
  const top = y + size / 2 < vh / 2;
  if (top) return left ? 'tl' : 'tr';
  return left ? 'bl' : 'br';
}

export function NebulaFab() {
  const pathname = usePathname();
  const onGraphPage = pathname === '/graph' || pathname?.startsWith('/graph/');
  const isHome = pathname === '/' || pathname === '';

  const [open, setOpen] = useState(false);
  const [corner, setCorner] = useState<Corner>('br');
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(104);
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<Orb | null>(null);
  const openRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    // pointer offset inside the orb, and where the pointer went down
    ox: number;
    oy: number;
    startX: number;
    startY: number;
    lastX: number;
    moved: boolean;
  } | null>(null);

  const placeCorner = useCallback((c: Corner) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = orbSize(vw);
    setSize(s);
    setCorner(c);
    setPos(cornerToPos(c, vw, vh, s));
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {}
  }, []);

  // Restore the last corner the visitor parked the orb in.
  useEffect(() => {
    if (onGraphPage) return;
    let initial: Corner = 'br';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
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

  // The orb only animates while it can be seen: not behind the open map, not
  // in a background tab, and not for visitors who prefer reduced motion.
  const syncOrbPlayback = useCallback(() => {
    const orb = orbRef.current;
    if (!orb) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || document.hidden || openRef.current) orb.stop();
    else orb.start();
  }, []);

  useEffect(() => {
    if (!ready || onGraphPage || !canvasRef.current) return;
    const orb = createOrb(canvasRef.current, {
      size: orbSize(window.innerWidth),
      theme: currentTheme(),
    });
    orbRef.current = orb;
    if (!orb) return;

    syncOrbPlayback();
    const themeObserver = new MutationObserver(() => orb.setTheme(currentTheme()));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.addEventListener('visibilitychange', syncOrbPlayback);
    motion.addEventListener('change', syncOrbPlayback);

    return () => {
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', syncOrbPlayback);
      motion.removeEventListener('change', syncOrbPlayback);
      orb.destroy();
      orbRef.current = null;
    };
  }, [ready, onGraphPage, syncOrbPlayback]);

  useEffect(() => {
    orbRef.current?.setSize(size);
  }, [size]);

  useEffect(() => {
    openRef.current = open;
    syncOrbPlayback();
  }, [open, syncOrbPlayback]);

  // A quiet "this is interactive" hint on the first visit to the home page.
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
    }, 6000);
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

  const dismissHint = () => {
    setShowHint(false);
    try {
      localStorage.setItem(HINT_KEY, '1');
    } catch {}
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    // Capture keeps the drag alive when the pointer outruns the orb. It can
    // throw if the pointer is already gone; the drag still works without it.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    dragRef.current = {
      pointerId: e.pointerId,
      ox: e.clientX - pos.x,
      oy: e.clientY - pos.y,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      moved: false,
    };
    setDragging(true);
    dismissHint();
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const orb = orbRef.current;
    const d = dragRef.current;

    if (!d || d.pointerId !== e.pointerId) {
      // Hovering: the globe leans toward the cursor.
      const rect = e.currentTarget.getBoundingClientRect();
      orb?.setPointer(
        (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
      );
      return;
    }

    if (
      Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > DRAG_THRESHOLD
    ) {
      d.moved = true;
    }
    // Dragging sideways spins the globe, like turning it by hand.
    orb?.kick((e.clientX - d.lastX) * 0.05);
    d.lastX = e.clientX;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPos({
      x: Math.min(Math.max(8, e.clientX - d.ox), vw - size - 8),
      y: Math.min(Math.max(8, e.clientY - d.oy), vh - size - 8),
    });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    placeCorner(
      nearestCorner(pos.x, pos.y, window.innerWidth, window.innerHeight, size),
    );
    if (!d.moved && e.type === 'pointerup') setOpen(true);
  };

  if (onGraphPage || !ready) return null;

  const hintOnRight = corner === 'tl' || corner === 'bl';

  return (
    <>
      {showHint && !open ? (
        <div
          className="pointer-events-none fixed z-[45] w-[156px] rounded-xl border border-hairline bg-surface/95 px-3 py-2 text-center shadow-[0_8px_24px_rgba(var(--shadow),0.12)] backdrop-blur-md"
          style={{
            left: hintOnRight ? pos.x : Math.max(12, pos.x + size - 156),
            top: Math.max(12, pos.y - 50),
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
        onPointerEnter={() => orbRef.current?.setHover(true)}
        onPointerLeave={() => {
          orbRef.current?.setHover(false);
          orbRef.current?.setPointer(0, 0);
        }}
        onFocus={() => orbRef.current?.setHover(true)}
        onBlur={() => orbRef.current?.setHover(false)}
        // Pointer presses are handled above; this covers Enter / Space.
        onClick={(e) => {
          if (e.detail === 0) setOpen(true);
        }}
        aria-label="Open site map — drag to move"
        aria-haspopup="dialog"
        title="Site map"
        className={clsx(
          'nebula-orb fixed z-40 touch-none select-none',
          dragging ? 'nebula-orb--dragging cursor-grabbing' : 'cursor-grab',
          showHint && 'nebula-orb--hint',
        )}
        style={{
          width: size,
          height: size,
          left: pos.x,
          top: pos.y,
          transition: dragging
            ? 'none'
            : 'left 380ms cubic-bezier(0.22,1,0.36,1), top 380ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span className="nebula-orb__shadow" aria-hidden />
        <span className="nebula-orb__lift" aria-hidden>
          <span className="nebula-orb__ping" />
          <canvas ref={canvasRef} className="nebula-orb__canvas" />
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
              <KnowledgeGraph height={640} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
