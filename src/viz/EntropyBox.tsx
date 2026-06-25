import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

interface P { x: number; y: number; vx: number; vy: number; }

export default function EntropyBox({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const count = Math.round(num(params.particles, 60));
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const partsRef = useRef<P[]>([]);
  const [leftFrac, setLeftFrac] = useState(1);

  const init = () => {
    // all particles start in the left third (low entropy)
    partsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * 0.25, y: Math.random(),
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
    }));
    setLeftFrac(1);
  };
  useEffect(init, []); // eslint-disable-line

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
    ctx.strokeStyle = cssVar('--ink-faint');
    ctx.strokeRect(1, 1, cssW - 2, cssH - 2);
    // midline
    ctx.strokeStyle = cssVar('--ink-faint', 0.3);
    ctx.beginPath(); ctx.moveTo(cssW / 2, 0); ctx.lineTo(cssW / 2, cssH); ctx.stroke();
    let left = 0;
    ctx.fillStyle = cssVar('--accent');
    for (const p of partsRef.current) {
      if (p.x < 0.5) left++;
      ctx.beginPath();
      ctx.arc(p.x * cssW, p.y * cssH, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    return left / count;
  };

  const stepSim = () => {
    for (const p of partsRef.current) {
      p.x += p.vx * 0.004; p.y += p.vy * 0.004;
      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > 1) { p.x = 1; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > 1) { p.y = 1; p.vy *= -1; }
    }
  };

  useAnimationFrame(() => { stepSim(); const lf = draw(); if (lf != null) setLeftFrac(lf); }, playing && !reduced);
  useEffect(() => { draw(); }, []); // eslint-disable-line

  // entropy of the left/right split (binary, per particle) scaled by N
  const p = Math.max(1e-6, Math.min(1 - 1e-6, leftFrac));
  const Hbits = (-p * Math.log2(p) - (1 - p) * Math.log2(1 - p)) * count;

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label={`A gas released on one side spreading through the box; ${(leftFrac * 100).toFixed(0)}% currently on the left.`} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
        <Button size="sm" onClick={() => setPlaying((pl) => !pl)}>{playing ? 'Pause' : 'Play'}</Button>
        <Button size="sm" variant="ghost" onClick={() => { init(); draw(); }}>Reset (all left)</Button>
        <span className="text-ink-muted">left: <span className="font-mono text-ink">{(leftFrac * 100).toFixed(0)}%</span></span>
        <span className="text-ink-muted">spreading entropy ≈ <span className="font-mono text-accent">{Hbits.toFixed(0)} bits</span></span>
      </div>
      <p className="mt-2 text-sm text-ink-faint">
        Released from one side (low multiplicity), the gas spreads to the most probable 50/50 split — entropy rises and never spontaneously reverses.
      </p>
    </div>
  );
}
