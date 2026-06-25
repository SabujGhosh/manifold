import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function EulerPhasor({ params }: VizProps) {
  const [theta, setTheta] = useState(num(params.theta, Math.PI / 3));

  const ref = useCanvas(
    (ctx, w, h) => {
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.4;
      const ink = cssVar('--ink');
      const muted = cssVar('--ink-faint');
      const accent = cssVar('--accent');
      const cosC = cssVar('--field-physics');
      const sinC = cssVar('--field-nonlinear-dynamics');

      // axes
      ctx.strokeStyle = cssVar('--ink-faint', 0.5);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - R - 20, cy);
      ctx.lineTo(cx + R + 20, cy);
      ctx.moveTo(cx, cy - R - 20);
      ctx.lineTo(cx, cy + R + 20);
      ctx.stroke();

      // unit circle
      ctx.strokeStyle = muted;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      const px = cx + R * Math.cos(theta);
      const py = cy - R * Math.sin(theta);

      // projections
      ctx.strokeStyle = cosC;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, cy);
      ctx.stroke();
      ctx.strokeStyle = sinC;
      ctx.beginPath();
      ctx.moveTo(px, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // radius vector
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();

      // angle arc
      ctx.strokeStyle = cssVar('--ink-faint', 0.8);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.25, 0, -theta, theta > 0);
      ctx.stroke();

      ctx.fillStyle = ink;
      ctx.font = '12px ui-sans-serif, system-ui';
      ctx.fillText('1', cx + R + 6, cy + 14);
      ctx.fillText('i', cx + 6, cy - R - 6);
      ctx.fillStyle = cosC;
      ctx.fillText(`cos θ = ${Math.cos(theta).toFixed(3)}`, 8, h - 24);
      ctx.fillStyle = sinC;
      ctx.fillText(`sin θ = ${Math.sin(theta).toFixed(3)}`, 8, h - 8);
    },
    [theta],
    0.8,
  );

  const frac = (theta / Math.PI).toFixed(2);

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Unit circle with the vector e to the i theta at angle ${theta.toFixed(2)} radians; real part cos ${Math.cos(theta).toFixed(2)}, imaginary part sin ${Math.sin(theta).toFixed(2)}.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        e<sup>iθ</sup> = <span className="font-mono text-ink">{Math.cos(theta).toFixed(3)} {Math.sin(theta) >= 0 ? '+' : '−'} {Math.abs(Math.sin(theta)).toFixed(3)}i</span>{' '}
        (θ = {frac}π)
      </p>
      <div className="mt-4">
        <Slider label="Angle θ" value={theta} min={0} max={2 * Math.PI} step={0.01} onChange={setTheta} format={(v) => `${(v / Math.PI).toFixed(2)}π`} />
      </div>
      {Math.abs(theta - Math.PI) < 0.03 && (
        <p className="mt-2 rounded bg-accent-soft px-3 py-2 text-sm text-ink">
          At θ = π: e<sup>iπ</sup> = −1, so e<sup>iπ</sup> + 1 = 0 — Euler’s identity.
        </p>
      )}
    </div>
  );
}
