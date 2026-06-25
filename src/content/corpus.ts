/**
 * The eager full corpus. Every equation module is imported here.
 *
 * IMPORTANT: this module pulls the entire content payload (all level prose,
 * citations, history) into one bundle. It must therefore be imported ONLY by
 * build-time tooling — the metadata generator (`scripts/generate-meta.ts`), the
 * content validator (`scripts/validate-content.ts`), and the test suite. At
 * runtime the app uses the lightweight `./index` API plus per-equation lazy
 * loading, so this file never reaches the browser bundle. Do not import it from
 * anything under `src/components`, `src/routes`, or `src/viz`.
 */
import type { Equation, EquationMeta } from './types';
import pythagoras from './equations/pythagoras';
import logarithms from './equations/logarithms';
import derivative from './equations/derivative';
import eulerIdentity from './equations/euler-identity';
import fourier from './equations/fourier';
import gravitation from './equations/gravitation';
import newtonSecond from './equations/newton-second';
import waveEquation from './equations/wave-equation';
import idealGas from './equations/ideal-gas';
import coulomb from './equations/coulomb';
import eulerLagrange from './equations/euler-lagrange';
import maxwell from './equations/maxwell';
import boltzmannEntropy from './equations/boltzmann-entropy';
import boltzmannTransport from './equations/boltzmann-transport';
import heatEquation from './equations/heat-equation';
import navierStokes from './equations/navier-stokes';
import normalDistribution from './equations/normal-distribution';
import bayes from './equations/bayes';
import shannonEntropy from './equations/shannon-entropy';
import massEnergy from './equations/mass-energy';
import einsteinField from './equations/einstein-field';
import planckEinstein from './equations/planck-einstein';
import deBroglie from './equations/de-broglie';
import schrodinger from './equations/schrodinger';
import dirac from './equations/dirac';
import yangMills from './equations/yang-mills';
import renormalizationGroup from './equations/renormalization-group';
import laplaceTransform from './equations/laplace-transform';
import mandelbrot from './equations/mandelbrot';
import blackScholes from './equations/black-scholes';
import kdv from './equations/kdv';
import lotkaVolterra from './equations/lotka-volterra';
import logisticMap from './equations/logistic-map';

/**
 * The ordered corpus. Each equation lives in its own module under
 * ./equations/<id>.ts. Register new equations here; the validator enforces
 * completeness and the metadata generator derives the runtime index.
 */
export const equations: Equation[] = [
  pythagoras,
  logarithms,
  derivative,
  eulerIdentity,
  fourier,
  gravitation,
  newtonSecond,
  waveEquation,
  idealGas,
  coulomb,
  eulerLagrange,
  maxwell,
  boltzmannEntropy,
  boltzmannTransport,
  heatEquation,
  navierStokes,
  normalDistribution,
  bayes,
  shannonEntropy,
  massEnergy,
  einsteinField,
  planckEinstein,
  deBroglie,
  schrodinger,
  dirac,
  yangMills,
  renormalizationGroup,
  laplaceTransform,
  mandelbrot,
  blackScholes,
  kdv,
  lotkaVolterra,
  logisticMap,
];

/** Keys projected into the lightweight runtime metadata. Single source of truth. */
export const EQUATION_META_KEYS = [
  'id',
  'name',
  'nickname',
  'canonicalLatex',
  'canonicalAlt',
  'fields',
  'era',
  'oneLine',
  'significance',
  'symbols',
  'connections',
] as const satisfies readonly (keyof EquationMeta)[];

/** Project a full Equation down to its lightweight metadata. */
export function toMeta(eq: Equation): EquationMeta {
  const out = {} as Record<string, unknown>;
  for (const k of EQUATION_META_KEYS) out[k] = eq[k];
  return out as unknown as EquationMeta;
}
