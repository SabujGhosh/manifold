import type { Equation } from '../types';

const yangMills: Equation = {
  id: 'yang-mills',
  name: 'Yang–Mills Equations',
  nickname: 'the blueprint of the forces',
  canonicalLatex: 'D_\\mu F^{\\mu\\nu}=J^\\nu,\\ F_{\\mu\\nu}=\\partial_\\mu A_\\nu-\\partial_\\nu A_\\mu+g[A_\\mu,A_\\nu]',
  canonicalAlt:
    'D mu F mu nu equals J nu, where F mu nu equals partial mu A nu minus partial nu A mu plus g times the commutator of A mu and A nu',
  alternativeForms: [
    { latex: '\\mathcal{L} = -\\tfrac14 F^a_{\\mu\\nu}F^{a\\,\\mu\\nu}', label: 'Yang–Mills Lagrangian' },
    { latex: 'D_\\mu = \\partial_\\mu - ig A_\\mu^a T^a', label: 'gauge covariant derivative' },
  ],
  fields: ['qft', 'physics'],
  era: { display: '1954', sortKey: 1954 },
  discoverers: [
    { name: 'Chen-Ning Yang & Robert Mills', note: 'non-abelian gauge theory, 1954' },
    { name: "'t Hooft & Veltman", note: 'proof of renormalizability, 1971' },
  ],
  oneLine: 'The generalization of Maxwell’s equations whose self-interacting force fields describe the strong and weak nuclear forces.',
  significance:
    'Yang–Mills theory generalizes electromagnetism from the simple U(1) symmetry to non-commuting (non-abelian) symmetry groups, making the force-carrying fields interact with themselves. This single framework, combined with the Higgs mechanism and quark color, is the mathematical backbone of the Standard Model — the electroweak and strong interactions. Its quantum properties (asymptotic freedom, confinement) explain why quarks bind into protons, and its mathematical depth is recognized by a \\$1 million Millennium Prize.',
  applications: [
    'The Standard Model: strong (QCD) and electroweak forces',
    'Explaining quark confinement and asymptotic freedom',
    'Particle-physics predictions tested at the LHC (e.g. the Higgs, gluon jets)',
    'Deep mathematics: Donaldson theory of 4-manifolds, instantons',
  ],
  symbols: [
    { symbol: 'A_\\mu', name: 'gauge field', meaning: 'the force-carrying potential (matrix-valued for non-abelian groups)', units: 'mixed' },
    { symbol: 'F_{\\mu\\nu}', name: 'field strength', meaning: 'the non-abelian curvature, including self-interaction', units: 'mixed' },
    { symbol: 'D_\\mu', name: 'covariant derivative', meaning: 'derivative that respects the gauge symmetry', units: '1/m' },
    { symbol: 'g', name: 'coupling constant', meaning: 'strength of the interaction (and of self-interaction)', units: 'dimensionless' },
    { symbol: 'T^a', name: 'group generators', meaning: 'the (non-commuting) generators of the symmetry group', units: 'dimensionless' },
    { symbol: 'J^\\nu', name: 'current', meaning: 'the matter source current', units: 'A/m²-like' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Take the math that describes light and twist it so the force field can push on *itself*. That twist describes the forces holding atomic nuclei together.',
      equationForms: [{ latex: 'F_{\\mu\\nu}=\\partial_\\mu A_\\nu-\\partial_\\nu A_\\mu+g[A_\\mu,A_\\nu]', caption: 'the extra term [A,A] is the self-interaction' }],
      body: `Maxwell's equations describe light and electricity beautifully, and they spring from a hidden **symmetry**. Yang and Mills asked: what if we replace that simple symmetry with a richer, more complicated one — where the order of operations matters (like rotations in 3-D, which don't commute)?

The answer transformed physics. In this richer theory, the force-carrying field **interacts with itself**. Photons (light) ignore each other — two beams pass right through. But the analogous particles here, like the **gluons** that carry the strong nuclear force, grab onto one another. That self-stickiness has dramatic consequences: it's why quarks are permanently trapped inside protons and neutrons (you can never isolate a single quark), and it shapes the weak force behind radioactive decay.

Yang–Mills theory is the template for three of the four fundamental forces. It's so mathematically rich that proving certain basic facts about it carries a million-dollar prize.`,
      keyIdeas: [
        'It generalizes the symmetry behind electromagnetism to a richer one.',
        'The force field interacts with itself (unlike light).',
        'It describes the strong and weak nuclear forces; quarks get trapped.',
      ],
      glossedOver: 'We say "symmetry" loosely. The precise idea — a gauge group like SU(3) — is Level 3/4.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Electromagnetism has a simple "phase" symmetry. Yang–Mills uses a symmetry whose operations don’t commute, adding a self-interaction term and producing forces that behave very differently from light.',
      equationForms: [
        { latex: 'D_\\mu F^{\\mu\\nu} = J^\\nu', caption: 'looks like Maxwell, but D and F now carry self-interaction' },
      ],
      body: `Think of a symmetry as a knob you can turn without changing the physics. Electromagnetism's knob is a simple dial (you can turn it by any angle, and turning it by A then B is the same as B then A). Yang–Mills replaces that dial with something like **3-D rotations**, where order *matters*: rotating a book about two different axes gives different results depending on which you do first. Such symmetries are called **non-abelian**.

When the symmetry is non-abelian, the equations look superficially like Maxwell's but gain an extra **self-interaction** term (the $[A,A]$ piece). The force carriers now tug on each other. For the **strong force** (symmetry group called SU(3), with three "colors" of charge), this self-interaction makes the force *grow* with distance — pull two quarks apart and the attraction increases, like a stretching rubber band, until it snaps into new particles. That's why isolated quarks are never seen.`,
      keyIdeas: [
        'Non-abelian = the symmetry operations don’t commute (order matters).',
        'This adds a self-interaction the photon doesn’t have.',
        'The strong force grows with distance → quark confinement.',
      ],
      workedExample: {
        prompt: 'Why can you never pull a single quark out of a proton, in contrast to pulling an electron off an atom?',
        solution: `Electric force (abelian, photons don't self-interact) *weakens* with distance ($1/r^2$), so with enough energy you can ionize an atom and free an electron.

The strong force (Yang–Mills, gluons self-interact) behaves oppositely: the gluon field forms a narrow "flux tube" between quarks whose energy *grows linearly* with separation, $V(r) \\approx \\sigma r$. To separate quarks by distance $r$ you'd need energy $\\sigma r$ that increases without bound.

Long before you succeed, you've pumped in enough energy ($E = mc^2$) to create a new quark–antiquark pair from the vacuum, which caps the ends — you get *two* mesons, not a free quark. This **confinement** is a direct consequence of gluon self-interaction, the hallmark of non-abelian gauge theory.`,
      },
      misconceptions: [
        {
          claim: 'Yang–Mills is just a fancier version of electromagnetism with no new behavior.',
          correction:
            'The self-interaction changes everything: confinement and asymptotic freedom (the force *weakening* at short range) have no electromagnetic analog. The math is also vastly harder — it’s nonlinear even with no matter present.',
        },
      ],
      glossedOver: 'We described symmetry groups intuitively. The covariant derivative and the role of the commutator are Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Demanding local invariance under a non-abelian group G introduces a matrix-valued gauge field A; the non-commuting generators make F nonlinear in A, so the field self-interacts.',
      equationForms: [
        { latex: 'D_\\mu = \\partial_\\mu - ig A_\\mu^a T^a,\\quad [T^a, T^b] = if^{abc}T^c', caption: 'covariant derivative and Lie algebra' },
        { latex: 'F_{\\mu\\nu}^a = \\partial_\\mu A_\\nu^a - \\partial_\\nu A_\\mu^a + g f^{abc}A_\\mu^b A_\\nu^c' },
      ],
      body: `The **gauge principle**: require the theory to be invariant under a *local* (spacetime-dependent) symmetry transformation from a group $G$. For $G = U(1)$ this forces electromagnetism. For a non-abelian $G$ (like $SU(2)$ or $SU(3)$), the symmetry has multiple non-commuting generators $T^a$ with $[T^a, T^b] = if^{abc}T^c$, and maintaining invariance requires a **matrix-valued** gauge field $A_\\mu = A_\\mu^a T^a$ and the covariant derivative $D_\\mu = \\partial_\\mu - igA_\\mu$.

The field strength $F_{\\mu\\nu} = \\tfrac{i}{g}[D_\\mu, D_\\nu]$ then picks up the commutator term $gf^{abc}A^b_\\mu A^c_\\nu$ — quadratic in $A$. This nonlinearity is the **self-interaction**: the Lagrangian $-\\tfrac14 F^a_{\\mu\\nu}F^{a\\mu\\nu}$, when expanded, contains three- and four-gauge-boson vertices absent in electromagnetism. So even with *no matter at all*, pure Yang–Mills theory is a nonlinear, interacting field theory — gluons scatter off gluons. The geometric reading: $A$ is a connection on a principal $G$-bundle and $F$ its curvature, exactly generalizing Maxwell's $U(1)$ bundle.`,
      keyIdeas: [
        'Local non-abelian symmetry forces a matrix-valued gauge field A.',
        'Non-commuting generators make F nonlinear in A → self-interaction vertices.',
        'Geometrically, A is a connection and F its curvature on a G-bundle.',
      ],
      workedExample: {
        prompt: 'Show that for an abelian group (like U(1)), the commutator term vanishes and Yang–Mills reduces to Maxwell.',
        solution: `The extra term is $gf^{abc}A^b_\\mu A^c_\\nu$, where $f^{abc}$ are the structure constants defined by $[T^a, T^b] = if^{abc}T^c$.

For an **abelian** group, all generators commute: $[T^a, T^b] = 0$, so every structure constant $f^{abc} = 0$. The field strength collapses to

$$F_{\\mu\\nu} = \\partial_\\mu A_\\nu - \\partial_\\nu A_\\mu,$$

which is exactly Maxwell's field-strength tensor, and $D_\\mu F^{\\mu\\nu} = J^\\nu$ becomes Maxwell's equations. So electromagnetism is the abelian ($U(1)$) special case — the self-interaction exists *only* when the symmetry is non-abelian, which is the entire qualitative difference between light and gluons.`,
      },
      glossedOver: 'Classically the gauge bosons are massless. Giving the weak bosons mass (Higgs) and the quantum behaviour (asymptotic freedom) is Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Quantized Yang–Mills is renormalizable (’t Hooft–Veltman); the non-abelian self-interaction drives asymptotic freedom (QCD) and, with the Higgs mechanism, gives the massive W/Z of the electroweak theory.',
      equationForms: [
        { latex: '\\beta(g) = -\\Big(11 - \\tfrac23 n_f\\Big)\\frac{g^3}{16\\pi^2} < 0', caption: 'negative β-function → asymptotic freedom' },
        { latex: 'D_\\mu\\Phi,\\ \\langle\\Phi\\rangle \\neq 0 \\Rightarrow m_W, m_Z', caption: 'Higgs mechanism gives gauge-boson masses' },
      ],
      body: `Quantizing non-abelian gauge theory required new machinery — **Faddeev–Popov ghosts** and BRST symmetry to handle gauge redundancy in the path integral — and 't Hooft and Veltman's 1971 proof that it is **renormalizable** (1999 Nobel) made it a viable theory of nature. The decisive physical result is the sign of the **beta function**: for QCD ($SU(3)$ with few enough quark flavors) it is *negative*, so the coupling **weakens at high energy** — **asymptotic freedom** (Gross, Politzer, Wilczek; 2004 Nobel). This explains why quarks behave almost freely in deep-inelastic scattering yet are confined at low energy, and it makes high-energy QCD calculable in perturbation theory.

The other triumph is the **electroweak** theory: $SU(2)_L \\times U(1)_Y$ Yang–Mills, spontaneously broken by the **Higgs** field's vacuum expectation value, gives masses to the $W$ and $Z$ bosons (short-ranged weak force) while leaving the photon massless — unifying electromagnetism and the weak interaction (Glashow–Weinberg–Salam). Together, $SU(3)\\times SU(2)\\times U(1)$ Yang–Mills *is* the Standard Model gauge sector, validated by the discovery of the $W/Z$ (1983), gluon jets, and the Higgs boson (2012). Confinement, though universally observed and supported by lattice QCD, lacks an analytic proof — the content of the Clay Millennium "Yang–Mills mass gap" problem.`,
      keyIdeas: [
        'Renormalizable (’t Hooft–Veltman); needs ghosts/BRST to quantize.',
        'Negative β-function ⇒ asymptotic freedom (QCD); confinement at low energy.',
        'Electroweak: $SU(2)\\times U(1)$ + Higgs gives massive W/Z, massless photon.',
      ],
      workedExample: {
        prompt: 'Contrast the running of the QCD coupling with that of QED, and state the physical consequence.',
        solution: `Both couplings "run" with energy scale via their beta functions. In **QED** (abelian), vacuum polarization from electron–positron pairs *screens* charge, so the coupling **grows** with energy: $\\beta_{\\text{QED}} > 0$.

In **QCD** (non-abelian), the gluon self-interaction adds an *anti-screening* contribution that dominates:

$$\\beta(g) = -\\Big(11 - \\tfrac23 n_f\\Big)\\frac{g^3}{16\\pi^2}.$$

With $n_f = 6$ quark flavors, $11 - \\tfrac23(6) = 7 > 0$, so $\\beta < 0$: the coupling **shrinks** at high energy (**asymptotic freedom**) and **grows** at low energy (toward confinement). Physically: quarks rattle around nearly free inside a proton probed at high energy, but cannot be separated at low energy. The gluon's self-interaction — the defining Yang–Mills feature — is precisely what flips the sign relative to QED.`,
      },
      glossedOver: 'Confinement and the mass gap are not analytically proven; instantons, lattice, and the math of moduli spaces are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Yang–Mills is simultaneously the deepest part of the Standard Model and a frontier of mathematics — non-perturbative structure (instantons, confinement, the mass gap), Donaldson/Seiberg–Witten theory, and AdS/CFT.',
      equationForms: [
        { latex: 'S_{\\text{inst}} = \\frac{8\\pi^2}{g^2}|Q|,\\quad Q = \\frac{1}{32\\pi^2}\\int \\epsilon^{\\mu\\nu\\rho\\sigma}F^a_{\\mu\\nu}F^a_{\\rho\\sigma}', caption: 'instanton action and topological charge' },
        { latex: '\\exists\\, \\Delta > 0:\\ \\text{spectrum of } H \\subset \\{0\\}\\cup[\\Delta,\\infty)', caption: 'the conjectured mass gap (Millennium Problem)' },
      ],
      body: `Non-perturbatively, Yang–Mills theory is extraordinarily rich. Its vacuum has **topological structure**: finite-action **instantons** (self-dual configurations $F = \\star F$ labeled by an integer winding number $Q$) mediate tunneling between topologically distinct vacua, generating the $\\theta$-vacuum and the **strong-CP problem** (why $\\theta$ is unobservably tiny — possibly explained by the axion). Anomalies, the chiral structure, and 't Hooft's large-$N$ expansion organize the strong-coupling regime; **lattice gauge theory** computes confinement and hadron masses from first principles numerically, but an *analytic* proof of confinement and a **mass gap** — that pure $SU(N)$ Yang–Mills has a lowest excitation of strictly positive mass $\\Delta$ — remains open and is one of the seven **Clay Millennium Prize Problems**.

The mathematical reach is equally deep. **Donaldson theory** used Yang–Mills instanton moduli spaces to discover exotic smooth structures on 4-manifolds (and the existence of exotic $\\mathbb{R}^4$), later complemented by the **Seiberg–Witten** equations from a dual supersymmetric gauge theory — physics reshaping topology. **Electric–magnetic duality** (Montonen–Olive, Seiberg–Witten) and the **AdS/CFT correspondence** (where $\\mathcal{N}=4$ Yang–Mills is dual to a gravity theory) make strongly-coupled gauge theory tractable and tie it to quantum gravity. Yang and Mills's 1954 attempt to extend a symmetry turned out to be the common language of particle physics, the source of a Millennium Problem, and a generator of new mathematics.`,
      keyIdeas: [
        'Topological vacuum: instantons, θ-vacuum, strong-CP problem.',
        'Confinement & mass gap: numerically seen (lattice), analytically open — a Millennium Problem.',
        'Donaldson/Seiberg–Witten theory and AdS/CFT link Yang–Mills to topology and quantum gravity.',
      ],
      workedExample: {
        prompt: 'State the Yang–Mills mass-gap Millennium Problem and why it is hard.',
        solution: `**The problem.** Prove that for any compact simple gauge group $G$, quantum Yang–Mills theory on $\\mathbb{R}^4$ exists as a rigorous (constructive) quantum field theory *and* has a **mass gap** $\\Delta > 0$: the lightest excitation above the vacuum has strictly positive mass, even though the classical theory has only massless gluons.

**Why it's hard.** (1) It is inherently **non-perturbative** — the gap appears at strong coupling, where the perturbative expansion (the only systematic analytic tool) fails. (2) No rigorous **constructive** definition of 4-D Yang–Mills yet exists; even defining the theory mathematically (controlling the continuum limit) is unsolved. (3) The gap is tied to **confinement**, whose mechanism (dual superconductivity, center vortices, …) is understood only heuristically and numerically (lattice QCD shows a gap convincingly, but that is not a proof).

A solution would require either a breakthrough in constructive QFT or a fundamentally new handle on strong-coupling gauge dynamics — hence the \\$1M prize and its standing as a touchstone of mathematical physics.`,
      },
    },
  ],
  connections: [
    { toId: 'maxwell', relationship: 'generalizes from abelian U(1) the gauge theory of' },
    { toId: 'dirac', relationship: 'couples to the matter fermions described by' },
    { toId: 'renormalization-group', relationship: 'has its asymptotic freedom revealed by' },
    { toId: 'euler-lagrange', relationship: 'is derived by varying its gauge-invariant Lagrangian via' },
  ],
  viz: {
    component: 'GaugeField',
    kind: 'concept',
    defaultParams: { },
    caption: 'A concept visual contrasting non-interacting photons (abelian) with self-interacting gluons (non-abelian), and the confining flux tube between quarks.',
    whatToTry: [
      'Compare two photon beams passing through vs. gluons that scatter.',
      'Pull two quarks apart and watch the flux tube stretch and snap into new particles.',
      'See three- and four-gluon vertices absent in electromagnetism.',
    ],
  },
  primarySources: [
    {
      authors: 'C. N. Yang & R. L. Mills',
      title: 'Conservation of Isotopic Spin and Isotopic Gauge Invariance',
      venue: 'Physical Review 96, 191',
      year: 1954,
      url: 'https://doi.org/10.1103/PhysRev.96.191',
      note: 'introduces non-abelian gauge theory',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'A. Zee', title: 'Quantum Field Theory in a Nutshell', venue: 'Princeton University Press', year: 2010 },
    { authors: 'A. Jaffe & E. Witten', title: 'Quantum Yang–Mills Theory (Clay Problem description)', venue: 'Clay Mathematics Institute', year: 2000, url: 'https://www.claymath.org/millennium-problems/' },
  ],
  historyNote: `Yang and Mills published their non-abelian theory in 1954, but it faced an immediate, devastating objection — raised sharply by Pauli, who had explored similar ideas: the gauge bosons appeared to be massless, yet no massless strongly-interacting particles were seen. Pauli reportedly heckled Yang's seminar so persistently over this that Yang had to sit down. The theory languished for nearly two decades.

Its rescue came in stages: the Higgs mechanism (1964) explained how the bosons could acquire mass, 't Hooft and Veltman proved renormalizability (1971), and asymptotic freedom (1973) made QCD viable. What began as a speculative mathematical extension became the framework for three of nature's four forces — and Yang himself ranked it among his proudest work, above the parity-violation discovery that won him the Nobel.`,
};

export default yangMills;
