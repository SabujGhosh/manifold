import type { Equation } from '../types';

const renormalizationGroup: Equation = {
  id: 'renormalization-group',
  name: 'RG / Beta Function',
  nickname: 'the physics of zooming in and out',
  canonicalLatex: '\\mu\\dfrac{dg}{d\\mu}=\\beta(g)',
  canonicalAlt: 'mu times d g by d mu equals beta of g',
  alternativeForms: [
    { latex: '\\beta(g) = \\beta_0 g^3 + \\beta_1 g^5 + \\cdots', label: 'perturbative expansion' },
    { latex: '\\beta(g_*) = 0', label: 'fixed point (scale-invariant theory)' },
  ],
  fields: ['qft', 'physics'],
  era: { display: '1954/1971', sortKey: 1954 },
  discoverers: [
    { name: 'Stueckelberg & Petermann; Gell-Mann & Low', note: 'the RG equation in QFT, 1953–54' },
    { name: 'Kenneth Wilson', note: 'the modern RG and theory of critical phenomena, 1971' },
  ],
  oneLine: 'How the effective strength of a force changes with the scale at which you look — the deep reason physics at different scales looks different.',
  significance:
    'The renormalization group explains why the laws of physics look different at different length/energy scales, and why this is not a flaw but a feature. It tamed the infinities of quantum field theory, predicted the running couplings of the Standard Model (including asymptotic freedom), and — in Wilson’s hands — explained the universality of phase transitions, where wildly different systems share the same critical exponents. It is one of the deepest unifying ideas in 20th-century physics.',
  applications: [
    'Running coupling constants in particle physics (QCD, grand unification)',
    'Critical phenomena and universality in phase transitions',
    'Explaining why simple effective theories work (e.g. why we can ignore quantum gravity in chemistry)',
    'Condensed matter: the Kondo problem, Fermi liquids, the Feigenbaum cascade',
  ],
  symbols: [
    { symbol: 'g', name: 'coupling constant', meaning: 'the effective interaction strength', units: 'dimensionless' },
    { symbol: '\\mu', name: 'scale', meaning: 'the energy or length scale at which the coupling is measured', units: 'energy (or 1/length)' },
    { symbol: '\\beta(g)', name: 'beta function', meaning: 'rate of change of the coupling with scale', units: 'dimensionless' },
    { symbol: 'g_*', name: 'fixed point', meaning: 'a coupling value where β = 0 (scale-invariant)', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'How "strong" a force is depends on how closely you look. The RG is the rulebook for how the world’s apparent laws change as you zoom in or out.',
      equationForms: [{ latex: '\\mu\\dfrac{dg}{d\\mu}=\\beta(g)', caption: 'how the force strength changes with zoom level' }],
      body: `A pointillist painting is a striking example: up close you see individual dots of color; step back and they blend into smooth figures. The "rules" of the picture genuinely change with viewing distance. The renormalization group (RG) is the physics of exactly this — how the effective laws of nature shift as you change the scale at which you observe.

Astonishingly, the *strength* of a fundamental force isn't a fixed number — it depends on how closely you probe. The electric force looks slightly stronger when you peer very close to an electron; the strong nuclear force does the opposite, fading as you zoom in (which lets quarks roam freely inside protons).

The RG's most beautiful payoff is **universality**: near a boiling point or a magnet's critical temperature, utterly different materials behave *identically* in their fine details, because zooming out washes away their differences and leaves only a few essential features. It explains why simple theories can describe complex worlds.`,
      keyIdeas: [
        'The effective strength of a force depends on the scale you probe.',
        'Zooming in or out changes the apparent laws (like a pointillist painting).',
        'Universality: very different systems behave identically near critical points.',
      ],
      glossedOver: 'We say strength "changes with scale." The precise statement — a flow equation for the coupling — is Level 2/3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The beta function tells you the rate at which a force’s strength $g$ changes as you change the scale $\\mu$. Its sign decides whether the force grows or shrinks as you zoom in.',
      equationForms: [{ latex: '\\mu\\dfrac{dg}{d\\mu}=\\beta(g)' }],
      body: `Write $g$ for the strength of a force and $\\mu$ for the energy scale (high energy = zooming in to short distances). The equation $\\mu\\,dg/d\\mu = \\beta(g)$ just says: the **rate** at which $g$ changes as you change scale is some function $\\beta(g)$.

The sign of $\\beta$ is everything:
- If $\\beta > 0$, the coupling **grows** as you zoom in. This is electromagnetism: the electric charge looks bigger at very short distances because a cloud of fleeting particles partly hides it from afar.
- If $\\beta < 0$, the coupling **shrinks** as you zoom in. This is the strong force: quarks interact weakly when very close (so they move almost freely inside a proton) but are bound ferociously as you try to separate them.

A special case is $\\beta = 0$: the coupling doesn't change at all with scale. The physics then looks the **same at every magnification** — exactly what happens at a critical point, where fluctuations appear at all sizes. The visualization shows a coupling flowing along the scale axis.`,
      keyIdeas: [
        '$\\beta(g)$ is the rate of change of force strength with scale.',
        '$\\beta>0$: force grows when you zoom in (electromagnetism); $\\beta<0$: shrinks (strong force).',
        '$\\beta=0$: scale-invariant — the same at all magnifications (critical points).',
      ],
      workedExample: {
        prompt: 'If a coupling obeys $\\beta(g) = -bg^3$ with $b>0$, does it grow or shrink at high energy, and what physical force does this describe?',
        solution: `With $\\beta = \\mu\\,dg/d\\mu = -bg^3 < 0$ (for $g>0$), increasing the scale $\\mu$ (zooming in to higher energy) *decreases* $g$. Solving the equation gives

$$g^2(\\mu) = \\frac{g_0^2}{1 + 2b\\,g_0^2\\ln(\\mu/\\mu_0)},$$

which falls toward zero as $\\mu\\to\\infty$. So the force becomes **weak at high energy** — this is **asymptotic freedom**, the defining property of the strong force (QCD). Conversely, at low energy ($\\mu$ small) the coupling grows large, signaling confinement. The single sign of $b$ captures why quarks are free up close and trapped far apart.`,
      },
      misconceptions: [
        {
          claim: 'Constants like the electric charge are truly constant.',
          correction:
            'The "fundamental constants" we quote are measured at a particular scale. The fine-structure constant α ≈ 1/137 at low energy grows to about 1/127 at the energy of the Z boson — measurably so. They run.',
        },
      ],
      glossedOver: 'We treated the running as a given. Where the infinities that require this come from is the Level 3 story.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Quantum loops give scale-dependent (divergent) corrections; renormalization absorbs them into running couplings, and the beta function makes physical predictions independent of the arbitrary reference scale.',
      equationForms: [
        { latex: '\\alpha(\\mu) = \\frac{\\alpha(\\mu_0)}{1 - \\frac{\\alpha(\\mu_0)}{3\\pi}\\ln(\\mu^2/\\mu_0^2)}', caption: 'running of the QED coupling' },
        { latex: '\\Big(\\mu\\partial_\\mu + \\beta\\partial_g + \\gamma\\,\\cdots\\Big)\\langle\\mathcal{O}\\rangle = 0', caption: "Callan–Symanzik equation" },
      ],
      body: `In quantum field theory, computing any process involves summing over virtual particles at *all* energies, which produces **divergent integrals**. **Renormalization** absorbs these infinities into redefinitions of a few parameters (charges, masses), at the cost of introducing an arbitrary reference scale $\\mu$. Physics can't depend on that arbitrary choice — which is exactly the constraint the RG enforces. The **Callan–Symanzik equation** states that physical quantities are invariant under changes of $\\mu$, provided the couplings *run* according to their beta functions.

So the "infinities" are not a disaster but a signal that couplings are **scale-dependent**. In QED, screening by virtual electron–positron pairs gives $\\beta > 0$ and the famous logarithmic growth of $\\alpha$ with energy. The RG also classifies which interactions matter at low energy: **relevant**, **marginal**, and **irrelevant** couplings (by their scaling dimension), explaining *why* only a handful of renormalizable terms govern low-energy physics — the rest are suppressed by powers of (energy/cutoff). This is the modern **effective field theory** viewpoint: every theory is an effective description valid up to some scale.`,
      keyIdeas: [
        'Quantum loops diverge; renormalization trades infinities for a scale-dependent coupling.',
        'Callan–Symanzik: physics is independent of the arbitrary scale ⇒ couplings must run.',
        'Relevant/marginal/irrelevant couplings explain why few terms dominate at low energy.',
      ],
      workedExample: {
        prompt: 'The QED coupling runs as $\\alpha(\\mu)^{-1} = \\alpha(\\mu_0)^{-1} - \\tfrac{1}{3\\pi}\\ln(\\mu^2/\\mu_0^2)$. Estimate $\\alpha$ at the Z mass (91 GeV) given $\\alpha(m_e)\\approx 1/137$.',
        solution: `Strictly one sums all charged particles in the loop, but to illustrate the trend take the leading log from $m_e \\approx 0.5\\,\\text{MeV}$ to $m_Z \\approx 91\\,\\text{GeV}$:

$$\\ln\\frac{m_Z^2}{m_e^2} = 2\\ln\\frac{91\\times10^3}{0.5} \\approx 2\\ln(1.8\\times10^5) \\approx 24.4.$$

So $\\alpha^{-1}$ decreases by roughly $\\tfrac{1}{3\\pi}(24.4)\\approx 2.6$ per charged species; summing over all Standard-Model fermions gives the measured shift from $137$ down to about $128$ at $m_Z$. The coupling has grown from $1/137$ to $\\approx 1/128$ — a ~7% increase, directly measured at LEP. The charge you "see" genuinely depends on how hard you probe.`,
      },
      glossedOver: 'This is the particle-physics face. Wilson’s real-space RG and critical phenomena are a deeper, more general Level 4 picture.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Wilson’s RG integrates out short-distance degrees of freedom step by step; fixed points and the flow of couplings explain universality and compute critical exponents.',
      equationForms: [
        { latex: '\\nu^{-1} = \\frac{\\partial\\beta_t}{\\partial t}\\Big|_{*},\\quad \\xi \\sim |T-T_c|^{-\\nu}', caption: 'critical exponent from the linearized flow near a fixed point' },
        { latex: 'Z[\\phi] \\to Z[\\phi\'],\\ \\text{integrate modes } \\Lambda/b < |k| < \\Lambda', caption: 'Wilsonian coarse-graining' },
      ],
      body: `Kenneth Wilson reconceived the RG as **coarse-graining**: integrate out short-wavelength fluctuations (modes between $\\Lambda/b$ and $\\Lambda$), rescale, and watch how the effective couplings flow. Iterating defines a flow in the space of all possible couplings, and its **fixed points** ($\\beta = 0$) are scale-invariant theories. The structure of the flow *near* a fixed point — specifically the eigenvalues of the linearized flow — determines everything observable at a continuous phase transition.

This solved the deep puzzle of **universality**: near a critical point (the liquid–gas critical point, a ferromagnet's Curie point, a binary alloy), the correlation length $\\xi$ diverges, fluctuations occur at all scales, and microscopic details become **irrelevant** in the precise RG sense. Systems flowing to the *same* fixed point share identical **critical exponents** ($\\nu, \\beta, \\gamma, \\dots$) regardless of their microscopic makeup — explaining why a fluid and a magnet have the same exponents (the same universality class). Wilson's $\\epsilon$-expansion (working in $4-\\epsilon$ dimensions) made these exponents *computable*, matching experiment. The RG also justifies **effective field theory** rigorously: irrelevant operators die under the flow, which is why low-energy physics is insensitive to unknown high-energy details — why we can do chemistry without knowing quantum gravity. (The logistic map's Feigenbaum constants are the RG fixed point of a period-doubling operator — the same idea in dynamics.)`,
      keyIdeas: [
        'Wilsonian RG = integrate out short scales, rescale, follow the coupling flow.',
        'Fixed points + linearized flow ⇒ universality and computable critical exponents.',
        'Irrelevant operators vanish under flow ⇒ effective field theory is justified.',
      ],
      workedExample: {
        prompt: 'Explain, via the RG, why a boiling fluid and a ferromagnet near its Curie point share the same critical exponents.',
        solution: `Near their critical points both systems develop a diverging correlation length $\\xi \\to \\infty$, so fluctuations occur at *all* length scales — the system is scale-invariant. Under repeated RG coarse-graining, the microscopic Hamiltonians of the fluid and the magnet flow through the space of couplings.

The key fact: their flows are attracted to the **same fixed point** (here, the 3-D Ising fixed point), because the microscopic differences correspond to **irrelevant** couplings that shrink to zero under the flow. Only the dimensionality and the symmetry of the order parameter (a single scalar, $\\mathbb{Z}_2$) determine which fixed point governs them — these define the **universality class**.

Since the critical exponents are set entirely by the linearized flow *at that fixed point*, both systems inherit identical exponents ($\\nu \\approx 0.63$, etc.), even though one is about density and the other about magnetization. Universality is the statement that the fixed point, not the microscopic details, controls critical behavior.`,
      },
      glossedOver: 'We assumed fixed points exist and are well-behaved. Their classification, non-perturbative RG, and asymptotic safety are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The RG is a unifying meta-principle: it organizes QFT and statistical mechanics via the space of theories, with frontiers in conformal/critical theory, asymptotic safety, holographic RG, and the irreversibility of RG flow (c/a-theorems).',
      equationForms: [
        { latex: 'c_{\\text{UV}} \\ge c_{\\text{IR}}', caption: "Zamolodchikov c-theorem: RG flow is irreversible" },
        { latex: '\\beta(g_*) = 0,\\ \\text{nontrivial} \\Rightarrow \\text{interacting CFT / asymptotic safety}' },
      ],
      body: `In the modern view the RG is a flow on the infinite-dimensional **space of quantum field theories**, with fixed points being **conformal field theories** (CFTs) — scale- (usually conformal-) invariant theories that anchor both ends of every flow. The **conformal bootstrap** now solves strongly-coupled CFTs (e.g. the 3-D Ising model to record precision) directly from symmetry and consistency, sidestepping perturbation theory. Crucially, RG flow is **irreversible**: Zamolodchikov's **c-theorem** (2-D) and the $a$-theorem (4-D, Komargodski–Schwimmer) prove a quantity monotonically decreases from UV to IR — degrees of freedom are lost as one coarse-grains, a kind of thermodynamic arrow for theory space.

Frontiers radiate outward. **Asymptotic safety** asks whether gravity (or other non-renormalizable theories) is saved by a nontrivial UV fixed point, making it predictive despite naive non-renormalizability — an active program for quantum gravity. **Holographic RG** identifies the RG flow of a boundary CFT with radial evolution in a higher-dimensional gravitational bulk (AdS/CFT), geometrizing scale itself. The functional/exact RG (Wetterich equation) provides non-perturbative tools across particle and condensed-matter physics, and RG ideas now permeate machine learning (deep networks as coarse-graining), turbulence, and the theory of complex systems. Wilson's insight — that the right way to understand a system is to ask how it changes under change of scale — has become one of the organizing principles of all of physics.`,
      keyIdeas: [
        'RG = flow on the space of theories; fixed points are conformal field theories.',
        'Flow is irreversible (c-/a-theorems): degrees of freedom decrease UV→IR.',
        'Frontiers: conformal bootstrap, asymptotic safety (gravity), holographic RG (AdS/CFT).',
      ],
      workedExample: {
        prompt: 'State the c-theorem and explain why it expresses an "arrow" for renormalization-group flow.',
        solution: `**c-theorem (Zamolodchikov, 1986, 2-D).** There exists a function $c$ on the space of couplings that (i) is non-increasing along RG flow toward the infrared, $dc/d(\\ln\\mu) \\le 0$, and (ii) equals the central charge of the CFT at any fixed point, so $c_{\\text{UV}} \\ge c_{\\text{IR}}$.

Since the central charge counts (roughly) the number of degrees of freedom of a conformal theory, the theorem says **degrees of freedom are monotonically lost as you flow from short to long distances** — coarse-graining throws away short-distance information and cannot create it. This makes RG flow **irreversible**: you cannot flow from an IR theory back up to a UV theory with more degrees of freedom, an "arrow of scale" analogous to the second law of thermodynamics' arrow of time.

The 4-D generalization is the **$a$-theorem** (Komargodski–Schwimmer, 2011), with the $a$-anomaly coefficient playing the role of $c$. Both forbid certain RG flows and constrain the possible phases of quantum field theories — a powerful, nearly model-independent organizing principle.`,
      },
    },
  ],
  connections: [
    { toId: 'yang-mills', relationship: 'reveals the asymptotic freedom of' },
    { toId: 'logistic-map', relationship: 'explains via a fixed point the Feigenbaum universality of' },
    { toId: 'boltzmann-entropy', relationship: 'organizes the critical phenomena and phase transitions described statistically by' },
    { toId: 'maxwell', relationship: 'makes scale-dependent the coupling of' },
  ],
  viz: {
    component: 'RunningCoupling',
    kind: 'interactive',
    defaultParams: { beta0: -1 },
    caption: 'Plot a coupling flowing along the energy-scale axis under its beta function; flip the sign of β to switch between asymptotic freedom and a Landau-pole-style blowup.',
    whatToTry: [
      'Set β < 0 and watch the coupling fade at high energy (asymptotic freedom).',
      'Set β > 0 and watch it grow toward a Landau pole.',
      'Tune β toward 0 to approach a scale-invariant fixed point.',
    ],
  },
  primarySources: [
    {
      authors: 'M. Gell-Mann & F. E. Low',
      title: 'Quantum Electrodynamics at Small Distances',
      venue: 'Physical Review 95, 1300',
      year: 1954,
      url: 'https://doi.org/10.1103/PhysRev.95.1300',
      note: 'the RG equation in QED',
      primary: true,
    },
    {
      authors: 'K. G. Wilson',
      title: 'Renormalization Group and Critical Phenomena',
      venue: 'Physical Review B 4, 3174',
      year: 1971,
      url: 'https://doi.org/10.1103/PhysRevB.4.3174',
      note: 'the modern RG; 1982 Nobel Prize',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'M. E. Peskin & D. V. Schroeder', title: 'An Introduction to Quantum Field Theory (Ch. 12)', venue: 'Westview', year: 1995 },
    { authors: 'J. Cardy', title: 'Scaling and Renormalization in Statistical Physics', venue: 'Cambridge University Press', year: 1996 },
  ],
  historyNote: `The RG equation appeared in particle physics in the early 1950s (Stueckelberg–Petermann; Gell-Mann–Low) as a technical tool for managing the scale-dependence of renormalized QED. Its profound generalization came from **Kenneth Wilson** in 1971, who fused field theory with Leo Kadanoff's "block-spin" picture of critical phenomena to explain universality — work so transformative it earned him a solo 1982 Nobel Prize.

Wilson's RG united two fields that had seemed unrelated — quantum field theory and the statistical mechanics of phase transitions — under one idea: physics is organized by how it transforms under changes of scale. The same machinery later illuminated the logistic map's Feigenbaum constants (Feigenbaum explicitly used RG language), tying chaos theory into the web.`,
};

export default renormalizationGroup;
