import { useMemo, useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import { Tabs } from '@/components/ui/Tabs';
import { blackScholes as bs } from '@/lib/black-scholes';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function BlackScholes({ params }: VizProps) {
  const [S, setS] = useState(num(params.S, 100));
  const [K, setK] = useState(num(params.K, 100));
  const [sigma, setSigma] = useState(num(params.sigma, 0.2));
  const [r, setR] = useState(num(params.r, 0.05));
  const [T, setT] = useState(num(params.T, 1));
  const [call, setCall] = useState(true);

  const g = useMemo(() => bs(S, K, sigma, r, T, call), [S, K, sigma, r, T, call]);

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 30;
      const sMin = K * 0.4;
      const sMax = K * 1.6;
      const prices = [] as number[];
      for (let i = 0; i <= 120; i++) {
        const s = sMin + (i / 120) * (sMax - sMin);
        prices.push(bs(s, K, sigma, r, T, call).price);
      }
      const pMax = Math.max(...prices, 1) * 1.1;
      const sx = (s: number) => pad + ((s - sMin) / (sMax - sMin)) * (w - pad - 8);
      const sy = (p: number) => h - pad - (p / pMax) * (h - pad - 8);
      ctx.strokeStyle = cssVar('--ink-faint');
      ctx.beginPath(); ctx.moveTo(pad, sy(0)); ctx.lineTo(w - 8, sy(0)); ctx.stroke();
      // payoff at expiry
      ctx.strokeStyle = cssVar('--ink-faint', 0.6);
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const s = sMin + (i / 120) * (sMax - sMin);
        const payoff = call ? Math.max(s - K, 0) : Math.max(K - s, 0);
        i === 0 ? ctx.moveTo(sx(s), sy(payoff)) : ctx.lineTo(sx(s), sy(payoff));
      }
      ctx.stroke();
      ctx.setLineDash([]);
      // value curve
      ctx.strokeStyle = cssVar('--accent');
      ctx.lineWidth = 2;
      ctx.beginPath();
      prices.forEach((p, i) => { const s = sMin + (i / 120) * (sMax - sMin); i === 0 ? ctx.moveTo(sx(s), sy(p)) : ctx.lineTo(sx(s), sy(p)); });
      ctx.stroke();
      // current spot
      ctx.strokeStyle = cssVar('--field-physics');
      ctx.beginPath(); ctx.moveTo(sx(S), sy(0)); ctx.lineTo(sx(S), sy(g.price)); ctx.stroke();
      ctx.fillStyle = cssVar('--field-physics');
      ctx.beginPath(); ctx.arc(sx(S), sy(g.price), 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = cssVar('--ink');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('spot S', sx(S) - 16, sy(0) + 14);
    },
    [S, K, sigma, r, T, call, g.price],
    0.5,
  );

  return (
    <div className="font-ui">
      <Tabs items={[{ value: 'call', label: 'Call' }, { value: 'put', label: 'Put' }]} value={call ? 'call' : 'put'} onValueChange={(v) => setCall(v === 'call')} ariaLabel="Option type" className="mb-3" />
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Option value curve vs spot; current ${call ? 'call' : 'put'} price ${g.price.toFixed(2)}.`} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {[
          ['Price', g.price.toFixed(2)],
          ['Δ delta', g.delta.toFixed(3)],
          ['Γ gamma', g.gamma.toFixed(4)],
          ['vega', g.vega.toFixed(3)],
          ['Θ theta', g.theta.toFixed(3)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-surface-2 px-3 py-2">
            <div className="text-xs text-ink-faint">{k}</div>
            <div className="font-mono text-ink">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        <Slider label="Spot S" value={S} min={40} max={160} step={1} onChange={setS} format={(v) => v.toFixed(0)} />
        <Slider label="Strike K" value={K} min={40} max={160} step={1} onChange={setK} format={(v) => v.toFixed(0)} />
        <Slider label="Volatility σ" value={sigma} min={0.05} max={0.8} step={0.01} onChange={setSigma} format={(v) => `${(v * 100).toFixed(0)}%`} />
        <Slider label="Rate r" value={r} min={0} max={0.15} step={0.005} onChange={setR} format={(v) => `${(v * 100).toFixed(1)}%`} />
        <Slider label="Time T (yr)" value={T} min={0.05} max={3} step={0.05} onChange={setT} format={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}
