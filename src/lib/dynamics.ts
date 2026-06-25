/** Pure math for the logistic map, shared by the viz and unit tests. */

export const logisticStep = (r: number, x: number): number => r * x * (1 - x);

/** Iterate the map, returning the trajectory including x0 (length n+1). */
export function logisticTrajectory(r: number, x0: number, n: number): number[] {
  const out = new Array<number>(n + 1);
  out[0] = x0;
  let x = x0;
  for (let i = 1; i <= n; i++) {
    x = logisticStep(r, x);
    out[i] = x;
  }
  return out;
}

/**
 * Lyapunov exponent λ = lim (1/N) Σ ln|f'(x_n)|, with f'(x) = r(1 - 2x).
 * A transient is discarded first. Positive λ ⇒ chaos.
 */
export function lyapunovExponent(r: number, x0 = 0.5, transient = 300, n = 1000): number {
  let x = x0;
  for (let i = 0; i < transient; i++) x = logisticStep(r, x);
  let sum = 0;
  let count = 0;
  for (let i = 0; i < n; i++) {
    const deriv = Math.abs(r * (1 - 2 * x));
    if (deriv > 0) {
      sum += Math.log(deriv);
      count++;
    }
    x = logisticStep(r, x);
  }
  return count ? sum / count : 0;
}

/** The non-zero fixed point x* = 1 - 1/r (valid/attracting for 1 < r < 3). */
export const fixedPoint = (r: number): number => 1 - 1 / r;
