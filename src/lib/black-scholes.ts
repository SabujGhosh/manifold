/**
 * Pure Black–Scholes–Merton math for a European option on a non-dividend stock,
 * shared by the visualization and the unit tests.
 *
 *   d1 = [ln(S/K) + (r + σ²/2)T] / (σ√T),   d2 = d1 − σ√T
 *   Call = S·N(d1) − K·e^{−rT}·N(d2)
 *   Put  = K·e^{−rT}·N(−d2) − S·N(−d1)
 *
 * N is the standard-normal CDF. We use the Abramowitz & Stegun 7.1.26-style
 * polynomial approximation (|error| < 7.5e-8), which is the same approximation
 * the chart renders with, so tests verify the actual shipped numbers.
 */

/** Standard-normal PDF: φ(x) = e^{−x²/2}/√(2π). */
export const npdf = (x: number): number => 0.3989422804014327 * Math.exp((-x * x) / 2);

/** Standard-normal CDF N(x) via the A&S polynomial approximation. */
export const ncdf = (x: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp((-x * x) / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (x > 0) p = 1 - p;
  return p;
};

export interface Greeks {
  price: number;
  delta: number;
  gamma: number;
  vega: number;
  theta: number;
  d1: number;
  d2: number;
}

/** Price + Greeks for a European call (`call=true`) or put. */
export function blackScholes(
  S: number,
  K: number,
  sigma: number,
  r: number,
  T: number,
  call: boolean,
): Greeks {
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const price = call
    ? S * ncdf(d1) - K * Math.exp(-r * T) * ncdf(d2)
    : K * Math.exp(-r * T) * ncdf(-d2) - S * ncdf(-d1);
  const delta = call ? ncdf(d1) : ncdf(d1) - 1;
  const gamma = npdf(d1) / (S * sigma * Math.sqrt(T));
  const vega = (S * npdf(d1) * Math.sqrt(T)) / 100;
  const theta =
    ((-S * npdf(d1) * sigma) / (2 * Math.sqrt(T)) +
      (call ? -1 : 1) * r * K * Math.exp(-r * T) * ncdf(call ? d2 : -d2)) /
    365;
  return { price, delta, gamma, vega, theta, d1, d2 };
}
