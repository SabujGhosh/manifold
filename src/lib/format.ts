import type { Field } from '@/content/types';

/** Map a Field to its CSS-variable accent name. */
const FIELD_VAR: Record<string, string> = {
  mathematics: 'mathematics',
  geometry: 'mathematics',
  analysis: 'mathematics',
  physics: 'physics',
  mechanics: 'physics',
  electromagnetism: 'physics',
  fluids: 'fluids',
  pde: 'physics',
  thermodynamics: 'thermodynamics',
  'statistical-mechanics': 'thermodynamics',
  quantum: 'quantum',
  relativity: 'relativity',
  qft: 'quantum',
  statistics: 'statistics',
  probability: 'statistics',
  'information-theory': 'information-theory',
  'nonlinear-dynamics': 'nonlinear-dynamics',
  finance: 'finance',
  'mathematical-biology': 'biology',
  chemistry: 'thermodynamics',
};

/** Returns an `rgb(var(--field-...))` string for a field, for inline styling. */
export function fieldColor(field: Field, alpha = 1): string {
  const name = FIELD_VAR[field] ?? 'mathematics';
  return alpha === 1
    ? `rgb(var(--field-${name}))`
    : `rgb(var(--field-${name}) / ${alpha})`;
}

/** Human label for a field slug. */
export function fieldLabel(field: Field): string {
  return field
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Era buckets used by the Browse filter and Timeline grouping. */
export function eraBucket(sortKey: number): string {
  if (sortKey < 500) return 'Antiquity';
  if (sortKey < 1700) return 'Enlightenment';
  if (sortKey < 1850) return '18th–early 19th c.';
  if (sortKey < 1900) return '19th century';
  return 'Modern (20th c.+)';
}

const LEVEL_NAMES = [
  'Curious Visitor',
  'High School',
  'Undergraduate',
  'Graduate / Practitioner',
  'Expert / Researcher',
];

export function levelName(level: number): string {
  return LEVEL_NAMES[level - 1] ?? `Level ${level}`;
}

export function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}
