import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

interface Tracer { x: number; y: number; }

/**
 * Stylized flow past a cylinder. Not a real Navier–Stokes solver — it overlays
 * an analytic potential flow with a Reynolds-dependent oscillating wake to evoke
 * the von Kármán vortex street as Re increases.
 */
export default function FlowField({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [Re, setRe] = useState(num(params.reynolds, 100));
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const tracersRef = useRef<Tracer[]>([]);
  const tRef = useRef(0);

  const init = () => {
    tracersRef.current = Array.from({ length: 280 }, () => ({ x: Math.random() * 0.1, y: Math.random() }));
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

    const cylX = 0.28;
    const cylY = 0.5;
    const cylR = 0.07;

    ctx.fillStyle = cssVar('--accent', 0.7);
    for (const tr of tracersRef.current) {
      ctx.fillRect(tr.x * cssW, tr.y * cssH, 2, 2);
    }
    // cylinder
    ctx.fillStyle = cssVar('--ink');
    ctx.beginPath(); ctx.arc(cylX * cssW, cylY * cssH, cylR * cssH, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = cssVar('--ink-faint');
    ctx.font = '11px ui-sans-serif, system-ui';
    const regime = Re < 40 ? 'laminar (steady)' : Re < 1000 ? 'vortex street (periodic)' : 'turbulent wake';
    ctx.fillText(`Re = ${Re.toFixed(0)} — ${regime}`, 10, 16);
  };

  const stepSim = () => {
    tRef.current += 0.05;
    const t = tRef.current;
    const cylX = 0.28;
    const cylY = 0.5;
    const cylR = 0.07;
    const sheddingAmp = Re < 40 ? 0 : Math.min(0.12, (Re - 40) / 2000 + 0.03);
    const turb = Re > 1000 ? (Re - 1000) / 40000 : 0;
    for (const tr of tracersRef.current) {
      let u = 0.012; // base rightward flow
      let v = 0;
      // deflect around cylinder
      const dx = tr.x - cylX;
      const dy = tr.y - cylY;
      const r2 = dx * dx + dy * dy;
      if (r2 < cylR * cylR * 4) {
        v += (dy > 0 ? 1 : -1) * 0.01;
        u += 0.004;
      }
      // wake oscillation downstream
      if (tr.x > cylX && Math.abs(dy) < 0.25) {
        v += sheddingAmp * Math.sin((tr.x - cylX) * 18 - t * 4) * 0.05;
      }
      if (turb) { u += (Math.random() - 0.5) * turb; v += (Math.random() - 0.5) * turb; }
      tr.x += u; tr.y += v;
      if (tr.x > 1 || tr.y < 0 || tr.y > 1) { tr.x = 0; tr.y = Math.random(); }
    }
  };

  useAnimationFrame(() => { stepSim(); draw(); }, playing && !reduced);
  useEffect(() => { draw(); }, []); // eslint-disable-line

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={canvasRef} className="block w-full" role="img" aria-label={`Flow of tracer particles past a cylinder at Reynolds number ${Re.toFixed(0)}.`} />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
        <Button size="sm" variant="ghost" onClick={() => { init(); draw(); }}>Reset</Button>
      </div>
      <div className="mt-4">
        <Slider label="Reynolds number" value={Re} min={5} max={3000} step={5} onChange={setRe} format={(v) => v.toFixed(0)} />
      </div>
      <p className="mt-2 text-xs text-ink-faint">Illustrative (not a full solver): low Re stays smooth; past ~40 a periodic von Kármán vortex street forms; high Re grows turbulent.</p>
    </div>
  );
}
