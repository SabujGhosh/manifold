import { equations, byId } from './index';
import type { EquationMeta } from './types';

export interface GraphNode {
  id: string;
  name: string;
  field: string;
  sortKey: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
}

/**
 * Build a bidirectional relationship graph from each equation's `connections`.
 * Edges are de-duplicated by unordered {source,target} pair so that A→B and a
 * reciprocal B→A collapse into one edge (keeping the first relationship phrase).
 */
export function buildGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = equations.map((e) => ({
    id: e.id,
    name: e.name,
    field: e.fields[0],
    sortKey: e.era.sortKey,
  }));

  const seen = new Set<string>();
  const edges: GraphEdge[] = [];
  for (const e of equations) {
    for (const c of e.connections) {
      if (!byId.has(c.toId)) continue; // dangling refs are caught by the validator
      const key = [e.id, c.toId].sort().join('::');
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ source: e.id, target: c.toId, relationship: c.relationship });
    }
  }
  return { nodes, edges };
}

/** All connections incident to an equation (for the equation page chips). */
export function connectionsOf(
  eq: Pick<EquationMeta, 'id' | 'connections'>,
): { equation: EquationMeta; relationship: string }[] {
  const out: { equation: EquationMeta; relationship: string }[] = [];
  const seen = new Set<string>();

  for (const c of eq.connections) {
    const target = byId.get(c.toId);
    if (target && !seen.has(target.id)) {
      seen.add(target.id);
      out.push({ equation: target, relationship: c.relationship });
    }
  }
  // Inbound connections from other equations.
  for (const other of equations) {
    if (other.id === eq.id) continue;
    for (const c of other.connections) {
      if (c.toId === eq.id && !seen.has(other.id)) {
        seen.add(other.id);
        out.push({ equation: other, relationship: c.relationship });
      }
    }
  }
  return out;
}
