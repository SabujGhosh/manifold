import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { chronological } from '@/content/index';
import { Math } from '@/components/math/Math';
import { Badge } from '@/components/ui/Badge';
import { eraBucket, fieldColor, fieldLabel } from '@/lib/format';
import { Seo } from '@/components/Seo';
import type { EquationMeta } from '@/content/types';

const ERA_ORDER = ['Antiquity', 'Enlightenment', '18th–early 19th c.', '19th century', 'Modern (20th c.+)'];

export default function Timeline() {
  const groups = useMemo(() => {
    const map = new Map<string, EquationMeta[]>();
    for (const eq of chronological) {
      const bucket = eraBucket(eq.era.sortKey);
      if (!map.has(bucket)) map.set(bucket, []);
      map.get(bucket)!.push(eq);
    }
    return ERA_ORDER.filter((b) => map.has(b)).map((b) => ({ era: b, items: map.get(b)! }));
  }, []);

  const total = chronological.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Seo
        title="Timeline of equations"
        description="Every equation placed by date — from Pythagoras to the Mandelbrot set — showing how discovery accelerates."
        path="/timeline"
      />
      <h1 className="font-ui text-3xl font-bold text-ink">Timeline</h1>
      <p className="font-serif mt-1 max-w-prose text-ink-muted">
        {total} equations from Pythagoras (~530 BCE) to the Mandelbrot set (1980). Notice how
        discovery <em>accelerates</em> — millennia between the ancients, then a torrent in the last
        two centuries.
      </p>

      {/* density strip */}
      <DensityStrip />

      <div className="mt-10">
        {groups.map((g) => (
          <section key={g.era} className="relative">
            <h2 className="font-ui sticky top-[57px] z-10 -mx-4 bg-bg/90 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-accent backdrop-blur">
              {g.era} <span className="text-ink-faint">· {g.items.length}</span>
            </h2>
            <ol className="relative ml-3 border-l border-border">
              {g.items.map((eq) => (
                <li key={eq.id} className="relative py-4 pl-6">
                  <span className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full border-2 border-bg" style={{ background: fieldColor(eq.fields[0]) }} />
                  <Link to={`/e/${eq.id}`} className="group block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/50 hover:bg-surface-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-ui font-semibold text-ink group-hover:text-accent">{eq.name}</h3>
                      <span className="font-ui font-mono text-sm text-ink-faint">{eq.era.display}</span>
                    </div>
                    <div className="my-2 overflow-x-auto text-ink">
                      <Math tex={eq.canonicalLatex} alt={eq.canonicalAlt} />
                    </div>
                    <p className="font-serif text-sm text-ink-muted">{eq.oneLine}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {eq.fields.slice(0, 3).map((f) => (
                        <Badge key={f} color={fieldColor(f)}>{fieldLabel(f)}</Badge>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

/** A horizontal strip placing each equation by year, showing the acceleration. */
function DensityStrip() {
  const minYear = -600;
  const maxYear = 2000;
  const span = maxYear - minYear;
  return (
    <div className="mt-6 rounded-xl border border-border bg-surface p-4">
      <div className="relative h-12">
        <div className="absolute inset-x-0 top-6 h-px bg-border" />
        {chronological.map((eq) => {
          const left = ((eq.era.sortKey - minYear) / span) * 100;
          return (
            <Link
              key={eq.id}
              to={`/e/${eq.id}`}
              title={`${eq.name} (${eq.era.display})`}
              className="absolute top-4 h-4 w-1 -translate-x-1/2 rounded-full transition-transform hover:scale-y-150"
              style={{ left: `${left}%`, background: fieldColor(eq.fields[0]) }}
            />
          );
        })}
      </div>
      <div className="relative mt-1 h-4 font-ui text-xs text-ink-faint">
        {[
          { year: -600, label: '600 BCE' },
          { year: 0, label: '0' },
          { year: 1000, label: '1000' },
          { year: 1700, label: '1700' },
          { year: 2000, label: '2000' },
        ].map((t) => (
          <span key={t.year} className="absolute -translate-x-1/2" style={{ left: `${((t.year - minYear) / span) * 100}%` }}>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
