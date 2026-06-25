import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { equations } from './corpus';

/**
 * Every LaTeX string the app can render must parse under KaTeX with
 * throwOnError, otherwise a reader hits a red error box. This sweeps the whole
 * corpus: canonical forms, alternative forms, each level's equationForms, and
 * every symbol glyph. It is the regression guard for the class of bug where a
 * stray brace or unescaped macro slips into authored content.
 */
function renders(tex: string): { ok: boolean; error?: string } {
  try {
    katex.renderToString(tex, { throwOnError: true, displayMode: true, strict: false });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

describe('KaTeX renders every LaTeX string in the corpus', () => {
  for (const eq of equations) {
    describe(eq.id, () => {
      it('canonicalLatex', () => {
        const r = renders(eq.canonicalLatex);
        expect(r.ok, `${eq.id} canonicalLatex: ${r.error}`).toBe(true);
      });

      it('alternativeForms', () => {
        for (const f of eq.alternativeForms ?? []) {
          const r = renders(f.latex);
          expect(r.ok, `${eq.id} altForm "${f.label}": ${r.error}`).toBe(true);
        }
      });

      it('per-level equationForms', () => {
        eq.levels.forEach((lvl) => {
          lvl.equationForms.forEach((f, i) => {
            const r = renders(f.latex);
            expect(r.ok, `${eq.id} L${lvl.level} form[${i}]: ${r.error}`).toBe(true);
          });
        });
      });

      it('symbol glyphs', () => {
        eq.symbols.forEach((s) => {
          const r = renders(s.symbol);
          expect(r.ok, `${eq.id} symbol "${s.name}" (${s.symbol}): ${r.error}`).toBe(true);
        });
      });
    });
  }
});
