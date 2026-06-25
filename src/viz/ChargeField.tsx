import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Tabs } from '@/components/ui/Tabs';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function ChargeField({ params }: VizProps) {
  const [q1, setQ1] = useState(num(params.q1, 1));
  const [q2, setQ2] = useState(num(params.q2, -1));

  const ref = useCanvas(
    (ctx, w, h) => {
      const c1 = { x: w * 0.35, y: h / 2, q: q1 };
      const c2 = { x: w * 0.65, y: h / 2, q: q2 };

      // field vectors on a grid
      const step = 26;
      ctx.strokeStyle = cssVar('--ink-faint', 0.7);
      for (let x = step; x < w; x += step) {
        for (let y = step; y < h; y += step) {
          let ex = 0;
          let ey = 0;
          for (const c of [c1, c2]) {
            const dx = x - c.x;
            const dy = y - c.y;
            const r2 = dx * dx + dy * dy + 50;
            const r = Math.sqrt(r2);
            const e = (c.q * 800) / r2;
            ex += (e * dx) / r;
            ey += (e * dy) / r;
          }
          const mag = Math.hypot(ex, ey);
          const len = Math.min(step * 0.5, mag);
          const ux = (ex / (mag || 1)) * len;
          const uy = (ey / (mag || 1)) * len;
          ctx.beginPath();
          ctx.moveTo(x - ux / 2, y - uy / 2);
          ctx.lineTo(x + ux / 2, y + uy / 2);
          ctx.stroke();
          // arrowhead
          ctx.beginPath();
          ctx.arc(x + ux / 2, y + uy / 2, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = cssVar('--ink-faint', 0.7);
          ctx.fill();
        }
      }

      // charges
      for (const c of [c1, c2]) {
        ctx.fillStyle = c.q > 0 ? 'rgb(var(--field-nonlinear-dynamics))' : 'rgb(var(--field-physics))';
        ctx.beginPath();
        ctx.arc(c.x, c.y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px ui-sans-serif, system-ui';
        ctx.fillText(c.q > 0 ? '+' : '−', c.x - 4, c.y + 5);
      }
    },
    [q1, q2],
    0.6,
  );

  const attract = q1 * q2 < 0;

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Two charges of sign ${q1 > 0 ? '+' : '−'} and ${q2 > 0 ? '+' : '−'} with their electric field; they ${attract ? 'attract' : 'repel'}.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        Charges of {attract ? 'opposite' : 'like'} sign → <span className="text-ink">{attract ? 'attraction' : 'repulsion'}</span>.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Tabs items={[{ value: '+', label: 'Charge 1: +' }, { value: '-', label: 'Charge 1: −' }]} value={q1 > 0 ? '+' : '-'} onValueChange={(v) => setQ1(v === '+' ? 1 : -1)} ariaLabel="Charge 1 sign" />
        <Tabs items={[{ value: '+', label: 'Charge 2: +' }, { value: '-', label: 'Charge 2: −' }]} value={q2 > 0 ? '+' : '-'} onValueChange={(v) => setQ2(v === '+' ? 1 : -1)} ariaLabel="Charge 2 sign" />
      </div>
    </div>
  );
}
