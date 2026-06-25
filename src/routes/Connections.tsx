import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { buildGraph } from '@/content/connections';
import { equations } from '@/content/index';
import { connectionsOf } from '@/content/connections';
import { cssVar } from '@/viz/shared/useCanvas';
import { usePrefersReducedMotion } from '@/viz/shared/useAnimationFrame';
import { fieldColor, fieldLabel } from '@/lib/format';
import { Seo } from '@/components/Seo';
import type { Field } from '@/content/types';

interface Node {
  id: string;
  name: string;
  field: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Connections() {
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const { nodes: rawNodes, edges } = useMemo(() => buildGraph(), []);

  // adjacency for neighborhood highlighting
  const adj = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const e of edges) {
      if (!m.has(e.source)) m.set(e.source, new Set());
      if (!m.has(e.target)) m.set(e.target, new Set());
      m.get(e.source)!.add(e.target);
      m.get(e.target)!.add(e.source);
    }
    return m;
  }, [edges]);

  // init node positions on a circle
  useEffect(() => {
    nodesRef.current = rawNodes.map((n, i) => {
      const a = (i / rawNodes.length) * Math.PI * 2;
      return { ...n, x: 400 + 250 * Math.cos(a), y: 280 + 250 * Math.sin(a), vx: 0, vy: 0 };
    });
  }, [rawNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf = 0;
    let alpha = 1;

    const sizeCanvas = () => {
      const parent = canvas.parentElement!;
      const w = parent.clientWidth;
      const h = Math.max(420, Math.round(w * 0.62));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      return { w, h, dpr };
    };

    let { w, h, dpr } = sizeCanvas();

    const step = () => {
      const nodes = nodesRef.current;
      const cx = w / 2;
      const cy = h / 2;
      // repulsion (O(n²), fine for ~33 nodes)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy || 0.01;
          const f = 2600 / d2;
          const d = Math.sqrt(d2);
          const ux = dx / d;
          const uy = dy / d;
          a.vx += ux * f; a.vy += uy * f;
          b.vx -= ux * f; b.vy -= uy * f;
        }
        // centering
        a.vx += (cx - a.x) * 0.002;
        a.vy += (cy - a.y) * 0.002;
      }
      // springs along edges
      const byId = new Map(nodes.map((n) => [n.id, n]));
      for (const e of edges) {
        const a = byId.get(e.source)!;
        const b = byId.get(e.target)!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const target = 110;
        const f = (d - target) * 0.01;
        const ux = dx / d;
        const uy = dy / d;
        a.vx += ux * f; a.vy += uy * f;
        b.vx -= ux * f; b.vy -= uy * f;
      }
      // integrate with damping + alpha cooling
      for (const n of nodes) {
        n.vx *= 0.82; n.vy *= 0.82;
        n.x += n.vx * alpha;
        n.y += n.vy * alpha;
        n.x = Math.max(20, Math.min(w - 20, n.x));
        n.y = Math.max(20, Math.min(h - 20, n.y));
      }
    };

    const draw = () => {
      const ctx = canvas.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const byId = new Map(nodes.map((n) => [n.id, n]));
      const hov = hoveredRef.current;
      const neighborhood = hov ? adj.get(hov) ?? new Set<string>() : null;

      // edges
      for (const e of edges) {
        const a = byId.get(e.source)!;
        const b = byId.get(e.target)!;
        const active = hov && (e.source === hov || e.target === hov);
        ctx.strokeStyle = active ? cssVar('--accent', 0.8) : cssVar('--ink-faint', hov ? 0.12 : 0.3);
        ctx.lineWidth = active ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      // nodes
      for (const n of nodes) {
        const dim = hov && hov !== n.id && !neighborhood?.has(n.id);
        ctx.globalAlpha = dim ? 0.25 : 1;
        ctx.fillStyle = fieldColor(n.field as Field);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.id === hov ? 9 : 6, 0, Math.PI * 2);
        ctx.fill();
        if (n.id === hov || (!hov)) {
          ctx.fillStyle = cssVar('--ink');
          ctx.font = `${n.id === hov ? 'bold ' : ''}11px ui-sans-serif, system-ui`;
          ctx.fillText(n.name, n.x + 10, n.y + 4);
        }
        ctx.globalAlpha = 1;
      }
    };

    const loop = () => {
      if (!reduced && alpha > 0.02) {
        step();
        alpha *= 0.992;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      // settle synchronously, then draw static
      for (let i = 0; i < 400; i++) step();
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => { const s = sizeCanvas(); w = s.w; h = s.h; dpr = s.dpr; alpha = Math.max(alpha, 0.3); };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement!);

    const pickNode = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let best: string | null = null;
      let bestD = 16 * 16;
      for (const n of nodesRef.current) {
        const d2 = (n.x - mx) ** 2 + (n.y - my) ** 2;
        if (d2 < bestD) { bestD = d2; best = n.id; }
      }
      return best;
    };
    const onMove = (e: MouseEvent) => {
      const id = pickNode(e);
      hoveredRef.current = id;
      setHovered(id);
      canvas.style.cursor = id ? 'pointer' : 'default';
      if (reduced) draw();
    };
    const onClick = (e: MouseEvent) => { const id = pickNode(e); if (id) navigate(`/e/${id}`); };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('click', onClick);
    };
  }, [edges, adj, reduced, navigate]);

  // legend fields present
  const legendFields = useMemo(() => {
    const set = new Set(rawNodes.map((n) => n.field));
    return [...set];
  }, [rawNodes]);

  const hoveredEq = hovered ? equations.find((e) => e.id === hovered) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Seo
        title="Connections graph"
        description="The web of relationships between equations — a force-directed graph of how the great ideas link together."
        path="/connections"
      />
      <h1 className="font-ui text-3xl font-bold text-ink">Connections</h1>
      <p className="font-serif mt-1 max-w-prose text-ink-muted">
        The web of ideas. Each node is an equation (colored by field); each link is a relationship.
        Hover to highlight a node’s neighborhood, click to open it.
      </p>

      <div className="relative mt-6 overflow-hidden rounded-xl border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label="Force-directed graph of equations and their relationships. An accessible list follows below." />
        {hoveredEq && (
          <div className="pointer-events-none absolute left-3 top-3 max-w-xs rounded-lg border border-border bg-bg/95 p-3 text-sm shadow-lg">
            <div className="font-ui font-semibold text-ink">{hoveredEq.name}</div>
            <div className="font-serif mt-1 text-ink-muted">{hoveredEq.oneLine}</div>
          </div>
        )}
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-2">
        {legendFields.map((f) => (
          <span key={f} className="font-ui inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="h-3 w-3 rounded-full" style={{ background: fieldColor(f as Field) }} />
            {fieldLabel(f as Field)}
          </span>
        ))}
      </div>

      {/* accessible list fallback */}
      <section className="mt-10">
        <h2 className="font-ui mb-3 text-xl font-semibold">All connections (accessible list)</h2>
        <ul className="space-y-3">
          {equations.map((eq) => {
            const rel = connectionsOf(eq);
            if (rel.length === 0) return null;
            return (
              <li key={eq.id} className="font-ui text-sm">
                <Link to={`/e/${eq.id}`} className="font-semibold text-accent">{eq.name}</Link>
                <ul className="ml-4 mt-1 list-disc space-y-0.5 text-ink-muted">
                  {rel.map((r) => (
                    <li key={r.equation.id}>
                      {r.relationship}{' '}
                      <Link to={`/e/${r.equation.id}`} className="text-ink underline underline-offset-2 hover:text-accent">{r.equation.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
