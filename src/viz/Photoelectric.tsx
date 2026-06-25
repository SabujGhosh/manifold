import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

const H_EV = 4.1357e-15; // eV·s

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function Photoelectric({ params }: VizProps) {
  const [freq, setFreq] = useState(num(params.frequency, 6e14)); // Hz
  const [phi, setPhi] = useState(num(params.workFunction, 2)); // eV

  const photonE = H_EV * freq; // eV
  const ke = photonE - phi;
  const ejects = ke > 0;
  const thresholdFreq = phi / H_EV;

  const ref = useCanvas(
    (ctx, w, h) => {
      // metal slab on left, photon arrow in, electron out if ejects
      const midY = h / 2;
      ctx.fillStyle = cssVar('--surface-2');
      ctx.fillRect(0, 0, w * 0.3, h);
      ctx.strokeStyle = cssVar('--ink-faint');
      ctx.strokeRect(0, 0, w * 0.3, h);
      ctx.fillStyle = cssVar('--ink-muted');
      ctx.font = '12px ui-sans-serif, system-ui';
      ctx.fillText(`metal (φ = ${phi.toFixed(1)} eV)`, 8, h - 10);

      // photon (color by frequency)
      const hue = Math.max(0, Math.min(280, 280 - (freq - 4e14) / 4e12));
      ctx.strokeStyle = `hsl(${hue}, 80%, 55%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = w * 0.9; x > w * 0.32; x -= 1) {
        const y = midY + Math.sin((x / 8) * (freq / 6e14)) * 8;
        x === w * 0.9 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      // arrowhead
      ctx.fillStyle = `hsl(${hue}, 80%, 55%)`;
      ctx.beginPath(); ctx.moveTo(w * 0.32, midY); ctx.lineTo(w * 0.36, midY - 5); ctx.lineTo(w * 0.36, midY + 5); ctx.fill();

      // ejected electron
      if (ejects) {
        ctx.fillStyle = cssVar('--accent');
        ctx.beginPath(); ctx.arc(w * 0.22, midY, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = cssVar('--accent');
        ctx.beginPath(); ctx.moveTo(w * 0.22, midY); ctx.lineTo(w * 0.05, midY); ctx.stroke();
        ctx.fillStyle = cssVar('--ink');
        ctx.fillText(`e⁻ KE = ${ke.toFixed(2)} eV`, w * 0.05, midY - 12);
      } else {
        ctx.fillStyle = cssVar('--ink-faint');
        ctx.fillText('no ejection', w * 0.4, midY - 14);
      }
    },
    [freq, phi],
    0.45,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Photoelectric effect: photon energy ${photonE.toFixed(2)} eV vs work function ${phi.toFixed(1)} eV; ${ejects ? 'electron ejected' : 'no ejection'}.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        Photon E = hν = <span className="font-mono text-ink">{photonE.toFixed(2)} eV</span>.{' '}
        {ejects ? `Ejected with KE = ${ke.toFixed(2)} eV.` : `Below threshold (need ν > ${(thresholdFreq / 1e14).toFixed(2)}×10¹⁴ Hz).`}
      </p>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Frequency (×10¹⁴ Hz)" value={freq / 1e14} min={1} max={15} step={0.1} onChange={(v) => setFreq(v * 1e14)} format={(v) => v.toFixed(1)} />
        <Slider label="Work function φ (eV)" value={phi} min={1} max={5} step={0.1} onChange={setPhi} format={(v) => v.toFixed(1)} />
      </div>
    </div>
  );
}
