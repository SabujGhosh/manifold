import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import { Tabs } from '@/components/ui/Tabs';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function ParticleInBox({ params }: VizProps) {
  const [mode, setMode] = useState((params.mode as string) || 'box');
  const [n, setN] = useState(Math.round(num(params.n, 1)));
  const [barrier, setBarrier] = useState(0.5);

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 24;
      const midY = h * 0.6;
      const sx = (x: number) => pad + x * (w - 2 * pad);
      const amp = h * 0.3;
      ctx.strokeStyle = cssVar('--ink-faint');
      ctx.beginPath(); ctx.moveTo(pad, midY); ctx.lineTo(w - pad, midY); ctx.stroke();

      if (mode === 'box') {
        // walls
        ctx.strokeStyle = cssVar('--ink-faint', 0.7);
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(pad, midY); ctx.lineTo(pad, midY - amp - 20);
        ctx.moveTo(w - pad, midY); ctx.lineTo(w - pad, midY - amp - 20); ctx.stroke();
        // |ψ|² for level n
        ctx.fillStyle = cssVar('--accent', 0.25);
        ctx.strokeStyle = cssVar('--accent');
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx(0), midY);
        for (let i = 0; i <= 200; i++) {
          const x = i / 200;
          const psi2 = 2 * Math.pow(Math.sin(n * Math.PI * x), 2);
          ctx.lineTo(sx(x), midY - psi2 * amp * 0.5);
        }
        ctx.lineTo(sx(1), midY);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = cssVar('--ink');
        ctx.font = '12px ui-sans-serif, system-ui';
        ctx.fillText(`|ψ|²  level n = ${n}  (E ∝ n² = ${n * n})`, pad, 18);
      } else {
        // tunneling: incoming oscillation, barrier region, decaying inside, smaller out
        const bx1 = 0.45;
        const bx2 = bx1 + 0.12;
        ctx.fillStyle = cssVar('--surface-2');
        ctx.fillRect(sx(bx1), 8, sx(bx2) - sx(bx1), h - 16);
        const kappa = 6 + barrier * 14;
        const transmit = Math.exp(-kappa * (bx2 - bx1) * 3);
        ctx.strokeStyle = cssVar('--accent');
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= 300; i++) {
          const x = i / 300;
          let y;
          if (x < bx1) y = Math.sin(x * 50) * amp * 0.5;
          else if (x < bx2) y = Math.exp(-kappa * (x - bx1)) * amp * 0.5;
          else y = Math.sin((x - bx2) * 50) * amp * 0.5 * transmit;
          i === 0 ? ctx.moveTo(sx(x), midY - y) : ctx.lineTo(sx(x), midY - y);
        }
        ctx.stroke();
        ctx.fillStyle = cssVar('--ink');
        ctx.font = '12px ui-sans-serif, system-ui';
        ctx.fillText(`transmission ≈ ${(transmit * 100).toFixed(1)}%`, pad, 18);
      }
    },
    [mode, n, barrier],
    0.5,
  );

  return (
    <div className="font-ui">
      <Tabs items={[{ value: 'box', label: 'Particle in a box' }, { value: 'tunnel', label: 'Barrier tunneling' }]} value={mode} onValueChange={setMode} ariaLabel="Mode" className="mb-3" />
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={mode === 'box' ? `Particle in a box, energy level ${n}` : 'Quantum tunneling through a barrier'} />
      </div>
      <div className="mt-4">
        {mode === 'box' ? (
          <Slider label="Energy level n" value={n} min={1} max={6} step={1} onChange={(v) => setN(Math.round(v))} format={(v) => String(Math.round(v))} />
        ) : (
          <Slider label="Barrier height" value={barrier} min={0} max={1} step={0.01} onChange={setBarrier} format={(v) => v.toFixed(2)} />
        )}
      </div>
    </div>
  );
}
