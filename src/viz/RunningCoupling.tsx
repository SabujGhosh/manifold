import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function RunningCoupling({ params }: VizProps) {
  // β(g) = beta0 * g^3 ; integrate g(μ) along log-scale
  const [beta0, setBeta0] = useState(num(params.beta0, -1));
  const [g0, setG0] = useState(0.6);

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 32;
      const tMax = 8; // ln(μ/μ0)
      const gMax = 1.5;
      const sx = (t: number) => pad + (t / tMax) * (w - pad - 8);
      const sy = (g: number) => h - pad - (g / gMax) * (h - pad - 8);

      ctx.strokeStyle = cssVar('--ink-faint');
      ctx.beginPath(); ctx.moveTo(pad, sy(0)); ctx.lineTo(w - 8, sy(0));
      ctx.moveTo(pad, sy(0)); ctx.lineTo(pad, 8); ctx.stroke();

      // integrate dg/dt = beta0 * g^3
      ctx.strokeStyle = cssVar('--accent');
      ctx.lineWidth = 2;
      ctx.beginPath();
      let g = g0;
      const dt = 0.02;
      let blew = false;
      for (let t = 0; t <= tMax; t += dt) {
        const gy = Math.min(g, gMax);
        const px = sx(t);
        const py = sy(gy);
        t === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        g += beta0 * g * g * g * dt;
        if (g > gMax || g < 0) { blew = true; break; }
      }
      ctx.stroke();

      ctx.fillStyle = cssVar('--ink-faint');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('energy scale  ln(μ/μ₀) →', w - 150, sy(0) + 14);
      ctx.fillText('coupling g', pad + 4, 14);
      ctx.fillStyle = beta0 < 0 ? cssVar('--field-biology') : cssVar('--field-nonlinear-dynamics');
      ctx.fillText(beta0 < 0 ? 'asymptotic freedom (g → 0 at high energy)' : (blew ? 'Landau pole (g blows up)' : 'coupling grows with energy'), pad + 4, 30);
    },
    [beta0, g0],
    0.55,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Running coupling with beta-zero ${beta0}; ${beta0 < 0 ? 'coupling decreases at high energy' : 'coupling increases at high energy'}.`} />
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="β₀ (sign of beta function)" value={beta0} min={-2} max={2} step={0.1} onChange={setBeta0} format={(v) => v.toFixed(1)} />
        <Slider label="Initial coupling g₀" value={g0} min={0.1} max={1} step={0.05} onChange={setG0} format={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}
