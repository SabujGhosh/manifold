import type { Equation } from '../types';

const maxwell: Equation = {
  id: 'maxwell',
  name: "Maxwell's Equations",
  nickname: 'the equations that lit up the world',
  canonicalLatex:
    '\\nabla\\!\\cdot\\!\\vec E=\\rho/\\varepsilon_0,\\ \\nabla\\!\\cdot\\!\\vec B=0,\\ \\nabla\\!\\times\\!\\vec E=-\\partial_t\\vec B,\\ \\nabla\\!\\times\\!\\vec B=\\mu_0\\vec J+\\mu_0\\varepsilon_0\\partial_t\\vec E',
  canonicalAlt:
    'divergence of E equals rho over epsilon-zero; divergence of B equals zero; curl of E equals minus the time derivative of B; curl of B equals mu-zero J plus mu-zero epsilon-zero times the time derivative of E',
  alternativeForms: [
    { latex: '\\partial_\\mu F^{\\mu\\nu} = \\mu_0 J^\\nu,\\quad \\partial_{[\\mu}F_{\\nu\\rho]}=0', label: 'covariant (relativistic) form' },
    { latex: 'dF = 0,\\quad d\\star F = \\mu_0\\,\\star J', label: 'differential-forms form' },
  ],
  fields: ['electromagnetism', 'physics'],
  era: { display: '1865', sortKey: 1865 },
  discoverers: [
    { name: 'James Clerk Maxwell', note: 'unified the laws and added the displacement current, 1865' },
    { name: 'Faraday, Ampère, Gauss', note: 'the experimental laws Maxwell synthesized' },
    { name: 'Oliver Heaviside', note: 'recast them into the modern four vector equations' },
  ],
  oneLine: 'Four equations that tie together all of electricity, magnetism, and light — and predict electromagnetic waves.',
  significance:
    'Maxwell’s equations unified electricity and magnetism into a single field theory and revealed that light itself is an electromagnetic wave, traveling at a speed fixed by two electric/magnetic constants. They were the first relativistic field theory (their symmetry is Lorentz, not Galilean), directly inspiring special relativity, and the first gauge theory, the template for the entire Standard Model. Practically, they underlie all of electrical engineering, radio, optics, and modern communications.',
  applications: [
    'All electrical power generation, motors, and transformers',
    'Radio, radar, Wi-Fi, and the entire wireless spectrum',
    'Optics, lasers, fiber communications, antennas',
    'Electromagnetic compatibility, MRI, particle accelerators',
  ],
  symbols: [
    { symbol: '\\vec E', name: 'electric field', meaning: 'force per unit charge', units: 'V/m' },
    { symbol: '\\vec B', name: 'magnetic field', meaning: 'magnetic flux density', units: 'T (tesla)' },
    { symbol: '\\rho', name: 'charge density', meaning: 'electric charge per unit volume', units: 'C/m³' },
    { symbol: '\\vec J', name: 'current density', meaning: 'electric current per unit area', units: 'A/m²' },
    { symbol: '\\varepsilon_0', name: 'permittivity of free space', meaning: 'electric constant, 8.854×10⁻¹²', units: 'F/m' },
    { symbol: '\\mu_0', name: 'permeability of free space', meaning: 'magnetic constant, 4π×10⁻⁷', units: 'H/m' },
    { symbol: 'F^{\\mu\\nu}', name: 'field-strength tensor', meaning: 'combines E and B into one antisymmetric tensor', units: 'mixed' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Four rules say how electricity and magnetism create and chase each other — and that their dance, racing through space, *is* light.',
      equationForms: [{ latex: '\\text{changing electricity} \\rightleftarrows \\text{changing magnetism} = \\text{light}', caption: 'the self-sustaining dance' }],
      body: `Electricity and magnetism feel like separate things — one shocks you, the other sticks to the fridge. Maxwell's great discovery is that they are two faces of one phenomenon, forever feeding each other.

The four equations say, in plain terms: electric charges make electric fields; there are no magnetic "charges" (every magnet has both poles); a **changing magnetic field creates an electric field** (this runs every generator and transformer); and a **changing electric field creates a magnetic field**. Put the last two together and something magical happens: a wiggle of electricity makes magnetism, which makes electricity, which makes magnetism... a wave that sustains itself and races off through empty space.

When Maxwell calculated that wave's speed, it came out exactly equal to the measured speed of light. **Light is this electromagnetic wave.** Radio, microwaves, X-rays — all the same dance, just at different rhythms.`,
      keyIdeas: [
        'Electricity and magnetism are one unified phenomenon.',
        'Each, when changing, creates the other.',
        'Their self-sustaining wave is light itself.',
      ],
      glossedOver: 'We described the equations in words. The precise meaning of "divergence" and "curl" (how fields spread and swirl) is Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Gauss (charges make E), no magnetic monopoles, Faraday (changing B makes E), Ampère–Maxwell (currents and changing E make B). Together they give light at speed $c = 1/\\sqrt{\\mu_0\\varepsilon_0}$.',
      equationForms: [
        { latex: 'c = \\dfrac{1}{\\sqrt{\\mu_0\\varepsilon_0}} \\approx 3\\times10^8\\ \\text{m/s}', caption: 'the speed of light from electric/magnetic constants' },
      ],
      body: `Each equation is a familiar law. **Gauss's law**: electric field lines start on positive charges and end on negative ones. **No monopoles**: magnetic field lines never start or end — they always form loops (cut a magnet and you get two magnets, not a lone N pole). **Faraday's law**: a changing magnetic field pushes charges around a loop — this is how generators and transformers work. **Ampère–Maxwell**: electric currents (and changing electric fields) wrap magnetic fields around themselves.

Maxwell's stroke of genius was the last piece — the "displacement current," the idea that a *changing electric field* acts like a current and makes magnetism. With it, the equations predict self-propagating waves whose speed is $c = 1/\\sqrt{\\mu_0\\varepsilon_0}$. Plugging in the measured constants gives $3\\times10^8\\,\\text{m/s}$ — the speed of light, identified for the first time as an electromagnetic wave.`,
      keyIdeas: [
        'Four laws: charges→E, no monopoles, changing-B→E, currents/changing-E→B.',
        'Faraday’s law runs generators and transformers.',
        '$c = 1/\\sqrt{\\mu_0\\varepsilon_0}$ links light to electromagnetism.',
      ],
      workedExample: {
        prompt: 'Compute the speed of an electromagnetic wave from $\\varepsilon_0 = 8.85\\times10^{-12}$ and $\\mu_0 = 4\\pi\\times10^{-7}$.',
        solution: `$$\\mu_0\\varepsilon_0 = (4\\pi\\times10^{-7})(8.85\\times10^{-12}) \\approx 1.11\\times10^{-17}\\,\\text{s}^2/\\text{m}^2.$$

$$c = \\frac{1}{\\sqrt{1.11\\times10^{-17}}} \\approx 3.0\\times10^{8}\\ \\text{m/s}.$$

That two constants measured with coils and capacitors — nothing to do with optics — predict the speed of light was, in Maxwell's words, "scarcely avoidable" evidence that light is electromagnetic.`,
      },
      misconceptions: [
        {
          claim: 'Electromagnetic waves need a medium (the "ether") to travel through.',
          correction:
            'They don’t. The fields sustain each other in vacuum; the Michelson–Morley experiment found no ether, and the constancy of $c$ from Maxwell’s equations is exactly what led to special relativity.',
        },
      ],
      glossedOver: 'We treat E and B as separate vectors. Relativity shows they’re one object seen from different frames — Level 4.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'In vacuum the curl equations combine into wave equations $\\Box\\vec E = 0$; potentials $(\\phi,\\vec A)$ with gauge freedom simplify them, and the Poynting vector carries energy.',
      equationForms: [
        { latex: '\\nabla^2\\vec E - \\mu_0\\varepsilon_0\\,\\partial_t^2\\vec E = 0', caption: 'wave equation derived from the curl laws' },
        { latex: '\\vec E = -\\nabla\\phi - \\partial_t\\vec A,\\quad \\vec B = \\nabla\\times\\vec A', caption: 'scalar/vector potentials' },
      ],
      body: `Take the curl of Faraday's law and substitute Ampère–Maxwell: in vacuum ($\\rho = 0$, $\\vec J = 0$) the fields obey the **wave equation** with speed $c = 1/\\sqrt{\\mu_0\\varepsilon_0}$. The solutions are transverse plane waves with $\\vec E \\perp \\vec B \\perp$ direction of travel, and $E = cB$. This is the derivation that turned "light" into "electromagnetism."

Because $\\nabla\\cdot\\vec B = 0$, $\\vec B = \\nabla\\times\\vec A$; Faraday then gives $\\vec E = -\\nabla\\phi - \\partial_t\\vec A$. These **potentials** carry redundant **gauge freedom** ($\\vec A \\to \\vec A + \\nabla\\chi$, $\\phi \\to \\phi - \\partial_t\\chi$ leaves the fields unchanged), and a clever gauge choice (Lorenz, Coulomb) decouples the equations. Energy flows with the **Poynting vector** $\\vec S = \\tfrac{1}{\\mu_0}\\vec E\\times\\vec B$, and momentum/angular momentum are likewise carried by the field — the basis of radiation pressure and optical tweezers.`,
      keyIdeas: [
        'Curl laws ⇒ wave equation ⇒ light; transverse with $E=cB$.',
        'Potentials $(\\phi,\\vec A)$ carry gauge freedom; choose a gauge to simplify.',
        'Poynting vector $\\vec S = \\vec E\\times\\vec B/\\mu_0$ is the energy flux.',
      ],
      workedExample: {
        prompt: 'For a plane wave with $\\vec E = E_0\\cos(kz-\\omega t)\\hat x$, find $\\vec B$ and the average energy flux.',
        solution: `Faraday's law $\\nabla\\times\\vec E = -\\partial_t\\vec B$ with $\\vec E$ along $\\hat x$ varying in $z$ gives $\\vec B$ along $\\hat y$ with amplitude $B_0 = E_0/c$:

$$\\vec B = \\frac{E_0}{c}\\cos(kz-\\omega t)\\,\\hat y.$$

The instantaneous Poynting vector points along $\\hat z$; averaging $\\cos^2$ over a cycle gives $\\tfrac12$:

$$\\langle S\\rangle = \\frac{E_0 B_0}{2\\mu_0} = \\frac{E_0^2}{2\\mu_0 c} = \\tfrac12 c\\varepsilon_0 E_0^2.$$

This is the intensity (W/m²) of the wave — the energy the wave delivers, e.g. sunlight’s ~1360 W/m² at Earth.`,
      },
      glossedOver: 'The gauge freedom looks like a nuisance here. It is actually the deep organizing principle (a $U(1)$ symmetry) — Level 4/5.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The four equations are two tensor equations, manifestly Lorentz-invariant; E and B mix under boosts, and electromagnetism is the gauge theory of $U(1)$.',
      equationForms: [
        { latex: '\\partial_\\mu F^{\\mu\\nu} = \\mu_0 J^\\nu,\\qquad \\partial_\\mu \\tilde F^{\\mu\\nu} = 0', caption: 'inhomogeneous + Bianchi (homogeneous)' },
        { latex: 'F_{\\mu\\nu} = \\partial_\\mu A_\\nu - \\partial_\\nu A_\\mu', caption: 'field strength from the gauge potential' },
      ],
      body: `Packaging $\\vec E$ and $\\vec B$ into the antisymmetric **field-strength tensor** $F_{\\mu\\nu}$ collapses Maxwell's four equations into two: the source equation $\\partial_\\mu F^{\\mu\\nu} = \\mu_0 J^\\nu$ (Gauss + Ampère–Maxwell) and the **Bianchi identity** $\\partial_{[\\mu}F_{\\nu\\rho]} = 0$ (no monopoles + Faraday), automatic once $F_{\\mu\\nu} = \\partial_\\mu A_\\nu - \\partial_\\nu A_\\mu$. This form is manifestly **Lorentz-invariant**: $\\vec E$ and $\\vec B$ are not separate fields but components of one tensor that rotate into each other under boosts — a pure electric field in one frame has a magnetic part in another. Charge conservation $\\partial_\\mu J^\\mu = 0$ follows from antisymmetry.

The potential $A_\\mu$ carries **gauge freedom** $A_\\mu \\to A_\\mu + \\partial_\\mu\\chi$, and Maxwell's theory is precisely the $U(1)$ **gauge theory**: demanding local phase invariance of charged matter *forces* the existence of $A_\\mu$ and its minimal coupling. This is the prototype that, generalized to non-abelian groups, becomes Yang–Mills and the whole Standard Model. The Lagrangian $\\mathcal{L} = -\\tfrac14 F_{\\mu\\nu}F^{\\mu\\nu} - J^\\mu A_\\mu$ yields Maxwell's equations via Euler–Lagrange.`,
      keyIdeas: [
        'Four equations = two tensor equations; manifestly Lorentz-invariant.',
        'E and B are frame-dependent components of one tensor $F_{\\mu\\nu}$.',
        'EM is the $U(1)$ gauge theory; gauge invariance forces the potential $A_\\mu$.',
      ],
      workedExample: {
        prompt: 'Show that charge conservation $\\partial_\\mu J^\\mu = 0$ is an automatic consequence of $\\partial_\\mu F^{\\mu\\nu} = \\mu_0 J^\\nu$.',
        solution: `Take the four-divergence of the source equation:

$$\\mu_0\\,\\partial_\\nu J^\\nu = \\partial_\\nu\\partial_\\mu F^{\\mu\\nu}.$$

The right side contracts the symmetric operator $\\partial_\\nu\\partial_\\mu$ with the **antisymmetric** $F^{\\mu\\nu}$, which vanishes identically (a symmetric–antisymmetric contraction is zero). Hence

$$\\partial_\\nu J^\\nu = 0,$$

the continuity equation $\\partial_t\\rho + \\nabla\\cdot\\vec J = 0$. Charge conservation is not an extra assumption — it is built into the structure of Maxwell’s equations.`,
      },
      glossedOver: 'Classical fields here. Quantizing $A_\\mu$ gives photons and QED, with subtleties (gauge fixing, ghosts) that are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Geometrically Maxwell is $dF = 0$, $d\\star F = \\mu_0\\star J$ — a connection on a $U(1)$ bundle; quantization gives QED, and topology (monopoles, the Aharonov–Bohm effect, theta terms) reveals structure invisible to the field strengths.',
      equationForms: [
        { latex: 'F = dA,\\quad dF = 0,\\quad d{\\star}F = \\mu_0{\\star}J', caption: 'differential-forms / connection form' },
        { latex: '\\mathcal{L}_\\theta = \\frac{\\theta e^2}{32\\pi^2}\\epsilon^{\\mu\\nu\\rho\\sigma}F_{\\mu\\nu}F_{\\rho\\sigma}', caption: 'a topological (θ) term' },
      ],
      body: `In the language of differential geometry, $A$ is a **connection** on a principal $U(1)$ bundle, $F = dA$ its curvature, and Maxwell's equations are $dF = 0$ (Bianchi, automatic) and $d{\\star}F = \\mu_0{\\star}J$. This makes electromagnetism the simplest **gauge theory** and embeds it in the same framework as Yang–Mills and general relativity. The Aharonov–Bohm effect shows that the potential $A$ — not just $F$ — has observable, *topological* consequences (the holonomy $\\oint A$ around a flux), and Dirac's argument shows a single magnetic monopole would quantize electric charge via the consistency of the bundle.

Quantizing $A_\\mu$ yields **quantum electrodynamics**, the most precisely tested theory in science (the electron $g$-factor to $\\sim$12 digits), at the cost of gauge-fixing machinery (Gupta–Bleuler, Faddeev–Popov ghosts, BRST). Maxwell theory is also the canonical arena for **electromagnetic duality** ($\\vec E \\leftrightarrow \\vec B$, electric $\\leftrightarrow$ magnetic charge), which generalizes to the Montonen–Olive and S-dualities that organize modern field and string theory. Topological $\\theta$-terms, anomalies, and the modern understanding of phases of gauge theories all begin with these four 19th-century equations.`,
      keyIdeas: [
        'Maxwell = connection on a $U(1)$ bundle; $F=dA$, $dF=0$, $d\\star F=\\mu_0\\star J$.',
        'Topology matters: Aharonov–Bohm, Dirac monopole/charge quantization, θ-terms.',
        'Quantization → QED (most precisely tested theory); duality seeds modern field/string theory.',
      ],
      workedExample: {
        prompt: 'Sketch the Dirac argument that a magnetic monopole forces electric-charge quantization.',
        solution: `A monopole of charge $g$ produces a radial $\\vec B$ with total flux $\\mu_0 g$ through any enclosing sphere. The vector potential $\\vec A$ cannot be globally smooth on the sphere (it has a "Dirac string"); consistency requires the string be unobservable.

A charged particle circling the string picks up an Aharonov–Bohm phase $e^{i e\\Phi/\\hbar}$. Demanding this phase be trivial ($2\\pi$ multiple) for the full flux gives the **Dirac quantization condition**

$$\\frac{e\\,g}{2\\pi\\hbar} \\in \\tfrac12\\mathbb{Z} \\;\\Rightarrow\\; eg = \\frac{n h}{2}.$$

The mere *existence* of one monopole anywhere forces every electric charge $e$ to be an integer multiple of a basic unit — a topological explanation of charge quantization, entirely within Maxwell’s framework read geometrically.`,
      },
    },
  ],
  connections: [
    { toId: 'coulomb', relationship: 'contains as its electrostatic (Gauss’s law) special case' },
    { toId: 'wave-equation', relationship: 'predicts light by reducing in vacuum to the' },
    { toId: 'yang-mills', relationship: 'is the abelian U(1) prototype generalized by' },
    { toId: 'mass-energy', relationship: 'has the Lorentz symmetry that motivated' },
  ],
  viz: {
    component: 'EMWave',
    kind: 'concept',
    defaultParams: { frequency: 1 },
    caption: 'An animated electromagnetic plane wave: the E and B fields oscillate perpendicular to each other and to the direction of propagation.',
    whatToTry: [
      'Watch E and B peak together, at right angles.',
      'Note the wave moves perpendicular to both fields.',
      'Increase the frequency and see the wavelength shrink.',
    ],
  },
  primarySources: [
    {
      authors: 'J. C. Maxwell',
      title: 'A Dynamical Theory of the Electromagnetic Field',
      venue: 'Philosophical Transactions of the Royal Society 155, 459',
      year: 1865,
      url: 'https://doi.org/10.1098/rstl.1865.0008',
      note: 'predicts electromagnetic waves and identifies light as electromagnetic',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'D. J. Griffiths', title: 'Introduction to Electrodynamics', venue: 'Cambridge University Press', year: 2017 },
    { authors: 'J. D. Jackson', title: 'Classical Electrodynamics', venue: 'Wiley', year: 1998 },
  ],
  historyNote: `Maxwell's 1865 paper contained some twenty equations in scalar/quaternion form; it was Oliver Heaviside (and Gibbs) who, in the 1880s, recast them into the four compact vector equations we now call "Maxwell's equations" — Heaviside even grumbled that he had "murdered" the quaternions to do it.

The theory's prediction of waves was confirmed in 1887 when Heinrich Hertz generated and detected radio waves in his lab, measuring their speed as $c$. Asked about the use of his discovery, Hertz reportedly said, "It's of no use whatsoever" — within decades it had become radio, then the entire wireless world. Maxwell himself died in 1879, eight years before that confirmation.`,
};

export default maxwell;
