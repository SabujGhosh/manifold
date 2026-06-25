import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

export default function SpinAntimatter(_: VizProps) {
  void _;
  const [annihilate, setAnnihilate] = useState(false);
  const [spinUp, setSpinUp] = useState(true);

  const ref = useCanvas(
    (ctx, w, h) => {
      const cy = h / 2;
      const drawParticle = (cx: number, label: string, charge: string, color: string, up: boolean) => {
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px ui-sans-serif, system-ui';
        ctx.fillText(charge, cx - 4, cy + 5);
        // spin arrow
        ctx.strokeStyle = cssVar('--ink');
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 24); ctx.lineTo(cx, cy - 40);
        ctx.stroke();
        ctx.beginPath();
        if (up) { ctx.moveTo(cx, cy - 40); ctx.lineTo(cx - 4, cy - 34); ctx.lineTo(cx + 4, cy - 34); }
        else { ctx.moveTo(cx, cy - 24); ctx.lineTo(cx - 4, cy - 30); ctx.lineTo(cx + 4, cy - 30); }
        ctx.fillStyle = cssVar('--ink'); ctx.fill();
        ctx.fillStyle = cssVar('--ink-muted');
        ctx.font = '12px ui-sans-serif, system-ui';
        ctx.fillText(label, cx - 24, cy + 44);
      };

      if (!annihilate) {
        drawParticle(w * 0.32, 'electron', '−', cssVar('--field-physics'), spinUp);
        drawParticle(w * 0.68, 'positron', '+', cssVar('--field-nonlinear-dynamics'), !spinUp);
      } else {
        // two photons flying apart
        ctx.strokeStyle = cssVar('--accent');
        ctx.lineWidth = 2;
        for (const dir of [-1, 1]) {
          ctx.beginPath();
          for (let i = 0; i <= 40; i++) {
            const x = w / 2 + dir * i * (w * 0.011);
            const y = cy + Math.sin(i * 0.8) * 8;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.fillStyle = cssVar('--ink');
        ctx.font = '12px ui-sans-serif, system-ui';
        ctx.fillText('γ (511 keV)', w * 0.1, cy - 16);
        ctx.fillText('γ (511 keV)', w * 0.72, cy - 16);
      }
    },
    [annihilate, spinUp],
    0.5,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={annihilate ? 'Electron and positron annihilating into two photons.' : 'An electron and its antiparticle the positron, with opposite charge and spin.'} />
      </div>
      <div className="mt-3 flex gap-3">
        <Button size="sm" onClick={() => setSpinUp((s) => !s)} disabled={annihilate}>Flip spin</Button>
        <Button size="sm" variant={annihilate ? 'secondary' : 'primary'} onClick={() => setAnnihilate((a) => !a)}>
          {annihilate ? 'Reset pair' : 'Annihilate'}
        </Button>
      </div>
      <p className="mt-2 text-sm text-ink-faint">
        The Dirac equation’s four components are the electron and positron, each spin-up or spin-down. A particle meeting its antiparticle annihilates into two 511 keV photons.
      </p>
    </div>
  );
}
