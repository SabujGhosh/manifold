import { useEffect, useMemo, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

type Pt = { x: number; y: number };

// Fit a brachistochrone cycloid x=R(θ−sinθ), y=R(1−cosθ) through A=(0,0) and
// B=(xB,yB). Solve (1−cosθ_B)/(θ_B−sinθ_B) = yB/xB (monotonic in θ_B), then R.
function fitCycloid(xB: number, yB: number) {
  const target = yB / xB;
  let lo = 1e-4;
  let hi = 2 * Math.PI - 1e-4;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const ratio = (1 - Math.cos(mid)) / (mid - Math.sin(mid)); // decreasing: +∞ → 0
    if (ratio > target) lo = mid;
    else hi = mid;
  }
  const thetaB = (lo + hi) / 2;
  const R = xB / (thetaB - Math.sin(thetaB));
  return { thetaB, R };
}

// Time for a bead released from rest at A to slide a path under gravity:
// T = ∫ ds / sqrt(2 g h), where h is the vertical drop below the start (y down).
function travelTime(path: (t: number) => Pt, g = 9.8): number {
  const N = 20000; // high enough to resolve the 1/√h speed singularity at the start
  const start = path(0);
  let prev = start;
  let T = 0;
  for (let i = 1; i <= N; i++) {
    const p = path(i / N);
    const ds = Math.hypot(p.x - prev.x, p.y - prev.y);
    const depth = Math.max(1e-4, (prev.y + p.y) / 2 - start.y); // descent below A
    T += ds / Math.sqrt(2 * g * depth);
    prev = p;
  }
  return T;
}

// Discretize a path and tabulate cumulative arc length for arc-length lookup.
function buildPath(fn: (t: number) => Pt) {
  const M = 800;
  const pts: Pt[] = [];
  const cum: number[] = [0];
  for (let i = 0; i <= M; i++) pts.push(fn(i / M));
  for (let i = 1; i <= M; i++) cum[i] = cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return { pts, cum, len: cum[M] };
}

function posAt(path: ReturnType<typeof buildPath>, s: number): Pt {
  const { pts, cum, len } = path;
  if (s <= 0) return pts[0];
  if (s >= len) return pts[pts.length - 1];
  let lo = 1;
  let hi = cum.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] < s) lo = mid + 1;
    else hi = mid;
  }
  const i = lo;
  const f = (s - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
  return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f };
}

export default function Brachistochrone(_: VizProps) {
  void _;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);

  // domain: A=(0,0), B=(1,0.6), y downward
  const xB = 1;
  const yB = 0.6;
  const paths = useMemo(() => {
    const { thetaB, R } = fitCycloid(xB, yB);
    const defs = [
      { name: 'Straight line', color: cssVar('--ink-faint'), fn: (t: number) => ({ x: xB * t, y: yB * t }) },
      {
        name: 'Steep-then-flat',
        color: cssVar('--field-physics'),
        // Drops fast then flattens — a reasonable guess, still beaten by the cycloid.
        fn: (t: number) => ({ x: xB * t, y: (yB * (1 - Math.exp(-1.5 * t))) / (1 - Math.exp(-1.5)) }),
      },
      {
        name: 'Cycloid (optimal)',
        color: cssVar('--accent'),
        fn: (t: number) => {
          const th = thetaB * t;
          return { x: R * (th - Math.sin(th)), y: R * (1 - Math.cos(th)) };
        },
      },
    ];
    return defs.map((d) => ({ ...d, table: buildPath(d.fn), time: travelTime(d.fn) }));
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  // Animation state (refs so the rAF loop mutates without re-rendering).
  const sRef = useRef<number[]>(paths.map(() => 0));
  const doneRef = useRef<boolean[]>(paths.map(() => false));
  const clockRef = useRef(0);
  const waitRef = useRef(-1);

  const reset = () => {
    sRef.current = paths.map(() => 0);
    doneRef.current = paths.map(() => false);
    clockRef.current = 0;
    waitRef.current = -1;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.6);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    const pad = 26;
    const sx = (x: number) => pad + x * (cssW - 2 * pad);
    const sy = (y: number) => pad + y * (cssH - 2 * pad) * 1.25;

    // paths
    paths.forEach((p) => {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      p.table.pts.forEach((pt, i) => (i === 0 ? ctx.moveTo(sx(pt.x), sy(pt.y)) : ctx.lineTo(sx(pt.x), sy(pt.y))));
      ctx.stroke();
    });

    // endpoints
    ctx.fillStyle = cssVar('--ink');
    ctx.beginPath(); ctx.arc(sx(0), sy(0), 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx(xB), sy(yB), 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = '12px ui-sans-serif, system-ui';
    ctx.fillText('A', sx(0) - 14, sy(0)); ctx.fillText('B', sx(xB) + 6, sy(yB));

    // beads
    paths.forEach((p, i) => {
      const pos = posAt(p.table, sRef.current[i]);
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(sx(pos.x), sy(pos.y), 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = cssVar('--bg');
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  };

  // Physics step: each bead accelerates by its drop below A, so the cycloid —
  // dropping steepest first — pulls ahead and reaches B first.
  useAnimationFrame(() => {
    const dt = 1 / 60;
    const g = 1;
    const eps = 0.006; // tiny floor so beads leave A (released from rest)
    if (waitRef.current < 0) {
      clockRef.current += dt;
      let allDone = true;
      paths.forEach((p, i) => {
        if (doneRef.current[i]) return;
        const pos = posAt(p.table, sRef.current[i]);
        const v = Math.sqrt(2 * g * (pos.y + eps));
        sRef.current[i] += v * dt * 0.8;
        if (sRef.current[i] >= p.table.len) {
          sRef.current[i] = p.table.len;
          doneRef.current[i] = true;
        } else allDone = false;
      });
      if (allDone) waitRef.current = clockRef.current;
    } else if (clockRef.current - waitRef.current > 1.4) {
      reset();
    } else {
      clockRef.current += dt;
    }
    draw();
  }, playing && !reduced);

  useEffect(() => {
    if (reduced) {
      // static frame: beads at B
      sRef.current = paths.map((p) => p.table.len);
      doneRef.current = paths.map(() => true);
    }
    draw();
  }, []); // eslint-disable-line

  const fastest = Math.min(...paths.map((p) => p.time));

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label="Three beads racing down different curves from A to B; the cycloid arrives first." />
      </div>
      {!reduced && (
        <div className="mt-2 flex items-center gap-3">
          <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
          <Button size="sm" variant="ghost" onClick={() => { reset(); draw(); }}>Replay</Button>
        </div>
      )}
      <div className="mt-3 space-y-1 text-sm">
        {paths.map((p) => {
          const isFastest = Math.abs(p.time - fastest) < 1e-9;
          return (
            <div key={p.name} className="flex items-center justify-between border-b border-border/60 py-1">
              <span className="flex items-center gap-2">
                <span style={{ background: p.color, width: 12, height: 3, display: 'inline-block' }} />
                {p.name}
                {isFastest && <span className="rounded bg-accent-soft px-1.5 text-xs text-accent">fastest</span>}
              </span>
              <span className="font-mono text-ink">{p.time.toFixed(3)} (relative time)</span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        The cycloid found by the Euler–Lagrange equation beats the straight line — and every other curve — even
        though it travels farther, because dropping steeply at the start builds the speed to win the race.
      </p>
    </div>
  );
}
