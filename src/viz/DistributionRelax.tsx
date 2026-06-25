import { useEffect, useRef, useState } from 'react';
import { cssVar } from './shared/useCanvas';
import { useAnimationFrame, usePrefersReducedMotion } from './shared/useAnimationFrame';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Tabs } from '@/components/ui/Tabs';
import type { VizProps } from './registry';

const N = 60;

// Maxwell–Boltzmann-like equilibrium target (Rayleigh-ish over speed bins).
function equilibrium(): Float64Array {
  const u = new Float64Array(N);
  let s = 0;
  for (let i = 0; i < N; i++) {
    const v = ((i + 0.5) / N) * 3;
    u[i] = v * Math.exp((-v * v) / 1.2);
    s += u[i];
  }
  for (let i = 0; i < N; i++) u[i] /= s;
  return u;
}

type Init = 'beams' | 'cold' | 'hot';

// Different starting distributions, all far from equilibrium.
function makeInitial(kind: Init): Float64Array {
  const u = new Float64Array(N);
  let s = 0;
  for (let i = 0; i < N; i++) {
    if (kind === 'beams') u[i] = Math.exp(-((i - N * 0.25) ** 2) / 24) + Math.exp(-((i - N * 0.72) ** 2) / 24);
    else if (kind === 'cold') u[i] = Math.exp(-((i - N * 0.12) ** 2) / 8);
    else u[i] = Math.exp(-((i - N * 0.85) ** 2) / 36); // a single fast beam
    s += u[i];
  }
  for (let i = 0; i < N; i++) u[i] /= s;
  return u;
}

// Shannon entropy of the distribution (rises as collisions broaden it — the H-theorem).
function entropy(f: Float64Array): number {
  let s = 0;
  for (let i = 0; i < N; i++) if (f[i] > 1e-12) s -= f[i] * Math.log(f[i]);
  return s;
}

export default function DistributionRelax(_: VizProps) {
  void _;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const [rate, setRate] = useState(0.04); // collision rate (BGK relaxation)
  const [init, setInit] = useState<Init>('beams');
  const fRef = useRef<Float64Array>(makeInitial('beams'));
  const eq = useRef<Float64Array>(equilibrium());
  const sEqRef = useRef<number>(entropy(equilibrium()));
  const readoutRef = useRef<HTMLSpanElement | null>(null);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.45);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    const pad = 20;
    const f = fRef.current;
    const maxV = Math.max(...eq.current, ...f) * 1.1;
    const bw = (cssW - 2 * pad) / N;
    // equilibrium target outline
    ctx.strokeStyle = cssVar('--ink-faint', 0.7);
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    eq.current.forEach((v, i) => {
      const x = pad + i * bw + bw / 2;
      const y = cssH - 20 - (v / maxV) * (cssH - 40);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
    // current distribution bars
    ctx.fillStyle = cssVar('--accent');
    f.forEach((v, i) => {
      const x = pad + i * bw;
      const bh = (v / maxV) * (cssH - 40);
      ctx.fillRect(x + 1, cssH - 20 - bh, bw - 2, bh);
    });
    ctx.fillStyle = cssVar('--ink-faint');
    ctx.font = '11px ui-sans-serif, system-ui';
    ctx.fillText('speed →', cssW - 60, cssH - 4);
    ctx.fillText('— — Maxwell–Boltzmann equilibrium', pad, 12);

    // live entropy readout (updated outside React to avoid per-frame renders)
    if (readoutRef.current) {
      const s = entropy(f);
      const pct = Math.min(100, Math.round((s / sEqRef.current) * 100));
      readoutRef.current.textContent = `S = ${s.toFixed(3)}  (${pct}% of equilibrium)`;
    }
  };

  const stepSim = (steps = 1) => {
    const f = fRef.current;
    const e = eq.current;
    for (let n = 0; n < steps; n++) for (let i = 0; i < N; i++) f[i] += (e[i] - f[i]) * rate;
  };

  const resetTo = (kind: Init) => {
    setInit(kind);
    fRef.current = makeInitial(kind);
    draw();
  };

  useAnimationFrame(() => {
    stepSim();
    draw();
  }, playing && !reduced);
  useEffect(() => {
    draw();
  }, []); // eslint-disable-line

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas
          ref={canvasRef}
          className="block w-full"
          role="img"
          aria-label="A velocity distribution relaxing, collision by collision, toward the Maxwell–Boltzmann equilibrium curve."
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Button size="sm" onClick={() => setPlaying((p) => !p)}>
          {playing ? 'Pause' : 'Play'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { stepSim(15); draw(); }}>
          Step ×15
        </Button>
        <Button size="sm" variant="ghost" onClick={() => resetTo(init)}>
          Reset
        </Button>
        <span ref={readoutRef} className="ml-auto font-mono text-xs text-ink-muted" aria-live="off">
          S = —
        </span>
      </div>

      <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 text-sm text-ink-muted">Start from</div>
          <Tabs
            items={[
              { value: 'beams', label: 'Two beams' },
              { value: 'cold', label: 'Cold' },
              { value: 'hot', label: 'Hot' },
            ]}
            value={init}
            onValueChange={(v) => resetTo(v as Init)}
            ariaLabel="Initial distribution"
          />
        </div>
        <Slider
          label="Collision rate"
          value={rate}
          min={0.005}
          max={0.2}
          step={0.005}
          onChange={setRate}
          format={(v) => v.toFixed(3)}
        />
      </div>

      <p className="mt-3 text-sm text-ink-faint">
        Whatever the start — two beams, all-cold, or all-fast — collisions drive the distribution toward
        the same bell-like Maxwell–Boltzmann equilibrium, and the entropy <span className="font-mono">S</span>{' '}
        climbs toward its maximum. A higher collision rate just gets there faster (the H-theorem).
      </p>
    </div>
  );
}
