import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function TwoBodyOrbit({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [centralMass, setMass] = useState(num(params.mass, 1));
  const [speed, setSpeed] = useState(num(params.speed, 1.0));
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const stateRef = useRef({ x: 1.2, y: 0, vx: 0, vy: 1, trail: [] as [number, number][] });

  const init = () => {
    stateRef.current = { x: 1.2, y: 0, vx: 0, vy: speed, trail: [] };
  };
  useEffect(init, [speed]); // eslint-disable-line

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.6);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr; canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`; canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    const cx = cssW / 2;
    const cy = cssH / 2;
    const scale = Math.min(cssW, cssH) / 5;
    const s = stateRef.current;

    // trail
    ctx.strokeStyle = cssVar('--accent', 0.5);
    ctx.lineWidth = 1;
    ctx.beginPath();
    s.trail.forEach(([x, y], i) => { const px = cx + x * scale; const py = cy + y * scale; i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); });
    ctx.stroke();

    // central mass
    ctx.fillStyle = cssVar('--field-relativity');
    ctx.beginPath(); ctx.arc(cx, cy, 6 + centralMass * 3, 0, Math.PI * 2); ctx.fill();
    // orbiting body
    ctx.fillStyle = cssVar('--accent');
    ctx.beginPath(); ctx.arc(cx + s.x * scale, cy + s.y * scale, 4, 0, Math.PI * 2); ctx.fill();
  };

  // symplectic (velocity Verlet) integrator, G·M = centralMass
  const stepSim = (steps: number) => {
    const s = stateRef.current;
    const GM = centralMass;
    const dt = 0.008;
    for (let i = 0; i < steps; i++) {
      const r2 = s.x * s.x + s.y * s.y;
      const r = Math.sqrt(r2);
      const ax = (-GM * s.x) / (r2 * r);
      const ay = (-GM * s.y) / (r2 * r);
      s.vx += ax * dt; s.vy += ay * dt;
      s.x += s.vx * dt; s.y += s.vy * dt;
    }
    s.trail.push([s.x, s.y]);
    if (s.trail.length > 1200) s.trail.shift();
  };

  useAnimationFrame(() => { stepSim(6); draw(); }, playing && !reduced);
  useEffect(() => { draw(); }, []); // eslint-disable-line

  // classify orbit by energy sign
  const s = stateRef.current;
  const r0 = Math.hypot(s.x, s.y);
  const energy = 0.5 * speed * speed - centralMass / r0;
  const kind = energy < -0.01 ? 'bound (ellipse)' : energy > 0.01 ? 'unbound (hyperbola)' : 'marginal (parabola)';

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label={`Two-body orbit; current trajectory is ${kind}.`} />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        <Button size="sm" variant="ghost" onClick={() => { stepSim(40); draw(); }}>Step</Button>
        <Button size="sm" variant="ghost" onClick={() => { init(); draw(); }}>Reset</Button>
        <span className="text-xs text-ink-faint">{kind}</span>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Central mass (GM)" value={centralMass} min={0.5} max={3} step={0.1} onChange={setMass} format={(v) => v.toFixed(1)} />
        <Slider label="Initial speed" value={speed} min={0.4} max={1.8} step={0.05} onChange={setSpeed} format={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}
