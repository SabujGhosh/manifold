import type { Equation } from '../types';

const heatEquation: Equation = {
  id: 'heat-equation',
  name: 'The Heat / Diffusion Equation',
  nickname: 'the equation of smoothing and spreading',
  canonicalLatex: '\\partial_t u = \\alpha\\nabla^2 u',
  canonicalAlt: 'the time derivative of u equals alpha times the Laplacian of u',
  alternativeForms: [
    { latex: '\\partial_t u = \\alpha\\,\\partial_x^2 u', label: 'one dimension' },
    { latex: 'u(x,t) = \\dfrac{1}{\\sqrt{4\\pi\\alpha t}}e^{-x^2/4\\alpha t}', label: 'the heat kernel (fundamental solution)' },
    { latex: '\\partial_t p = D\\,\\partial_x^2 p', label: 'as the diffusion / Fokker–Planck equation' },
  ],
  fields: ['pde', 'physics'],
  era: { display: '1822', sortKey: 1822 },
  discoverers: [
    { name: 'Joseph Fourier', note: 'Théorie analytique de la chaleur, 1822' },
    { name: 'Adolf Fick', note: 'the same equation for diffusion of matter, 1855' },
  ],
  oneLine: 'How heat (or anything that diffuses) flows from hot to cold, always smoothing bumps away.',
  significance:
    'The heat equation is the prototype parabolic PDE and the universal law of diffusion: it governs heat conduction, the spreading of dye or pollutants, the diffusion of probability (Brownian motion), and — via a change of variables — option pricing. It encodes irreversibility (the arrow of time) directly, smooths any initial data instantly, and was the problem for which Fourier invented his series. Its solution operator, the Gaussian heat kernel, recurs throughout mathematics and physics.',
  applications: [
    'Thermal design: heat sinks, insulation, electronics cooling',
    'Diffusion of chemicals, dopants in semiconductors, pollutants',
    'Image processing (Gaussian blur, scale space, denoising)',
    'Finance (Black–Scholes is the heat equation) and probability (Brownian motion)',
  ],
  symbols: [
    { symbol: 'u', name: 'temperature / concentration', meaning: 'the diffusing quantity', units: 'K or mol/m³' },
    { symbol: 't', name: 'time', meaning: 'the time coordinate', units: 's' },
    { symbol: '\\alpha', name: 'thermal diffusivity', meaning: 'how fast the medium spreads heat (D for diffusion)', units: 'm²/s' },
    { symbol: '\\nabla^2', name: 'Laplacian', meaning: 'measures how a point differs from its neighbours’ average', units: '1/m²' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Heat always flows from hot to cold, evening out the differences — and the same rule governs how a drop of dye spreads through water.',
      equationForms: [{ latex: '\\partial_t u = \\alpha\\nabla^2 u', caption: 'hot spots cool, cold spots warm — bumps flatten' }],
      body: `Touch a hot pan handle and the heat creeps up to your fingers. Drop ink in still water and it blooms into a cloud. Leave coffee on the table and it cools to room temperature. These are all the same process — **diffusion** — and one equation describes them all.

The rule is intuitive: heat flows from hotter to colder, and the bigger the temperature difference between neighbouring spots, the faster it flows. Sharp hot spikes cool quickly; the whole thing relentlessly **smooths out** toward sameness. It never spontaneously un-smooths — you'll never see room-temperature coffee gather its heat back into a hot spot. That one-way smoothing is a face of the arrow of time.

Remarkably, the very same math describes a perfume spreading across a room, a rumour diffusing through a crowd, and even how prices wander in finance.`,
      keyIdeas: [
        'Heat flows from hot to cold, smoothing differences.',
        'Sharp features fade fastest; everything evens out.',
        'The same equation governs heat, dye, perfume, and more.',
      ],
      glossedOver: 'We say bigger differences flow faster. Precisely, the rate depends on the *curvature* of the temperature profile — Level 2/3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'A point heats up or cools based on how it compares to its neighbours: $\\partial_t u = \\alpha\\,\\partial_x^2 u$. Hotter-than-average cools; colder-than-average warms.',
      equationForms: [{ latex: '\\partial_t u = \\alpha\\,\\partial_x^2 u' }],
      body: `Picture temperature along a metal rod, $u(x,t)$. The equation says each point's rate of change $\\partial_t u$ is proportional to the **curvature** $\\partial_x^2 u$ of the temperature profile there. If a point is cooler than the average of its neighbours (a valley, positive curvature), it warms up; if it's a hot peak (negative curvature), it cools. Bumps get shaved down, dents get filled in.

The constant $\\alpha$ (thermal diffusivity) sets the speed — metals (high $\\alpha$) equalize fast, insulators slowly. A key feature: diffusion is **not** like a wave with a fixed speed; the spread grows with the *square root* of time, so doubling the time only spreads things $\\sqrt2 \\approx 1.4$ times as far. The visualization lets you set an initial hot profile and watch it relax.`,
      keyIdeas: [
        'Rate of change ∝ curvature of the profile.',
        'Peaks cool, valleys warm — everything flattens.',
        'Spread grows like $\\sqrt t$, not linearly (unlike a wave).',
      ],
      workedExample: {
        prompt: 'A diffusing dye spreads to a width of $1\\,\\text{cm}$ in $10\\,\\text{s}$. Roughly how long to spread to $2\\,\\text{cm}$?',
        solution: `Diffusion width grows as $\\sqrt{t}$: width $\\propto \\sqrt{\\alpha t}$. To double the width, you need **four times** the time (since $\\sqrt{4} = 2$):

$$t_2 = 4 \\times 10\\,\\text{s} = 40\\,\\text{s}.$$

This $\\sqrt t$ scaling is why diffusion is fast over short distances (smell across a desk) but agonizingly slow over long ones — it’s why your body relies on blood flow, not diffusion, to move oxygen meters rather than micrometers.`,
      },
      misconceptions: [
        {
          claim: 'Heat diffuses at a steady speed, like a wave.',
          correction:
            'No. There’s no fixed propagation speed — the disturbance technically reaches everywhere instantly (though tiny), and the characteristic spread grows only as $\\sqrt{t}$. This is what makes it *parabolic*, not hyperbolic like the wave equation.',
        },
      ],
      glossedOver: 'We used a rod (1-D). The 3-D version and its Gaussian solution come at Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Derived from Fourier’s law plus conservation; solved by the Gaussian heat kernel or by Fourier modes that decay as $e^{-\\alpha k^2 t}$ — high frequencies vanish fastest.',
      equationForms: [
        { latex: '\\vec q = -\\kappa\\nabla u,\\quad \\partial_t u = \\alpha\\nabla^2 u', caption: 'Fourier’s law + energy conservation' },
        { latex: 'u(x,t) = \\frac{1}{\\sqrt{4\\pi\\alpha t}}\\int e^{-(x-y)^2/4\\alpha t}\\,u_0(y)\\,dy', caption: 'convolution with the heat kernel' },
      ],
      body: `Combine **Fourier's law** of conduction ($\\vec q = -\\kappa\\nabla u$, heat flows down the gradient) with energy conservation ($\\partial_t u = -\\tfrac{1}{\\rho c}\\nabla\\cdot\\vec q$) and you get $\\partial_t u = \\alpha\\nabla^2 u$ with $\\alpha = \\kappa/\\rho c$. Fourier-transforming in space turns it into $\\partial_t\\hat u = -\\alpha k^2\\hat u$, so each mode decays as $\\hat u_k(t) = \\hat u_k(0)e^{-\\alpha k^2 t}$: **high spatial frequencies die fastest** — the mathematical statement of smoothing.

The fundamental solution is the **heat kernel**, a Gaussian that spreads with width $\\sqrt{2\\alpha t}$; any initial profile evolves by convolving with it. This instantly reveals the **infinite propagation speed** and **infinite smoothing** (the solution is $C^\\infty$ for any $t>0$, however rough $u_0$). Backward in time the problem is **ill-posed** (high modes blow up) — the precise encoding of irreversibility. The probabilistic mirror: the heat kernel is the transition density of **Brownian motion**, so diffusion of heat and random walks are the same equation.`,
      keyIdeas: [
        '$\\alpha = \\kappa/\\rho c$ from Fourier’s law + conservation.',
        'Modes decay as $e^{-\\alpha k^2 t}$: high frequencies smoothed first.',
        'Heat kernel = Gaussian = Brownian-motion transition density; backward-time is ill-posed.',
      ],
      workedExample: {
        prompt: 'Show a single Fourier mode $u = e^{-\\alpha k^2 t}\\sin(kx)$ solves the heat equation, and interpret the decay.',
        solution: `Compute: $\\partial_t u = -\\alpha k^2\\,e^{-\\alpha k^2 t}\\sin(kx)$ and $\\partial_x^2 u = -k^2 e^{-\\alpha k^2 t}\\sin(kx)$, so $\\alpha\\,\\partial_x^2 u = -\\alpha k^2 u = \\partial_t u.$ ✓

The decay rate is $\\alpha k^2$ — proportional to the *square* of the wavenumber. A ripple twice as fine ($k\\to 2k$) decays **four times** as fast. So fine detail vanishes almost immediately while broad gradients linger, which is exactly why diffusion blurs sharp images and erases small-scale structure first.`,
      },
      glossedOver: 'Fourier’s law assumes instantaneous local response. Finite-speed corrections (hyperbolic heat / Cattaneo) matter at very short times — Level 4/5.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The heat semigroup $e^{t\\Delta}$ is the analytic prototype; maximum principles, energy estimates, and the link to stochastic processes (Feynman–Kac) make it central to PDE and probability.',
      equationForms: [
        { latex: 'u(\\cdot,t) = e^{t\\alpha\\Delta}u_0', caption: 'the heat semigroup (smoothing operator)' },
        { latex: 'u(x,t) = \\mathbb{E}\\big[\\,u_0(x + \\sqrt{2\\alpha}\\,W_t)\\,\\big]', caption: 'Feynman–Kac / Brownian average' },
      ],
      body: `Abstractly, solving the heat equation is applying the **heat semigroup** $e^{t\\alpha\\Delta}$, a strongly continuous, smoothing, contraction semigroup whose generator is the Laplacian — the analytic backbone of parabolic theory (analytic semigroups, sectorial operators). It obeys a **maximum principle** (the solution never exceeds its initial/boundary extremes — heat doesn't spontaneously concentrate), and an **energy/entropy** estimate ($\\frac{d}{dt}\\int u^2 = -2\\alpha\\int|\\nabla u|^2 \\le 0$) gives uniqueness and decay.

The **Feynman–Kac** formula expresses the solution as an average over Brownian paths, $u(x,t) = \\mathbb{E}[u_0(x+\\sqrt{2\\alpha}W_t)]$, unifying PDE and stochastic analysis; adding a potential gives the link to the Schrödinger equation under Wick rotation $t\\to -i\\tau$ (imaginary time turns Schrödinger into a diffusion). Numerically, explicit schemes are conditionally stable (von Neumann analysis demands $\\alpha\\Delta t/\\Delta x^2 \\le \\tfrac12$); implicit/Crank–Nicolson schemes are unconditionally stable. Nonlinear diffusions (porous medium, mean-curvature flow, Perona–Malik in imaging) and reaction–diffusion (Turing patterns) extend the same operator.`,
      keyIdeas: [
        'Heat semigroup $e^{t\\Delta}$: smoothing, contraction, maximum principle.',
        'Feynman–Kac links it to Brownian motion; Wick rotation connects to Schrödinger.',
        'Numerics: explicit schemes conditionally stable ($\\alpha\\Delta t/\\Delta x^2\\le1/2$).',
      ],
      workedExample: {
        prompt: 'Derive the stability condition for the explicit (forward-time, centered-space) scheme via von Neumann analysis.',
        solution: `The scheme is $u_j^{n+1} = u_j^n + r(u_{j+1}^n - 2u_j^n + u_{j-1}^n)$ with $r = \\alpha\\Delta t/\\Delta x^2$. Insert a Fourier mode $u_j^n = \\xi^n e^{ikj\\Delta x}$:

$$\\xi = 1 + r(e^{ik\\Delta x} - 2 + e^{-ik\\Delta x}) = 1 - 4r\\sin^2(k\\Delta x/2).$$

Stability requires $|\\xi|\\le 1$ for all $k$. The worst case $\\sin^2 = 1$ gives $|1 - 4r|\\le 1$, i.e.

$$r = \\frac{\\alpha\\Delta t}{\\Delta x^2} \\le \\frac12.$$

Halving the grid spacing forces a **fourfold** cut in the time step — the practical sting of parabolic equations, and the reason implicit methods are often preferred.`,
      },
      glossedOver: 'Fourier’s law gives unphysical infinite signal speed; relativistic/finite-speed and anomalous (fractional) diffusion are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The heat kernel encodes geometry (spectral theory, heat-kernel expansion, index theorems) and generalizes to curved spaces, fractional/anomalous diffusion, and Ricci flow — diffusion of geometry itself.',
      equationForms: [
        { latex: '\\mathrm{Tr}\\,e^{t\\Delta} \\sim (4\\pi t)^{-n/2}\\sum_{k\\ge0} a_k\\,t^{k}', caption: 'heat-kernel (Minakshisundaram–Pleijel) expansion' },
        { latex: '\\partial_t g_{ij} = -2 R_{ij}', caption: 'Ricci flow — the metric diffuses' },
      ],
      body: `On a Riemannian manifold the heat kernel of the Laplace–Beltrami operator carries the geometry: its short-time expansion $\\mathrm{Tr}\\,e^{t\\Delta} \\sim (4\\pi t)^{-n/2}\\sum a_k t^k$ has coefficients built from curvature invariants (volume, scalar curvature, …), making "can you hear the shape of a drum?" precise and underlying the **heat-kernel proof of the Atiyah–Singer index theorem** (McKean–Singer): the supertrace of the heat kernel is a topological invariant independent of $t$. This is one of the deepest bridges between analysis, geometry, and topology.

The operator generalizes in several frontier directions: **fractional Laplacians** $(-\\Delta)^s$ model anomalous (Lévy-flight) diffusion with heavy tails, ubiquitous in turbulent and biological transport; **Dirichlet forms** define diffusion on fractals and metric-measure spaces. Most spectacularly, letting the *metric itself* diffuse gives **Ricci flow** $\\partial_t g_{ij} = -2R_{ij}$ — a nonlinear heat equation for geometry that smooths curvature and, with Perelman's entropy functionals and surgery, proved the **Poincaré conjecture**. The schoolroom cooling rod is, structurally, the same operator that resolved a Clay Millennium Problem.`,
      keyIdeas: [
        'Heat-kernel expansion encodes curvature; supertrace gives the index theorem.',
        'Fractional Laplacians / Dirichlet forms model anomalous diffusion and diffusion on fractals.',
        'Ricci flow = heat equation for the metric; Perelman used it to prove Poincaré.',
      ],
      workedExample: {
        prompt: 'Explain how the heat-kernel trace yields a topological invariant (the McKean–Singer idea behind the index theorem).',
        solution: `For a Dirac-type operator $D$ with Laplacians $D^*D$ and $DD^*$, consider the **supertrace**

$$\\mathrm{Str}\\,e^{-tD^2} = \\mathrm{Tr}\\,e^{-tD^*D} - \\mathrm{Tr}\\,e^{-tDD^*}.$$

Nonzero eigenvalues pair up between the two operators (isospectral), so they cancel; only the zero modes survive, giving $\\dim\\ker D - \\dim\\ker D^* = \\mathrm{ind}(D)$ — an integer, **independent of $t$**.

Taking $t\\to0$, the heat-kernel expansion expresses the same quantity as an integral of local curvature/characteristic-class densities. Equating the two limits gives the Atiyah–Singer index theorem: a topological integer equals an analytic heat-flow quantity. Diffusion thereby computes topology.`,
      },
    },
  ],
  connections: [
    { toId: 'fourier', relationship: 'is the very problem that motivated' },
    { toId: 'black-scholes', relationship: 'is, after a change of variables, identical to' },
    { toId: 'normal-distribution', relationship: 'has the Gaussian heat kernel that is the density of' },
    { toId: 'schrodinger', relationship: 'becomes, under imaginary-time rotation, the' },
  ],
  viz: {
    component: 'HeatDiffusion',
    kind: 'interactive',
    defaultParams: { alpha: 1, profile: 'spike' },
    caption: 'Set an initial temperature profile on a rod (or 2-D plate) and watch it relax; adjust the diffusivity α to speed or slow the smoothing.',
    whatToTry: [
      'Start with a sharp spike and watch it broaden into a Gaussian.',
      'Increase α and see the same profile relax faster.',
      'Make a two-bump profile and watch the dip between them fill in.',
    ],
  },
  primarySources: [
    {
      authors: 'J. Fourier',
      title: 'Théorie analytique de la chaleur',
      venue: 'Paris',
      year: 1822,
      note: 'derives and solves the heat equation, inventing Fourier series',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'L. C. Evans', title: 'Partial Differential Equations (Ch. 2)', venue: 'American Mathematical Society', year: 2010 },
    { authors: 'J. Crank', title: 'The Mathematics of Diffusion', venue: 'Oxford University Press', year: 1975 },
  ],
  historyNote: `Fourier's 1822 treatise on heat was doubly revolutionary: it introduced the heat equation *and* the trigonometric series needed to solve it. The Académie had awarded his earlier (1811) version a prize but pointedly noted a lack of rigor — Lagrange in particular distrusted the sweeping claim that any function could be a sine series, a dispute that drove a century of analysis.

The equation's reach has only grown. Fick (1855) found the identical law for chemical diffusion; Einstein (1905) and Smoluchowski connected it to Brownian motion and atomic reality; Bachelier (1900) had already used it for financial markets, anticipating Black–Scholes by seventy years. Few equations span heat, atoms, money, image processing, and the topology of manifolds.`,
};

export default heatEquation;
