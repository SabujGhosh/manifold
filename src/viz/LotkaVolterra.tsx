import { useMemo, useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function LotkaVolterra({ params }: VizProps) {
  const [alpha, setAlpha] = useState(num(params.alpha, 1.1));
  const [beta, setBeta] = useState(num(params.beta, 0.4));
  const [gamma, setGamma] = useState(num(params.gamma, 0.4));
  const [delta, setDelta] = useState(num(params.delta, 0.1));

  // RK4 integration of the trajectory
  const traj = useMemo(() => {
    const dt = 0.01;
    const steps = 4000;
    let x = 10;
    let y = 5;
    const pts: { t: number; x: number; y: number }[] = [{ t: 0, x, y }];
    const f = (x: number, y: number) => [alpha * x - beta * x * y, delta * x * y - gamma * y] as const;
    for (let i = 1; i <= steps; i++) {
      const [k1x, k1y] = f(x, y);
      const [k2x, k2y] = f(x + (dt / 2) * k1x, y + (dt / 2) * k1y);
      const [k3x, k3y] = f(x + (dt / 2) * k2x, y + (dt / 2) * k2y);
      const [k4x, k4y] = f(x + dt * k3x, y + dt * k3y);
      x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
      y += (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
      x = Math.max(0, x);
      y = Math.max(0, y);
      pts.push({ t: i * dt, x, y });
    }
    return pts;
  }, [alpha, beta, gamma, delta]);

  const maxX = Math.max(...traj.map((p) => p.x), gamma / delta * 2) * 1.1;
  const maxY = Math.max(...traj.map((p) => p.y), alpha / beta * 2) * 1.1;

  // phase portrait
  const phaseRef = useCanvas(
    (ctx, w, h) => {
      const pad = 28;
      const sx = (x: number) => pad + (x / maxX) * (w - pad - 8);
      const sy = (y: number) => h - pad - (y / maxY) * (h - pad - 8);
      const muted = cssVar('--ink-faint');
      const prey = cssVar('--field-biology');
      const accent = cssVar('--accent');

      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, sy(0)); ctx.lineTo(w - 8, sy(0));
      ctx.moveTo(pad, sy(0)); ctx.lineTo(pad, 8);
      ctx.stroke();

      // equilibrium
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(sx(gamma / delta), sy(alpha / beta), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = prey;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      traj.forEach((p, i) => (i === 0 ? ctx.moveTo(sx(p.x), sy(p.y)) : ctx.lineTo(sx(p.x), sy(p.y))));
      ctx.stroke();

      ctx.fillStyle = cssVar('--ink');
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('prey →', w - 60, sy(0) + 14);
      ctx.save();
      ctx.translate(pad - 16, 60);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('predators →', 0, 0);
      ctx.restore();
    },
    [traj, maxX, maxY],
    0.85,
  );

  // time series
  const tsRef = useCanvas(
    (ctx, w, h) => {
      const pad = 24;
      const T = traj[traj.length - 1].t;
      const sx = (t: number) => pad + (t / T) * (w - pad - 8);
      const sy = (v: number) => h - pad - (v / Math.max(maxX, maxY)) * (h - pad - 8);
      ctx.strokeStyle = cssVar('--ink-faint');
      ctx.beginPath(); ctx.moveTo(pad, sy(0)); ctx.lineTo(w - 8, sy(0)); ctx.stroke();

      const drawSeries = (key: 'x' | 'y', color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        traj.forEach((p, i) => (i === 0 ? ctx.moveTo(sx(p.t), sy(p[key])) : ctx.lineTo(sx(p.t), sy(p[key]))));
        ctx.stroke();
      };
      drawSeries('x', cssVar('--field-biology'));
      drawSeries('y', cssVar('--accent'));

      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillStyle = cssVar('--field-biology'); ctx.fillText('prey', pad, 14);
      ctx.fillStyle = cssVar('--accent'); ctx.fillText('predators', pad + 40, 14);
    },
    [traj, maxX, maxY],
    0.4,
  );

  return (
    <div className="font-ui">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <canvas ref={phaseRef} className="block w-full" role="img" aria-label="Predator–prey phase portrait showing a closed orbit around the coexistence equilibrium." />
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <canvas ref={tsRef} className="block w-full" role="img" aria-label="Time series of predator and prey populations oscillating, with predators lagging prey." />
        </div>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-4">
        <Slider label="α prey growth" value={alpha} min={0.2} max={2} step={0.05} onChange={setAlpha} format={(v) => v.toFixed(2)} />
        <Slider label="β predation" value={beta} min={0.1} max={1} step={0.05} onChange={setBeta} format={(v) => v.toFixed(2)} />
        <Slider label="γ pred. death" value={gamma} min={0.1} max={1} step={0.05} onChange={setGamma} format={(v) => v.toFixed(2)} />
        <Slider label="δ pred. gain" value={delta} min={0.02} max={0.4} step={0.01} onChange={setDelta} format={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}
