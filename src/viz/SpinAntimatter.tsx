import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

type Phase = 'pair' | 'photons';

export default function SpinAntimatter(_: VizProps) {
  void _;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [spinUp, setSpinUp] = useState(true);
  const [sep, setSep] = useState(0.7); // separation of the pair (0.2 close … 1 far)
  const [phase, setPhase] = useState<Phase>('pair');
  const tRef = useRef(0);
  const phaseStart = useRef(0);

  // Electron / positron x-positions for a given width and separation.
  const positions = (w: number) => ({
    ex: w * (0.5 - 0.2 * sep),
    px: w * (0.5 + 0.2 * sep),
  });

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.5);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    const cy = cssH / 2;
    const t = tRef.current;

    // A particle with a precessing spin vector (wobbles around the vertical).
    const drawParticle = (cx: number, label: string, charge: string, color: string, up: boolean) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px ui-sans-serif, system-ui';
      ctx.fillText(charge, cx - 4, cy + 5);

      // Precessing spin arrow: points up or down, projection wobbles in x.
      const dir = up ? -1 : 1;
      const wob = Math.cos(t * 3 + (up ? 0 : Math.PI)) * 7;
      const baseY = cy + dir * 22;
      const tipY = cy + dir * 44;
      const tipX = cx + wob;
      ctx.strokeStyle = cssVar('--ink');
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, baseY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();
      ctx.fillStyle = cssVar('--ink');
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(tipX - 4, tipY - dir * 6);
      ctx.lineTo(tipX + 4, tipY - dir * 6);
      ctx.closePath();
      ctx.fill();
      // faint precession ellipse at the tip height
      ctx.strokeStyle = cssVar('--ink-faint', 0.5);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, tipY, 7, 2.5, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = cssVar('--ink-muted');
      ctx.font = '12px ui-sans-serif, system-ui';
      ctx.fillText(label, cx - ctx.measureText(label).width / 2, cy + 60);
    };

    if (phase === 'pair') {
      const { ex, px } = positions(cssW);
      drawParticle(ex, 'electron', '−', cssVar('--field-physics'), spinUp);
      drawParticle(px, 'positron', '+', cssVar('--field-nonlinear-dynamics'), !spinUp);
      ctx.fillStyle = cssVar('--ink-faint');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('tap a particle to flip its spin', cssW / 2 - 78, cssH - 8);
    } else {
      // Annihilation: a flash, then two 511 keV photons fly apart.
      const age = t - phaseStart.current;
      const flash = Math.max(0, 1 - age * 2);
      if (flash > 0) {
        ctx.fillStyle = cssVar('--accent', flash);
        ctx.beginPath();
        ctx.arc(cssW / 2, cy, 10 + flash * 26, 0, Math.PI * 2);
        ctx.fill();
      }
      const travel = Math.min(cssW * 0.42, age * cssW * 0.25);
      ctx.strokeStyle = cssVar('--accent');
      ctx.lineWidth = 2;
      for (const sgn of [-1, 1]) {
        const headX = cssW / 2 + sgn * travel;
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const f = i / 40;
          const x = cssW / 2 + sgn * travel * f;
          const y = cy + Math.sin(f * 22 - t * 4) * 7;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = cssVar('--ink');
        ctx.font = '12px ui-sans-serif, system-ui';
        ctx.fillText('γ 511 keV', headX - (sgn < 0 ? 64 : -6), cy - 14);
      }
    }
  };

  useAnimationFrame(() => {
    tRef.current += 0.02;
    draw();
  }, !reduced);
  useEffect(() => {
    draw();
  }); // redraw on any state change

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (phase !== 'pair') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const { ex, px } = positions(rect.width);
    if (Math.abs(x - ex) < 26 || Math.abs(x - px) < 26) setSpinUp((s) => !s);
  };

  const annihilate = () => {
    phaseStart.current = tRef.current;
    setPhase('photons');
  };

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas
          ref={canvasRef}
          onClick={onClick}
          className={`block w-full ${phase === 'pair' ? 'cursor-pointer' : ''}`}
          role="img"
          aria-label={
            phase === 'pair'
              ? 'An electron and its antiparticle the positron, with opposite charge and precessing spins.'
              : 'Electron and positron annihilating into two 511 keV photons flying apart.'
          }
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button size="sm" onClick={() => setSpinUp((s) => !s)} disabled={phase !== 'pair'}>
          Flip spin
        </Button>
        <Button
          size="sm"
          variant={phase === 'photons' ? 'secondary' : 'primary'}
          onClick={() => (phase === 'photons' ? setPhase('pair') : annihilate())}
        >
          {phase === 'photons' ? 'Reset pair' : 'Annihilate'}
        </Button>
      </div>
      {phase === 'pair' && (
        <div className="mt-4 max-w-xs">
          <Slider label="Separation" value={sep} min={0.2} max={1} step={0.05} onChange={setSep} format={(v) => v.toFixed(2)} />
        </div>
      )}
      <p className="mt-2 text-sm text-ink-faint">
        The Dirac equation’s four components are the electron and positron, each spin-up or spin-down (watch
        the spins precess). Bring the pair together and a particle meeting its antiparticle annihilates into
        two 511 keV photons flying back-to-back.
      </p>
    </div>
  );
}
