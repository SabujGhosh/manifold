import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

// demo function: f(x) = x²/3 (so f'(x) = 2x/3, easy to verify)
const f = (x: number) => (x * x) / 3;
const fp = (x: number) => (2 * x) / 3;

export default function SecantTangent({ params }: VizProps) {
  const [x0, setX0] = useState(num(params.x0, 1.5));
  const [hh, setHh] = useState(num(params.h, 1.5));

  const secantSlope = (f(x0 + hh) - f(x0)) / hh;

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 28;
      const xmin = -1;
      const xmax = 5;
      const ymin = -0.5;
      const ymax = 7;
      const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad - 8);
      const sy = (y: number) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - pad - 8);
      const muted = cssVar('--ink-faint');
      const accent = cssVar('--accent');
      const curve = cssVar('--field-mathematics');

      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, sy(0)); ctx.lineTo(w - 8, sy(0));
      ctx.moveTo(sx(0), h - pad); ctx.lineTo(sx(0), 8);
      ctx.stroke();

      // curve
      ctx.strokeStyle = curve;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 300; i++) {
        const x = xmin + (i / 300) * (xmax - xmin);
        i === 0 ? ctx.moveTo(sx(x), sy(f(x))) : ctx.lineTo(sx(x), sy(f(x)));
      }
      ctx.stroke();

      // secant line through (x0,f) and (x0+h,f)
      const x1 = x0;
      const x2 = x0 + hh;
      ctx.strokeStyle = cssVar('--ink-faint', 0.8);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const m = secantSlope;
      ctx.moveTo(sx(xmin), sy(f(x1) + m * (xmin - x1)));
      ctx.lineTo(sx(xmax), sy(f(x1) + m * (xmax - x1)));
      ctx.stroke();

      // tangent line (true derivative)
      ctx.strokeStyle = accent;
      ctx.setLineDash([5, 4]);
      const mt = fp(x0);
      ctx.beginPath();
      ctx.moveTo(sx(xmin), sy(f(x0) + mt * (xmin - x0)));
      ctx.lineTo(sx(xmax), sy(f(x0) + mt * (xmax - x0)));
      ctx.stroke();
      ctx.setLineDash([]);

      // points
      ctx.fillStyle = accent;
      [x1, x2].forEach((x) => { ctx.beginPath(); ctx.arc(sx(x), sy(f(x)), 4, 0, Math.PI * 2); ctx.fill(); });
    },
    [x0, hh],
    0.6,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Curve with a secant line of slope ${secantSlope.toFixed(3)} and the tangent of slope ${fp(x0).toFixed(3)} at x = ${x0.toFixed(2)}.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        secant slope = <span className="font-mono text-ink">{secantSlope.toFixed(3)}</span> →
        tangent (true derivative) f′({x0.toFixed(1)}) = <span className="font-mono text-accent">{fp(x0).toFixed(3)}</span>
      </p>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Base point x" value={x0} min={0} max={4} step={0.1} onChange={setX0} format={(v) => v.toFixed(1)} />
        <Slider label="Gap h → 0" value={hh} min={0.05} max={2} step={0.01} onChange={setHh} format={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}
