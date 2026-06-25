import type { Equation } from '../types';

const logarithms: Equation = {
  id: 'logarithms',
  name: 'Logarithms',
  nickname: 'the invention that gave astronomers a longer life',
  canonicalLatex: '\\log(xy) = \\log x + \\log y',
  canonicalAlt: 'log of x times y equals log of x plus log of y',
  alternativeForms: [
    { latex: 'b^{\\log_b x} = x', label: 'logarithm as inverse of exponentiation' },
    { latex: '\\log_b x = \\dfrac{\\ln x}{\\ln b}', label: 'change of base' },
    { latex: '\\dfrac{d}{dx}\\ln x = \\dfrac{1}{x}', label: 'the natural logarithm’s derivative' },
  ],
  fields: ['mathematics', 'analysis'],
  era: { display: '1614', sortKey: 1614 },
  discoverers: [
    { name: 'John Napier', note: 'Mirifici Logarithmorum Canonis Descriptio, 1614' },
    { name: 'Henry Briggs', note: 'base-10 (common) logarithms, 1617' },
    { name: 'Jost Bürgi', note: 'independent discovery, ~1600' },
  ],
  oneLine: 'A way to turn multiplication into addition — and to measure things that span enormous ranges.',
  significance:
    'Logarithms collapse multiplication into addition, which before electronic computers made long astronomical and navigational calculations feasible (and gave us the slide rule). Conceptually they are the inverse of exponential growth and the natural language of anything that grows by ratios: pitch, pH, magnitude, decibels, information. The natural logarithm and its derivative 1/x sit at the foundation of calculus and analysis.',
  applications: [
    'Decibels (sound), pH (acidity), the Richter and stellar-magnitude scales',
    'Log scales for data spanning many orders of magnitude',
    'Information content and entropy (bits = log₂ of possibilities)',
    'Algorithmic complexity (O(log n) search); log-likelihoods in statistics',
  ],
  symbols: [
    { symbol: 'x', name: 'argument', meaning: 'a positive number whose logarithm is taken', units: 'dimensionless' },
    { symbol: 'b', name: 'base', meaning: 'the number being raised to a power; common choices 10, e, 2', units: 'dimensionless' },
    { symbol: '\\log_b', name: 'logarithm base b', meaning: 'the exponent to which b must be raised to get the argument', units: 'dimensionless' },
    { symbol: '\\ln', name: 'natural logarithm', meaning: 'logarithm base e ≈ 2.71828', units: 'dimensionless' },
    { symbol: 'e', name: "Euler's number", meaning: 'base of natural growth, ≈ 2.71828', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary:
        'A logarithm answers "how many times do I multiply to get there?" — and it secretly turns hard multiplying into easy adding.',
      equationForms: [{ latex: '\\log(xy) = \\log x + \\log y', caption: 'multiply on one side, add on the other' }],
      body: `Suppose you keep multiplying by 10: $10, 100, 1000, 10000$. The logarithm just *counts the zeros*: it turns those numbers into $1, 2, 3, 4$. So a logarithm answers the question, "how many tens (or twos, or anything) multiplied together make this number?"

Here is the trick that changed history. Multiplying huge numbers by hand is slow and error-prone. But **adding** is easy. Logarithms let you swap one for the other: to multiply two big numbers, look up their logarithms, *add* them, and look the answer back up. For three centuries, every navigator, astronomer, and engineer carried tables of logarithms — and later a slide rule, a ruler that multiplies by sliding, because distances on it are spaced by logarithms.

Logarithms are also how we tame quantities that range from tiny to gigantic — earthquakes, loudness, acidity — by turning "a million times stronger" into "6 steps higher."`,
      keyIdeas: [
        'A logarithm counts how many times you multiply.',
        'It converts multiplication into addition — the original killer app.',
        'It compresses huge ranges into human-sized scales.',
      ],
      glossedOver: 'We only multiplied by 10. Logarithms work for *any* base and for in-between numbers too — made precise at Level 2.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        '$\\log_b x$ is the exponent that turns b into x. The product rule $\\log(xy)=\\log x+\\log y$ and its siblings follow directly from the laws of exponents.',
      equationForms: [
        { latex: '\\log_b x = y \\iff b^y = x' },
        { latex: '\\log(xy) = \\log x + \\log y,\\quad \\log\\!\\tfrac{x}{y} = \\log x - \\log y,\\quad \\log(x^p) = p\\log x' },
      ],
      body: `By definition, $\\log_b x$ is the **power** you raise $b$ to in order to get $x$: $\\log_b x = y$ means $b^y = x$. So $\\log_{10} 1000 = 3$ because $10^3 = 1000$, and $\\log_2 8 = 3$ because $2^3 = 8$.

The three rules all come from exponent laws. Since $b^{m}\\,b^{n} = b^{m+n}$, taking logs turns the product into a sum:

$$\\log(xy) = \\log x + \\log y.$$

Likewise division becomes subtraction and powers become multiplication: $\\log(x^p) = p\\log x$. The last one is why logs linearize exponential data — plotting $\\log y$ against $x$ turns $y = A\\,b^x$ into a straight line.`,
      keyIdeas: [
        'A logarithm *is* an exponent.',
        'Product → sum, quotient → difference, power → product.',
        'Only positive arguments have (real) logarithms.',
      ],
      workedExample: {
        prompt: 'Use log rules to evaluate $\\log_{10}(2) + \\log_{10}(50)$ without a calculator.',
        solution: `By the product rule, $\\log_{10}(2) + \\log_{10}(50) = \\log_{10}(2\\times 50) = \\log_{10}(100).$

Since $10^2 = 100$, this is $2$. (Notice we never needed the individual values $\\log_{10} 2 \\approx 0.301$ — the rule did the work, exactly as a 17th-century navigator would.)`,
      },
      misconceptions: [
        {
          claim: '$\\log(x+y) = \\log x + \\log y$.',
          correction:
            'No — that confuses sum with product. The true rule is $\\log(xy) = \\log x + \\log y$. There is no simple rule for the log of a sum.',
        },
      ],
      glossedOver: 'We treated the base as 10 or 2. One base — $e$ — is special for calculus; why is the Level 3 story.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Define $\\ln x = \\int_1^x dt/t$; the product rule becomes a change-of-variables identity, and $d(\\ln x)/dx = 1/x$ makes $e$ the natural base of growth.',
      equationForms: [
        { latex: '\\ln x = \\int_1^x \\frac{dt}{t}', caption: 'the natural log as an area' },
        { latex: '\\frac{d}{dx}\\ln x = \\frac{1}{x}, \\qquad \\frac{d}{dx}e^x = e^x' },
      ],
      body: `Define the natural logarithm by the integral $\\ln x = \\int_1^x \\frac{dt}{t}$ for $x>0$. The product rule is then a one-line substitution: $\\ln(xy) = \\int_1^{xy}\\frac{dt}{t} = \\int_1^x\\frac{dt}{t} + \\int_x^{xy}\\frac{dt}{t}$, and the second integral becomes $\\int_1^y \\frac{du}{u}$ under $t = xu$ — giving $\\ln x + \\ln y$.

Differentiating the definition gives $\\frac{d}{dx}\\ln x = \\frac{1}{x}$, the unique antiderivative that fills the gap left by the power rule (which can't produce $x^{-1}$). Its inverse, $e^x$, is the **unique function equal to its own derivative**, which is why $e$ is the base of every continuous growth or decay process: $\\frac{dN}{dt} = kN \\Rightarrow N(t) = N_0 e^{kt}$. Change of base, $\\log_b x = \\ln x/\\ln b$, shows all logarithms are the same function up to a constant factor.`,
      keyIdeas: [
        '$\\ln$ is the area under $1/t$; the product rule is additivity of that integral.',
        '$d(\\ln x)/dx = 1/x$ completes the antiderivative table.',
        '$e^x$ is its own derivative — the fixed point of differentiation.',
      ],
      workedExample: {
        prompt: 'A sample decays as $N(t) = N_0 e^{-\\lambda t}$. Find the half-life $t_{1/2}$.',
        solution: `Half-life means $N = N_0/2$:

$$\\tfrac12 = e^{-\\lambda t_{1/2}} \\;\\Rightarrow\\; \\ln\\tfrac12 = -\\lambda t_{1/2} \\;\\Rightarrow\\; t_{1/2} = \\frac{\\ln 2}{\\lambda}.$$

The logarithm is exactly the tool that inverts the exponential, turning a multiplicative decay into a clean linear relation between half-life and rate.`,
      },
      glossedOver: 'We stayed on the positive reals. Extending $\\log$ to negative and complex numbers introduces multivaluedness — the Level 5 picture.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The logarithm is the group isomorphism $(\\mathbb{R}_{>0},\\times)\\to(\\mathbb{R},+)$ — Napier’s insight, now a structural statement — and the generator of one-parameter scaling.',
      equationForms: [
        { latex: '\\log:(\\mathbb{R}_{>0},\\times)\\;\\xrightarrow{\\ \\sim\\ }\\;(\\mathbb{R},+)', caption: 'isomorphism of Lie groups' },
        { latex: '\\ln x = \\lim_{n\\to\\infty} n\\bigl(x^{1/n}-1\\bigr)', caption: 'log as the generator of scaling' },
      ],
      body: `The product rule says precisely that $\\log$ is a **homomorphism** from the multiplicative group of positive reals to the additive group of reals; continuity makes it an isomorphism of one-dimensional Lie groups, with $\\exp$ as inverse. Multiplication "is" addition, viewed through the right chart — Napier's table was the first explicit such isomorphism, computed before the concept existed.

This structural view explains its ubiquity. In statistics, the **log-likelihood** turns products of probabilities (independent data) into sums, making optimization and the central limit theorem tractable; maximizing likelihood is maximizing log-likelihood. In information theory, $\\log_2$ is forced by requiring information to be **additive** over independent events — the same homomorphism property (see Shannon entropy). In numerics, working in log-space prevents underflow when multiplying many small probabilities (the log-sum-exp trick). The matrix logarithm extends the idea to Lie groups: $\\log$ maps a neighborhood of the identity to the Lie algebra, linearizing the group near the identity.`,
      keyIdeas: [
        'Product rule ⇔ $\\log$ is a group homomorphism $\\times \\to +$.',
        'Additivity over independence is *why* logs appear in likelihood and entropy.',
        'Matrix/Lie logarithm linearizes a group near its identity.',
      ],
      workedExample: {
        prompt: 'Why does maximum-likelihood estimation maximize the *log*-likelihood instead of the likelihood?',
        solution: `For independent data, the likelihood is a product $L(\\theta)=\\prod_i p(x_i\\mid\\theta)$. Taking $\\log$,

$$\\ell(\\theta) = \\sum_i \\ln p(x_i\\mid\\theta).$$

Because $\\log$ is strictly increasing, $\\arg\\max_\\theta L = \\arg\\max_\\theta \\ell$ — the maximizer is unchanged. But the sum is numerically stable and its derivative (the score) is a sum of simple terms, so the homomorphism turns an awkward product into a tractable sum. This is the product rule doing statistical work.`,
      },
      glossedOver: 'We treated $\\log$ as single-valued. Over $\\mathbb{C}$ it is genuinely multivalued — the Level 5 issue.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'On $\\mathbb{C}^\\times$ the logarithm is multivalued with monodromy $2\\pi i$; it is the prototype of a covering map, of periods, and of the regulators relating special values of L-functions to arithmetic.',
      equationForms: [
        { latex: '\\log z = \\ln|z| + i(\\arg z + 2\\pi k),\\quad k\\in\\mathbb{Z}', caption: 'multivalued complex log' },
        { latex: '\\oint_{|z|=1}\\frac{dz}{z} = 2\\pi i', caption: 'the monodromy / period' },
      ],
      body: `Over the punctured plane $\\mathbb{C}^\\times$, $\\log z = \\ln|z| + i\\arg z$ is only defined up to $2\\pi i$: analytically continuing once around the origin shifts the value by $\\oint dz/z = 2\\pi i$. The logarithm is thus the universal example of **monodromy** and the simplest nontrivial period; $\\exp:\\mathbb{C}\\to\\mathbb{C}^\\times$ is the universal covering map, with deck group $2\\pi i\\,\\mathbb{Z}$. This single fact organizes Euler's identity (which is $\\log(-1)=i\\pi$ read backwards), the residue calculus, and the branch structure of $z^s$.

The theme deepens in arithmetic. The **dilogarithm** and higher polylogarithms $\\mathrm{Li}_n(z) = \\sum z^k/k^n$ generalize $-\\log(1-z)=\\mathrm{Li}_1$, and their special values (e.g. $\\zeta(n)$) carry regulator and monodromy data linking analysis to algebraic $K$-theory and to special values of $L$-functions (Beilinson, Zagier). The $p$-adic logarithm and Coleman integration transport the same story to $p$-adic Hodge theory. What began as a labour-saving table for navigators is, structurally, one of the most generative objects in mathematics.`,
      keyIdeas: [
        'Complex $\\log$ is multivalued; its monodromy $2\\pi i$ is the prototypical period.',
        '$\\exp:\\mathbb{C}\\to\\mathbb{C}^\\times$ is the universal cover; Euler’s identity is a value of $\\log$.',
        'Polylogarithms and regulators tie the logarithm to $K$-theory and $L$-functions.',
      ],
      workedExample: {
        prompt: 'Compute all values of $\\log(-1)$ and connect to Euler’s identity.',
        solution: `Write $-1 = e^{i\\pi}$, and more generally $-1 = e^{i(\\pi + 2\\pi k)}$. Hence

$$\\log(-1) = i(\\pi + 2\\pi k), \\quad k\\in\\mathbb{Z},$$

with principal value $i\\pi$. Read backwards, the principal value $\\log(-1)=i\\pi$ is exactly $e^{i\\pi} = -1$ — Euler's identity. The other branches encode the $2\\pi i$ monodromy of winding around the origin.`,
      },
    },
  ],
  connections: [
    { toId: 'euler-identity', relationship: 'has the complex logarithm whose principal value is' },
    { toId: 'shannon-entropy', relationship: 'supplies the additive-over-independence log used in' },
    { toId: 'derivative', relationship: 'introduces 1/x as the antiderivative completing' },
  ],
  viz: {
    component: 'LogExp',
    kind: 'interactive',
    defaultParams: { base: 10 },
    caption: 'A log/exp curve pair with an interactive slide-rule: line up two numbers and read off their product as a sum of log-distances.',
    whatToTry: [
      'Slide to multiply 2 × 3 and watch it become an addition of lengths.',
      'Change the base and see how the same curve rescales.',
      'Compare log-scale vs linear-scale plots of an exponential — one is a line.',
    ],
  },
  primarySources: [
    {
      authors: 'J. Napier',
      title: 'Mirifici Logarithmorum Canonis Descriptio',
      venue: 'Edinburgh',
      year: 1614,
      note: 'the work that introduced logarithms',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'E. Maor', title: 'e: The Story of a Number', venue: 'Princeton University Press', year: 1994 },
    { authors: 'W. Rudin', title: 'Principles of Mathematical Analysis (Ch. 8)', venue: 'McGraw-Hill', year: 1976 },
  ],
  historyNote: `John Napier spent two decades hand-computing his 1614 tables, motivated explicitly by the drudgery and error of multiplying the long numbers of astronomy and navigation. Henry Briggs traveled to Scotland to meet him and together they recast the tables to base 10, far more convenient for decimal arithmetic. Pierre-Simon Laplace later said logarithms, "by shortening the labours, doubled the life of the astronomer."

The slide rule, built on logarithmic spacing, was the engineer's constant companion until pocket calculators arrived in the 1970s — Apollo-era engineers carried them to the Moon program. The number $e$ and the *natural* logarithm emerged only later, from the study of compound interest (Bernoulli) and the area under the hyperbola.`,
};

export default logarithms;
