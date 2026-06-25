import { useState } from 'react';
import { useCanvas, cssVar } from './shared/useCanvas';
import { Slider } from '@/components/ui/Slider';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

export default function PythagorasTriangle({ params }: VizProps) {
  const [a, setA] = useState(num(params.a, 3));
  const [b, setB] = useState(num(params.b, 4));
  const c = Math.sqrt(a * a + b * b);

  const ref = useCanvas(
    (ctx, w, h) => {
      type Pt = { x: number; y: number };
      // Lay the figure out in math coordinates (y up) with the right angle at the
      // origin, then scale to fit. Including the outward squares, the figure spans
      // x ∈ [−a, a+b] and y ∈ [−b, a+b]; fitting that box keeps every square on
      // screen for any a, b.
      const margin = 20;
      const bboxW = 2 * a + b;
      const bboxH = a + 2 * b;
      const unit = Math.min((w - 2 * margin) / bboxW, (h - 2 * margin) / bboxH);
      const Ax = (w - bboxW * unit) / 2 + a * unit; // canvas x of math origin
      const Ay = (h - bboxH * unit) / 2 + (a + b) * unit; // canvas y of math origin
      const P = (mx: number, my: number): Pt => ({ x: Ax + mx * unit, y: Ay - my * unit });

      const A = P(0, 0); // right-angle vertex
      const B = P(b, 0); // along +x
      const C = P(0, a); // along +y (up)

      // A square sitting flush against edge p1→p2, on the side away from `interior`
      // (the triangle's opposite vertex). The normal length equals the edge length,
      // so the quad is a true square adjacent to the side.
      const fillSq = (
        p1: Pt,
        p2: Pt,
        interior: Pt,
        color: string,
        label: string,
        area: number,
      ) => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        let nx = -dy;
        let ny = dx;
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        if (nx * (interior.x - mx) + ny * (interior.y - my) > 0) {
          nx = -nx; // flip so the square grows outward, not over the triangle
          ny = -ny;
        }
        const p3 = { x: p2.x + nx, y: p2.y + ny };
        const p4 = { x: p1.x + nx, y: p1.y + ny };
        ctx.fillStyle = color;
        ctx.strokeStyle = cssVar('--ink-faint', 0.7);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = cssVar('--ink');
        ctx.font = '600 13px ui-sans-serif, system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${label}=${area.toFixed(1)}`, (p1.x + p2.x + p3.x + p4.x) / 4, (p1.y + p2.y + p3.y + p4.y) / 4);
      };

      // Squares flush to each side, opposite the remaining vertex.
      fillSq(C, A, B, cssVar('--field-mathematics', 0.3), 'a²', a * a); // left leg
      fillSq(A, B, C, cssVar('--field-physics', 0.3), 'b²', b * b); // bottom leg
      fillSq(B, C, A, cssVar('--accent', 0.3), 'c²', c * c); // hypotenuse

      // Triangle on top of the squares.
      ctx.fillStyle = cssVar('--surface-2');
      ctx.strokeStyle = cssVar('--ink');
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right-angle marker at A.
      const m = Math.min(12, 0.18 * Math.min(a, b) * unit);
      ctx.strokeStyle = cssVar('--ink-muted');
      ctx.lineWidth = 1.5;
      ctx.strokeRect(A.x, A.y - m, m, m);

      ctx.textAlign = 'start';
      ctx.textBaseline = 'alphabetic';
    },
    [a, b],
    0.9,
  );

  return (
    <div className="font-ui">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <canvas ref={ref} className="block w-full" role="img" aria-label={`Right triangle with legs ${a} and ${b}; squares of area ${(a*a).toFixed(1)} and ${(b*b).toFixed(1)} sum to the hypotenuse square ${(c*c).toFixed(1)}.`} />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        <span className="font-mono text-ink">{(a * a).toFixed(1)} + {(b * b).toFixed(1)} = {(c * c).toFixed(1)}</span>{' '}
        → c = {c.toFixed(3)}
      </p>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Leg a" value={a} min={1} max={6} step={0.1} onChange={setA} format={(v) => v.toFixed(1)} />
        <Slider label="Leg b" value={b} min={1} max={6} step={0.1} onChange={setB} format={(v) => v.toFixed(1)} />
      </div>
    </div>
  );
}
