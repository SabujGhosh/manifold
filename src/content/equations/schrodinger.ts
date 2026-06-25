import type { Equation } from '../types';

const schrodinger: Equation = {
  id: 'schrodinger',
  name: 'The Schrödinger Equation',
  nickname: 'the F = ma of the quantum world',
  canonicalLatex: 'i\\hbar\\,\\partial_t\\psi=\\hat H\\psi',
  canonicalAlt: 'i h-bar times the time derivative of psi equals H-hat psi',
  alternativeForms: [
    { latex: 'i\\hbar\\,\\partial_t\\psi = -\\dfrac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi', label: 'for a particle in a potential' },
    { latex: '\\hat H\\psi = E\\psi', label: 'time-independent (stationary states)' },
  ],
  fields: ['quantum', 'physics'],
  era: { display: '1926', sortKey: 1926 },
  discoverers: [
    { name: 'Erwin Schrödinger', note: 'wave mechanics, 1926' },
    { name: 'Max Born', note: 'probability interpretation of |ψ|²' },
  ],
  oneLine: 'The master equation of quantum mechanics: it dictates how a particle’s wavefunction evolves in time.',
  significance:
    'The Schrödinger equation is to quantum mechanics what Newton’s second law is to classical mechanics — the equation of motion for the wavefunction. It quantizes energy levels (explaining atomic spectra, chemical bonds, and the periodic table), predicts tunneling, and underlies all of chemistry, condensed-matter physics, and quantum technology. Its solutions are probability amplitudes whose squared magnitude gives the odds of finding a particle.',
  applications: [
    'Atomic and molecular structure; all of quantum chemistry',
    'Semiconductors, transistors, lasers, and LEDs',
    'Scanning tunneling microscopes and tunnel diodes (quantum tunneling)',
    'Quantum computing and the design of quantum materials',
  ],
  symbols: [
    { symbol: '\\psi', name: 'wavefunction', meaning: 'complex amplitude whose |ψ|² gives probability density', units: 'depends on dimension (e.g. m⁻³ᐟ²)' },
    { symbol: 'i', name: 'imaginary unit', meaning: 'i² = −1; makes the equation generate oscillation/phase', units: 'dimensionless' },
    { symbol: '\\hbar', name: 'reduced Planck constant', meaning: 'h/2π, the quantum of action', units: 'J·s' },
    { symbol: '\\hat H', name: 'Hamiltonian operator', meaning: 'total energy operator (kinetic + potential)', units: 'J' },
    { symbol: 'V', name: 'potential energy', meaning: 'the potential the particle moves in', units: 'J' },
    { symbol: 'E', name: 'energy eigenvalue', meaning: 'allowed energy of a stationary state', units: 'J' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Quantum particles don’t have a definite location — they have a "wave of possibility." This equation tells that wave how to ripple and spread over time.',
      equationForms: [{ latex: 'i\\hbar\\,\\partial_t\\psi=\\hat H\\psi', caption: 'the rule for how a possibility-wave evolves' }],
      body: `In the quantum world, a particle like an electron doesn't sit at a single spot. Instead it's described by a spread-out **wave of possibility** — call it the wavefunction — that's tall where the electron is likely to be found and low where it isn't. Until you measure, the electron is, in a real sense, "smeared" across the possibilities.

The Schrödinger equation is the rulebook for how that possibility-wave changes from one moment to the next, just as Newton's laws tell a ball how to move. Feed in the forces (the "potential") and the equation rolls the wave forward in time.

From this one equation flows almost everything about atoms and chemistry: why electrons occupy specific shells, why each element has its own spectral "barcode" of colors, why some materials conduct and others don't, and the spooky ability of particles to **tunnel** straight through walls they classically couldn't surmount — the effect that powers flash memory and the Sun's fusion.`,
      keyIdeas: [
        'A quantum particle is a spread-out wave of possibility, not a point.',
        'This equation evolves that wave forward in time.',
        'It explains atoms, chemistry, spectra, and tunneling.',
      ],
      glossedOver: 'A "wave of possibility" is loose; precisely, |ψ|² is a probability — Born’s rule, at Level 2/3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The wavefunction ψ holds all you can know about a particle; $|\\psi|^2$ is the probability of finding it there. The equation evolves ψ; trapping a wave gives discrete energy levels.',
      equationForms: [
        { latex: 'i\\hbar\\,\\partial_t\\psi = \\hat H\\psi' },
        { latex: 'P(\\text{near } x) = |\\psi(x)|^2', caption: "Born's probability rule" },
      ],
      body: `The central object is the **wavefunction** $\\psi(x,t)$, a (complex) number at every point. **Born's rule** says its squared size $|\\psi|^2$ is the probability density of finding the particle at $x$ — so you can predict the *odds* of outcomes, not the exact result. The equation says how $\\psi$ changes in time, driven by the **Hamiltonian** $\\hat H$ (the energy: kinetic plus potential).

The most important consequence is **quantization**. When you trap a quantum wave — an electron bound to a nucleus, or a particle in a box — only certain wave shapes "fit," exactly like a guitar string supporting only specific notes. Each allowed shape has a definite energy, so the particle's energy can only take **discrete values**. Jumps between these levels emit or absorb photons of specific colors, producing the spectral lines that let us identify atoms across the galaxy. The visualization shows a particle in a box and barrier tunneling.`,
      keyIdeas: [
        '$|\\psi|^2$ gives the probability of finding the particle (Born’s rule).',
        'Outcomes are probabilistic, not predetermined.',
        'Confined waves ⇒ discrete (quantized) energy levels, like guitar harmonics.',
      ],
      workedExample: {
        prompt: 'For a particle in a 1-D box of length $L$, the allowed wavelengths are $\\lambda_n = 2L/n$. Find the allowed energies.',
        solution: `Only standing waves with whole half-wavelengths fit the box: $\\lambda_n = 2L/n$ for $n = 1,2,3,\\dots$

Using de Broglie $p = h/\\lambda$ and kinetic energy $E = p^2/2m$:

$$E_n = \\frac{p^2}{2m} = \\frac{h^2}{2m\\lambda_n^2} = \\frac{n^2 h^2}{8mL^2}.$$

The energies are discrete and grow as $n^2$. Note the lowest energy ($n=1$) is *not zero* — a confined quantum particle can never be perfectly at rest (zero-point energy), and squeezing the box smaller ($L\\downarrow$) raises all energies, the quantum reason atoms resist compression.`,
      },
      misconceptions: [
        {
          claim: 'The wavefunction is a physical wave you could measure directly, like water waves.',
          correction:
            'You can never measure ψ itself — only probabilities $|\\psi|^2$ and their consequences. ψ is complex-valued and lives in an abstract space; its reality is exactly what interpretations of quantum mechanics argue about.',
        },
      ],
      glossedOver: 'We used a hand-wavy "fit the box." The actual equation and its operators are Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Promote $E \\to i\\hbar\\partial_t$ and $\\vec p \\to -i\\hbar\\nabla$ in $E = p^2/2m + V$; stationary states solve $\\hat H\\psi = E\\psi$, an eigenvalue problem yielding the spectrum.',
      equationForms: [
        { latex: 'i\\hbar\\,\\partial_t\\psi = \\Big(-\\dfrac{\\hbar^2}{2m}\\nabla^2 + V\\Big)\\psi' },
        { latex: '\\hat H\\psi_n = E_n\\psi_n,\\quad \\psi(t) = \\sum_n c_n\\psi_n e^{-iE_n t/\\hbar}' },
      ],
      body: `Start from the classical energy $E = p^2/2m + V$ and apply the **canonical quantization** rules $E \\to i\\hbar\\partial_t$, $\\vec p \\to -i\\hbar\\nabla$ (consistent with de Broglie's plane waves). This produces the time-dependent equation. Separating variables for time-independent $V$ gives the **time-independent Schrödinger equation** $\\hat H\\psi = E\\psi$ — an eigenvalue problem whose eigenvalues $E_n$ are the allowed energies and whose eigenfunctions $\\psi_n$ are the stationary states. Any state evolves as $\\psi(t) = \\sum_n c_n\\psi_n e^{-iE_n t/\\hbar}$.

Solving it for the **hydrogen atom** reproduces the Rydberg spectrum exactly, with quantum numbers $(n,\\ell,m)$ emerging from boundary conditions — the triumph that validated the theory. The equation is **linear**, so solutions superpose (interference, the double slit), and the factor of $i$ makes $\\hat H$ generate *unitary* time evolution that conserves total probability ($\\int|\\psi|^2 = 1$ always). It also predicts **tunneling**: the wavefunction leaks exponentially into classically forbidden regions, giving a nonzero chance to pass through barriers.`,
      keyIdeas: [
        'Quantize via $E\\to i\\hbar\\partial_t$, $\\vec p\\to-i\\hbar\\nabla$.',
        'Stationary states: $\\hat H\\psi = E\\psi$ (eigenvalue problem) → the spectrum.',
        'Linear & unitary: superposition, interference, conserved probability; predicts tunneling.',
      ],
      workedExample: {
        prompt: 'Estimate the transmission probability for a particle tunneling through a rectangular barrier of height $V_0$ and width $a$ (with $E < V_0$).',
        solution: `Inside the barrier the wavefunction is not oscillatory but exponentially decaying, $\\psi \\sim e^{-\\kappa x}$ with

$$\\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}.$$

For a wide/high barrier the transmission probability is approximately

$$T \\approx e^{-2\\kappa a}.$$

The probability is small but **nonzero** — classically forbidden, quantum-mechanically routine. Because $T$ depends exponentially on width and on $\\sqrt{m(V_0-E)}$, tunneling is exquisitely sensitive: a one-atom change in tip height changes the current in a scanning tunneling microscope measurably, which is how STMs image individual atoms.`,
      },
      glossedOver: 'We solved single particles in fixed potentials. Spin, identical particles, and relativistic effects need more — Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Abstractly, states are vectors in Hilbert space and $\\hat H$ generates unitary evolution $U = e^{-i\\hat H t/\\hbar}$; spin, entanglement, and measurement extend the framework, and many-body versions define modern physics.',
      equationForms: [
        { latex: '|\\psi(t)\\rangle = e^{-i\\hat H t/\\hbar}|\\psi(0)\\rangle', caption: 'unitary time evolution' },
        { latex: '\\frac{d}{dt}\\langle \\hat A\\rangle = \\frac{i}{\\hbar}\\langle[\\hat H,\\hat A]\\rangle + \\langle\\partial_t\\hat A\\rangle', caption: 'Ehrenfest/Heisenberg dynamics' },
      ],
      body: `In Dirac's formulation, states are vectors $|\\psi\\rangle$ in a **Hilbert space**, observables are Hermitian operators, and the Schrödinger equation generates **unitary** evolution $U(t) = e^{-i\\hat H t/\\hbar}$ (norm-preserving, reversible). The Heisenberg and interaction pictures move the time dependence onto operators or split it; **Ehrenfest's theorem** shows expectation values obey classical-looking equations, recovering Newtonian dynamics in the appropriate limit. The whole structure is equivalent to Feynman's **path integral**, $\\langle x_f|e^{-i\\hat H t/\\hbar}|x_i\\rangle = \\int \\mathcal{D}x\\,e^{iS/\\hbar}$.

The framework must be enlarged in practice: **spin** adds discrete degrees of freedom (Pauli equation), **identical particles** force symmetrized/antisymmetrized states (bosons/fermions, the Pauli principle and the periodic table), and composite systems live in tensor products where **entanglement** and nonclassical correlations (Bell inequalities) appear. The notorious **measurement problem** — reconciling smooth unitary evolution with the abrupt, probabilistic "collapse" of measurement — is unresolved and motivates decoherence theory and interpretations. Computationally, the many-body Schrödinger equation is intractable (Hilbert space grows exponentially), driving DFT, quantum Monte Carlo, tensor networks, and the entire premise of quantum computing.`,
      keyIdeas: [
        'States in Hilbert space; $\\hat H$ generates unitary, reversible evolution $e^{-i\\hat H t/\\hbar}$.',
        'Spin, identical-particle statistics, and entanglement extend the single-particle picture.',
        'The measurement problem (collapse vs. unitarity) is unresolved; many-body solving is exponentially hard.',
      ],
      workedExample: {
        prompt: 'Show that Schrödinger evolution conserves total probability (is unitary).',
        solution: `Total probability is $\\langle\\psi|\\psi\\rangle$. Differentiate using the equation $i\\hbar\\,\\partial_t|\\psi\\rangle = \\hat H|\\psi\\rangle$ (and its conjugate $-i\\hbar\\,\\partial_t\\langle\\psi| = \\langle\\psi|\\hat H$, valid since $\\hat H$ is Hermitian):

$$\\frac{d}{dt}\\langle\\psi|\\psi\\rangle = (\\partial_t\\langle\\psi|)|\\psi\\rangle + \\langle\\psi|(\\partial_t|\\psi\\rangle) = \\frac{i}{\\hbar}\\langle\\psi|\\hat H|\\psi\\rangle - \\frac{i}{\\hbar}\\langle\\psi|\\hat H|\\psi\\rangle = 0.$$

So $\\langle\\psi|\\psi\\rangle$ is constant — probability is conserved, and the evolution operator $e^{-i\\hat H t/\\hbar}$ is unitary. Hermiticity of $\\hat H$ (real energies) is exactly what guarantees this. The contrast with measurement, which is non-unitary and probabilistic, is the crux of the measurement problem.`,
      },
      glossedOver: 'This is non-relativistic. Combining quantum mechanics with relativity requires the Dirac equation and quantum field theory — Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The Schrödinger equation is the non-relativistic, single-particle limit of quantum field theory; its foundations (collapse, contextuality) and its many-body complexity define active frontiers from quantum gravity to quantum computing.',
      equationForms: [
        { latex: 'i\\hbar\\,\\partial_t|\\psi\\rangle = \\hat H|\\psi\\rangle \\;\\xrightarrow{c\\to\\infty}\\; \\text{from } (i\\gamma^\\mu\\partial_\\mu - m)\\psi = 0', caption: 'as the non-relativistic limit of the Dirac equation' },
        { latex: 'i\\hbar\\,\\partial_t\\rho = [\\hat H,\\rho] + \\mathcal{L}_{\\text{diss}}[\\rho]', caption: 'open-system (Lindblad) generalization' },
      ],
      body: `The Schrödinger equation is not fundamental: it is the **non-relativistic limit** of relativistic wave equations (Dirac for spin-½), which themselves are single-particle approximations to **quantum field theory**, where particle number can change and the wavefunction gives way to field operators. Its time-asymmetry-free, deterministic unitarity coexists uneasily with the Born rule's randomness — the **measurement problem** — spawning rigorous research programs: decoherence (why pointer bases emerge), objective-collapse models (GRW, CSL, with the **stochastic/nonlinear** modifications that experiments now bound), Bohmian mechanics, and many-worlds, alongside reconstructions of QM from informational axioms.

Open and active directions: **open quantum systems** replace it with the Lindblad master equation for $\\rho$, central to quantum error correction and noisy quantum devices; the exponential **many-body complexity** is both the obstacle (classical simulation) and the resource (quantum advantage), with the structure of entanglement (area laws, MERA/tensor networks) controlling what is tractable. At the largest scale, marrying Schrödinger dynamics to gravity — the **Wheeler–DeWitt** equation $\\hat H|\\Psi\\rangle = 0$ of canonical quantum gravity famously lacks a time parameter (the "problem of time"), and proposals like gravitationally-induced collapse (Penrose, Diósi) seek testable deviations. Schrödinger's 1926 wave equation remains the operational core of quantum mechanics even as its interpretation and its extensions stay genuinely unsettled.`,
      keyIdeas: [
        'Non-relativistic, single-particle limit of Dirac/QFT (field operators replace ψ at high energy).',
        'Foundations open: collapse vs. unitarity drives decoherence, objective-collapse, and many-worlds.',
        'Open-system (Lindblad), many-body entanglement structure, and quantum gravity ("problem of time") are frontiers.',
      ],
      workedExample: {
        prompt: 'Sketch how the Schrödinger equation emerges as the non-relativistic limit of the Klein–Gordon / relativistic energy relation.',
        solution: `Start from $E = \\sqrt{(pc)^2 + (mc^2)^2}$. For $p \\ll mc$, expand:

$$E \\approx mc^2 + \\frac{p^2}{2m} + \\cdots$$

Factor out the rest-energy phase by writing $\\psi = \\tilde\\psi\\,e^{-imc^2 t/\\hbar}$ (the fast oscillation we don't care about). Substituting into the relativistic wave equation and dropping terms of order $(v/c)^2$ leaves

$$i\\hbar\\,\\partial_t\\tilde\\psi = \\frac{\\hat p^2}{2m}\\tilde\\psi + V\\tilde\\psi,$$

the Schrödinger equation. The rest energy $mc^2$ becomes an unobservable overall phase, and the kinetic term $p^2/2m$ is the leading non-relativistic piece. So Schrödinger's equation is the $c\\to\\infty$ shadow of relativistic quantum theory — accurate whenever speeds are well below $c$, which covers all of chemistry and most of condensed matter.`,
      },
    },
  ],
  connections: [
    { toId: 'de-broglie', relationship: 'is the wave equation whose plane-wave solutions are the matter waves of' },
    { toId: 'planck-einstein', relationship: 'builds in the energy–frequency quantization of' },
    { toId: 'dirac', relationship: 'is the non-relativistic limit of' },
    { toId: 'heat-equation', relationship: 'is, under imaginary-time rotation, the' },
  ],
  viz: {
    component: 'ParticleInBox',
    kind: 'interactive',
    defaultParams: { mode: 'box', n: 1 },
    caption: 'A particle in a box / barrier: pick an energy level to see its standing-wave |ψ|², or send a packet at a barrier and watch part of it tunnel through.',
    whatToTry: [
      'Step through energy levels n = 1, 2, 3 and count the probability humps.',
      'Send a wave packet at a barrier and watch a fraction tunnel through.',
      'Narrow the barrier and watch the transmission probability shoot up.',
    ],
  },
  primarySources: [
    {
      authors: 'E. Schrödinger',
      title: 'Quantisierung als Eigenwertproblem',
      venue: 'Annalen der Physik 79, 361',
      year: 1926,
      note: 'introduces wave mechanics',
      primary: true,
    },
    {
      authors: 'M. Born',
      title: 'Zur Quantenmechanik der Stoßvorgänge',
      venue: 'Zeitschrift für Physik 37, 863',
      year: 1926,
      note: 'the |ψ|² probability interpretation',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'J. J. Sakurai & J. Napolitano', title: 'Modern Quantum Mechanics', venue: 'Cambridge University Press', year: 2017 },
    { authors: 'R. Shankar', title: 'Principles of Quantum Mechanics', venue: 'Springer', year: 1994 },
  ],
  historyNote: `Schrödinger derived his equation over the 1925–26 Christmas holiday, reportedly during a tryst at a Swiss villa, inspired by de Broglie's matter waves. His "wave mechanics" looked utterly different from Heisenberg's earlier "matrix mechanics," and the two camps were briefly rivals — until Schrödinger (and Dirac, and von Neumann) proved them mathematically equivalent.

Schrödinger never accepted Born's probabilistic interpretation of his own equation. His famous 1935 **cat** thought experiment — a cat in a superposition of alive and dead — was meant to *ridicule* the idea that superposition extends to the macroscopic world, not to celebrate it. He grumbled, "I don't like it, and I'm sorry I ever had anything to do with it." The interpretation he disliked became the foundation of modern physics.`,
};

export default schrodinger;
