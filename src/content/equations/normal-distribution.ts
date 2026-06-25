import type { Equation } from '../types';

const normalDistribution: Equation = {
  id: 'normal-distribution',
  name: 'The Normal Distribution',
  nickname: 'the bell curve',
  canonicalLatex: 'f(x)=\\dfrac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
  canonicalAlt:
    'f of x equals one over the square root of two pi sigma squared, times e to the minus, x minus mu squared over two sigma squared',
  alternativeForms: [
    { latex: '\\phi(z) = \\dfrac{1}{\\sqrt{2\\pi}}e^{-z^2/2},\\quad z = \\dfrac{x-\\mu}{\\sigma}', label: 'standard normal (z-score)' },
    { latex: 'X \\sim \\mathcal{N}(\\mu, \\sigma^2)', label: 'shorthand notation' },
  ],
  fields: ['statistics', 'probability'],
  era: { display: '1809', sortKey: 1809 },
  discoverers: [
    { name: 'Carl Friedrich Gauss', note: 'in the theory of least-squares errors, 1809' },
    { name: 'Abraham de Moivre', note: 'as the limit of the binomial, 1733' },
    { name: 'Pierre-Simon Laplace', note: 'the central limit theorem' },
  ],
  oneLine: 'The bell-shaped curve that emerges whenever many small, independent effects add up.',
  significance:
    'The normal distribution is the default model of variation and error because of the central limit theorem: sums of many independent influences converge to it regardless of their individual shapes. This universality makes it the foundation of statistical inference, measurement error, quality control, and the entire machinery of confidence intervals and hypothesis tests. It is also the unique maximum-entropy distribution for a given mean and variance, and the stationary state of diffusion.',
  applications: [
    'Statistical inference: confidence intervals, t- and z-tests, regression',
    'Measurement error and instrument calibration; Six Sigma quality control',
    'Modeling heights, blood pressure, test scores, and noise',
    'Finance (with caveats), signal processing, and machine learning priors',
  ],
  symbols: [
    { symbol: 'x', name: 'variable', meaning: 'the value of the random quantity', units: 'any' },
    { symbol: '\\mu', name: 'mean', meaning: 'center of the distribution (where the peak sits)', units: 'same as x' },
    { symbol: '\\sigma', name: 'standard deviation', meaning: 'spread/width of the bell', units: 'same as x' },
    { symbol: '\\sigma^2', name: 'variance', meaning: 'square of the standard deviation', units: '(units of x)²' },
    { symbol: 'z', name: 'z-score', meaning: 'number of standard deviations from the mean', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Measure almost anything across many people or trials and you get the same humped shape: most values near the middle, fewer at the extremes.',
      equationForms: [{ latex: 'f(x)=\\dfrac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}', caption: 'the bell curve (its exact formula)' }],
      body: `Measure the heights of a thousand people and plot how many fall in each range. You won't get a flat line or a random mess — you'll get a **bell**: a big hump in the middle (most people are near average height) tapering off symmetrically to a few very short and a few very tall. The same bell appears for blood pressure, test scores, the error in repeated measurements, even the total of many dice.

Why does this one shape keep showing up everywhere? Because whenever an outcome is the sum of **many small, independent pushes** — genes, diet, luck, and so on, each nudging height up or down a little — those pushes average out into a bell. This is one of the most remarkable facts in all of mathematics: chaos in the details produces order in the aggregate.

The bell has just two dials: where its center sits (**the average**) and how wide it spreads (**the spread**). Those two numbers tell you almost everything.`,
      keyIdeas: [
        'Most values cluster near the average; extremes are rare and symmetric.',
        'It appears when many small independent effects add up.',
        'Two numbers — center and spread — describe the whole curve.',
      ],
      glossedOver: 'We say it "always" appears. It needs the effects to be many, independent, and not too heavy-tailed — Level 4.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The curve is set by its mean $\\mu$ (center) and standard deviation $\\sigma$ (spread). The 68–95–99.7 rule says how much data falls within 1, 2, 3 σ of the mean.',
      equationForms: [
        { latex: 'f(x)=\\dfrac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}' },
        { latex: 'z = \\dfrac{x-\\mu}{\\sigma}', caption: 'standardize to compare any normal' },
      ],
      body: `The mean $\\mu$ locates the peak; the standard deviation $\\sigma$ controls the width. Change $\\mu$ and the bell slides; change $\\sigma$ and it gets fatter or thinner (but the area underneath always stays 1 — it's a probability). The exponent $-(x-\\mu)^2/2\\sigma^2$ is what makes it fall off fast as you move away from the center.

The famous **68–95–99.7 rule**: about 68% of the data lies within $1\\sigma$ of the mean, 95% within $2\\sigma$, and 99.7% within $3\\sigma$. To compare different bells, convert any value to a **z-score** $z = (x-\\mu)/\\sigma$ — how many standard deviations it is from the mean — which puts everything on the same standard curve. The interactive lets you slide $\\mu$ and $\\sigma$ and shade the area between two points.`,
      keyIdeas: [
        '$\\mu$ sets the center, $\\sigma$ sets the width; total area = 1.',
        '68–95–99.7 rule for 1, 2, 3 standard deviations.',
        'z-score puts any value on the standard normal scale.',
      ],
      workedExample: {
        prompt: 'Adult IQ scores are normal with $\\mu = 100$, $\\sigma = 15$. What fraction of people score above 130?',
        solution: `Find the z-score of 130:

$$z = \\frac{130 - 100}{15} = \\frac{30}{15} = 2.$$

So 130 is exactly $2\\sigma$ above the mean. By the 68–95–99.7 rule, 95% lie within $\\pm2\\sigma$, leaving 5% in the two tails combined — and by symmetry half of that is in the upper tail:

$$\\text{above 130} \\approx \\frac{5\\%}{2} = 2.5\\%.$$

About 1 in 40 people. (The precise value is 2.28%.)`,
      },
      misconceptions: [
        {
          claim: 'Everything is normally distributed.',
          correction:
            'Far from it. Incomes, city sizes, and financial returns are skewed or heavy-tailed; using a normal model for them badly underestimates extreme events. The normal is common, not universal.',
        },
      ],
      glossedOver: 'We asserted the 68–95–99.7 percentages. They come from integrating the curve — and *why* the curve is universal is the central limit theorem at Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The central limit theorem explains its universality: standardized sums of i.i.d. finite-variance variables converge to $\\mathcal{N}(0,1)$, whatever the original distribution.',
      equationForms: [
        { latex: '\\frac{\\bar X_n - \\mu}{\\sigma/\\sqrt{n}} \\;\\xrightarrow{d}\\; \\mathcal{N}(0,1)', caption: 'central limit theorem' },
        { latex: '\\mathbb{E}[e^{itX}] = e^{i\\mu t - \\sigma^2 t^2/2}', caption: 'characteristic function' },
      ],
      body: `The **central limit theorem (CLT)** is why the bell is everywhere: if $X_1,\\dots,X_n$ are independent and identically distributed with finite mean $\\mu$ and variance $\\sigma^2$, then their standardized sum converges in distribution to the standard normal — *regardless of the shape* of the original distribution. Each individual effect's idiosyncrasies wash out; only the mean and variance survive. The error of an average shrinks like $\\sigma/\\sqrt n$, the root of all "$\\sqrt n$" results in statistics.

A clean proof uses the **characteristic function** (Fourier transform of the density): the normal's is $e^{i\\mu t - \\sigma^2 t^2/2}$, products of characteristic functions correspond to sums of variables, and a Taylor expansion shows the standardized sum's characteristic function converges to $e^{-t^2/2}$. The normal is also special for being **stable** (sums of normals are normal), the **maximum-entropy** distribution for fixed mean and variance, and its own Fourier transform up to scaling — which is why it is the fixed point of so many processes (diffusion, the heat kernel).`,
      keyIdeas: [
        'CLT: standardized sums → normal, independent of the original shape.',
        'Errors of averages shrink as $\\sigma/\\sqrt n$.',
        'Normal is stable, max-entropy (fixed μ, σ²), and (nearly) its own Fourier transform.',
      ],
      workedExample: {
        prompt: 'Roll one die: the distribution is flat (uniform 1–6). Why does the *average* of many dice look normal?',
        solution: `A single die is uniform — nothing like a bell. But the CLT applies to the **average** $\\bar X_n$ of $n$ rolls. With single-die mean $\\mu = 3.5$ and variance $\\sigma^2 = 35/12 \\approx 2.92$,

$$\\bar X_n \\approx \\mathcal{N}\\!\\left(3.5,\\ \\frac{2.92}{n}\\right).$$

By $n = 30$ rolls the histogram of averages is already visibly bell-shaped and tightly centered on 3.5, with spread $\\sigma/\\sqrt{30}\\approx 0.31$. The flatness of the single die is irrelevant — summing independent copies manufactures the bell. (The CLT mini-demo in the visualization shows exactly this.)`,
      },
      glossedOver: 'The CLT needs finite variance. When that fails (heavy tails), sums converge to other (stable/Lévy) laws — Level 4/5.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The CLT is one of a family: finite variance gives the Gaussian fixed point, but heavy tails give α-stable Lévy laws; multivariate normals, and the dangers of assuming normality, define practice.',
      equationForms: [
        { latex: 'f(\\mathbf{x}) = \\frac{1}{\\sqrt{(2\\pi)^k|\\Sigma|}}\\exp\\!\\Big(-\\tfrac12(\\mathbf{x}-\\boldsymbol\\mu)^\\top\\Sigma^{-1}(\\mathbf{x}-\\boldsymbol\\mu)\\Big)', caption: 'multivariate normal' },
        { latex: 'P(|X|>x) \\sim x^{-\\alpha},\\ 0<\\alpha<2 \\Rightarrow \\text{Lévy-stable limit}', caption: 'heavy tails break the Gaussian CLT' },
      ],
      body: `The Gaussian is the **fixed point of summation under finite variance**, but it is one of a one-parameter family. The **generalized CLT** says sums of i.i.d. variables converge to an **α-stable** law: $\\alpha = 2$ is the Gaussian, while heavy tails ($P(|X|>x)\\sim x^{-\\alpha}$, $\\alpha < 2$) have *infinite* variance and converge instead to Lévy-stable distributions with power-law tails. Assuming normality where tails are heavy is the classic, expensive error — it grossly underestimates extreme events (market crashes, floods); Mandelbrot and later Taleb built careers on this point.

The **multivariate normal** $\\mathcal{N}(\\boldsymbol\\mu,\\Sigma)$ is determined entirely by its mean vector and covariance matrix $\\Sigma$; its level sets are ellipsoids, marginals and conditionals are again normal (the engine of Kalman filtering, Gaussian processes, and PCA), and zero correlation implies independence (uniquely among joint normals). Practically, one tests normality (Q–Q plots, Shapiro–Wilk), and many methods are *robust* to mild non-normality via the CLT but not to outliers — motivating robust statistics. The normal also underlies the Laplace approximation, the asymptotic normality of maximum-likelihood estimators (via Fisher information), and the reparameterization trick in modern ML.`,
      keyIdeas: [
        'Generalized CLT: finite variance → Gaussian; heavy tails → α-stable (Lévy) laws.',
        'Multivariate normal is fixed by $\\boldsymbol\\mu$ and $\\Sigma$; basis of Kalman/PCA/GPs.',
        'Assuming normality with heavy tails dangerously underestimates extremes.',
      ],
      workedExample: {
        prompt: 'A risk model assumes daily returns are normal with $\\sigma = 1\\%$. How "impossible" does it rate a $-5\\%$ day, and why is that a problem?',
        solution: `A $-5\\%$ move is $z = -5$ standard deviations. The normal tail probability beyond $5\\sigma$ is about $3\\times10^{-7}$ per day — i.e. roughly **once per 14,000 years** of trading.

Yet markets see $\\pm5\\%$ days every few years. The discrepancy isn't bad luck; it's the wrong model: real returns have **heavy (power-law) tails**, so the variance-based normal assigns absurdly tiny probabilities to large moves. This is precisely why Gaussian value-at-risk models failed in 1987 and 2008. The fix is heavy-tailed/α-stable or Student-t models — a direct consequence of the generalized CLT.`,
      },
      glossedOver: 'We treated the CLT classically. Its information-geometric meaning and entropy-monotonicity proof are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The Gaussian is a universal attractor seen through many lenses: maximum entropy, the monotone-entropy CLT, free-probability’s semicircle analogue, and the building block of Gaussian processes and SPDEs.',
      equationForms: [
        { latex: 'H(X) \\le \\tfrac12\\ln(2\\pi e\\,\\sigma^2),\\ \\text{equality iff Gaussian}', caption: 'maximum-entropy characterization' },
        { latex: 'H(\\textstyle\\sum_{i=1}^n X_i/\\sqrt n)\\ \\text{is monotone increasing in } n', caption: 'entropic CLT (Artstein–Ball–Barthe–Naor)' },
      ],
      body: `Several deep results explain *why* the Gaussian is the universal limit. Information-theoretically it is the **maximum-entropy** distribution at fixed variance, and the CLT can be cast as **entropy monotonically increasing** to that maximum (Artstein–Ball–Barthe–Naor 2004) — the central limit theorem as a second law. Stein's method gives sharp, quantitative CLT bounds (Berry–Esseen rates) and extends to dependent and high-dimensional settings, which is where modern probability lives.

The Gaussian's role recurs across mathematics. In **free probability** (Voiculescu), the analogue of the CLT for non-commuting random variables replaces the bell with Wigner's **semicircle law** — the limiting eigenvalue distribution of large random matrices, central to RMT, quantum chaos, and even aspects of number theory. As a process, the Gaussian generates **Brownian motion** and the Gaussian free field, the canonical objects of stochastic analysis, SLE, and stochastic PDE; **Gaussian processes** are the nonparametric Bayesian workhorse. High-dimensional Gaussians concentrate on a thin shell (the Gaussian annulus), the geometric fact behind concentration of measure and the behaviour of high-dimensional ML models. The humble bell curve is, structurally, the linchpin of probability, analysis, and mathematical physics.`,
      keyIdeas: [
        'Gaussian = maximum entropy at fixed variance; CLT as monotone entropy increase.',
        'Free-probability analogue is the semicircle law (random-matrix theory).',
        'Generates Brownian motion / Gaussian free field; concentrates on a thin shell in high dimensions.',
      ],
      workedExample: {
        prompt: 'Show that among all distributions with variance $\\sigma^2$, the Gaussian maximizes (differential) entropy.',
        solution: `Maximize $H = -\\int f\\ln f$ subject to $\\int f = 1$ and $\\int x^2 f = \\sigma^2$ (take mean 0). Introduce Lagrange multipliers $\\lambda_0,\\lambda_2$ and set the variation to zero:

$$-\\ln f - 1 + \\lambda_0 + \\lambda_2 x^2 = 0 \\;\\Rightarrow\\; f(x) = e^{\\lambda_0 - 1 + \\lambda_2 x^2}.$$

This is a Gaussian; fixing the constraints gives $f = \\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-x^2/2\\sigma^2}$, with entropy $H = \\tfrac12\\ln(2\\pi e\\sigma^2)$. So given only the variance, the Gaussian assumes the *least* beyond it — the maximum-entropy (least-committal) choice. This is the principled justification for defaulting to a normal when only the first two moments are known.`,
      },
    },
  ],
  connections: [
    { toId: 'heat-equation', relationship: 'has as its density the Gaussian kernel of' },
    { toId: 'bayes', relationship: 'serves as the conjugate likelihood/prior workhorse in' },
    { toId: 'shannon-entropy', relationship: 'is the maximum-entropy distribution measured by' },
    { toId: 'black-scholes', relationship: 'supplies the log-normal price model assumed by' },
  ],
  viz: {
    component: 'NormalDistribution',
    kind: 'interactive',
    defaultParams: { mu: 0, sigma: 1 },
    caption: 'Slide μ and σ to reshape the bell and shade the probability between two draggable bounds; a CLT mini-demo sums dice into a bell.',
    whatToTry: [
      'Shade ±1σ, ±2σ, ±3σ to see the 68–95–99.7 rule.',
      'Increase σ and watch the bell flatten and widen (area stays 1).',
      'Run the CLT demo: average more dice and watch a bell emerge from a flat distribution.',
    ],
  },
  primarySources: [
    {
      authors: 'C. F. Gauss',
      title: 'Theoria motus corporum coelestium',
      venue: 'Hamburg',
      year: 1809,
      note: 'derives the normal law of errors and least squares',
      primary: true,
    },
    {
      authors: 'P.-S. Laplace',
      title: 'Théorie analytique des probabilités',
      venue: 'Paris',
      year: 1812,
      note: 'central limit theorem',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'S. Stigler', title: 'The History of Statistics', venue: 'Harvard University Press', year: 1986 },
    { authors: 'N. N. Taleb', title: 'The Black Swan', venue: 'Random House', year: 2007, note: 'on the dangers of assuming normality' },
  ],
  historyNote: `De Moivre found the bell curve in 1733 as an approximation to coin-flip (binomial) probabilities, but it was Gauss who in 1809 derived it as the law of measurement errors that makes the arithmetic mean the best estimate — cementing the link to least squares. Laplace then proved the central limit theorem, revealing *why* it is universal.

The name "normal" (suggesting other distributions are abnormal) was popularized later by Galton, Pearson, and others. Poincaré quipped that "everyone believes in the normal law, the experimenters because they think it is a mathematical theorem, the mathematicians because they think it is an experimental fact" — a warning that has aged well, given how often heavy-tailed reality defies the bell.`,
};

export default normalDistribution;
