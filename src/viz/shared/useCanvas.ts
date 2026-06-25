import { useEffect, useRef } from 'react';

/**
 * Sets up a HiDPI-correct 2D canvas that resizes to its container's width and a
 * given aspect ratio, and re-invokes `draw` whenever dependencies change or the
 * element resizes. The draw callback receives a context whose units are CSS
 * pixels (the devicePixelRatio scale is applied for you).
 */
export function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
  deps: unknown[],
  aspect = 0.6,
) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const render = () => {
      const cssW = parent.clientWidth;
      const cssH = Math.round(cssW * aspect);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      draw(ctx, cssW, cssH);
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(parent);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** Read a CSS custom property (theme token) as an `rgb(...)` string. */
export function cssVar(name: string, alpha = 1): string {
  if (typeof window === 'undefined') return '#000';
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!v) return '#000';
  return alpha === 1 ? `rgb(${v})` : `rgb(${v} / ${alpha})`;
}
