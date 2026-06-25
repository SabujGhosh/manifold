import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function ForceMassAccel({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [force, setForce] = useState(num(params.force, 10));
  const [mass, setMass] = useState(num(params.mass, 2));
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const stateRef = useRef({ x: 0, v: 0, last: 0 });

  const a = force / mass;

  const draw = (resetT?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.32);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr; canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`; canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    void resetT;

    const groundY = cssH - 18;
    ctx.strokeStyle = cssVar('--ink-faint');
    ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(cssW, groundY); ctx.stroke();

    const size = 24 + mass * 6;
    const bx = 20 + (stateRef.current.x % (cssW - size - 40));
    const by = groundY - size;
    ctx.fillStyle = cssVar('--accent');
    ctx.fillRect(bx, by, size, size);

    // force arrow
    ctx.strokeStyle = cssVar('--field-physics');
    ctx.lineWidth = 3;
    const aw = 10 + force * 4;
    ctx.beginPath(); ctx.moveTo(bx + size, by + size / 2); ctx.lineTo(bx + size + aw, by + size / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx + size + aw, by + size / 2); ctx.lineTo(bx + size + aw - 6, by + size / 2 - 5); ctx.lineTo(bx + size + aw - 6, by + size / 2 + 5); ctx.fillStyle = cssVar('--field-physics'); ctx.fill();

    ctx.fillStyle = cssVar('--ink');
    ctx.font = '12px ui-sans-serif, system-ui';
    ctx.fillText(`a = F/m = ${a.toFixed(2)} m/s²`, 10, 16);
  };

  useAnimationFrame((t) => {
    const s = stateRef.current;
    const dt = Math.min(0.05, t - s.last || 0.016);
    s.last = t;
    s.v += a * dt * 8;
    s.x += s.v * dt;
    const canvas = canvasRef.current;
    if (canvas) {
      const wrap = canvas.parentElement!.clientWidth;
      if (s.x > wrap) { s.x = 0; s.v = 0; }
    }
    draw();
  }, playing && !reduced);

  useEffect(() => { draw(); /* eslint-disable-next-line */ }, [force, mass]);

  const reset = () => { stateRef.current = { x: 0, v: 0, last: 0 }; draw(); };

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label={`Block of mass ${mass} kg under force ${force} N accelerates at ${a.toFixed(2)} m/s².`} />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        <Button size="sm" variant="ghost" onClick={reset}>Reset</Button>
        <span className="text-sm text-ink-muted">a = <span className="font-mono text-accent">{a.toFixed(2)} m/s²</span></span>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Force F (N)" value={force} min={1} max={20} step={0.5} onChange={setForce} format={(v) => v.toFixed(1)} />
        <Slider label="Mass m (kg)" value={mass} min={0.5} max={10} step={0.5} onChange={setMass} format={(v) => v.toFixed(1)} />
      </div>
    </div>
  );
}
