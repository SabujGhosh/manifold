import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import { Tabs } from '@/components/ui/Tabs';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}
type Target = 'square' | 'sawtooth' | 'triangle';

// Fourier coefficients b_k for each target (period 2π, amplitude ~1)
function coeff(target: Target, k: number): number {
  if (target === 'square') return k % 2 === 1 ? 4 / (Math.PI * k) : 0;
  if (target === 'sawtooth') return (2 / Math.PI) * (k % 2 === 1 ? 1 : -1) / k;
  // triangle: odd harmonics, 1/k²
  if (k % 2 === 1) return (8 / (Math.PI * Math.PI)) * (((k - 1) / 2) % 2 === 0 ? 1 : -1) / (k * k);
  return 0;
}

export default function FourierBuilder({ params }: VizProps) {
  const [harmonics, setHarmonics] = useState(Math.round(num(params.harmonics, 5)));
  const [target, setTarget] = useState<Target>((params.target as Target) || 'square');

  const partial = (x: number) => {
    let s = 0;
    for (let k = 1; k <= harmonics; k++) s += coeff(target, k) * Math.sin(k * x);
    return s;
  };

  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 24;
      const xmin = -Math.PI;
      const xmax = Math.PI;
      const ymax = 1.5;
      const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - pad - 8);
      const sy = (y: number) => h / 2 - (y / ymax) * (h / 2 - pad);
      const muted = cssVar('--ink-faint');
      const accent = cssVar('--accent');
      const targetC = cssVar('--field-physics');

      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, sy(0));
      ctx.lineTo(w - 8, sy(0));
      ctx.stroke();

      // target (ideal) wave
      ctx.strokeStyle = cssVar('--field-physics', 0.5);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= 600; i++) {
        const x = xmin + (i / 600) * (xmax - xmin);
        let y = 0;
        if (target === 'square') y = x > 0 ? 1 : -1;
        else if (target === 'sawtooth') y = x / Math.PI;
        else y = 1 - 2 * Math.abs(x) / Math.PI;
        i === 0 ? ctx.moveTo(sx(x), sy(y)) : ctx.lineTo(sx(x), sy(y));
      }
      ctx.stroke();
      void targetC;

      // partial sum
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 800; i++) {
        const x = xmin + (i / 800) * (xmax - xmin);
        const y = partial(x);
        i === 0 ? ctx.moveTo(sx(x), sy(y)) : ctx.lineTo(sx(x), sy(y));
      }
      ctx.stroke();
    },
    [harmonics, target],
    0.45,
  );

  // spectrum bars
  const specRef = useCanvas(
    (ctx, w, h) => {
      const pad = 16;
      const maxAmp = 1.3;
      const barW = (w - 2 * pad) / 16;
      const accent = cssVar('--accent');
      const muted = cssVar('--ink-faint');
      ctx.strokeStyle = muted;
      ctx.beginPath();
      ctx.moveTo(pad, h - pad);
      ctx.lineTo(w - pad, h - pad);
      ctx.stroke();
      for (let k = 1; k <= 15; k++) {
        const amp = Math.abs(coeff(target, k));
        const bh = (amp / maxAmp) * (h - 2 * pad);
        ctx.fillStyle = k <= harmonics ? accent : cssVar('--ink-faint', 0.4);
        ctx.fillRect(pad + (k - 1) * barW + 2, h - pad - bh, barW - 4, bh);
      }
      ctx.fillStyle = cssVar('--ink-faint');
      ctx.font = '10px ui-sans-serif, system-ui';
      ctx.fillText('amplitude spectrum (harmonic k)', pad, 12);
    },
    [harmonics, target],
    0.3,
  );

  return (
    <div className="font-ui">
      <Tabs
        items={[
          { value: 'square', label: 'Square' },
          { value: 'sawtooth', label: 'Sawtooth' },
          { value: 'triangle', label: 'Triangle' },
        ]}
        value={target}
        onValueChange={(v) => setTarget(v as Target)}
        ariaLabel="Target waveform"
        className="mb-3"
      />
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Partial Fourier sum of ${harmonics} harmonics approximating a ${target} wave.`} />
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={specRef} className="block w-full" aria-hidden />
      </div>
      <div className="mt-4">
        <Slider label="Harmonics summed" value={harmonics} min={1} max={15} step={1} onChange={(v) => setHarmonics(Math.round(v))} format={(v) => String(Math.round(v))} />
      </div>
    </div>
  );
}
