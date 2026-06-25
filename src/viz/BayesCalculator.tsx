import { useState } from 'react';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function BayesCalculator({ params }: VizProps) {
  const [prevalence, setPrev] = useState(num(params.prevalence, 0.001));
  const [sensitivity, setSens] = useState(num(params.sensitivity, 0.99));
  const [specificity, setSpec] = useState(num(params.specificity, 0.99));

  const N = 10000;
  const sick = prevalence;
  const truePos = sick * sensitivity;
  const falsePos = (1 - sick) * (1 - specificity);
  const posterior = truePos / (truePos + falsePos || 1);

  // grid of 10x10 = 100 cells, each = 1% of population
  const cells = Array.from({ length: 100 }, (_, i) => {
    const frac = (i + 0.5) / 100;
    if (frac < sick) return frac < sick * sensitivity / sick * sick ? 'tp' : 'fn';
    return 'healthy';
  });

  return (
    <div className="font-ui">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
        {/* natural-frequency grid: 10000 people */}
        <div>
          <div className="grid grid-cols-10 gap-0.5" style={{ width: 200 }}>
            {Array.from({ length: 100 }).map((_, i) => {
              // each cell represents 100 people
              const startFrac = i / 100;
              const sickFrac = sick;
              let color = 'rgb(var(--surface-2))';
              if (startFrac < sickFrac) color = 'rgb(var(--field-nonlinear-dynamics))';
              return <div key={i} title={`${i + 1}%`} style={{ width: 18, height: 18, background: color }} className="rounded-[2px]" />;
            })}
          </div>
          <p className="mt-2 text-xs text-ink-faint">Each square ≈ 1% of the population; red = has the disease.</p>
          {void cells}
        </div>

        <div className="space-y-2 text-sm">
          <Stat label="People tested" value={N.toLocaleString()} />
          <Stat label="Actually sick" value={(sick * N).toFixed(0)} accent />
          <Stat label="True positives" value={(truePos * N).toFixed(0)} />
          <Stat label="False positives" value={(falsePos * N).toFixed(0)} />
          <div className="mt-3 rounded-lg bg-surface-2 p-3">
            <div className="text-xs uppercase tracking-wide text-ink-faint">
              P(sick | positive test)
            </div>
            <div className="font-mono text-2xl font-semibold text-accent">
              {(posterior * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-ink-muted">
              of those who test positive actually have the disease
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        <Slider label="Prevalence" value={prevalence} min={0.0001} max={0.5} step={0.0001} onChange={setPrev} format={(v) => `${(v * 100).toFixed(2)}%`} />
        <Slider label="Sensitivity" value={sensitivity} min={0.5} max={1} step={0.001} onChange={setSens} format={(v) => `${(v * 100).toFixed(1)}%`} />
        <Slider label="Specificity" value={specificity} min={0.5} max={1} step={0.001} onChange={setSpec} format={(v) => `${(v * 100).toFixed(1)}%`} />
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-border/60 py-1">
      <span className="text-ink-muted">{label}</span>
      <span className={`font-mono ${accent ? 'text-accent' : 'text-ink'}`}>{value}</span>
    </div>
  );
}
