import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import { Tabs } from '@/components/ui/Tabs';
import type { VizProps } from './registry';

export default function GaugeField(_: VizProps) {
  void _;
  const [mode, setMode] = useState('abelian');
  const [sep, setSep] = useState(0.4);

  const ref = useCanvas(
    (ctx, w, h) => {
      const cy = h / 2;
      if (mode === 'abelian') {
        // two photon beams passing through each other (no interaction)
        ctx.lineWidth = 2;
        ctx.strokeStyle = cssVar('--field-physics');
        for (const yoff of [-20, 20]) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 3) {
            const y = cy + yoff + Math.sin(x * 0.1) * 6;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.fillStyle = cssVar('--ink-muted');
        ctx.font = '12px ui-sans-serif, system-ui';
        ctx.fillText('photons (U(1)): pass straight through — no self-interaction', 10, 18);
      } else {
        // two quarks connected by a flux tube that stretches with separation
        const x1 = w / 2 - sep * w * 0.4;
        const x2 = w / 2 + sep * w * 0.4;
        // flux tube
        ctx.strokeStyle = cssVar('--accent');
        ctx.lineWidth = 4 + sep * 3;
        ctx.beginPath(); ctx.moveTo(x1, cy); ctx.lineTo(x2, cy); ctx.stroke();
        // quarks
        for (const [x, c] of [[x1, '−'], [x2, '+']] as const) {
          ctx.fillStyle = cssVar('--field-nonlinear-dynamics');
          ctx.beginPath(); ctx.arc(x, cy, 12, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.font = 'bold 12px ui-sans-serif'; ctx.fillText(c, x - 4, cy + 4);
        }
        ctx.fillStyle = cssVar('--ink-muted');
        ctx.font = '12px ui-sans-serif, system-ui';
        const energy = sep > 0.85 ? 'tube snaps → new quark pair!' : `flux-tube energy ∝ separation (V ≈ σr)`;
        ctx.fillText(`gluons (SU(3)): self-interact → confining flux tube. ${energy}`, 10, 18);
        if (sep > 0.85) {
          ctx.fillStyle = cssVar('--field-biology');
          ctx.beginPath(); ctx.arc((x1 + x2) / 2 - 14, cy, 9, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc((x1 + x2) / 2 + 14, cy, 9, 0, Math.PI * 2); ctx.fill();
        }
      }
    },
    [mode, sep],
    0.5,
  );

  return (
    <div className="font-ui">
      <Tabs items={[{ value: 'abelian', label: 'Photons (U(1))' }, { value: 'nonabelian', label: 'Gluons (SU(3))' }]} value={mode} onValueChange={setMode} ariaLabel="Gauge group" className="mb-3" />
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={mode === 'abelian' ? 'Non-interacting photon beams passing through each other.' : 'A confining gluon flux tube between two quarks that snaps into new particles when stretched.'} />
      </div>
      {mode === 'nonabelian' && (
        <div className="mt-4">
          <Slider label="Quark separation" value={sep} min={0.1} max={1} step={0.02} onChange={setSep} format={(v) => v.toFixed(2)} />
        </div>
      )}
      <p className="mt-2 text-sm text-ink-faint">
        Abelian gauge bosons (photons) ignore each other; non-abelian ones (gluons) self-interact, producing a flux tube whose energy grows with distance — confinement.
      </p>
    </div>
  );
}
