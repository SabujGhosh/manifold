import type { Equation } from '../types';

const coulomb: Equation = {
  id: 'coulomb',
  name: "Coulomb's Law",
  nickname: 'gravitation’s electric twin',
  canonicalLatex: 'F = k\\dfrac{q_1 q_2}{r^2}',
  canonicalAlt: 'F equals k times q one q two divided by r squared',
  alternativeForms: [
    { latex: '\\vec F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1 q_2}{r^2}\\,\\hat r', label: 'SI form with the permittivity of free space' },
    { latex: '\\vec E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r^2}\\,\\hat r', label: 'the electric field of a point charge' },
  ],
  fields: ['electromagnetism', 'physics'],
  era: { display: '1785', sortKey: 1785 },
  discoverers: [
    { name: 'Charles-Augustin de Coulomb', note: 'torsion-balance measurements, 1785' },
    { name: 'Henry Cavendish', note: 'earlier, unpublished, more precise results' },
  ],
  oneLine: 'Like charges repel, opposites attract, with a force that fades as the square of distance — just like gravity.',
  significance:
    'Coulomb’s law quantifies the electric force, the dominant interaction of everyday matter: it binds electrons to nuclei, atoms into molecules, and molecules into solids and living tissue. Sharing gravity’s inverse-square form, it became the entry point to electromagnetism and, through Gauss’s law, to Maxwell’s field theory. Its enormous strength relative to gravity (≈10³⁹×) explains why bulk matter is held together electrically.',
  applications: [
    'Atomic and molecular structure; chemical bonding',
    'Capacitors, electrostatic precipitators, photocopiers/laser printers',
    'Electrostatic forces in MEMS and in DNA/protein interactions',
    'The starting point for all of circuit theory and electronics',
  ],
  symbols: [
    { symbol: 'F', name: 'electric force', meaning: 'force between the two charges (repulsive if like-signed)', units: 'N' },
    { symbol: 'k', name: 'Coulomb constant', meaning: '1/(4πε₀) ≈ 8.99×10⁹', units: 'N·m²/C²' },
    { symbol: 'q_1', name: 'first charge', meaning: 'electric charge of body 1 (signed)', units: 'C' },
    { symbol: 'q_2', name: 'second charge', meaning: 'electric charge of body 2 (signed)', units: 'C' },
    { symbol: 'r', name: 'separation', meaning: 'distance between the point charges', units: 'm' },
    { symbol: '\\varepsilon_0', name: 'permittivity of free space', meaning: 'electric constant, 8.854×10⁻¹²', units: 'F/m' },
    { symbol: '\\vec E', name: 'electric field', meaning: 'force per unit charge at a point', units: 'N/C = V/m' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Rub a balloon on your hair and it sticks to the wall. That clinging, pushing, sparking force is electricity — and it follows a tidy rule.',
      equationForms: [{ latex: 'F = k\\dfrac{q_1 q_2}{r^2}', caption: 'electric pull/push, fading with distance' }],
      body: `You already know this force. It crackles when you pull off a sweater, makes a balloon stick to the wall, and gives the little zap when you touch a doorknob. Tiny bits of matter carry an "electric charge" that comes in two flavors, **plus** and **minus**. The rule of the playground applies: **opposites attract, likes repel**.

Coulomb's law says exactly how strong that attraction or repulsion is. Like gravity, it grows when the charges are bigger and **fades with the square of the distance** — move twice as far apart and the force drops to a quarter. Unlike gravity, it can both pull *and* push.

This force is the glue of the everyday world. It holds every atom together and links atoms into everything you can touch. It is also staggeringly strong: the electric pull inside a speck of dust dwarfs the gravity of the entire Earth on the same charges.`,
      keyIdeas: [
        'Two kinds of charge: opposites attract, likes repel.',
        'Stronger charges and closer distances mean a bigger force.',
        'It’s the force that builds atoms and everyday matter.',
      ],
      glossedOver: 'We say charges "feel" each other across a gap. *How* — through an electric field — is the Level 2/3 picture.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The force between point charges is $F = kq_1q_2/r^2$ with $k \\approx 8.99\\times10^9$; a positive product means repulsion, negative means attraction.',
      equationForms: [{ latex: 'F = k\\dfrac{q_1 q_2}{r^2}, \\quad k \\approx 8.99\\times 10^9\\ \\tfrac{\\text{N·m}^2}{\\text{C}^2}' }],
      body: `Charge is measured in **coulombs** (C); the charge of a single electron is a tiny $-1.6\\times10^{-19}\\,\\text{C}$. The force magnitude is $F = kq_1q_2/r^2$. The sign of the product $q_1q_2$ tells you the direction: positive (like charges) → repulsion; negative (opposite charges) → attraction.

Often it is cleaner to think of one charge creating an **electric field** $E = kq/r^2$ filling the space around it, and the other charge simply feeling a force $F = q_2 E$. The field is the "force per unit charge" — a map of pushes that any test charge would feel. This field idea, drawn as arrows or field lines, is the bridge to all of electromagnetism.`,
      keyIdeas: [
        'Charge is in coulombs; one electron is $1.6\\times10^{-19}\\,\\text{C}$.',
        'Sign of $q_1q_2$: + → repel, − → attract.',
        'Field picture: $E = kq/r^2$, force $F = q_2 E$.',
      ],
      workedExample: {
        prompt: 'Find the force between the proton and electron in hydrogen, separated by $r = 5.3\\times10^{-11}\\,\\text{m}$ (the Bohr radius). Each has charge magnitude $e = 1.6\\times10^{-19}\\,\\text{C}$.',
        solution: `$$F = k\\frac{e^2}{r^2} = 8.99\\times10^9 \\times \\frac{(1.6\\times10^{-19})^2}{(5.3\\times10^{-11})^2}.$$

Numerator: $8.99\\times10^9 \\times 2.56\\times10^{-38} = 2.30\\times10^{-28}.$ Denominator: $2.81\\times10^{-21}.$

$$F \\approx \\frac{2.30\\times10^{-28}}{2.81\\times10^{-21}} \\approx 8.2\\times10^{-8}\\ \\text{N (attractive)}.$$

A tiny force in absolute terms, but it is what holds the atom together — and it is about $10^{39}$ times the gravitational attraction between the same two particles.`,
      },
      misconceptions: [
        {
          claim: 'Coulomb’s law works for any charged objects.',
          correction:
            'Strictly it’s for *point* charges (or, by the shell theorem, uniformly charged spheres). Nearby conductors and extended shapes redistribute charge, so you must integrate the field — just like gravity’s shell theorem.',
        },
      ],
      glossedOver: 'We used $k$ as a given number. Its meaning via the permittivity $\\varepsilon_0$ and Gauss’s law is Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Coulomb’s law is equivalent to Gauss’s law $\\nabla\\!\\cdot\\!\\vec E = \\rho/\\varepsilon_0$; with the conservative potential $V = kq/r$ it founds electrostatics.',
      equationForms: [
        { latex: '\\oint \\vec E\\cdot d\\vec A = \\dfrac{Q_{\\text{enc}}}{\\varepsilon_0}', caption: 'Gauss’s law (integral form)' },
        { latex: '\\nabla\\cdot\\vec E = \\dfrac{\\rho}{\\varepsilon_0}, \\quad V = \\dfrac{kq}{r}', caption: 'differential form and potential' },
      ],
      body: `The inverse-square law is mathematically equivalent to **Gauss's law**: the flux of $\\vec E$ through any closed surface equals the enclosed charge over $\\varepsilon_0$. The $1/r^2$ falloff is exactly what makes flux conserved in 3-D (field lines spread over an area $\\propto r^2$). Gauss's law is far easier to use for symmetric charge distributions and is the first of Maxwell's equations.

Electrostatic force is **conservative**, with potential $V = kq/r$ and energy $U = q_2 V$; $\\vec E = -\\nabla V$, and in charge-free regions $V$ obeys **Laplace's equation** $\\nabla^2 V = 0$ (boundary-value problems, method of images). The deep structural parallel with gravitation is exact in form — only the source (charge vs. mass) and the possibility of two signs differ, the latter allowing **screening** (Debye shielding, why bulk matter is nearly neutral) that gravity cannot do.`,
      keyIdeas: [
        'Coulomb ⇔ Gauss’s law; $1/r^2$ ⇔ flux conservation in 3-D.',
        'Conservative field: $V = kq/r$, $\\vec E = -\\nabla V$, $\\nabla^2 V = 0$ in vacuum.',
        'Two signs allow screening — gravity has no analogue.',
      ],
      workedExample: {
        prompt: 'Use Gauss’s law to find the field of an infinite line of charge with linear density $\\lambda$.',
        solution: `Choose a coaxial cylinder of radius $r$, length $L$. By symmetry $\\vec E$ points radially with constant magnitude on the curved surface; the end caps contribute no flux. Gauss:

$$E\\,(2\\pi r L) = \\frac{\\lambda L}{\\varepsilon_0} \\;\\Rightarrow\\; E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}.$$

Note the field falls as $1/r$, not $1/r^2$ — the geometry of the source changes the falloff, which Gauss's law captures effortlessly while direct Coulomb integration would be painful.`,
      },
      glossedOver: 'Everything here is *electrostatic* (charges at rest). Moving charges produce magnetism and radiation — the full Maxwell story at Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Coulomb’s law is the static, low-energy face of QED: it is the Fourier transform of the photon propagator, and it receives quantum and relativistic corrections.',
      equationForms: [
        { latex: '\\tilde V(\\vec q) = \\dfrac{e^2}{\\varepsilon_0\\,|\\vec q|^2}', caption: 'Fourier transform: potential from the massless photon propagator' },
        { latex: 'V(r) = -\\dfrac{\\alpha}{r}\\Big(1 + \\dfrac{2\\alpha}{3\\pi}\\ln(\\cdots) + \\cdots\\Big)', caption: 'running coupling / vacuum polarization' },
      ],
      body: `In relativistic field theory, the static potential between charges is the spatial Fourier transform of the photon propagator. A **massless** photon gives a $1/|\\vec q|^2$ propagator, whose transform is exactly the $1/r$ Coulomb potential — so the inverse-square *law* is a direct consequence of the photon's masslessness (equivalently, gauge invariance and the $U(1)$ symmetry). If the photon had a mass $m_\\gamma$, the potential would be Yukawa, $e^{-m_\\gamma r}/r$; experimental Coulomb tests bound $m_\\gamma \\lesssim 10^{-18}\\,\\text{eV}$.

Quantum corrections refine it. **Vacuum polarization** — virtual electron–positron pairs screening the bare charge — makes the effective coupling *run*, weakening Coulomb at large $r$ and strengthening it at short range (the Uehling potential, and the measurable contribution to the hydrogen Lamb shift). At the practical end, the same law in matter is dressed by the medium's permittivity $\\varepsilon$ and by Debye/Thomas–Fermi screening in plasmas and metals, turning bare Coulomb into a screened (Yukawa-like) interaction with finite range.`,
      keyIdeas: [
        '$1/r$ ⇔ massless photon; a photon mass would give a Yukawa potential.',
        'Vacuum polarization makes the coupling run (Uehling potential, Lamb shift).',
        'In media: dielectric screening and Debye shielding give finite-range effective Coulomb.',
      ],
      workedExample: {
        prompt: 'Why does a photon mass turn Coulomb’s $1/r$ into a Yukawa $e^{-mr}/r$ potential?',
        solution: `The static potential is the Fourier transform of the propagator. A massive vector boson has propagator $\\propto 1/(|\\vec q|^2 + m^2)$, so

$$V(r) \\propto \\int \\frac{e^{i\\vec q\\cdot\\vec r}}{|\\vec q|^2 + m^2}\\,d^3q \\;\\propto\\; \\frac{e^{-mr}}{r}.$$

The mass $m$ sets an exponential range $\\sim 1/m$. Setting $m=0$ recovers the pure $1/r$ Coulomb law — so the infinite range of electrostatics is precisely a statement that the photon is massless. (The same math gives the short range of the weak force from massive W/Z bosons.)`,
      },
      glossedOver: 'We treated charge as fundamental and quantized by hand. *Why* charge is quantized and the unification of E&M with the weak force are Level 5 themes.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Coulomb is the Newtonian limit of an unbroken $U(1)$ gauge force, sitting inside the electroweak theory; charge quantization, anomaly cancellation, and strong-field QED are the live structure.',
      equationForms: [
        { latex: 'D_\\mu = \\partial_\\mu + i e A_\\mu', caption: 'the $U(1)$ gauge covariant derivative generating the force' },
        { latex: 'E_{\\text{crit}} = \\dfrac{m_e^2 c^3}{e\\hbar} \\approx 1.3\\times10^{18}\\,\\text{V/m}', caption: 'Schwinger field for pair production' },
      ],
      body: `Coulomb's law is the static limit of the force mediated by the $U(1)$ gauge field, the simplest gauge theory (see Euler's identity and Maxwell). Its enormous strength relative to gravity and its exact inverse-square form both trace to gauge invariance and the masslessness of the photon. Within the **electroweak** Standard Model, this $U(1)_{\\text{EM}}$ is the unbroken remnant of $SU(2)\\times U(1)_Y$ after the Higgs mechanism, with the photon a specific mixture of the $W^3$ and $B$ fields set by the Weinberg angle.

The frontier questions are foundational. **Charge quantization** — why every observed charge is an integer multiple of $e/3$ — is *explained* (not assumed) by anomaly cancellation within each Standard-Model generation, and would be automatic if charge sat inside a grand-unified simple group or if a Dirac magnetic monopole exists. In ultra-strong fields approaching the **Schwinger limit** $E_{\\text{crit}} \\approx 1.3\\times10^{18}\\,\\text{V/m}$, the vacuum becomes unstable to electron–positron pair production and Coulomb's linear law fails nonperturbatively — probed near heavy nuclei ($Z\\alpha \\to 1$) and in upcoming high-intensity lasers. The schoolroom inverse square is the gentle, low-energy shadow of all this.`,
      keyIdeas: [
        'Coulomb = static limit of the unbroken $U(1)_{\\text{EM}}$ gauge force.',
        'Charge quantization follows from anomaly cancellation (or GUTs/monopoles).',
        'Near the Schwinger field the QED vacuum breaks down (pair production).',
      ],
      workedExample: {
        prompt: 'Estimate the field at which Coulomb-driven QED becomes nonperturbative — the Schwinger limit — from dimensional analysis.',
        solution: `Pair production becomes copious when the work done by the field over a Compton wavelength $\\lambda_C = \\hbar/m_e c$ reaches the pair rest energy $\\sim 2m_e c^2$:

$$eE\\,\\lambda_C \\sim m_e c^2 \\;\\Rightarrow\\; E_{\\text{crit}} \\sim \\frac{m_e^2 c^3}{e\\hbar} \\approx 1.3\\times10^{18}\\ \\text{V/m}.$$

Below this, Coulomb's law and perturbative QED are superb; above it the vacuum itself sparks into matter, and the simple inverse-square description collapses. This scale, far beyond ordinary fields, marks the true domain boundary of Coulomb's law.`,
      },
    },
  ],
  connections: [
    { toId: 'gravitation', relationship: 'shares the identical inverse-square form with' },
    { toId: 'maxwell', relationship: 'is the electrostatic special case (Gauss’s law) of' },
    { toId: 'euler-identity', relationship: 'arises from the U(1) gauge symmetry of' },
  ],
  viz: {
    component: 'ChargeField',
    kind: 'interactive',
    defaultParams: { q1: 1, q2: -1 },
    caption: 'Place two charges and see the electric field lines and the force vectors; flip a sign to switch between attraction and repulsion.',
    whatToTry: [
      'Make both charges positive and watch the field lines repel and the force push apart.',
      'Make them opposite and see field lines connect the charges.',
      'Move them closer and watch the force grow as 1/r².',
    ],
  },
  primarySources: [
    {
      authors: 'C.-A. de Coulomb',
      title: 'Premier mémoire sur l’électricité et le magnétisme',
      venue: 'Histoire de l’Académie Royale des Sciences',
      year: 1785,
      note: 'torsion-balance measurement of the inverse-square electric force',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'D. J. Griffiths', title: 'Introduction to Electrodynamics (Ch. 2)', venue: 'Cambridge University Press', year: 2017 },
    { authors: 'E. Purcell & D. Morin', title: 'Electricity and Magnetism', venue: 'Cambridge University Press', year: 2013 },
  ],
  historyNote: `Coulomb used a delicate torsion balance — measuring the twist of a fine fiber — to establish the inverse-square law in 1785, lending electricity the same mathematical form Newton had given gravity a century earlier. Unknown to him, Henry Cavendish had already obtained more precise results but never published; Maxwell later unearthed and credited Cavendish's notebooks.

The inverse-square law has since become one of the most stringently tested in physics: modern "Cavendish-style" experiments confirm the exponent is 2 to better than one part in $10^{16}$, equivalently bounding the photon mass to extraordinary precision — a schoolroom law guarding a deep symmetry.`,
};

export default coulomb;
