import type { Equation } from '../types';

const eulerLagrange: Equation = {
  id: 'euler-lagrange',
  name: 'The Euler–Lagrange Equation',
  nickname: 'nature’s optimization rule',
  canonicalLatex: '\\dfrac{d}{dt}\\dfrac{\\partial L}{\\partial\\dot q}-\\dfrac{\\partial L}{\\partial q}=0',
  canonicalAlt:
    'the time derivative of the partial of L with respect to q-dot, minus the partial of L with respect to q, equals zero',
  alternativeForms: [
    { latex: '\\delta S = \\delta\\!\\int_{t_1}^{t_2} L\\,dt = 0', label: 'the principle of stationary action' },
    { latex: '\\dfrac{\\partial \\mathcal{L}}{\\partial \\phi} - \\partial_\\mu\\dfrac{\\partial \\mathcal{L}}{\\partial(\\partial_\\mu\\phi)} = 0', label: 'field-theory form' },
  ],
  fields: ['physics', 'mathematics'],
  era: { display: '1755', sortKey: 1755 },
  discoverers: [
    { name: 'Leonhard Euler', note: 'general variational equation, 1744' },
    { name: 'Joseph-Louis Lagrange', note: 'the δ-calculus and mechanics, 1755–1788' },
  ],
  oneLine: 'The condition a path must satisfy to make a quantity (like action) as small — or stationary — as possible.',
  significance:
    'The Euler–Lagrange equation is the master tool of the calculus of variations: it converts "find the curve that minimizes this integral" into a differential equation. Through Hamilton’s principle of stationary action it reformulates all of mechanics from a single scalar, the Lagrangian, and via Noether’s theorem ties symmetries to conservation laws. The same equation governs light rays (Fermat), optimal shapes, fields, and is the classical backbone of the path-integral formulation of quantum mechanics.',
  applications: [
    'Lagrangian mechanics in arbitrary coordinates (robotics, spacecraft, constraints)',
    'Optics (Fermat’s least-time principle) and geodesics in geometry/GR',
    'Optimal control, economics, and shape optimization',
    'Deriving field equations (electromagnetism, general relativity, the Standard Model)',
  ],
  symbols: [
    { symbol: 'L', name: 'Lagrangian', meaning: 'a scalar function of state, usually kinetic minus potential energy T − V', units: 'J (energy)' },
    { symbol: 'q', name: 'generalized coordinate', meaning: 'any variable describing configuration (angle, length, field value)', units: 'varies' },
    { symbol: '\\dot q', name: 'generalized velocity', meaning: 'time derivative of q', units: 'varies/s' },
    { symbol: 'S', name: 'action', meaning: 'the time-integral of the Lagrangian along a path', units: 'J·s' },
    { symbol: 't', name: 'time', meaning: 'the integration variable (or a path parameter)', units: 's' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Nature is lazy in a precise way: out of all the paths something could take, it picks the one that’s "just right" — and one rule finds it.',
      equationForms: [{ latex: '\\delta S = 0', caption: 'the chosen path makes a special quantity stationary' }],
      body: `A lifeguard racing to a swimmer doesn't run straight at them — running is faster than swimming, so they angle along the beach a bit first. Without any calculation, they take the path that *saves the most time*. Light does exactly the same thing: it bends entering water because it, too, takes the quickest route. This is the surprising secret the Euler–Lagrange equation captures.

For an astonishing range of phenomena, nature behaves as if it is **optimizing** something. A soap film pulls itself into the smallest possible surface. A thrown ball arcs along the one path that makes a quantity called "action" stationary. A hanging chain settles into the precise curve that minimizes its energy.

The Euler–Lagrange equation is the universal recipe that, given *what* is being optimized, tells you the exact path or shape that does it. It turns "find the best curve" into something you can solve.`,
      keyIdeas: [
        'Many natural paths are the ones that optimize some quantity.',
        'Light takes the quickest route; films take the smallest area.',
        'One equation finds the optimal path once you know the goal.',
      ],
      glossedOver: 'We say "optimize," but nature actually makes the quantity *stationary* (a flat spot), which can be a min, max, or saddle — Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'To find the curve that minimizes a total quantity (like travel time), you don’t test infinitely many curves — the Euler–Lagrange equation gives the answer directly.',
      equationForms: [
        { latex: 'S = \\int_{t_1}^{t_2} L\\,dt', caption: 'total quantity to optimize' },
        { latex: '\\frac{d}{dt}\\frac{\\partial L}{\\partial\\dot q} = \\frac{\\partial L}{\\partial q}' },
      ],
      body: `Ordinary calculus finds the lowest point of a curve by setting the slope to zero. The calculus of variations does the same thing for **whole paths**: among all curves connecting two points, which one makes a total quantity $S = \\int L\\,dt$ smallest?

You can't check every curve — there are infinitely many. The Euler–Lagrange equation is the shortcut. You write down $L$ (the thing being accumulated, expressed using position $q$ and speed $\\dot q$), plug it into the equation, and out comes a differential equation whose solution *is* the optimal path. The brachistochrone — the fastest slide between two points — and the shape of a hanging chain are classic answers it provides. The visualization lets you explore the least-time slide.`,
      keyIdeas: [
        'It’s "set the slope to zero" but for entire paths.',
        'Write $L$, apply the equation, solve the resulting ODE.',
        'Answers classics: brachistochrone, hanging chain, shortest path.',
      ],
      workedExample: {
        prompt: 'Show that the shortest path between two points in a plane is a straight line, using $L = \\sqrt{1+(y\')^2}$ (arc length).',
        solution: `Here the "time" variable is $x$ and the coordinate is $y(x)$, with $L = \\sqrt{1+y'^2}$. Since $L$ does not depend on $y$ itself, $\\partial L/\\partial y = 0$, so Euler–Lagrange says $\\dfrac{d}{dx}\\dfrac{\\partial L}{\\partial y'} = 0$, i.e. $\\dfrac{\\partial L}{\\partial y'}$ is constant:

$$\\frac{y'}{\\sqrt{1+y'^2}} = \\text{const} \\;\\Rightarrow\\; y' = \\text{const}.$$

A constant slope means $y = mx + b$ — a straight line. The equation confirms what we expected, and the same method handles cases where the answer is *not* obvious.`,
      },
      misconceptions: [
        {
          claim: 'Nature always chooses the path of least action.',
          correction:
            'It chooses a *stationary* path (where small variations don’t change the action to first order). That is often a minimum, but it can be a saddle point — "least action" is a slight misnomer for "stationary action."',
        },
      ],
      glossedOver: 'We applied the equation as a recipe. *Why* setting $\\delta S=0$ yields it (integration by parts) is the Level 3 derivation.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Demanding $\\delta S = 0$ for arbitrary variations vanishing at the endpoints yields the Euler–Lagrange equation; for $L = T - V$ it reproduces Newton’s laws in any coordinates.',
      equationForms: [
        { latex: '\\delta S = \\int \\Big(\\frac{\\partial L}{\\partial q} - \\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot q}\\Big)\\delta q\\,dt = 0' },
        { latex: 'L = T - V \\;\\Rightarrow\\; m\\ddot q = -\\frac{\\partial V}{\\partial q}' },
      ],
      body: `Vary the path $q(t) \\to q(t) + \\delta q(t)$ with $\\delta q$ vanishing at the endpoints. To first order, $\\delta S = \\int \\big(\\frac{\\partial L}{\\partial q}\\delta q + \\frac{\\partial L}{\\partial \\dot q}\\delta\\dot q\\big)dt$. Integrate the second term by parts (the boundary term dies) and require $\\delta S = 0$ for **arbitrary** $\\delta q$; the **fundamental lemma of the calculus of variations** forces the bracket to vanish — the Euler–Lagrange equation.

Choosing $L = T - V$, this *is* Newton's second law, but now written in whatever generalized coordinates suit the problem (angles, distances along a wire), with constraint forces eliminated automatically. Quantities $q$ that don't appear in $L$ ("cyclic") give immediately conserved momenta $\\partial L/\\partial \\dot q$ — the seed of **Noether's theorem** linking each continuous symmetry to a conservation law. The **Beltrami identity** handles the common case where $L$ has no explicit $t$, conserving an energy-like quantity.`,
      keyIdeas: [
        '$\\delta S = 0$ + integration by parts ⇒ Euler–Lagrange.',
        '$L = T-V$ reproduces Newton in arbitrary coordinates, constraints handled.',
        'Cyclic coordinates ⇒ conserved momenta (Noether).',
      ],
      workedExample: {
        prompt: 'Find the equation of motion of a simple pendulum (mass $m$, length $\\ell$, angle $\\theta$) via Euler–Lagrange.',
        solution: `Kinetic energy $T = \\tfrac12 m\\ell^2\\dot\\theta^2$; potential $V = -mg\\ell\\cos\\theta$. So $L = \\tfrac12 m\\ell^2\\dot\\theta^2 + mg\\ell\\cos\\theta$.

Compute: $\\dfrac{\\partial L}{\\partial \\dot\\theta} = m\\ell^2\\dot\\theta$, so $\\dfrac{d}{dt}\\dfrac{\\partial L}{\\partial\\dot\\theta} = m\\ell^2\\ddot\\theta$; and $\\dfrac{\\partial L}{\\partial\\theta} = -mg\\ell\\sin\\theta$.

Euler–Lagrange gives $m\\ell^2\\ddot\\theta + mg\\ell\\sin\\theta = 0$, i.e.

$$\\ddot\\theta = -\\frac{g}{\\ell}\\sin\\theta.$$

No need to resolve tension or constraint forces — the angle coordinate handled everything.`,
      },
      glossedOver: 'We worked with finitely many coordinates. Promoting $q$ to a field $\\phi(x,t)$ gives field theory — Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'In field theory the Euler–Lagrange equations follow from a Lagrangian density; Noether’s theorem makes symmetries yield conserved currents, and the framework derives Maxwell, GR, and the Standard Model.',
      equationForms: [
        { latex: '\\partial_\\mu\\frac{\\partial\\mathcal{L}}{\\partial(\\partial_\\mu\\phi)} - \\frac{\\partial\\mathcal{L}}{\\partial\\phi} = 0', caption: 'EL for a field φ' },
        { latex: 'j^\\mu = \\frac{\\partial\\mathcal{L}}{\\partial(\\partial_\\mu\\phi)}\\delta\\phi,\\quad \\partial_\\mu j^\\mu = 0', caption: 'Noether current' },
      ],
      body: `For a field $\\phi(x)$ with action $S = \\int \\mathcal{L}(\\phi, \\partial_\\mu\\phi)\\,d^4x$, the same variational argument gives the field Euler–Lagrange equations. This is how every fundamental theory is now specified: write a Lorentz-invariant, gauge-invariant Lagrangian density and *derive* the dynamics. The Maxwell Lagrangian $-\\tfrac14 F_{\\mu\\nu}F^{\\mu\\nu} - j^\\mu A_\\mu$ yields Maxwell's equations; the Einstein–Hilbert action $\\int R\\sqrt{-g}\\,d^4x$ yields the Einstein field equations; the Standard Model is one (long) Lagrangian.

**Noether's theorem** is the crown jewel: every continuous symmetry of the action produces a conserved current $\\partial_\\mu j^\\mu = 0$ and hence a conserved charge. Spacetime-translation invariance gives the stress–energy tensor (energy/momentum conservation); gauge invariance gives charge conservation. The Hamiltonian/Legendre route gives the symplectic phase-space picture, and the action is precisely the object exponentiated in the **path integral** $\\int \\mathcal{D}\\phi\\,e^{iS/\\hbar}$ — the classical equations are the stationary-phase ($\\hbar\\to0$) saddle.`,
      keyIdeas: [
        'Field Lagrangian densities derive Maxwell, GR, and the Standard Model.',
        'Noether: every continuous symmetry ↦ a conserved current/charge.',
        'The action $S$ is what the quantum path integral exponentiates.',
      ],
      workedExample: {
        prompt: 'Derive the Klein–Gordon equation from the Lagrangian density $\\mathcal{L} = \\tfrac12\\partial_\\mu\\phi\\,\\partial^\\mu\\phi - \\tfrac12 m^2\\phi^2$.',
        solution: `Compute the pieces: $\\dfrac{\\partial\\mathcal{L}}{\\partial\\phi} = -m^2\\phi$ and $\\dfrac{\\partial\\mathcal{L}}{\\partial(\\partial_\\mu\\phi)} = \\partial^\\mu\\phi$.

Field Euler–Lagrange $\\partial_\\mu\\dfrac{\\partial\\mathcal{L}}{\\partial(\\partial_\\mu\\phi)} - \\dfrac{\\partial\\mathcal{L}}{\\partial\\phi} = 0$ gives

$$\\partial_\\mu\\partial^\\mu\\phi + m^2\\phi = 0 \\;\\Rightarrow\\; (\\Box + m^2)\\phi = 0.$$

The relativistic wave equation for a massive scalar — derived from a one-line scalar by the same rule that gave the pendulum. This is the template for writing down any field theory.`,
      },
      glossedOver: 'Stationary action is a classical statement; how it arises as the dominant phase of a sum over all paths is the Level 5 quantum picture.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The variational principle is the organizing structure of physics: geometrically it is about jet bundles and symplectic/multisymplectic geometry, and quantum-mechanically it is the stationary phase of the path integral, with anomalies marking where classical symmetry fails to survive quantization.',
      equationForms: [
        { latex: 'Z = \\int \\mathcal{D}\\phi\\; e^{iS[\\phi]/\\hbar}', caption: 'the path integral; EL = stationary phase as ℏ→0' },
        { latex: '\\partial_\\mu j^\\mu = \\frac{1}{16\\pi^2}\\epsilon^{\\mu\\nu\\rho\\sigma}F_{\\mu\\nu}F_{\\rho\\sigma}', caption: 'an anomaly: classical conservation broken by quantization' },
      ],
      body: `Geometrically, a Lagrangian is a function on the (first) **jet bundle** of a field, and the Euler–Lagrange equations are the intrinsic statement that a section is a critical point of the action functional; the Hamiltonian side lives on the cotangent bundle with its canonical symplectic form (multisymplectic for fields), and the modern covariant-phase-space and BV–BRST formalisms handle gauge symmetry and constraints systematically. This is the precise language in which "action principle" becomes a theorem-generating machine across geometry and physics.

Quantum-mechanically, Dirac and Feynman showed the classical stationary-action path is the **stationary-phase** locus of $\\int\\mathcal{D}\\phi\\,e^{iS/\\hbar}$: as $\\hbar\\to0$, contributions away from $\\delta S=0$ cancel by rapid oscillation, recovering Euler–Lagrange as the leading saddle and $1/\\hbar$ corrections as loops. But quantization can *break* a classical Noether symmetry — an **anomaly** — when the path-integral measure is not invariant (Fujikawa); the chiral anomaly explains $\\pi^0\\to\\gamma\\gamma$, and anomaly *cancellation* constrains the very particle content of the Standard Model (and string theory's critical dimension). The lifeguard's quick route, taken seriously, becomes the principle from which both classical fields and their quantum corrections descend.`,
      keyIdeas: [
        'EL = critical points on jet bundles; Hamiltonian side is (multi)symplectic; BV–BRST for gauge.',
        'Path integral: classical action is the $\\hbar\\to0$ stationary phase; loops are corrections.',
        'Anomalies: quantization can break classical symmetries; their cancellation constrains physics.',
      ],
      workedExample: {
        prompt: 'Explain how Euler–Lagrange emerges as the stationary-phase condition of the path integral as $\\hbar\\to 0$.',
        solution: `In $Z = \\int\\mathcal{D}q\\,e^{iS[q]/\\hbar}$, expand the action about a path $q_0$: $S[q_0+\\eta] = S[q_0] + \\delta S[\\eta] + \\tfrac12\\delta^2 S[\\eta] + \\cdots$.

As $\\hbar\\to0$, the phase $e^{iS/\\hbar}$ oscillates infinitely fast wherever $\\delta S \\neq 0$, so neighbouring paths interfere destructively and cancel — *except* where $\\delta S[\\eta]=0$ for all $\\eta$, i.e. on paths satisfying the Euler–Lagrange equation. These stationary paths add coherently and dominate. The Gaussian $\\delta^2 S$ term gives the one-loop (van Vleck) prefactor; higher terms are quantum corrections. Classical mechanics is thus the leading saddle of the quantum sum — the deepest justification of the action principle.`,
      },
    },
  ],
  connections: [
    { toId: 'newton-second', relationship: 'reproduces, for $L=T-V$, the dynamics of' },
    { toId: 'derivative', relationship: 'generalizes to functionals the notion of vanishing derivative from' },
    { toId: 'maxwell', relationship: 'is derived from a Lagrangian density for the fields of' },
    { toId: 'einstein-field', relationship: 'follows from varying the Einstein–Hilbert action, giving' },
  ],
  viz: {
    component: 'Brachistochrone',
    kind: 'interactive',
    defaultParams: { },
    caption: 'Compare descent times of different ramps between two points; the cycloid found by Euler–Lagrange beats the straight line and every other curve.',
    whatToTry: [
      'Race a straight ramp against the cycloid and watch the cycloid win.',
      'Try a steep-then-flat curve — fast start, slow finish.',
      'Note the fastest path dips *below* the straight line.',
    ],
  },
  primarySources: [
    {
      authors: 'L. Euler',
      title: 'Methodus inveniendi lineas curvas maximi minimive proprietate gaudentes',
      venue: 'Lausanne & Geneva',
      year: 1744,
      note: 'founds the calculus of variations',
      primary: true,
    },
    {
      authors: 'J.-L. Lagrange',
      title: 'Mécanique analytique',
      venue: 'Paris',
      year: 1788,
      note: 'reformulates mechanics on the variational principle',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'I. M. Gelfand & S. V. Fomin', title: 'Calculus of Variations', venue: 'Dover', year: 2000 },
    { authors: 'V. I. Arnold', title: 'Mathematical Methods of Classical Mechanics', venue: 'Springer', year: 1989 },
  ],
  historyNote: `The subject was lit by a challenge: in 1696 Johann Bernoulli publicly dared Europe's mathematicians to find the **brachistochrone**, the curve of fastest descent. Newton, sent the problem, reportedly solved it overnight and submitted anonymously — Bernoulli recognized him "as the lion is known by his claw." The answer is a cycloid.

Euler systematized such problems into the calculus of variations (1744); the young Lagrange then sent Euler a far slicker, purely analytic method (the "δ-calculus") in 1755. Euler generously held back his own work so the teenager could publish first, and coined the name. Lagrange's *Mécanique analytique* (1788) boasted of containing not a single diagram — mechanics had become pure analysis.`,
};

export default eulerLagrange;
