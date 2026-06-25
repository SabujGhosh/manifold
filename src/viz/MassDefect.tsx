import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import type { VizProps } from './registry';

const C = 2.998e8;
const U = 1.6605e-27; // kg per atomic mass unit
const MEV_PER_U = 931.494; // MeV released per u of mass defect

interface Reaction {
  id: string;
  label: string;
  desc: string;
  defectU: number; // mass defect in u
  perNucleon: number; // MeV per nucleon
}

const REACTIONS: Reaction[] = [
  { id: 'fusion', label: 'D + T fusion', desc: '²H + ³H → ⁴He + n', defectU: 0.01888, perNucleon: 3.5 },
  { id: 'fission', label: 'U-235 fission', desc: '²³⁵U + n → fragments + neutrons', defectU: 0.1864, perNucleon: 0.85 },
];

export default function MassDefect({ params }: VizProps) {
  const [id, setId] = useState((params.reaction as string) || 'fusion');
  const rx = REACTIONS.find((r) => r.id === id)!;
  const energyJ = rx.defectU * U * C * C;
  const energyMeV = rx.defectU * MEV_PER_U;

  return (
    <div className="font-ui">
      <Tabs items={REACTIONS.map((r) => ({ value: r.id, label: r.label }))} value={id} onValueChange={setId} ariaLabel="Reaction" className="mb-4" />

      <div className="rounded-lg border border-border bg-surface p-5">
        <p className="font-mono text-lg text-ink">{rx.desc}</p>

        {/* mass bar */}
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-ink-faint">
            <span>reactant mass</span><span>product mass + energy</span>
          </div>
          <div className="flex h-8 overflow-hidden rounded-md">
            <div className="flex items-center justify-center bg-surface-2 text-xs" style={{ width: '88%' }}>products</div>
            <div className="flex items-center justify-center bg-accent text-xs text-white" style={{ width: '12%' }} title="mass converted to energy">Δm</div>
          </div>
          <p className="mt-1 text-xs text-ink-faint">A tiny mass defect Δm = {rx.defectU.toFixed(4)} u is converted to energy.</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            ['Mass defect', `${rx.defectU.toFixed(4)} u`],
            ['Energy (E=Δmc²)', `${energyMeV.toFixed(1)} MeV`],
            ['Per nucleon', `${rx.perNucleon.toFixed(2)} MeV`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-surface-2 px-3 py-2">
              <div className="text-xs text-ink-faint">{k}</div>
              <div className="font-mono text-ink">{v}</div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-ink-muted">
          That’s <span className="font-mono text-ink">{energyJ.toExponential(2)} J</span> per reaction.
          Fusion releases several times more energy <em>per nucleon</em> than fission — both lie on opposite sides of the iron-56 binding-energy peak.
        </p>
      </div>
    </div>
  );
}
