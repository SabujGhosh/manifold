import type { Equation } from '../types';

const dirac: Equation = {
  id: 'dirac',
  name: 'The Dirac Equation',
  nickname: 'the equation that predicted antimatter',
  canonicalLatex: '(i\\gamma^\\mu\\partial_\\mu-m)\\psi=0',
  canonicalAlt: 'open paren i gamma mu partial mu minus m close paren psi equals zero',
  alternativeForms: [
    { latex: 'i\\hbar\\,\\partial_t\\psi = (c\\,\\vec\\alpha\\cdot\\hat{\\vec p} + \\beta mc^2)\\psi', label: 'Hamiltonian form (Dirac’s original)' },
    { latex: '\\{\\gamma^\\mu,\\gamma^\\nu\\} = 2g^{\\mu\\nu}', label: 'the gamma-matrix (Clifford) algebra' },
  ],
  fields: ['qft', 'quantum'],
  era: { display: '1928', sortKey: 1928 },
  discoverers: [{ name: 'Paul Dirac', note: 'relativistic electron equation, 1928' }],
  oneLine: 'A relativistic quantum equation for the electron that forced the existence of spin and antimatter.',
  significance:
    'Dirac unified quantum mechanics with special relativity for the electron, and in doing so derived spin-½ from first principles and predicted antimatter — the positron — years before its discovery. The equation correctly gives the electron’s magnetic moment, fine structure, and is the cornerstone of quantum electrodynamics and the Standard Model’s treatment of all fermions (quarks and leptons).',
  applications: [
    'Foundation of quantum electrodynamics and the Standard Model fermions',
    'Antimatter: positrons in PET medical imaging',
    'Relativistic corrections in atomic/heavy-element chemistry (e.g. gold’s color, mercury’s liquidity)',
    'Graphene and topological materials (Dirac/Weyl quasiparticles)',
  ],
  symbols: [
    { symbol: '\\psi', name: 'Dirac spinor', meaning: 'four-component wavefunction encoding spin and particle/antiparticle', units: 'depends on normalization' },
    { symbol: '\\gamma^\\mu', name: 'gamma matrices', meaning: 'four 4×4 matrices satisfying the Clifford algebra', units: 'dimensionless' },
    { symbol: '\\partial_\\mu', name: 'spacetime derivative', meaning: 'derivative with respect to time and space (4-gradient)', units: '1/m' },
    { symbol: 'm', name: 'mass', meaning: 'rest mass of the particle (in natural units)', units: 'kg (or eV/c²)' },
    { symbol: 'g^{\\mu\\nu}', name: 'metric', meaning: 'Minkowski spacetime metric', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Trying to make the quantum electron obey relativity, Dirac found an equation that secretly demanded a mirror world — antimatter — that turned out to be real.',
      equationForms: [{ latex: '(i\\gamma^\\mu\\partial_\\mu-m)\\psi=0', caption: 'the relativistic equation for an electron' }],
      body: `Quantum mechanics (Schrödinger) and Einstein's relativity were each triumphant, but they didn't fit together — Schrödinger's equation treats time and space differently, which relativity forbids. In 1928 Paul Dirac, prizing mathematical beauty, found the equation that married them for the electron.

The equation worked beautifully — and then it did something no one asked for. Its mathematics insisted on **twice as many solutions** as expected. Half described the ordinary electron. The other half described a particle with the same mass but *opposite charge* — a thing that didn't exist in any textbook. Rather than dismiss it, Dirac boldly predicted a new form of matter: **antimatter**. Four years later the **positron** (the electron's antiparticle) was discovered in cosmic rays, exactly as predicted.

The equation also automatically contained the electron's **spin** — its built-in quantum "rotation" — which earlier theories had to bolt on by hand. Beauty had revealed truth.`,
      keyIdeas: [
        'It merges quantum mechanics with special relativity for the electron.',
        'It predicted antimatter — confirmed by the positron’s discovery.',
        'Spin emerges automatically rather than being added by hand.',
      ],
      glossedOver: 'We say it "demanded antimatter." The negative-energy solutions and their reinterpretation are the Level 3/4 story.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Combining $E^2 = (pc)^2 + (mc^2)^2$ with quantum rules gives an equation with four-part solutions: spin-up and spin-down for both the electron and its antiparticle.',
      equationForms: [
        { latex: '(i\\gamma^\\mu\\partial_\\mu - m)\\psi = 0' },
        { latex: 'E^2 = (pc)^2 + (mc^2)^2', caption: 'the relativistic energy it builds on' },
      ],
      body: `Einstein's energy relation $E^2 = (pc)^2 + (mc^2)^2$ has a hidden subtlety: a square has *two* roots, so $E$ can be positive **or** negative. Schrödinger's equation, being only first-order in time, couldn't accommodate this cleanly. Dirac insisted on an equation first-order in *both* time and space — and to make that work, the wavefunction $\\psi$ had to have **four components** instead of one.

What are those four pieces? Two of them are the electron with spin pointing up or down. The other two are the **antiparticle** (positron), also spin up or down. So one elegant equation packages the electron, its spin, and its antimatter twin together. The visualization illustrates spin and the particle/antiparticle pairing. This is why Dirac's equation is considered one of the most beautiful in physics: demanding consistency with relativity *forced* the discovery of new physics.`,
      keyIdeas: [
        'The ± square root of $E^2$ hints at antiparticles.',
        'The wavefunction has 4 parts: spin-up/down × particle/antiparticle.',
        'One equation unifies electron, spin, and antimatter.',
      ],
      workedExample: {
        prompt: 'When an electron meets a positron, they annihilate. Estimate the energy of the photons produced (electron rest energy 0.511 MeV).',
        solution: `Both particles have rest energy $m_e c^2 = 0.511\\,\\text{MeV}$. When they annihilate (essentially at rest), all that mass-energy must go into photons. Conservation of momentum requires (at least) **two** photons flying apart in opposite directions, sharing the total energy:

$$E_{\\text{total}} = 2 m_e c^2 = 1.022\\,\\text{MeV} \\;\\Rightarrow\\; \\text{each photon} = 0.511\\,\\text{MeV}.$$

These 511 keV gamma rays are the signature exploited by **PET scans**: a positron-emitting tracer annihilates in the body, and detectors catch the back-to-back photon pairs to image metabolism. Antimatter, predicted by Dirac, is now routine medicine.`,
      },
      misconceptions: [
        {
          claim: 'Antimatter is just science fiction or exotic and rare.',
          correction:
            'Antimatter is real, routinely produced, and used daily — positrons in PET scanners, antiprotons at CERN. Bananas even emit positrons (from potassium-40 decay). It’s just that it annihilates quickly on contact with matter.',
        },
      ],
      glossedOver: 'We treated negative energies loosely. Their proper interpretation (hole theory, then field theory) is Level 3/4.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Linearizing $E^2 = p^2 + m^2$ requires the gamma matrices $\\{\\gamma^\\mu,\\gamma^\\nu\\}=2g^{\\mu\\nu}$; the equation yields spin-½, the correct g-factor ≈ 2, and fine structure.',
      equationForms: [
        { latex: '\\{\\gamma^\\mu,\\gamma^\\nu\\} = 2g^{\\mu\\nu}\\,\\mathbb{1}', caption: 'Clifford algebra that linearization forces' },
        { latex: '\\mu = g\\frac{e\\hbar}{2m},\\quad g = 2', caption: 'electron magnetic moment, predicted' },
      ],
      body: `Dirac sought an equation **linear** in $\\partial_t$ (for a sensible probability) yet consistent with $E^2 = p^2 + m^2$. Factoring the quadratic relation forces the coefficients to be matrices obeying the **Clifford algebra** $\\{\\gamma^\\mu,\\gamma^\\nu\\} = 2g^{\\mu\\nu}$ — they cannot be ordinary numbers. The smallest such matrices are $4\\times4$, so $\\psi$ is a four-component **spinor**.

Squaring the Dirac operator recovers the Klein–Gordon equation for each component (so relativity is satisfied), but the spinor structure delivers free bonuses: **spin-½** appears automatically, and coupling to electromagnetism predicts the electron's gyromagnetic ratio $g = 2$ — a result earlier theories had to assume, here derived. Solving the equation for hydrogen reproduces the **fine structure** (relativistic splitting of spectral lines) and spin–orbit coupling correctly. The negative-energy solutions were Dirac's puzzle; his **hole theory** reinterpreted an empty negative-energy state as a positive-energy **positron** — clever, but fully resolved only by quantum field theory.`,
      keyIdeas: [
        'Linearizing $E^2=p^2+m^2$ forces matrix (Clifford-algebra) coefficients ⇒ 4-spinors.',
        'Spin-½ and the magnetic moment $g=2$ emerge automatically.',
        'Reproduces hydrogen fine structure; negative energies ⇒ positrons (hole theory).',
      ],
      workedExample: {
        prompt: 'Why must the γ matrices be at least 4×4, given the algebra $\\{\\gamma^\\mu,\\gamma^\\nu\\}=2g^{\\mu\\nu}$?',
        solution: `The relation requires four anticommuting objects: $(\\gamma^0)^2 = 1$, $(\\gamma^i)^2 = -1$, and $\\gamma^\\mu\\gamma^\\nu = -\\gamma^\\nu\\gamma^\\mu$ for $\\mu\\neq\\nu$.

Ordinary numbers can't anticommute, so they must be matrices. The $2\\times2$ Pauli matrices give only *three* mutually anticommuting matrices ($\\sigma_x,\\sigma_y,\\sigma_z$) — one short of the four needed. The next size up, $4\\times4$, is the smallest that accommodates all four $\\gamma^\\mu$ (e.g. the Dirac representation built from Pauli blocks).

Hence $\\psi$ has four components. Physically, two count spin-up/down and two count particle/antiparticle — the doubling is not optional but forced by relativistic consistency. Dirac extracted spin and antimatter from pure algebra.`,
      },
      glossedOver: 'Hole theory is a stopgap that fails for bosons and pair creation. Quantum field theory is the real resolution — Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Quantized as a field, ψ creates/annihilates electrons and positrons; the Dirac field is the matter sector of QED, whose loop corrections shift g from 2 to 2.0023… with extraordinary precision.',
      equationForms: [
        { latex: '\\mathcal{L} = \\bar\\psi(i\\gamma^\\mu\\partial_\\mu - m)\\psi', caption: 'Dirac Lagrangian (matter sector of QED with minimal coupling)' },
        { latex: 'a_e = \\frac{g-2}{2} = \\frac{\\alpha}{2\\pi} + \\cdots \\approx 0.00116', caption: 'anomalous magnetic moment' },
      ],
      body: `The negative-energy paradox dissolves in **quantum field theory**: $\\psi$ is promoted to a field operator that *creates and annihilates* electrons and positrons, so "negative-energy seas" become positive-energy antiparticles, and pair creation/annihilation are natural. The Dirac Lagrangian $\\mathcal{L} = \\bar\\psi(i\\gamma^\\mu\\partial_\\mu - m)\\psi$, made locally $U(1)$-invariant by minimal coupling $\\partial_\\mu \\to \\partial_\\mu + ieA_\\mu$, *is* quantum electrodynamics — the gauge principle forces the photon and the electron–photon interaction. The spin-statistics theorem ties the spinor's half-integer spin to Fermi–Dirac statistics and the Pauli exclusion principle.

QED's loop corrections then refine Dirac's $g = 2$: virtual photons and pairs give the **anomalous magnetic moment** $a_e = (g-2)/2 = \\alpha/2\\pi + \\cdots$, computed and measured to ~12 significant figures in agreement — the most precise confrontation of theory and experiment in all of science. The same Dirac structure describes every fundamental fermion (quarks, all leptons) in the Standard Model, with chirality (left/right Weyl components) central to the weak interaction, and the massless limit giving Weyl fermions.`,
      keyIdeas: [
        'Field quantization: ψ creates/annihilates electrons & positrons (no negative-energy sea).',
        'Gauging $U(1)$ on the Dirac Lagrangian yields QED; spin-statistics ⇒ Pauli exclusion.',
        'Loop corrections give $g-2$, matched to experiment to ~12 digits.',
      ],
      workedExample: {
        prompt: 'Explain the leading correction to the electron’s magnetic moment, $a_e \\approx \\alpha/2\\pi$, and evaluate it.',
        solution: `Dirac's equation predicts exactly $g = 2$ for a structureless electron. But in QED the electron continually emits and reabsorbs virtual photons; the simplest such loop (Schwinger, 1948) shifts the magnetic moment by

$$a_e = \\frac{g-2}{2} = \\frac{\\alpha}{2\\pi},$$

where $\\alpha \\approx 1/137$ is the fine-structure constant. Evaluating:

$$a_e \\approx \\frac{1}{2\\pi \\times 137} \\approx 0.00116.$$

Measured value: $a_e = 0.001159652\\ldots$, matching the full QED series (now computed to five loops) to about 12 digits. This agreement is the gold standard of precision physics — and it all rests on Dirac's spinor structure giving $g=2$ at tree level, with QED supplying the tiny anomaly.`,
      },
      glossedOver: 'QED is one gauge sector. The full Standard Model, chiral anomalies, and the origin of fermion masses are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The Dirac operator is a geometric object (index theorem, spin geometry); its chiral structure, anomalies, and condensed-matter realizations (Dirac/Weyl/Majorana) are at the research frontier.',
      equationForms: [
        { latex: '\\mathrm{ind}(D) = \\int_M \\hat{A}(M)\\,\\mathrm{ch}(E)', caption: 'Atiyah–Singer index theorem for the Dirac operator' },
        { latex: '\\psi = \\psi^c \\;\\Leftrightarrow\\; \\text{Majorana (its own antiparticle)}', caption: 'Majorana condition' },
      ],
      body: `Mathematically, the Dirac operator $D = i\\gamma^\\mu\\nabla_\\mu$ is a fundamental object of **spin geometry**: it requires a spin structure on the manifold, and its index (zero-mode count) is computed by the **Atiyah–Singer index theorem**, linking analysis to topology (the heat-kernel proof literally uses a supersymmetric Dirac particle). This is among the deepest bridges in modern mathematics, and the same operator governs anomalies in physics.

Physically, the chiral (left/right) decomposition is where the action is. The **weak interaction couples only to left-handed fermions**, making chirality central to the Standard Model; **chiral anomalies** (the divergence of the chiral current acquiring a quantum term) must cancel among each generation's particles — a tight constraint that helped predict the top quark and relates to the strong-CP problem and baryogenesis. Whether neutrinos are **Majorana** (their own antiparticles, $\\psi = \\psi^c$) is a major open experimental question (neutrinoless double-beta decay). Meanwhile the Dirac equation has re-emerged in **condensed matter**: low-energy electrons in graphene obey a 2-D massless Dirac equation, and Weyl/Dirac semimetals and topological insulators host relativistic quasiparticles and Majorana modes (sought for topological quantum computing). Dirac's 1928 quest for a beautiful electron equation now spans particle physics, pure geometry, and quantum materials.`,
      keyIdeas: [
        'Dirac operator = spin-geometry object; its index is topological (Atiyah–Singer).',
        'Chirality drives the weak force; anomaly cancellation constrains particle content.',
        'Majorana neutrinos (open question) and Dirac/Weyl quasiparticles in graphene/semimetals.',
      ],
      workedExample: {
        prompt: 'What distinguishes a Dirac fermion from a Majorana fermion, and what experiment would reveal a neutrino to be Majorana?',
        solution: `A **Dirac** fermion has a distinct antiparticle: $\\psi$ and its charge conjugate $\\psi^c$ are independent (the electron and positron differ, e.g. by charge). A **Majorana** fermion satisfies $\\psi = \\psi^c$ — it *is* its own antiparticle, possible only for an electrically neutral particle.

Neutrinos are neutral, so they could be Majorana. The decisive test is **neutrinoless double-beta decay** $(A,Z)\\to(A,Z{+}2) + 2e^-$. Ordinary double-beta decay emits two antineutrinos; if the neutrino is its own antiparticle, the two can annihilate internally, emitting *no* neutrinos and giving the two electrons a sharp summed energy at the Q-value.

Observing this lepton-number-violating decay would prove neutrinos are Majorana, implying a Majorana mass term beyond the Higgs mechanism (the seesaw) and bearing on why the universe has more matter than antimatter. Current experiments (GERDA, KamLAND-Zen, LEGEND) push the half-life bound past $10^{26}$ years.`,
      },
    },
  ],
  connections: [
    { toId: 'schrodinger', relationship: 'has as its non-relativistic limit the' },
    { toId: 'mass-energy', relationship: 'linearizes the relativistic energy relation of' },
    { toId: 'maxwell', relationship: 'becomes QED when minimally coupled to' },
    { toId: 'yang-mills', relationship: 'supplies the matter fermions coupled to the gauge fields of' },
  ],
  viz: {
    component: 'SpinAntimatter',
    kind: 'concept',
    defaultParams: { },
    caption: 'A concept visual of the Dirac spinor’s four components — spin-up/down for both electron and positron — and electron–positron annihilation into photons.',
    whatToTry: [
      'Toggle spin up/down for the electron and its antiparticle.',
      'Trigger annihilation and watch two 511 keV photons emerge back-to-back.',
      'Compare a particle and its mirror-charge antiparticle.',
    ],
  },
  primarySources: [
    {
      authors: 'P. A. M. Dirac',
      title: 'The Quantum Theory of the Electron',
      venue: 'Proceedings of the Royal Society A 117, 610',
      year: 1928,
      url: 'https://doi.org/10.1098/rspa.1928.0023',
      note: 'the relativistic electron equation',
      primary: true,
    },
    {
      authors: 'C. D. Anderson',
      title: 'The Positive Electron',
      venue: 'Physical Review 43, 491',
      year: 1933,
      note: 'discovery of the positron',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'G. Farmelo', title: 'The Strangest Man: The Hidden Life of Paul Dirac', venue: 'Basic Books', year: 2009 },
    { authors: 'M. Peskin & D. Schroeder', title: 'An Introduction to Quantum Field Theory', venue: 'Westview', year: 1995 },
  ],
  historyNote: `Dirac, famously taciturn and guided by an almost mystical faith in mathematical beauty, derived his equation in 1928 essentially by demanding a relativistic equation linear in time. When its negative-energy solutions appeared, he proposed (1930) that the vacuum is a filled "sea" of negative-energy states and that a hole in it is an antiparticle — first guessing it was the proton, before Weyl and others showed it must have the electron's mass. Carl Anderson found the positron in cosmic-ray tracks in 1932, and Dirac shared the 1933 Nobel Prize.

Dirac reportedly valued beauty over experimental agreement, later writing that "it is more important to have beauty in one's equations than to have them fit experiment" — a philosophy spectacularly vindicated here, as an equation written for the electron alone turned out to describe all matter.`,
};

export default dirac;
