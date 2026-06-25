import type { Equation } from '../types';

const laplaceTransform: Equation = {
  id: 'laplace-transform',
  name: 'The Laplace Transform',
  nickname: 'the engineer’s key from calculus to algebra',
  canonicalLatex: 'F(s)=\\int_0^{\\infty} f(t)\\,e^{-st}\\,dt',
  canonicalAlt:
    'F of s equals the integral from zero to infinity of f of t times e to the minus s t, d t',
  alternativeForms: [
    { latex: '\\mathcal{L}\\{f\'(t)\\} = sF(s) - f(0)', label: 'differentiation becomes multiplication by s' },
    { latex: 'f(t) = \\dfrac{1}{2\\pi i}\\int_{\\gamma-i\\infty}^{\\gamma+i\\infty} F(s)\\,e^{st}\\,ds', label: 'inverse (Bromwich/Mellin) integral' },
    { latex: 'H(s) = \\dfrac{Y(s)}{X(s)}', label: 'transfer function (output / input in s)' },
  ],
  fields: ['mathematics', 'analysis'],
  era: { display: '1785', sortKey: 1785 },
  discoverers: [
    { name: 'Pierre-Simon Laplace', note: 'introduced the transform in probability theory, ~1785' },
    { name: 'Oliver Heaviside', note: 'operational calculus for circuits, 1880s–90s' },
    { name: 'Thomas Bromwich', note: 'rigorous contour-integral inversion, 1916' },
  ],
  oneLine: 'A machine that turns differential equations into algebra by trading the time domain for a complex-frequency domain.',
  significance:
    'The Laplace transform converts the calculus of how systems evolve in time — differential equations — into ordinary algebra in a complex variable s, automatically folding in initial conditions. It is the foundational tool of control theory and electrical engineering: transfer functions, stability analysis, and the entire pole–zero picture of how systems respond are written in the s-plane. It generalizes the Fourier transform to decaying/growing signals and is the bridge between transient analysis and steady-state frequency response.',
  applications: [
    'Control systems: transfer functions, feedback, stability (poles in the left half-plane)',
    'Electrical circuits: impedance, transient and step responses',
    'Solving linear ODEs/PDEs with initial conditions (mechanical, thermal systems)',
    'Signal processing and its discrete cousin, the z-transform',
  ],
  symbols: [
    { symbol: 'f(t)', name: 'time-domain signal', meaning: 'the function of time being transformed (t ≥ 0)', units: 'any' },
    { symbol: 'F(s)', name: 's-domain transform', meaning: 'the transformed function of the complex variable s', units: 'units of f × time' },
    { symbol: 's', name: 'complex frequency', meaning: 'complex variable s = σ + iω', units: '1/time' },
    { symbol: 't', name: 'time', meaning: 'the time variable (integration from 0)', units: 's' },
    { symbol: '\\sigma', name: 'real part of s', meaning: 'damping/growth rate; controls convergence', units: '1/s' },
    { symbol: '\\omega', name: 'angular frequency', meaning: 'imaginary part of s (oscillation rate)', units: 'rad/s' },
    { symbol: 'H(s)', name: 'transfer function', meaning: 'ratio of output to input transforms', units: 'depends' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'A mathematical machine that swallows a hard calculus problem and spits out easy algebra — the secret weapon behind how engineers design things that respond over time.',
      equationForms: [{ latex: 'F(s)=\\int_0^{\\infty} f(t)\\,e^{-st}\\,dt', caption: 'time-domain in, s-domain out' }],
      body: `Some problems are brutally hard in their natural setting but become easy if you look at them from a different angle. Logarithms famously turned multiplication into addition. The Laplace transform pulls off an even greater trick: it turns **calculus into algebra**.

Many of the most important questions in engineering are about how things *change and settle over time* — how a car's suspension absorbs a bump, how a thermostat brings a room to temperature, how a circuit responds when you flip a switch, how an autopilot corrects a drift. These are described by differential equations, which are hard. The Laplace transform carries the problem into a new "frequency-like" world (the *s-domain*), where the hard calculus collapses into ordinary algebra you can solve with high-school manipulation. Solve it there, then transform back to get the answer in time.

It's the quiet workhorse behind control engineering — the discipline that keeps everything from elevators to spacecraft stable and responsive.`,
      keyIdeas: [
        'It converts hard calculus (differential equations) into easy algebra.',
        'It moves a problem from the time domain to a "complex-frequency" domain.',
        'It’s the backbone of how engineers design systems that respond over time.',
      ],
      glossedOver: 'The "frequency-like world" uses a *complex* variable s that captures both oscillation and decay — made precise at Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The transform $F(s)=\\int_0^\\infty f(t)e^{-st}\\,dt$ converts a function of time into a function of s. Its superpower: differentiation becomes multiplying by s.',
      equationForms: [
        { latex: 'F(s)=\\int_0^{\\infty} f(t)\\,e^{-st}\\,dt' },
        { latex: '\\mathcal{L}\\{f\'(t)\\} = sF(s) - f(0)', caption: 'a derivative ⇒ multiply by s' },
      ],
      body: `Feed the transform a function $f(t)$ and it returns $F(s)$. You build a small dictionary of transforms once: a constant $1$ becomes $1/s$; an exponential $e^{at}$ becomes $1/(s-a)$; $\\sin(\\omega t)$ becomes $\\omega/(s^2+\\omega^2)$.

The reason it's so powerful is one rule: **taking a derivative in time becomes multiplying by $s$** in the transform (with the initial value subtracted off). So a differential equation — derivatives and all — turns into an ordinary algebraic equation in $s$. You solve that with algebra, then look up the answer in your dictionary to get back to time. The visualization shows how placing a "pole" in the s-plane corresponds to a specific behaviour in time (decaying, growing, oscillating).`,
      keyIdeas: [
        'A small transform "dictionary" handles common functions.',
        'Differentiation ↦ multiply by $s$; integration ↦ divide by $s$.',
        'Differential equations become algebra you can solve and look back up.',
      ],
      workedExample: {
        prompt: 'Solve $y\' + 2y = 0$ with $y(0) = 3$ using the Laplace transform.',
        solution: `Transform both sides. Using $\\mathcal{L}\\{y'\\} = sY(s) - y(0)$ and $\\mathcal{L}\\{y\\} = Y(s)$:

$$sY(s) - 3 + 2Y(s) = 0.$$

This is now **algebra** — solve for $Y(s)$:

$$Y(s)(s + 2) = 3 \\;\\Rightarrow\\; Y(s) = \\frac{3}{s + 2}.$$

Look up $\\dfrac{1}{s-a} \\leftrightarrow e^{at}$ with $a = -2$:

$$y(t) = 3e^{-2t}.$$

A decaying exponential — and the initial condition $y(0)=3$ was baked in automatically. No integration constants to chase.`,
      },
      misconceptions: [
        {
          claim: 'The Laplace transform is just the Fourier transform with a different letter.',
          correction:
            'They’re close cousins but differ: Laplace uses a *complex* frequency $s = \\sigma + i\\omega$ and integrates from $0$ to $\\infty$, so it handles growing/decaying signals and initial conditions. Fourier (real frequency $i\\omega$) is the special case on the imaginary axis, for steady signals.',
        },
      ],
      glossedOver: 'We treated $s$ as just "a variable." It is genuinely complex, and *where* it converges (the region of convergence) matters — Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'With $s = \\sigma + i\\omega$ complex, the transform exists in a region of convergence; it linearizes ODEs via $\\mathcal{L}\\{f\'\\}=sF-f(0)$, turns convolution into products, and encodes systems as transfer functions whose poles govern behaviour.',
      equationForms: [
        { latex: '\\mathcal{L}\\{f\'\\} = sF(s) - f(0), \\quad \\mathcal{L}\\{f*g\\} = F(s)G(s)', caption: 'derivative and convolution rules' },
        { latex: 'H(s) = \\dfrac{b_m s^m + \\cdots + b_0}{a_n s^n + \\cdots + a_0}', caption: 'rational transfer function' },
      ],
      body: `The variable $s = \\sigma + i\\omega$ is complex; the integral converges only for $\\mathrm{Re}(s)$ large enough — the **region of convergence** (e.g. $e^{at}$ transforms to $1/(s-a)$ for $\\mathrm{Re}(s) > a$). The derivative rule $\\mathcal{L}\\{f'\\} = sF(s) - f(0)$ (and its higher-order versions) turns a linear constant-coefficient ODE into a polynomial equation, with initial conditions appearing as algebraic terms — no homogeneous-plus-particular bookkeeping needed. The **convolution theorem** $\\mathcal{L}\\{f*g\\} = F(s)G(s)$ means the response of a linear system to any input is a single product in the s-domain.

For a linear time-invariant system, the **transfer function** $H(s) = Y(s)/X(s)$ is a rational function whose roots of the denominator are the **poles** and of the numerator the **zeros**. The poles are exactly the natural modes $e^{s_k t}$: a real pole at $\\sigma$ gives $e^{\\sigma t}$ (decay if $\\sigma<0$), a complex pair $\\sigma \\pm i\\omega$ gives a damped oscillation $e^{\\sigma t}\\cos(\\omega t)$. Inversion back to time is done by **partial fractions** matched against the transform dictionary. The visualization lets you drag a pole around the s-plane and watch the time response.`,
      keyIdeas: [
        'Complex $s$; existence requires a region of convergence.',
        'ODEs ↦ polynomials (initial conditions included); convolution ↦ multiplication.',
        'Transfer-function poles are the system’s natural modes $e^{s_k t}$.',
      ],
      workedExample: {
        prompt: 'Find the step response of an RC low-pass filter: $RC\\,\\dot v_o + v_o = v_{in}$ with a unit step input and $v_o(0)=0$.',
        solution: `Let $\\tau = RC$. Transform with $v_{in}(t)=1 \\Rightarrow V_{in}(s)=1/s$ and $v_o(0)=0$:

$$\\tau s V_o(s) + V_o(s) = \\frac{1}{s} \\;\\Rightarrow\\; V_o(s) = \\frac{1}{s(\\tau s + 1)}.$$

Partial fractions: $\\dfrac{1}{s(\\tau s+1)} = \\dfrac{1}{s} - \\dfrac{\\tau}{\\tau s + 1} = \\dfrac{1}{s} - \\dfrac{1}{s + 1/\\tau}.$

Invert each term:

$$v_o(t) = 1 - e^{-t/\\tau}.$$

The capacitor charges exponentially toward 1 with time constant $\\tau = RC$ — the single pole at $s = -1/\\tau$ sets the decay rate. The whole transient fell out of algebra.`,
      },
      glossedOver: 'We inverted by table lookup. The general inversion is a contour integral, and the link to Fourier and to *stability* is the Level 4 picture.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The bilateral transform with its region of convergence connects to Fourier on the imaginary axis; pole locations determine BIBO stability, and the s-plane is the working language of classical control.',
      equationForms: [
        { latex: 'f(t) = \\dfrac{1}{2\\pi i}\\int_{\\gamma - i\\infty}^{\\gamma + i\\infty} F(s)e^{st}\\,ds', caption: 'Bromwich inversion (γ in the ROC)' },
        { latex: '\\text{BIBO stable} \\iff \\text{all poles have } \\mathrm{Re}(s) < 0', caption: 'stability criterion' },
      ],
      body: `Inversion is the **Bromwich integral**, a contour up a vertical line $\\mathrm{Re}(s)=\\gamma$ inside the region of convergence; closing the contour and summing residues at the poles recovers the partial-fraction expansion rigorously. The **region of convergence** (ROC) is essential and is what distinguishes signals with the same algebraic $F(s)$: a right-sided decaying signal and a left-sided growing one can share a formula but have different ROCs. When the ROC includes the imaginary axis, $F(i\\omega)$ *is* the Fourier transform — Laplace is its analytic continuation to complex frequency, which is why it can handle signals Fourier cannot (growing exponentials, unbounded ramps).

In control engineering the s-plane is everything. **BIBO stability** holds iff every pole lies strictly in the left half-plane; poles on the axis give marginal stability (sustained oscillation), in the right half-plane, instability. The **frequency response** is $H(i\\omega)$ (Bode/Nyquist plots), the **root locus** tracks how closed-loop poles migrate as feedback gain varies, and the **final-value theorem** $\\lim_{t\\to\\infty} f(t) = \\lim_{s\\to 0} sF(s)$ (when poles are in the LHP) reads off steady state without inverting. Feedback design — PID controllers, lead/lag compensators — is the art of placing poles. The discrete-time analogue replaces $e^{st}$ sampling with the **z-transform**, mapping the LHP to the unit disk.`,
      keyIdeas: [
        'Bromwich contour inversion; ROC distinguishes signals with the same $F(s)$.',
        'On the imaginary axis Laplace reduces to Fourier (analytic continuation).',
        'BIBO stability ⇔ all poles in the left half-plane; control design = pole placement.',
      ],
      workedExample: {
        prompt: 'A feedback system has closed-loop poles at $s = -1 \\pm 4i$ and one at $s = +0.2$. Is it stable, and what behaviour dominates?',
        solution: `Check the real parts of all poles for BIBO stability:
- $s = -1 \\pm 4i$: $\\mathrm{Re} = -1 < 0$ → a decaying oscillation $e^{-t}\\cos(4t)$ (well-behaved).
- $s = +0.2$: $\\mathrm{Re} = +0.2 > 0$ → a **growing** exponential $e^{0.2t}$.

A single right-half-plane pole makes the system **unstable**: its output diverges regardless of the stable oscillatory modes. The dominant long-term behaviour is the runaway $e^{0.2t}$.

To stabilize, a control engineer would adjust feedback gain or add compensation to drag that pole into the left half-plane (root-locus design). This pole-location reading — instantly diagnosing stability and dynamics — is exactly why the s-plane is the language of control.`,
      },
      glossedOver: 'We leaned on rational transfer functions and tables. The deeper algebraic/operational foundations and the reach into other fields are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The transform is rigorously an operational calculus (Mikuśiński, distributions) and, abstractly, the resolvent of a semigroup generator (Hille–Yosida); it threads through asymptotics, the Mellin transform, and analytic number theory.',
      equationForms: [
        { latex: '(\\lambda I - A)^{-1} = \\int_0^{\\infty} e^{-\\lambda t}\\,T(t)\\,dt', caption: 'resolvent = Laplace transform of the semigroup (Hille–Yosida)' },
        { latex: '\\int_0^\\infty f(t)e^{-st}\\,dt \\sim \\sum_{n} \\dfrac{a_n\\,\\Gamma(n+1)}{s^{n+1}}', caption: "Watson's lemma (asymptotics)" },
      ],
      body: `Heaviside's operational calculus treated $d/dt$ as an algebraic symbol $p$ and got correct answers by manipulations he could not justify ("Shall I refuse my dinner because I do not fully understand digestion?"). Rigor came in stages: Bromwich's contour integral, then **Mikuśiński's** purely algebraic construction (the convolution ring of continuous functions, localized into a field of "operators" where $1/s$ is a genuine object), and the **distributional** Laplace transform that makes $\\mathcal{L}\\{\\delta\\}=1$ and handles impulses cleanly. These place operational calculus on firm ground and connect it to the theory of generalized functions.

Abstractly, the Laplace transform *is* the **resolvent** of a generator: for a strongly-continuous (C₀) semigroup $T(t)=e^{tA}$ on a Banach space, $(\\lambda I - A)^{-1} = \\int_0^\\infty e^{-\\lambda t}T(t)\\,dt$, and the **Hille–Yosida theorem** characterizes which operators generate semigroups via resolvent bounds — the functional-analytic engine behind well-posedness of evolution PDEs (heat, wave, Schrödinger). The transform also governs **asymptotics**: Watson's lemma and Laplace's method extract the large-$s$ (or large-parameter) behaviour from the singularities of $f$. Through the change $t = e^{-x}$ it is kin to the **Mellin transform**, which underlies the analytic theory of Dirichlet series and the explicit formulas relating prime counting to the zeros of $\\zeta(s)$ — so the same operational idea that tames a circuit also sits beneath analytic number theory. Its discrete shadow, the z-transform, and the two-sided transform complete a unified picture of how decay, oscillation, and growth are encoded in the complex plane.`,
      keyIdeas: [
        'Operational calculus made rigorous: Bromwich contours, Mikuśiński’s algebra, distributions.',
        'Laplace transform of a C₀-semigroup = the resolvent; Hille–Yosida governs evolution PDEs.',
        'Tauberian/asymptotic role (Watson’s lemma) and Mellin kinship link it to analytic number theory.',
      ],
      workedExample: {
        prompt: 'Explain how the Laplace transform appears as the resolvent of a semigroup, and why that matters for solving evolution equations.',
        solution: `Consider an abstract evolution equation $\\dot u = A u$, $u(0)=u_0$, with formal solution $u(t) = T(t)u_0$ where $T(t) = e^{tA}$ is a one-parameter semigroup ($T(0)=I$, $T(t)T(s)=T(t+s)$).

Take the Laplace transform in time of $T(t)$:

$$R(\\lambda) := \\int_0^\\infty e^{-\\lambda t} T(t)\\,dt = (\\lambda I - A)^{-1},$$

the **resolvent** of the generator $A$ (valid for $\\mathrm{Re}\\,\\lambda$ beyond the growth bound). So the transform converts the *dynamical* object $T(t)$ into the *algebraic/spectral* object $(\\lambda I - A)^{-1}$ — exactly the time-to-algebra trade, now in infinite dimensions.

This matters because the **Hille–Yosida theorem** turns existence of the semigroup (i.e. solvability of the PDE) into checkable **resolvent estimates** on $A$: a densely-defined operator generates a contraction semigroup iff $\\|(\\lambda I - A)^{-1}\\| \\le 1/\\lambda$ for $\\lambda > 0$. Heat, wave, and Schrödinger evolutions are all established this way. The schoolroom Laplace transform is, at this altitude, the spectral theory of time evolution.`,
      },
    },
  ],
  connections: [
    { toId: 'fourier', relationship: 'generalizes to complex frequency the' },
    { toId: 'derivative', relationship: 'converts into multiplication by s the' },
    { toId: 'heat-equation', relationship: 'turns into algebra (via the resolvent) the evolution of the' },
    { toId: 'logarithms', relationship: 'shares the calculus-to-algebra spirit of' },
  ],
  viz: {
    component: 'LaplaceSPlane',
    kind: 'interactive',
    defaultParams: { sigma: -0.4, omega: 4 },
    caption: 'Drag a pole (and its complex-conjugate partner) around the s-plane and watch the corresponding time response — decaying, oscillating, or blowing up.',
    whatToTry: [
      'Put the pole in the left half-plane and watch the response decay (stable).',
      'Move it onto the imaginary axis for pure, undying oscillation (marginal).',
      'Cross into the right half-plane and watch the response blow up (unstable).',
    ],
  },
  primarySources: [
    {
      authors: 'P.-S. Laplace',
      title: 'Théorie analytique des probabilités',
      venue: 'Paris',
      year: 1812,
      note: 'develops the generating-function/transform method (origins ~1785)',
      primary: true,
    },
    {
      authors: 'T. J. Bromwich',
      title: 'Normal coordinates in dynamical systems',
      venue: 'Proc. London Math. Soc. 15, 401',
      year: 1916,
      note: 'rigorous contour-integral inversion of operational calculus',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'M. J. Roberts', title: 'Signals and Systems', venue: 'McGraw-Hill', year: 2018 },
    { authors: 'K. Ogata', title: 'Modern Control Engineering', venue: 'Pearson', year: 2010 },
    { authors: 'R. V. Churchill', title: 'Operational Mathematics', venue: 'McGraw-Hill', year: 1972 },
  ],
  historyNote: `Laplace introduced the transform in the 1780s as a tool in probability and difference equations, but its rise to ubiquity came a century later through **Oliver Heaviside**, the self-taught engineer who developed a brazen "operational calculus" — treating the derivative operator as an algebraic quantity — to solve telegraph-line and circuit problems. It worked spectacularly, yet horrified mathematicians; Heaviside retorted, "Shall I refuse my dinner because I do not fully understand the process of digestion?"

Vindication came from Bromwich, Carson, and others who showed Heaviside's methods were the Laplace transform in disguise, justified by contour integration. The mid-20th-century rise of **control theory** (and the textbook by Gardner and Barnes, 1942) cemented the s-plane as the engineer's native language, and Mikuśiński later gave operational calculus a fully rigorous algebraic foundation — a rare case of engineering practice dragging mathematics to new rigor.`,
};

export default laplaceTransform;
