import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function EMWave({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [freq, setFreq] = useState(num(params.frequency, 1));
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const tRef = useRef(0);

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
    const midY = cssH / 2;
    const t = tRef.current;
    const k = freq * 0.05;

    // propagation axis
    ctx.strokeStyle = cssVar('--ink-faint', 0.5);
    ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(cssW, midY); ctx.stroke();

    // E field (vertical, accent) and B field (skewed, physics color) as projections
    const drawField = (color: string, vert: boolean) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= cssW; x += 3) {
        const amp = Math.sin(k * x - t * freq * 2) * cssH * 0.32;
        const y = vert ? midY - amp : midY - amp * 0.45; // B drawn shallower (into-page suggestion)
        const xx = vert ? x : x + amp * 0.0;
        x === 0 ? ctx.moveTo(xx, y) : ctx.lineTo(xx, y);
      }
      ctx.stroke();
    };
    drawField(cssVar('--accent'), true); // E
    drawField(cssVar('--field-physics'), false); // B

    ctx.font = '12px ui-sans-serif, system-ui';
    ctx.fillStyle = cssVar('--accent'); ctx.fillText('E (electric)', 10, 16);
    ctx.fillStyle = cssVar('--field-physics'); ctx.fillText('B (magnetic ⟂)', 10, 32);
    ctx.fillStyle = cssVar('--ink-faint'); ctx.fillText('→ propagation (speed c)', cssW - 160, midY + 18);
  };

  useAnimationFrame(() => { tRef.current += 0.05; draw(); }, playing && !reduced);
  useEffect(() => { draw(); }, [freq]); // eslint-disable-line

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label="An electromagnetic wave with perpendicular oscillating electric and magnetic fields propagating at speed c." />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        <Button size="sm" variant="ghost" onClick={() => { tRef.current += 0.5; draw(); }}>Step</Button>
      </div>
      <div className="mt-4">
        <Slider label="Frequency" value={freq} min={0.5} max={3} step={0.1} onChange={setFreq} format={(v) => v.toFixed(1)} />
      </div>
      <p className="mt-2 text-sm text-ink-faint">E and B oscillate in phase, perpendicular to each other and to the direction of travel — a self-sustaining wave that is light.</p>
    </div>
  );
}
