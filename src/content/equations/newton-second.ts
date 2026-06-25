import type { Equation } from '../types';

const newtonSecond: Equation = {
  id: 'newton-second',
  name: "Newton's Second Law",
  nickname: 'the equation of motion',
  canonicalLatex: '\\vec F = m\\vec a',
  canonicalAlt: 'vector F equals m times vector a',
  alternativeForms: [
    { latex: '\\vec F = \\dfrac{d\\vec p}{dt}', label: 'the form Newton actually wrote (rate of change of momentum)' },
    { latex: '\\vec a = \\dfrac{\\vec F}{m}', label: 'solved for acceleration' },
    { latex: 'm\\ddot{\\vec x} = \\vec F(\\vec x, \\dot{\\vec x}, t)', label: 'as a second-order ODE' },
  ],
  fields: ['mechanics', 'physics'],
  era: { display: '1687', sortKey: 1687 },
  discoverers: [{ name: 'Isaac Newton', note: 'Philosophiæ Naturalis Principia Mathematica, 1687' }],
  oneLine: 'Force equals mass times acceleration — the rule that turns causes (forces) into motion.',
  significance:
    'Newton’s second law is the prototype of a physical law as a differential equation: specify the forces, and the future motion is determined. It launched deterministic, predictive science — the same law sends a cannonball downrange and a spacecraft to Saturn. It defines what we mean by force and (inertial) mass, and it remains the working tool of engineering even though relativity and quantum mechanics bound its domain.',
  applications: [
    'Engineering structures, vehicles, and machines (statics and dynamics)',
    'Spaceflight trajectories and rocket motion',
    'Predicting collisions, recoil, and impulse',
    'The basis of nearly all classical simulation (game physics, FEA)',
  ],
  symbols: [
    { symbol: '\\vec F', name: 'net force', meaning: 'vector sum of all forces acting on the body', units: 'N = kg·m/s²' },
    { symbol: 'm', name: 'mass', meaning: 'inertial mass — resistance to acceleration', units: 'kg' },
    { symbol: '\\vec a', name: 'acceleration', meaning: 'rate of change of velocity', units: 'm/s²' },
    { symbol: '\\vec p', name: 'momentum', meaning: 'mass times velocity, m·v', units: 'kg·m/s' },
    { symbol: 't', name: 'time', meaning: 'the independent variable of motion', units: 's' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Push something and it speeds up; push harder, or push something lighter, and it speeds up more. That’s the whole law.',
      equationForms: [{ latex: '\\vec F = m\\vec a', caption: 'push = heaviness × how fast it speeds up' }],
      body: `Imagine shoving a shopping cart. Push gently and it eases forward; shove hard and it lurches. Now fill it with bricks: the same shove barely budges it. That everyday experience *is* Newton's second law.

The law ties together three things: the **push** (force), the **heaviness** (mass), and the **change in motion** (acceleration — speeding up, slowing down, or turning). More force makes more acceleration; more mass makes less. That's it — and yet this single sentence lets us aim cannonballs, design bridges, and fly probes across the solar system.

The quiet revolution was the idea that motion follows an exact rule at all. Before Newton, the heavens and the earth obeyed different, vague principles. After him, one equation governed both.`,
      keyIdeas: [
        'More force → more acceleration; more mass → less.',
        'Force changes motion; it isn’t needed to *maintain* steady motion.',
        'One rule governs everything from carts to planets.',
      ],
      glossedOver: 'We said "push." Forces also include gravity, friction, and tension — and it is the *net* (total) force that matters. Made precise at Level 2.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The net force on an object equals its mass times its acceleration, $F = ma$, as a vector equation — direction matters.',
      equationForms: [{ latex: '\\vec F_{\\text{net}} = m\\vec a' }],
      body: `Add up all the forces on an object — gravity, the normal force from a surface, friction, applied pushes — as **vectors** (with direction). Their sum is the net force $\\vec F_{\\text{net}}$, and it equals $m\\vec a$. If the forces balance, $\\vec a = 0$: the object stays at rest or coasts at constant velocity (that's the first law, a special case).

Because it's a vector equation, you can break it into directions and solve each separately. On a ramp, splitting gravity into "along the slope" and "into the slope" components is the standard trick. The unit of force, the **newton**, is defined so that $1\\text{ N}$ accelerates $1\\text{ kg}$ at $1\\text{ m/s}^2$.`,
      keyIdeas: [
        'Use the *net* force — add forces as vectors.',
        'Balanced forces ⇒ no acceleration (constant velocity).',
        'Resolve into components and solve direction by direction.',
      ],
      workedExample: {
        prompt: 'A $1200\\text{ kg}$ car accelerates from rest to $27\\text{ m/s}$ in $9\\text{ s}$. What net force does that require?',
        solution: `Acceleration: $a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{27\\text{ m/s}}{9\\text{ s}} = 3\\text{ m/s}^2.$

Net force: $F = ma = 1200\\text{ kg}\\times 3\\text{ m/s}^2 = 3600\\text{ N}.$

(The engine must supply this *plus* whatever is needed to overcome drag and friction, since only the net force enters $F=ma$.)`,
      },
      misconceptions: [
        {
          claim: 'A moving object must have a force pushing it along.',
          correction:
            'No. With no net force an object keeps moving at constant velocity forever (Newton’s first law). Force is needed to *change* motion, not sustain it — the intuition that motion needs a push comes from ever-present friction.',
        },
      ],
      glossedOver: 'We treated mass as fixed. Newton’s own form uses momentum $\\vec p = m\\vec v$, which matters when mass changes (rockets) — Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The fundamental form is $\\vec F = d\\vec p/dt$; with constant mass this is $m\\vec a$. As a 2nd-order ODE it makes mechanics an initial-value problem.',
      equationForms: [
        { latex: '\\vec F = \\frac{d\\vec p}{dt} = \\frac{d(m\\vec v)}{dt}' },
        { latex: 'm\\ddot{\\vec x} = \\vec F(\\vec x,\\dot{\\vec x},t)', caption: 'an initial-value problem' },
      ],
      body: `Newton stated the law as "the change of motion is proportional to the force": $\\vec F = d\\vec p/dt$ with $\\vec p = m\\vec v$. When $m$ is constant this reduces to $\\vec F = m\\vec a$; when it isn't (a rocket ejecting fuel), the product rule gives extra thrust terms.

Written as $m\\ddot{\\vec x} = \\vec F(\\vec x,\\dot{\\vec x},t)$, it is a second-order ODE: given the **initial position and velocity**, the trajectory is determined (existence/uniqueness for smooth forces). This is mathematical determinism. Integrating the law gives the **impulse–momentum** theorem $\\int \\vec F\\,dt = \\Delta\\vec p$ and, dotting with velocity, the **work–energy** theorem $\\int \\vec F\\cdot d\\vec x = \\Delta(\\tfrac12 m v^2)$. The law is only valid in **inertial frames**; in rotating or accelerating frames one adds fictitious forces (centrifugal, Coriolis).`,
      keyIdeas: [
        'Momentum form $\\vec F=d\\vec p/dt$ is primary; $m\\vec a$ is the constant-mass case.',
        'Second-order ODE ⇒ motion fixed by initial position and velocity.',
        'Impulse–momentum and work–energy theorems are integrals of the law.',
        'Valid only in inertial frames (else add fictitious forces).',
      ],
      workedExample: {
        prompt: 'Derive the rocket equation by applying $\\vec F = d\\vec p/dt$ to a rocket ejecting mass at exhaust speed $u$.',
        solution: `Consider the rocket+fuel system in free space ($\\vec F_{\\text{ext}}=0$), so total momentum is conserved. In time $dt$ the rocket (mass $m$) ejects $dm_{\\text{fuel}} = -dm$ at speed $u$ relative to itself. Momentum balance gives

$$m\\,dv = -u\\,dm.$$

Integrating from $m_0$ to $m_f$:

$$\\Delta v = u\\ln\\frac{m_0}{m_f}\\quad(\\text{Tsiolkovsky}).$$

The logarithm is why reaching orbit demands enormous fuel-to-payload ratios — a direct consequence of the momentum form of the second law.`,
      },
      glossedOver: 'We posited the forces. Lagrangian/Hamiltonian mechanics *derive* the equations of motion from a single scalar — the Euler–Lagrange route at Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Newton’s law is equivalent to the Euler–Lagrange and Hamilton equations; the variational and phase-space formulations expose symmetries, conservation laws, and the path to chaos and quantization.',
      equationForms: [
        { latex: '\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot q} - \\frac{\\partial L}{\\partial q} = 0', caption: 'Euler–Lagrange (L = T − V)' },
        { latex: '\\dot q = \\frac{\\partial H}{\\partial p},\\quad \\dot p = -\\frac{\\partial H}{\\partial q}', caption: 'Hamilton’s equations' },
      ],
      body: `For conservative forces $\\vec F = -\\nabla V$, Newton's law is exactly the **Euler–Lagrange** equation for $L = T - V$; the variational principle $\\delta\\int L\\,dt = 0$ reproduces $m\\ddot{\\vec x} = -\\nabla V$ in any coordinates, automatically handling constraints (generalized coordinates) without bookkeeping forces of constraint. **Noether's theorem** then ties each continuous symmetry to a conserved quantity: time-translation ↦ energy, space-translation ↦ momentum, rotation ↦ angular momentum.

Passing to the **Hamiltonian** $H(q,p)$ via Legendre transform gives first-order flow on phase space, the natural arena for dynamical-systems theory: Liouville's theorem (phase-space volume conservation), integrability vs. **chaos** (KAM, Lyapunov exponents), and canonical perturbation theory. This formulation is also the launchpad for quantization — Poisson brackets become commutators, and Hamilton–Jacobi theory anticipates the Schrödinger equation. Newton's $F=ma$ is the tip of this structure; everything in classical mechanics is a re-encoding of it.`,
      keyIdeas: [
        'Conservative Newton ⇔ Euler–Lagrange for $L=T-V$ (any coordinates, constraints free).',
        'Noether: symmetries ↦ conserved energy, momentum, angular momentum.',
        'Hamiltonian flow on phase space ⇒ Liouville, integrability/chaos, and quantization.',
      ],
      workedExample: {
        prompt: 'For a 1-D particle with $L = \\tfrac12 m\\dot x^2 - V(x)$, recover Newton’s law and identify the conserved energy.',
        solution: `Euler–Lagrange: $\\dfrac{d}{dt}\\dfrac{\\partial L}{\\partial \\dot x} - \\dfrac{\\partial L}{\\partial x} = 0$ gives

$$m\\ddot x + V'(x) = 0 \\;\\Rightarrow\\; m\\ddot x = -V'(x) = F.$$

Since $L$ has no explicit $t$, the Hamiltonian $H = \\dot x\\,\\partial L/\\partial\\dot x - L = \\tfrac12 m\\dot x^2 + V(x)$ is conserved — total energy. Time-translation symmetry ↦ energy conservation, exactly as Noether predicts.`,
      },
      glossedOver: 'All this is non-relativistic and classical; the domain limits (high speed, small action) are the Level 5 boundary.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Newtonian dynamics is the low-velocity, large-action, weak-field limit of deeper theories; its status as the geodesic/stationary-phase limit clarifies exactly where and why it holds.',
      equationForms: [
        { latex: '\\frac{dp^\\mu}{d\\tau} = F^\\mu,\\quad p^\\mu = m\\,u^\\mu', caption: 'relativistic (4-vector) generalization' },
        { latex: '\\langle x\\rangle\\,\\text{ obeys }\\, m\\,\\ddot{\\langle x\\rangle} = -\\langle \\nabla V\\rangle', caption: 'Ehrenfest’s theorem (classical limit of QM)' },
      ],
      body: `$F=ma$ is an effective law sitting inside larger structures, and the modern view is about its **limits**. Special relativity replaces it with the 4-vector law $dp^\\mu/d\\tau = F^\\mu$, recovering $m\\vec a$ only for $v\\ll c$; the inertial mass becomes frame-dependent through $\\gamma$. In general relativity, force-free motion is **geodesic** motion in curved spacetime, and Newtonian gravity emerges in the weak-field, slow-motion limit of the geodesic equation — gravity is not a Newtonian force at all.

Quantum mechanically, **Ehrenfest's theorem** shows expectation values obey $m\\,\\ddot{\\langle x\\rangle} = -\\langle\\nabla V\\rangle$, so classical trajectories are the mean behaviour of wavepackets; more sharply, the classical path is the **stationary-phase** limit of the Feynman path integral as $\\hbar\\to 0$ — the variational principle of Level 4 is the leading saddle. There are also live foundational subtleties even classically: non-uniqueness of solutions when forces aren't Lipschitz (Norton's dome), the self-force/radiation-reaction problem (Abraham–Lorentz–Dirac), and the measure-zero-but-real failures of determinism. $F=ma$ is extraordinarily accurate where it applies, and modern physics is largely the precise charting of its borders.`,
      keyIdeas: [
        'Relativistic law $dp^\\mu/d\\tau = F^\\mu$ reduces to $m\\vec a$ for $v\\ll c$.',
        'In GR, free motion is geodesic; Newtonian gravity is the weak-field limit.',
        'Ehrenfest / stationary-phase: classical trajectories are the $\\hbar\\to0$ limit of quantum amplitudes.',
      ],
      workedExample: {
        prompt: 'Show the relativistic equation of motion reduces to $F=ma$ for small speeds.',
        solution: `With $\\vec p = \\gamma m\\vec v$, $\\gamma=(1-v^2/c^2)^{-1/2}$, the spatial law is $\\vec F = \\dfrac{d}{dt}(\\gamma m \\vec v)$.

For $v\\ll c$, $\\gamma \\approx 1 + \\tfrac12 v^2/c^2 \\to 1$, so $\\vec F \\approx m\\,d\\vec v/dt = m\\vec a$. The leading correction is $O(v^2/c^2)$: at $0.1c$ it is about $1\\%$, which is why Newton sufficed for centuries of terrestrial and planetary mechanics but fails for particle accelerators and GPS-level precision.`,
      },
    },
  ],
  connections: [
    { toId: 'gravitation', relationship: 'supplies the force that, fed into, gives orbital motion via' },
    { toId: 'euler-lagrange', relationship: 'is equivalent for conservative forces to' },
    { toId: 'mass-energy', relationship: 'is the low-speed limit of the relativistic dynamics behind' },
    { toId: 'schrodinger', relationship: 'emerges as the classical (Ehrenfest) limit of' },
  ],
  viz: {
    component: 'ForceMassAccel',
    kind: 'interactive',
    defaultParams: { force: 10, mass: 2 },
    caption: 'Set a force and a mass and watch the resulting acceleration push a block across the screen; the a = F/m readout updates live.',
    whatToTry: [
      'Double the force and watch acceleration double.',
      'Double the mass at fixed force and watch acceleration halve.',
      'Set the net force to zero — the block coasts at constant velocity.',
    ],
  },
  primarySources: [
    {
      authors: 'I. Newton',
      title: 'Philosophiæ Naturalis Principia Mathematica',
      venue: 'London (Royal Society)',
      year: 1687,
      note: 'states the three laws of motion',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'D. Kleppner & R. Kolenkow', title: 'An Introduction to Mechanics', venue: 'Cambridge University Press', year: 2014 },
    { authors: 'H. Goldstein, C. Poole & J. Safko', title: 'Classical Mechanics', venue: 'Addison-Wesley', year: 2002 },
  ],
  historyNote: `Newton wrote the Principia in a frenzied ~18 months after Edmond Halley (of comet fame) visited and asked what curve a planet would follow under an inverse-square force — Newton replied "an ellipse," having worked it out years earlier but lost the proof. Halley funded and shepherded the book's publication.

Newton's own statement was about change of "motion" (momentum), not the modern $F=ma$, which crystallized later (Euler gave it in this algebraic form). The conceptual leap was profound: the same law governs an apple and the Moon, abolishing the ancient divide between terrestrial and celestial physics.`,
};

export default newtonSecond;
