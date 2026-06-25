import { Link } from 'react-router-dom';
import { Math } from './math/Math';
import { Badge } from './ui/Badge';
import { fieldColor, fieldLabel } from '@/lib/format';
import type { EquationMeta } from '@/content/types';

export function EquationCard({ eq, read }: { eq: EquationMeta; read?: boolean }) {
  return (
    <Link
      to={`/e/${eq.id}`}
      className="group card-interactive block p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-ui text-base font-semibold text-ink group-hover:text-accent">
          {eq.name}
        </h3>
        {read && (
          <span className="font-ui shrink-0 text-xs text-accent" title="Read">
            ✓
          </span>
        )}
      </div>

      <div className="my-3 overflow-x-auto py-1 text-ink">
        <Math tex={eq.canonicalLatex} alt={eq.canonicalAlt} />
      </div>

      <p className="font-serif text-sm leading-snug text-ink-muted">{eq.oneLine}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {eq.fields.slice(0, 3).map((f) => (
          <Badge key={f} color={fieldColor(f)}>
            {fieldLabel(f)}
          </Badge>
        ))}
        <span className="font-ui ml-auto text-xs text-ink-faint">{eq.era.display}</span>
      </div>
    </Link>
  );
}
