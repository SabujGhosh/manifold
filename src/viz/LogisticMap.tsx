import { useMemo, useState, useCallback } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { logisticStep, logisticTrajectory, lyapunovExponent } from '@/lib/dynamics';
import { Slider } from '@/components/ui/Slider';
import { clamp } from '@/lib/format';
import type { VizProps } from './registry';

const R_MIN = 2.4;
const R_MAX = 4.0;

function num(v: unknown, d: number): number {
  return typeof v === 'number' ? v : d;
}

export default function LogisticMap({ params }: VizProps) {
  const [r, setR] = useState(() => clamp(num(params.r, 3.2), R_MIN, R_MAX));
  const [x0, setX0] = useState(() => clamp(num(params.x0, 0.4), 0.001, 0.999));
  const [iterations, setIterations] = useState(() => Math.round(num(params.iterations, 60)));
  const [transient, setTransient] = useState(() => Math.round(num(params.transient, 200)));
  const [showLyap, setShowLyap] = useState(false);

  const lambda = useMemo(() => lyapunovExponent(r), [r]);

  /* ----------------------------- Bifurcation ----------------------------- */
  const bifRef = useCanvas(
    (ctx, w, h) => {
      const cols = Math.floor(w);
      const inkDot = cssVar('--ink', 0.5);
      const accent = cssVar('--accent');
      const lyapColor = cssVar('--field-nonlinear-dynamics');
      const axis = cssVar('--ink-faint', 0.5);

      // Attractor: iterate per column, discard transient, plot the rest.
      ctx.fillStyle = inkDot;
      const T = 250;
      const plot = 180;
      for (let c = 0; c < cols; c++) {
        const rr = R_MIN + (c / cols) * (R_MAX - R_MIN);
        let x = 0.5;
        for (let i = 0; i < T; i++) x = logisticStep(rr, x);
        for (let i = 0; i < plot; i++) {
          x = logisticStep(rr, x);
          const y = h - x * h;
          ctx.fillRect(c, y, 1, 1);
        }
      }

      // Optional Lyapunov-exponent overlay (scaled to [-1, +0.7] → canvas).
      if (showLyap) {
        ctx.strokeStyle = lyapColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let c = 0; c < cols; c += 2) {
          const rr = R_MIN + (c / cols) * (R_MAX - R_MIN);
          const lam = clamp(lyapunovExponent(rr, 0.5, 150, 400), -1, 0.7);
          const y = h * (1 - (lam + 1) / 1.7);
          if (c === 0) ctx.moveTo(c, y);
          else ctx.lineTo(c, y);
        }
        ctx.stroke();
        // zero line
        ctx.strokeStyle = axis;
        ctx.setLineDash([3, 3]);
        const y0 = h * (1 - 1 / 1.7);
        ctx.beginPath();
        ctx.moveTo(0, y0);
        ctx.lineTo(w, y0);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draggable r cursor.
      const cx = ((r - R_MIN) / (R_MAX - R_MIN)) * w;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();
    },
    [r, showLyap],
    0.62,
  );

  const onBifPointer = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons === 0 && e.type === 'pointermove') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const frac = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      setR(clamp(+(R_MIN + frac * (R_MAX - R_MIN)).toFixed(4), R_MIN, R_MAX));
    },
    [],
  );

  /* -------------------------------- Cobweb -------------------------------- */
  const cobRef = useCanvas(
    (ctx, w, h) => {
      const pad = 28;
      const sx = (x: number) => pad + x * (w - pad - 6);
      const sy = (y: number) => h - pad - y * (h - pad - 6);
      const ink = cssVar('--ink');
      const muted = cssVar('--ink-faint');
      const accent = cssVar('--accent');
      const curve = cssVar('--field-nonlinear-dynamics');

      // axes
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, sy(0));
      ctx.lineTo(sx(1), sy(0));
      ctx.moveTo(pad, sy(0));
      ctx.lineTo(pad, sy(1));
      ctx.stroke();

      // y = x diagonal
      ctx.strokeStyle = cssVar('--ink-faint', 0.7);
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(0));
      ctx.lineTo(sx(1), sy(1));
      ctx.stroke();
      ctx.setLineDash([]);

      // parabola f(x) = r x (1 - x)
      ctx.strokeStyle = curve;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const x = i / 200;
        const y = logisticStep(r, x);
        if (i === 0) ctx.moveTo(sx(x), sy(y));
        else ctx.lineTo(sx(x), sy(y));
      }
      ctx.stroke();

      // cobweb steps
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.85;
      let x = x0;
      ctx.beginPath();
      ctx.moveTo(sx(x), sy(0));
      for (let i = 0; i < 80; i++) {
        const y = logisticStep(r, x);
        ctx.lineTo(sx(x), sy(y)); // vertical to curve
        ctx.lineTo(sx(y), sy(y)); // horizontal to diagonal
        x = y;
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = ink;
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('xₙ', sx(1) - 14, sy(0) + 16);
      ctx.fillText('xₙ₊₁', pad - 22, sy(1) + 4);
    },
    [r, x0],
    1,
  );

  /* ----------------------------- Time series ------------------------------ */
  const tsRef = useCanvas(
    (ctx, w, h) => {
      const pad = 24;
      const traj = logisticTrajectory(r, x0, iterations + transient).slice(transient);
      const n = traj.length;
      const sx = (i: number) => pad + (i / (n - 1)) * (w - pad - 6);
      const sy = (y: number) => h - pad - y * (h - pad - 6);
      const muted = cssVar('--ink-faint');
      const accent = cssVar('--accent');

      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, sy(0));
      ctx.lineTo(sx(n - 1), sy(0));
      ctx.moveTo(pad, sy(0));
      ctx.lineTo(pad, sy(1));
      ctx.stroke();

      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      traj.forEach((y, i) => (i === 0 ? ctx.moveTo(sx(i), sy(y)) : ctx.lineTo(sx(i), sy(y))));
      ctx.stroke();

      ctx.fillStyle = accent;
      traj.forEach((y, i) => {
        ctx.beginPath();
        ctx.arc(sx(i), sy(y), 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = cssVar('--ink');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('n', sx(n - 1) - 8, sy(0) + 16);
    },
    [r, x0, iterations, transient],
    0.42,
  );

  const regime =
    lambda > 0.001
      ? 'chaotic (λ > 0)'
      : lambda < -0.001
        ? 'periodic / stable (λ < 0)'
        : 'marginal (λ ≈ 0)';

  return (
    <div className="font-ui">
      {/* Bifurcation */}
      <div className="mb-1 flex items-baseline justify-between">
        <h4 className="text-sm font-semibold text-ink">Bifurcation diagram</h4>
        <span className="text-xs text-ink-faint">drag to set r · λ ≈ {lambda.toFixed(3)} → {regime}</span>
      </div>
      <div
        className="relative cursor-ew-resize touch-none overflow-hidden rounded-lg border border-border bg-surface"
        onPointerDown={onBifPointer}
        onPointerMove={onBifPointer}
        role="img"
        aria-label={`Bifurcation diagram of the logistic map over r from ${R_MIN} to ${R_MAX}. Current r is ${r.toFixed(3)}, Lyapunov exponent approximately ${lambda.toFixed(3)}, regime ${regime}.`}
      >
        <canvas ref={bifRef} className="block w-full" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="mb-1 text-sm font-semibold text-ink">Cobweb plot</h4>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <canvas ref={cobRef} className="block w-full" aria-label={`Cobweb plot for r = ${r.toFixed(3)} starting from x0 = ${x0.toFixed(3)}.`} role="img" />
          </div>
        </div>
        <div>
          <h4 className="mb-1 text-sm font-semibold text-ink">Time series xₙ</h4>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <canvas ref={tsRef} className="block w-full" aria-label={`Time series of x sub n for r = ${r.toFixed(3)}.`} role="img" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <Slider label="Growth factor r" value={r} min={R_MIN} max={R_MAX} step={0.001} onChange={(v) => setR(v)} format={(v) => v.toFixed(3)} />
        <Slider label="Initial x₀" value={x0} min={0.001} max={0.999} step={0.001} onChange={setX0} format={(v) => v.toFixed(3)} />
        <Slider label="Iterations shown" value={iterations} min={20} max={200} step={1} onChange={(v) => setIterations(Math.round(v))} format={(v) => String(Math.round(v))} />
        <Slider label="Transient discarded" value={transient} min={0} max={500} step={1} onChange={(v) => setTransient(Math.round(v))} format={(v) => String(Math.round(v))} />
      </div>

      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
        <input type="checkbox" checked={showLyap} onChange={(e) => setShowLyap(e.target.checked)} className="accent-accent" />
        Overlay Lyapunov exponent on the bifurcation diagram
      </label>
    </div>
  );
}
