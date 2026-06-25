import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { equations } from '@/content/index';
import { Math } from '@/components/math/Math';
import { Seo } from '@/components/Seo';

interface Row {
  symbol: string;
  name: string;
  meaning: string;
  units?: string;
  appearsIn: { id: string; name: string }[];
}

export default function Glossary() {
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const map = new Map<string, Row>();
    for (const eq of equations) {
      for (const s of eq.symbols) {
        const key = `${s.symbol}::${s.name}`;
        const existing = map.get(key);
        if (existing) existing.appearsIn.push({ id: eq.id, name: eq.name });
        else
          map.set(key, {
            symbol: s.symbol,
            name: s.name,
            meaning: s.meaning,
            units: s.units,
            appearsIn: [{ id: eq.id, name: eq.name }],
          });
      }
    }
    const all = [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
    const needle = q.trim().toLowerCase();
    if (!needle) return all;
    return all.filter((r) => `${r.name} ${r.meaning}`.toLowerCase().includes(needle));
  }, [q]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Seo
        title="Symbol glossary"
        description="Every symbol across the corpus, with its meaning, units, and where it appears."
        path="/glossary"
      />
      <h1 className="font-ui text-3xl font-bold text-ink">Glossary</h1>
      <p className="font-serif mt-1 text-ink-muted">
        Every symbol across the corpus, with meaning, units, and where it appears.
      </p>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search symbols…"
        aria-label="Search symbols"
        className="font-ui mt-4 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-ink placeholder:text-ink-faint sm:w-72"
      />

      <table className="font-ui mt-6 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-ink-faint">
            <th className="py-2 pr-4 font-medium">Symbol</th>
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Meaning</th>
            <th className="py-2 pr-4 font-medium">Units</th>
            <th className="py-2 font-medium">Appears in</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/60 align-top">
              <td className="py-2 pr-4">
                <Math tex={r.symbol} />
              </td>
              <td className="py-2 pr-4 text-ink">{r.name}</td>
              <td className="py-2 pr-4 text-ink-muted">{r.meaning}</td>
              <td className="py-2 pr-4 font-mono text-xs text-ink-faint">{r.units ?? '—'}</td>
              <td className="py-2">
                {r.appearsIn.map((a, j) => (
                  <span key={a.id}>
                    {j > 0 && ', '}
                    <Link to={`/e/${a.id}`} className="text-accent underline underline-offset-2">
                      {a.name}
                    </Link>
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
