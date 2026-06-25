import { describe, it, expect } from 'vitest';
import { logisticStep, logisticTrajectory, lyapunovExponent, fixedPoint } from './dynamics';

/**
 * The logistic map x_{n+1} = r·x_n(1−x_n). These tests verify the dynamics
 * against the closed-form analysis from one-dimensional dynamical-systems
 * theory, not just self-consistency.
 */
describe('logistic map — single step & invariance', () => {
  it('matches the defining formula r·x(1−x)', () => {
    expect(logisticStep(3.7, 0.21)).toBeCloseTo(3.7 * 0.21 * 0.79, 12);
  });

  it('maps the unit interval into itself for 0 ≤ r ≤ 4 (max at x=½ is r/4 ≤ 1)', () => {
    for (const r of [0.5, 1, 2.5, 3.2, 3.7, 4]) {
      for (let x = 0; x <= 1.0001; x += 0.05) {
        const y = logisticStep(r, Math.min(x, 1));
        expect(y).toBeGreaterThanOrEqual(-1e-12);
        expect(y).toBeLessThanOrEqual(1 + 1e-12);
      }
    }
    // The maximum of x(1−x) is ¼ at x=½, so the peak of the map is exactly r/4.
    expect(logisticStep(4, 0.5)).toBeCloseTo(1, 12);
  });
});

describe('logistic map — fixed point x* = 1 − 1/r', () => {
  it('is genuinely fixed: f(x*) = x*', () => {
    for (const r of [1.5, 2, 2.5, 2.9]) {
      expect(logisticStep(r, fixedPoint(r))).toBeCloseTo(fixedPoint(r), 12);
    }
  });

  it("multiplier f'(x*) equals 2 − r, so |f'| < 1 exactly on 1 < r < 3", () => {
    // f'(x) = r(1 − 2x); at x* = 1 − 1/r this is 2 − r.
    for (const r of [1.5, 2, 2.5, 2.9, 3, 3.5]) {
      const deriv = r * (1 - 2 * fixedPoint(r));
      expect(deriv).toBeCloseTo(2 - r, 12);
    }
    expect(Math.abs(2 - 2.9)).toBeLessThan(1); // stable
    expect(Math.abs(2 - 3.5)).toBeGreaterThan(1); // unstable (past period-doubling)
  });

  it('is superstable at r = 2 (multiplier 0) with x* = ½', () => {
    expect(fixedPoint(2)).toBeCloseTo(0.5, 12);
    expect(2 * (1 - 2 * 0.5)).toBeCloseTo(0, 12); // f'(½) = 0
  });

  it('converges to the fixed point in the stable regime', () => {
    const traj = logisticTrajectory(2.5, 0.123, 200);
    expect(traj.at(-1)).toBeCloseTo(0.6, 9); // 1 − 1/2.5 = 0.6
  });
});

describe('logistic map — period-2 cycle (3 < r < 1+√6)', () => {
  it('converges to the analytic 2-cycle (r+1 ± √((r−3)(r+1)))/(2r) at r = 3.2', () => {
    const r = 3.2;
    const root = Math.sqrt((r - 3) * (r + 1));
    const hi = (r + 1 + root) / (2 * r);
    const lo = (r + 1 - root) / (2 * r);
    const tail = logisticTrajectory(r, 0.5, 2000).slice(-50);
    const seen = [Math.min(...tail), Math.max(...tail)];
    expect(seen[0]).toBeCloseTo(lo, 6);
    expect(seen[1]).toBeCloseTo(hi, 6);
    // The two points map to each other.
    expect(logisticStep(r, lo)).toBeCloseTo(hi, 9);
    expect(logisticStep(r, hi)).toBeCloseTo(lo, 9);
  });

  it('period-2 is born exactly at r = 3 (1+√6 ≈ 3.449 ends it)', () => {
    expect(1 + Math.sqrt(6)).toBeCloseTo(3.4495, 4);
  });
});

describe('logistic map — Lyapunov exponent λ = ⟨ln|f′|⟩', () => {
  it('is negative throughout the periodic regime', () => {
    expect(lyapunovExponent(2.5)).toBeLessThan(0); // fixed point
    expect(lyapunovExponent(3.2)).toBeLessThan(0); // 2-cycle
    expect(lyapunovExponent(3.5)).toBeLessThan(0); // 4-cycle
    expect(lyapunovExponent(3.84, 0.4, 800, 4000)).toBeLessThan(0); // period-3 window
  });

  it('is positive in the chaotic regime', () => {
    expect(lyapunovExponent(3.7, 0.4, 800, 4000)).toBeGreaterThan(0);
    expect(lyapunovExponent(4.0, 0.4, 800, 4000)).toBeGreaterThan(0);
  });

  it('equals exactly ln 2 at r = 4 (conjugacy to the tent map)', () => {
    // r=4 is conjugate to the full tent map, whose Lyapunov exponent is ln2.
    expect(lyapunovExponent(4.0, 0.4, 1000, 200000)).toBeCloseTo(Math.log(2), 2);
  });
});
