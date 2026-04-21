'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { graphData, type GraphNode } from '@/content/graph';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-400">
        Initializing graph…
      </div>
    </div>
  ),
});

interface GraphProps {
  height?: number;
}

type RFGNode = GraphNode & {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  neighbors?: Set<string>;
};

export function KnowledgeGraph({ height = 560 }: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const router = useRouter();

  const [size, setSize] = useState({ width: 800, height });
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
  const data = useMemo(
    () => ({
      nodes: graphData.nodes.map((n) => ({ ...n })),
      links: graphData.links.map((l) => ({ ...l })),
    }),
    [],
  );

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

  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;
    // Tweak forces for a calm, wide layout
    fg.d3Force?.('charge')?.strength(isMobile ? -80 : -160);
    fg.d3Force?.('link')?.distance((l: any) => {
      const s = typeof l.source === 'object' ? l.source.id : l.source;
      if (s === 'frank') return 80;
      return 42;
    });
    fg.d3ReheatSimulation?.();
  }, [isMobile, data]);

  const isActive = (id: string) => {
    if (!hoverId) return true;
    if (id === hoverId) return true;
    return adjacency.get(hoverId)?.has(id) ?? false;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      style={{ height }}
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        width={size.width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        cooldownTicks={120}
        d3VelocityDecay={0.3}
        enableZoomInteraction={false}
        enablePanInteraction={!isMobile}
        nodeRelSize={4}
        nodeLabel={() => ''}
        linkColor={(link: any) => {
          const s = typeof link.source === 'object' ? link.source.id : link.source;
          const t = typeof link.target === 'object' ? link.target.id : link.target;
          const dim = hoverId && !(isActive(s) && isActive(t));
          return dim ? 'rgba(244,244,245,0.06)' : 'rgba(244,244,245,0.22)';
        }}
        linkWidth={(link: any) => {
          const s = typeof link.source === 'object' ? link.source.id : link.source;
          const t = typeof link.target === 'object' ? link.target.id : link.target;
          return hoverId && isActive(s) && isActive(t) ? 1 : 0.6;
        }}
        onNodeHover={(node: any) => {
          setHoverId(node?.id ?? null);
          if (containerRef.current) {
            containerRef.current.style.cursor = node ? 'pointer' : 'default';
          }
        }}
        onNodeClick={(node: any) => {
          if (node.href) {
            if (node.href.startsWith('/')) router.push(node.href);
            else window.location.href = node.href;
          }
        }}
        nodeCanvasObjectMode={() => 'replace'}
        nodeCanvasObject={(nRaw: any, ctx, globalScale) => {
          const n = nRaw as RFGNode;
          const active = isActive(n.id);
          const isRoot = n.group === 'root';
          const isDomain = n.group === 'domain';
          const radius = (n.size ?? 6) / 1.4;

          const baseAlpha = active ? 1 : 0.25;

          // Glow for hovered / root node
          if (hoverId === n.id || isRoot) {
            const grd = ctx.createRadialGradient(
              n.x!,
              n.y!,
              0,
              n.x!,
              n.y!,
              radius * 4,
            );
            grd.addColorStop(0, `rgba(244,244,245,${isRoot ? 0.35 : 0.45})`);
            grd.addColorStop(1, 'rgba(244,244,245,0)');
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(n.x!, n.y!, radius * 4, 0, Math.PI * 2);
            ctx.fill();
          }

          // Circle
          ctx.beginPath();
          ctx.arc(n.x!, n.y!, radius, 0, Math.PI * 2);
          if (isRoot || hoverId === n.id) {
            ctx.fillStyle = `rgba(244,244,245,${baseAlpha})`;
          } else {
            ctx.fillStyle = `rgba(10,10,10,${baseAlpha})`;
          }
          ctx.fill();
          ctx.lineWidth = 1 / globalScale;
          ctx.strokeStyle = `rgba(244,244,245,${baseAlpha * (isDomain ? 0.9 : 0.55)})`;
          ctx.stroke();

          // Label
          const fontSize = isRoot ? 11 : isDomain ? 10 : 9;
          ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = `rgba(244,244,245,${active ? (isRoot || isDomain ? 0.95 : 0.75) : 0.22})`;
          ctx.fillText(n.label, n.x!, n.y! + radius + 4);
        }}
      />

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-50" />
            Root
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full border border-ink-300" />
            Domain
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full border border-ink-500" />
            Project · Org
          </span>
        </div>
      </div>
    </div>
  );
}
