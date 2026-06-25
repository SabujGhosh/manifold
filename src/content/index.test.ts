import { describe, it, expect } from 'vitest';
import {
  equations as metaList,
  byId,
  chronological,
  neighbours,
  loadEquation,
  loadableIds,
} from './index';
import { equations as fullCorpus, toMeta } from './corpus';

/**
 * Runtime content API + the per-equation code-splitting contract. The point of
 * the split is that the metadata index and the lazily-loaded full modules stay
 * perfectly in agreement; these tests fail loudly if they drift.
 */
describe('metadata index ↔ full corpus agreement', () => {
  it('exposes the same set of equations as the corpus', () => {
    expect(metaList.length).toBe(fullCorpus.length);
    expect(new Set(metaList.map((m) => m.id))).toEqual(new Set(fullCorpus.map((e) => e.id)));
  });

  it('generated metadata is byte-for-byte the projection of the corpus (not stale)', () => {
    for (const eq of fullCorpus) {
      const m = byId.get(eq.id);
      expect(m, `missing meta for ${eq.id} — run pnpm gen:meta`).toBeDefined();
      expect(m).toEqual(toMeta(eq));
    }
  });
});

describe('chronological ordering', () => {
  it('is sorted ascending by era.sortKey', () => {
    for (let i = 1; i < chronological.length; i++) {
      expect(chronological[i].era.sortKey).toBeGreaterThanOrEqual(chronological[i - 1].era.sortKey);
    }
  });

  it('neighbours are consistent with the chronological order', () => {
    expect(neighbours(chronological[0].id).prev).toBeUndefined();
    expect(neighbours(chronological.at(-1)!.id).next).toBeUndefined();
    const mid = Math.floor(chronological.length / 2);
    const { prev, next } = neighbours(chronological[mid].id);
    expect(prev?.id).toBe(chronological[mid - 1].id);
    expect(next?.id).toBe(chronological[mid + 1].id);
  });

  it('returns empty neighbours for an unknown id', () => {
    expect(neighbours('does-not-exist')).toEqual({});
  });
});

describe('lazy per-equation loading', () => {
  it('every metadata id has a matching loadable module file', () => {
    const loadable = new Set(loadableIds());
    for (const m of metaList) {
      expect(loadable.has(m.id), `no ./equations/${m.id}.ts chunk`).toBe(true);
    }
  });

  it('loadEquation resolves the full equation whose id matches the request', async () => {
    // Sample across the corpus rather than all 33 to keep the suite quick.
    for (const id of ['pythagoras', 'schrodinger', 'black-scholes', 'navier-stokes', 'logistic-map']) {
      const eq = await loadEquation(id);
      expect(eq, id).toBeDefined();
      expect(eq!.id).toBe(id);
      expect(eq!.levels).toHaveLength(5);
    }
  });

  it('resolves undefined for an unknown id instead of throwing', async () => {
    await expect(loadEquation('not-a-real-equation')).resolves.toBeUndefined();
  });

  it('a loaded equation projects back to its published metadata', async () => {
    const eq = await loadEquation('euler-identity');
    expect(toMeta(eq!)).toEqual(byId.get('euler-identity'));
  });
});
