import type { Equation } from '../types';

const waveEquation: Equation = {
  id: 'wave-equation',
  name: 'The Wave Equation',
  nickname: 'the equation of everything that ripples',
  canonicalLatex: '\\dfrac{\\partial^2 u}{\\partial t^2} = c^2\\dfrac{\\partial^2 u}{\\partial x^2}',
  canonicalAlt:
    'the second partial derivative of u with respect to t equals c squared times the second partial derivative of u with respect to x',
  alternativeForms: [
    { latex: '\\partial_t^2 u = c^2\\nabla^2 u', label: 'in three dimensions' },
    { latex: 'u(x,t) = f(x-ct) + g(x+ct)', label: "d'Alembert's general 1-D solution" },
    { latex: '\\Box u = 0', label: 'with the d’Alembertian operator (relativistic)' },
  ],
  fields: ['pde', 'physics'],
  era: { display: '1746', sortKey: 1746 },
  discoverers: [
    { name: "Jean le Rond d'Alembert", note: 'derived the vibrating-string equation, 1746' },
    { name: 'Euler & Daniel Bernoulli', note: 'solutions and the superposition of modes' },
  ],
  oneLine: 'A single equation governing how disturbances — on strings, in air, in light — travel at a fixed speed.',
  significance:
    'The wave equation is the universal template for propagation: the same second-order PDE describes a plucked string, sound, water ripples, seismic waves, and electromagnetic radiation. Its solutions introduced normal modes and superposition (the seed of Fourier analysis and of quantum states), and its Lorentz-invariant form pointed directly at special relativity. It is the prototype of a hyperbolic PDE, with a finite signal speed and clean causal structure.',
  applications: [
    'Musical instruments (string and wind), acoustics, room design',
    'Seismology and medical/industrial ultrasound imaging',
    'Electromagnetic and optical wave propagation (antennas, fiber)',
    'Numerical wave simulation in engineering and graphics',
  ],
  symbols: [
    { symbol: 'u', name: 'displacement / field', meaning: 'the disturbance (string height, pressure, field strength)', units: 'varies (e.g. m)' },
    { symbol: 't', name: 'time', meaning: 'the time coordinate', units: 's' },
    { symbol: 'x', name: 'position', meaning: 'the spatial coordinate (1-D)', units: 'm' },
    { symbol: 'c', name: 'wave speed', meaning: 'speed at which disturbances propagate', units: 'm/s' },
    { symbol: '\\nabla^2', name: 'Laplacian', meaning: 'sum of second spatial derivatives (curvature in space)', units: '1/m²' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Pluck a string, drop a stone in a pond, shout across a canyon — the same simple law tells the ripple how to travel.',
      equationForms: [{ latex: '\\partial_t^2 u = c^2\\,\\partial_x^2 u', caption: 'how a ripple’s shape steers its own motion' }],
      body: `Flick one end of a long rope and a hump races to the other end. Drop a pebble and rings spread across the pond. Speak, and your voice crosses the room. These look like utterly different events, yet a single equation governs them all — the wave equation.

Its idea is wonderfully local. At every point, the wave just asks: "how curved am I right here?" Where the rope is sharply bent, it snaps back hard; where it's straight, it's left alone. That tug-of-war between curvature and motion, repeated everywhere, makes a shape *travel* — at a fixed speed $c$ set by the medium (how taut the rope, how stiff the air).

The same template describes light and radio waves. When physicists found that the speed $c$ in the light version was always the same no matter how you chased it, that single fact cracked open relativity.`,
      keyIdeas: [
        'One equation for strings, sound, water, and light.',
        'A wave’s local curvature drives how it accelerates.',
        'Disturbances travel at a fixed speed $c$ set by the medium.',
      ],
      glossedOver: 'We said "curvature drives motion." That is literally the second derivatives in the equation — made explicit at Level 2/3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The vertical acceleration of each bit of string is proportional to its curvature: $\\partial_t^2 u = c^2\\partial_x^2 u$, and waves of any shape travel at speed $c$.',
      equationForms: [
        { latex: '\\partial_t^2 u = c^2\\,\\partial_x^2 u' },
        { latex: 'u(x,t) = A\\sin\\!\\big(k x - \\omega t\\big),\\quad c = \\omega/k', caption: 'a travelling sine wave' },
      ],
      body: `Picture a tiny segment of a taut string at height $u(x,t)$. Its sideways **acceleration** is $\\partial_t^2 u$. The equation says this equals $c^2$ times the **curvature** $\\partial_x^2 u$: a bit of string that is bowed gets yanked toward straightness, harder the sharper the bend.

A pure sine wave $u = A\\sin(kx - \\omega t)$ solves it provided $\\omega = ck$, i.e. **speed = frequency × wavelength** ($c = f\\lambda$). The amplitude $A$ is the height, the wavelength $\\lambda = 2\\pi/k$ the distance between crests, and the frequency $f = \\omega/2\\pi$ the crests per second. On a string fixed at both ends, only certain wavelengths "fit" — the **standing-wave modes** (harmonics) that give an instrument its pitch and timbre. The visualization lets you set $c$ and pick a mode.`,
      keyIdeas: [
        'Acceleration ∝ curvature is the whole equation.',
        '$c = f\\lambda$ relates speed, frequency, and wavelength.',
        'Fixed ends ⇒ discrete standing-wave modes (harmonics).',
      ],
      workedExample: {
        prompt: 'A guitar string of length $L = 0.65\\,\\text{m}$ has wave speed $c = 260\\,\\text{m/s}$. What is its fundamental frequency?',
        solution: `The fundamental mode fits half a wavelength on the string: $\\lambda = 2L = 1.30\\,\\text{m}.$

$$f = \\frac{c}{\\lambda} = \\frac{260}{1.30} = 200\\ \\text{Hz}.$$

Roughly the pitch of the G below middle C. Pressing a fret shortens $L$, raising $f$ — exactly how a guitar plays different notes.`,
      },
      misconceptions: [
        {
          claim: 'A wave carries the medium along with it.',
          correction:
            'No — the rope, water, or air mostly stays put and just oscillates in place; what travels is the *pattern* (and its energy). A floating cork bobs but doesn’t ride the wave to shore.',
        },
      ],
      glossedOver: 'We guessed sine solutions. That *every* solution is a sum of such modes (Fourier) and travels as left/right movers is Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'd’Alembert’s solution $u = f(x-ct)+g(x+ct)$ shows any 1-D wave splits into right- and left-movers; separation of variables gives the Fourier mode expansion.',
      equationForms: [
        { latex: 'u(x,t) = f(x-ct) + g(x+ct)', caption: "d'Alembert: superposed travelling waves" },
        { latex: 'u(x,t) = \\sum_n \\sin\\frac{n\\pi x}{L}\\big(a_n\\cos\\omega_n t + b_n\\sin\\omega_n t\\big)' },
      ],
      body: `Factor the operator: $\\partial_t^2 - c^2\\partial_x^2 = (\\partial_t - c\\partial_x)(\\partial_t + c\\partial_x)$. This immediately yields **d'Alembert's solution** $u = f(x-ct) + g(x+ct)$ — an arbitrary right-moving shape plus an arbitrary left-moving shape, determined by the initial displacement and velocity. The characteristics $x \\pm ct = \\text{const}$ carry the data; signals propagate at exactly $c$, never faster (finite speed of propagation, **causality**).

On a finite domain with boundary conditions, **separation of variables** gives standing modes $\\sin(n\\pi x/L)$ with frequencies $\\omega_n = n\\pi c/L$, and any motion is a superposition of them — historically the very problem that forced the question "can any function be a Fourier series?" Energy $E = \\tfrac12\\int(\\partial_t u)^2 + c^2(\\partial_x u)^2\\,dx$ is conserved. In higher dimensions the solution depends sharply on dimension: clean, sharp wavefronts in 3-D (Huygens' principle holds) but lingering "tails" in 2-D.`,
      keyIdeas: [
        'Operator factors ⇒ d’Alembert’s left/right movers; characteristics $x\\pm ct$.',
        'Finite signal speed $c$ ⇒ strict causality.',
        'Bounded domains ⇒ Fourier mode superposition; energy conserved.',
      ],
      workedExample: {
        prompt: 'An infinite string is released from rest with initial shape $u(x,0)=\\phi(x)$, $\\partial_t u(x,0)=0$. Find $u(x,t)$.',
        solution: `d'Alembert with zero initial velocity forces $f = g$. Matching $u(x,0)=f(x)+g(x)=\\phi(x)$ gives $f=g=\\tfrac12\\phi$, so

$$u(x,t) = \\tfrac12\\big[\\phi(x-ct) + \\phi(x+ct)\\big].$$

The initial bump splits into two half-height copies travelling in opposite directions at speed $c$ — exactly what you see when you pluck a string at its center and release it.`,
      },
      glossedOver: 'We treated $c$ as a fixed property of the medium. That the *light* wave equation gives the same $c$ in every frame is the relativistic Level 4/5 twist.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'As a hyperbolic PDE the wave equation has a Lorentz-invariant form $\\Box u = 0$; its symmetry group is the Poincaré group, and its Green’s function encodes retarded causality.',
      equationForms: [
        { latex: '\\Box u = \\Big(\\tfrac{1}{c^2}\\partial_t^2 - \\nabla^2\\Big)u = 0', caption: 'the d’Alembertian (note the relative minus sign)' },
        { latex: 'G_{\\text{ret}}(\\vec r,t) = \\dfrac{\\delta(t - r/c)}{4\\pi r}', caption: 'retarded Green’s function in 3-D' },
      ],
      body: `Write the operator as the **d'Alembertian** $\\Box = c^{-2}\\partial_t^2 - \\nabla^2$. Crucially its signature is $(+,-,-,-)$ — the *minus* sign between time and space, unlike the all-plus Laplacian of equilibrium problems. The symmetries that leave $\\Box$ invariant are exactly the **Lorentz/Poincaré transformations**: the wave equation already "knows" special relativity, which is why Maxwell's wave equation has a frame-independent $c$. This is hyperbolic PDE theory: well-posed Cauchy problem, domains of dependence/influence bounded by light cones, and finite propagation speed.

Driven problems use the **retarded Green's function** $G_{\\text{ret}} = \\delta(t - r/c)/4\\pi r$: the field at a point now is the source as it was one light-travel-time ago — the mathematical statement of causal radiation, underlying antennas and the Liénard–Wiechert potentials. Numerically, explicit schemes must respect the **CFL condition** ($c\\,\\Delta t \\le \\Delta x$) or blow up, a direct echo of the physical signal speed. Dispersion ($\\omega(k)$ nonlinear), dissipation, and boundary reflections are the practitioner's daily concerns.`,
      keyIdeas: [
        '$\\Box u=0$ is Lorentz-invariant; the wave equation encodes relativity.',
        'Hyperbolic PDE: light-cone domains of dependence, finite speed.',
        'Retarded Green’s function = causal radiation; numerics need CFL stability.',
      ],
      workedExample: {
        prompt: 'Show the 1-D wave equation is invariant under a Lorentz boost but not a Galilean one.',
        solution: `Under a **Galilean** boost $x' = x - vt,\\ t'=t$, the chain rule gives cross terms $\\partial_t^2 \\to (\\partial_{t'} - v\\partial_{x'})^2$, which introduces $-2v\\,\\partial_{t'}\\partial_{x'}$ and changes the effective speed — the equation is *not* invariant, predicting a frame-dependent $c$.

Under a **Lorentz** boost $x'=\\gamma(x-vt),\\ t'=\\gamma(t-vx/c^2)$, the operator $c^{-2}\\partial_t^2 - \\partial_x^2$ transforms into itself (it equals $c^{-2}\\partial_{t'}^2 - \\partial_{x'}^2$). So $c$ is the same in every frame. The clash between Maxwell's wave equation and Galilean relativity is exactly what Einstein resolved in 1905.`,
      },
      glossedOver: 'Linear superposition fails once the medium responds nonlinearly; solitons and shocks (KdV, Burgers) are the Level 5 nonlinear cousins.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The wave equation is the linear, flat-space archetype; curved-space, nonlinear, and quantum generalizations (geometric wave equations, hyperbolic systems, QFT propagators) are where the modern action is.',
      equationForms: [
        { latex: '\\Box_g u = \\frac{1}{\\sqrt{-g}}\\partial_\\mu\\big(\\sqrt{-g}\\,g^{\\mu\\nu}\\partial_\\nu u\\big) = 0', caption: 'wave equation on a curved spacetime' },
        { latex: '\\langle 0|T\\,\\phi(x)\\phi(y)|0\\rangle = \\Delta_F(x-y)', caption: 'Feynman propagator (quantized field)' },
      ],
      body: `Generalized to a curved metric, $\\Box_g u = 0$ governs scalar fields, gravitational-wave perturbations, and the propagation of light in general relativity; its characteristics are the null geodesics (light cones of curved spacetime). The rigorous theory of such **geometric/quasilinear wave equations** — energy estimates, Strichartz inequalities, and the global existence/stability program — is central to modern PDE and to mathematical relativity (e.g. the nonlinear stability of Minkowski space, Christodoulou–Klainerman). Hyperbolic *systems* (Maxwell, Einstein in harmonic gauge, elastodynamics) inherit this structure, and well-posedness is established via symmetric-hyperbolic theory.

Quantizing the field, the same operator's Green's functions become the **propagators** of QFT: the Feynman propagator $\\Delta_F$ is the time-ordered two-point function, and its poles at $\\omega = c|\\vec k|$ are the on-shell, massless quanta — photons. A mass term promotes it to the **Klein–Gordon** equation $(\\Box + m^2)u = 0$ with massive quanta. Nonlinearity opens the richest behaviour: solitons (sine-Gordon, KdV), wave turbulence, blow-up, and shock formation. The plucked string is the simplest member of a family that reaches from concert halls to the detection of merging black holes.`,
      keyIdeas: [
        'Curved-space $\\Box_g u=0$: characteristics are null geodesics; basis of GR wave theory.',
        'Quantization turns the Green’s function into the QFT propagator (photons, Klein–Gordon).',
        'Nonlinear wave equations host solitons, turbulence, blow-up — the active PDE frontier.',
      ],
      workedExample: {
        prompt: 'Show that adding a mass term gives the Klein–Gordon dispersion relation, and identify its rest energy.',
        solution: `For $(\\Box + m^2)u = 0$ with $\\Box = c^{-2}\\partial_t^2 - \\nabla^2$, substitute a plane wave $u \\propto e^{i(\\vec k\\cdot\\vec x - \\omega t)}$:

$$-\\frac{\\omega^2}{c^2} + k^2 + m^2 = 0 \\;\\Rightarrow\\; \\omega^2 = c^2 k^2 + c^2 m^2.$$

Restoring constants ($m \\to mc/\\hbar$), this is $E^2 = (pc)^2 + (mc^2)^2$ — the relativistic energy–momentum relation, with rest energy $mc^2$ at $\\vec k=0$. The massless wave equation ($m=0$) gives $\\omega = ck$, the lightlike dispersion of photons. The humble vibrating string and the relativistic particle are the same equation with and without a mass term.`,
      },
    },
  ],
  connections: [
    { toId: 'maxwell', relationship: 'is derived as the wave equation for the fields of' },
    { toId: 'fourier', relationship: 'is solved by the mode superposition of' },
    { toId: 'schrodinger', relationship: 'shares wave structure but is first-order in time, unlike' },
    { toId: 'kdv', relationship: 'is the linear limit of the nonlinear wave dynamics in' },
  ],
  viz: {
    component: 'WaveString',
    kind: 'interactive',
    defaultParams: { c: 1, mode: 2 },
    caption: 'A 1-D string fixed at both ends: choose a standing-wave mode or a pluck shape and watch u(x,t) evolve, with nodes and antinodes marked.',
    whatToTry: [
      'Step through modes n = 1, 2, 3 and count the nodes.',
      'Increase c and watch the same mode oscillate faster.',
      'Pluck the string and see the shape split into travelling halves.',
    ],
  },
  primarySources: [
    {
      authors: "J. d'Alembert",
      title: 'Recherches sur la courbe que forme une corde tendue mise en vibration',
      venue: 'Mémoires de l’Académie de Berlin',
      year: 1747,
      note: 'derivation of the vibrating-string equation and its general solution',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'L. C. Evans', title: 'Partial Differential Equations (Ch. 2)', venue: 'American Mathematical Society', year: 2010 },
    { authors: 'G. B. Whitham', title: 'Linear and Nonlinear Waves', venue: 'Wiley', year: 1974 },
  ],
  historyNote: `The vibrating string sparked one of the great controversies of 18th-century mathematics. d'Alembert (1746) found the general solution $f(x-ct)+g(x+ct)$ but insisted the initial shape be a single smooth formula. Euler argued any drawn curve should be allowed; Daniel Bernoulli claimed every vibration is a sum of sinusoidal modes. Their decades-long debate over "what is a function?" and whether arbitrary shapes have sine-series — unresolved at the time — directly seeded Fourier's analysis and the modern definition of a function.

Much later, the constancy of $c$ in the *electromagnetic* wave equation, irreconcilable with Galilean relativity, was the crack through which Einstein's 1905 special relativity emerged.`,
};

export default waveEquation;
