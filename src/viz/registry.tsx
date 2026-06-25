import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Maps a VizSpec.component name to a lazily-loaded React component. Each viz
 * receives its `defaultParams` (from the equation's VizSpec) as `params`.
 * Heavy viz are code-split so the equation page stays lean until scrolled to.
 */
export interface VizProps {
  params: Record<string, number | string | boolean>;
}

export type VizComponent = ComponentType<VizProps>;

const registry: Record<string, LazyExoticComponent<VizComponent>> = {
  LogisticMap: lazy(() => import('./LogisticMap')),
  Mandelbrot: lazy(() => import('./Mandelbrot')),
  NormalDistribution: lazy(() => import('./NormalDistribution')),
  EulerPhasor: lazy(() => import('./EulerPhasor')),
  BayesCalculator: lazy(() => import('./BayesCalculator')),
  FourierBuilder: lazy(() => import('./FourierBuilder')),
  WaveString: lazy(() => import('./WaveString')),
  LotkaVolterra: lazy(() => import('./LotkaVolterra')),
  SecantTangent: lazy(() => import('./SecantTangent')),
  PythagorasTriangle: lazy(() => import('./PythagorasTriangle')),
  BlackScholes: lazy(() => import('./BlackScholes')),
  LogExp: lazy(() => import('./LogExp')),
  EntropyCoin: lazy(() => import('./EntropyCoin')),
  WavelengthMomentum: lazy(() => import('./WavelengthMomentum')),
  Photoelectric: lazy(() => import('./Photoelectric')),
  MassDefect: lazy(() => import('./MassDefect')),
  RunningCoupling: lazy(() => import('./RunningCoupling')),
  ParticleInBox: lazy(() => import('./ParticleInBox')),
  ForceMassAccel: lazy(() => import('./ForceMassAccel')),
  ChargeField: lazy(() => import('./ChargeField')),
  Brachistochrone: lazy(() => import('./Brachistochrone')),
  HeatDiffusion: lazy(() => import('./HeatDiffusion')),
  FlowField: lazy(() => import('./FlowField')),
  Soliton: lazy(() => import('./Soliton')),
  TwoBodyOrbit: lazy(() => import('./TwoBodyOrbit')),
  IdealGasBox: lazy(() => import('./IdealGasBox')),
  EntropyBox: lazy(() => import('./EntropyBox')),
  EMWave: lazy(() => import('./EMWave')),
  DistributionRelax: lazy(() => import('./DistributionRelax')),
  CurvedSpacetime: lazy(() => import('./CurvedSpacetime')),
  SpinAntimatter: lazy(() => import('./SpinAntimatter')),
  GaugeField: lazy(() => import('./GaugeField')),
  LaplaceSPlane: lazy(() => import('./LaplaceSPlane')),
};

export function getViz(name: string): LazyExoticComponent<VizComponent> | undefined {
  return registry[name];
}
