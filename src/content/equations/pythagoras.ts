import type { Equation } from '../types';

const pythagoras: Equation = {
  id: 'pythagoras',
  name: 'Pythagorean Theorem',
  nickname: 'the first deep theorem of mathematics',
  canonicalLatex: 'a^2 + b^2 = c^2',
  canonicalAlt: 'a squared plus b squared equals c squared',
  alternativeForms: [
    { latex: 'c = \\sqrt{a^2 + b^2}', label: 'solved for the hypotenuse' },
    { latex: '\\lVert \\mathbf{x} \\rVert^2 = \\sum_i x_i^2', label: 'Euclidean norm (any dimension)' },
    { latex: 'ds^2 = dx^2 + dy^2', label: 'infinitesimal distance (the flat metric)' },
  ],
  fields: ['geometry', 'mathematics'],
  era: { display: '~530 BCE', sortKey: -530 },
  discoverers: [
    { name: 'Pythagoras of Samos', note: 'traditional attribution; the school, not necessarily the man' },
    { name: 'Babylonian & earlier mathematicians', note: 'Plimpton 322 tablet lists Pythagorean triples, ~1800 BCE' },
  ],
  oneLine: 'In any right triangle, the squares on the two short sides add up to the square on the longest.',
  significance:
    'It is the bridge between geometry and arithmetic: lengths (geometry) obey an algebraic law. It defines distance itself — the Euclidean metric and its generalizations underpin coordinate geometry, trigonometry, vector spaces, and ultimately the spacetime interval of relativity. Its discovery of incommensurable lengths (√2) forced the first crisis and refinement in the idea of number.',
  applications: [
    'Computing straight-line distance between any two points (the distance formula)',
    'GPS, surveying, construction (the 3–4–5 rule for square corners)',
    'Vector magnitudes and norms throughout physics and machine learning',
    'Signal energy via Parseval’s theorem; least-squares fitting',
  ],
  symbols: [
    { symbol: 'a', name: 'leg', meaning: 'length of one side adjacent to the right angle', units: 'length' },
    { symbol: 'b', name: 'leg', meaning: 'length of the other side adjacent to the right angle', units: 'length' },
    { symbol: 'c', name: 'hypotenuse', meaning: 'length of the side opposite the right angle (the longest)', units: 'length' },
    { symbol: '\\mathbf{x}', name: 'vector', meaning: 'a point/displacement with components xᵢ', units: 'length' },
    { symbol: 'ds', name: 'line element', meaning: 'infinitesimal distance between nearby points', units: 'length' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary:
        'Tilt a square corner and the two short sides of a right triangle always relate to the long side in one fixed, magical way.',
      equationForms: [{ latex: 'a^2 + b^2 = c^2', caption: 'the two short sides vs. the long one' }],
      body: `Take a corner that is perfectly square — like the corner of a book. The two edges meeting at that corner are the *short sides*; the slanted line joining their far ends is the *long side*.

Now here is the wonder, known for thousands of years: if you build a square garden on each of the two short sides and a square garden on the long side, **the two small gardens together have exactly the same area as the big one**. Always. Whether the corner belongs to a tiny tile or a vast field.

This single fact lets us measure distances we cannot walk in a straight line, lay out perfectly square buildings, and — much later — describe the shape of space itself. It was humanity's first glimpse that the universe keeps exact arithmetic accounts.`,
      keyIdeas: [
        'Only works when one corner is a perfect right angle (90°).',
        'It is about **areas of squares**, not just the side lengths.',
        'It turns "how far apart?" into a calculation.',
      ],
      glossedOver:
        'We said "build squares and compare areas" — that *is* the theorem, but seeing *why* it must be true needs a proof, sketched at Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'For a right triangle with legs a, b and hypotenuse c, $a^2 + b^2 = c^2$ — and rearranged, it gives any side from the other two.',
      equationForms: [
        { latex: 'a^2 + b^2 = c^2' },
        { latex: 'c = \\sqrt{a^2 + b^2}', caption: 'find the hypotenuse' },
      ],
      body: `Label a right triangle: the two sides touching the right angle are the **legs** $a$ and $b$; the side across from it is the **hypotenuse** $c$. The theorem says

$$a^2 + b^2 = c^2.$$

Because the relation is symmetric in $a$ and $b$, you can solve for whichever side is unknown. The famous **3–4–5 triangle** satisfies it exactly ($9 + 16 = 25$), which is why a knotted rope marked in 3–4–5 lengths makes a guaranteed square corner.

Combined with coordinates, it becomes the **distance formula**: two points $(x_1,y_1)$ and $(x_2,y_2)$ are a distance $\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$ apart — just the theorem with the legs being the horizontal and vertical gaps.`,
      keyIdeas: [
        'Identify the hypotenuse first: it is always opposite the right angle.',
        'Whole-number solutions $(3,4,5),(5,12,13),\\dots$ are **Pythagorean triples**.',
        'The distance formula is this theorem in disguise.',
      ],
      workedExample: {
        prompt: 'A ladder reaches $4\\text{ m}$ up a wall while its foot is $3\\text{ m}$ from the base. How long is the ladder?',
        solution: `The wall, ground, and ladder form a right triangle with legs $3$ and $4$, and the ladder is the hypotenuse $c$:

$$c^2 = 3^2 + 4^2 = 9 + 16 = 25 \\;\\Rightarrow\\; c = \\sqrt{25} = 5\\text{ m}.$$

The ladder is $5\\text{ m}$ long — the 3–4–5 triple again.`,
      },
      misconceptions: [
        {
          claim: 'It works for any triangle.',
          correction:
            'Only right triangles. For a general triangle use the law of cosines $c^2 = a^2 + b^2 - 2ab\\cos C$, which reduces to Pythagoras exactly when $C = 90^\\circ$.',
        },
      ],
      glossedOver:
        'We used $\\sqrt{2}$-style answers freely. That some lengths are *irrational* — not a ratio of whole numbers — was a genuine shock; see the history note.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'A proof by rearrangement (or similar triangles), then the leap: the theorem *defines* the Euclidean inner product and norm, the model for all later notions of distance.',
      equationForms: [
        { latex: 'a^2 + b^2 = c^2' },
        { latex: '\\lVert \\mathbf{x} \\rVert^2 = \\langle \\mathbf{x}, \\mathbf{x}\\rangle = \\sum_{i=1}^n x_i^2', caption: 'norm from the inner product' },
      ],
      body: `**A proof (rearrangement).** Place four copies of the right triangle inside a square of side $a+b$. Arranged one way they leave a central square of side $c$ (area $c^2$); rearranged, they leave two squares of areas $a^2$ and $b^2$. Same outer square, same four triangles, so the leftover areas are equal: $a^2 + b^2 = c^2$. (Euclid I.47 gives a similar-triangles argument; there are hundreds of distinct proofs.)

**The generalization that matters.** In $\\mathbb{R}^n$ with the standard inner product $\\langle \\mathbf{x}, \\mathbf{y}\\rangle = \\sum_i x_i y_i$, the **norm** is $\\lVert \\mathbf{x}\\rVert = \\sqrt{\\langle \\mathbf{x},\\mathbf{x}\\rangle}$. Pythagoras becomes the statement that for **orthogonal** vectors ($\\langle \\mathbf{u},\\mathbf{v}\\rangle = 0$),

$$\\lVert \\mathbf{u} + \\mathbf{v}\\rVert^2 = \\lVert \\mathbf{u}\\rVert^2 + \\lVert \\mathbf{v}\\rVert^2.$$

This is the seed of all of metric geometry: the infinitesimal form $ds^2 = dx^2 + dy^2$ is the **flat metric**, which curved spaces (and spacetime) replace with $ds^2 = g_{\\mu\\nu}\\,dx^\\mu dx^\\nu$.`,
      keyIdeas: [
        'The theorem is equivalent to the parallelogram law / existence of an inner product.',
        'Orthogonality is the abstract version of "right angle."',
        '$ds^2 = dx^2 + dy^2$ generalizes to the metric tensor of differential geometry.',
      ],
      workedExample: {
        prompt: 'Show that $\\mathbf{u}=(3,0)$ and $\\mathbf{v}=(0,4)$ obey the Pythagorean norm identity.',
        solution: `They are orthogonal: $\\langle \\mathbf{u},\\mathbf{v}\\rangle = 3\\cdot 0 + 0\\cdot 4 = 0.$

Then $\\lVert\\mathbf{u}\\rVert^2 = 9,\\ \\lVert\\mathbf{v}\\rVert^2 = 16$, and $\\mathbf{u}+\\mathbf{v} = (3,4)$ has $\\lVert\\mathbf{u}+\\mathbf{v}\\rVert^2 = 9+16 = 25 = \\lVert\\mathbf{u}\\rVert^2 + \\lVert\\mathbf{v}\\rVert^2.$ The right angle between axes is exactly the orthogonality condition.`,
      },
      glossedOver:
        'We took "distance" as $ds^2 = dx^2+dy^2$. Why nature might choose a *different* quadratic form — e.g. $ds^2 = -c^2dt^2 + dx^2$ — is the relativistic story resolved at Level 5 and in the Einstein field equations.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Pythagoras as the defining identity of inner-product spaces: orthogonal decomposition, Parseval/Plancherel, and least-squares projection all *are* Pythagoras.',
      equationForms: [
        { latex: '\\lVert f \\rVert^2 = \\sum_{n} |c_n|^2', caption: "Parseval: energy in time = energy in coefficients" },
        { latex: '\\lVert \\mathbf{y} \\rVert^2 = \\lVert \\hat{\\mathbf{y}} \\rVert^2 + \\lVert \\mathbf{y}-\\hat{\\mathbf{y}}\\rVert^2', caption: 'least-squares decomposition' },
      ],
      body: `In any inner-product (Hilbert) space, if $\\{e_n\\}$ is an orthonormal basis then $f = \\sum_n c_n e_n$ with $c_n = \\langle f, e_n\\rangle$, and **Parseval's identity** $\\lVert f\\rVert^2 = \\sum_n |c_n|^2$ is Pythagoras for infinitely many orthogonal components. For the Fourier basis this is **Plancherel's theorem**: a signal's total energy equals the energy summed over frequencies — the rigorous reason "energy is conserved across the Fourier transform."

In statistics and numerics, the **orthogonal projection** $\\hat{\\mathbf{y}}$ of $\\mathbf{y}$ onto a subspace minimizes $\\lVert \\mathbf{y}-\\hat{\\mathbf{y}}\\rVert$, and the residual is orthogonal to the fit, giving $\\lVert \\mathbf{y}\\rVert^2 = \\lVert\\hat{\\mathbf{y}}\\rVert^2 + \\lVert\\mathbf{y}-\\hat{\\mathbf{y}}\\rVert^2$. This is the ANOVA "total = explained + residual" sum-of-squares identity — once again Pythagoras. The same projection theorem underlies the Gram–Schmidt process, QR/least squares, and the geometry of the normal equations.`,
      keyIdeas: [
        'Parseval/Plancherel = Pythagoras in an infinite orthonormal basis.',
        'Least squares = orthogonal projection; residual ⟂ fit ⇒ sum-of-squares splits.',
        'ANOVA, QR, and Gram–Schmidt are geometric consequences of the same identity.',
      ],
      workedExample: {
        prompt: 'For the signal $f(t)=\\cos(2\\pi t)$ on one period, relate its time-domain energy to its Fourier coefficients.',
        solution: `Write $\\cos(2\\pi t) = \\tfrac12 e^{2\\pi i t} + \\tfrac12 e^{-2\\pi i t}$, so the only nonzero coefficients are $c_{\\pm 1} = \\tfrac12$.

Energy in coefficients: $\\sum_n |c_n|^2 = (\\tfrac12)^2 + (\\tfrac12)^2 = \\tfrac12.$

Time energy: $\\int_0^1 \\cos^2(2\\pi t)\\,dt = \\tfrac12.$ They match — Parseval, i.e. Pythagoras across the two orthogonal Fourier modes.`,
      },
      glossedOver:
        'Convergence of $\\sum|c_n|^2$ and completeness of the basis are nontrivial (they require $L^2$ and the Riesz–Fischer theorem); we assumed a genuine orthonormal basis.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The quadratic form is the structure; signature is a choice. Pythagoras is the Riemannian special case of pseudo-Riemannian metrics, and orthogonality classifies via Sylvester’s law of inertia.',
      equationForms: [
        { latex: 'ds^2 = g_{\\mu\\nu}\\,dx^\\mu dx^\\nu', caption: 'general metric; Pythagoras is g = I' },
        { latex: 'ds^2 = -c^2\\,dt^2 + dx^2 + dy^2 + dz^2', caption: 'Minkowski (signature −+++)' },
      ],
      body: `The deep object is the **non-degenerate symmetric bilinear form** $g$; Pythagoras is the case $g = I$ (positive-definite, Euclidean). **Sylvester's law of inertia** says any such form is classified up to basis change by its signature $(p,q)$ — the count of $+$ and $-$ eigenvalues. Choosing $(n,0)$ gives Euclidean geometry and ordinary Pythagoras; choosing $(1,3)$ (or $(3,1)$) gives **Minkowski spacetime**, where the invariant interval $ds^2 = -c^2dt^2 + d\\mathbf{x}^2$ replaces "distance," and the triangle inequality famously *reverses* (the twin "paradox").

On a curved manifold, $g_{\\mu\\nu}(x)$ varies from point to point; Pythagoras survives only infinitesimally, in the tangent space. This local-Euclidean structure is precisely the equivalence principle, and curvature is the obstruction to making Pythagoras hold globally — the content of the Einstein field equations. The same bilinear-form viewpoint underlies indefinite inner products in QFT (Gupta–Bleuler, ghosts) and the geometry of information (Fisher metric).`,
      keyIdeas: [
        'Sylvester’s law of inertia: a quadratic form is classified by its signature $(p,q)$.',
        'Euclid is signature $(n,0)$; spacetime is $(1,3)$ — same algebra, reversed triangle inequality.',
        'Curvature = failure of Pythagoras to hold beyond the infinitesimal (tangent space).',
      ],
      workedExample: {
        prompt: 'Contrast the Euclidean and Minkowski "lengths" of the displacement with $\\Delta t = 1,\\ \\Delta x = c$ (set $c=1$).',
        solution: `Euclidean (signature $++$): $s^2 = \\Delta t^2 + \\Delta x^2 = 1 + 1 = 2.$

Minkowski (signature $-+$): $s^2 = -\\Delta t^2 + \\Delta x^2 = -1 + 1 = 0.$

The Minkowski interval is **null** — this displacement lies on a light ray, a distinction invisible to Euclidean Pythagoras and central to causal structure. Same quadratic-form machinery, different signature.`,
      },
    },
  ],
  connections: [
    { toId: 'einstein-field', relationship: 'is the flat-space limit of the metric in' },
    { toId: 'fourier', relationship: 'underlies the orthogonality / Parseval relation behind' },
    { toId: 'normal-distribution', relationship: 'supplies the sum-of-squares geometry used by' },
  ],
  viz: {
    component: 'PythagorasTriangle',
    kind: 'interactive',
    defaultParams: { a: 3, b: 4 },
    caption: 'Drag the right-angle vertex to reshape the triangle; the squares on each side resize and their areas always satisfy a² + b² = c².',
    whatToTry: [
      'Drag to make a 3–4–5 triangle and read off the areas 9, 16, 25.',
      'Make the legs equal: the hypotenuse is a × √2 — an irrational length.',
      'Flatten one leg toward zero and watch c approach the other leg.',
    ],
  },
  primarySources: [
    {
      authors: 'Euclid',
      title: 'Elements, Book I, Proposition 47',
      venue: 'Alexandria (c. 300 BCE)',
      year: -300,
      note: 'the earliest surviving rigorous proof',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'E. Maor', title: 'The Pythagorean Theorem: A 4,000-Year History', venue: 'Princeton University Press', year: 2007 },
    { authors: 'E. S. Loomis', title: 'The Pythagorean Proposition', venue: 'NCTM (367 proofs)', year: 1940 },
  ],
  historyNote: `Pythagorean *triples* were tabulated by Babylonian scribes on the Plimpton 322 tablet around 1800 BCE — over a millennium before Pythagoras — and the relation was known in India (Śulba Sūtras) and China (Zhoubi Suanjing). What the Greek tradition added was the demand for **proof**.

The theorem's own success produced a crisis: applied to a unit square, it forces the diagonal to be $\\sqrt{2}$, which the Pythagoreans proved cannot be written as a ratio of whole numbers. Legend says the discovery of these *incommensurable* magnitudes so disturbed the cult that it was kept secret. The resolution — a rigorous theory of real numbers — took until the 19th century (Dedekind, Cantor).`,
};

export default pythagoras;
