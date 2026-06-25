import { cssVar } from './shared/useCanvas';
import { useCanvas } from './shared/useCanvas';
import type { VizProps } from './registry';

// Three descent paths from A (top-left) to B (bottom-right); compute travel times
// under gravity (energy conservation: speed = sqrt(2 g drop)).
function travelTime(path: (t: number) => { x: number; y: number }, g = 9.8): number {
  const N = 400;
  const start = path(0);
  let prev = start;
  let T = 0;
  for (let i = 1; i <= N; i++) {
    const p = path(i / N);
    const ds = Math.hypot(p.x - prev.x, p.y - prev.y);
    const drop = Math.max(1e-4, start.y - (prev.y + p.y) / 2); // y increases downward
    const speed = Math.sqrt(2 * g * drop);
    T += ds / speed;
    prev = p;
  }
  return T;
}

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

export default function Brachistochrone(_: VizProps) {
  void _;
  // domain: A=(0,0), B=(1,0.6) with y downward
  const xB = 1;
  const yB = 0.6;
  const straight = (t: number) => ({ x: xB * t, y: yB * t });
  const steep = (t: number) => ({ x: xB * t, y: yB * Math.sqrt(t) }); // drop fast then flat
  // True brachistochrone: a cycloid through both endpoints (reaches B at t=1).
  const { thetaB, R } = fitCycloid(xB, yB);
  const cycloid = (t: number) => {
    const theta = thetaB * t;
    return { x: R * (theta - Math.sin(theta)), y: R * (1 - Math.cos(theta)) };
  };

  const paths = [
    { name: 'Straight line', fn: straight, color: cssVar('--ink-faint') },
    { name: 'Steep-then-flat', fn: steep, color: cssVar('--field-physics') },
    { name: 'Cycloid (optimal)', fn: cycloid, color: cssVar('--accent') },
  ];

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 24;
      const sx = (x: number) => pad + x * (w - 2 * pad);
      const sy = (y: number) => pad + y * (h - 2 * pad) * 1.2;
      paths.forEach((p) => {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
          const pt = p.fn(i / 200);
          i === 0 ? ctx.moveTo(sx(pt.x), sy(pt.y)) : ctx.lineTo(sx(pt.x), sy(pt.y));
        }
        ctx.stroke();
      });
      // endpoints
      ctx.fillStyle = cssVar('--ink');
      ctx.beginPath(); ctx.arc(sx(0), sy(0), 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(sx(1), sy(0.6), 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = '12px ui-sans-serif, system-ui';
      ctx.fillText('A', sx(0) - 14, sy(0)); ctx.fillText('B', sx(1) + 6, sy(0.6));
    },
    [],
    0.6,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label="Three descent paths from A to B; the cycloid is fastest." />
      </div>
      <div className="mt-3 space-y-1 text-sm">
        {paths.map((p) => (
          <div key={p.name} className="flex items-center justify-between border-b border-border/60 py-1">
            <span className="flex items-center gap-2">
              <span style={{ background: p.color, width: 12, height: 3, display: 'inline-block' }} />
              {p.name}
            </span>
            <span className="font-mono text-ink">{travelTime(p.fn).toFixed(3)} (relative time)</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        The cycloid found by the Euler–Lagrange equation beats the straight line — and every other curve — even though it dips below the direct path.
      </p>
    </div>
  );
}
