import type { Equation } from '../types';

/**
 * Gold-standard reference equation. The depth, honesty, and notation-scaling
 * here is the calibration target for all other equations (build prompt §4).
 */
const logisticMap: Equation = {
  id: 'logistic-map',
  name: 'The Logistic Map',
  nickname: 'the simplest equation that makes chaos',
  canonicalLatex: 'x_{n+1} = r\\,x_n(1-x_n)',
  canonicalAlt:
    'x sub n plus one equals r times x sub n times the quantity one minus x sub n',
  alternativeForms: [
    { latex: 'f_r(x) = r\\,x(1-x)', label: 'as a map f_r iterated on [0,1]' },
    {
      latex: 'x_{n+1} = x_n + \\rho\\,x_n\\!\\left(1-\\tfrac{x_n}{K}\\right)',
      label: 'discrete logistic with carrying capacity K',
    },
  ],
  fields: ['nonlinear-dynamics', 'mathematics'],
  era: { display: '1976', sortKey: 1976 },
  discoverers: [
    { name: 'Robert M. May', note: 'popularized the map in a 1976 Nature review' },
    { name: 'Pierre-François Verhulst', note: 'continuous logistic model, 1838' },
    { name: 'Mitchell Feigenbaum', note: 'discovered the universality constants, 1978' },
  ],
  oneLine:
    'A one-line population rule that proves simple, exact systems can be utterly unpredictable.',
  significance:
    'The logistic map is the canonical example of deterministic chaos: a quadratic recurrence with no randomness whose long-term behaviour can be exactly periodic or genuinely unpredictable depending on a single parameter. Its period-doubling route to chaos exhibits the universal Feigenbaum constants, found in real physical experiments, making it a Rosetta Stone linking nonlinear dynamics, statistical mechanics, and the renormalization group.',
  applications: [
    'Pedagogical archetype for chaos and the period-doubling route to it',
    'Toy model for density-dependent population dynamics (and its limits)',
    'Pseudo-random number generation at r = 4 (conjugate to a Bernoulli shift)',
    'Feigenbaum universality verified in Rayleigh–Bénard convection, nonlinear circuits, and lasers',
    'Benchmark for estimators of Lyapunov exponents and invariant densities',
  ],
  symbols: [
    {
      symbol: 'x_n',
      name: 'state at step n',
      meaning: 'population as a fraction of the maximum the environment can hold, so 0 ≤ xₙ ≤ 1',
      units: 'dimensionless',
    },
    {
      symbol: 'r',
      name: 'growth (boom) parameter',
      meaning: 'controls reproduction rate; the bifurcation parameter, studied on 0 ≤ r ≤ 4',
      units: 'dimensionless',
    },
    { symbol: 'n', name: 'generation index', meaning: 'discrete time step (integer)', units: 'dimensionless' },
    {
      symbol: 'x_*',
      name: 'fixed point',
      meaning: 'a state that maps to itself, x* = f_r(x*)',
      units: 'dimensionless',
    },
    {
      symbol: '\\lambda',
      name: 'Lyapunov exponent',
      meaning: 'mean exponential rate of separation of nearby trajectories; λ > 0 signals chaos',
      units: 'per step (dimensionless)',
    },
    {
      symbol: '\\delta',
      name: 'Feigenbaum δ',
      meaning: 'universal ratio of successive period-doubling intervals, ≈ 4.66920',
      units: 'dimensionless',
    },
    {
      symbol: '\\alpha',
      name: 'Feigenbaum α',
      meaning: 'universal attractor-rescaling constant, ≈ 2.50291',
      units: 'dimensionless',
    },
  ],
  levels: [
    /* ---------------------------------- L1 ---------------------------------- */
    {
      level: 1,
      audience: 'Curious Visitor',
      summary:
        'A single rabbit-breeding rule that can settle down, flip-flop forever, or go completely wild — even though nothing about it is random.',
      equationForms: [
        { latex: 'x_{n+1} = r\\,x_n(1-x_n)', caption: 'the rabbit rule (you can ignore the symbols for now)' },
      ],
      body: `Imagine rabbits in a meadow. A few rabbits → they breed and multiply. Too many rabbits → they run out of food and the population crashes. There's a single dial — call it the **boom factor** — that controls how fast they breed.

Turn the dial gently and the population settles to a steady number, year after year. Turn it further and the population starts **flip-flopping** between a big year and a small year, forever. Turn it further still and something astonishing happens: the population jumps around with *no pattern at all* — as unpredictable as dice — even though the rule never changed and there is no luck involved.

This little rabbit rule was a thunderclap in science. It proved that **simple, exact rules can produce total unpredictability**. The world doesn't need to be complicated to be wild.`,
      keyIdeas: [
        'One simple rule, one dial — three completely different fates.',
        'Unpredictable does **not** mean random: the rule is fixed and exact.',
        'This is the birth certificate of "chaos theory."',
      ],
      glossedOver:
        'The "no pattern at all" behaviour is the precise idea of *chaos*; it has a clean mathematical meaning, made exact at Level 3.',
    },
    /* ---------------------------------- L2 ---------------------------------- */
    {
      level: 2,
      audience: 'High School',
      summary:
        'Write this year\'s population as a fraction xₙ between 0 and 1; next year is r·xₙ·(1−xₙ). One number, r, decides the destiny.',
      equationForms: [
        { latex: 'x_{n+1} = r\\,x_n(1-x_n)', caption: 'xₙ = breeding · (1−xₙ) = crowding brake' },
      ],
      body: `Let $x_n$ be this year's population written as a fraction of the most the meadow can hold, so $0 \\le x_n \\le 1$. Let $r$ be the growth (boom) factor. Next year's fraction is

$$x_{n+1} = r\\,x_n(1-x_n).$$

Read the two pieces: the $x_n$ term is **breeding** (more rabbits → more babies); the $(1-x_n)$ term is the **crowding brake** (more rabbits → less food per rabbit, so the growth is held back). When the population is tiny, $1-x_n \\approx 1$ and it grows almost geometrically; as it fills the meadow, the brake bites.

Change *only* $r$ and the long-run behaviour changes completely: a steady value for gentle $r$, a repeating two-year cycle a bit higher, and erratic jumping for large $r$. Same equation, one number, totally different story.`,
      keyIdeas: [
        'Always keep $0 \\le x_n \\le 1$: it is a *fraction* of the maximum.',
        'Two competing effects: growth $x_n$ and crowding $(1-x_n)$.',
        'The parameter $r$ — not the starting value — decides the long-run fate.',
      ],
      workedExample: {
        prompt:
          'Take $r = 2.5$ and start at $x_0 = 0.4$. Compute the next couple of years. Then describe what happens with $r = 3.2$.',
        solution: `With $r = 2.5,\\ x_0 = 0.4$:

$x_1 = 2.5 \\times 0.4 \\times (1-0.4) = 2.5 \\times 0.4 \\times 0.6 = 0.6.$

$x_2 = 2.5 \\times 0.6 \\times (1-0.6) = 2.5 \\times 0.6 \\times 0.4 = 0.6.$

It has **locked onto 0.6** and stays there — a steady population.

Now with $r = 3.2$ the sequence no longer settles to one value; it falls into a **two-year cycle**, alternating forever between about $0.513$ and $0.799$. One change to $r$ flipped a steady population into a permanent boom–bust oscillation.`,
      },
      misconceptions: [
        {
          claim: 'Bigger r always means more rabbits.',
          correction:
            'False. Past a point, increasing $r$ makes the population *less predictable*, not larger — and at high $r$ the average can even drop while the swings grow.',
        },
        {
          claim: 'The wild behaviour comes from rounding errors or randomness.',
          correction:
            'No. The rule is exact and deterministic. The wildness is built into the equation itself — this is the whole surprise.',
        },
      ],
      glossedOver:
        'Calling the two-year cycle "alternating forever" is true but incomplete: it is a genuine *attracting* orbit, stable to small nudges. Why, and when it appears, is made precise at Level 3.',
    },
    /* ---------------------------------- L3 ---------------------------------- */
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Fixed points, linear stability, and the period-doubling cascade: the nonzero fixed point is stable for 1 < r < 3, then a 2-cycle is born, and the doublings accumulate at r∞ ≈ 3.56995 into chaos.',
      equationForms: [
        { latex: 'x_* = r\\,x_*(1-x_*) \\;\\Rightarrow\\; x_* = 0,\\ \\ x_* = 1-\\tfrac{1}{r}', caption: 'fixed points' },
        { latex: "f_r'(x) = r(1-2x); \\quad \\text{stable} \\iff |f_r'(x_*)| < 1", caption: 'linear stability criterion' },
      ],
      body: `**Fixed points** solve $x_* = r\\,x_*(1-x_*)$, giving $x_* = 0$ and $x_* = 1 - 1/r$. **Linear stability** uses the derivative $f_r'(x) = r(1-2x)$: a fixed point is stable iff $|f_r'(x_*)| < 1$. The nonzero fixed point is stable for $1 < r < 3$.

At $r = 3$ it loses stability ($f_r' = -1$) and a stable **2-cycle** is born — a *period-doubling (flip) bifurcation*. The cascade $2 \\to 4 \\to 8 \\to \\cdots$ accumulates at $r_\\infty \\approx 3.56995$, beyond which lies chaos interleaved with periodic windows.

Chaos here means **sensitive dependence on initial conditions**, quantified by a positive **Lyapunov exponent**

$$\\lambda = \\lim_{N\\to\\infty}\\frac{1}{N}\\sum_{n=0}^{N-1}\\ln\\bigl|f_r'(x_n)\\bigr|.$$

When $\\lambda > 0$ nearby trajectories separate exponentially; when $\\lambda < 0$ they collapse onto a periodic orbit. **Cobweb plots** make the dynamics visible: a staircase converging to a stable point, a box around a 2-cycle, and a space-filling tangle in the chaotic regime. The visualization below lets you watch all three.`,
      keyIdeas: [
        'Stability is a derivative test: $|f_r\'(x_*)|<1$.',
        'Period-doubling: stability is lost when the multiplier passes through $-1$.',
        'The doublings accumulate geometrically at $r_\\infty \\approx 3.56995$.',
        'Chaos ⇔ positive Lyapunov exponent ⇔ exponential sensitivity.',
      ],
      workedExample: {
        prompt:
          'For $r = 2.5$, find the nonzero fixed point and decide whether it is stable.',
        solution: `Nonzero fixed point: $x_* = 1 - 1/r = 1 - 1/2.5 = 0.6.$

Multiplier: $f_r'(x_*) = r(1 - 2x_*) = 2.5\\,(1 - 1.2) = 2.5\\times(-0.2) = -0.5.$

Since $|{-0.5}| = 0.5 < 1$, the fixed point is **stable** — consistent with the L2 example, where $x_0 = 0.4$ converged to $0.6$. (The negative sign means the approach is oscillatory: values alternate above and below $0.6$ as they close in.)`,
      },
      misconceptions: [
        {
          claim: 'The fixed point x* = 0 is irrelevant.',
          correction:
            'It matters: $x_* = 0$ is stable for $r < 1$ (population dies out), and exchanges stability with $x_* = 1-1/r$ in a transcritical bifurcation at $r = 1$.',
        },
      ],
      glossedOver:
        'We treated $r_\\infty$ and the doubling cascade as facts. *Why* the ratios of successive intervals converge to a universal constant — and why the same number appears for entirely different maps — is the Feigenbaum story at Level 4.',
    },
    /* ---------------------------------- L4 ---------------------------------- */
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Feigenbaum universality, conjugacy to the Bernoulli shift at r = 4, Sharkovskii ordering and "period three implies chaos", and the self-similar structure of periodic windows.',
      equationForms: [
        { latex: '\\delta = \\lim_{n\\to\\infty}\\frac{r_n - r_{n-1}}{r_{n+1}-r_n} \\approx 4.66920', caption: 'Feigenbaum δ (interval ratios)' },
        { latex: '\\rho(x) = \\dfrac{1}{\\pi\\sqrt{x(1-x)}}', caption: 'invariant density at r = 4' },
      ],
      body: `The period-doubling cascade exhibits **Feigenbaum universality**: ratios of successive bifurcation intervals converge to $\\delta \\approx 4.66920$, and the attractor rescales by $\\alpha \\approx 2.50291$. These constants are *universal* across all smooth unimodal maps with a quadratic maximum (e.g. $r\\sin(\\pi x)$), not special to the quadratic.

At $r = 4$ the map is **topologically conjugate** to the tent map via $x = \\sin^2(\\pi\\theta/2)$, and hence to a Bernoulli shift — exact, provable chaos. Its invariant density is

$$\\rho(x) = \\frac{1}{\\pi\\sqrt{x(1-x)}},$$

so long orbits spend most time near the endpoints. **Sharkovskii's theorem** orders the periods; the appearance of a period-3 orbit (in the window near $r \\approx 3.8284$) implies orbits of *every* period — the Li–Yorke "period three implies chaos." Periodic windows open by tangent (saddle-node) bifurcations and close by their own period-doubling cascades, reproducing the whole structure at smaller scale — self-similarity all the way down. The Lyapunov exponent is positive on a complicated, positive-measure set of parameters, and negative inside the windows.`,
      keyIdeas: [
        'Feigenbaum $\\delta,\\alpha$ are universal for smooth unimodal maps with a quadratic max.',
        'At $r=4$: conjugate to the tent map / Bernoulli shift, with explicit invariant density.',
        'Sharkovskii: period 3 forces all periods (Li–Yorke chaos).',
        'Windows are tangent-born and self-similar — chaos is *not* structurally stable.',
      ],
      workedExample: {
        prompt:
          'Use the Feigenbaum ratio to estimate the accumulation point $r_\\infty$ from the first doublings $r_1 = 3$ (period 2) and $r_2 \\approx 3.449$ (period 4).',
        solution: `Model the doubling thresholds as a geometric tail with ratio $\\delta \\approx 4.669$: the gaps shrink by roughly $1/\\delta$ each step. With $r_2 - r_1 \\approx 0.449$, the remaining distance to $r_\\infty$ is approximately

$$\\sum_{k\\ge 1}(r_2-r_1)\\,\\delta^{-k} = (r_2-r_1)\\,\\frac{1/\\delta}{1-1/\\delta} = 0.449\\times\\frac{1}{\\delta-1} \\approx \\frac{0.449}{3.669} \\approx 0.122.$$

So $r_\\infty \\approx r_2 + 0.122 \\approx 3.571$, close to the true $r_\\infty \\approx 3.56995$. The geometric convergence *is* Feigenbaum universality in action.`,
      },
      glossedOver:
        'We assert universality and the specific values of $\\delta,\\alpha$. The mechanism — a fixed point of a renormalization (doubling) operator with a single relevant eigenvalue — is the Level 5 picture.',
    },
    /* ---------------------------------- L5 ---------------------------------- */
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Feigenbaum universality as a renormalization-group fixed point; the embedding into z² + c and the Mandelbrot set; Jakobson\'s theorem, density of hyperbolicity, and the frontier.',
      equationForms: [
        { latex: '(T\\psi)(x) = \\alpha\\,\\psi\\!\\bigl(\\psi(x/\\alpha)\\bigr)', caption: 'the period-doubling (renormalization) operator' },
        { latex: 'z_{n+1} = z_n^2 + c', caption: 'complexification embedding the real family' },
      ],
      body: `Feigenbaum universality is explained by a **renormalization-group** argument: the doubling operator $(T\\psi)(x) = \\alpha\\,\\psi(\\psi(x/\\alpha))$ has a fixed-point function $\\psi_*$ whose linearization carries a single **relevant eigenvalue** $\\delta$. This is *exactly* a phase transition with $\\delta$ playing the role of a critical exponent — confirmed experimentally in Rayleigh–Bénard convection (Libchaber).

Complexifying to $z \\mapsto z^2 + c$ embeds the real logistic family along the real axis of the **Mandelbrot set**: the period-doubling points are the cusps of the real-axis cardioid/disk chain, and parameter-space universality connects to the set's self-similar structure (Milnor; Douady–Hubbard). **Jakobson's theorem** establishes a positive-Lebesgue-measure set of parameters carrying an absolutely continuous invariant measure (genuine, measure-theoretic chaos, not merely topological transitivity), while the *density of hyperbolicity* — proved for real quadratics by Lyubich and by Graczyk–Świątek — means attracting periodic windows are dense, so chaos is not structurally stable.

**Frontier.** The remaining structure ties to ergodic/measure-theoretic dynamics, the Collet–Eckmann conditions, and the Mandelbrot Locally Connected (MLC) conjecture, whose resolution would complete the combinatorial classification of these dynamics.`,
      keyIdeas: [
        'Universality = a hyperbolic fixed point of the renormalization operator with one relevant direction; $\\delta$ is its eigenvalue.',
        'The real logistic family is the real-axis slice of the Mandelbrot set.',
        'Jakobson: positive-measure set of genuinely chaotic (a.c.i.m.) parameters.',
        'Density of hyperbolicity ⇒ chaos is not structurally stable; windows are dense.',
      ],
      workedExample: {
        prompt:
          'Show that the logistic family $x\\mapsto r x(1-x)$ and the quadratic family $z\\mapsto z^2 + c$ are affinely conjugate, and relate $r$ to $c$.',
        solution: `Conjugate by an affine map $x = A z + B$. Substituting into $x' = r x(1-x)$ and matching to $z' = z^2 + c$ gives $A = -1/r$ (up to scaling) and the parameter relation

$$c = \\frac{r}{2}\\left(1 - \\frac{r}{2}\\right) = \\frac{r}{2} - \\frac{r^2}{4}.$$

Thus each real $r \\in (0,4]$ corresponds to a real $c \\in [-2, 1/4]$, placing the entire logistic route to chaos on the real axis of the Mandelbrot set — the period-doublings of the map are exactly the bulb-tangencies of the real cardioid chain.`,
      },
    },
  ],
  connections: [
    { toId: 'mandelbrot', relationship: 'is the real-axis slice of' },
    { toId: 'renormalization-group', relationship: 'has its universality explained by the' },
    { toId: 'lotka-volterra', relationship: 'is a discrete-time population cousin of' },
    { toId: 'shannon-entropy', relationship: 'has its chaos quantified by entropy, kin to' },
  ],
  viz: {
    component: 'LogisticMap',
    kind: 'interactive',
    defaultParams: { r: 3.2, x0: 0.4, iterations: 60, transient: 200 },
    caption:
      'Drag along the bifurcation diagram to set r and watch the cobweb and time series respond. The Lyapunov overlay turns positive exactly where the attractor goes chaotic.',
    whatToTry: [
      'Set r = 2.5: the time series locks onto a single value (a stable fixed point).',
      'Set r = 3.2: a steady two-year cycle appears — the first period-doubling.',
      'Push r past 3.57 and watch order dissolve into chaos.',
      'Find the period-3 window near r ≈ 3.83 — an island of calm inside the chaos.',
      'Set r = 4 and step the cobweb: orbits visit the whole interval, densest near the edges.',
    ],
  },
  primarySources: [
    {
      authors: 'R. M. May',
      title: 'Simple mathematical models with very complicated dynamics',
      venue: 'Nature 261, 459',
      year: 1976,
      url: 'https://doi.org/10.1038/261459a0',
      note: 'the review that launched the logistic map into mainstream science',
      primary: true,
    },
    {
      authors: 'M. J. Feigenbaum',
      title: 'Quantitative universality for a class of nonlinear transformations',
      venue: 'Journal of Statistical Physics 19, 25',
      year: 1978,
      url: 'https://doi.org/10.1007/BF01020332',
      note: 'introduces the universal constants δ and α',
      primary: true,
    },
  ],
  furtherReading: [
    {
      authors: 'S. H. Strogatz',
      title: 'Nonlinear Dynamics and Chaos',
      venue: 'Westview/CRC Press (Ch. 10)',
      year: 2015,
      note: 'the standard, accessible treatment of the logistic map',
    },
    {
      authors: 'J. Gleick',
      title: 'Chaos: Making a New Science',
      venue: 'Viking',
      year: 1987,
      note: 'narrative history of May, Feigenbaum, and the chaos revolution',
    },
  ],
  historyNote: `Pierre-François Verhulst introduced the *continuous* logistic equation in 1838 to temper Malthus's runaway exponential growth with a crowding term. The discrete map's wildness, however, went largely unappreciated until **Robert May**'s 1976 *Nature* review crystallised a startling moral for ecologists and everyone else: "very simple difference equations can possess... wild" behaviour, and apparent randomness in data need not imply a complicated or noisy cause.

Around the same time **Mitchell Feigenbaum**, computing period-doubling thresholds by hand on an HP-65 calculator at Los Alamos, noticed the interval ratios converging to a fixed number — and that the *same* number appeared for completely different maps. His universality, initially hard to publish, was later confirmed in real convection and circuit experiments, and is now understood through the renormalization group.`,
};

export default logisticMap;
