import type { Equation } from '../types';

const boltzmannTransport: Equation = {
  id: 'boltzmann-transport',
  name: 'Boltzmann Transport Equation',
  nickname: 'the bookkeeping of a trillion collisions',
  canonicalLatex:
    '\\partial_t f+\\vec v\\!\\cdot\\!\\nabla_x f+\\tfrac{\\vec F}{m}\\!\\cdot\\!\\nabla_v f=\\left(\\partial_t f\\right)_{\\text{coll}}',
  canonicalAlt:
    'partial-t f plus v dot grad-x f plus F over m dot grad-v f equals the collision term, partial-t f sub coll',
  alternativeForms: [
    { latex: '(\\partial_t f)_{\\text{coll}} = \\int (f\'f_1\' - f f_1)\\,|\\vec v - \\vec v_1|\\,\\sigma\\,d\\Omega\\,d^3v_1', label: 'the collision integral (Boltzmann)' },
    { latex: '(\\partial_t f)_{\\text{coll}} \\approx -\\dfrac{f - f_0}{\\tau}', label: 'relaxation-time (BGK) approximation' },
  ],
  fields: ['statistical-mechanics', 'physics'],
  era: { display: '1872', sortKey: 1872 },
  discoverers: [{ name: 'Ludwig Boltzmann', note: 'kinetic transport equation and H-theorem, 1872' }],
  oneLine: 'Tracks how the distribution of particle positions and velocities evolves as they stream and collide.',
  significance:
    'The Boltzmann transport equation is the master equation of kinetic theory: it describes a gas not particle-by-particle but through the evolving distribution of velocities, bridging microscopic mechanics and macroscopic transport. From it flow the laws of viscosity, heat conduction, and electrical conductivity, the hydrodynamic (Navier–Stokes) equations, and Boltzmann’s H-theorem explaining irreversibility. It remains the workhorse for rarefied gases, neutron transport, semiconductors, plasmas, and radiative transfer.',
  applications: [
    'Transport coefficients: viscosity, thermal & electrical conductivity',
    'Rarefied/high-altitude aerodynamics and vacuum technology',
    'Electron transport in semiconductors; neutron transport in reactors',
    'Plasma physics, radiative transfer, and the lattice-Boltzmann method',
  ],
  symbols: [
    { symbol: 'f', name: 'distribution function', meaning: 'density of particles in position–velocity (phase) space, f(x,v,t)', units: 's³/m⁶' },
    { symbol: '\\vec v', name: 'velocity', meaning: 'particle velocity coordinate', units: 'm/s' },
    { symbol: '\\vec F', name: 'external force', meaning: 'force on a particle (e.g. electric, gravitational)', units: 'N' },
    { symbol: 'm', name: 'particle mass', meaning: 'mass of one particle', units: 'kg' },
    { symbol: '\\tau', name: 'relaxation time', meaning: 'mean time between collisions (BGK model)', units: 's' },
    { symbol: '\\sigma', name: 'cross-section', meaning: 'effective collision area', units: 'm²' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Instead of chasing every molecule, track the *crowd*: how many are moving how fast, and how collisions reshuffle them toward calm equilibrium.',
      equationForms: [{ latex: '\\text{streaming} + \\text{forces} = \\text{collisions}', caption: 'how a population of particles evolves' }],
      body: `A puff of gas holds trillions upon trillions of molecules. You could never track them one by one — and you don't need to. Boltzmann's insight was to follow the **statistics of the crowd**: at each place and moment, how many molecules are moving fast, slow, left, or right?

This "distribution" changes for three reasons. Molecules **stream** along — fast ones move into new regions. **Forces** like gravity or an electric field nudge their speeds. And they **collide**, ricocheting off each other and constantly reshuffling who's going how fast. That last part is the heart of it: collisions relentlessly drive any lopsided distribution back toward a smooth, settled equilibrium — the same statistical march toward "the most likely state" that gives us the arrow of time.

This bookkeeping is how we calculate why honey is thick, why metals conduct heat, and how heat leaks through the thin air of the upper atmosphere.`,
      keyIdeas: [
        'Track the population of velocities, not individual molecules.',
        'It changes by streaming, forces, and collisions.',
        'Collisions drive the gas toward equilibrium.',
      ],
      glossedOver: 'The "reshuffling by collisions" is a complicated integral; most of the difficulty hides there — Level 3/4.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The distribution $f$ counts particles by position and velocity. It drifts (streaming + forces) and gets scrambled (collisions); balance gives the equation.',
      equationForms: [{ latex: '\\partial_t f + \\vec v\\cdot\\nabla_x f + \\tfrac{\\vec F}{m}\\cdot\\nabla_v f = (\\partial_t f)_{\\text{coll}}' }],
      body: `Define $f(\\vec x,\\vec v,t)$: how many particles are near position $\\vec x$ with velocity near $\\vec v$ at time $t$. The equation is a conservation statement — a balance sheet for $f$.

The left side is **flow without collisions**: $\\partial_t f$ is the change in time, $\\vec v\\cdot\\nabla_x f$ accounts for particles streaming to new positions, and $\\tfrac{\\vec F}{m}\\cdot\\nabla_v f$ accounts for forces changing their velocities. If nothing collided, these would balance to zero (the distribution would just drift around rigidly).

The right side, the **collision term**, is the correction: collisions kick particles from one velocity to another. It is what makes a gas settle down — left alone, collisions push $f$ toward the bell-shaped Maxwell–Boltzmann velocity distribution. The visualization shows an initially lopsided distribution relaxing toward that equilibrium.`,
      keyIdeas: [
        '$f$ = particle count by position and velocity.',
        'Left side: streaming + forces (collisionless drift).',
        'Right side: collisions, which drive toward equilibrium.',
      ],
      workedExample: {
        prompt: 'In the simplest (relaxation-time) model, an out-of-equilibrium distribution relaxes as $f - f_0 \\propto e^{-t/\\tau}$. If $\\tau = 0.1\\,\\text{ns}$, how long until the deviation falls to ~2%?',
        solution: `The deviation decays exponentially: $f - f_0 = (f-f_0)_{\\text{initial}}\\,e^{-t/\\tau}$.

Falling to 2% means $e^{-t/\\tau} = 0.02$, so $t/\\tau = \\ln(50) \\approx 3.9$:

$$t \\approx 3.9\\,\\tau = 3.9 \\times 0.1\\,\\text{ns} \\approx 0.39\\,\\text{ns}.$$

A few collision times suffice to wipe out the deviation — which is why gases reach local equilibrium almost instantly on human timescales, justifying ordinary fluid dynamics.`,
      },
      misconceptions: [
        {
          claim: 'It tracks where each particle is.',
          correction:
            'No — it tracks a smooth *distribution*, treating positions and velocities statistically. Individual trajectories are deliberately abandoned; that’s what makes it tractable for $10^{23}$ particles.',
        },
      ],
      glossedOver: 'The collision term is written simply here. Its real form is a fearsome nonlinear integral over all collision partners — Level 3/4.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The collision integral assumes binary, molecular-chaos collisions; taking velocity moments yields the conservation laws, and the H-theorem proves entropy increase.',
      equationForms: [
        { latex: '(\\partial_t f)_{\\text{coll}} = \\iint (f\'f_1\' - ff_1)\\,g\\,\\sigma(\\Omega)\\,d\\Omega\\,d^3v_1' },
        { latex: 'H(t) = \\int f\\ln f\\,d^3v,\\qquad \\frac{dH}{dt}\\le 0' },
      ],
      body: `The full **collision integral** sums over binary collisions: $ff_1$ destroys a pair with velocities $(\\vec v,\\vec v_1)$, while $f'f_1'$ creates one from the reverse collision, weighted by the relative speed $g$ and the differential cross-section $\\sigma$. Its derivation invokes the **Stosszahlansatz** (molecular chaos): colliding particles are assumed uncorrelated before impact — the subtle assumption that breaks exact time-reversibility and gives the arrow of time.

Two payoffs follow. Multiplying by the **collision invariants** ($1$, $\\vec v$, $\\tfrac12 mv^2$) and integrating makes the collision term vanish (mass, momentum, energy are conserved in collisions), yielding the macroscopic **conservation laws** — the route to hydrodynamics. And Boltzmann's **H-theorem** shows $H = \\int f\\ln f\\,d^3v$ never increases, so $S = -kH$ never decreases, with equality only at the **Maxwell–Boltzmann** equilibrium $f_0 \\propto e^{-mv^2/2kT}$ — a microscopic proof of the second law (and of the equilibrium that the ideal gas law assumes).`,
      keyIdeas: [
        'Collision integral: gain ($f\'f_1\'$) minus loss ($ff_1$) over binary collisions.',
        'Molecular-chaos assumption breaks time-reversal ⇒ irreversibility.',
        'H-theorem: $S$ increases to the Maxwell–Boltzmann equilibrium.',
      ],
      workedExample: {
        prompt: 'Show that the Maxwell–Boltzmann distribution makes the collision integral vanish (it is the equilibrium).',
        solution: `The collision term vanishes when **detailed balance** holds: $f'f_1' = ff_1$ for every collision. Taking logs, this needs $\\ln f$ to be a sum of collision invariants:

$$\\ln f = a + \\vec b\\cdot\\vec v + c\\,v^2.$$

Completing the square, this is exactly $f_0 \\propto e^{-m(\\vec v - \\vec u)^2/2kT}$ — a (possibly drifting) **Maxwell–Boltzmann** distribution. Because energy is conserved in each collision ($\\tfrac12 mv'^2 + \\tfrac12 mv_1'^2 = \\tfrac12 mv^2 + \\tfrac12 mv_1^2$), this $f_0$ gives $f'f_1' = ff_1$ identically, so $(\\partial_t f)_{\\text{coll}} = 0$. It is the unique attractor of the H-theorem.`,
      },
      glossedOver: 'We derived hydrodynamics heuristically. The systematic Chapman–Enskog expansion that *computes* viscosity and conductivity is Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The Chapman–Enskog expansion in the Knudsen number derives Euler and Navier–Stokes from Boltzmann and computes transport coefficients; the Knudsen number marks the kinetic/continuum boundary.',
      equationForms: [
        { latex: 'Kn = \\dfrac{\\lambda_{\\text{mfp}}}{L},\\qquad f = f_0\\big(1 + Kn\\,\\phi_1 + \\cdots\\big)', caption: 'Knudsen number and the Chapman–Enskog ansatz' },
        { latex: '\\mu \\sim \\tfrac{1}{2}\\rho\\,\\bar v\\,\\lambda_{\\text{mfp}},\\quad \\kappa = \\tfrac{c_p}{Pr}\\mu', caption: 'kinetic-theory transport coefficients' },
      ],
      body: `Expanding $f$ about local equilibrium in powers of the **Knudsen number** $Kn = \\lambda_{\\text{mfp}}/L$ (mean free path over system size) is the **Chapman–Enskog** procedure. Order $Kn^0$ gives the inviscid **Euler equations**; order $Kn^1$ gives the **Navier–Stokes** equations *with explicit formulas* for viscosity $\\mu$, thermal conductivity $\\kappa$, and diffusivity in terms of the collision cross-section — kinetic theory's triumph, predicting (correctly) that gas viscosity is nearly independent of density and rises with temperature. Order $Kn^2$ gives the Burnett equations (of uncertain validity).

The Knudsen number organizes the whole landscape: $Kn \\ll 1$ is continuum/hydrodynamic (ordinary CFD valid); $Kn \\sim 1$ is the **transition regime** (re-entry vehicles, MEMS, microflows) where only the kinetic equation works; $Kn \\gg 1$ is free-molecular flow. Because the full collision integral is so costly, practitioners use the **BGK relaxation model** $(\\partial_t f)_{\\text{coll}} = -(f-f_0)/\\tau$, and the **lattice-Boltzmann method** discretizes the equation on a velocity lattice as a popular, parallelizable alternative to solving Navier–Stokes directly. The same framework, with the appropriate quantum statistics and band structure, governs electron transport in semiconductors and phonon heat transport.`,
      keyIdeas: [
        'Chapman–Enskog: $Kn^0\\to$ Euler, $Kn^1\\to$ Navier–Stokes, with computed transport coefficients.',
        'Knudsen number sets continuum vs. transition vs. free-molecular regimes.',
        'BGK and lattice-Boltzmann are the practical computational models.',
      ],
      workedExample: {
        prompt: 'Use kinetic theory to explain why a dilute gas’s viscosity is nearly independent of its pressure (density).',
        solution: `Kinetic theory gives $\\mu \\sim \\tfrac12\\rho\\,\\bar v\\,\\lambda_{\\text{mfp}}$. Now the mean free path is $\\lambda_{\\text{mfp}} \\sim \\dfrac{1}{n\\sigma}$, inversely proportional to number density $n$ (hence to $\\rho$). So

$$\\mu \\sim \\rho\\,\\bar v\\,\\frac{1}{n\\sigma} \\propto \\frac{\\rho}{n} = \\text{const (per molecule)}.$$

The density cancels: more molecules carry momentum, but each travels a proportionally shorter distance between collisions. Maxwell derived this surprising result and confirmed it experimentally — a striking early validation of kinetic theory. (The temperature dependence survives: $\\mu \\propto \\bar v \\propto \\sqrt T$.)`,
      },
      glossedOver: 'Classical Boltzmann assumes dilute, classical particles. Quantum statistics, strong correlations, and long-range forces need generalizations — Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Boltzmann’s equation is the dilute limit of the BBGKY hierarchy; rigorous derivation (Lanford), quantum/relativistic generalizations, and hydrodynamic-limit theorems define the modern theory.',
      equationForms: [
        { latex: '\\partial_t f_s + \\{f_s, H_s\\} = \\int (\\cdots) f_{s+1}\\,(\\text{couples to next order})', caption: 'the BBGKY hierarchy' },
        { latex: '(\\partial_t f)_{\\text{coll}} \\propto (1 \\pm f\')(1 \\pm f_1\')ff_1 - (\\cdots)', caption: 'Uehling–Uhlenbeck (quantum) collision term' },
      ],
      body: `Boltzmann's equation is not fundamental; it is the closure of the **BBGKY hierarchy** (the exact chain of equations for $s$-particle distributions) in the **Boltzmann–Grad limit** ($N\\to\\infty$, $\\sigma\\to0$, $N\\sigma^2$ fixed), where molecular chaos becomes asymptotically exact. **Lanford's theorem** (1975) makes this rigorous — but only for short times (a fraction of a mean free time), and extending it globally is an active program (Gallagher–Saint-Raymond–Texier). This is where the irreversibility of a time-reversible $N$-body system is made mathematically precise: it is a property of the *limit*, not the finite system.

The equation generalizes across physics. The **Uehling–Uhlenbeck** collision term inserts Bose-enhancement/Pauli-blocking factors $(1\\pm f)$ for quantum gases; relativistic and on-curved-spacetime versions drive cosmological **Boltzmann codes** (CMB anisotropies, freeze-out of dark matter and the light elements). The rigorous **hydrodynamic limits** — from Boltzmann to incompressible Navier–Stokes/Euler (Golse–Saint-Raymond, Bardos–Golse–Levermore) — are landmark results of modern kinetic theory. Open frontiers include long-range (Coulomb) interactions where the integral diverges and must be replaced by the Landau/Fokker–Planck operator (the basis of plasma transport), and the still-incomplete global validity of the molecular-chaos closure. Boltzmann's 1872 bookkeeping has become one of the deepest objects in mathematical physics.`,
      keyIdeas: [
        'Boltzmann = dilute (Boltzmann–Grad) closure of the exact BBGKY hierarchy.',
        'Lanford’s theorem: rigorous but short-time; irreversibility is a property of the limit.',
        'Quantum (Uehling–Uhlenbeck), relativistic, and Landau (Coulomb) generalizations; rigorous hydrodynamic limits.',
      ],
      workedExample: {
        prompt: 'Why must the standard Boltzmann collision integral be replaced for a plasma (Coulomb interactions)?',
        solution: `The collision integral weights scattering by the cross-section $\\sigma(\\theta)$. For the Coulomb potential ($\\propto 1/r$), Rutherford scattering gives $\\dfrac{d\\sigma}{d\\Omega}\\propto \\dfrac{1}{\\sin^4(\\theta/2)}$, which **diverges** for small-angle ($\\theta\\to0$) collisions because the force has infinite range.

Physically, many distant, glancing encounters dominate over rare hard collisions. Summing them (cut off at the Debye length, where screening kicks in) converts the Boltzmann integral into a **Fokker–Planck / Landau** operator — a diffusion in velocity space with a Coulomb logarithm $\\ln\\Lambda$. This is why plasma transport (fusion, astrophysics) uses the Landau, not the bare Boltzmann, collision term: the long-range force breaks the binary-collision assumption.`,
      },
    },
  ],
  connections: [
    { toId: 'boltzmann-entropy', relationship: 'provides the dynamical H-theorem proof of the second law behind' },
    { toId: 'navier-stokes', relationship: 'derives via Chapman–Enskog the hydrodynamic equations' },
    { toId: 'ideal-gas', relationship: 'has the Maxwell–Boltzmann equilibrium underlying' },
  ],
  viz: {
    component: 'DistributionRelax',
    kind: 'concept',
    defaultParams: { },
    caption: 'An out-of-equilibrium velocity distribution relaxing, collision by collision, toward the Maxwell–Boltzmann bell curve.',
    whatToTry: [
      'Start with a double-peaked (two-beam) distribution and watch it merge.',
      'Watch the relaxation slow as it nears the equilibrium curve.',
      'Note that total particle number, momentum, and energy stay fixed.',
    ],
  },
  primarySources: [
    {
      authors: 'L. Boltzmann',
      title: 'Weitere Studien über das Wärmegleichgewicht unter Gasmolekülen',
      venue: 'Wiener Berichte 66',
      year: 1872,
      note: 'introduces the transport equation and the H-theorem',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'S. Chapman & T. G. Cowling', title: 'The Mathematical Theory of Non-Uniform Gases', venue: 'Cambridge University Press', year: 1970 },
    { authors: 'C. Cercignani', title: 'The Boltzmann Equation and Its Applications', venue: 'Springer', year: 1988 },
  ],
  historyNote: `Boltzmann's H-theorem (1872) provoked immediate, famous objections. Loschmidt's reversibility paradox (1876) — if the molecular laws are time-symmetric, how can H always decrease? — and Zermelo's recurrence paradox (1896), invoking Poincaré's theorem that the system must eventually return arbitrarily close to its start, were leveled directly at this equation. Boltzmann's replies, emphasizing probability and initial conditions, were not fully appreciated in his lifetime.

The equation's rigorous status waited a century: Oscar Lanford's 1975 derivation from Newtonian mechanics validated it (for short times), finally placing the molecular-chaos assumption — and the statistical origin of irreversibility — on a firm mathematical footing.`,
};

export default boltzmannTransport;
