import { useMemo, useState } from 'react';
import { chronological } from '@/content/index';
import { EquationCard } from '@/components/EquationCard';
import { usePersistedSet } from '@/lib/prefs';
import { Seo } from '@/components/Seo';
import { TOTAL_EQUATIONS } from '@/config';

export default function Browse() {
  const [q, setQ] = useState('');
  const readSet = usePersistedSet('read');

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return chronological;
    return chronological.filter((e) =>
      [e.name, e.oneLine, e.significance, ...e.fields, ...e.symbols.map((s) => s.name)]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Seo
        title="Browse all equations"
        description={`Search and filter all ${TOTAL_EQUATIONS} equations by name, field, era, or symbol.`}
        path="/equations"
      />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-ui text-3xl font-bold text-ink">Browse</h1>
          <p className="font-serif mt-1 text-ink-muted">
            {readSet.size} of {TOTAL_EQUATIONS} explored · {chronological.length} authored so far.
          </p>
        </div>
        <input
          id="global-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, field, symbol… (press /)"
          aria-label="Search equations"
          className="font-ui h-10 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-faint hover:border-accent/40 sm:w-72"
        />
      </div>

      {results.length === 0 ? (
        <p className="font-ui text-ink-faint">No equations match “{q}”.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((eq) => (
            <EquationCard key={eq.id} eq={eq} read={readSet.has(eq.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
