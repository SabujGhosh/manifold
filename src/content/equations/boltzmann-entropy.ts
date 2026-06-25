import type { Equation } from '../types';

const boltzmannEntropy: Equation = {
  id: 'boltzmann-entropy',
  name: 'Boltzmann Entropy',
  nickname: 'the equation on his tombstone',
  canonicalLatex: 'S = k\\ln W',
  canonicalAlt: 'S equals k times the natural log of W',
  alternativeForms: [
    { latex: 'S = -k\\sum_i p_i\\ln p_i', label: 'Gibbs entropy (general probabilities)' },
    { latex: 'S = k\\ln\\Omega(E)', label: 'microcanonical: Ω = number of microstates at energy E' },
  ],
  fields: ['statistical-mechanics', 'thermodynamics'],
  era: { display: '1877', sortKey: 1877 },
  discoverers: [
    { name: 'Ludwig Boltzmann', note: 'statistical definition of entropy, 1877' },
    { name: 'J. Willard Gibbs', note: 'ensemble generalization' },
    { name: 'Max Planck', note: 'wrote it in the form S = k ln W and introduced k' },
  ],
  oneLine: 'Entropy counts the number of microscopic arrangements that look the same — disorder is just "many ways to be this way."',
  significance:
    'Boltzmann’s formula is the bridge between the microscopic world of atoms and the macroscopic law of thermodynamics: it defines entropy as (the log of) the number of microscopic states consistent with what we observe. It explains the second law of thermodynamics statistically — systems drift toward macrostates that can be realized in overwhelmingly more ways — and grounds the entire edifice of statistical mechanics, information theory, and our understanding of time’s arrow.',
  applications: [
    'Deriving thermodynamics (temperature, free energy) from microscopics',
    'Chemical equilibrium and reaction spontaneity (ΔG = ΔH − TΔS)',
    'Phase transitions, materials, and the physics of information/computing',
    'The statistical arrow of time and foundations of irreversibility',
  ],
  symbols: [
    { symbol: 'S', name: 'entropy', meaning: 'a measure of how many microstates realize the macrostate', units: 'J/K' },
    { symbol: 'k', name: 'Boltzmann constant', meaning: 'k_B = 1.381×10⁻²³, converts microstate-count to thermodynamic entropy', units: 'J/K' },
    { symbol: 'W', name: 'multiplicity', meaning: 'number of microstates corresponding to the macrostate (Ω)', units: 'dimensionless' },
    { symbol: 'p_i', name: 'state probability', meaning: 'probability of microstate i (Gibbs form)', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Disorder spreads because there are vastly more ways to be messy than tidy. Entropy is just the count of those ways.',
      equationForms: [{ latex: 'S = k\\ln W', caption: 'entropy = (a constant) × log of "number of ways"' }],
      body: `Why does milk stir into coffee but never un-stir? Why does a smell fill a room but never gather back into the bottle? Boltzmann found the stunningly simple reason: **there are far more ways to be spread out than to be neatly separated.**

Imagine shuffling a deck of cards. There's exactly *one* arrangement that is "perfectly sorted," but astronomically many that look "shuffled." Shuffle randomly and you get a messy order — not because the cards prefer mess, but because mess is overwhelmingly more common. Heat, gases, and mixing work the same way.

"Entropy" is just a number that counts how many microscopic arrangements give the same overall appearance. High entropy = many ways = what you almost always see. The relentless one-way drift toward higher entropy — milk mixing, ice melting, heat flowing from hot to cold — is the famous **second law of thermodynamics**, and it is really just counting.`,
      keyIdeas: [
        'Entropy counts the number of arrangements that look the same.',
        'Things spread out because spread-out states are far more numerous.',
        'The one-way arrow of everyday change is the second law.',
      ],
      glossedOver: 'We say things "always" go to higher entropy. It’s really overwhelmingly probable, not literally impossible to reverse — Level 4.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'A macrostate (what you measure) can be realized by $W$ microstates (exact arrangements). Entropy is $S = k\\ln W$; more ways means more entropy.',
      equationForms: [{ latex: 'S = k\\ln W,\\quad k = 1.38\\times10^{-23}\\ \\text{J/K}' }],
      body: `Distinguish two ideas. A **microstate** is the complete microscopic detail — exactly which molecule is where, moving how. A **macrostate** is what you can actually measure — temperature, pressure, "gas fills the box." Many microstates give the same macrostate; $W$ is how many.

Entropy is $S = k\\ln W$. The logarithm is there so that entropy **adds** for independent systems (their $W$'s multiply, and logs turn multiplication into addition). Because $W$ for everyday amounts of matter is unthinkably huge (think $10^{10^{23}}$), the macrostate with the largest $W$ utterly dominates — that's equilibrium, and the approach to it is the second law. The visualization shows particles in a box and counts microstates as they spread.`,
      keyIdeas: [
        'Microstate = full detail; macrostate = what you measure.',
        '$W$ = number of microstates for a macrostate.',
        'The log makes entropy additive; equilibrium = largest $W$.',
      ],
      workedExample: {
        prompt: 'Four distinguishable gas molecules are in a box; each is equally likely to be in the left or right half. Compare the entropy of "all 4 on the left" with "2 on each side."',
        solution: `Count microstates ($W$):

"All 4 left": only **1** arrangement, so $S = k\\ln 1 = 0$.

"2 left, 2 right": $\\binom{4}{2} = 6$ arrangements, so $S = k\\ln 6 \\approx 1.79k$.

The balanced macrostate has 6× the multiplicity, hence higher entropy — and you'd find the gas evenly spread far more often than all on one side. With $10^{23}$ molecules the imbalance becomes overwhelming: spontaneously finding them all on one side is effectively impossible.`,
      },
      misconceptions: [
        {
          claim: 'Entropy is literally "disorder," like a messy room.',
          correction:
            'It’s a count of microstates, which usually correlates with looking disordered but not always — e.g. oil and water *separating* can increase total entropy. Better to think "number of indistinguishable ways," not "untidiness."',
        },
      ],
      glossedOver: 'We counted positions only. Real microstates include momenta (a continuum), needing phase-space volume — Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'In the microcanonical ensemble $S = k\\ln\\Omega(E)$ over phase-space volume; temperature is $1/T = \\partial S/\\partial E$, and maximizing entropy yields the Boltzmann distribution.',
      equationForms: [
        { latex: 'S = k\\ln\\Omega(E),\\quad \\frac{1}{T} = \\frac{\\partial S}{\\partial E}' },
        { latex: 'p_i = \\frac{e^{-E_i/kT}}{Z},\\quad Z = \\sum_i e^{-E_i/kT}', caption: 'Boltzmann distribution / partition function' },
      ],
      body: `For a system at fixed energy (microcanonical ensemble), $\\Omega(E)$ is the phase-space volume of microstates at energy $E$ (with quantum mechanics supplying the natural cell size $h^{3N}$ and the $1/N!$ for indistinguishability). Then $S = k\\ln\\Omega$, and the **thermodynamic definitions emerge**: $1/T = \\partial S/\\partial E$ defines temperature, and $P/T = \\partial S/\\partial V$ defines pressure. Two systems in contact maximize total entropy by sharing energy until their temperatures equalize — the zeroth and second laws, derived.

Allowing energy exchange with a reservoir (canonical ensemble) and maximizing entropy subject to fixed mean energy gives the **Boltzmann distribution** $p_i \\propto e^{-E_i/kT}$, with the **partition function** $Z$ as the master object: $F = -kT\\ln Z$ yields all thermodynamics by differentiation. The **Gibbs form** $S = -k\\sum p_i\\ln p_i$ generalizes $S = k\\ln W$ (equal probabilities $p_i = 1/W$ recover it) and is identical in structure to Shannon's information entropy.`,
      keyIdeas: [
        '$S = k\\ln\\Omega$ over phase-space volume; $h$ sets the cell size.',
        '$1/T = \\partial S/\\partial E$ — temperature is a derivative of entropy.',
        'Maximize entropy ⇒ Boltzmann distribution $p_i\\propto e^{-E_i/kT}$.',
      ],
      workedExample: {
        prompt: 'Two systems with $\\Omega_1(E_1)$ and $\\Omega_2(E_2)$ exchange energy at fixed total $E$. Show equilibrium is where temperatures are equal.',
        solution: `Total multiplicity is $\\Omega = \\Omega_1(E_1)\\Omega_2(E-E_1)$; maximize $S = k\\ln\\Omega = S_1 + S_2$ over $E_1$:

$$\\frac{\\partial S}{\\partial E_1} = \\frac{\\partial S_1}{\\partial E_1} - \\frac{\\partial S_2}{\\partial E_2} = 0 \\;\\Rightarrow\\; \\frac{\\partial S_1}{\\partial E_1} = \\frac{\\partial S_2}{\\partial E_2}.$$

Since $\\partial S/\\partial E = 1/T$, this is $T_1 = T_2$. Entropy maximization *is* thermal equilibrium, and the most probable energy split is overwhelmingly sharp for macroscopic systems — fluctuations are $\\sim 1/\\sqrt{N}$.`,
      },
      glossedOver: 'We assumed equal a-priori probabilities and ergodicity. *Why* a deterministic, reversible system behaves irreversibly is the deep Level 4/5 question.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Boltzmann’s H-theorem derives the approach to equilibrium from molecular dynamics plus the Stosszahlansatz; the apparent conflict with time-reversal symmetry (Loschmidt) is resolved by initial conditions and overwhelming probability.',
      equationForms: [
        { latex: 'H = \\int f\\ln f\\,d^3v,\\qquad \\frac{dH}{dt}\\le 0', caption: 'H-theorem: −H increases toward equilibrium' },
        { latex: 'S = -k\\langle \\ln \\rho\\rangle = -k\\,\\mathrm{Tr}(\\rho\\ln\\rho)', caption: 'Gibbs / von Neumann entropy' },
      ],
      body: `Boltzmann's **H-theorem** shows that a quantity $H = \\int f\\ln f\\,d^3v$ (with $f$ the velocity distribution) monotonically decreases under the Boltzmann transport equation, so $S = -kH$ increases toward the Maxwell–Boltzmann equilibrium. But this seems to manufacture irreversibility from time-reversible mechanics — **Loschmidt's paradox** (reverse all velocities and entropy should decrease) and **Zermelo's** (Poincaré recurrence guarantees eventual return). The resolution: the H-theorem secretly assumes molecular chaos (the **Stosszahlansatz**, uncorrelated pre-collision velocities), which holds for generic initial conditions but is violated by the measure-zero, fine-tuned reversed state. Irreversibility is statistical and rests on a **low-entropy initial condition** (ultimately cosmological).

The Gibbs entropy $S = -k\\,\\mathrm{Tr}(\\rho\\ln\\rho)$ (von Neumann, quantum) is constant under exact Hamiltonian/unitary evolution, so the *observed* increase requires coarse-graining or entanglement with an environment — modern accounts use the eigenstate thermalization hypothesis and entanglement entropy. Practically, Boltzmann's relation closes thermodynamics: $F = -kT\\ln Z$ and Maxwell relations follow, and Landauer's principle ($k T\\ln 2$ per erased bit) ties it to information and the Maxwell's-demon resolution.`,
      keyIdeas: [
        'H-theorem ⇒ entropy increase, but assumes molecular chaos (Stosszahlansatz).',
        'Loschmidt/Zermelo paradoxes resolved by initial conditions + overwhelming probability.',
        'Fine-grained Gibbs/von Neumann entropy is constant; coarse-graining/entanglement gives the rise.',
      ],
      workedExample: {
        prompt: 'Explain why exactly reversing all molecular velocities does not actually let you watch entropy decrease in practice.',
        solution: `Time-reversal symmetry guarantees a microstate exists (all velocities flipped) whose future evolution retraces the past, with entropy decreasing. Mathematically valid — but this state is **infinitely fine-tuned**: the slightest perturbation (a stray photon, $10^{-23}$ rounding) destroys the delicate velocity correlations needed, and the system resumes increasing entropy.

The set of such "anti-thermodynamic" microstates has vanishingly small measure compared to the typical states. So while entropy decrease is not *forbidden*, it requires preparing an immeasurably special initial condition; among the overwhelming majority of microstates compatible with a given macrostate, entropy increases. Irreversibility is probabilistic, not absolute — exactly Boltzmann’s point.`,
      },
      glossedOver: 'Whether entropy is even well-defined for gravitating systems and black holes breaks this framework — Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Entropy-as-microstate-counting extends to black holes (Bekenstein–Hawking area law) and to quantum entanglement, where holography (S = A/4) suggests spacetime itself is statistical.',
      equationForms: [
        { latex: 'S_{\\text{BH}} = \\frac{k\\,c^3 A}{4 G\\hbar} = \\frac{k\\,A}{4\\ell_P^2}', caption: 'Bekenstein–Hawking black-hole entropy' },
        { latex: 'S_A = -k\\,\\mathrm{Tr}(\\rho_A\\ln\\rho_A)', caption: 'entanglement entropy of a region A' },
      ],
      body: `The deepest modern extensions push $S = k\\ln W$ into gravity and quantum information. A black hole carries entropy $S_{\\text{BH}} = kA/4\\ell_P^2$ proportional to its horizon **area**, not volume (Bekenstein–Hawking) — and Hawking radiation gives it a temperature, completing black-hole thermodynamics. Counting the microstates $W$ that this entropy implies is a primary test of any quantum-gravity theory: string theory reproduces it for extremal black holes via D-brane state counting (Strominger–Vafa), and loop quantum gravity via spin-network states. The area scaling is the seed of the **holographic principle** — that a region's degrees of freedom live on its boundary.

In quantum many-body systems, **entanglement entropy** $S_A = -k\\,\\mathrm{Tr}(\\rho_A\\ln\\rho_A)$ of a subregion generalizes Boltzmann/Gibbs entropy and obeys an "area law" in ground states, organizing tensor-network methods and the classification of phases. The Ryu–Takayanagi formula identifies entanglement entropy in a holographic CFT with a minimal-surface area in the dual gravity — making spacetime geometry *emerge* from entanglement. The **black-hole information paradox** and its recent island/replica-wormhole resolution are, at root, a fight over how to count $W$. Boltzmann's tombstone equation has become a probe of the quantum structure of spacetime.`,
      keyIdeas: [
        'Black-hole entropy scales with horizon area (Bekenstein–Hawking), not volume.',
        'Counting those microstates tests quantum gravity (string/LQG); seeds holography.',
        'Entanglement entropy generalizes $S=k\\ln W$; Ryu–Takayanagi ties it to geometry.',
      ],
      workedExample: {
        prompt: 'Estimate the entropy of a solar-mass black hole and compare to the Sun’s thermodynamic entropy (~10⁵⁸ k).',
        solution: `Horizon radius $r_s = 2GM/c^2 \\approx 3\\,\\text{km}$ for $M = M_\\odot$, area $A = 4\\pi r_s^2 \\approx 1.1\\times10^{8}\\,\\text{m}^2$. Planck area $\\ell_P^2 \\approx 2.6\\times10^{-70}\\,\\text{m}^2$:

$$S_{\\text{BH}} = \\frac{k A}{4\\ell_P^2} \\approx \\frac{1.1\\times10^{8}}{4\\times2.6\\times10^{-70}}\\,k \\approx 10^{77}\\,k.$$

That is $\\sim 10^{77}k$, roughly **a billion billion times** the Sun's ordinary entropy of $\\sim10^{58}k$. Black holes are by far the highest-entropy objects in the universe — the bulk of the cosmos's entropy budget — which is why gravitational collapse dominates the arrow of time on the largest scales.`,
      },
    },
  ],
  connections: [
    { toId: 'shannon-entropy', relationship: 'is mathematically identical (with a different constant) to' },
    { toId: 'ideal-gas', relationship: 'supplies the microstate counting that derives the thermodynamics of' },
    { toId: 'boltzmann-transport', relationship: 'increases monotonically under the dynamics of' },
  ],
  viz: {
    component: 'EntropyBox',
    kind: 'interactive',
    defaultParams: { particles: 60 },
    caption: 'Particles released in one corner spread through the box; a live counter shows the rising multiplicity (microstate count) and entropy.',
    whatToTry: [
      'Release the gas from one side and watch entropy climb as it spreads.',
      'Wait at equilibrium and watch tiny fluctuations — never a full reversal.',
      'Lower the particle count and see fluctuations become relatively larger.',
    ],
  },
  primarySources: [
    {
      authors: 'L. Boltzmann',
      title: 'Über die Beziehung zwischen dem zweiten Hauptsatze der mechanischen Wärmetheorie und der Wahrscheinlichkeitsrechnung',
      venue: 'Wiener Berichte 76',
      year: 1877,
      note: 'relates entropy to probability/microstate counting',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'D. Schroeder', title: 'An Introduction to Thermal Physics', venue: 'Addison-Wesley', year: 2000 },
    { authors: 'C. Rovelli', title: 'The Order of Time', venue: 'Riverhead', year: 2018 },
  ],
  historyNote: `Boltzmann's statistical view of entropy was fiercely resisted by influential contemporaries — Mach and Ostwald doubted atoms even existed. The attacks weighed on him; he suffered from depression and took his own life in 1906, just before atomic theory's decisive vindication (Einstein's 1905 explanation of Brownian motion and Perrin's experiments).

The exact formula $S = k\\log W$ was actually first written in that form by Max Planck (who also introduced the constant $k$ and named it after Boltzmann). It is nonetheless engraved on Boltzmann's tombstone in Vienna's Zentralfriedhof — a rare equation memorialized in stone.`,
};

export default boltzmannEntropy;
