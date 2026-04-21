'use client';

import {
  ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { graphData, type GraphNode } from '@/content/graph';

interface GraphProps {
  height?: number;
}

type LayoutMode = 'compact' | 'zoom';

const LAYOUT_LABELS: Record<LayoutMode, string> = {
  compact: 'Compact',
  zoom: 'Zoom in',
};

const LAYOUT_PRESETS: Record<
  LayoutMode,
  {
    charge: number;
    chargeMobile: number;
    chargeDistanceMax: number;
    linkDistanceRoot: number;
    linkDistance: number;
    linkStrength: number;
    centerStrength: number;
    seedInnerRing: number;
    seedOuterRing: number;
  }
> = {
  // Tight, Obsidian-on-overview-mode knot — everything pulled into a
  // single cluster, labels overlap like a dense galaxy.
  compact: {
    charge: -55,
    chargeMobile: -30,
    chargeDistanceMax: 240,
    linkDistanceRoot: 48,
    linkDistance: 22,
    linkStrength: 0.85,
    centerStrength: 0.18,
    seedInnerRing: 20,
    seedOuterRing: 48,
  },
  // Zoomed-in view — wider spread so every label is readable.
  zoom: {
    charge: -380,
    chargeMobile: -220,
    chargeDistanceMax: 640,
    linkDistanceRoot: 130,
    linkDistance: 72,
    linkStrength: 0.22,
    centerStrength: 0.015,
    seedInnerRing: 140,
    seedOuterRing: 260,
  },
};

type RFGNode = GraphNode & {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
};

interface Palette {
  fg: string;
  fgMuted: string;
  fgDim: string;
  link: string;
  linkDim: string;
  halo: string;
  nodeFill: string;
}

function readPalette(): Palette {
  if (typeof window === 'undefined') {
    return {
      fg: '10,10,10',
      fgMuted: '82,82,82',
      fgDim: '115,115,115',
      link: '10,10,10',
      linkDim: '10,10,10',
      halo: '10,10,10',
      nodeFill: '10,10,10',
    };
  }
  const css = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) =>
    (css.getPropertyValue(name).trim() || fallback).replace(/\s+/g, ',');
  return {
    fg: get('--fg', '10 10 10'),
    fgMuted: get('--fg-muted', '82 82 82'),
    fgDim: get('--fg-dim', '115 115 115'),
    link: get('--fg', '10 10 10'),
    linkDim: get('--fg-dim', '115 115 115'),
    halo: get('--accent', '10 10 10'),
    nodeFill: get('--fg', '10 10 10'),
  };
}

export function KnowledgeGraph({ height = 560 }: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const router = useRouter();

  const [ForceGraph2D, setForceGraph2D] =
    useState<ComponentType<any> | null>(null);
  const [size, setSize] = useState({ width: 800, height });
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [layout, setLayout] = useState<LayoutMode>('compact');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('graph-layout');
      if (stored === 'compact') setLayout('compact');
      else if (stored === 'zoom' || stored === 'sparse') setLayout('zoom');
    } catch {}
  }, []);

  const changeLayout = useCallback((next: LayoutMode) => {
    setLayout(next);
    try {
      localStorage.setItem('graph-layout', next);
    } catch {}
  }, []);
  const [palette, setPalette] = useState<Palette>(() => ({
    fg: '10,10,10',
    fgMuted: '82,82,82',
    fgDim: '115,115,115',
    link: '10,10,10',
    linkDim: '115,115,115',
    halo: '10,10,10',
    nodeFill: '10,10,10',
  }));

  // Lazy-load the canvas library on the client so refs flow through cleanly.
  useEffect(() => {
    let cancelled = false;
    import('react-force-graph-2d').then((mod) => {
      if (!cancelled) setForceGraph2D(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Track theme changes so colors follow the light/dark toggle.
  useEffect(() => {
    setPalette(readPalette());
    const html = document.documentElement;
    const observer = new MutationObserver(() => setPalette(readPalette()));
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Precompute neighbor adjacency for hover-highlight.
  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    graphData.nodes.forEach((n) => map.set(n.id, new Set<string>()));
    graphData.links.forEach((l) => {
      map.get(l.source)?.add(l.target);
      map.get(l.target)?.add(l.source);
    });
    return map;
  }, []);

  // Deep-cloned data each render avoids react-force-graph mutating the source.
  // Pre-seed node positions in a ring so the simulation has breathing room
  // before it settles — prevents the "all piled at origin" start flicker.
  const data = useMemo(() => {
    const preset = LAYOUT_PRESETS.compact;
    const others = graphData.nodes.filter((n) => n.group !== 'root');
    return {
      nodes: graphData.nodes.map((n) => {
        if (n.group === 'root') return { ...n, x: 0, y: 0 };
        const i = others.findIndex((o) => o.id === n.id);
        const angle = (i / others.length) * Math.PI * 2;
        const ring =
          n.group === 'domain' ? preset.seedInnerRing : preset.seedOuterRing;
        return {
          ...n,
          x: Math.cos(angle) * ring,
          y: Math.sin(angle) * ring,
        };
      }),
      links: graphData.links.map((l) => ({ ...l })),
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height });
      setIsMobile(rect.width < 640);
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  // Tune forces for that Obsidian-style springy web once the graph mounts.
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg || !ForceGraph2D) return;
    const preset = LAYOUT_PRESETS[layout];

    const charge = fg.d3Force?.('charge');
    if (charge) {
      charge.strength(isMobile ? preset.chargeMobile : preset.charge);
      charge.distanceMax?.(preset.chargeDistanceMax);
    }

    const link = fg.d3Force?.('link');
    if (link) {
      link.distance((l: any) => {
        const s = typeof l.source === 'object' ? l.source.id : l.source;
        const t = typeof l.target === 'object' ? l.target.id : l.target;
        if (s === 'frank' || t === 'frank') return preset.linkDistanceRoot;
        return preset.linkDistance;
      });
      link.strength(preset.linkStrength);
    }

    const center = fg.d3Force?.('center');
    if (center) center.strength?.(preset.centerStrength);

    fg.d3ReheatSimulation?.();
  }, [isMobile, ForceGraph2D, layout]);

  const isActive = useCallback(
    (id: string) => {
      if (!hoverId) return true;
      if (id === hoverId) return true;
      return adjacency.get(hoverId)?.has(id) ?? false;
    },
    [hoverId, adjacency],
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      style={{ height }}
    >
      {/* Layout toggle */}
      <div className="pointer-events-auto absolute right-3 top-3 z-10">
        <div
          role="group"
          aria-label="Graph layout"
          className="flex items-center gap-0.5 rounded-full border border-hairline bg-surface/70 p-0.5 font-mono text-[10px] uppercase tracking-[0.15em] backdrop-blur-sm"
        >
          {(['compact', 'zoom'] as LayoutMode[]).map((mode) => {
            const active = layout === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => changeLayout(mode)}
                aria-pressed={active}
                className={
                  'rounded-full px-2.5 py-1 transition-colors ' +
                  (active
                    ? 'bg-fg text-surface'
                    : 'text-fg-muted hover:text-fg')
                }
              >
                {LAYOUT_LABELS[mode]}
              </button>
            );
          })}
        </div>
      </div>

      {ForceGraph2D ? (
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          width={size.width}
          height={height}
          backgroundColor="rgba(0,0,0,0)"
          cooldownTicks={Infinity}
          warmupTicks={60}
          d3AlphaDecay={0.018}
          d3VelocityDecay={0.32}
          enableNodeDrag
          enableZoomInteraction={false}
          enablePanInteraction={!isMobile}
          nodeRelSize={4}
          nodeLabel={() => ''}
          linkColor={(link: any) => {
            const s =
              typeof link.source === 'object' ? link.source.id : link.source;
            const t =
              typeof link.target === 'object' ? link.target.id : link.target;
            const dim = hoverId && !(isActive(s) && isActive(t));
            return dim
              ? `rgba(${palette.linkDim},0.15)`
              : `rgba(${palette.link},0.28)`;
          }}
          linkWidth={(link: any) => {
            const s =
              typeof link.source === 'object' ? link.source.id : link.source;
            const t =
              typeof link.target === 'object' ? link.target.id : link.target;
            return hoverId && isActive(s) && isActive(t) ? 1.25 : 0.75;
          }}
          onNodeHover={(node: any) => {
            setHoverId(node?.id ?? null);
            if (containerRef.current) {
              containerRef.current.style.cursor = node ? 'grab' : 'default';
            }
          }}
          onNodeDragEnd={(node: any) => {
            if (containerRef.current) {
              containerRef.current.style.cursor = 'grab';
            }
            // Release the node so the web can settle after dragging.
            node.fx = null;
            node.fy = null;
          }}
          onNodeClick={(node: any) => {
            if (node.href) {
              if (node.href.startsWith('/')) router.push(node.href);
              else window.location.href = node.href;
            }
          }}
          nodeCanvasObjectMode={() => 'replace'}
          nodeCanvasObject={(nRaw: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const n = nRaw as RFGNode;
            const x = n.x;
            const y = n.y;
            if (
              typeof x !== 'number' ||
              typeof y !== 'number' ||
              !Number.isFinite(x) ||
              !Number.isFinite(y)
            ) {
              return;
            }

            const active = isActive(n.id);
            const isRoot = n.group === 'root';
            const isDomain = n.group === 'domain';
            const radius = (n.size ?? 6) / 1.4;

            const baseAlpha = active ? 1 : 0.22;

            if (hoverId === n.id || isRoot) {
              const grd = ctx.createRadialGradient(x, y, 0, x, y, radius * 4.5);
              grd.addColorStop(
                0,
                `rgba(${palette.halo},${isRoot ? 0.3 : 0.38})`,
              );
              grd.addColorStop(1, `rgba(${palette.halo},0)`);
              ctx.fillStyle = grd;
              ctx.beginPath();
              ctx.arc(x, y, radius * 4.5, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            if (isRoot || hoverId === n.id) {
              ctx.fillStyle = `rgba(${palette.nodeFill},${baseAlpha})`;
            } else {
              ctx.fillStyle = `rgba(${palette.nodeFill},${baseAlpha * 0.12})`;
            }
            ctx.fill();
            ctx.lineWidth = 1 / globalScale;
            ctx.strokeStyle = `rgba(${palette.nodeFill},${baseAlpha * (isDomain ? 0.95 : 0.6)})`;
            ctx.stroke();

            const fontSize = isRoot ? 11 : isDomain ? 10 : 9;
            ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            const textColor =
              isRoot || isDomain ? palette.fg : palette.fgMuted;
            ctx.fillStyle = `rgba(${textColor},${active ? (isRoot || isDomain ? 0.95 : 0.72) : 0.2})`;
            ctx.fillText(n.label, x, y + radius + 4);
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
            Initializing graph…
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-fg" />
            Root
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full border border-fg-muted" />
            Domain
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full border border-fg-faint" />
            Project · Org
          </span>
        </div>
      </div>
    </div>
  );
}
