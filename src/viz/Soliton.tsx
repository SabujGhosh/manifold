import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

// Single KdV soliton profile: (c/2) sech²( (√c/2)(x - ct) )
const sech2 = (z: number) => {
  const c = 1 / Math.cosh(z);
  return c * c;
};

export default function Soliton({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [c1, setC1] = useState(num(params.c1, 4));
  const [c2, setC2] = useState(num(params.c2, 1));
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const tRef = useRef(0);

  const draw = () => {
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

    const t = tRef.current;
    const L = 40; // domain -20..20 (periodic)
    const wrap = (x: number) => ((x + 20 + 200) % L) - 20;
    // start positions
    const x1 = wrap(-12 + c1 * t * 0.0); // we'll move via phase below
    void x1;
    const pad = 12;
    const sx = (x: number) => pad + ((x + 20) / L) * (cssW - 2 * pad);
    const baseY = cssH - 16;
    const amp = (c: number) => (c / 2) * (cssH * 0.16);

    ctx.strokeStyle = cssVar('--accent');
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px <= cssW; px += 2) {
      const x = -20 + ((px - pad) / (cssW - 2 * pad)) * L;
      const p1 = wrap(x - (-12 + c1 * t));
      const p2 = wrap(x - (-4 + c2 * t));
      const u = amp(c1) * sech2((Math.sqrt(c1) / 2) * p1) + amp(c2) * sech2((Math.sqrt(c2) / 2) * p2);
      const y = baseY - u;
      px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
    }
    ctx.stroke();
    void sx;
    ctx.fillStyle = cssVar('--ink-faint');
    ctx.font = '11px ui-sans-serif, system-ui';
    ctx.fillText('tall soliton (faster) overtakes the short one', pad, 16);
  };

  useAnimationFrame(() => { tRef.current += 0.04; draw(); }, playing && !reduced);
  useEffect(() => { draw(); }, [c1, c2]); // eslint-disable-line

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label="Two KdV solitons; the taller faster one overtakes the shorter one and both emerge intact." />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        <Button size="sm" variant="ghost" onClick={() => { tRef.current += 0.5; draw(); }}>Step</Button>
        <Button size="sm" variant="ghost" onClick={() => { tRef.current = 0; draw(); }}>Reset</Button>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Soliton 1 speed/height c₁" value={c1} min={2} max={6} step={0.5} onChange={setC1} format={(v) => v.toFixed(1)} />
        <Slider label="Soliton 2 speed/height c₂" value={c2} min={0.5} max={3} step={0.5} onChange={setC2} format={(v) => v.toFixed(1)} />
      </div>
    </div>
  );
}
