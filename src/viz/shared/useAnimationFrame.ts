import { useEffect, useRef, useState } from 'react';

/** Returns whether the user prefers reduced motion (reactive). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Drives `cb(t)` with the elapsed seconds while `playing`. When the user prefers
 * reduced motion the loop does not auto-run; callers should expose a manual
 * step/play control and render a static frame.
 */
export function useAnimationFrame(cb: (t: number) => void, playing: boolean) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      cbRef.current((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);
}
