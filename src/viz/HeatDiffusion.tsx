import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

const N = 120;

function makeProfile(kind: string): Float64Array {
  const u = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    const x = i / (N - 1);
    if (kind === 'spike') u[i] = Math.abs(x - 0.5) < 0.04 ? 1 : 0;
    else if (kind === 'two') u[i] = (Math.abs(x - 0.3) < 0.04 || Math.abs(x - 0.7) < 0.04) ? 1 : 0;
    else u[i] = x < 0.5 ? 1 : 0; // step
  }
  return u;
}

export default function HeatDiffusion({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [alpha, setAlpha] = useState(num(params.alpha, 1));
  const [profile, setProfile] = useState((params.profile as string) || 'spike');
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const uRef = useRef<Float64Array>(makeProfile(profile));

  const reset = () => { uRef.current = makeProfile(profile); draw(); };
  useEffect(reset, [profile]); // eslint-disable-line

  const stepSim = (steps: number) => {
    const u = uRef.current;
    const r = 0.25 * alpha; // stable since ≤0.5
    for (let s = 0; s < steps; s++) {
      const nu = new Float64Array(N);
      for (let i = 1; i < N - 1; i++) nu[i] = u[i] + r * (u[i + 1] - 2 * u[i] + u[i - 1]);
      nu[0] = nu[1];
      nu[N - 1] = nu[N - 2];
      u.set(nu);
    }
  };

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.4);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr; canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`; canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    const u = uRef.current;
    const pad = 16;
    // heat strip
    for (let i = 0; i < N; i++) {
      const t = Math.max(0, Math.min(1, u[i]));
      ctx.fillStyle = `hsl(${(1 - t) * 220}, 85%, ${30 + t * 35}%)`;
      ctx.fillRect(pad + (i / N) * (cssW - 2 * pad), cssH - 24, (cssW - 2 * pad) / N + 1, 16);
    }
    // profile curve
    ctx.strokeStyle = cssVar('--accent');
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const x = pad + (i / (N - 1)) * (cssW - 2 * pad);
      const y = cssH - 30 - u[i] * (cssH - 50);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  useAnimationFrame(() => { stepSim(Math.round(2 + alpha * 4)); draw(); }, playing && !reduced);
  useEffect(() => { draw(); }, []); // eslint-disable-line

  return (
    <div className="font-ui">
      <Tabs items={[{ value: 'spike', label: 'Spike' }, { value: 'two', label: 'Two bumps' }, { value: 'step', label: 'Step' }]} value={profile} onValueChange={setProfile} ariaLabel="Initial profile" className="mb-3" />
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label="A temperature profile on a rod relaxing and smoothing over time via diffusion." />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        <Button size="sm" variant="ghost" onClick={() => { stepSim(20); draw(); }}>Step</Button>
        <Button size="sm" variant="ghost" onClick={reset}>Reset</Button>
      </div>
      <div className="mt-4">
        <Slider label="Diffusivity α" value={alpha} min={0.2} max={2} step={0.1} onChange={setAlpha} format={(v) => v.toFixed(1)} />
      </div>
    </div>
  );
}
