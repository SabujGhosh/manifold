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
      const c1 = { x: w * 0.34, y: h / 2, q: q1 };
      const c2 = { x: w * 0.66, y: h / 2, q: q2 };
      const charges = [c1, c2];
      const R = 13; // charge radius

      // Electric field direction (unit-ish) at a point.
      const field = (x: number, y: number): [number, number] => {
        let ex = 0;
        let ey = 0;
        for (const c of charges) {
          const dx = x - c.x;
          const dy = y - c.y;
          const r2 = dx * dx + dy * dy;
          const r = Math.sqrt(r2) + 1e-3;
          const e = c.q / (r2 + 25);
          ex += (e * dx) / r;
          ey += (e * dy) / r;
        }
        return [ex, ey];
      };

      // Trace one field line by stepping along (sign · E) until it hits a charge
      // or leaves the frame.
      const trace = (startX: number, startY: number, sign: number) => {
        const pts: [number, number][] = [[startX, startY]];
        let x = startX;
        let y = startY;
        for (let i = 0; i < 1600; i++) {
          const [ex, ey] = field(x, y);
          const m = Math.hypot(ex, ey);
          if (m < 1e-9) break;
          x += (sign * ex * 2.2) / m;
          y += (sign * ey * 2.2) / m;
          pts.push([x, y]);
          if (x < -20 || x > w + 20 || y < -20 || y > h + 20) break;
          let hit = false;
          for (const c of charges) {
            if (Math.hypot(x - c.x, y - c.y) < R) {
              pts.push([c.x, c.y]);
              hit = true;
              break;
            }
          }
          if (hit) break;
        }
        return pts;
      };

      // Seed lines around the positive charge(s) (or all charges if none are +).
      const positives = charges.filter((c) => c.q > 0);
      const seeds = positives.length ? positives : charges;
      const K = 14;
      for (const c of seeds) {
        const sign = c.q > 0 ? 1 : -1;
        for (let k = 0; k < K; k++) {
          const a = (k / K) * Math.PI * 2 + 0.0001;
          const pts = trace(c.x + Math.cos(a) * R, c.y + Math.sin(a) * R, sign);
          ctx.strokeStyle = cssVar('--ink-muted', 0.9);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1])));
          ctx.stroke();
          // Direction arrowhead along +E partway along the line.
          if (pts.length > 24) {
            const [mx, my] = pts[Math.floor(pts.length * 0.4)];
            const [ex, ey] = field(mx, my);
            const m = Math.hypot(ex, ey) || 1;
            const ax = ex / m;
            const ay = ey / m;
            const px = -ay;
            const py = ax;
            const s = 5;
            ctx.fillStyle = cssVar('--ink-muted', 0.95);
            ctx.beginPath();
            ctx.moveTo(mx + ax * s, my + ay * s);
            ctx.lineTo(mx - ax * s + px * s * 0.6, my - ay * s + py * s * 0.6);
            ctx.lineTo(mx - ax * s - px * s * 0.6, my - ay * s - py * s * 0.6);
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      // charges on top
      for (const c of charges) {
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
