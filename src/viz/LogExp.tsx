import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function LogExp({ params }: VizProps) {
  const [base, setBase] = useState(num(params.base, 10));
  const [m, setM] = useState(2);
  const [n, setN] = useState(3);

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 30;
      const xmin = 0.1;
      const xmax = 10;
      const ymin = -1.2;
      const ymax = 2.2;
      const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad - 8);
      const sy = (y: number) => h - pad - ((y - ymin) / (ymax - ymin)) * (h - pad - 8);
      const lg = (x: number) => Math.log(x) / Math.log(base);

      ctx.strokeStyle = cssVar('--ink-faint');
      ctx.beginPath(); ctx.moveTo(pad, sy(0)); ctx.lineTo(w - 8, sy(0)); ctx.stroke();

      // log curve
      ctx.strokeStyle = cssVar('--accent');
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 300; i++) {
        const x = xmin + (i / 300) * (xmax - xmin);
        i === 0 ? ctx.moveTo(sx(x), sy(lg(x))) : ctx.lineTo(sx(x), sy(lg(x)));
      }
      ctx.stroke();

      // slide-rule: show log m + log n = log(mn)
      const mark = (x: number, color: string, label: string) => {
        ctx.strokeStyle = color;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(sx(x), sy(0)); ctx.lineTo(sx(x), sy(lg(x))); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = color;
        ctx.font = '11px ui-sans-serif, system-ui';
        ctx.fillText(label, sx(x) - 6, sy(0) + 14);
      };
      mark(m, cssVar('--field-physics'), `${m}`);
      mark(n, cssVar('--field-biology'), `${n}`);
      mark(m * n, cssVar('--field-nonlinear-dynamics'), `${m * n}`);
    },
    [base, m, n],
    0.55,
  );

  const lg = (x: number) => Math.log(x) / Math.log(base);

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Logarithm curve base ${base}; log ${m} plus log ${n} equals log ${m * n}.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        log<sub>{base}</sub>({m}) + log<sub>{base}</sub>({n}) ={' '}
        <span className="font-mono text-ink">{lg(m).toFixed(2)} + {lg(n).toFixed(2)} = {(lg(m) + lg(n)).toFixed(2)}</span> = log<sub>{base}</sub>({m * n})
      </p>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        <Slider label="Base" value={base} min={2} max={10} step={1} onChange={(v) => setBase(Math.round(v))} format={(v) => String(Math.round(v))} />
        <Slider label="First number" value={m} min={1} max={5} step={1} onChange={(v) => setM(Math.round(v))} format={(v) => String(Math.round(v))} />
        <Slider label="Second number" value={n} min={1} max={5} step={1} onChange={(v) => setN(Math.round(v))} format={(v) => String(Math.round(v))} />
      </div>
    </div>
  );
}
