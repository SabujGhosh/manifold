import type { Equation } from '../types';

const lotkaVolterra: Equation = {
  id: 'lotka-volterra',
  name: 'Lotka–Volterra Equations',
  nickname: 'the predator–prey equations',
  canonicalLatex: '\\dot x=\\alpha x-\\beta xy,\\quad \\dot y=\\delta xy-\\gamma y',
  canonicalAlt:
    'x-dot equals alpha x minus beta x y; y-dot equals delta x y minus gamma y',
  alternativeForms: [
    { latex: 'V = \\delta x - \\gamma\\ln x + \\beta y - \\alpha\\ln y = \\text{const}', label: 'conserved quantity (closed orbits)' },
    { latex: '\\dot x_i = x_i\\Big(r_i + \\sum_j A_{ij}x_j\\Big)', label: 'generalized (competitive) Lotka–Volterra' },
  ],
  fields: ['mathematical-biology', 'nonlinear-dynamics'],
  era: { display: '1925–1926', sortKey: 1925 },
  discoverers: [
    { name: 'Alfred Lotka', note: 'autocatalytic/biological oscillations, 1925' },
    { name: 'Vito Volterra', note: 'predator–prey model for Adriatic fish, 1926' },
  ],
  oneLine: 'A pair of equations whose feedback between predators and prey produces perpetual, linked population cycles.',
  significance:
    'The Lotka–Volterra equations are the foundational model of mathematical ecology, showing how the simple feedback between predators and prey generates self-sustaining population oscillations — neither species in control, each driving the other. They introduced nonlinear dynamical-systems thinking to biology, explain counterintuitive effects (like why pesticides can boost pests), and generalize into the competitive and replicator dynamics central to ecology, epidemiology, and evolutionary game theory.',
  applications: [
    'Population ecology: predator–prey and host–parasite cycles',
    'Fisheries and pest management (and their counterintuitive pitfalls)',
    'Epidemiology (SIR-type models share the structure)',
    'Evolutionary game theory and economics (replicator/competition dynamics)',
  ],
  symbols: [
    { symbol: 'x', name: 'prey population', meaning: 'density of the prey species', units: 'individuals (or density)' },
    { symbol: 'y', name: 'predator population', meaning: 'density of the predator species', units: 'individuals (or density)' },
    { symbol: '\\alpha', name: 'prey growth rate', meaning: 'natural per-capita prey birth rate (no predators)', units: '1/time' },
    { symbol: '\\beta', name: 'predation rate', meaning: 'rate prey are removed per predator encounter', units: '1/(time·predator)' },
    { symbol: '\\delta', name: 'predator gain', meaning: 'predator growth per prey consumed', units: '1/(time·prey)' },
    { symbol: '\\gamma', name: 'predator death rate', meaning: 'natural per-capita predator death rate (no prey)', units: '1/time' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Foxes eat rabbits. Lots of rabbits → foxes boom → rabbits crash → foxes starve → rabbits recover. The cycle repeats forever.',
      equationForms: [{ latex: '\\dot x=\\alpha x-\\beta xy,\\quad \\dot y=\\delta xy-\\gamma y', caption: 'prey and predator, locked in a cycle' }],
      body: `Picture an island with rabbits (prey) and foxes (predators). When rabbits are plentiful, the well-fed foxes thrive and multiply. But more foxes eat more rabbits, so the rabbit population crashes. With little to eat, the foxes then starve and dwindle. Few foxes means the surviving rabbits breed back rapidly — and we're back to plentiful rabbits, ready to start the whole cycle again.

Neither species is in charge. Each one's rise sows the seeds of its own fall by feeding the other. The result is a **perpetual oscillation**: rabbit and fox numbers rise and fall in an endless dance, with the predator peaks always lagging a little behind the prey peaks. This pattern shows up in real data — famously in the records of lynx and snowshoe hare furs traded by the Hudson's Bay Company over a century.

The Lotka–Volterra equations were among the first to show that the messy living world follows mathematical laws — and that cycles can arise with no external cause, purely from the interaction itself.`,
      keyIdeas: [
        'Predator and prey populations rise and fall in linked cycles.',
        'Each species’ growth triggers the other’s — no one is in control.',
        'The cycles arise from the interaction itself, not outside forces.',
      ],
      glossedOver: 'We say the cycle "repeats forever." The basic model’s cycles are perfectly closed loops; reality is messier — Level 3/4.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Two coupled rate equations: prey grow but are eaten ($\\dot x = \\alpha x - \\beta xy$); predators die but grow by eating ($\\dot y = \\delta xy - \\gamma y$). The $xy$ terms are the interaction.',
      equationForms: [
        { latex: '\\dot x = \\alpha x - \\beta xy' },
        { latex: '\\dot y = \\delta xy - \\gamma y' },
      ],
      body: `Each equation is a "rate of change = gains − losses" statement. For **prey** $x$: they breed at rate $\\alpha x$ (more rabbits make more rabbits), and are eaten at rate $\\beta xy$. That product $xy$ is key — encounters between predators and prey happen in proportion to *both* populations (more of either means more meetings). For **predators** $y$: they die off at rate $\\gamma y$ when there's nothing to eat, but grow at rate $\\delta xy$ from successful hunting.

The dotted symbols ($\\dot x$) mean "rate of change over time." Solving these (usually on a computer) gives the oscillating populations. A vivid way to see the cycle is a **phase portrait**: plot predators against prey, and the solution traces a closed loop, going round and round forever — prey peak, then predators peak a quarter-cycle later, then prey crash, then predators crash. The visualization shows both the time series and this looping phase portrait, with sliders for the four rates.`,
      keyIdeas: [
        'Rate of change = births − deaths for each species.',
        'The interaction term $xy$ counts predator–prey encounters.',
        'Phase portrait (predators vs. prey) traces a closed loop = a cycle.',
      ],
      workedExample: {
        prompt: 'Find the "balance point" (equilibrium) where neither population changes, in terms of the four rates.',
        solution: `Set both rates of change to zero. From $\\dot x = \\alpha x - \\beta xy = x(\\alpha - \\beta y) = 0$: either $x = 0$ or $y = \\alpha/\\beta$. From $\\dot y = \\delta xy - \\gamma y = y(\\delta x - \\gamma) = 0$: either $y = 0$ or $x = \\gamma/\\delta$.

The interesting (coexistence) equilibrium is

$$x^* = \\frac{\\gamma}{\\delta},\\qquad y^* = \\frac{\\alpha}{\\beta}.$$

Notice something surprising: the prey equilibrium $x^*$ depends only on the *predator's* parameters ($\\gamma, \\delta$), and the predator equilibrium $y^*$ only on the *prey's* ($\\alpha, \\beta$). The populations don't sit at this point but **orbit around it** — it's the center of the cycle, not a resting place.`,
      },
      misconceptions: [
        {
          claim: 'The populations will eventually settle down to steady numbers.',
          correction:
            'In the basic Lotka–Volterra model they never settle — they orbit forever in closed cycles whose size depends on the starting point. (Adding realism like prey carrying capacity *can* make them settle — see higher levels.)',
        },
      ],
      glossedOver: 'We found the equilibrium but not whether cycles are stable. That, and a conserved quantity, are Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Linearizing at the coexistence equilibrium gives a center (pure imaginary eigenvalues); the closed orbits reflect a conserved quantity, and time-averages equal the equilibrium values.',
      equationForms: [
        { latex: 'J^* = \\begin{pmatrix} 0 & -\\beta\\gamma/\\delta \\\\ \\delta\\alpha/\\beta & 0 \\end{pmatrix},\\ \\lambda = \\pm i\\sqrt{\\alpha\\gamma}', caption: 'Jacobian at coexistence: a center' },
        { latex: 'V = \\delta x - \\gamma\\ln x + \\beta y - \\alpha\\ln y', caption: 'conserved along trajectories' },
      ],
      body: `Linearize about the coexistence equilibrium $(x^*, y^*) = (\\gamma/\\delta, \\alpha/\\beta)$. The Jacobian has **pure imaginary eigenvalues** $\\lambda = \\pm i\\sqrt{\\alpha\\gamma}$, so the equilibrium is a **center**: small oscillations of angular frequency $\\sqrt{\\alpha\\gamma}$, neither growing nor decaying. The near-equilibrium period is $T \\approx 2\\pi/\\sqrt{\\alpha\\gamma}$.

Globally, the orbits are **exactly closed** because the system has a **conserved quantity** $V(x,y) = \\delta x - \\gamma\\ln x + \\beta y - \\alpha\\ln y$ (verify $\\dot V = 0$ by the chain rule). Each initial condition rides a level curve of $V$ forever — the system is **conservative** (like a frictionless oscillator), which is also why it is *structurally fragile*: any added realism breaks the exact closure. A beautiful consequence is **Volterra's averaging principle**: the time-average of each population over one cycle equals its equilibrium value, $\\bar x = x^*$, $\\bar y = y^*$ — regardless of amplitude. This yields the famous, counterintuitive prediction that uniformly killing *both* species (e.g. fishing or pesticide) **raises the average prey** and **lowers the average predator**.`,
      keyIdeas: [
        'Coexistence equilibrium is a center: eigenvalues $\\pm i\\sqrt{\\alpha\\gamma}$, period $\\approx 2\\pi/\\sqrt{\\alpha\\gamma}$.',
        'A conserved quantity $V$ makes orbits exactly closed (conservative system).',
        'Volterra averaging: time-averaged populations equal the equilibrium values.',
      ],
      workedExample: {
        prompt: 'Volterra’s puzzle: why did reduced fishing during World War I *increase* the proportion of predatory fish in the Adriatic?',
        solution: `Model fishing as removing both species at rate $h$: $\\dot x = (\\alpha - h)x - \\beta xy$, $\\dot y = \\delta xy - (\\gamma + h)y$. The new equilibria shift to

$$x^* = \\frac{\\gamma + h}{\\delta},\\qquad y^* = \\frac{\\alpha - h}{\\beta}.$$

By Volterra's averaging principle, the long-run *average* populations equal these. So **more** fishing ($h$ up) raises the prey average $x^*$ and lowers the predator average $y^*$.

During WWI, fishing in the Adriatic **dropped** ($h$ down) — which by the same logic *lowers* prey and *raises* predators. That is exactly what Volterra's brother-in-law, biologist Umberto D'Ancona, had observed: a higher fraction of predatory (sharks, rays) fish in the catch. Volterra built the model to explain it. The lesson generalizes alarmingly: broadly applied **pesticides can increase pest populations** by suppressing their predators more than the pests themselves.`,
      },
      glossedOver: 'The closed orbits are an artifact of the idealized model. Adding density dependence changes the dynamics qualitatively — Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The neutral cycles are structurally unstable; realistic terms (logistic prey, saturating predation) produce stable limit cycles via Hopf bifurcation — and the framework generalizes widely.',
      equationForms: [
        { latex: '\\dot x = \\alpha x\\big(1 - \\tfrac{x}{K}\\big) - \\dfrac{\\beta x y}{1 + \\beta h x}', caption: 'logistic prey + Holling type-II functional response' },
        { latex: '\\dot x_i = x_i\\big(r_i + \\textstyle\\sum_j A_{ij}x_j\\big)', caption: 'generalized Lotka–Volterra (n species)' },
      ],
      body: `The classic model's neutrally-stable centers are **structurally unstable** — a defining weakness. Adding biological realism changes the picture qualitatively and for the better. A **carrying capacity** for prey (logistic growth $\\alpha x(1 - x/K)$) turns the center into a stable spiral: oscillations *damp* to the equilibrium. A **saturating functional response** (Holling type II: a predator can only eat so fast) destabilizes it again, and as a parameter crosses a threshold the system undergoes a **Hopf bifurcation**, birthing a genuine **stable limit cycle** — a self-sustaining oscillation that the system returns to after perturbation (unlike the fragile closed orbits). The **paradox of enrichment** (Rosenzweig) emerges: increasing the prey's carrying capacity can *destabilize* the system into large, extinction-risking oscillations.

The structure generalizes far beyond two species. The **generalized (competitive) Lotka–Volterra** system $\\dot x_i = x_i(r_i + \\sum_j A_{ij}x_j)$ models whole communities, with the interaction matrix $A$ governing coexistence, competitive exclusion, and (for large random $A$) the **stability–complexity** debate sparked by Robert May. The same equations, suitably reinterpreted, give the **replicator dynamics** of evolutionary game theory (Lotka–Volterra and replicator systems are mathematically equivalent), the SIR models of epidemiology, and chemical-kinetics oscillators. Spatial versions (reaction–diffusion) produce travelling waves and Turing patterns.`,
      keyIdeas: [
        'Classic neutral cycles are structurally unstable; realism changes them.',
        'Logistic prey + saturating predation ⇒ Hopf bifurcation to a stable limit cycle.',
        'Generalized LV / replicator dynamics model communities, evolution, and epidemics.',
      ],
      workedExample: {
        prompt: 'Why are the basic Lotka–Volterra cycles called "structurally unstable," and what does adding a prey carrying capacity do?',
        solution: `Structural stability means the *qualitative* dynamics survive small changes to the equations. The basic model fails this: its equilibrium is a **center** (eigenvalues exactly $\\pm i\\sqrt{\\alpha\\gamma}$, on the imaginary axis). Any perturbation to the model pushes those eigenvalues off the axis — into the left half-plane (stable spiral) or right (unstable spiral) — destroying the family of closed orbits. The neutral cycles exist only for the exactly-tuned idealized equations.

Adding a **carrying capacity** (logistic prey, $\\alpha x(1 - x/K)$) introduces a self-limiting $-\\alpha x^2/K$ term. Re-linearizing, the equilibrium's Jacobian gains a negative trace, moving the eigenvalues into the **left half-plane**: the equilibrium becomes a **stable spiral**, and oscillations decay to steady coexistence. So realism generically replaces the fragile perpetual cycles with either a damped approach to equilibrium or — with further saturating predation — a robust stable limit cycle. The textbook closed loops are a knife-edge special case.`,
      },
      glossedOver: 'Even these models are low-dimensional and deterministic. High-dimensional, stochastic, and chaotic ecological dynamics are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Lotka–Volterra is a Hamiltonian/Poisson system with deep algebraic structure, and its high-dimensional and stochastic generalizations sit at the research frontier of theoretical ecology and complex systems.',
      equationForms: [
        { latex: '\\{x, y\\} = xy,\\quad H = \\delta x - \\gamma\\ln x + \\beta y - \\alpha\\ln y', caption: 'Poisson/Hamiltonian structure' },
        { latex: '\\dot x_i = x_i\\Big(r_i + \\textstyle\\sum_j A_{ij}x_j\\Big);\\ A \\text{ random} \\Rightarrow \\text{stability transition}', caption: 'random generalized LV' },
      ],
      body: `Structurally, even the classic two-species model is **Hamiltonian** in disguise: in coordinates $(\\ln x, \\ln y)$ it becomes a canonical system with $H = V$, revealing the closed orbits as energy level sets and connecting to the rich theory of integrable and Poisson systems (the Volterra lattice is an integrable hierarchy in its own right, with a Lax pair). The deep equivalence between **generalized Lotka–Volterra and replicator dynamics** (Hofbauer) makes the model the common backbone of theoretical ecology and **evolutionary game theory**, where fixed points are Nash equilibria / ESS and the dynamics encode selection.

The live research frontier is **high-dimensional and disordered** systems. Robert May's 1972 result — that large random communities ($n$ species, random interaction matrix $A$) become *unstable* beyond a complexity threshold $\\sqrt{n}\\,\\sigma > 1$ (via the circular law of random-matrix spectra) — reframed the diversity–stability debate and now connects ecology to spin glasses, the cavity method, and the statistical physics of disordered systems (work of Bunin, Galla, and others mapping ecological phase transitions). Stochastic LV dynamics, demographic noise, and finite-size effects drive questions of extinction, persistence, and noise-induced cycles; spatial and network-structured versions generate pattern formation and metacommunity dynamics; and time-delays and chaos (three or more species can be chaotic, unlike the integrable pair) complete the picture. A 1920s fisheries model has become a meeting point of dynamical systems, random-matrix theory, game theory, and statistical mechanics.`,
      keyIdeas: [
        'The classic model is Hamiltonian/Poisson; the Volterra lattice is integrable (Lax pair).',
        'Generalized LV ≡ replicator dynamics — backbone of evolutionary game theory.',
        'Random high-dimensional LV (May’s threshold) links ecology to random-matrix theory and spin glasses.',
      ],
      workedExample: {
        prompt: 'Outline Robert May’s argument that overly complex random ecosystems tend to be unstable.',
        solution: `Linearize a generalized LV system of $n$ species about a feasible equilibrium. The community (Jacobian) matrix is $M = -I + A$, where $A$ has off-diagonal entries drawn randomly with mean 0, variance $\\sigma^2$, and connectance $C$ (fraction nonzero); the $-I$ is self-regulation.

By the **circular law** of random-matrix theory, the eigenvalues of the random part $A$ fill a disk in the complex plane of radius $\\approx \\sigma\\sqrt{nC}$, centered near 0. Shifting by $-I$ moves the disk left by 1. The equilibrium is stable only if **all** eigenvalues have negative real part, i.e. the disk stays in the left half-plane:

$$\\sigma\\sqrt{nC} < 1.$$

So beyond a critical **complexity** $\\sigma\\sqrt{nC} = 1$ — more species ($n$), denser interactions ($C$), or stronger ones ($\\sigma$) — at least one eigenvalue crosses into the right half-plane and the equilibrium destabilizes. May concluded (1972) that complexity does *not* automatically beget stability, overturning ecological orthodoxy and launching a debate (about structure, modularity, and interaction types) that, via the statistical physics of disordered systems, remains active today.`,
      },
    },
  ],
  connections: [
    { toId: 'logistic-map', relationship: 'shares density-dependent population dynamics with the discrete' },
    { toId: 'euler-lagrange', relationship: 'has a hidden Hamiltonian structure akin to that derived from' },
    { toId: 'navier-stokes', relationship: 'exhibits nonlinear oscillations and pattern formation studied alongside' },
  ],
  viz: {
    component: 'LotkaVolterra',
    kind: 'interactive',
    defaultParams: { alpha: 1.1, beta: 0.4, gamma: 0.4, delta: 0.1 },
    caption: 'A phase portrait (predators vs. prey) beside the time series, with sliders for α, β, γ, δ; trajectories trace closed orbits around the coexistence equilibrium.',
    whatToTry: [
      'Watch predator peaks lag a quarter-cycle behind prey peaks.',
      'Change the starting populations and see the orbit grow or shrink (neutral cycles).',
      'Adjust the rates and watch the equilibrium point and cycle period shift.',
    ],
  },
  primarySources: [
    {
      authors: 'V. Volterra',
      title: 'Variazioni e fluttuazioni del numero d’individui in specie animali conviventi',
      venue: 'Mem. Accad. Lincei 2, 31',
      year: 1926,
      note: 'predator–prey model explaining Adriatic fishery data',
      primary: true,
    },
    {
      authors: 'A. J. Lotka',
      title: 'Elements of Physical Biology',
      venue: 'Williams & Wilkins',
      year: 1925,
      note: 'oscillating chemical/biological populations',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'J. D. Murray', title: 'Mathematical Biology I', venue: 'Springer', year: 2002 },
    { authors: 'J. Hofbauer & K. Sigmund', title: 'Evolutionary Games and Population Dynamics', venue: 'Cambridge University Press', year: 1998 },
  ],
  historyNote: `Alfred Lotka (1925) derived the equations while studying oscillating chemical reactions and autocatalysis, seeing populations as a kind of energetics. Independently, Vito Volterra (1926) was prompted by a concrete puzzle from his marine-biologist son-in-law Umberto D'Ancona: why did the proportion of predatory fish in Adriatic catches rise during World War I, when fishing fell? Volterra's model explained it exactly, and the averaging principle gave the counterintuitive answer.

The model is celebrated as the founding equation of mathematical ecology, though it has been criticized for its biological unrealism (the structurally-unstable neutral cycles). Its real legacy is conceptual: it brought the language of nonlinear dynamical systems into biology, and its generalizations now span evolutionary game theory, epidemiology, and the statistical physics of complex ecosystems.`,
};

export default lotkaVolterra;
