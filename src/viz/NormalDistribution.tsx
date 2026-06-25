import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import { clamp } from '@/lib/format';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

const pdf = (x: number, mu: number, sigma: number) =>
  Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI));

export default function NormalDistribution({ params }: VizProps) {
  const [mu, setMu] = useState(num(params.mu, 0));
  const [sigma, setSigma] = useState(num(params.sigma, 1));
  const [a, setA] = useState(-1);
  const [b, setB] = useState(1);

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 28;
      const xmin = -6;
      const xmax = 6;
      const ymax = 0.55;
      const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad - 8);
      const sy = (y: number) => h - pad - (y / ymax) * (h - pad - 8);
      const ink = cssVar('--ink');
      const muted = cssVar('--ink-faint');
      const accent = cssVar('--accent');

      // axis
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, sy(0));
      ctx.lineTo(w - 8, sy(0));
      ctx.stroke();

      // shaded area between a and b
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      ctx.fillStyle = cssVar('--accent', 0.25);
      ctx.beginPath();
      ctx.moveTo(sx(lo), sy(0));
      for (let i = 0; i <= 100; i++) {
        const x = lo + (i / 100) * (hi - lo);
        ctx.lineTo(sx(x), sy(pdf(x, mu, sigma)));
      }
      ctx.lineTo(sx(hi), sy(0));
      ctx.closePath();
      ctx.fill();

      // curve
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 300; i++) {
        const x = xmin + (i / 300) * (xmax - xmin);
        const y = pdf(x, mu, sigma);
        i === 0 ? ctx.moveTo(sx(x), sy(y)) : ctx.lineTo(sx(x), sy(y));
      }
      ctx.stroke();

      // mean line
      ctx.strokeStyle = cssVar('--ink-faint', 0.6);
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(sx(mu), sy(0));
      ctx.lineTo(sx(mu), sy(pdf(mu, mu, sigma)));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = ink;
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('μ', sx(mu) - 3, sy(0) + 14);
    },
    [mu, sigma, a, b],
    0.5,
  );

  // probability between a and b via error function approximation
  const erf = (z: number) => {
    const t = 1 / (1 + 0.3275911 * Math.abs(z));
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
    return z >= 0 ? y : -y;
  };
  const cdf = (x: number) => 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));
  const prob = Math.abs(cdf(b) - cdf(a));

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Normal distribution with mean ${mu} and standard deviation ${sigma}. Shaded probability between ${a} and ${b} is ${(prob * 100).toFixed(1)} percent.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        P({Math.min(a, b).toFixed(1)} &lt; X &lt; {Math.max(a, b).toFixed(1)}) ={' '}
        <span className="font-mono text-ink">{(prob * 100).toFixed(1)}%</span>
      </p>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Mean μ" value={mu} min={-3} max={3} step={0.1} onChange={(v) => setMu(v)} format={(v) => v.toFixed(1)} />
        <Slider label="Std dev σ" value={sigma} min={0.3} max={3} step={0.1} onChange={(v) => setSigma(clamp(v, 0.3, 3))} format={(v) => v.toFixed(1)} />
        <Slider label="Lower bound a" value={a} min={-6} max={6} step={0.1} onChange={setA} format={(v) => v.toFixed(1)} />
        <Slider label="Upper bound b" value={b} min={-6} max={6} step={0.1} onChange={setB} format={(v) => v.toFixed(1)} />
      </div>
    </div>
  );
}
