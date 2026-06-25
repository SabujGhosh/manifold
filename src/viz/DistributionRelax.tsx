import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

const N = 60;

// Maxwell–Boltzmann-like equilibrium target (Rayleigh-ish over speed bins)
function equilibrium(): Float64Array {
  const u = new Float64Array(N);
  let s = 0;
  for (let i = 0; i < N; i++) {
    const v = (i + 0.5) / N * 3;
    u[i] = v * Math.exp(-v * v / 1.2);
    s += u[i];
  }
  for (let i = 0; i < N; i++) u[i] /= s;
  return u;
}

function initial(): Float64Array {
  // two beams (bimodal, far from equilibrium)
  const u = new Float64Array(N);
  let s = 0;
  for (let i = 0; i < N; i++) {
    u[i] = Math.exp(-((i - N * 0.25) ** 2) / 30) + Math.exp(-((i - N * 0.7) ** 2) / 30);
    s += u[i];
  }
  for (let i = 0; i < N; i++) u[i] /= s;
  return u;
}

export default function DistributionRelax(_: VizProps) {
  void _;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const fRef = useRef<Float64Array>(initial());
  const eq = useRef<Float64Array>(equilibrium());

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.45);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr; canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`; canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    const pad = 20;
    const f = fRef.current;
    const maxV = Math.max(...eq.current, ...f) * 1.1;
    const bw = (cssW - 2 * pad) / N;
    // equilibrium target outline
    ctx.strokeStyle = cssVar('--ink-faint', 0.6);
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    eq.current.forEach((v, i) => { const x = pad + i * bw + bw / 2; const y = cssH - 20 - (v / maxV) * (cssH - 40); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
    ctx.stroke();
    ctx.setLineDash([]);
    // current distribution bars
    ctx.fillStyle = cssVar('--accent');
    f.forEach((v, i) => { const x = pad + i * bw; const bh = (v / maxV) * (cssH - 40); ctx.fillRect(x + 1, cssH - 20 - bh, bw - 2, bh); });
    ctx.fillStyle = cssVar('--ink-faint');
    ctx.font = '11px ui-sans-serif, system-ui';
    ctx.fillText('speed →', cssW - 60, cssH - 4);
    ctx.fillText('— — Maxwell–Boltzmann equilibrium', pad, 12);
  };

  const stepSim = () => {
    // relax toward equilibrium (BGK-style), conserving normalization
    const f = fRef.current;
    const e = eq.current;
    for (let i = 0; i < N; i++) f[i] += (e[i] - f[i]) * 0.03;
  };

  useAnimationFrame(() => { stepSim(); draw(); }, playing && !reduced);
  useEffect(() => { draw(); }, []); // eslint-disable-line

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label="A bimodal velocity distribution relaxing, collision by collision, toward the Maxwell–Boltzmann equilibrium curve." />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        <Button size="sm" variant="ghost" onClick={() => { for (let i = 0; i < 30; i++) stepSim(); draw(); }}>Step</Button>
        <Button size="sm" variant="ghost" onClick={() => { fRef.current = initial(); draw(); }}>Reset</Button>
      </div>
      <p className="mt-2 text-sm text-ink-faint">Collisions drive any starting velocity distribution toward the same bell-like Maxwell–Boltzmann equilibrium (the H-theorem).</p>
    </div>
  );
}
