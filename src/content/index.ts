/**
 * Lightweight runtime content API.
 *
 * Listing/search/graph views consume the small metadata payload in
 * `meta.generated.ts` (no per-level prose, citations, or history), so opening
 * Browse/Timeline/Connections does not download all 33 full equations. The heavy
 * body of a single equation is loaded on demand via `loadEquation(id)`, which
 * `import.meta.glob` compiles into one lazy chunk per equation file.
 *
 * The full eager corpus lives in `./corpus.ts` and is build-time/test-only.
 */
import type { Equation, EquationMeta } from './types';
import { meta } from './meta.generated';

/** All equations as lightweight metadata, in authored (canonical) order. */
export const equations: EquationMeta[] = meta;

/** id -> metadata */
export const byId: Map<string, EquationMeta> = new Map(meta.map((e) => [e.id, e]));

/** Metadata sorted chronologically (BCE negative). */
export const chronological: EquationMeta[] = [...meta].sort(
  (a, b) => a.era.sortKey - b.era.sortKey,
);

/** Lightweight metadata lookup (synchronous). */
export function getMeta(id: string): EquationMeta | undefined {
  return byId.get(id);
}

/** Chronological neighbours for prev/next navigation. */
export function neighbours(id: string): { prev?: EquationMeta; next?: EquationMeta } {
  const idx = chronological.findIndex((e) => e.id === id);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? chronological[idx - 1] : undefined,
    next: idx < chronological.length - 1 ? chronological[idx + 1] : undefined,
  };
}

// One lazy loader per equation module. Vite emits each as its own chunk, so a
// given equation's full content is fetched only when its page is opened.
const loaders = import.meta.glob('./equations/*.ts') as Record<
  string,
  () => Promise<{ default: Equation }>
>;

/** Load a single equation's full content on demand. Resolves undefined if unknown. */
export async function loadEquation(id: string): Promise<Equation | undefined> {
  const loader = loaders[`./equations/${id}.ts`];
  if (!loader) return undefined;
  const mod = await loader();
  return mod.default;
}

/** The set of equation ids that have a loadable module (filenames under ./equations). */
export function loadableIds(): string[] {
  return Object.keys(loaders).map((p) => p.replace('./equations/', '').replace(/\.ts$/, ''));
}
