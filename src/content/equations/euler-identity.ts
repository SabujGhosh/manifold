import type { Equation } from '../types';

const eulerIdentity: Equation = {
  id: 'euler-identity',
  name: "Euler's Identity",
  nickname: 'the most beautiful equation in mathematics',
  canonicalLatex: 'e^{i\\pi} + 1 = 0',
  canonicalAlt: 'e to the power i pi, plus one, equals zero',
  alternativeForms: [
    { latex: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta', label: "Euler's formula (the general statement)" },
    { latex: 'e^{i\\pi} = -1', label: 'the bare half-turn' },
  ],
  fields: ['mathematics', 'analysis'],
  era: { display: '1748', sortKey: 1748 },
  discoverers: [
    { name: 'Leonhard Euler', note: 'Introductio in analysin infinitorum, 1748' },
    { name: 'Roger Cotes', note: 'an equivalent logarithmic relation, 1714' },
  ],
  oneLine: 'A single line tying together five fundamental constants — 0, 1, e, i, and π — through one rotation.',
  significance:
    'Euler’s identity is the special case θ = π of Euler’s formula, which says that exponentiating an imaginary number traces the unit circle. That formula is the hinge between exponential growth and rotation/oscillation, making complex exponentials the universal language of waves, AC circuits, signal processing, and quantum amplitudes. The identity itself is celebrated because it unites the additive (0,1), the geometric (π), the analytic (e), and the algebraic (i) in one relation.',
  applications: [
    'Phasors: representing AC voltages/currents and oscillations as rotating complex numbers',
    'Fourier analysis (the basis functions are e^{iωt})',
    'Quantum mechanics: phases and probability amplitudes',
    'Control theory and signal processing (poles, frequency response)',
  ],
  symbols: [
    { symbol: 'e', name: "Euler's number", meaning: 'base of natural exponentiation, ≈ 2.71828', units: 'dimensionless' },
    { symbol: 'i', name: 'imaginary unit', meaning: 'a number with i² = −1', units: 'dimensionless' },
    { symbol: '\\pi', name: 'pi', meaning: 'half-turn in radians; ratio of circumference to diameter', units: 'radians (dimensionless)' },
    { symbol: '\\theta', name: 'angle', meaning: 'rotation angle in radians', units: 'radians' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Five of the most important numbers in all of mathematics, met in a single, perfectly balanced sentence.',
      equationForms: [{ latex: 'e^{i\\pi} + 1 = 0' }],
      body: `Some numbers are royalty. **Zero** and **one** are the bedrock of counting. **π** is the soul of circles. **e** governs every natural growth and decay. And **i**, the "imaginary" number, is the key that unlocked algebra's hardest doors.

These five seem to live in different kingdoms. Euler's identity says they are secretly one family — and the relation that binds them is exact and astonishingly simple: $e^{i\\pi} + 1 = 0$. Nothing is approximate; nothing is left over.

The hidden meaning, unpacked at higher levels, is motion: raising $e$ to an imaginary power doesn't make things grow — it makes them **turn**. Turn exactly halfway around a circle and you land on $-1$. Mathematicians call this the most beautiful equation precisely because such different ideas fit together so cleanly.`,
      keyIdeas: [
        'It links 0, 1, e, i, and π in one exact statement.',
        'Imaginary exponents describe *rotation*, not growth.',
        'A half-turn (π radians) lands you at −1.',
      ],
      glossedOver: 'Why an imaginary exponent should mean "rotate" looks like magic here; Level 2/3 show it must be so.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Euler’s formula $e^{i\\theta}=\\cos\\theta+i\\sin\\theta$ puts the point $(\\cos\\theta,\\sin\\theta)$ on the unit circle; at $\\theta=\\pi$ that point is $(-1,0)$.',
      equationForms: [
        { latex: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta' },
        { latex: 'e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1' },
      ],
      body: `Think of a complex number $a+bi$ as the point $(a,b)$ in a plane. **Euler's formula** says that $e^{i\\theta}$ is the point on the **unit circle** at angle $\\theta$ (measured in radians, counter-clockwise from the positive axis):

$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta.$$

So as $\\theta$ increases, $e^{i\\theta}$ marches around the circle. The visualization on this page is exactly this rotating arrow. Plug in a half-turn, $\\theta = \\pi$ (which is $180^\\circ$): $\\cos\\pi = -1$ and $\\sin\\pi = 0$, so $e^{i\\pi} = -1$. Add one and you get zero — the identity.`,
      keyIdeas: [
        '$e^{i\\theta}$ is the unit-circle point at angle $\\theta$ (radians).',
        'A full loop is $\\theta = 2\\pi$; a half loop is $\\pi$.',
        'Real part is $\\cos$, imaginary part is $\\sin$.',
      ],
      workedExample: {
        prompt: 'What is $e^{i\\pi/2}$? Locate it on the circle.',
        solution: `Use Euler's formula with $\\theta = \\pi/2$ (a quarter-turn, $90^\\circ$):

$$e^{i\\pi/2} = \\cos\\tfrac{\\pi}{2} + i\\sin\\tfrac{\\pi}{2} = 0 + i\\cdot 1 = i.$$

So $e^{i\\pi/2} = i$, the point straight "up" at $(0,1)$. A quarter-turn takes $1$ to $i$; another quarter-turn ($e^{i\\pi}$) takes $i$ to $-1$.`,
      },
      misconceptions: [
        {
          claim: 'Imaginary numbers aren’t real, so this is just a notational trick.',
          correction:
            'The plane of complex numbers is as concrete as a map grid; $e^{i\\theta}$ describes genuine rotation, which is why engineers use it daily for AC circuits and signals.',
        },
      ],
      glossedOver: 'We *stated* Euler’s formula. Where it comes from (the power series / a differential equation) is Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Euler’s formula follows from matching the power series of $e^{i\\theta}$, $\\cos$, and $\\sin$ — or from the ODE $\\frac{d}{d\\theta}e^{i\\theta}=i\\,e^{i\\theta}$, which *is* rotation.',
      equationForms: [
        { latex: 'e^{z} = \\sum_{n=0}^\\infty \\frac{z^n}{n!}', caption: 'the exponential power series (any complex z)' },
        { latex: '\\frac{d}{d\\theta}e^{i\\theta} = i\\,e^{i\\theta}', caption: 'velocity ⟂ position ⇒ circular motion' },
      ],
      body: `Define $e^z$ by its power series, valid for complex $z$. Substituting $z = i\\theta$ and splitting even and odd powers, the real terms assemble the series for $\\cos\\theta$ and the imaginary terms the series for $\\sin\\theta$ (using $i^2=-1$), giving $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.

A cleaner argument: $\\frac{d}{d\\theta}e^{i\\theta} = i\\,e^{i\\theta}$. Multiplying a vector by $i$ rotates it $90^\\circ$, so the velocity is always perpendicular to the position and of equal magnitude — the definition of motion around a circle at unit speed. Starting at $1$ when $\\theta=0$, after arclength $\\pi$ you are halfway round, at $-1$. The identity is the snapshot at $\\theta=\\pi$. De Moivre's theorem $(\\cos\\theta+i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$ is just $e^{in\\theta}$.`,
      keyIdeas: [
        'Series of $e^{i\\theta}$ interleaves into $\\cos$ + $i\\sin$.',
        'Multiplying by $i$ = rotating $90^\\circ$; hence circular motion.',
        'De Moivre and angle-addition formulas are corollaries.',
      ],
      workedExample: {
        prompt: 'Derive the angle-addition formula for $\\cos(\\alpha+\\beta)$ from Euler’s formula.',
        solution: `Multiply two unit complex numbers:

$$e^{i(\\alpha+\\beta)} = e^{i\\alpha}e^{i\\beta} = (\\cos\\alpha+i\\sin\\alpha)(\\cos\\beta+i\\sin\\beta).$$

Expand the right side and match real parts:

$$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta.$$

The imaginary parts give $\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$. Trig identities are exponentiation in disguise.`,
      },
      glossedOver: 'Convergence of the series for complex $z$, and that this $e^z$ matches the real one, need justification (it converges absolutely everywhere) — assumed here.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The map $\\theta\\mapsto e^{i\\theta}$ is the universal homomorphism from $(\\mathbb{R},+)$ onto the circle group $U(1)$; Euler’s identity records its kernel, $2\\pi\\mathbb{Z}$.',
      equationForms: [
        { latex: '\\exp: (\\mathbb{R},+)\\to U(1),\\quad \\ker = 2\\pi\\mathbb{Z}', caption: 'the exponential of the Lie group U(1)' },
        { latex: '\\hat f(\\xi) = \\int f(x)\\,e^{-2\\pi i x\\xi}\\,dx', caption: 'characters e^{iθ} are the Fourier basis' },
      ],
      body: `$\\theta\\mapsto e^{i\\theta}$ is a continuous group homomorphism from the real line onto the **circle group** $U(1)=\\{z:|z|=1\\}$; it is the exponential map of the one-dimensional Lie group, with Lie algebra the imaginary axis and bracket trivial. Its kernel is exactly $2\\pi\\mathbb{Z}$ — periodicity — and Euler's identity $e^{i\\pi}=-1$ pins down the half-period. The **characters** of $U(1)$, the functions $\\theta\\mapsto e^{in\\theta}$, are orthonormal and complete: that is precisely why they form the Fourier basis, and harmonic analysis on any abelian group generalizes this.

In applications, complex exponentials diagonalize linear time-invariant systems: $e^{i\\omega t}$ is an eigenfunction of differentiation ($\\frac{d}{dt}e^{i\\omega t}=i\\omega\\,e^{i\\omega t}$), so phasor methods turn differential equations for circuits and oscillators into algebra. In quantum mechanics the same $U(1)$ is the phase of the wavefunction, and its local ("gauge") version is electromagnetism — the simplest gauge theory.`,
      keyIdeas: [
        '$e^{i\\theta}$ is the exponential map onto $U(1)$; kernel $2\\pi\\mathbb{Z}$ = periodicity.',
        'Its characters $e^{in\\theta}$ are the complete orthonormal Fourier basis.',
        '$e^{i\\omega t}$ diagonalizes LTI systems and carries quantum phase / the EM gauge $U(1)$.',
      ],
      workedExample: {
        prompt: 'Show $e^{i\\omega t}$ is an eigenfunction of $d/dt$, and explain why this linearizes AC-circuit analysis.',
        solution: `Differentiate: $\\frac{d}{dt}e^{i\\omega t} = i\\omega\\,e^{i\\omega t}$ — the same function times the scalar $i\\omega$, the definition of an eigenfunction.

So for a circuit element, "take the time-derivative" becomes "multiply by $i\\omega$." An inductor's $v=L\\,di/dt$ becomes $v = (i\\omega L)\\,i$, defining the impedance $Z_L=i\\omega L$. Differential equations collapse to algebra in $i\\omega$ — the phasor method — because $e^{i\\omega t}$ diagonalizes the (linear, time-invariant) operator.`,
      },
      glossedOver: 'We used $U(1)$ as given. The covering $\\mathbb{R}\\to U(1)$ and its monodromy (and complex $\\log$) are the Level 5 thread.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Euler’s identity is one value of the multivalued complex logarithm/covering $\\mathbb{R}\\to U(1)$; the same $U(1)$ seeds gauge theory, theta functions, and the analytic theory of $L$-functions.',
      equationForms: [
        { latex: '0\\to 2\\pi\\mathbb{Z}\\to \\mathbb{R}\\xrightarrow{\\exp} U(1)\\to 0', caption: 'the universal cover of the circle' },
        { latex: '\\zeta(s)=\\prod_p (1-p^{-s})^{-1}', caption: 'where e^{-s\\log p} = p^{-s} carries the structure' },
      ],
      body: `Structurally, $\\exp(i\\cdot):\\mathbb{R}\\to U(1)$ is the **universal covering** of the circle, with deck group $2\\pi\\mathbb{Z}$; its inverse is the multivalued $\\log$, and Euler's identity is the principal value $\\log(-1)=i\\pi$. This single short exact sequence is the source of winding numbers, the first homotopy group $\\pi_1(S^1)=\\mathbb{Z}$, and the Aharonov–Bohm phase.

Gauging this $U(1)$ — promoting the constant phase to a spacetime-dependent one — *requires* a connection (the electromagnetic potential) and yields Maxwell's theory; the quantization of magnetic charge (Dirac) is again the $2\\pi$ periodicity. On the analytic side, exponentials $e^{-s\\log n}=n^{-s}$ build Dirichlet series and the Riemann zeta function, whose Euler product and functional equation are the deep modern descendants; theta and modular functions package the same $e^{2\\pi i\\tau}$ into objects governing partitions, lattices, and elliptic curves. The little half-turn $e^{i\\pi}=-1$ is the visible tip of $U(1)$'s role across geometry, physics, and number theory.`,
      keyIdeas: [
        '$\\exp:\\mathbb{R}\\to U(1)$ is the universal cover; Euler’s identity = principal value of $\\log(-1)$.',
        'Gauging $U(1)$ produces electromagnetism; its periodicity quantizes charge.',
        'The same $e^{2\\pi i\\tau}$ underlies modular forms and the analytic theory of $L$-functions.',
      ],
      workedExample: {
        prompt: 'Use the $U(1)$ winding to explain why $\\oint \\nabla(\\arg z)\\cdot d\\ell = 2\\pi$ around the origin, and connect to $\\pi_1(S^1)$.',
        solution: `Write $z = e^{i\\theta}$ on a loop encircling the origin once. The phase $\\theta=\\arg z$ increases by the total angle swept:

$$\\oint d\\theta = 2\\pi.$$

The integrand is single-valued but $\\theta$ is not — it changes branch by $2\\pi$ per loop, the monodromy of $\\exp$. The integer number of loops is the **winding number**, and the set of homotopy classes of loops is $\\pi_1(S^1)=\\mathbb{Z}$, generated by the once-around map whose half is exactly $e^{i\\pi}=-1$.`,
      },
    },
  ],
  connections: [
    { toId: 'logarithms', relationship: 'is the principal value of the complex logarithm from' },
    { toId: 'fourier', relationship: 'provides the rotating basis functions e^{iθ} used by' },
    { toId: 'maxwell', relationship: 'is the U(1) gauge symmetry whose gauging yields' },
  ],
  viz: {
    component: 'EulerPhasor',
    kind: 'interactive',
    defaultParams: { theta: 1.0471975512 },
    caption: 'A unit vector e^{iθ} sweeping the circle, with its cos and sin projections shown live. Sweep θ to π to land exactly on −1.',
    whatToTry: [
      'Drag θ to π and watch the arrow point at −1 (Euler’s identity).',
      'Stop at θ = π/2 to see e^{iπ/2} = i.',
      'Watch the cosine and sine projections trace the familiar waves.',
    ],
  },
  primarySources: [
    {
      authors: 'L. Euler',
      title: 'Introductio in analysin infinitorum',
      venue: 'Lausanne',
      year: 1748,
      note: 'states the formula e^{iθ} = cos θ + i sin θ',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'P. Nahin', title: 'Dr. Euler’s Fabulous Formula', venue: 'Princeton University Press', year: 2006 },
    { authors: 'T. Needham', title: 'Visual Complex Analysis', venue: 'Oxford University Press', year: 1997 },
  ],
  historyNote: `Roger Cotes published an equivalent relation, $\\ln(\\cos\\theta + i\\sin\\theta) = i\\theta$, in 1714 — but in logarithmic form, and he died young in 1716 (prompting Newton's remark, "if he had lived we might have known something"). Euler stated the formula in its exponential form in 1748 and wielded it with unmatched fluency.

The "identity" $e^{i\\pi}+1=0$ as a celebrated standalone equation is largely a later, aesthetic framing. In surveys of mathematicians it is repeatedly voted the most beautiful theorem in mathematics; Richard Feynman called the underlying formula "our jewel" and "the most remarkable formula in mathematics."`,
};

export default eulerIdentity;
