import { useCallback, useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import { clamp } from '@/lib/format';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

const S_MAX = 5; // axis half-range

export default function LaplaceSPlane({ params }: VizProps) {
  const [sigma, setSigma] = useState(num(params.sigma, -0.4));
  const [omega, setOmega] = useState(num(params.omega, 4));

  // s-plane with draggable conjugate pole pair
  const planeRef = useCanvas(
    (ctx, w, h) => {
      const cx = w / 2;
      const cy = h / 2;
      const sc = Math.min(w, h) / (2 * S_MAX);
      const muted = cssVar('--ink-faint');
      const accent = cssVar('--accent');

      // shade left half-plane (stable region)
      ctx.fillStyle = cssVar('--field-biology', 0.08);
      ctx.fillRect(0, 0, cx, h);

      // axes
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy); ctx.lineTo(w, cy);
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.stroke();
      // imaginary axis emphasized (stability boundary)
      ctx.strokeStyle = cssVar('--field-nonlinear-dynamics', 0.6);
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = muted;
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('σ (Re s)', w - 56, cy - 6);
      ctx.fillText('iω', cx + 6, 12);
      ctx.fillText('stable', 8, h - 8);
      ctx.fillText('unstable', w - 56, h - 8);

      // poles (× marks) at σ ± iω
      const drawPole = (im: number) => {
        const px = cx + sigma * sc;
        const py = cy - im * sc;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(px - 6, py - 6); ctx.lineTo(px + 6, py + 6);
        ctx.moveTo(px - 6, py + 6); ctx.lineTo(px + 6, py - 6);
        ctx.stroke();
      };
      drawPole(omega);
      if (omega !== 0) drawPole(-omega);
    },
    [sigma, omega],
    1,
  );

  const onPlanePointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 0 && e.type === 'pointermove') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const sc = Math.min(rect.width, rect.height) / (2 * S_MAX);
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const ns = clamp((e.clientX - rect.left - cx) / sc, -S_MAX, S_MAX);
    const no = clamp(-((e.clientY - rect.top - cy) / sc), 0, S_MAX);
    setSigma(+ns.toFixed(2));
    setOmega(+no.toFixed(2));
  }, []);

  // time response e^{σt} cos(ωt)
  const respRef = useCanvas(
    (ctx, w, h) => {
      const pad = 20;
      const T = 6;
      const sx = (t: number) => pad + (t / T) * (w - pad - 8);
      const sy = (y: number) => h / 2 - y * (h / 2 - pad) * 0.5;
      ctx.strokeStyle = cssVar('--ink-faint');
      ctx.beginPath(); ctx.moveTo(pad, h / 2); ctx.lineTo(w - 8, h / 2); ctx.stroke();

      ctx.strokeStyle = cssVar('--accent');
      ctx.lineWidth = 2;
      ctx.beginPath();
      let clipped = false;
      for (let i = 0; i <= 400; i++) {
        const t = (i / 400) * T;
        let y = Math.exp(sigma * t) * Math.cos(omega * t);
        if (Math.abs(y) > 6) { y = Math.sign(y) * 6; clipped = true; }
        i === 0 ? ctx.moveTo(sx(t), sy(y)) : ctx.lineTo(sx(t), sy(y));
      }
      ctx.stroke();
      ctx.fillStyle = cssVar('--ink-faint');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('time →', w - 50, h / 2 + 14);
      if (clipped) ctx.fillText('(blows up — off chart)', pad, 14);
    },
    [sigma, omega],
    0.5,
  );

  const regime = sigma < -0.02 ? 'decays (stable)' : sigma > 0.02 ? 'grows (unstable)' : 'sustained oscillation (marginal)';

  return (
    <div className="font-ui">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-1 text-xs text-ink-faint">s-plane — drag to place the pole</div>
          <div
            className="relative cursor-crosshair touch-none overflow-hidden rounded-lg border border-border bg-surface"
            onPointerDown={onPlanePointer}
            onPointerMove={onPlanePointer}
            role="img"
            aria-label={`Pole at sigma ${sigma}, omega ${omega} in the s-plane; the response ${regime}.`}
          >
            <canvas ref={planeRef} className="block w-full" />
          </div>
        </div>
        <div>
          <div className="mb-1 text-xs text-ink-faint">time response e^(σt)·cos(ωt)</div>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <canvas ref={respRef} className="block w-full" aria-hidden />
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            Pole s = <span className="font-mono text-ink">{sigma.toFixed(2)} {omega >= 0 ? '+' : '−'} {Math.abs(omega).toFixed(2)}i</span> → response <span className="text-ink">{regime}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="σ (damping/growth)" value={sigma} min={-S_MAX} max={S_MAX} step={0.05} onChange={setSigma} format={(v) => v.toFixed(2)} />
        <Slider label="ω (oscillation)" value={omega} min={0} max={S_MAX} step={0.05} onChange={setOmega} format={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}
