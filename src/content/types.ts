export type Level = 1 | 2 | 3 | 4 | 5;

export type Field =
  | 'mathematics'
  | 'geometry'
  | 'analysis'
  | 'physics'
  | 'mechanics'
  | 'electromagnetism'
  | 'thermodynamics'
  | 'statistical-mechanics'
  | 'quantum'
  | 'relativity'
  | 'qft'
  | 'fluids'
  | 'pde'
  | 'statistics'
  | 'probability'
  | 'information-theory'
  | 'nonlinear-dynamics'
  | 'finance'
  | 'mathematical-biology'
  | 'chemistry';

export interface Citation {
  authors: string;
  title: string;
  venue?: string; // journal / publisher
  year: number;
  url?: string; // prefer DOI or stable link
  note?: string; // e.g. "the original 1976 Nature paper"
  primary?: boolean; // true = primary historical source
}

export interface SymbolDef {
  symbol: string; // LaTeX, e.g. "\\sigma"
  name: string; // "standard deviation"
  meaning: string; // one sentence
  units?: string; // SI where applicable, e.g. "kg·m/s²" or "dimensionless"
}

export interface WorkedExample {
  prompt: string; // markdown + $...$
  solution: string; // markdown + $...$, show steps
}

export interface LevelContent {
  level: Level;
  audience: string; // "Curious visitor", etc.
  summary: string; // 1–2 sentence hook for this level
  body: string; // markdown; inline math $...$, display math $$...$$
  equationForms: { latex: string; caption?: string }[]; // notation for THIS level
  keyIdeas: string[]; // 2–5 bullet takeaways
  workedExample?: WorkedExample;
  misconceptions?: { claim: string; correction: string }[];
  glossedOver?: string; // optional "what we simplified" note + which level resolves it
}

export interface Connection {
  toId: string; // another equation's id
  relationship: string; // "is a special case of", "generalizes", ...
}

export interface VizSpec {
  component: string; // React component name registered in the viz registry
  kind: 'interactive' | 'concept';
  defaultParams: Record<string, number | string | boolean>;
  caption: string;
  whatToTry: string[]; // guided prompts
}

/**
 * The lightweight projection of an Equation used by listing/search/graph views
 * (Browse, Timeline, Connections, Glossary, command palette). It deliberately
 * omits the heavy per-level prose (`levels`), citations, history, and viz so the
 * full corpus metadata is a small chunk; the heavy fields load per-equation on
 * demand via `loadEquation(id)`. Keep this in sync with `EQUATION_META_KEYS`.
 */
export type EquationMeta = Pick<
  Equation,
  | 'id'
  | 'name'
  | 'nickname'
  | 'canonicalLatex'
  | 'canonicalAlt'
  | 'fields'
  | 'era'
  | 'oneLine'
  | 'significance'
  | 'symbols'
  | 'connections'
>;

export interface Equation {
  id: string;
  name: string;
  nickname?: string; // sourced/qualified
  canonicalLatex: string;
  /** Plain-language transcription of the canonical form for screen readers. */
  canonicalAlt: string;
  alternativeForms?: { latex: string; label: string }[];
  fields: Field[];
  era: { display: string; sortKey: number }; // sortKey = year (negative = BCE)
  discoverers: { name: string; note?: string }[];
  oneLine: string; // elevator pitch (used in cards/search)
  significance: string; // why it's on the list (2–4 sentences)
  applications: string[]; // concrete real-world uses
  symbols: SymbolDef[]; // EVERY symbol in canonical + alt forms
  levels: [LevelContent, LevelContent, LevelContent, LevelContent, LevelContent];
  connections: Connection[]; // ≥2 where sensible
  viz?: VizSpec;
  primarySources: Citation[]; // ≥1 primary where it exists
  furtherReading: Citation[]; // accessible follow-ups
  historyNote?: string; // discovery story, disputes, anecdotes
}
