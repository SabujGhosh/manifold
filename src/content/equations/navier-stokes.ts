import type { Equation } from '../types';

const navierStokes: Equation = {
  id: 'navier-stokes',
  name: 'Navier–Stokes Equations',
  nickname: 'the unsolved equations of flow',
  canonicalLatex:
    '\\rho\\!\\left(\\partial_t\\vec v+\\vec v\\!\\cdot\\!\\nabla\\vec v\\right)=-\\nabla p+\\mu\\nabla^2\\vec v+\\vec f',
  canonicalAlt:
    'rho times the quantity partial-t v plus v dot grad v, equals minus grad p plus mu times the Laplacian of v plus the body force f',
  alternativeForms: [
    { latex: '\\nabla\\cdot\\vec v = 0', label: 'incompressibility (mass conservation)' },
    { latex: '\\partial_t\\vec v + \\vec v\\cdot\\nabla\\vec v = -\\tfrac{1}{\\rho}\\nabla p + \\nu\\nabla^2\\vec v', label: 'kinematic form (ν = μ/ρ)' },
    { latex: '\\partial_t\\vec\\omega + \\vec v\\cdot\\nabla\\vec\\omega = \\vec\\omega\\cdot\\nabla\\vec v + \\nu\\nabla^2\\vec\\omega', label: 'vorticity form' },
  ],
  fields: ['fluids', 'physics'],
  era: { display: '1845', sortKey: 1845 },
  discoverers: [
    { name: 'Claude-Louis Navier', note: 'derived the equations, 1822' },
    { name: 'George Gabriel Stokes', note: 'rigorous viscous-stress formulation, 1845' },
  ],
  oneLine: 'Newton’s second law written for every drop of a fluid — exact, ubiquitous, and famously not fully understood.',
  significance:
    'The Navier–Stokes equations are Newton’s second law applied to a continuous fluid, governing essentially all flow: weather and climate, blood and oceans, aircraft and pipelines. They are extraordinarily successful in practice yet mathematically formidable: whether smooth 3-D solutions always exist (no finite-time blow-up) is a Clay Millennium Prize problem. They are also the home of turbulence, called the most important unsolved problem of classical physics.',
  applications: [
    'Aerodynamics (aircraft, cars) and ship/hull design',
    'Weather forecasting, ocean and climate modeling',
    'Blood flow, microfluidics, and biomedical engineering',
    'Pipeline transport, HVAC, combustion, and turbomachinery',
  ],
  symbols: [
    { symbol: '\\vec v', name: 'velocity field', meaning: 'fluid velocity at each point and time', units: 'm/s' },
    { symbol: '\\rho', name: 'density', meaning: 'mass per unit volume of the fluid', units: 'kg/m³' },
    { symbol: 'p', name: 'pressure', meaning: 'isotropic internal pressure', units: 'Pa' },
    { symbol: '\\mu', name: 'dynamic viscosity', meaning: 'resistance to shearing/internal friction', units: 'Pa·s' },
    { symbol: '\\nu', name: 'kinematic viscosity', meaning: 'μ/ρ', units: 'm²/s' },
    { symbol: '\\vec f', name: 'body force', meaning: 'force per unit volume (gravity, etc.)', units: 'N/m³' },
    { symbol: '\\vec\\omega', name: 'vorticity', meaning: 'local spin of the fluid, ∇×v', units: '1/s' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'The rulebook for everything that flows — air, water, blood, smoke. We use it constantly, yet still can’t fully tame its wildest behaviour: turbulence.',
      equationForms: [{ latex: '\\text{mass} \\times \\text{acceleration} = \\text{pressure} + \\text{friction} + \\text{gravity}', caption: 'Newton’s law, for every speck of fluid' }],
      body: `Watch smoke rise from a candle. At first it climbs in a smooth, glassy ribbon. Then, suddenly, it breaks into chaotic, churning swirls. That transition — from smooth flow to **turbulence** — is one of the great unsolved puzzles of physics, and the Navier–Stokes equations are where it lives.

The equations themselves are just **Newton's "force = mass × acceleration," written for fluids**. Each tiny parcel of air or water accelerates because of the pressure pushing it, the friction (viscosity) from neighbouring fluid dragging on it, and gravity. Track every parcel and you can, in principle, predict the entire flow.

We rely on these equations every day — they forecast your weather, shape every airplane wing, and model blood in your arteries. And yet, astonishingly, no one has proven that their solutions always stay well-behaved. There's a **\$1 million prize** for settling it.`,
      keyIdeas: [
        'Navier–Stokes is Newton’s law for fluids.',
        'They govern weather, flight, blood, and oceans.',
        'Turbulence and a basic math question about them remain unsolved.',
      ],
      glossedOver: 'We lump everything into "friction." Viscosity is a specific internal-friction term, and the swirling "inertia" term is what makes it hard — Level 2/3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Each fluid parcel obeys $\\rho\\,a = $ (pressure push) + (viscous friction) + (gravity), plus the rule that fluid isn’t created or destroyed.',
      equationForms: [
        { latex: '\\rho\\,\\vec a = -\\nabla p + \\mu\\nabla^2\\vec v + \\vec f' },
        { latex: '\\nabla\\cdot\\vec v = 0', caption: 'incompressible: what flows in flows out' },
      ],
      body: `Apply $F = ma$ to a small blob of fluid of density $\\rho$. Its acceleration is driven by three forces (per volume): the **pressure gradient** $-\\nabla p$ (fluid pushed from high to low pressure), **viscosity** $\\mu\\nabla^2\\vec v$ (internal friction smoothing out velocity differences, like the heat equation), and gravity or other body forces $\\vec f$.

The catch is in the acceleration. A parcel speeds up not only because the flow changes in time ($\\partial_t\\vec v$) but also because it *moves* into a region of different velocity — the $\\vec v\\cdot\\nabla\\vec v$ term. This "self-transport" is **nonlinear** (velocity times its own gradient), and nonlinearity is what breeds turbulence. A second equation, $\\nabla\\cdot\\vec v = 0$, just says an incompressible fluid can't pile up — whatever flows into a region flows out.`,
      keyIdeas: [
        'Three forces: pressure, viscosity (friction), gravity.',
        'Viscosity smooths flow; the nonlinear $\\vec v\\cdot\\nabla\\vec v$ term causes turbulence.',
        'Incompressibility $\\nabla\\cdot\\vec v = 0$: fluid is conserved.',
      ],
      workedExample: {
        prompt: 'Why does honey flow so differently from water? Frame it with viscosity.',
        solution: `Both obey Navier–Stokes, but honey's viscosity $\\mu$ is roughly $10{,}000\\times$ water's. The viscous term $\\mu\\nabla^2\\vec v$ dominates over the nonlinear inertia term.

The balance is captured by the **Reynolds number** $Re = \\rho v L/\\mu$ (inertia ÷ viscosity). For honey trickling from a spoon, $Re \\ll 1$: viscosity wins, flow is smooth and reversible (laminar). For water from a tap or air over a wing, $Re$ is large: inertia dominates, and the flow can turn turbulent. Same equations, opposite regimes — selected by a single dimensionless ratio.`,
      },
      misconceptions: [
        {
          claim: 'Turbulence comes from random outside disturbances.',
          correction:
            'No — turbulence is generated *internally* by the deterministic nonlinear term, even with perfectly smooth inputs. It’s deterministic chaos in a fluid, not externally imposed randomness.',
        },
      ],
      glossedOver: 'We treated viscosity and density as simple constants. The full stress tensor and compressible/energy equations are Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Derived from conservation of mass and momentum with a Newtonian stress tensor; the Reynolds number sets the regime, and nondimensionalization reveals the inertia–viscosity competition.',
      equationForms: [
        { latex: '\\partial_t(\\rho\\vec v) + \\nabla\\cdot(\\rho\\vec v\\otimes\\vec v) = \\nabla\\cdot\\sigma + \\vec f', caption: 'momentum conservation, σ = stress tensor' },
        { latex: 'Re = \\dfrac{\\rho v L}{\\mu} = \\dfrac{\\text{inertia}}{\\text{viscosity}}' },
      ],
      body: `Navier–Stokes follows from continuum conservation of mass ($\\partial_t\\rho + \\nabla\\cdot(\\rho\\vec v) = 0$) and momentum, closed by a **constitutive law**: for a **Newtonian** fluid the viscous stress is proportional to the rate of strain, giving the $\\mu\\nabla^2\\vec v$ term. Non-Newtonian fluids (blood, paint, polymers) replace this with more complex stress laws.

Nondimensionalizing with a length $L$ and speed $U$ leaves a single parameter, the **Reynolds number** $Re = \\rho UL/\\mu$. Low $Re$ (Stokes flow) drops the nonlinear term — linear, reversible, time-symmetric creeping flow (how bacteria swim, why a scallop can't). High $Re$ keeps it, and beyond a critical value laminar flow becomes unstable and transitions to turbulence. The **vorticity** formulation $\\partial_t\\vec\\omega + \\vec v\\cdot\\nabla\\vec\\omega = \\vec\\omega\\cdot\\nabla\\vec v + \\nu\\nabla^2\\vec\\omega$ removes pressure and exposes **vortex stretching** ($\\vec\\omega\\cdot\\nabla\\vec v$) — the 3-D mechanism, absent in 2-D, that intensifies vorticity and underlies both turbulence and the blow-up question.`,
      keyIdeas: [
        'From mass + momentum conservation + a Newtonian stress law.',
        '$Re$ sets the regime: creeping (reversible) flow vs. turbulence.',
        'Vortex stretching ($\\vec\\omega\\cdot\\nabla\\vec v$) is the key 3-D nonlinear effect.',
      ],
      workedExample: {
        prompt: 'Estimate the Reynolds number for a $5\\,\\text{m}$ whale swimming at $3\\,\\text{m/s}$ vs. a $2\\,\\mu\\text{m}$ bacterium at $30\\,\\mu\\text{m/s}$ (water: $\\nu\\approx10^{-6}\\,\\text{m}^2/\\text{s}$).',
        solution: `$Re = UL/\\nu$.

Whale: $Re = \\dfrac{3\\times 5}{10^{-6}} = 1.5\\times10^{7}$ — firmly turbulent, inertia-dominated.

Bacterium: $Re = \\dfrac{30\\times10^{-6}\\times 2\\times10^{-6}}{10^{-6}} = 6\\times10^{-5}$ — deeply viscous (Stokes) flow.

The bacterium lives in a world where inertia is irrelevant: stop swimming and it halts within an atom's width. This $10^{12}$ range in $Re$ is why microorganisms evolved corkscrew flagella rather than fish-like fins — coasting is impossible at low $Re$.`,
      },
      glossedOver: 'We assumed solutions behave nicely. Whether 3-D smooth solutions persist for all time is open — Level 4/5.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The energy cascade and Kolmogorov’s 1941 scaling describe turbulence statistically; closure problems force modeling (RANS, LES), while existence/uniqueness is settled in 2-D but open in 3-D.',
      equationForms: [
        { latex: 'E(k) \\sim \\varepsilon^{2/3} k^{-5/3}', caption: 'Kolmogorov inertial-range energy spectrum' },
        { latex: '\\eta \\sim \\left(\\nu^3/\\varepsilon\\right)^{1/4}', caption: 'Kolmogorov dissipation length' },
      ],
      body: `Turbulence is organized by an **energy cascade**: large eddies (injection scale) transfer energy to smaller eddies through vortex stretching, down to the **Kolmogorov scale** $\\eta$ where viscosity dissipates it as heat. Assuming statistical isotropy and a constant dissipation rate $\\varepsilon$, dimensional analysis (Kolmogorov 1941) predicts the inertial-range spectrum $E(k)\\sim\\varepsilon^{2/3}k^{-5/3}$, confirmed across decades of experiments — though **intermittency** (rare, intense events) causes measurable corrections to the simple scaling.

The fundamental obstacle is **closure**: averaging the equations (Reynolds decomposition) produces the Reynolds stress, a new unknown — more equations than knowns at every order. Practical CFD therefore *models* the unresolved scales: **RANS** (model all turbulence), **LES** (resolve large eddies, model the small), or brute-force **DNS** (resolve everything, feasible only at modest $Re$ since cost scales like $Re^{3}$). Mathematically, 2-D Navier–Stokes has global smooth solutions (Ladyzhenskaya), but in **3-D** only Leray–Hopf *weak* solutions are known to exist globally; their uniqueness and smoothness — equivalently, ruling out finite-time blow-up — is the open Clay problem, with vortex stretching the suspected culprit.`,
      keyIdeas: [
        'Energy cascades from large to small eddies; Kolmogorov $k^{-5/3}$ spectrum.',
        'Closure problem ⇒ turbulence must be modeled (RANS/LES) or DNS-resolved at high cost.',
        '2-D: global smoothness known. 3-D: global regularity is the open Millennium problem.',
      ],
      workedExample: {
        prompt: 'Estimate how many grid points a DNS needs to resolve all scales of a turbulent flow at Reynolds number $Re$.',
        solution: `The largest scale is $L$; the smallest is the Kolmogorov scale $\\eta$. Their ratio follows from $\\eta\\sim(\\nu^3/\\varepsilon)^{1/4}$ and $\\varepsilon\\sim U^3/L$:

$$\\frac{L}{\\eta} \\sim Re^{3/4}.$$

Resolving 3 dimensions and time scaling consistently, the number of grid points scales as

$$N \\sim (L/\\eta)^3 \\sim Re^{9/4},\\quad\\text{(with time stepping, total work }\\sim Re^{3}).$$

For an airliner ($Re\\sim10^7$) this is $\\sim10^{16}$ points — far beyond any computer. That brutal scaling is *why* turbulence modeling exists: we cannot afford to resolve the cascade directly, so we approximate the small scales.`,
      },
      glossedOver: 'Even the continuum hypothesis can fail (rarefied gases, shocks); the kinetic-theory underpinning is the Boltzmann-transport connection at Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Navier–Stokes sits between the microscopic Boltzmann equation (from which it derives via Chapman–Enskog) and the open 3-D regularity problem; partial-regularity theory, conditional criteria, and connections to geometry mark the frontier.',
      equationForms: [
        { latex: '\\int |\\nabla v|^2\\,dx\\,dt < \\infty \\;\\Rightarrow\\; \\text{singular set has parabolic measure } 0', caption: 'Caffarelli–Kohn–Nirenberg partial regularity' },
        { latex: '\\int_0^T \\|v\\|_{L^q}^p\\,dt < \\infty,\\ \\tfrac{2}{p}+\\tfrac{3}{q}=1 \\;\\Rightarrow\\; \\text{regular}', caption: 'Ladyzhenskaya–Prodi–Serrin criterion' },
      ],
      body: `The Clay problem asks whether smooth, finite-energy 3-D initial data can develop a singularity in finite time. The best results are striking but partial: **Leray** (1934) built global weak solutions; **Caffarelli–Kohn–Nirenberg** (1982) proved any singular set has zero parabolic Hausdorff measure (singularities, if any, are "small"); and conditional **regularity criteria** (Ladyzhenskaya–Prodi–Serrin, Beale–Kato–Majda controlling vorticity) say blow-up requires specific norms to diverge. The equation is **supercritical** in 3-D — the natural energy estimate fails to control the nonlinearity at small scales by a hair — which is exactly why standard methods stall; Tao has shown averaged/modified versions *can* blow up, hinting the answer is subtle.

Below, Navier–Stokes is not fundamental: it emerges from the **Boltzmann equation** via the Chapman–Enskog expansion in the Knudsen number, fixing $\\mu$ from molecular collisions; the rigorous hydrodynamic limit (Bardos–Golse–Levermore, Golse–Saint-Raymond) is itself deep mathematics. Above, the equations connect to dynamical-systems turbulence theory (strange attractors, the Ruelle–Takens scenario), to geometric analogues (the question of blow-up parallels harmonic-map and Euler-equation singularity studies), and to active-matter and MHD generalizations. Few equations are simultaneously this useful, this central, and this stubbornly open.`,
      keyIdeas: [
        'CKN partial regularity: any 3-D singular set has parabolic measure zero.',
        'Conditional criteria (Serrin, Beale–Kato–Majda) tie blow-up to specific norms/vorticity.',
        'Derives from Boltzmann via Chapman–Enskog; the rigorous hydrodynamic limit is itself hard.',
      ],
      workedExample: {
        prompt: 'Explain in what precise sense 3-D Navier–Stokes is "energy-supercritical" and why that blocks the standard proof.',
        solution: `The controlled quantity is the energy $\\|v(t)\\|_{L^2}^2 + 2\\nu\\int\\|\\nabla v\\|_{L^2}^2\\,dt$, bounded by the initial energy. Consider the scaling symmetry $v_\\lambda(x,t)=\\lambda v(\\lambda x,\\lambda^2 t)$ that preserves the equations. Under it, the energy scales as $\\|v_\\lambda\\|_{L^2}^2 = \\lambda^{-1}\\|v\\|_{L^2}^2$ in 3-D — it **decreases** as you zoom in ($\\lambda\\to\\infty$).

So the conserved quantity gives *no control* at small scales, precisely where a singularity would form: the nonlinearity is "stronger" than the dissipation can tame in the scaling sense (supercritical). In 2-D the corresponding norm (enstrophy) is critical/controlled, which is why global regularity is known there. Closing the 3-D gap would require a genuinely new conserved or monotone quantity — the heart of the Millennium problem.`,
      },
    },
  ],
  connections: [
    { toId: 'newton-second', relationship: 'is the continuum-fluid form of' },
    { toId: 'boltzmann-transport', relationship: 'emerges as the hydrodynamic limit of' },
    { toId: 'heat-equation', relationship: 'contains the viscous diffusion term shared with' },
    { toId: 'logistic-map', relationship: 'exhibits routes to chaos studied via simple models like' },
  ],
  viz: {
    component: 'FlowField',
    kind: 'interactive',
    defaultParams: { reynolds: 100 },
    caption: 'A lightweight 2-D flow past a cylinder: raise the Reynolds number to watch steady flow give way to a shedding vortex street.',
    whatToTry: [
      'Keep Re low for smooth, symmetric (laminar) flow.',
      'Raise Re past ~50 to trigger the von Kármán vortex street.',
      'Push Re higher and watch the wake grow erratic.',
    ],
  },
  primarySources: [
    {
      authors: 'G. G. Stokes',
      title: 'On the theories of the internal friction of fluids in motion',
      venue: 'Transactions of the Cambridge Philosophical Society 8',
      year: 1845,
      note: 'rigorous derivation of the viscous-flow equations',
      primary: true,
    },
    {
      authors: 'J. Leray',
      title: 'Sur le mouvement d’un liquide visqueux emplissant l’espace',
      venue: 'Acta Mathematica 63',
      year: 1934,
      note: 'global weak solutions; foundation of the modern regularity problem',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'U. Frisch', title: 'Turbulence: The Legacy of A. N. Kolmogorov', venue: 'Cambridge University Press', year: 1995 },
    { authors: 'C. Fefferman', title: 'Existence and Smoothness of the Navier–Stokes Equation (Clay Problem)', venue: 'Clay Mathematics Institute', year: 2000, url: 'https://www.claymath.org/millennium-problems/' },
  ],
  historyNote: `Navier reached the equations in 1822 by an essentially incorrect molecular argument that nonetheless gave the right form; Stokes (1845) put them on a sound continuum footing via the viscous stress tensor. For a century they were a triumph of applied science with little rigorous mathematical theory.

Turbulence has frustrated the greatest minds — Heisenberg allegedly quipped he'd ask God two questions, relativity and turbulence, "and I really believe He will have an answer only for the first." The Clay Mathematics Institute named 3-D global regularity one of its seven Millennium Prize Problems in 2000; it remains unclaimed.`,
};

export default navierStokes;
