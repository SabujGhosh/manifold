import type { Equation } from '../types';

const gravitation: Equation = {
  id: 'gravitation',
  name: "Newton's Universal Gravitation",
  nickname: 'the law that married the apple and the Moon',
  canonicalLatex: 'F = G\\dfrac{m_1 m_2}{r^2}',
  canonicalAlt: 'F equals G times m one m two divided by r squared',
  alternativeForms: [
    { latex: '\\vec F_{12} = -G\\dfrac{m_1 m_2}{r^2}\\,\\hat r', label: 'vector form (attractive, along the line joining)' },
    { latex: '\\vec g = -\\nabla\\Phi,\\quad \\nabla^2\\Phi = 4\\pi G\\rho', label: 'gravitational field / Poisson form' },
  ],
  fields: ['physics', 'mechanics'],
  era: { display: '1687', sortKey: 1687 },
  discoverers: [{ name: 'Isaac Newton', note: 'Principia, 1687; building on Kepler, Hooke, Halley' }],
  oneLine: 'Every mass attracts every other with a force that grows with their masses and fades as the square of distance.',
  significance:
    'Newton’s gravitation was the first law to unify the heavens and the earth: the same force that drops an apple holds the Moon in orbit. It explained Kepler’s planetary laws, the tides, and the shape of the Earth, and made astronomy quantitative and predictive — enabling the discovery of Neptune from orbital anomalies. It stood essentially unchallenged for over two centuries until general relativity refined it.',
  applications: [
    'Predicting planetary orbits and spacecraft trajectories (gravity assists)',
    'Tides; Earth’s oblate shape; satellite orbits and GPS geometry',
    'Weighing planets and stars from orbital periods',
    'Discovery of unseen bodies (Neptune) from gravitational perturbations',
  ],
  symbols: [
    { symbol: 'F', name: 'gravitational force', meaning: 'attractive force between the two masses', units: 'N' },
    { symbol: 'G', name: 'gravitational constant', meaning: 'universal constant of gravitation, 6.674×10⁻¹¹', units: 'N·m²/kg²' },
    { symbol: 'm_1', name: 'first mass', meaning: 'gravitational mass of body 1', units: 'kg' },
    { symbol: 'm_2', name: 'second mass', meaning: 'gravitational mass of body 2', units: 'kg' },
    { symbol: 'r', name: 'separation', meaning: 'distance between the centers of the masses', units: 'm' },
    { symbol: '\\Phi', name: 'gravitational potential', meaning: 'potential energy per unit mass', units: 'J/kg = m²/s²' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Everything pulls on everything else. Bigger things pull harder; far-away things pull much, much less.',
      equationForms: [{ latex: 'F = G\\dfrac{m_1 m_2}{r^2}', caption: 'pull grows with mass, shrinks fast with distance' }],
      body: `Drop an apple and it falls. The Earth is pulling it. Newton's leap was to realize that the very same pull reaches all the way up to the **Moon** — and keeps it circling us instead of flying off into space. One law for the orchard and the heavens.

The rule has two parts. First, **heavier things pull harder**: the Earth tugs you far more than a bowling ball does. Second, **distance weakens the pull fast** — twice as far away means only a *quarter* of the pull, three times as far means a *ninth*. This "inverse-square" fading is why you feel the Earth's gravity strongly but the Sun's pull, despite the Sun's vastness, just gently steers our yearlong orbit.

This was the first time humanity could *calculate* the sky: predict eclipses, comets, and orbits with a single formula.`,
      keyIdeas: [
        'Every mass attracts every other mass.',
        'More mass → stronger pull.',
        'Double the distance → one-quarter the pull (inverse-square).',
      ],
      glossedOver: 'We treat objects as if all their mass sits at a point. Why a whole round planet acts like that needs calculus — Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The attractive force is $F = Gm_1m_2/r^2$. Near Earth’s surface it gives the familiar $g \\approx 9.8\\,\\text{m/s}^2$.',
      equationForms: [
        { latex: 'F = G\\dfrac{m_1 m_2}{r^2}' },
        { latex: 'g = G\\dfrac{M_\\oplus}{R_\\oplus^2} \\approx 9.8\\ \\text{m/s}^2', caption: 'surface gravity' },
      ],
      body: `Two masses $m_1$ and $m_2$ a distance $r$ apart attract each other with force $F = Gm_1m_2/r^2$, where $G = 6.674\\times 10^{-11}\\ \\text{N·m}^2/\\text{kg}^2$ is tiny — which is why gravity is feeble between everyday objects and only becomes dominant for planet-sized masses.

Combine this with $F = ma$ and a beautiful thing happens: the object's own mass cancels, so **everything falls at the same rate** (ignoring air). Near Earth's surface that rate is $g = GM_\\oplus/R_\\oplus^2 \\approx 9.8\\ \\text{m/s}^2$. For a circular orbit, gravity supplies the centripetal force $mv^2/r$, which gives the orbital speed and Kepler's third law relating period to radius.`,
      keyIdeas: [
        '$G$ is extremely small — gravity is the weakest everyday force.',
        'Mass cancels in free fall: all objects accelerate equally ($g$).',
        'Orbits: gravity provides the centripetal force.',
      ],
      workedExample: {
        prompt: 'Estimate the orbital speed of a satellite in low Earth orbit ($r \\approx R_\\oplus = 6.37\\times10^6\\,\\text{m}$, $g\\approx 9.8$).',
        solution: `Gravity provides the centripetal force: $\\dfrac{mv^2}{r} = mg$, so

$$v = \\sqrt{g\\,r} = \\sqrt{9.8 \\times 6.37\\times 10^6} \\approx \\sqrt{6.24\\times10^7} \\approx 7.9\\times 10^3\\ \\text{m/s}.$$

About $7.9\\ \\text{km/s}$ — roughly $28{,}000\\ \\text{km/h}$ — matching real LEO satellites that circle the Earth in about 90 minutes.`,
      },
      misconceptions: [
        {
          claim: 'Astronauts float because there’s no gravity in space.',
          correction:
            'Gravity in low orbit is nearly as strong as on the ground (~90%). Astronauts float because they are in continuous *free fall* — the station and everything in it fall together around the Earth.',
        },
      ],
      glossedOver: 'We used the Earth’s mass at its center. The shell theorem (why that’s valid) and the field picture are Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The inverse-square force is conservative with potential $-GMm/r$; the shell theorem, Kepler’s laws, and the Poisson field equation all follow.',
      equationForms: [
        { latex: 'U(r) = -\\dfrac{GMm}{r}, \\quad \\vec F = -\\nabla U' },
        { latex: '\\nabla^2 \\Phi = 4\\pi G\\rho', caption: 'Poisson equation for the potential' },
      ],
      body: `Gravity is **conservative**: the potential energy is $U(r) = -GMm/r$, and $\\vec F = -\\nabla U$. The **shell theorem** (provable by integration, as Newton did) shows a spherically symmetric body attracts external objects as if all its mass were at its center, and that inside a uniform shell the net force is zero — justifying the point-mass treatment.

From the inverse-square law, all three of **Kepler's laws** follow: bound orbits are conic sections (ellipses) with the central mass at a focus; the radius vector sweeps equal areas in equal times (angular-momentum conservation); and $T^2 \\propto a^3$. Reformulating with the field $\\vec g = -\\nabla\\Phi$ gives **Gauss's law for gravity** and the **Poisson equation** $\\nabla^2\\Phi = 4\\pi G\\rho$ — the local form that handles extended mass distributions and foreshadows the field-theoretic view of general relativity.`,
      keyIdeas: [
        'Conservative force with $U=-GMm/r$; energy and angular momentum conserved.',
        'Shell theorem justifies treating spheres as point masses.',
        'Kepler’s three laws are consequences; $\\nabla^2\\Phi = 4\\pi G\\rho$ is the field form.',
      ],
      workedExample: {
        prompt: 'Derive the escape speed from a body of mass $M$ and radius $R$.',
        solution: `Escape means total mechanical energy is just barely zero (reaches infinity with zero speed):

$$\\tfrac12 m v_{\\text{esc}}^2 - \\frac{GMm}{R} = 0 \\;\\Rightarrow\\; v_{\\text{esc}} = \\sqrt{\\frac{2GM}{R}}.$$

For Earth this is $\\approx 11.2\\ \\text{km/s}$. Note it is independent of the escaping object's mass $m$, and is $\\sqrt2$ times the circular orbital speed at that radius.`,
      },
      glossedOver: 'We assumed the force acts instantaneously across any distance. That this can’t be right (no signal faster than light) is resolved by general relativity — Level 4/5.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Newtonian gravity is the weak-field, slow-motion limit of general relativity; the equivalence of inertial and gravitational mass is the clue, and post-Newtonian corrections quantify the departures.',
      equationForms: [
        { latex: 'g_{00} \\approx -(1 + 2\\Phi/c^2)', caption: 'Newtonian potential as a metric component' },
        { latex: '\\Delta\\varpi = \\dfrac{6\\pi GM}{c^2 a(1-e^2)}\\ \\text{per orbit}', caption: 'relativistic perihelion precession' },
      ],
      body: `The empirical equality of **inertial mass** (in $F=ma$) and **gravitational mass** (in $F=GMm/r^2$), tested to $\\sim 10^{-15}$, is no coincidence: it is the **equivalence principle**, that gravity is locally indistinguishable from acceleration. This forces gravity to be geometry. In the weak-field limit, the metric component $g_{00} \\approx -(1 + 2\\Phi/c^2)$ encodes the Newtonian potential, and the geodesic equation reproduces $\\ddot{\\vec x} = -\\nabla\\Phi$. The Poisson equation $\\nabla^2\\Phi = 4\\pi G\\rho$ is the Newtonian limit of the Einstein field equations.

Where the limit breaks down is measurable: the **post-Newtonian** expansion in $v^2/c^2$ and $\\Phi/c^2$ predicts the anomalous $43''$/century precession of Mercury's perihelion, light bending ($1.75''$ at the Sun's limb), the Shapiro time delay, and frame dragging — all confirmed. GPS must correct for both special- and general-relativistic clock effects ($\\sim 38\\ \\mu s$/day) or accumulate kilometers of error. Newtonian gravity remains the working tool of celestial mechanics, with relativistic corrections layered on where precision demands.`,
      keyIdeas: [
        'Inertial = gravitational mass ⇒ equivalence principle ⇒ gravity is geometry.',
        'Newtonian potential is the weak-field metric; Poisson is the GR limit.',
        'Post-Newtonian corrections: Mercury’s precession, light bending, GPS clocks.',
      ],
      workedExample: {
        prompt: 'Estimate the fractional size of the leading relativistic correction for Mercury, using $\\Phi/c^2$ at its orbit ($GM_\\odot/r \\approx 2.6\\times10^7\\,\\text{m}^2/\\text{s}^2$ at $r\\approx5.8\\times10^{10}\\,\\text{m}$... use $GM_\\odot=1.33\\times10^{20}$).',
        solution: `At Mercury's orbit, $\\Phi/c^2 \\sim \\dfrac{GM_\\odot}{r c^2} = \\dfrac{1.33\\times10^{20}}{5.8\\times10^{10}\\times(3\\times10^8)^2} \\approx \\dfrac{1.33\\times10^{20}}{5.2\\times10^{27}} \\approx 2.5\\times10^{-8}.$

So relativistic effects are $\\sim10^{-8}$ per orbit — utterly negligible per revolution, but they *accumulate*: over a century of orbits the perihelion shift sums to the famous $43''$, the discrepancy Newtonian gravity could not explain and GR did.`,
      },
      glossedOver: 'Even GR may be incomplete: galactic rotation curves and cosmic acceleration invoke dark matter/energy or modified gravity — the Level 5 frontier.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Gravitation today is general relativity tested across 25 orders of magnitude, with live frontiers in dark sector phenomenology, gravitational-wave astronomy, and the search for a quantum theory.',
      equationForms: [
        { latex: 'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\dfrac{8\\pi G}{c^4}T_{\\mu\\nu}', caption: 'the relativistic replacement (see Einstein field equations)' },
        { latex: 'h \\sim \\dfrac{G}{c^4}\\dfrac{\\ddot{Q}}{r}', caption: 'gravitational-wave strain from a quadrupole' },
      ],
      body: `The modern law is the Einstein field equations, of which $F=GMm/r^2$ is the Newtonian shadow; see that entry for structure. The contemporary research arc is about its **regime boundaries and completeness**. On galactic and cosmological scales, observed dynamics require either non-baryonic **dark matter** plus a cosmological constant $\\Lambda$ (the $\\Lambda$CDM concordance), or **modified gravity** (MOND/TeVeS, $f(R)$, emergent-gravity proposals) — an open empirical contest sharpened by lensing, the CMB, and the bullet-cluster data.

**Gravitational-wave astronomy** (LIGO/Virgo/KAGRA, 2015–) now tests the strong-field, dynamical regime via binary inspirals, confirming the quadrupole-formula strain $h \\sim (G/c^4)\\ddot Q/r$ and the post-Newtonian/numerical-relativity waveform templates. The deepest open problem is **quantum gravity**: $G$, $\\hbar$, and $c$ set the Planck scale where a perturbatively non-renormalizable graviton theory must be UV-completed — string theory and loop/asymptotic-safety programs differ on how. Even the value of $G$ remains the least precisely known fundamental constant, with persistent inter-experiment discrepancies. Newton's tidy inverse square is the seed of all of it.`,
      keyIdeas: [
        'GR replaces Newtonian gravity; tested from sub-mm to cosmological scales.',
        'Dark matter + Λ vs. modified gravity is an open empirical question.',
        'Gravitational waves probe the strong-field regime; quantum gravity is unsolved.',
      ],
      workedExample: {
        prompt: 'Estimate the order of magnitude of the GW strain at Earth from two $30\\,M_\\odot$ black holes merging at $400\\,\\text{Mpc}$.',
        solution: `The peak strain scales as $h \\sim \\dfrac{G}{c^4}\\dfrac{\\ddot Q}{r} \\sim \\dfrac{1}{r}\\dfrac{G}{c^4}\\,M\\,(v/c)^2 c^2$ with $v\\sim c$ near merger.

Plugging $M\\sim 60M_\\odot \\sim 1.2\\times10^{32}\\,\\text{kg}$, $r\\sim 400\\,\\text{Mpc}\\sim 1.2\\times10^{25}\\,\\text{m}$, the Schwarzschild radius $GM/c^2\\sim 9\\times10^4\\,\\text{m}$ gives

$$h \\sim \\frac{GM/c^2}{r} \\sim \\frac{9\\times10^4}{1.2\\times10^{25}} \\sim 10^{-21}.$$

This $\\sim10^{-21}$ fractional length change — a fraction of a proton width over LIGO's 4 km arms — is exactly what GW150914 measured, confirming Newton’s force has become a dynamical, radiating field.`,
      },
    },
  ],
  connections: [
    { toId: 'newton-second', relationship: 'is the force fed into the equation of motion' },
    { toId: 'coulomb', relationship: 'shares the identical inverse-square mathematical form with' },
    { toId: 'einstein-field', relationship: 'is the weak-field Newtonian limit of' },
  ],
  viz: {
    component: 'TwoBodyOrbit',
    kind: 'interactive',
    defaultParams: { mass: 1, speed: 1.0, separation: 1 },
    caption: 'A symplectic two-body integrator: adjust mass and initial velocity to trace ellipses, parabolas, and hyperbolas as the orbital energy changes sign.',
    whatToTry: [
      'Lower the initial speed to make a tighter, faster ellipse.',
      'Tune the speed until the orbit just barely unbinds (parabolic escape).',
      'Increase the central mass and watch orbits speed up at the same radius.',
    ],
  },
  primarySources: [
    {
      authors: 'I. Newton',
      title: 'Philosophiæ Naturalis Principia Mathematica, Book III',
      venue: 'London',
      year: 1687,
      note: 'states universal gravitation and derives Kepler’s laws',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'S. Chandrasekhar', title: "Newton's Principia for the Common Reader", venue: 'Oxford University Press', year: 1995 },
    { authors: 'C. Will', title: 'Was Einstein Right?', venue: 'Basic Books', year: 1993 },
  ],
  historyNote: `Robert Hooke claimed he had suggested the inverse-square law to Newton, igniting a bitter priority feud; Newton, characteristically, removed many references to Hooke from later editions. The key technical hurdle Newton cleared was proving the **shell theorem** — that a sphere attracts as a point — which reportedly delayed his confidence in the theory for years.

The law's greatest triumph came posthumously: in 1846, anomalies in Uranus's orbit led Le Verrier and Adams to predict an unseen planet's location from gravitation alone. Neptune was found within a degree of the prediction that very night — perhaps the most dramatic confirmation of a physical theory in history.`,
};

export default gravitation;
