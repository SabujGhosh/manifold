import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

const H = (p: number) => (p <= 0 || p >= 1 ? 0 : -p * Math.log2(p) - (1 - p) * Math.log2(1 - p));

export default function EntropyCoin({ params }: VizProps) {
  const [p, setP] = useState(num(params.p, 0.5));

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 32;
      const sx = (x: number) => pad + x * (w - pad - 8);
      const sy = (y: number) => h - pad - y * (h - pad - 8);
      ctx.strokeStyle = cssVar('--ink-faint');
      ctx.beginPath();
      ctx.moveTo(pad, sy(0)); ctx.lineTo(w - 8, sy(0));
      ctx.moveTo(pad, sy(0)); ctx.lineTo(pad, 8);
      ctx.stroke();

      ctx.strokeStyle = cssVar('--accent');
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const x = i / 200;
        i === 0 ? ctx.moveTo(sx(x), sy(H(x))) : ctx.lineTo(sx(x), sy(H(x)));
      }
      ctx.stroke();

      // current point
      ctx.fillStyle = cssVar('--accent');
      ctx.beginPath(); ctx.arc(sx(p), sy(H(p)), 5, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = cssVar('--ink-faint');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('P(heads)', w / 2 - 24, h - 8);
      ctx.fillText('1 bit', sx(0) + 4, sy(1) - 4);
    },
    [p],
    0.55,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Binary entropy curve; at p = ${p.toFixed(2)} the entropy is ${H(p).toFixed(3)} bits.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        Entropy H = <span className="font-mono text-ink">{H(p).toFixed(3)} bits</span>{' '}
        {Math.abs(p - 0.5) < 0.02 ? '(maximum — a fair coin)' : p < 0.02 || p > 0.98 ? '(near zero — nearly certain)' : ''}
      </p>
      <div className="mt-4">
        <Slider label="P(heads)" value={p} min={0} max={1} step={0.01} onChange={setP} format={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}
