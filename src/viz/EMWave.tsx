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
    const A = cssH * 0.3; // field amplitude in px
    // Oblique screen direction for the B axis (z, "into the page"): up-and-right,
    // foreshortened — so B reads as perpendicular to the vertical E and to x.
    const dzx = 0.72;
    const dzy = -0.42;
    const phaseAt = (x: number) => k * x - t * freq * 2;

    // propagation axis (x = direction of travel)
    ctx.strokeStyle = cssVar('--ink-faint', 0.5);
    ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(cssW, midY); ctx.stroke();

    // Stems sampling each field — fills the two perpendicular planes so the
    // 3D structure (E vertical, B into the page) is legible.
    for (let x = 18; x < cssW; x += 26) {
      const s = Math.sin(phaseAt(x));
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = cssVar('--accent', 0.3);
      ctx.beginPath(); ctx.moveTo(x, midY); ctx.lineTo(x, midY - A * s); ctx.stroke();
      ctx.strokeStyle = cssVar('--field-physics', 0.3);
      ctx.beginPath(); ctx.moveTo(x, midY); ctx.lineTo(x + A * s * dzx, midY + A * s * dzy); ctx.stroke();
    }

    // E wave (vertical plane)
    ctx.strokeStyle = cssVar('--accent');
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= cssW; x += 2) {
      const y = midY - A * Math.sin(phaseAt(x));
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // B wave (depth plane, oblique)
    ctx.strokeStyle = cssVar('--field-physics');
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= cssW; x += 2) {
      const b = A * Math.sin(phaseAt(x));
      const px = x + b * dzx;
      const py = midY + b * dzy;
      x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Axis triad (bottom-left): E up, B into page, c forward — all mutually ⟂.
    const ox = 42;
    const oy = cssH - 26;
    const L = 24;
    const axis = (dx: number, dy: number, color: string, label: string) => {
      const ex = ox + dx * L;
      const ey = oy + dy * L;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke();
      const m = Math.hypot(dx, dy) || 1;
      const ax = dx / m;
      const ay = dy / m;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - ax * 6 - ay * 4, ey - ay * 6 + ax * 4);
      ctx.lineTo(ex - ax * 6 + ay * 4, ey - ay * 6 - ax * 4);
      ctx.closePath();
      ctx.fill();
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText(label, ex + ax * 6 - 3, ey + ay * 6 + 4);
    };
    axis(1, 0, cssVar('--ink-faint'), 'c');
    axis(0, -1, cssVar('--accent'), 'E');
    axis(dzx, dzy, cssVar('--field-physics'), 'B');

    ctx.font = '12px ui-sans-serif, system-ui';
    ctx.fillStyle = cssVar('--accent'); ctx.fillText('E (electric)', 10, 16);
    ctx.fillStyle = cssVar('--field-physics'); ctx.fillText('B (magnetic, ⟂)', 10, 32);
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
