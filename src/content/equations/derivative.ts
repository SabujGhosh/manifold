import type { Equation } from '../types';

const derivative: Equation = {
  id: 'derivative',
  name: 'The Derivative (Calculus)',
  nickname: 'the mathematics of instantaneous change',
  canonicalLatex: "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}",
  canonicalAlt:
    'f prime of x equals the limit as h goes to zero of the quantity f of x plus h minus f of x, all over h',
  alternativeForms: [
    { latex: '\\frac{df}{dx} = \\lim_{\\Delta x\\to 0}\\frac{\\Delta f}{\\Delta x}', label: 'Leibniz notation' },
    { latex: 'Df(x)\\,h = \\lim_{t\\to 0}\\frac{f(x+th)-f(x)}{t}', label: 'directional / Fréchet derivative' },
  ],
  fields: ['analysis', 'mathematics'],
  era: { display: '1666–1684', sortKey: 1666 },
  discoverers: [
    { name: 'Isaac Newton', note: 'fluxions, ~1666' },
    { name: 'Gottfried Wilhelm Leibniz', note: 'differential notation, published 1684' },
    { name: 'Cauchy & Weierstrass', note: 'rigorous limit definition, 19th c.' },
  ],
  oneLine: 'The exact rate at which something changes at a single instant — the slope of a curve at a point.',
  significance:
    'The derivative makes "instantaneous rate of change" precise, resolving Zeno-style paradoxes about motion. It is the engine of physics (velocity, acceleration, every law written as a differential equation), of optimization (maxima where the derivative vanishes), and of approximation (linearization). Together with its inverse, the integral, it is one half of the most consequential idea in applied mathematics.',
  applications: [
    'Velocity and acceleration from position; every law of motion',
    'Optimization: finding maxima/minima by setting derivatives to zero',
    'Linear approximation and Newton’s method for solving equations',
    'Gradients and backpropagation in machine learning',
  ],
  symbols: [
    { symbol: 'f', name: 'function', meaning: 'the quantity whose rate of change we study', units: 'any' },
    { symbol: 'x', name: 'independent variable', meaning: 'the input (often time or position)', units: 'any' },
    { symbol: 'h', name: 'increment', meaning: 'a small change in x that is sent to zero', units: 'same as x' },
    { symbol: "f'", name: 'derivative', meaning: 'the instantaneous rate of change of f with respect to x', units: 'units of f per unit of x' },
    { symbol: '\\frac{df}{dx}', name: 'Leibniz derivative', meaning: 'same object, emphasizing the ratio of small changes', units: 'units of f per unit of x' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'How fast is something changing *right now*? The derivative is the speedometer reading of any quantity.',
      equationForms: [{ latex: "\\text{slope} = \\frac{\\text{rise}}{\\text{run}}", caption: 'as the run shrinks to an instant' }],
      body: `Your car's speedometer shows your speed *at this very moment* — not your average over the whole trip. But "speed at a single instant" is a slippery idea: in zero time you travel zero distance, so isn't speed just $0/0$?

The derivative is the brilliant resolution. Instead of an instant, look at a tiny interval and compute the average speed over it; then imagine the interval shrinking toward zero. The average speeds **home in on a single number** — and that number is the instantaneous speed. The derivative is that homing-in, made exact, for *any* changing quantity: how fast a population grows, how steeply a hill rises, how quickly a price moves.

Pictured on a graph, the derivative is the **steepness of the curve** at one point — the slope of the line that just kisses the curve there.`,
      keyIdeas: [
        'Derivative = instantaneous rate of change.',
        'It is found by shrinking an average down to a single instant.',
        'On a graph it is the slope of the tangent line.',
      ],
      glossedOver: 'The "homing-in" is the idea of a *limit*. Making it airtight (rather than $0/0$) is the content of Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The derivative is the limit of the slope of a secant line as the two points merge: $f\'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$.',
      equationForms: [{ latex: "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}" }],
      body: `Draw a curve $y=f(x)$. Pick a point and a nearby point a horizontal distance $h$ away. The line through them — the **secant** — has slope $\\frac{f(x+h)-f(x)}{h}$, the rise over the run.

Now slide the second point toward the first ($h\\to 0$). The secant pivots until it becomes the **tangent** line, and its slope is the derivative $f'(x)$. The visualization on this page animates exactly that pivot.

For powers there is a shortcut, the **power rule**: $\\frac{d}{dx}x^n = n\\,x^{n-1}$. So the slope of $x^2$ is $2x$, of $x^3$ is $3x^2$, and so on — letting you skip the limit once you trust it.`,
      keyIdeas: [
        'Secant slope → tangent slope as $h\\to 0$.',
        'Power rule: $\\frac{d}{dx}x^n = n x^{n-1}$.',
        'Units of $f\'$ are (units of $f$) per (unit of $x$).',
      ],
      workedExample: {
        prompt: 'Use the limit definition to find the derivative of $f(x)=x^2$ at a general point $x$.',
        solution: `Form the difference quotient:

$$\\frac{(x+h)^2 - x^2}{h} = \\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{2xh + h^2}{h} = 2x + h.$$

Now let $h\\to 0$: the $h$ term vanishes, leaving $f'(x) = 2x$ — matching the power rule. At $x=3$ the slope is $6$.`,
      },
      misconceptions: [
        {
          claim: 'The derivative is just "$f$ divided by $x$" or the value of the function.',
          correction:
            'No. It is the *rate of change* (slope), not the height. A large function value can have zero slope (a flat peak) and vice versa.',
        },
      ],
      glossedOver: 'We let "$h\\to 0$" without saying what a limit really is. Cauchy and Weierstrass made that precise — Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Differentiability means a *linear approximation* with vanishing relative error; it implies continuity, gives the rules (product, chain), and underlies Taylor expansion.',
      equationForms: [
        { latex: 'f(x+h) = f(x) + f\'(x)\\,h + o(h)', caption: 'derivative = best linear approximation' },
        { latex: '(f\\circ g)\'(x) = f\'(g(x))\\,g\'(x)', caption: 'chain rule' },
      ],
      body: `The rigorous statement: $f$ is **differentiable** at $x$ with derivative $f'(x)$ if $f(x+h) = f(x) + f'(x)h + o(h)$, i.e. the error of the linear approximation shrinks faster than $h$. This "best linear fit" view generalizes cleanly to many variables (the Jacobian) and to function spaces (the Fréchet derivative).

Differentiability implies continuity (but not conversely — $|x|$ is continuous yet has no derivative at $0$). The algebraic rules follow from the definition: linearity, the **product rule** $(fg)'=f'g+fg'$, and the **chain rule** $(f\\circ g)' = (f'\\circ g)\\,g'$. Iterating derivatives and matching them at a point yields the **Taylor expansion** $f(x+h)=\\sum_k \\frac{f^{(k)}(x)}{k!}h^k$, the workhorse of approximation. Setting $f'=0$ locates critical points; the sign of $f''$ classifies them.`,
      keyIdeas: [
        'Derivative = the unique linear map best approximating $f$ near $x$.',
        'Differentiable ⇒ continuous; the converse fails ($|x|$ at 0).',
        'Product and chain rules; critical points where $f\'=0$.',
      ],
      workedExample: {
        prompt: 'Differentiate $h(x) = \\sin(x^2)$ and find its critical points on $(0,\\sqrt{2\\pi})$.',
        solution: `Chain rule with outer $\\sin$, inner $x^2$:

$$h'(x) = \\cos(x^2)\\cdot 2x.$$

Critical points need $h'(x)=0$: either $x=0$ (endpoint) or $\\cos(x^2)=0$, i.e. $x^2 = \\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2},\\dots$ On $(0,\\sqrt{2\\pi})$ that gives $x = \\sqrt{\\pi/2}$ and $x=\\sqrt{3\\pi/2}$ — where the curve momentarily flattens.`,
      },
      glossedOver: 'We assumed the limit exists. Functions can be continuous everywhere yet differentiable nowhere (Weierstrass) — a Level 4/5 subtlety.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The derivative is a linear operator; this view unifies the gradient, Jacobian, exterior derivative, and the calculus of variations, and grounds automatic differentiation.',
      equationForms: [
        { latex: 'Df(x): \\mathbb{R}^n \\to \\mathbb{R}^m,\\quad f(x+h)=f(x)+Df(x)h + o(\\lVert h\\rVert)', caption: 'total (Fréchet) derivative' },
        { latex: '\\delta J[y] = \\int \\Big(\\frac{\\partial L}{\\partial y} - \\frac{d}{dx}\\frac{\\partial L}{\\partial y\'}\\Big)\\delta y\\,dx', caption: 'functional derivative' },
      ],
      body: `Abstractly the derivative is the **best linear operator** approximating a map. In $\\mathbb{R}^n\\to\\mathbb{R}^m$ it is the Jacobian matrix $Df(x)$; for scalar fields its transpose is the gradient $\\nabla f$. The operator viewpoint makes the chain rule a statement about composition of linear maps, $D(f\\circ g) = Df\\cdot Dg$ — which is exactly what **reverse-mode automatic differentiation** (backpropagation) exploits, accumulating products of Jacobians efficiently.

Pushing further, differentiating *functionals* (maps from functions to numbers) gives the **functional derivative** and the Euler–Lagrange equations, the basis of Lagrangian mechanics and optimal control. On manifolds the directional derivative becomes the differential/exterior derivative $d$, with $d^2=0$ encoding the structure of vector calculus (grad, curl, div as one operator). Smoothness is a strong assumption: there exist continuous, nowhere-differentiable functions (Weierstrass) and the typical continuous function is of this kind — differentiability is special, not generic.`,
      keyIdeas: [
        'Derivative = linear operator; chain rule = composition of operators.',
        'Reverse-mode autodiff = efficient products of Jacobians (backprop).',
        'Functional derivative → Euler–Lagrange; exterior derivative $d$ unifies vector calculus.',
      ],
      workedExample: {
        prompt: 'Why does reverse-mode autodiff compute a scalar loss’s gradient in roughly one extra pass, regardless of the number of parameters?',
        solution: `For a composition $L = f_k\\circ\\cdots\\circ f_1$, the chain rule gives $DL = Df_k\\cdots Df_1$. The gradient of a *scalar* $L$ is the row vector $DL$. Multiplying the chain **right-to-left** starts from a $1\\times m$ vector and only ever produces vector–Jacobian products, never full Jacobians:

$$\\nabla L = \\big(\\cdots\\big((1)\\,Df_k\\big)Df_{k-1}\\cdots\\big)Df_1.$$

Each factor costs about as much as one forward evaluation, so the whole gradient — for *all* parameters at once — costs $O(1)$ forward passes. Forward-mode, by contrast, would cost one pass per input. This asymmetry is why deep learning differentiates in reverse.`,
      },
      glossedOver: 'We assumed classical (strong) derivatives. Distributions/weak derivatives extend differentiation to non-smooth objects — Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Differentiation extends beyond smooth functions via distributions and Sobolev spaces, and fractures into inequivalent notions (subdifferentials, weak/Malliavin/synthetic derivatives) matched to their domains.',
      equationForms: [
        { latex: '\\langle T\', \\varphi\\rangle = -\\langle T, \\varphi\'\\rangle', caption: 'distributional derivative (integration by parts as definition)' },
        { latex: '\\partial f(x) = \\{\\,g : f(y)\\ge f(x)+\\langle g, y-x\\rangle\\ \\forall y\\,\\}', caption: 'convex subdifferential' },
      ],
      body: `The classical derivative is one member of a family. **Distributions** (Schwartz) define $T'$ by transferring the derivative onto a smooth test function, $\\langle T',\\varphi\\rangle = -\\langle T,\\varphi'\\rangle$; this makes the Dirac delta the derivative of the step function and gives PDEs their weak/variational formulation, with **Sobolev spaces** $W^{k,p}$ the natural setting and embedding theorems controlling regularity. For nonsmooth convex objects, the **subdifferential** $\\partial f$ replaces the gradient and powers modern optimization (proximal methods, KKT for nonsmooth constraints); Clarke generalized gradients handle the merely Lipschitz case.

Other categories demand their own derivatives: **Malliavin calculus** differentiates with respect to the paths of a stochastic process (underpinning the Greeks of Black–Scholes and hypoellipticity); **synthetic/automatic-differentiation** and the differential $\\lambda$-calculus give derivatives a computational/categorical semantics; and in algebraic geometry the **Kähler differentials** $\\Omega$ axiomatize the derivative purely algebraically. The unifying thread is Leibniz's rule $D(fg)=f\\,Dg + g\\,Df$ — a *derivation* is anything that obeys it, and each context realizes that abstract structure.`,
      keyIdeas: [
        'Distributional derivative = integration by parts taken as the definition; basis of weak PDE theory.',
        'Subdifferentials/Clarke gradients extend calculus to convex/Lipschitz nonsmooth functions.',
        'A "derivation" is any operator satisfying the Leibniz rule; many inequivalent derivatives realize it.',
      ],
      workedExample: {
        prompt: 'Show that the distributional derivative of the Heaviside step $H(x)$ is the Dirac delta $\\delta$.',
        solution: `By definition, for any test function $\\varphi$ with compact support,

$$\\langle H', \\varphi\\rangle = -\\langle H, \\varphi'\\rangle = -\\int_0^\\infty \\varphi'(x)\\,dx = -\\big[\\varphi(x)\\big]_0^\\infty = \\varphi(0).$$

But $\\varphi(0) = \\langle \\delta, \\varphi\\rangle$ by definition of the delta. Since this holds for all $\\varphi$, $H' = \\delta$ as distributions — a derivative that does not exist classically at $0$, yet is perfectly well-defined weakly.`,
      },
    },
  ],
  connections: [
    { toId: 'logistic-map', relationship: 'provides the stability test $|f\'|<1$ used by' },
    { toId: 'euler-lagrange', relationship: 'is promoted to a functional derivative in' },
    { toId: 'black-scholes', relationship: 'supplies the partial derivatives (the Greeks) appearing in' },
  ],
  viz: {
    component: 'SecantTangent',
    kind: 'interactive',
    defaultParams: { h: 1, x0: 1 },
    caption: 'Watch the secant line through two points pivot into the tangent as the gap h shrinks toward zero; the slope readout converges to the derivative.',
    whatToTry: [
      'Drag h toward 0 and watch the secant slope converge to f′(x).',
      'Move the base point to a peak — the tangent goes flat (slope 0).',
      'Compare the slope readout with the power rule prediction.',
    ],
  },
  primarySources: [
    {
      authors: 'G. W. Leibniz',
      title: 'Nova Methodus pro Maximis et Minimis',
      venue: 'Acta Eruditorum',
      year: 1684,
      note: 'first published differential calculus, introducing dx notation',
      primary: true,
    },
    {
      authors: 'A.-L. Cauchy',
      title: 'Cours d’Analyse',
      venue: 'École Polytechnique',
      year: 1821,
      note: 'limit-based foundation of the derivative',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'M. Spivak', title: 'Calculus', venue: 'Publish or Perish', year: 2008 },
    { authors: 'W. Rudin', title: 'Principles of Mathematical Analysis (Ch. 5)', venue: 'McGraw-Hill', year: 1976 },
  ],
  historyNote: `Newton (fluxions, ~1666) and Leibniz (differentials, published 1684) developed calculus independently, sparking one of the bitterest priority disputes in science — fanned by nationalism between the Royal Society and Continental mathematicians. Leibniz's notation $dy/dx$ won out for its suggestiveness and is what we still use; Newton's dotted fluxions survive mainly in mechanics.

For over a century the derivative rested on the logically dubious "infinitesimal" — a quantity both zero and not. Bishop Berkeley mocked them as "ghosts of departed quantities." Only with Cauchy's and Weierstrass's $\\varepsilon$–$\\delta$ limits did the derivative gain a rigorous footing — and, much later, Robinson's nonstandard analysis (1960s) rehabilitated infinitesimals as legitimate objects after all.`,
};

export default derivative;
