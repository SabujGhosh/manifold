import { describe, it, expect } from 'vitest';
import { blackScholes, ncdf, npdf } from './black-scholes';

/**
 * Black–Scholes–Merton. Verified against textbook closed forms and the
 * arbitrage identities the model must satisfy, treating the polynomial N(·)
 * approximation as the source of truth for the shipped numbers.
 */
describe('standard-normal helpers', () => {
  it('φ(0) = 1/√(2π) and φ is even', () => {
    expect(npdf(0)).toBeCloseTo(0.3989422804, 9);
    expect(npdf(-1.3)).toBeCloseTo(npdf(1.3), 12);
  });

  it('N(0) = ½ and N(x) + N(−x) = 1 identically', () => {
    expect(ncdf(0)).toBeCloseTo(0.5, 3);
    for (const x of [-2.5, -1, -0.3, 0.7, 1.96, 3]) {
      expect(ncdf(x) + ncdf(-x)).toBeCloseTo(1, 9);
    }
  });

  it('hits the classic quantiles N(1.96) ≈ 0.975, N(2.576) ≈ 0.995', () => {
    expect(ncdf(1.96)).toBeCloseTo(0.975, 3);
    expect(ncdf(2.5758)).toBeCloseTo(0.995, 3);
  });

  it('is monotonically increasing', () => {
    let prev = -Infinity;
    for (let x = -4; x <= 4; x += 0.1) {
      const v = ncdf(x);
      expect(v).toBeGreaterThan(prev);
      prev = v;
    }
  });
});

describe('Black–Scholes pricing', () => {
  it("reproduces Hull's worked example (S=42, K=40, r=0.10, σ=0.20, T=0.5)", () => {
    const call = blackScholes(42, 40, 0.2, 0.1, 0.5, true);
    const put = blackScholes(42, 40, 0.2, 0.1, 0.5, false);
    expect(call.d1).toBeCloseTo(0.7693, 3);
    expect(call.d2).toBeCloseTo(0.6278, 3);
    expect(call.price).toBeCloseTo(4.76, 2);
    expect(put.price).toBeCloseTo(0.81, 2);
  });

  it('obeys put–call parity  C − P = S − K·e^{−rT}  for arbitrary inputs', () => {
    const cases = [
      [100, 100, 0.2, 0.05, 1],
      [80, 120, 0.4, 0.03, 2],
      [150, 90, 0.15, 0.08, 0.25],
    ];
    for (const [S, K, sig, r, T] of cases) {
      const c = blackScholes(S, K, sig, r, T, true).price;
      const p = blackScholes(S, K, sig, r, T, false).price;
      expect(c - p).toBeCloseTo(S - K * Math.exp(-r * T), 9);
    }
  });

  it('respects no-arbitrage bounds: max(S−Ke^{−rT},0) ≤ C ≤ S', () => {
    for (const sig of [0.05, 0.2, 0.6]) {
      const c = blackScholes(100, 95, sig, 0.05, 1, true).price;
      const lower = Math.max(100 - 95 * Math.exp(-0.05), 0);
      expect(c).toBeGreaterThanOrEqual(lower - 1e-6);
      expect(c).toBeLessThanOrEqual(100 + 1e-6);
    }
  });

  it('deep in-the-money call ≈ forward intrinsic; deep out-of-the-money ≈ 0', () => {
    const itm = blackScholes(1000, 50, 0.2, 0.05, 1, true);
    expect(itm.price).toBeCloseTo(1000 - 50 * Math.exp(-0.05), 1);
    const otm = blackScholes(10, 500, 0.2, 0.05, 1, true);
    expect(otm.price).toBeLessThan(1e-3);
  });

  it('price increases monotonically with volatility (vega > 0)', () => {
    let prev = -Infinity;
    for (const sig of [0.05, 0.1, 0.2, 0.4, 0.8]) {
      const c = blackScholes(100, 100, sig, 0.05, 1, true).price;
      expect(c).toBeGreaterThan(prev);
      prev = c;
    }
  });
});

describe('Black–Scholes Greeks', () => {
  it('call Δ ∈ (0,1), put Δ ∈ (−1,0), and Δ_call − Δ_put = 1', () => {
    const c = blackScholes(100, 100, 0.2, 0.05, 1, true);
    const p = blackScholes(100, 100, 0.2, 0.05, 1, false);
    expect(c.delta).toBeGreaterThan(0);
    expect(c.delta).toBeLessThan(1);
    expect(p.delta).toBeGreaterThan(-1);
    expect(p.delta).toBeLessThan(0);
    expect(c.delta - p.delta).toBeCloseTo(1, 9);
  });

  it('Γ and vega are identical for the call and the put (parity is linear in S)', () => {
    const c = blackScholes(100, 110, 0.25, 0.04, 1.5, true);
    const p = blackScholes(100, 110, 0.25, 0.04, 1.5, false);
    expect(c.gamma).toBeCloseTo(p.gamma, 12);
    expect(c.vega).toBeCloseTo(p.vega, 12);
    expect(c.gamma).toBeGreaterThan(0);
    expect(c.vega).toBeGreaterThan(0);
  });

  it('Δ_call recovered by finite difference ∂C/∂S', () => {
    const h = 1e-4;
    const up = blackScholes(100 + h, 100, 0.2, 0.05, 1, true).price;
    const dn = blackScholes(100 - h, 100, 0.2, 0.05, 1, true).price;
    const c = blackScholes(100, 100, 0.2, 0.05, 1, true);
    expect((up - dn) / (2 * h)).toBeCloseTo(c.delta, 4);
  });

  it('Γ recovered by finite difference ∂²C/∂S²', () => {
    const h = 1e-2;
    const up = blackScholes(100 + h, 100, 0.2, 0.05, 1, true).price;
    const mid = blackScholes(100, 100, 0.2, 0.05, 1, true).price;
    const dn = blackScholes(100 - h, 100, 0.2, 0.05, 1, true).price;
    const c = blackScholes(100, 100, 0.2, 0.05, 1, true);
    expect((up - 2 * mid + dn) / (h * h)).toBeCloseTo(c.gamma, 4);
  });
});
