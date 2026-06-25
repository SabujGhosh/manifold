import type { Equation } from '../types';

const kdv: Equation = {
  id: 'kdv',
  name: 'Korteweg–de Vries Equation',
  nickname: 'the equation of the solitary wave',
  canonicalLatex: '\\partial_t u+u\\,\\partial_x u+\\partial_x^3 u=0',
  canonicalAlt:
    'partial-t u plus u times partial-x u plus the third x-derivative of u, equals zero',
  alternativeForms: [
    { latex: 'u(x,t) = \\dfrac{c}{2}\\,\\mathrm{sech}^2\\!\\Big(\\tfrac{\\sqrt c}{2}(x-ct)\\Big)', label: 'single-soliton solution' },
    { latex: 'u_t = \\partial_x\\Big(\\tfrac{\\delta H}{\\delta u}\\Big),\\ H=\\int\\big(\\tfrac12 u_x^2 - \\tfrac16 u^3\\big)dx', label: 'Hamiltonian form' },
  ],
  fields: ['pde', 'nonlinear-dynamics'],
  era: { display: '1895', sortKey: 1895 },
  discoverers: [
    { name: 'Diederik Korteweg & Gustav de Vries', note: 'derived the shallow-water wave equation, 1895' },
    { name: 'Kruskal & Zabusky', note: 'discovered solitons numerically and coined the term, 1965' },
  ],
  oneLine: 'A wave equation balancing steepening against spreading so perfectly that lone humps — solitons — travel undistorted and survive collisions.',
  significance:
    'The KdV equation models shallow-water waves and was the birthplace of the soliton: a solitary wave whose shape is preserved by an exact balance between nonlinear steepening and dispersive spreading. Astonishingly, solitons pass through each other unchanged, and KdV is exactly integrable — possessing infinitely many conservation laws and solvable by the inverse scattering transform. It opened the entire modern field of integrable systems, linking water waves to optics, plasmas, and deep mathematics.',
  applications: [
    'Shallow-water and internal ocean waves; tsunami and bore modeling',
    'Optical solitons in fibers (related NLS equation) for telecommunications',
    'Ion-acoustic waves in plasmas; lattice dynamics',
    'A canonical testbed for integrable-systems theory and numerical methods',
  ],
  symbols: [
    { symbol: 'u', name: 'wave amplitude', meaning: 'the wave profile (e.g. water-surface height)', units: 'depends (e.g. m)' },
    { symbol: 't', name: 'time', meaning: 'time coordinate', units: 's' },
    { symbol: 'x', name: 'position', meaning: 'spatial coordinate along the channel', units: 'm' },
    { symbol: 'c', name: 'wave speed', meaning: 'soliton speed, proportional to its amplitude', units: 'm/s' },
    { symbol: 'H', name: 'Hamiltonian', meaning: 'conserved energy functional generating the flow', units: 'energy' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Some waves refuse to spread out or break — they travel as a single, stable hump for miles, and even pass through each other unscathed.',
      equationForms: [{ latex: '\\partial_t u+u\\,\\partial_x u+\\partial_x^3 u=0', caption: 'steepening + spreading, balanced' }],
      body: `In 1834 a Scottish engineer named John Scott Russell watched a boat stop suddenly in a canal. The wave it had been pushing didn't collapse — it rolled on as a single smooth hump, holding its shape for over a mile. He chased it on horseback, transfixed. He had seen the first **soliton**.

Ordinary waves either spread out and fade (like ripples) or steepen and break (like ocean surf). The KdV equation describes a magical middle ground where these two tendencies — **steepening** (the front piling up) and **spreading** (dispersion pulling it apart) — cancel *exactly*. The result is a lone wave that travels forever without changing shape. Taller solitons even travel faster.

The most astonishing part, discovered with early computers in 1965: when two solitons collide, they pass right through each other and emerge **completely unchanged**, like particles. This particle-like robustness is why "solitons" now appear everywhere from light pulses in fiber-optic cables to waves in plasmas.`,
      keyIdeas: [
        'A soliton is a lone wave that keeps its shape over long distances.',
        'It balances steepening against dispersive spreading.',
        'Solitons collide and pass through each other unchanged, like particles.',
      ],
      glossedOver: 'The "exact balance" is the interplay of two specific terms in the equation — made explicit at Level 2/3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The equation has two competing terms: $u\\,\\partial_x u$ steepens the wave (nonlinearity) and $\\partial_x^3 u$ spreads it (dispersion). When they balance, a stable soliton results.',
      equationForms: [
        { latex: '\\partial_t u + \\underbrace{u\\,\\partial_x u}_{\\text{steepening}} + \\underbrace{\\partial_x^3 u}_{\\text{dispersion}} = 0' },
        { latex: 'u = \\tfrac{c}{2}\\,\\mathrm{sech}^2\\!\\big(\\tfrac{\\sqrt c}{2}(x-ct)\\big)', caption: 'a single soliton: taller = faster' },
      ],
      body: `Two terms fight in the KdV equation. The **nonlinear term** $u\\,\\partial_x u$ makes taller parts of the wave move faster than shorter parts, so the wave front steepens and would eventually "break" (like surf) — this is the same effect that makes traffic jams sharpen. The **dispersion term** $\\partial_x^3 u$ does the opposite: it makes different ripples travel at different speeds, smearing any bump out.

A **soliton** is the exact shape where these two effects cancel perfectly: the steepening is held in check by the spreading, and the hump glides along rigidly. Its mathematical form is a $\\mathrm{sech}^2$ profile (a smooth, symmetric bump), and a beautiful feature falls out: the **taller the soliton, the faster it moves** ($c$ proportional to its height). So in a soliton collision, a tall fast one catches up to a short slow one, they merge messily for a moment, then separate — with the tall one back in front, both perfectly restored. The visualization shows exactly this collision.`,
      keyIdeas: [
        'Nonlinearity ($u\\,u_x$) steepens; dispersion ($u_{xxx}$) spreads.',
        'A soliton is where they balance — a stable $\\mathrm{sech}^2$ hump.',
        'Taller solitons travel faster; collisions leave both intact.',
      ],
      workedExample: {
        prompt: 'Two solitons of heights corresponding to $c = 4$ and $c = 1$ start with the tall one behind. Describe what happens.',
        solution: `Soliton speed equals its parameter $c$ (and is proportional to its height). So the $c=4$ soliton is **taller and four times faster** than the $c=1$ one.

Starting behind, the tall fast soliton catches up. During overlap they interact nonlinearly — the profile briefly looks like a single lump (and curiously the peaks can even appear to "exchange" rather than pass). Then they separate: the tall soliton emerges **in front**, the short one behind, **both with exactly their original shapes and speeds**.

The only lasting trace of the collision is a small **phase shift** — each soliton is nudged slightly forward or back from where it would have been. This shape-preserving, particle-like collision is the signature of solitons and the reason KdV is called *integrable*.`,
      },
      misconceptions: [
        {
          claim: 'Solitons are just unusually big or strong ordinary waves.',
          correction:
            'They’re qualitatively different: ordinary waves disperse or break, while a soliton is a self-stabilizing balance of two effects. The balance, not the size, is what makes it persist and survive collisions.',
        },
      ],
      glossedOver: 'We described the balance qualitatively. The exact $\\mathrm{sech}^2$ solution and conservation laws come at Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'A travelling-wave ansatz reduces KdV to an ODE with the exact $\\mathrm{sech}^2$ soliton; KdV conserves mass, momentum, and energy — in fact infinitely many quantities.',
      equationForms: [
        { latex: 'u(x,t)=f(x-ct) \\Rightarrow -cf\' + ff\' + f\'\'\' = 0', caption: 'travelling-wave reduction' },
        { latex: '\\partial_t u = \\partial_x\\Big(\\tfrac12 u^2 + \\partial_x^2 u\\Big)', caption: 'conservation (continuity) form' },
      ],
      body: `Seek a travelling wave $u = f(x - ct)$. Substituting reduces the PDE to the ODE $-cf' + ff' + f''' = 0$, which integrates (with decay boundary conditions) to a first-order energy relation solved by the **soliton** $f(\\xi) = \\tfrac{c}{2}\\,\\mathrm{sech}^2\\!\\big(\\tfrac{\\sqrt c}{2}\\xi\\big)$. Amplitude, width, and speed are locked together: taller means narrower **and** faster — the relation Russell observed.

Written as $\\partial_t u = \\partial_x(\\tfrac12 u^2 + u_{xx})$, the equation is manifestly a **conservation law** for $\\int u\\,dx$ (mass). Multiplying by $u$ and by other combinations yields conserved $\\int u^2$ (momentum) and an energy integral — and remarkably, this does not stop: KdV has **infinitely many independent conservation laws** (Miura, Gardner, Kruskal). This superabundance of conserved quantities is the hallmark of an **integrable** system and is exactly what forbids the chaotic mixing seen in generic nonlinear PDEs, allowing solitons to survive collisions. KdV also has a **Hamiltonian** structure, $u_t = \\partial_x(\\delta H/\\delta u)$, in fact a *bi-Hamiltonian* one.`,
      keyIdeas: [
        'Travelling-wave ansatz ⇒ exact $\\mathrm{sech}^2$ soliton; height, width, speed linked.',
        'KdV has infinitely many conservation laws — the mark of integrability.',
        'It is (bi-)Hamiltonian, with a conserved energy functional.',
      ],
      workedExample: {
        prompt: 'Verify that the speed and amplitude of the KdV soliton are proportional (taller = faster).',
        solution: `The soliton solution is $u(\\xi) = \\dfrac{c}{2}\\,\\mathrm{sech}^2\\!\\Big(\\dfrac{\\sqrt c}{2}\\,\\xi\\Big)$, $\\xi = x - ct$.

Read off its features:
- **Amplitude** (peak height, at $\\xi=0$): $A = c/2$.
- **Speed**: $c$ (it travels as $x - ct$).
- **Width**: set by $\\sqrt c/2$, so width $\\propto 1/\\sqrt c$.

Therefore speed $c = 2A$ — the soliton's **speed is proportional to its amplitude**, and its width *shrinks* as $1/\\sqrt{A}$. Taller solitons are faster and narrower; shorter ones slower and broader. This single relation, derived from the exact solution, explains both Scott Russell's observation and why a tall soliton overtakes a short one in a collision.`,
      },
      glossedOver: 'Why infinitely many conservation laws exist — and how to solve *any* initial condition — needs the inverse scattering transform at Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'KdV is exactly solvable by the inverse scattering transform: it is the compatibility condition of a Lax pair, linearizing the dynamics via the spectrum of an associated Schrödinger operator.',
      equationForms: [
        { latex: 'L = -\\partial_x^2 + u,\\quad \\partial_t L = [B, L]', caption: 'Lax pair (isospectral flow)' },
        { latex: '-\\psi_{xx} + u(x,t)\\psi = \\lambda\\psi', caption: 'the eigenvalues λ are conserved' },
      ],
      body: `The breakthrough (Gardner–Greene–Kruskal–Miura, 1967) was the **inverse scattering transform (IST)**, the "nonlinear Fourier transform." Associate to the solution the **Schrödinger operator** $L = -\\partial_x^2 + u(x,t)$, treating $u$ as its potential. KdV is precisely the statement $\\partial_t L = [B, L]$ for a suitable operator $B$ — a **Lax pair** — which means the evolution is **isospectral**: the eigenvalues $\\lambda$ of $L$ are *conserved* as $u$ evolves. The discrete eigenvalues (bound states) correspond exactly to the solitons (their depths give the amplitudes), and the continuous spectrum to the dispersive radiation.

This linearizes the problem: scatter $\\to$ evolve the (simple, linear) scattering data $\\to$ reconstruct $u$. The infinitely many conservation laws are the conserved spectrum. IST explains *why* solitons survive collisions intact (each is a preserved eigenvalue) up to a phase shift, and it solves general decaying initial data exactly — any localized hump resolves into a finite set of solitons (ordered tallest-first) plus decaying radiation. The same machinery (Lax pairs, IST) was then found for a whole family of **integrable PDEs** — the nonlinear Schrödinger equation (optical solitons), sine-Gordon, Toda lattice — unifying them. Numerically, KdV is a standard testbed (split-step, pseudospectral) and the original Fermi–Pasta–Ulam–Tsingou puzzle's resolution.`,
      keyIdeas: [
        'Lax pair $\\partial_t L=[B,L]$ ⇒ isospectral flow: the Schrödinger spectrum is conserved.',
        'IST = nonlinear Fourier transform: bound states ↔ solitons, continuum ↔ radiation.',
        'Same structure unifies a family of integrable PDEs (NLS, sine-Gordon, Toda).',
      ],
      workedExample: {
        prompt: 'Explain how the inverse scattering transform "linearizes" KdV, by analogy with the Fourier transform for linear PDEs.',
        solution: `For a *linear* dispersive PDE, the Fourier transform diagonalizes the dynamics: transform the initial data, evolve each mode by a trivial phase $e^{-i\\omega(k)t}$, inverse-transform. Nonlinear PDEs normally lack such a trick.

IST provides the nonlinear analog for KdV via three steps:
1. **Direct scattering:** compute the scattering data (reflection coefficient, bound-state eigenvalues $\\lambda_n$ and norming constants) of the Schrödinger operator $L = -\\partial_x^2 + u(x,0)$.
2. **Time evolution:** because KdV is isospectral, the eigenvalues $\\lambda_n$ stay **fixed**, and the rest of the scattering data evolves by *simple, explicit, linear* formulas (just exponentials in $t$).
3. **Inverse scattering:** reconstruct $u(x,t)$ from the evolved data (via the Gelfand–Levitan–Marchenko equation).

So the scattering data play the role of Fourier modes: nonlinear evolution becomes trivial in scattering space. The bound states never disappear — each is a soliton riding along forever — which is the spectral reason solitons are indestructible.`,
      },
      glossedOver: 'We treated decaying boundary conditions. Periodic KdV (finite-gap/algebro-geometric solutions) and the deeper algebraic structure are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'KdV is the prototype integrable system: bi-Hamiltonian, with a tau-function/τ-structure tying it to algebraic geometry, the KP hierarchy, random matrices, and Painlevé asymptotics.',
      equationForms: [
        { latex: 'u = 2\\,\\partial_x^2 \\log \\tau(x,t)', caption: 'Hirota tau-function form' },
        { latex: 'u(x,t) = 2\\partial_x^2\\log\\theta(\\,\\cdots\\,) + \\text{const}', caption: 'finite-gap (theta-function) solutions' },
      ],
      body: `KdV sits at the confluence of an extraordinary number of mathematical structures. Its **bi-Hamiltonian** structure (Magri) generates the conservation laws via a recursion operator and places it in an infinite **hierarchy** of commuting flows. **Hirota's bilinear method** writes solutions through a **tau function** $\\tau$ with $u = 2\\partial_x^2\\log\\tau$, where multi-soliton solutions become elegant determinants and the deeper Sato theory identifies $\\tau$-functions with points on an infinite Grassmannian — embedding KdV in the **KP hierarchy** and tying it to the representation theory of affine Lie algebras and vertex operators.

For periodic boundary conditions, **finite-gap integration** (Novikov, Lax, Its–Matveev) expresses solutions via Riemann **theta functions** on hyperelliptic curves — KdV solutions *are* flows on Jacobian varieties, a stunning bridge to algebraic geometry. The reach extends further: the **Witten–Kontsevich theorem** shows a KdV $\\tau$-function governs intersection numbers on moduli spaces of curves; **Tracy–Widom** asymptotics and the Painlevé equations arise in KdV's long-time and similarity behavior, connecting to random-matrix theory; and **dispersive shock waves** (Whitham modulation theory, Gurevich–Pitaevskii) describe its semiclassical limits. Frontiers include integrable turbulence, soliton gases, and the rigorous long-time/soliton-resolution asymptotics (Deift–Zhou nonlinear steepest descent). What began as a model of canal waves became a Rosetta Stone linking PDE, spectral theory, algebraic geometry, and mathematical physics.`,
      keyIdeas: [
        'Bi-Hamiltonian hierarchy; tau-function (Sato/Grassmannian) ties KdV to the KP hierarchy.',
        'Finite-gap solutions are theta functions on Riemann surfaces — link to algebraic geometry.',
        'Connections to Witten–Kontsevich, random matrices (Tracy–Widom), and dispersive shocks.',
      ],
      workedExample: {
        prompt: 'Sketch how Hirota’s bilinear method produces the one- and two-soliton solutions via the tau function.',
        solution: `Substitute $u = 2\\partial_x^2\\log\\tau$ into KdV. The equation becomes Hirota's **bilinear** form $(D_xD_t + D_x^4)\\,\\tau\\cdot\\tau = 0$, where $D$ are Hirota's bilinear derivatives.

Now expand $\\tau$ as a finite series in a formal parameter:
- **One soliton:** $\\tau = 1 + e^{\\eta}$ with $\\eta = kx - k^3 t + \\delta$. Then $u = 2\\partial_x^2\\log(1+e^\\eta) = \\tfrac{k^2}{2}\\,\\mathrm{sech}^2(\\eta/2)$ — the $\\mathrm{sech}^2$ soliton, with $c = k^2$.
- **Two solitons:** $\\tau = 1 + e^{\\eta_1} + e^{\\eta_2} + A_{12}\\,e^{\\eta_1+\\eta_2}$, where the single interaction coefficient $A_{12} = \\big(\\tfrac{k_1-k_2}{k_1+k_2}\\big)^2$ encodes the *entire* collision.

The series **truncates exactly** (no higher terms needed) — the algebraic miracle of integrability. The two-soliton $\\tau$ reproduces the clean collision and the phase shift directly from $A_{12}$. Multi-soliton solutions are then determinants of such exponentials, and the same $\\tau$-function structure generalizes across the integrable hierarchy.`,
      },
    },
  ],
  connections: [
    { toId: 'schrodinger', relationship: 'is solved via the spectrum of the Schrödinger operator in' },
    { toId: 'wave-equation', relationship: 'adds nonlinearity and dispersion to the linear' },
    { toId: 'fourier', relationship: 'is linearized by a nonlinear analogue (inverse scattering) of' },
  ],
  viz: {
    component: 'Soliton',
    kind: 'interactive',
    defaultParams: { c1: 4, c2: 1 },
    caption: 'Two KdV solitons of different heights collide: the taller, faster one overtakes the shorter one, and both emerge with their shapes intact (plus a phase shift).',
    whatToTry: [
      'Launch a tall soliton behind a short one and watch the overtaking collision.',
      'Confirm both solitons recover their original shapes afterward.',
      'Increase a soliton’s height and watch it narrow and speed up.',
    ],
  },
  primarySources: [
    {
      authors: 'D. J. Korteweg & G. de Vries',
      title: 'On the change of form of long waves advancing in a rectangular canal…',
      venue: 'Philosophical Magazine 39, 422',
      year: 1895,
      note: 'derivation of the shallow-water wave equation',
      primary: true,
    },
    {
      authors: 'C. Gardner, J. Greene, M. Kruskal & R. Miura',
      title: 'Method for Solving the Korteweg–de Vries Equation',
      venue: 'Physical Review Letters 19, 1095',
      year: 1967,
      url: 'https://doi.org/10.1103/PhysRevLett.19.1095',
      note: 'the inverse scattering transform',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'M. J. Ablowitz & H. Segur', title: 'Solitons and the Inverse Scattering Transform', venue: 'SIAM', year: 1981 },
    { authors: 'P. G. Drazin & R. S. Johnson', title: 'Solitons: An Introduction', venue: 'Cambridge University Press', year: 1989 },
  ],
  historyNote: `John Scott Russell's 1834 "wave of translation," chased on horseback along the Union Canal, was met with skepticism — Airy and Stokes doubted such a wave could persist. Vindication came only in 1895 when Korteweg and de Vries derived the equation and its solitary-wave solution.

The field truly ignited in 1965, when Kruskal and Zabusky, studying the Fermi–Pasta–Ulam–Tsingou numerical puzzle (why a nonlinear lattice failed to thermalize), simulated KdV and found the solitary waves passing through one another unchanged. They coined "**soliton**" (with the particle-like "-on" suffix). Two years later the inverse scattering transform turned this curiosity into the founding example of integrable systems — one of the richest developments in 20th-century mathematical physics.`,
};

export default kdv;
