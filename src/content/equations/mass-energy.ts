import type { Equation } from '../types';

const massEnergy: Equation = {
  id: 'mass-energy',
  name: 'Mass–Energy Equivalence',
  nickname: 'the most famous equation in the world',
  canonicalLatex: 'E=mc^2',
  canonicalAlt: 'E equals m c squared',
  alternativeForms: [
    { latex: 'E^2 = (pc)^2 + (mc^2)^2', label: 'full energy–momentum relation (includes momentum)' },
    { latex: 'E = \\gamma mc^2,\\quad \\gamma = \\dfrac{1}{\\sqrt{1-v^2/c^2}}', label: 'total energy of a moving body' },
    { latex: 'E_0 = mc^2', label: 'rest energy (the v = 0 case)' },
  ],
  fields: ['relativity', 'physics'],
  era: { display: '1905', sortKey: 1905 },
  discoverers: [{ name: 'Albert Einstein', note: '"Does the inertia of a body depend upon its energy content?", 1905' }],
  oneLine: 'Mass and energy are the same thing in different clothes; a tiny mass holds a tremendous amount of energy.',
  significance:
    'Einstein’s relation overturned the separate conservation laws of mass and energy, merging them into one. It explains why the Sun shines (mass converts to radiant energy), powers nuclear reactors and weapons, and is confirmed in every particle collision where energy turns into new matter. The huge factor c² means even minuscule mass changes release enormous energy, reshaping energy, warfare, and cosmology.',
  applications: [
    'Stellar energy: hydrogen fusion in the Sun and stars',
    'Nuclear power and weapons (fission/fusion mass defects)',
    'Particle physics: pair production and annihilation (PET scans)',
    'Precision mass spectrometry and binding-energy accounting',
  ],
  symbols: [
    { symbol: 'E', name: 'energy', meaning: 'total or rest energy of the body', units: 'J' },
    { symbol: 'm', name: 'mass', meaning: 'rest (invariant) mass', units: 'kg' },
    { symbol: 'c', name: 'speed of light', meaning: 'universal speed limit, 2.998×10⁸ m/s', units: 'm/s' },
    { symbol: 'p', name: 'momentum', meaning: 'relativistic momentum γmv', units: 'kg·m/s' },
    { symbol: '\\gamma', name: 'Lorentz factor', meaning: 'time-dilation/energy factor 1/√(1−v²/c²)', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Mass is frozen energy. A speck of matter, fully unlocked, holds energy enough to power a city — which is how the Sun and nuclear reactors work.',
      equationForms: [{ latex: 'E=mc^2', caption: 'energy = mass × (speed of light)²' }],
      body: `For centuries, mass and energy seemed like utterly different things — one is "how much stuff," the other "how much oomph." Einstein discovered they are two faces of the same coin. **Mass is just energy that's been locked up**, and energy has mass.

The exchange rate is the speed of light *squared* — an almost unimaginably large number. So a tiny amount of mass converts to a staggering amount of energy. The mass in a single raisin, fully converted, could power a home for thousands of years. This is why the Sun can shine for billions of years (it slowly turns mass into sunlight), and why nuclear reactors and bombs release so much from so little.

Crucially, it works both ways: concentrate enough energy and you can *create* mass — new particles — out of pure energy, which is exactly what happens in particle colliders.`,
      keyIdeas: [
        'Mass and energy are the same thing in different forms.',
        'The conversion factor c² is enormous, so a little mass = a lot of energy.',
        'It runs both ways: energy can become matter, and matter energy.',
      ],
      glossedOver: 'We say mass "converts" to energy. More precisely, the system’s mass *decreases* when it releases energy — clarified at Level 2.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'A body at rest has energy $E = mc^2$. When a reaction releases energy, the products are slightly *lighter* — the "mass defect" times c² is the energy out.',
      equationForms: [{ latex: 'E_0 = mc^2,\\qquad \\Delta E = \\Delta m\\,c^2' }],
      body: `Even sitting perfectly still, an object has energy — its **rest energy** $E_0 = mc^2$. Because $c^2 \\approx 9\\times10^{16}\\,\\text{m}^2/\\text{s}^2$ is gigantic, even a gram of mass corresponds to about $9\\times10^{13}\\,\\text{J}$ — roughly the energy of 20,000 tons of TNT.

In a nuclear reaction, the total mass of the products is slightly *less* than that of the reactants. This missing **mass defect** $\\Delta m$ hasn't vanished — it has become energy, $\\Delta E = \\Delta m\\,c^2$, carried off as kinetic energy and radiation. The fraction of mass converted is tiny (under 1% even for fusion), but multiplied by $c^2$ it powers stars and reactors. The visualization lets you pick a reaction and see the mass defect become energy.`,
      keyIdeas: [
        'Rest energy $E_0 = mc^2$ exists even for a motionless object.',
        'Energy released = mass lost × c² (the mass defect).',
        'A tiny fractional mass change yields huge energy because c² is large.',
      ],
      workedExample: {
        prompt: 'The Sun radiates about $3.8\\times10^{26}\\,\\text{W}$. How much mass does it convert to energy each second?',
        solution: `Each second the Sun emits $E = 3.8\\times10^{26}\\,\\text{J}$. Solve $E = mc^2$ for $m$:

$$m = \\frac{E}{c^2} = \\frac{3.8\\times10^{26}}{(3\\times10^8)^2} = \\frac{3.8\\times10^{26}}{9\\times10^{16}} \\approx 4.2\\times10^{9}\\ \\text{kg}.$$

The Sun turns about **4 million tonnes of mass into light every second**. Yet it's so massive ($2\\times10^{30}\\,\\text{kg}$) that it can sustain this for ~10 billion years.`,
      },
      misconceptions: [
        {
          claim: 'Mass turns into energy, so mass isn’t conserved while energy is.',
          correction:
            'In relativity the unified mass–energy is conserved. The rest mass of a *system* (e.g. a hot box of gas, or a bound nucleus) includes its internal energy — heating a box literally makes it weigh more.',
        },
      ],
      glossedOver: 'We used $E = mc^2$ only for objects at rest. Moving objects need the fuller formula — Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The complete relation is $E^2 = (pc)^2 + (mc^2)^2$. Total energy is $\\gamma mc^2$; $E = mc^2$ is the rest case, and massless particles get $E = pc$.',
      equationForms: [
        { latex: 'E^2 = (pc)^2 + (mc^2)^2' },
        { latex: 'E = \\gamma mc^2,\\quad p = \\gamma mv,\\quad \\gamma = (1-v^2/c^2)^{-1/2}' },
      ],
      body: `Special relativity unifies energy and momentum into a 4-vector $p^\\mu = (E/c, \\vec p)$ whose invariant length is the mass: $E^2 - (pc)^2 = (mc^2)^2$. This single relation contains the famous formula as the **rest case** ($p = 0 \\Rightarrow E = mc^2$) and gives the total energy of a moving body as $E = \\gamma mc^2$, which exceeds the rest energy by the **kinetic energy** $(\\gamma - 1)mc^2$. Expanding for low speed recovers Newton: $(\\gamma-1)mc^2 \\approx \\tfrac12 mv^2$.

It also handles **massless particles**: setting $m = 0$ gives $E = pc$, exactly the relation for photons (consistent with $E = h\\nu$ and $p = h/\\lambda$). So light carries momentum and energy without rest mass. The "rest mass" $m$ is a Lorentz **invariant** — all observers agree on it — which is why modern usage drops the old "relativistic mass" ($\\gamma m$) in favor of saying energy and momentum increase with speed while $m$ stays fixed.`,
      keyIdeas: [
        '$E^2 = (pc)^2 + (mc^2)^2$ is the full relation; $E = mc^2$ is its $p=0$ case.',
        'Total energy $\\gamma mc^2$ = rest energy + kinetic energy.',
        'Massless particles ($m=0$) obey $E = pc$ — photons.',
      ],
      workedExample: {
        prompt: 'Find the energy of a proton ($mc^2 = 938\\,\\text{MeV}$) moving at $v = 0.99c$.',
        solution: `Lorentz factor at $v = 0.99c$:

$$\\gamma = \\frac{1}{\\sqrt{1 - 0.99^2}} = \\frac{1}{\\sqrt{1 - 0.9801}} = \\frac{1}{\\sqrt{0.0199}} \\approx 7.09.$$

Total energy:

$$E = \\gamma mc^2 = 7.09 \\times 938\\,\\text{MeV} \\approx 6650\\,\\text{MeV} = 6.65\\,\\text{GeV}.$$

Of this, the rest energy is 938 MeV and the kinetic energy is the remaining ~5.7 GeV. As $v\\to c$, $\\gamma\\to\\infty$ — which is why no massive particle can reach the speed of light: it would require infinite energy.`,
      },
      glossedOver: 'We treated mass as given. Where mass *comes from* — the Higgs field and binding energy — is the Level 4/5 story.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Mass is the invariant norm of the energy–momentum 4-vector; for composite systems most mass is binding/kinetic energy, and the relation governs reaction kinematics and thresholds.',
      equationForms: [
        { latex: 'm^2c^2 = p_\\mu p^\\mu = (E/c)^2 - |\\vec p|^2', caption: 'mass as a Lorentz invariant' },
        { latex: 's = (p_1 + p_2)^\\mu(p_{1}+p_2)_\\mu = E_{\\text{cm}}^2/c^2', caption: 'Mandelstam s / collision threshold' },
      ],
      body: `Mass is precisely the Lorentz-invariant norm of the 4-momentum, $m^2 c^2 = p_\\mu p^\\mu$, conserved and frame-independent. A profound consequence for **composite systems**: the mass of a bound object is *not* the sum of its parts' masses but includes their interaction energy. About 99% of a proton's mass is the kinetic and gluon-field (binding) energy of nearly-massless quarks — so most of *your* mass is energy, not "stuff." Conversely, a bound nucleus weighs less than its free nucleons by the binding energy/c²; the binding-energy-per-nucleon curve (peaking at iron-56) explains why fusing light nuclei *and* fissioning heavy ones both release energy.

In particle physics the relation governs **reaction kinematics**: the Mandelstam invariant $s = (\\sum p_i)^2$ gives the center-of-mass energy, and producing a particle of mass $M$ requires $E_{\\text{cm}} \\ge Mc^2$ — the **threshold** that sizes every collider. Pair production ($\\gamma\\gamma \\to e^+e^-$) needs photon energy above $2m_e c^2 = 1.022\\,\\text{MeV}$; annihilation runs it backward (the basis of PET imaging). Four-momentum conservation, not separate mass conservation, is the master bookkeeping of every decay and scattering process.`,
      keyIdeas: [
        'Mass = invariant norm of 4-momentum; conserved and frame-independent.',
        'Most of a proton’s (and your) mass is binding/kinetic energy, not constituent mass.',
        'Thresholds: producing mass $M$ needs $E_{\\text{cm}} \\ge Mc^2$ — this sizes colliders.',
      ],
      workedExample: {
        prompt: 'What minimum photon energy is needed to create an electron–positron pair, and why can’t a lone photon do it in empty space?',
        solution: `Creating $e^+e^-$ requires energy for two rest masses: $E \\ge 2m_e c^2 = 2\\times 511\\,\\text{keV} = 1.022\\,\\text{MeV}$.

But a single photon in vacuum **cannot** do it, even with enough energy, because energy *and* momentum must both be conserved. A photon has $E = pc$ (it lives on the massless "light cone"), while the created pair, in their center-of-mass frame, can be at rest ($p=0$) with $E = 2\\gamma m_e c^2$. No frame makes both conserved for a lone photon.

A nearby nucleus (or second photon) fixes this by absorbing the recoil momentum — which is why pair production happens near matter, and why two-photon collisions ($\\gamma\\gamma$) can produce pairs in free space.`,
      },
      glossedOver: 'We assumed flat spacetime. In gravity, energy gravitates and the very definition of total mass becomes subtle — Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Mass–energy generalizes in general relativity (energy gravitates; total mass is subtle) and underlies the origin of mass via the Higgs mechanism and QCD — with deep open questions about the vacuum energy.',
      equationForms: [
        { latex: 'G_{\\mu\\nu} = \\dfrac{8\\pi G}{c^4}\\,T_{\\mu\\nu}', caption: 'in GR, all energy–momentum sources gravity' },
        { latex: 'm_f = y_f\\,\\dfrac{v}{\\sqrt 2}', caption: 'fermion mass from Higgs coupling y_f and vev v' },
      ],
      body: `In general relativity it is the full **stress–energy tensor** $T_{\\mu\\nu}$ — energy, momentum, pressure, stress — that sources curvature, not mass alone; so light bends light, pressure gravitates, and $E = mc^2$ becomes the statement that all forms of energy weigh. Defining the *total* mass–energy of a system becomes genuinely subtle: gravitational binding energy is non-local, and only special spacetimes admit well-defined ADM or Bondi masses; the **positive mass theorem** (Schoen–Yau, Witten) was a major result establishing that isolated gravitating systems have non-negative total mass.

The origin of mass is itself layered. The **Higgs mechanism** gives elementary fermions and the W/Z bosons their masses via Yukawa couplings to the Higgs vacuum expectation value, $m_f = y_f v/\\sqrt 2$ — but this accounts for only ~1% of ordinary matter's mass. The other ~99% is **QCD binding energy**: chiral symmetry breaking and the gluon field generate the proton mass dynamically from nearly massless quarks ($E = mc^2$ in its most literal cosmic form). The grandest open puzzle is the **vacuum energy**: quantum field theory predicts an enormous zero-point energy density that, via $E = mc^2$ and Einstein's equations, should curve spacetime catastrophically — yet the observed cosmological constant is ~120 orders of magnitude smaller, the worst prediction in physics and a central clue toward quantum gravity.`,
      keyIdeas: [
        'In GR all energy–momentum gravitates; total mass is subtle (ADM/Bondi, positive-mass theorem).',
        'Higgs gives elementary masses; ~99% of nucleon mass is QCD binding energy.',
        'The vacuum-energy / cosmological-constant problem is the deepest open issue around $E=mc^2$.',
      ],
      workedExample: {
        prompt: 'Roughly what fraction of the proton mass comes from the Higgs-given quark masses?',
        solution: `A proton (uud) has mass $\\approx 938\\,\\text{MeV}/c^2$. The Higgs gives the up and down quarks tiny "current" masses: $m_u \\approx 2.2\\,\\text{MeV}$, $m_d \\approx 4.7\\,\\text{MeV}$. Summing the three valence quarks:

$$m_u + m_u + m_d \\approx 2.2 + 2.2 + 4.7 \\approx 9\\,\\text{MeV}.$$

That is only $\\dfrac{9}{938} \\approx 1\\%$ of the proton's mass. The other ~99% is the energy of the gluon fields and the quarks' relativistic motion, confined inside the proton — pure $E = mc^2$. So the Higgs explains why *you* would be slightly lighter without it, but the overwhelming bulk of your mass is bound field energy, not "Higgs mass."`,
      },
    },
  ],
  connections: [
    { toId: 'newton-second', relationship: 'extends to high speed the dynamics of' },
    { toId: 'einstein-field', relationship: 'is generalized so that all energy gravitates in' },
    { toId: 'planck-einstein', relationship: 'gives massless photons E = pc, consistent with' },
    { toId: 'dirac', relationship: 'has its $E^2=(pc)^2+(mc^2)^2$ linearized by' },
  ],
  viz: {
    component: 'MassDefect',
    kind: 'interactive',
    defaultParams: { reaction: 'fusion' },
    caption: 'Pick a nuclear reaction (fusion or fission) and see the mass defect converted to released energy via E = Δm c².',
    whatToTry: [
      'Compare the energy per nucleon released by fusion vs. fission.',
      'Find iron-56 at the peak of the binding-energy curve — neither fuses nor fissions for energy.',
      'See how a sub-1% mass change yields megatons of energy.',
    ],
  },
  primarySources: [
    {
      authors: 'A. Einstein',
      title: 'Ist die Trägheit eines Körpers von seinem Energieinhalt abhängig?',
      venue: 'Annalen der Physik 18, 639',
      year: 1905,
      url: 'https://doi.org/10.1002/andp.19053231314',
      note: 'derives mass–energy equivalence',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'D. Bodanis', title: 'E=mc²: A Biography of the World’s Most Famous Equation', venue: 'Walker', year: 2000 },
    { authors: 'A. P. French', title: 'Special Relativity', venue: 'W. W. Norton', year: 1968 },
  ],
  historyNote: `The famous formula appears in a three-page addendum to Einstein's "miracle year" of 1905, almost as an afterthought to special relativity, phrased as a question: "Does the inertia of a body depend upon its energy content?" Einstein's answer — that a body emitting energy $L$ loses mass $L/c^2$ — was at first an abstract curiosity with no obvious test.

Confirmation came with nuclear physics: Aston's precise mass measurements (1920s) revealed the mass defect, and Cockcroft and Walton's 1932 splitting of lithium gave the first direct quantitative verification. The equation's terrible power was realized in 1945. Einstein, a lifelong pacifist, had signed the 1939 letter to Roosevelt urging atomic research, and later called it "the one great mistake in my life."`,
};

export default massEnergy;
