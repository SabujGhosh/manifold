import { describe, it, expect } from 'vitest';
import { equations, toMeta, EQUATION_META_KEYS } from './corpus';
import { TOTAL_EQUATIONS } from '@/config';

/**
 * Structural integrity of the authored corpus. These overlap with the build-time
 * validator but run in CI as ordinary tests and add invariants the validator
 * does not (kebab-case ids, chronological coherence, symbol/connection hygiene).
 */
const ids = new Set(equations.map((e) => e.id));

describe('corpus shape', () => {
  it('declares the advertised number of equations', () => {
    expect(equations.length).toBe(TOTAL_EQUATIONS);
  });

  it('has unique, kebab-case ids', () => {
    expect(ids.size).toBe(equations.length);
    for (const e of equations) {
      expect(e.id, `${e.id} should be kebab-case`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});

describe('each equation', () => {
  for (const eq of equations) {
    describe(eq.id, () => {
      it('has exactly five levels, ordered 1..5 and populated', () => {
        expect(eq.levels).toHaveLength(5);
        eq.levels.forEach((lvl, i) => {
          expect(lvl.level).toBe(i + 1);
          expect(lvl.summary.trim().length).toBeGreaterThan(0);
          expect(lvl.body.trim().length).toBeGreaterThan(0);
          expect(lvl.equationForms.length).toBeGreaterThan(0);
          expect(lvl.keyIdeas.length).toBeGreaterThan(0);
        });
      });

      it('carries worked examples at L2 and L3 (the hard pedagogy rule)', () => {
        expect(eq.levels[1].workedExample, `${eq.id} L2`).toBeTruthy();
        expect(eq.levels[2].workedExample, `${eq.id} L3`).toBeTruthy();
      });

      it('has a screen-reader transcription and a one-liner', () => {
        expect(eq.canonicalAlt.trim().length).toBeGreaterThan(0);
        expect(eq.oneLine.trim().length).toBeGreaterThan(0);
        expect(eq.significance.trim().length).toBeGreaterThan(0);
      });

      it('defines well-formed symbols', () => {
        expect(eq.symbols.length).toBeGreaterThan(0);
        for (const s of eq.symbols) {
          expect(s.symbol.length).toBeGreaterThan(0);
          expect(s.name.length).toBeGreaterThan(0);
          expect(s.meaning.length).toBeGreaterThan(0);
        }
      });

      it('has ≥2 connections; none dangling, none self-referential', () => {
        expect(eq.connections.length).toBeGreaterThanOrEqual(2);
        for (const c of eq.connections) {
          expect(c.toId, `${eq.id} → ${c.toId}`).not.toBe(eq.id);
          expect(ids.has(c.toId), `${eq.id} → unknown "${c.toId}"`).toBe(true);
          expect(c.relationship.trim().length).toBeGreaterThan(0);
        }
      });

      it('cites sources with author, title, and year', () => {
        expect(eq.furtherReading.length).toBeGreaterThan(0);
        for (const c of [...eq.primarySources, ...eq.furtherReading]) {
          expect(c.authors, `${eq.id} citation`).toBeTruthy();
          expect(c.title, `${eq.id} citation`).toBeTruthy();
          expect(Number.isFinite(c.year)).toBe(true);
        }
      });

      it('has a sane era sortKey', () => {
        expect(Number.isFinite(eq.era.sortKey)).toBe(true);
        expect(eq.era.sortKey).toBeGreaterThan(-3000);
        expect(eq.era.sortKey).toBeLessThanOrEqual(new Date().getFullYear());
        expect(eq.era.display.trim().length).toBeGreaterThan(0);
      });
    });
  }
});

describe('metadata projection', () => {
  it('toMeta copies exactly the declared keys and nothing heavy', () => {
    const m = toMeta(equations[0]);
    expect(Object.keys(m).sort()).toEqual([...EQUATION_META_KEYS].sort());
    expect('levels' in m).toBe(false);
    expect('primarySources' in m).toBe(false);
  });
});
