import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

interface P { x: number; y: number; vx: number; vy: number; }

export default function IdealGasBox({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [temp, setTemp] = useState(num(params.temperature, 300));
  const [volume, setVolume] = useState(num(params.volume, 1)); // fraction of box width used
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const partsRef = useRef<P[]>([]);
  const pressureRef = useRef(0);

  const speed = Math.sqrt(temp) / 12;
  const count = Math.round(num(params.particles, 80));

  const init = () => {
    partsRef.current = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5), vy: (Math.random() - 0.5),
    }));
  };
  useEffect(init, []); // eslint-disable-line

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.5);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr; canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`; canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    const boxW = cssW * volume;
    ctx.strokeStyle = cssVar('--ink-faint');
    ctx.strokeRect(1, 1, boxW - 2, cssH - 2);
    ctx.fillStyle = cssVar('--accent');
    for (const p of partsRef.current) {
      ctx.beginPath();
      ctx.arc(p.x * boxW, p.y * cssH, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const stepSim = () => {
    const ps = partsRef.current;
    let wallHits = 0;
    for (const p of ps) {
      p.x += p.vx * speed * 0.02;
      p.y += p.vy * speed * 0.02;
      if (p.x < 0) { p.x = 0; p.vx *= -1; wallHits++; }
      if (p.x > 1) { p.x = 1; p.vx *= -1; wallHits++; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; wallHits++; }
      if (p.y > 1) { p.y = 1; p.vy *= -1; wallHits++; }
    }
    pressureRef.current = pressureRef.current * 0.9 + wallHits * 0.1;
  };

  useAnimationFrame(() => { stepSim(); draw(); }, playing && !reduced);
  useEffect(() => { draw(); }, [volume]); // eslint-disable-line

  // PV ∝ NT check: pressure ∝ T / V (volume = box width fraction)
  const pvOverNT = ((pressureRef.current || count * speed) * volume) / (count * temp);

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label={`A box of ${count} molecules at temperature ${temp} K and relative volume ${volume.toFixed(2)}.`} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        <span className="text-ink-muted">N = {count}</span>
        <span className="text-ink-muted">avg speed ∝ √T</span>
        <span className="text-ink-muted">PV/NT ≈ <span className="font-mono text-ink">{(pvOverNT * 1e3).toFixed(2)}</span> (≈ const = R)</span>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Temperature (K)" value={temp} min={50} max={800} step={10} onChange={setTemp} format={(v) => v.toFixed(0)} />
        <Slider label="Volume (box width)" value={volume} min={0.4} max={1} step={0.05} onChange={setVolume} format={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}
