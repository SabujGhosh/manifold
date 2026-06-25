import type { Equation } from '../types';

const mandelbrot: Equation = {
  id: 'mandelbrot',
  name: 'The Mandelbrot Iteration',
  nickname: 'the most complex object in mathematics',
  canonicalLatex: 'z_{n+1}=z_n^2+c',
  canonicalAlt: 'z sub n plus one equals z sub n squared plus c',
  alternativeForms: [
    { latex: 'M = \\{\\,c\\in\\mathbb{C} : \\sup_n |z_n| < \\infty,\\ z_0=0\\,\\}', label: 'the Mandelbrot set' },
    { latex: '|z_n| > 2 \\Rightarrow \\text{orbit escapes}', label: 'escape criterion' },
  ],
  fields: ['nonlinear-dynamics', 'mathematics'],
  era: { display: '1980', sortKey: 1980 },
  discoverers: [
    { name: 'Benoit Mandelbrot', note: 'visualized and studied the set, 1980' },
    { name: 'Gaston Julia & Pierre Fatou', note: 'foundational theory of complex iteration, 1910s' },
  ],
  oneLine: 'A one-line rule on complex numbers that generates infinite, self-similar complexity — the icon of fractals.',
  significance:
    'The Mandelbrot set shows that endless, intricate, self-similar structure can arise from the simplest nonlinear rule, $z \\to z^2 + c$, iterated on the complex plane. It is the master catalog of Julia sets, the visual emblem of chaos and fractal geometry, and the complexification of the logistic map — its real-axis slice contains the entire period-doubling route to chaos. It made fractals a household idea and connects elementary iteration to deep questions in complex dynamics.',
  applications: [
    'The defining example of fractal geometry and self-similarity',
    'Image compression (fractal/IFS) and procedural computer graphics',
    'Modeling rough natural forms (coastlines, clouds, terrain)',
    'A visual gateway to chaos, complex dynamics, and universality',
  ],
  symbols: [
    { symbol: 'z_n', name: 'iterate', meaning: 'the nth value in the orbit (a complex number), starting z₀ = 0', units: 'dimensionless' },
    { symbol: 'c', name: 'parameter', meaning: 'a fixed complex number; one point of the picture', units: 'dimensionless' },
    { symbol: 'M', name: 'Mandelbrot set', meaning: 'the set of c for which the orbit stays bounded', units: 'a region of ℂ' },
    { symbol: 'i', name: 'imaginary unit', meaning: 'i² = −1; the vertical axis of the complex plane', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Repeat one tiny arithmetic rule over and over, color by what happens, and out comes an infinitely detailed shape you can zoom into forever.',
      equationForms: [{ latex: 'z_{n+1}=z_n^2+c', caption: 'square it, add a number, repeat' }],
      body: `Take a number, square it, add a fixed number, and repeat — forever. Whether the result eventually runs off to infinity or stays trapped near home depends delicately on which fixed number you chose. Color each starting choice black if it stays trapped, and by *how fast* it escapes otherwise, and you paint one of the most astonishing images in all of mathematics: the **Mandelbrot set**.

What makes it miraculous is its **infinite detail**. Zoom into its warty, lightning-edged boundary and you find spirals, seahorses, miniature copies of the whole set, and structures no one designed — all flowing from that one trivial rule. You can magnify it a million-fold, a trillion-fold, and never run out of new intricacy. The complexity isn't put in; it *emerges*.

This picture became the emblem of **fractals** and **chaos** — the discovery that simplicity can breed unlimited complexity. The interactive on this page lets you dive in and zoom.`,
      keyIdeas: [
        'One repeated rule, colored by escape, makes an infinitely detailed shape.',
        'Zooming in reveals endless new structure and mini-copies of the whole.',
        'It is the icon of fractals: complexity emerging from simplicity.',
      ],
      glossedOver: 'The "numbers" here are *complex* numbers (with an imaginary part); that 2-D nature is why the picture is a shape — Level 2.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Using complex numbers (a + bi as a point on a plane), iterate $z \\to z^2 + c$ starting from 0. The set $M$ is the points $c$ whose orbit never escapes.',
      equationForms: [
        { latex: 'z_{n+1} = z_n^2 + c,\\quad z_0 = 0' },
        { latex: '|z_n| > 2 \\Rightarrow \\text{escapes to infinity}', caption: 'the escape test' },
      ],
      body: `A **complex number** $c = a + bi$ is just a point $(a, b)$ on a plane, where $i^2 = -1$. To square one, you both stretch and rotate it. Pick a point $c$, start at $z_0 = 0$, and apply $z \\to z^2 + c$ over and over. Two things can happen: the values stay bounded (orbit trapped) or they grow without limit (escape to infinity).

The **Mandelbrot set** $M$ is the collection of all $c$ whose orbit stays bounded — drawn black. There's a clean test: if any $|z_n|$ ever exceeds 2, the orbit is guaranteed to escape, so you stop and color $c$ by *how many steps* that took (giving the famous rainbow bands around the black body). Points well inside stay bounded forever; points far outside escape immediately; the drama is all at the **boundary**, which is infinitely intricate.`,
      keyIdeas: [
        'Complex numbers are points on a plane; squaring stretches and rotates.',
        '$M$ = the $c$ values whose orbit (from $z_0=0$) stays bounded.',
        'Escape test: once $|z| > 2$, it’s gone — color by escape speed.',
      ],
      workedExample: {
        prompt: 'Test whether $c = -1$ is in the Mandelbrot set by iterating a few steps.',
        solution: `Start $z_0 = 0$ and apply $z \\to z^2 + (-1)$:

$z_1 = 0^2 - 1 = -1.$
$z_2 = (-1)^2 - 1 = 0.$
$z_3 = 0^2 - 1 = -1.$
$z_4 = 0.$

The orbit settles into a **2-cycle** $0, -1, 0, -1, \\dots$ — it never exceeds 2 and never escapes. So $c = -1$ **is in** the Mandelbrot set (it sits in the big circular "head" to the left of the main body). Contrast $c = 1$: $z_1 = 1, z_2 = 2, z_3 = 5, z_4 = 26,\\dots$ — escaping fast, so $c=1$ is *not* in the set.`,
      },
      misconceptions: [
        {
          claim: 'The colorful bands are part of the Mandelbrot set.',
          correction:
            'The set itself is only the black region (bounded orbits). The colors are a *visualization* of how quickly outside points escape — beautiful, but not part of $M$. Different color schemes show the same set.',
        },
      ],
      glossedOver: 'We start every orbit at $z_0=0$ and vary $c$. Fixing $c$ and varying the *start* gives a related fractal — the Julia set, Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The Mandelbrot set is the connectedness locus of the quadratic family; it indexes the Julia sets, and its real slice is exactly the logistic family’s route to chaos.',
      equationForms: [
        { latex: 'M = \\{c : J_c \\text{ is connected}\\} = \\{c : 0 \\text{ has bounded orbit}\\}', caption: 'two equivalent definitions' },
        { latex: 'c = \\tfrac{r}{2}-\\tfrac{r^2}{4}\\ \\leftrightarrow\\ x\\mapsto rx(1-x)', caption: 'real slice = logistic map' },
      ],
      body: `For each $c$, the **Julia set** $J_c$ is the boundary between starting points whose orbits stay bounded and those that escape. A foundational theorem (Fatou–Julia): $J_c$ is **connected** exactly when the orbit of the critical point $z_0 = 0$ stays bounded. The Mandelbrot set is therefore the **connectedness locus** — it catalogs which $c$ give connected Julia sets (inside $M$) versus dust-like Cantor sets (outside). The orbit of the critical point controls everything, which is why we iterate from $z_0=0$.

The structure is exquisitely organized. The main **cardioid** consists of $c$ with an attracting fixed point; attached **disks** (bulbs) correspond to attracting cycles of period 2, 3, …, and the bulb sizes/positions follow number-theoretic (Farey) rules. Crucially, **restricting to the real axis recovers the logistic map**: the affine change $c = r/2 - r^2/4$ maps $z\\mapsto z^2+c$ to $x\\mapsto rx(1-x)$, so the real interval $c\\in[-2, 1/4]$ contains the entire period-doubling cascade and chaos of the logistic map. The Mandelbrot set is the logistic map's complexification.`,
      keyIdeas: [
        'Julia set connected ⟺ critical orbit bounded ⟹ definition of $M$.',
        'Cardioid = attracting fixed point; bulbs = attracting cycles (period 2, 3, …).',
        'Real slice of $M$ is exactly the logistic map’s bifurcation route.',
      ],
      workedExample: {
        prompt: 'Find the main cardioid: the set of $c$ for which $z\\mapsto z^2+c$ has an attracting fixed point.',
        solution: `Fixed points solve $z = z^2 + c$. The map's derivative is $2z$, and the fixed point is **attracting** when $|2z| < 1$, i.e. $|z| < 1/2$.

Parametrize the attracting fixed point by its multiplier $\\lambda = 2z = e^{i\\theta}$ with $|\\lambda|<1$ on the boundary $\\lambda=e^{i\\theta}$. Then $z = \\tfrac12 e^{i\\theta}$ and $c = z - z^2 = \\tfrac12 e^{i\\theta} - \\tfrac14 e^{2i\\theta}$.

As $\\theta$ runs $0$ to $2\\pi$, this traces the **main cardioid** — the large heart-shaped body of the Mandelbrot set. Its cusp is at $c = 1/4$ (where $\\lambda = 1$, the fixed point turns neutral) and the period-2 bulb attaches at $c = -3/4$ (where $\\lambda = -1$, the period-doubling point — the same $r=3$ of the logistic map).`,
      },
      glossedOver: 'We described the bulbs informally. Whether $M$ is *locally connected* (the MLC conjecture) is a deep open problem — Level 4/5.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Holomorphic dynamics: M is connected (Douady–Hubbard) with conformal exterior; renormalization explains its self-similar small copies; its boundary has Hausdorff dimension 2 (Shishikura).',
      equationForms: [
        { latex: '\\Phi: \\mathbb{C}\\setminus M \\xrightarrow{\\sim} \\mathbb{C}\\setminus\\overline{\\mathbb{D}}', caption: 'conformal map of the exterior (Douady–Hubbard)' },
        { latex: '\\dim_H(\\partial M) = 2', caption: 'Shishikura: boundary has full dimension' },
      ],
      body: `The Mandelbrot set is the central object of **holomorphic dynamics**. Douady and Hubbard proved it is **connected** by constructing an explicit conformal isomorphism $\\Phi$ from its complement to the complement of the closed unit disk; the preimages of straight rays ("external rays") and circles give the combinatorial coordinates (angles, the "pinched-disk" model) that organize the entire set and its bifurcation structure. The **small copies** of $M$ that appear under magnification are explained by their theory of **polynomial-like maps** and renormalization: zooming into a baby-Mandelbrot region, the dynamics is conjugate to the full quadratic family again — self-similarity as a renormalization fixed point, the same mechanism behind Feigenbaum universality.

The boundary is fantastically rough: **Shishikura** proved $\\partial M$ has Hausdorff dimension **2** (full dimension, though area zero is expected), making it in a precise sense the most complicated curve in mathematics. Numerically, smooth (continuous) escape-time coloring uses the renormalized iteration count $n - \\log_2\\log_2|z_n|$ to avoid banding, and the **distance estimator** $|z_n|\\ln|z_n|/|z_n'|$ enables deep, clean zooms. The real slice's correspondence to the logistic map ties the period-doubling cascade, Feigenbaum constants, and Sharkovskii ordering into the complex picture.`,
      keyIdeas: [
        'Connected via an explicit conformal map of the exterior (external rays).',
        'Baby-Mandelbrot copies = renormalization (polynomial-like maps).',
        '∂M has Hausdorff dimension 2 (Shishikura) — maximal roughness.',
      ],
      workedExample: {
        prompt: 'Explain the smooth (continuous) escape-time coloring formula $\\nu = n - \\log_2\\log_2|z_n|$ and why it removes color banding.',
        solution: `Naive coloring uses the integer iteration count $n$ at which $|z_n|$ first exceeds the escape radius $R$, producing visible **bands** (all points escaping on the same iteration get one color).

Near escape, the dynamics is dominated by $z\\mapsto z^2$, so $|z_n| \\approx |z_{n-1}|^2$ and the magnitude grows doubly-exponentially: $\\log\\log|z_n|$ increases by a *constant* per iteration. The fractional part $\\log_2\\log_2|z_n|$ therefore interpolates *smoothly* how far "past" the escape threshold a point landed. Subtracting it,

$$\\nu = n - \\log_2\\log_2|z_n|,$$

gives a continuous real-valued escape "time" that varies smoothly across the boundary between integer-$n$ regions — eliminating the bands and producing the smooth gradients in modern renderings. It is a direct consequence of the $z^2$ doubling near infinity.`,
      },
      glossedOver: 'We cited connectivity and dimension. Whether $M$ is *locally connected* (MLC) — which would settle its complete combinatorial structure — is the major open Level 5 problem.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The MLC conjecture, density of hyperbolicity, and the rigidity program drive complex dynamics; the Mandelbrot set is a universal object appearing across parametrized holomorphic families.',
      equationForms: [
        { latex: '\\text{MLC: } M \\text{ is locally connected} \\Rightarrow \\text{combinatorial classification complete}', caption: 'the central open conjecture' },
        { latex: '\\overline{\\{\\text{hyperbolic } c\\}} = M\\ ?', caption: 'density of hyperbolicity (Fatou’s conjecture)' },
      ],
      body: `The deepest open problem is **MLC** — that the Mandelbrot set is *locally connected*. By Douady–Hubbard's pinched-disk model, MLC would yield a complete topological/combinatorial description of $M$ (every point reachable by a well-defined external ray) and, by Yoccoz's work, would imply **density of hyperbolicity** for real quadratics (Fatou's conjecture: attracting-cycle parameters are dense), proved on the real line by Graczyk–Świątek and Lyubich but open in $\\mathbb{C}$. Yoccoz proved MLC at all finitely-renormalizable parameters via his **puzzle** machinery; the infinitely-renormalizable case is attacked through **renormalization theory** (Sullivan, McMullen, Lyubich), where the renormalization operator's hyperbolic fixed point structure (a rigorous, far-reaching generalization of Feigenbaum universality) is central. Rigidity conjectures assert that combinatorial equivalence implies conformal equivalence.

The Mandelbrot set is also **universal** in a precise sense: McMullen showed quasiconformal copies of $M$ appear in essentially *any* nontrivial holomorphic family of maps — it is not special to $z^2+c$ but a fundamental organizing object of parameter space, the way the Feigenbaum constants are universal in dynamics. Connections radiate to arithmetic dynamics, the geometry of the Fibonacci/Farey combinatorics of bulbs, and even computational complexity (the set's membership problem and questions of its "computability"). A one-line iteration has generated one of the richest research areas in modern mathematics, much of it still open.`,
      keyIdeas: [
        'MLC (local connectivity) is the central open conjecture; implies a complete classification.',
        'Renormalization theory generalizes Feigenbaum universality to complex dynamics.',
        'McMullen: copies of $M$ are universal across holomorphic families.',
      ],
      workedExample: {
        prompt: 'State the MLC conjecture and one major consequence if it holds.',
        solution: `**MLC (Mandelbrot Locally Connected) conjecture.** The Mandelbrot set $M$ is locally connected — every point has arbitrarily small connected neighborhoods (within $M$).

**Why it matters.** Douady and Hubbard showed the complement of $M$ is conformally the complement of a disk, with "external rays" landing on $\\partial M$. If $M$ is locally connected, then (by Carathéodory's theorem) *every* external ray lands at a well-defined point, and the **pinched-disk model** gives a complete combinatorial description: one can label every point of $M$ by the angles of the rays landing there, fully classifying the bifurcation structure.

A key dynamical payoff (via Yoccoz): MLC implies **density of hyperbolicity** for the complex quadratic family — that parameters with an attracting cycle (the "nice," structurally stable maps) are dense in $M$. This would mean chaos is, in the parameter sense, non-generic-and-fragile, completing a picture proved on the real line but still open in the complex plane. MLC is widely believed and supported by Yoccoz's partial results, but remains unproven for infinitely-renormalizable parameters.`,
      },
    },
  ],
  connections: [
    { toId: 'logistic-map', relationship: 'complexifies, containing on its real axis the' },
    { toId: 'renormalization-group', relationship: 'has self-similar copies explained by the renormalization of' },
    { toId: 'euler-identity', relationship: 'iterates in the complex plane built on' },
  ],
  viz: {
    component: 'Mandelbrot',
    kind: 'interactive',
    defaultParams: { centerX: -0.5, centerY: 0, zoom: 1, maxIter: 200 },
    caption: 'A zoomable escape-time render of z → z² + c. Click or scroll to dive in; the real-axis slice is marked to show its correspondence with the logistic map.',
    whatToTry: [
      'Zoom into the boundary and find a miniature copy of the whole set.',
      'Follow the real axis and connect the bulbs to the logistic map’s period-doublings.',
      'Increase max iterations to resolve the fine filaments near the boundary.',
    ],
  },
  primarySources: [
    {
      authors: 'B. B. Mandelbrot',
      title: 'Fractal aspects of the iteration of z → λz(1−z) for complex λ and z',
      venue: 'Annals of the New York Academy of Sciences 357, 249',
      year: 1980,
      note: 'first detailed study/visualization of the set',
      primary: true,
    },
    {
      authors: 'A. Douady & J. H. Hubbard',
      title: 'Itération des polynômes quadratiques complexes',
      venue: 'C. R. Acad. Sci. Paris 294, 123',
      year: 1982,
      note: 'proves the set is connected; foundational theory',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'B. Mandelbrot', title: 'The Fractal Geometry of Nature', venue: 'W. H. Freeman', year: 1982 },
    { authors: 'J. Milnor', title: 'Dynamics in One Complex Variable', venue: 'Princeton University Press', year: 2006 },
  ],
  historyNote: `The underlying mathematics dates to Gaston Julia and Pierre Fatou's work on complex iteration around 1917–1918 — done entirely without pictures, since they had no computers. The subject lay largely dormant for decades. Benoit Mandelbrot, working at IBM with access to computer graphics, first plotted the set in 1980; the crude early printouts showed specks he initially thought were dust on the screen — they turned out to be the tiny satellite copies of the set.

Mandelbrot, who coined the word "fractal" (from Latin *fractus*, broken), championed the idea that nature's roughness — coastlines, mountains, clouds — demanded a new geometry. The set bearing his name became the most famous mathematical image of the computer age, even as the deepest questions about it (MLC) remain unsolved.`,
};

export default mandelbrot;
