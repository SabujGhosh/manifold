import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function CurvedSpacetime({ params }: VizProps) {
  const [mass, setMass] = useState(num(params.mass, 1));

  const ref = useCanvas(
    (ctx, w, h) => {
      const cx = w / 2;
      const cy = h * 0.42;
      // grid warped by a "well": displace each node downward toward center
      const well = (x: number, y: number) => {
        const dx = x - cx;
        const dy = y - cy;
        const r = Math.sqrt(dx * dx + dy * dy) + 8;
        return (mass * 2200) / r; // downward displacement (perspective)
      };
      ctx.strokeStyle = cssVar('--ink-faint', 0.5);
      ctx.lineWidth = 1;
      const step = 26;
      // horizontal lines
      for (let y = step; y < h; y += step) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const yy = y + well(x, y) * 0.12;
          x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
      // vertical lines
      for (let x = step; x < w; x += step) {
        ctx.beginPath();
        for (let y = 0; y <= h; y += 6) {
          const yy = y + well(x, y) * 0.12;
          x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
      // central mass
      ctx.fillStyle = cssVar('--field-relativity');
      ctx.beginPath(); ctx.arc(cx, cy, 8 + mass * 4, 0, Math.PI * 2); ctx.fill();

      // a geodesic / light ray bending past the mass
      ctx.strokeStyle = cssVar('--accent');
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const dx = x - cx;
        const bend = (mass * 1600) / (dx * dx + 1400);
        const y = h * 0.2 + (x / w) * 6 + bend;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = cssVar('--ink-faint');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('light ray bends near the mass (geodesic)', 10, 16);
    },
    [mass],
    0.72,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`A grid warped by a central mass of relative size ${mass}, with a light ray bending as it passes.`} />
      </div>
      <div className="mt-4">
        <Slider label="Central mass" value={mass} min={0.2} max={3} step={0.1} onChange={setMass} format={(v) => v.toFixed(1)} />
      </div>
      <p className="mt-2 text-sm text-ink-faint">Mass curves the spacetime grid; freely-moving objects and light follow the straightest available paths (geodesics), which appear bent — this is gravity.</p>
    </div>
  );
}
