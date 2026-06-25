import type { Equation } from '../types';

const einsteinField: Equation = {
  id: 'einstein-field',
  name: 'Einstein Field Equations',
  nickname: 'spacetime tells matter how to move; matter tells spacetime how to curve',
  canonicalLatex: 'G_{\\mu\\nu}+\\Lambda g_{\\mu\\nu}=\\dfrac{8\\pi G}{c^4}T_{\\mu\\nu}',
  canonicalAlt:
    'G mu nu plus capital-lambda g mu nu equals eight pi G over c to the fourth, times T mu nu',
  alternativeForms: [
    { latex: 'R_{\\mu\\nu} - \\tfrac12 R\\,g_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\dfrac{8\\pi G}{c^4}T_{\\mu\\nu}', label: 'with the Ricci tensor and scalar spelled out' },
    { latex: 'R_{\\mu\\nu} = 0', label: 'vacuum equations (no matter, Λ = 0)' },
  ],
  fields: ['relativity', 'physics'],
  era: { display: '1915', sortKey: 1915 },
  discoverers: [
    { name: 'Albert Einstein', note: 'field equations of general relativity, Nov 1915' },
    { name: 'David Hilbert', note: 'derived the action nearly simultaneously' },
  ],
  oneLine: 'Gravity is not a force but the curvature of spacetime, shaped by everything that carries energy.',
  significance:
    'General relativity replaced Newton’s force of gravity with the geometry of spacetime: mass and energy curve spacetime, and objects follow the straightest available paths through that curvature. It predicts gravitational lensing, black holes, the expansion of the universe, and gravitational waves — all confirmed — and is essential to GPS. It remains our best theory of gravity and the framework for cosmology.',
  applications: [
    'GPS timing corrections (without GR, positions drift kilometers/day)',
    'Cosmology: Big Bang, expansion, dark energy (the Λ term)',
    'Black holes, gravitational lensing, and gravitational-wave astronomy',
    'Precision tests: Mercury’s perihelion, light bending, frame dragging',
  ],
  symbols: [
    { symbol: 'G_{\\mu\\nu}', name: 'Einstein tensor', meaning: 'encodes spacetime curvature relevant to gravity', units: '1/m²' },
    { symbol: 'g_{\\mu\\nu}', name: 'metric tensor', meaning: 'defines distances and times — the geometry itself', units: 'dimensionless' },
    { symbol: 'T_{\\mu\\nu}', name: 'stress–energy tensor', meaning: 'density and flux of energy and momentum (the source)', units: 'J/m³' },
    { symbol: '\\Lambda', name: 'cosmological constant', meaning: 'vacuum energy / dark energy term', units: '1/m²' },
    { symbol: 'R_{\\mu\\nu}', name: 'Ricci tensor', meaning: 'a contraction of the full curvature tensor', units: '1/m²' },
    { symbol: 'R', name: 'Ricci scalar', meaning: 'the fully contracted scalar curvature', units: '1/m²' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Gravity isn’t a pull — it’s a dent. Heavy things curve the fabric of space and time, and everything else just rolls along the curves.',
      equationForms: [{ latex: '\\text{matter} \\Rightarrow \\text{curved spacetime} \\Rightarrow \\text{motion}', caption: 'the two-way conversation of gravity' }],
      body: `Picture a heavy bowling ball on a stretched trampoline. It sags the surface, and a marble rolled nearby spirals inward — not because the ball "pulls" it, but because the *surface itself* is curved. Einstein's staggering idea is that gravity works exactly like this, but the thing that bends is **spacetime** — the combined fabric of space and time.

The Sun doesn't reach out and grab the Earth. Instead, the Sun's mass curves the spacetime around it, and the Earth simply follows the straightest possible path through that curved geometry — which happens to be an orbit. Drop an apple and it falls because Earth has dented spacetime.

This view makes wild predictions, all confirmed: light bends as it passes the Sun, time runs slower near heavy objects (your phone's GPS corrects for it), space can stretch (the universe expands), and collapsed stars can dent spacetime so deeply that not even light escapes — black holes.`,
      keyIdeas: [
        'Gravity is curved spacetime, not a force pulling across a distance.',
        'Mass and energy do the curving; everything else follows the curves.',
        'It predicts black holes, an expanding universe, and bent light.',
      ],
      glossedOver: 'The trampoline is a 2-D cartoon of a 4-D reality, and it sneaks in gravity to make the marble roll — Level 3 gives the real geometry.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The left side describes how spacetime is curved; the right side is the energy and matter causing it. They are set equal — geometry equals its source.',
      equationForms: [{ latex: 'G_{\\mu\\nu} = \\dfrac{8\\pi G}{c^4}T_{\\mu\\nu}', caption: 'curvature = (constant) × energy' }],
      body: `Read the equation as a balance: the left side ($G_{\\mu\\nu}$) is a precise mathematical measure of **how curved spacetime is** at a point; the right side ($T_{\\mu\\nu}$) describes **all the energy and matter** there — mass, but also pressure, radiation, and motion. The equation says these are proportional: matter/energy curves spacetime exactly as much as the constant $\\dfrac{8\\pi G}{c^4}$ dictates.

That constant is fantastically tiny (because $c^4$ is enormous), which is why you need something as massive as a planet or star to curve spacetime noticeably. Objects then move along **geodesics** — the straightest possible paths in the curved geometry, the 4-D analog of "great circles" on a globe. An orbiting planet is going as straight as it can; it only *looks* curved because spacetime is.

The extra $\\Lambda$ term Einstein added represents a built-in energy of empty space — today identified with the **dark energy** accelerating the universe's expansion.`,
      keyIdeas: [
        'Left side = curvature; right side = energy/matter source.',
        'Objects follow geodesics — straightest paths in curved spacetime.',
        'Λ is the energy of empty space (dark energy).',
      ],
      workedExample: {
        prompt: 'GPS satellite clocks tick faster than ground clocks by about $38\\,\\mu\\text{s/day}$. Why, qualitatively, and what happens if ignored?',
        solution: `Two GR/SR effects combine: clocks higher in Earth's weaker spacetime curvature run *faster* (general relativity, $+45\\,\\mu\\text{s/day}$), while the satellite's orbital speed makes them run *slower* (special relativity, $-7\\,\\mu\\text{s/day}$). Net: $+38\\,\\mu\\text{s/day}$.

Light travels about $0.3\\,\\text{m}$ per nanosecond, so $38\\,\\mu\\text{s} = 38{,}000\\,\\text{ns}$ of un-corrected drift would cause position errors of

$$38{,}000\\,\\text{ns} \\times 0.3\\,\\text{m/ns} \\approx 11\\,\\text{km per day}.$$

GPS would be useless within minutes. The receivers carry Einstein's correction built in — general relativity in your pocket.`,
      },
      misconceptions: [
        {
          claim: 'Heavy objects "sit in" a pre-existing space and warp it like a ball on a sheet.',
          correction:
            'There is no separate space to sit in — spacetime *is* the geometry, and there is no preferred "down" the way the trampoline cartoon implies. Also, time curvature, not space curvature, dominates ordinary gravity.',
        },
      ],
      glossedOver: 'We treated $G_{\\mu\\nu}$ as "curvature." Its precise definition from the metric, and how geodesics arise, is Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The metric $g_{\\mu\\nu}$ defines geometry; curvature is built from its derivatives (Christoffel → Riemann → Ricci); geodesics extremize proper time; the Schwarzschild solution gives black holes.',
      equationForms: [
        { latex: 'ds^2 = g_{\\mu\\nu}\\,dx^\\mu dx^\\nu', caption: 'the metric sets all distances/times' },
        { latex: '\\frac{d^2 x^\\mu}{d\\tau^2} + \\Gamma^\\mu_{\\alpha\\beta}\\frac{dx^\\alpha}{d\\tau}\\frac{dx^\\beta}{d\\tau} = 0', caption: 'geodesic equation (free fall)' },
      ],
      body: `Everything starts with the **metric** $g_{\\mu\\nu}$, which generalizes Pythagoras to curved, 4-D spacetime: $ds^2 = g_{\\mu\\nu}dx^\\mu dx^\\nu$, with the relativistic signature giving time a minus sign. From its derivatives one builds the **Christoffel symbols** $\\Gamma$ (how coordinate axes twist), then the **Riemann tensor** (true, coordinate-independent curvature), then its contractions $R_{\\mu\\nu}$ and $R$. The Einstein tensor $G_{\\mu\\nu} = R_{\\mu\\nu} - \\tfrac12 R g_{\\mu\\nu}$ is the unique combination that is divergence-free, which guarantees local energy–momentum conservation $\\nabla_\\mu T^{\\mu\\nu} = 0$.

Free particles follow **geodesics**, paths that extremize proper time — the curved-spacetime version of Newton's first law (with $\\Gamma$ playing the role of the gravitational "force"). Solving the equations for a spherical mass gives the **Schwarzschild solution**, which predicts Mercury's perihelion precession and light bending, and contains an **event horizon** at $r_s = 2GM/c^2$ — a black hole. In the weak-field, slow-motion limit, $g_{00}\\approx -(1+2\\Phi/c^2)$ and the geodesic equation reproduces $\\ddot{\\vec x} = -\\nabla\\Phi$ — recovering Newtonian gravity.`,
      keyIdeas: [
        'Metric → Christoffel → Riemann → Ricci builds curvature from geometry.',
        '$G_{\\mu\\nu}$ is divergence-free, enforcing energy–momentum conservation.',
        'Schwarzschild solution ⇒ perihelion precession, light bending, black holes.',
      ],
      workedExample: {
        prompt: 'Find the Schwarzschild radius (event-horizon radius) of a black hole, and evaluate it for the Sun.',
        solution: `The Schwarzschild metric's $g_{tt}$ component vanishes (and $g_{rr}$ diverges) where the factor $1 - \\dfrac{2GM}{rc^2} = 0$, giving the horizon radius

$$r_s = \\frac{2GM}{c^2}.$$

For the Sun ($M = 2\\times10^{30}\\,\\text{kg}$):

$$r_s = \\frac{2(6.67\\times10^{-11})(2\\times10^{30})}{(3\\times10^8)^2} = \\frac{2.67\\times10^{20}}{9\\times10^{16}} \\approx 2960\\,\\text{m} \\approx 3\\,\\text{km}.$$

If the entire Sun were compressed within 3 km, it would become a black hole. (The Earth's $r_s$ is about 9 mm.)`,
      },
      glossedOver: 'We solved a static, symmetric case. The full nonlinear dynamics — gravitational waves and cosmology — is Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The equations are 10 coupled nonlinear PDEs derivable from the Einstein–Hilbert action; key solutions give cosmology (FLRW), gravitational waves, and the singularity theorems.',
      equationForms: [
        { latex: 'S = \\frac{c^4}{16\\pi G}\\int (R - 2\\Lambda)\\sqrt{-g}\\,d^4x + S_{\\text{matter}}', caption: 'Einstein–Hilbert action' },
        { latex: '\\Big(\\frac{\\dot a}{a}\\Big)^2 = \\frac{8\\pi G}{3}\\rho - \\frac{kc^2}{a^2} + \\frac{\\Lambda c^2}{3}', caption: 'Friedmann equation (cosmology)' },
      ],
      body: `The field equations follow from varying the **Einstein–Hilbert action** with respect to the metric (the Euler–Lagrange machinery applied to geometry) — Hilbert's route, obtained essentially simultaneously with Einstein's. They are 10 coupled, nonlinear, second-order PDEs for the metric, with the nonlinearity reflecting that gravitational energy itself gravitates; exact solutions are rare and precious (Schwarzschild, Kerr for rotating black holes, FLRW for cosmology).

Applying them to a homogeneous, isotropic universe gives the **Friedmann equations**, the foundation of modern cosmology — the Big Bang, the expansion history, and the role of $\\Lambda$ as dark energy driving acceleration. Linearizing about flat space yields **gravitational waves**: ripples $h_{\\mu\\nu}$ traveling at $c$, sourced by accelerating mass quadrupoles, detected by LIGO in 2015 from merging black holes. The **Penrose–Hawking singularity theorems** prove that, under reasonable energy conditions, gravitational collapse and the cosmological past inevitably produce singularities — places where the curvature and the classical theory break down. Numerical relativity now solves the full equations on computers to model mergers and produce the waveform templates detectors match against.`,
      keyIdeas: [
        'Derived from the Einstein–Hilbert action; 10 coupled nonlinear PDEs.',
        'FLRW/Friedmann ⇒ Big Bang cosmology; linearization ⇒ gravitational waves.',
        'Singularity theorems: collapse and the early universe force singularities.',
      ],
      workedExample: {
        prompt: 'From the Friedmann equation, what condition on energy density gives a spatially flat universe, and what does Λ do?',
        solution: `Set the curvature term $k = 0$ (flat space). The Friedmann equation becomes

$$H^2 \\equiv \\Big(\\frac{\\dot a}{a}\\Big)^2 = \\frac{8\\pi G}{3}\\rho + \\frac{\\Lambda c^2}{3}.$$

Flatness requires the total density to equal the **critical density** $\\rho_c = \\dfrac{3H^2}{8\\pi G}$ (counting matter, radiation, and the Λ contribution $\\rho_\\Lambda = \\Lambda c^2/8\\pi G$).

The $\\Lambda$ term acts like a constant energy density that does *not* dilute as space expands, so it eventually dominates and drives **accelerating** expansion ($\\ddot a > 0$). Observations (supernovae, CMB) find $\\Omega_\\Lambda \\approx 0.69$, $\\Omega_{\\text{matter}}\\approx 0.31$, summing to ≈1 — a flat, dark-energy-dominated universe.`,
      },
      glossedOver: 'The theory is classical. Reconciling it with quantum mechanics — quantum gravity — is unsolved and is the Level 5 frontier.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'GR is a classical effective field theory awaiting UV completion; black-hole thermodynamics, holography, the information paradox, and quantum-gravity programs define the frontier.',
      equationForms: [
        { latex: 'S_{\\text{BH}} = \\frac{k_B c^3 A}{4 G\\hbar}', caption: 'black holes have entropy ∝ horizon area' },
        { latex: 'S = \\frac{1}{16\\pi G}\\int R\\sqrt{-g} + \\alpha R^2 + \\beta R_{\\mu\\nu}R^{\\mu\\nu} + \\cdots', caption: 'effective action with curvature corrections' },
      ],
      body: `Treated as a **quantum effective field theory**, GR is predictive at low energies (with computable graviton-loop corrections) but **non-renormalizable**: the Einstein–Hilbert term is the leading piece of an expansion in curvature, and new counterterms appear at every order, signaling that the theory must be UV-completed near the Planck scale $\\ell_P = \\sqrt{G\\hbar/c^3}$. The candidate completions — **string theory** (gravitons as closed-string modes, requiring extra dimensions and supersymmetry), **loop quantum gravity** (quantized geometry, discrete area/volume spectra), **asymptotic safety**, and **causal sets** — make different commitments and remain experimentally unseparated.

The sharpest theoretical clues come from **black-hole thermodynamics**: horizons carry temperature (Hawking) and entropy $S = k_B A/4\\ell_P^2$ (Bekenstein–Hawking), implying gravity is in some sense statistical/emergent. This motivates the **holographic principle** and the **AdS/CFT correspondence** (Maldacena), in which a gravitational theory in the bulk is exactly dual to a quantum field theory on its boundary — the most concrete realization of quantum gravity we have. The **information paradox** (does black-hole evaporation destroy information?) has driven recent breakthroughs (the Page curve from replica wormholes / quantum extremal surfaces). Open empirical frontiers include the nature of dark energy and the cosmological-constant problem, possible modifications of gravity, and precision strong-field tests with gravitational-wave catalogs and black-hole imaging (Event Horizon Telescope).`,
      keyIdeas: [
        'GR is a non-renormalizable effective field theory; needs UV completion near $\\ell_P$.',
        'Black-hole entropy/temperature suggest gravity is emergent; holography/AdS-CFT realize it.',
        'Frontiers: information paradox, quantum gravity, dark energy, strong-field GW/EHT tests.',
      ],
      workedExample: {
        prompt: 'Why is general relativity called non-renormalizable, and what scale sets where it must break down?',
        solution: `Newton's constant $G$ has dimensions of (length)²/(energy·time-ish) — in natural units $[G] = (\\text{mass})^{-2}$. A coupling with negative mass dimension means each additional graviton loop brings extra powers of $E^2/M_P^2$, so divergences grow without bound and require infinitely many new counterterms: **non-renormalizable**.

The breakdown scale is where the dimensionless expansion parameter $E/M_P \\sim 1$, i.e. the **Planck energy**

$$E_P = \\sqrt{\\frac{\\hbar c^5}{G}} \\approx 1.2\\times10^{19}\\,\\text{GeV},\\quad \\ell_P = \\sqrt{\\frac{G\\hbar}{c^3}}\\approx 1.6\\times10^{-35}\\,\\text{m}.$$

Below $E_P$, GR works fine as an effective theory; at or above it, quantum fluctuations of spacetime geometry become $O(1)$ and a genuine quantum theory of gravity is required. That $10^{19}\\,\\text{GeV}$ is fantastically beyond collider reach is why quantum gravity is so hard to test.`,
      },
    },
  ],
  connections: [
    { toId: 'gravitation', relationship: 'reduces in the weak-field limit to' },
    { toId: 'mass-energy', relationship: 'promotes to a gravitational source the energy of' },
    { toId: 'pythagoras', relationship: 'generalizes to curved spacetime the distance law of' },
    { toId: 'euler-lagrange', relationship: 'is derived by varying the Einstein–Hilbert action via' },
  ],
  viz: {
    component: 'CurvedSpacetime',
    kind: 'concept',
    defaultParams: { mass: 1 },
    caption: 'A warped grid with an adjustable central mass; a test particle traces a geodesic that bends into an orbit, illustrating curvature-as-gravity.',
    whatToTry: [
      'Increase the central mass and watch the grid dimple more steeply.',
      'Launch a test particle and see its geodesic curve into an orbit.',
      'Aim a light ray past the mass and watch it bend (gravitational lensing).',
    ],
  },
  primarySources: [
    {
      authors: 'A. Einstein',
      title: 'Die Feldgleichungen der Gravitation',
      venue: 'Sitzungsberichte der Preußischen Akademie der Wissenschaften',
      year: 1915,
      note: 'the field equations of general relativity',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'C. Misner, K. Thorne & J. Wheeler', title: 'Gravitation', venue: 'W. H. Freeman', year: 1973 },
    { authors: 'S. Carroll', title: 'Spacetime and Geometry', venue: 'Addison-Wesley', year: 2004 },
  ],
  historyNote: `Einstein struggled for eight years (1907–1915) to generalize special relativity to include gravity, learning Riemannian geometry from his friend Marcel Grossmann and nearly being scooped: David Hilbert derived the field equations from an action almost simultaneously in November 1915, leading to a brief priority tension (now generally credited to Einstein for the physical theory). Einstein presented the final equations on 25 November 1915.

The triumph came in 1919, when Eddington's expedition measured starlight bending around the eclipsed Sun, matching GR's prediction. The headline "Lights All Askew in the Heavens" made Einstein an overnight global celebrity. A century later, the 2015 detection of gravitational waves and the 2019 image of a black hole's shadow confirmed predictions Einstein himself doubted would ever be tested.`,
};

export default einsteinField;
