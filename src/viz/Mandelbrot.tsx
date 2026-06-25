import { useEffect, useRef, useState, useCallback } from 'react';
import { Slider } from '@/components/ui/Slider';
import { clamp } from '@/lib/format';
import type { VizProps } from './registry';

function num(v: unknown, d: number) {
  return typeof v === 'number' ? v : d;
}

/**
 * Flagship zoomable Mandelbrot set. Escape-time rendering with smooth coloring,
 * drawn to a backing canvas. Click to zoom in (shift-click to zoom out).
 */
export default function Mandelbrot({ params }: VizProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [center, setCenter] = useState({
    x: num(params.centerX, -0.5),
    y: num(params.centerY, 0),
  });
  const [zoom, setZoom] = useState(num(params.zoom, 1));
  const [maxIter, setMaxIter] = useState(Math.round(num(params.maxIter, 12)));
  const [showReal, setShowReal] = useState(true);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const cssW = parent.clientWidth;
    const cssH = Math.round(cssW * 0.66);
    const scale = 1; // render at CSS resolution for speed
    canvas.width = cssW;
    canvas.height = cssH;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d')!;
    const img = ctx.createImageData(cssW, cssH);
    const data = img.data;

    const span = 3.0 / zoom; // width in complex units
    const aspect = cssH / cssW;
    const x0 = center.x - span / 2;
    const y0 = center.y - (span * aspect) / 2;
    const dx = span / cssW;
    const dy = (span * aspect) / cssH;

    for (let py = 0; py < cssH; py++) {
      const cy = y0 + py * dy;
      for (let px = 0; px < cssW; px++) {
        const cx = x0 + px * dx;
        let zx = 0;
        let zy = 0;
        let n = 0;
        let zx2 = 0;
        let zy2 = 0;
        while (zx2 + zy2 <= 256 && n < maxIter) {
          zy = 2 * zx * zy + cy;
          zx = zx2 - zy2 + cx;
          zx2 = zx * zx;
          zy2 = zy * zy;
          n++;
        }
        const idx = (py * cssW + px) * 4;
        if (n >= maxIter) {
          data[idx] = data[idx + 1] = data[idx + 2] = 12;
          data[idx + 3] = 255;
        } else {
          // smooth coloring
          const mu = n + 1 - Math.log(Math.log(Math.sqrt(zx2 + zy2))) / Math.log(2);
          const t = mu / maxIter;
          const r = Math.floor(255 * Math.sqrt(t));
          const g = Math.floor(180 * t);
          const b = Math.floor(120 + 135 * (1 - t));
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
        void scale;
      }
    }
    ctx.putImageData(img, 0, 0);

    // mark the real axis (logistic-map correspondence) if visible
    if (showReal && center.y - (span * aspect) / 2 < 0 && center.y + (span * aspect) / 2 > 0) {
      const py = ((0 - y0) / dy);
      ctx.strokeStyle = 'rgba(232,193,112,0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(cssW, py);
      ctx.stroke();
      ctx.fillStyle = 'rgba(232,193,112,0.9)';
      ctx.font = '11px ui-sans-serif, system-ui';
      ctx.fillText('real axis → logistic map', 8, py - 6);
    }
  }, [center, zoom, maxIter, showReal]);

  useEffect(() => {
    render();
    const ro = new ResizeObserver(render);
    if (canvasRef.current?.parentElement) ro.observe(canvasRef.current.parentElement);
    return () => ro.disconnect();
  }, [render]);

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const span = 3.0 / zoom;
    const aspect = rect.height / rect.width;
    const fx = (e.clientX - rect.left) / rect.width;
    const fy = (e.clientY - rect.top) / rect.height;
    const newX = center.x - span / 2 + fx * span;
    const newY = center.y - (span * aspect) / 2 + fy * span * aspect;
    setCenter({ x: newX, y: newY });
    setZoom((z) => clamp(e.shiftKey ? z / 2 : z * 2, 0.5, 1e12));
  };

  const reset = () => {
    setCenter({ x: -0.5, y: 0 });
    setZoom(1);
  };

  return (
    <div className="font-ui">
      <div className="mb-1 flex items-center justify-between text-xs text-ink-faint">
        <span>click to zoom in · shift-click to zoom out</span>
        <span className="font-mono">zoom ×{zoom < 1000 ? zoom.toFixed(1) : zoom.toExponential(1)}</span>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <canvas
          ref={canvasRef}
          onClick={onClick}
          className="block w-full cursor-crosshair"
          role="img"
          aria-label={`Mandelbrot set centered at (${center.x.toFixed(4)}, ${center.y.toFixed(4)}), zoom ${zoom.toFixed(1)}.`}
        />
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Slider label="Max iterations" value={maxIter} min={2} max={1000} step={1} onChange={(v) => setMaxIter(Math.round(v))} format={(v) => String(Math.round(v))} />
        <div className="flex items-end gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
            <input type="checkbox" checked={showReal} onChange={(e) => setShowReal(e.target.checked)} className="accent-accent" />
            Mark real axis
          </label>
          <button onClick={reset} className="rounded-md border border-border px-3 py-1.5 text-sm text-ink-muted hover:bg-surface-2">
            Reset view
          </button>
        </div>
      </div>
    </div>
  );
}
