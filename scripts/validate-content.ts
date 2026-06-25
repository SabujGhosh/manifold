/**
 * Build-time content validation. Throws (non-zero exit) if any equation is
 * missing required structure: five ordered levels, symbols, applications,
 * worked examples at L2/L3, ≥2 valid connections, and citations.
 *
 * Run via `pnpm validate` (also wired into `prebuild`).
 */
import { equations } from '../src/content/corpus';
import type { Equation, Level } from '../src/content/types';

/** Set of all authored ids, for connection-target validation. */
const allIds = new Set(equations.map((e) => e.id));

const errors: string[] = [];
const warnings: string[] = [];

function err(id: string, msg: string) {
  errors.push(`[${id}] ${msg}`);
}
function warn(id: string, msg: string) {
  warnings.push(`[${id}] ${msg}`);
}

function check(eq: Equation) {
  const { id } = eq;

  if (!eq.name) err(id, 'missing name');
  if (!eq.canonicalLatex) err(id, 'missing canonicalLatex');
  if (!eq.canonicalAlt) err(id, 'missing canonicalAlt (screen-reader transcription)');
  if (!eq.oneLine) err(id, 'missing oneLine');
  if (!eq.significance) err(id, 'missing significance');
  if (!eq.fields?.length) err(id, 'missing fields');
  if (!eq.discoverers?.length) err(id, 'missing discoverers');
  if (!eq.applications?.length) err(id, 'missing applications');

  // Levels: exactly 5, ordered 1..5, each populated.
  if (!Array.isArray(eq.levels) || eq.levels.length !== 5) {
    err(id, `expected exactly 5 levels, got ${eq.levels?.length ?? 0}`);
  } else {
    eq.levels.forEach((lvl, i) => {
      const expected = (i + 1) as Level;
      if (lvl.level !== expected) err(id, `level[${i}] has level=${lvl.level}, expected ${expected}`);
      if (!lvl.summary?.trim()) err(id, `L${expected} missing summary`);
      if (!lvl.body?.trim()) err(id, `L${expected} missing body`);
      if (!lvl.equationForms?.length) err(id, `L${expected} has no equationForms`);
      if (!lvl.keyIdeas?.length) err(id, `L${expected} has no keyIdeas`);
    });

    // Worked examples required at L2 and L3 (Section 1 hard rule).
    if (!eq.levels[1]?.workedExample) err(id, 'L2 missing required workedExample');
    if (!eq.levels[2]?.workedExample) err(id, 'L3 missing required workedExample');
  }

  // Symbols: at least one, each well-formed.
  if (!eq.symbols?.length) {
    err(id, 'no symbols defined');
  } else {
    eq.symbols.forEach((s, i) => {
      if (!s.symbol) err(id, `symbol[${i}] missing LaTeX symbol`);
      if (!s.name) err(id, `symbol[${i}] missing name`);
      if (!s.meaning) err(id, `symbol[${i}] missing meaning`);
    });
  }

  // Connections: ≥2, each pointing at a real equation.
  if (!eq.connections?.length || eq.connections.length < 2) {
    err(id, `expected ≥2 connections, got ${eq.connections?.length ?? 0}`);
  }
  eq.connections?.forEach((c) => {
    if (c.toId === id) err(id, `connection points at itself`);
    else if (!allIds.has(c.toId)) {
      // Until all 32 are authored, dangling refs are warnings, not hard errors.
      warn(id, `connection -> "${c.toId}" not found yet (author it or fix the id)`);
    }
    if (!c.relationship?.trim()) err(id, `connection -> "${c.toId}" missing relationship phrase`);
  });

  // Citations.
  if (!eq.furtherReading?.length) err(id, 'no furtherReading citations');
  if (!eq.primarySources?.length) {
    warn(id, 'no primarySources (acceptable only if no primary source exists)');
  }
  [...(eq.primarySources ?? []), ...(eq.furtherReading ?? [])].forEach((c, i) => {
    if (!c.authors || !c.title || !c.year) {
      err(id, `citation[${i}] ("${c.title ?? '?'}") missing authors/title/year`);
    }
  });
}

const ids = new Set<string>();
for (const eq of equations) {
  if (ids.has(eq.id)) err(eq.id, 'duplicate id');
  ids.add(eq.id);
  check(eq);
}

console.log(`Validated ${equations.length} equation(s).`);
if (warnings.length) {
  console.warn(`\n⚠︎  ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.warn('   - ' + w));
}
if (errors.length) {
  console.error(`\n✗  ${errors.length} error(s):`);
  errors.forEach((e) => console.error('   - ' + e));
  process.exit(1);
}
console.log('✓  Content valid.');
