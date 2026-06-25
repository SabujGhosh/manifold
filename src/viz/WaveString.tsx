import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function WaveString({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [c, setC] = useState(num(params.c, 1));
  const [mode, setMode] = useState(Math.round(num(params.mode, 2)));
  const [t, setT] = useState(0);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);

  const draw = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.4);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const pad = 20;
    const L = cssW - 2 * pad;
    const midY = cssH / 2;
    const amp = cssH * 0.32;
    const omega = c * mode; // angular frequency ∝ c·n

    // string
    ctx.strokeStyle = cssVar('--accent');
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const x = i / 200;
      const u = Math.sin(mode * Math.PI * x) * Math.cos(omega * time);
      const px = pad + x * L;
      const py = midY - u * amp;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // nodes
    ctx.fillStyle = cssVar('--ink-faint');
    for (let nNode = 0; nNode <= mode; nNode++) {
      const x = nNode / mode;
      ctx.beginPath();
      ctx.arc(pad + x * L, midY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // endpoints / equilibrium
    ctx.strokeStyle = cssVar('--ink-faint', 0.4);
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(pad, midY);
    ctx.lineTo(pad + L, midY);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useAnimationFrame((time) => {
    setT(time);
    draw(time);
  }, playing && !reduced);

  // redraw the static frame on mount and whenever params change while paused
  useEffect(() => {
    draw(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c, mode]);

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label={`Vibrating string in standing-wave mode ${mode} with ${mode + 1} nodes.`} />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        {(reduced || !playing) && (
          <Button size="sm" variant="ghost" onClick={() => { const nt = t + 0.15; setT(nt); draw(nt); }}>Step</Button>
        )}
        <span className="text-xs text-ink-faint">{mode + 1} nodes · mode n = {mode}</span>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Mode n" value={mode} min={1} max={6} step={1} onChange={(v) => setMode(Math.round(v))} format={(v) => String(Math.round(v))} />
        <Slider label="Wave speed c" value={c} min={0.3} max={3} step={0.1} onChange={setC} format={(v) => v.toFixed(1)} />
      </div>
    </div>
  );
}
