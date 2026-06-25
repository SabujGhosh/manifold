import { Tooltip } from './ui/Tooltip';
import { Math } from './math/Math';
import type { SymbolDef } from '@/content/types';

/** A clickable/hoverable symbol that reveals its name, meaning and units. */
export function SymbolChip({ def }: { def: SymbolDef }) {
  return (
    <Tooltip
      content={
        <span className="block">
          <span className="font-semibold text-ink">{def.name}</span>
          <span className="mt-0.5 block text-ink-muted">{def.meaning}</span>
          {def.units && (
            <span className="mt-1 block font-mono text-[0.7rem] text-ink-faint">
              units: {def.units}
            </span>
          )}
        </span>
      }
    >
      <button
        type="button"
        className="rounded px-1 text-accent hover:bg-accent-soft"
        aria-label={`${def.name}: ${def.meaning}`}
      >
        <Math tex={def.symbol} />
      </button>
    </Tooltip>
  );
}

/** The full symbol table (collapsible section on the equation page). */
export function SymbolTable({ symbols }: { symbols: SymbolDef[] }) {
  return (
    <table className="font-ui w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-border text-left text-ink-faint">
          <th className="py-2 pr-4 font-medium">Symbol</th>
          <th className="py-2 pr-4 font-medium">Name</th>
          <th className="py-2 pr-4 font-medium">Meaning</th>
          <th className="py-2 font-medium">Units</th>
        </tr>
      </thead>
      <tbody>
        {symbols.map((s, i) => (
          <tr key={i} className="border-b border-border/60 align-top">
            <td className="py-2 pr-4">
              <Math tex={s.symbol} />
            </td>
            <td className="py-2 pr-4 text-ink">{s.name}</td>
            <td className="py-2 pr-4 text-ink-muted">{s.meaning}</td>
            <td className="py-2 font-mono text-xs text-ink-faint">{s.units ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
