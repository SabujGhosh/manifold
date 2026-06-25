import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

const H = 6.626e-34;

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

const PARTICLES = [
  { name: 'Electron', mass: 9.109e-31 },
  { name: 'Proton', mass: 1.673e-27 },
  { name: 'Buckyball C₆₀', mass: 1.2e-24 },
  { name: 'Baseball', mass: 0.145 },
];

export default function WavelengthMomentum({ params }: VizProps) {
  const [vExp, setVExp] = useState(Math.log10(num(params.velocity, 1e6)));
  const [pIdx, setPIdx] = useState(0);
  const mass = PARTICLES[pIdx].mass;
  const v = Math.pow(10, vExp);
  const p = mass * v;
  const lambda = H / p;

  const ref = useCanvas(
    (ctx, w, h) => {
      const cy = h / 2;
      // draw a wave whose on-screen wavelength reflects log(λ)
      const logL = Math.log10(lambda); // ranges roughly -35 .. -9
      // map to pixels: clamp
      const px = Math.max(8, Math.min(w * 0.5, 4 + (logL + 36) * (w / 60)));
      ctx.strokeStyle = cssVar('--accent');
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 8; x <= w - 8; x++) {
        const y = cy - Math.sin(((x - 8) / px) * 2 * Math.PI) * (h * 0.3);
        x === 8 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = cssVar('--ink-faint');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText(`on-screen wavelength ∝ log₁₀(λ)`, 10, 16);
    },
    [lambda],
    0.4,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Matter wave for a ${PARTICLES[pIdx].name} at ${v.toExponential(1)} m/s has de Broglie wavelength ${lambda.toExponential(2)} meters.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        λ = h/p = <span className="font-mono text-ink">{lambda.toExponential(2)} m</span>{' '}
        {lambda > 1e-10 ? '(comparable to atoms — wave effects visible)' : '(absurdly tiny — no observable wave behavior)'}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {PARTICLES.map((pt, i) => (
          <button key={pt.name} onClick={() => setPIdx(i)} className={`rounded-md border px-3 py-1.5 text-sm ${i === pIdx ? 'border-accent bg-accent-soft text-ink' : 'border-border text-ink-muted hover:bg-surface-2'}`}>
            {pt.name}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <Slider label="Speed (m/s)" value={vExp} min={0} max={8} step={0.1} onChange={setVExp} format={() => `${v.toExponential(1)}`} />
      </div>
    </div>
  );
}
