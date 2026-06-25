import type { Equation } from '../types';

const bayes: Equation = {
  id: 'bayes',
  name: "Bayes' Theorem",
  nickname: 'the mathematics of updating your mind',
  canonicalLatex: 'P(A\\mid B)=\\dfrac{P(B\\mid A)\\,P(A)}{P(B)}',
  canonicalAlt:
    'P of A given B equals P of B given A times P of A, divided by P of B',
  alternativeForms: [
    { latex: 'P(\\theta\\mid D) = \\dfrac{P(D\\mid\\theta)\\,P(\\theta)}{P(D)}', label: 'posterior ∝ likelihood × prior' },
    { latex: '\\text{posterior odds} = \\text{likelihood ratio}\\times\\text{prior odds}', label: 'odds form' },
  ],
  fields: ['statistics', 'probability'],
  era: { display: '1763', sortKey: 1763 },
  discoverers: [
    { name: 'Thomas Bayes', note: 'essay published posthumously, 1763' },
    { name: 'Pierre-Simon Laplace', note: 'independent, general formulation and applications' },
  ],
  oneLine: 'The exact rule for revising your belief in something once you see new evidence.',
  significance:
    'Bayes’ theorem is the logic of evidence: it tells you precisely how to update the probability of a hypothesis given new data, weighting the data’s likelihood against your prior belief and the base rate. It underpins modern statistics, machine learning, medical diagnosis, spam filtering, and scientific inference, and it crisply explains the base-rate fallacy — why even a very accurate test can mostly raise false alarms for a rare condition.',
  applications: [
    'Medical diagnosis and screening (interpreting test results)',
    'Spam filtering, search ranking, and recommendation systems',
    'Bayesian inference and machine learning (priors, posteriors)',
    'Forensics, signal detection, and decision-making under uncertainty',
  ],
  symbols: [
    { symbol: 'P(A)', name: 'prior', meaning: 'probability of A before seeing the evidence', units: 'dimensionless (0–1)' },
    { symbol: 'P(A\\mid B)', name: 'posterior', meaning: 'updated probability of A after observing B', units: 'dimensionless (0–1)' },
    { symbol: 'P(B\\mid A)', name: 'likelihood', meaning: 'probability of the evidence B if A were true', units: 'dimensionless (0–1)' },
    { symbol: 'P(B)', name: 'evidence / marginal', meaning: 'total probability of observing B (normalizer)', units: 'dimensionless (0–1)' },
    { symbol: '\\theta', name: 'parameter/hypothesis', meaning: 'the unknown being inferred (inference form)', units: 'varies' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'New evidence shouldn’t replace what you knew before — it should *update* it. Bayes’ rule is the exact recipe for that update.',
      equationForms: [{ latex: '\\text{new belief} \\propto \\text{evidence} \\times \\text{old belief}', caption: 'how to revise a belief with data' }],
      body: `Suppose you hear a rustle in the bushes. Is it a tiger? Your answer depends on two things: how tiger-like the rustle sounds (the **evidence**), and how likely a tiger was to begin with (are you in a zoo or a jungle?). A city park and a wildlife reserve should lead to very different conclusions from the *same* rustle. Bayes' theorem makes this common-sense weighing exact.

The crucial, often-missed ingredient is that starting point — the **base rate**. Here's the classic shock: imagine a disease that affects 1 in 1,000 people, and a test that is 99% accurate. You test positive. Your chance of actually being sick is *not* 99% — it's only about **9%**. Why? Because the disease is so rare that the test's small error rate, applied to the huge healthy majority, produces far more false alarms than true positives.

Bayes' theorem is the antidote to this very human mistake. It forces you to combine the evidence with how common the thing was in the first place.`,
      keyIdeas: [
        'Update beliefs with evidence; don’t discard the starting point.',
        'The base rate (how common something is) matters enormously.',
        'A "99% accurate" test for a rare condition can be mostly false alarms.',
      ],
      glossedOver: 'We gave the 9% answer without the arithmetic. The exact calculation is the Level 2 worked example.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The posterior $P(A\\mid B)$ combines the likelihood $P(B\\mid A)$, the prior $P(A)$, and the total evidence $P(B)$. "Natural frequencies" make it intuitive.',
      equationForms: [
        { latex: 'P(A\\mid B)=\\dfrac{P(B\\mid A)\\,P(A)}{P(B)}' },
        { latex: 'P(B) = P(B\\mid A)P(A) + P(B\\mid \\lnot A)P(\\lnot A)', caption: 'total probability of the evidence' },
      ],
      body: `Read the formula as a fraction: of all the ways the evidence $B$ can happen ($P(B)$, the denominator), what fraction happen *with* $A$ also true ($P(B\\mid A)P(A)$, the numerator)? That ratio is the updated probability $P(A\\mid B)$.

The denominator is the part people forget. The evidence can occur whether or not $A$ is true, so $P(B) = P(B\\mid A)P(A) + P(B\\mid \\lnot A)P(\\lnot A)$ — true positives **plus** false positives. The single best trick for getting these problems right is to switch from percentages to **natural frequencies**: imagine a concrete population of, say, 100,000 people, and just count. The visualization shows exactly this as a grid of people. Drag the prevalence to near zero and watch a great test cry wolf.`,
      keyIdeas: [
        'Posterior = (likelihood × prior) ÷ total evidence.',
        'The evidence includes false positives, not just true ones.',
        'Count natural frequencies in a real population to avoid errors.',
      ],
      workedExample: {
        prompt: 'A disease has prevalence 0.1% (1 in 1,000). A test is 99% sensitive and 99% specific. You test positive — what’s the chance you’re sick?',
        solution: `Use a population of 100,000. Prevalence 0.1% means **100** are sick, **99,900** are healthy.

True positives: $99\\%$ of 100 sick $= 99$.

False positives: $1\\%$ of 99,900 healthy $= 999$.

Total positives $= 99 + 999 = 1098$. The fraction that are truly sick:

$$P(\\text{sick}\\mid +) = \\frac{99}{1098} \\approx 0.090 = 9.0\\%.$$

Despite a "99% accurate" test, a positive result means only a ~9% chance of disease — because false positives from the vast healthy majority swamp the rare true positives. This is the base-rate fallacy, quantified.`,
      },
      misconceptions: [
        {
          claim: 'A 99%-accurate positive test means 99% chance of having the disease.',
          correction:
            'It confuses $P(+\\mid\\text{sick})$ with $P(\\text{sick}\\mid +)$. For a rare disease these differ enormously — the answer can be under 10%, as the worked example shows. This "prosecutor’s fallacy" sends innocent people to prison too.',
        },
      ],
      glossedOver: 'We used one piece of evidence. Updating repeatedly, and over continuous parameters, is Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'In inference, posterior ∝ likelihood × prior; updates compose (today’s posterior is tomorrow’s prior), and conjugate priors make the algebra closed.',
      equationForms: [
        { latex: 'p(\\theta\\mid D) = \\dfrac{p(D\\mid\\theta)\\,p(\\theta)}{\\int p(D\\mid\\theta\')p(\\theta\')\\,d\\theta\'}' },
        { latex: '\\text{Beta}(\\alpha,\\beta)\\xrightarrow{\\ s\\text{ successes},\\ f\\text{ fails}\\ }\\text{Beta}(\\alpha+s,\\beta+f)', caption: 'conjugate update' },
      ],
      body: `For continuous parameters, Bayes' theorem becomes the engine of **statistical inference**: the **posterior** density $p(\\theta\\mid D)$ is proportional to the **likelihood** $p(D\\mid\\theta)$ times the **prior** $p(\\theta)$, normalized by the evidence (an integral). The data enters *only* through the likelihood (the likelihood principle).

Two structural facts make it powerful. First, **sequential updating**: process data in any order or in batches and the posterior is the same — today's posterior becomes tomorrow's prior. Second, **conjugate priors** keep the posterior in the same family as the prior, giving closed-form updates: a Beta prior on a coin's bias updates to a Beta by just adding the counts of heads and tails; a Gaussian prior with Gaussian likelihood stays Gaussian. With enough data the likelihood dominates and the prior washes out (the Bernstein–von Mises theorem), reconciling Bayesian and frequentist answers asymptotically. Choosing priors (informative, weakly-informative, or "objective"/Jeffreys) is the craft.`,
      keyIdeas: [
        'Posterior ∝ likelihood × prior; data enters only via the likelihood.',
        'Updates compose: posterior becomes the next prior.',
        'Conjugate priors give closed-form updates; data eventually swamps the prior.',
      ],
      workedExample: {
        prompt: 'You flip a coin of unknown bias 10 times and see 7 heads. Starting from a uniform prior, what’s your updated belief about the bias?',
        solution: `A uniform prior on the bias $\\theta\\in[0,1]$ is $\\text{Beta}(1,1)$. The binomial likelihood for 7 heads, 3 tails is conjugate to the Beta, so the posterior just adds the counts:

$$p(\\theta\\mid D) = \\text{Beta}(1+7,\\ 1+3) = \\text{Beta}(8,4).$$

Its mean is $\\dfrac{8}{8+4} = \\dfrac{2}{3} \\approx 0.67$ — pulled from the naive estimate $0.7$ *toward* the prior mean $0.5$ by the (weak) prior. The full posterior also quantifies uncertainty: a 95% credible interval here is roughly $[0.39, 0.89]$, honestly wide for only 10 flips.`,
      },
      glossedOver: 'Real models rarely have conjugate priors; the normalizing integral is usually intractable, requiring the computation of Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The intractable evidence integral is handled by MCMC and variational inference; the marginal likelihood drives Bayesian model selection and the Occam factor.',
      equationForms: [
        { latex: 'p(D) = \\int p(D\\mid\\theta)p(\\theta)\\,d\\theta', caption: 'evidence / marginal likelihood — the hard integral' },
        { latex: '\\log p(D) \\ge \\mathbb{E}_q[\\log p(D,\\theta)] - \\mathbb{E}_q[\\log q(\\theta)] \\equiv \\text{ELBO}', caption: 'variational lower bound' },
      ],
      body: `The obstacle in real models is the **evidence** $p(D) = \\int p(D\\mid\\theta)p(\\theta)\\,d\\theta$ — a high-dimensional integral that is almost never closed-form. Two families of methods dominate. **Markov chain Monte Carlo** (Metropolis–Hastings, Gibbs, and especially Hamiltonian Monte Carlo / NUTS) draws samples from the posterior without computing $p(D)$, trading analytic intractability for computation; convergence diagnostics ($\\hat R$, effective sample size) are essential. **Variational inference** instead fits a tractable family $q(\\theta)$ by maximizing the **evidence lower bound (ELBO)**, turning integration into optimization — faster and scalable (it powers variational autoencoders and large-scale Bayesian deep learning) but only approximate.

The evidence is not just a nuisance normalizer: as the **marginal likelihood** it scores whole models, and **Bayesian model selection** via Bayes factors $p(D\\mid M_1)/p(D\\mid M_2)$ embodies an automatic **Occam's razor** — overly complex models spread their prior mass thin and are penalized. Hierarchical/multilevel models, empirical Bayes, and prior sensitivity analysis are the practitioner's toolkit. The framework also clarifies regularization: an L2 penalty is a Gaussian prior, L1 a Laplace prior — MAP estimation is Bayes with a point summary.`,
      keyIdeas: [
        'Evidence integral is intractable ⇒ MCMC (sampling) or variational inference (optimization).',
        'Marginal likelihood enables model selection with a built-in Occam penalty.',
        'Regularization = priors (L2 ↔ Gaussian, L1 ↔ Laplace); MAP ≈ Bayes point estimate.',
      ],
      workedExample: {
        prompt: 'Explain how the marginal likelihood automatically penalizes an over-flexible model (the "Bayesian Occam’s razor").',
        solution: `The evidence $p(D\\mid M) = \\int p(D\\mid\\theta,M)p(\\theta\\mid M)\\,d\\theta$ is a *normalized* average of the likelihood over the prior. A complex model with many parameters can fit many possible datasets, so its prior probability mass is spread thinly across a huge data-space.

For the particular dataset observed, that thin spreading means $p(D\\mid M_{\\text{complex}})$ is modest — the model "wastes" probability on datasets it could have produced but didn't. A simpler model that concentrates its predictions, *if* the data falls in its range, achieves a higher $p(D\\mid M)$. So comparing evidences (Bayes factor) favors the simplest model consistent with the data — Occam's razor emerges from the normalization, no extra penalty term required.`,
      },
      glossedOver: 'We assumed probabilities are the right calculus of belief. *Why* (its axiomatic justification) and the prior-choice debates are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Bayesian updating is the unique consistent calculus of belief (Cox/de Finetti); its frontiers include nonparametric priors, PAC-Bayes generalization bounds, and the foundations debate over priors and calibration.',
      equationForms: [
        { latex: 'p(x_{1:n}) = \\int \\prod_i p(x_i\\mid\\theta)\\,d\\Pi(\\theta)', caption: 'de Finetti: exchangeable sequences are mixtures' },
        { latex: '\\mathbb{E}[R(h)] \\le \\hat R(h) + \\sqrt{\\tfrac{\\mathrm{KL}(Q\\|P) + \\ln(n/\\delta)}{2(n-1)}}', caption: 'PAC-Bayes generalization bound' },
      ],
      body: `Why probabilities at all? **Cox's theorem** derives the probability axioms from minimal consistency requirements on degrees of belief, and **de Finetti's representation theorem** shows that any *exchangeable* sequence of observations behaves exactly as if drawn i.i.d. from some parameter with a prior — manufacturing the Bayesian prior/likelihood structure from a symmetry assumption alone, without presupposing "true" parameters. Dutch-book arguments add that non-Bayesian belief updating is exploitable. These are the deepest justifications that updating *must* be Bayesian.

Modern frontiers stretch the framework. **Bayesian nonparametrics** places priors on infinite-dimensional objects — Dirichlet processes for clustering with an unknown number of components, Gaussian processes for functions — with posterior-consistency theory (Ghosal–van der Vaart) asking whether the truth is recovered as $n\\to\\infty$. **PAC-Bayes** bounds connect Bayesian posteriors to frequentist generalization guarantees and now help explain why overparameterized neural networks generalize. The live foundational debates concern objective vs. subjective priors (Jeffreys, reference priors, the role of invariance), calibration and proper scoring rules, robustness to misspecification (the model is always wrong), and the reconciliation with frequentist coverage. Thomas Bayes' posthumous fraction has become the organizing principle of inference under uncertainty across science and machine learning.`,
      keyIdeas: [
        'Cox/de Finetti/Dutch-book: Bayesian updating is the unique consistent belief calculus.',
        'Nonparametric priors (Dirichlet, Gaussian processes) with posterior-consistency theory.',
        'PAC-Bayes links posteriors to generalization bounds; prior choice and calibration remain debated.',
      ],
      workedExample: {
        prompt: 'State de Finetti’s theorem and explain why it justifies the prior–likelihood structure without assuming "true parameters."',
        solution: `**Theorem.** If an infinite sequence $X_1,X_2,\\dots$ is *exchangeable* (its joint law is invariant under finite permutations), then there exists a distribution $\\Pi$ such that

$$p(x_{1:n}) = \\int \\prod_{i=1}^n p(x_i\\mid\\theta)\\,d\\Pi(\\theta).$$

So the observations are conditionally i.i.d. given a latent $\\theta$ drawn from $\\Pi$. The point: we assumed only **symmetry** (the order of observations carries no information) — a judgement about our state of knowledge — yet out pops the entire Bayesian apparatus, with $\\Pi$ playing the role of the prior and $p(x\\mid\\theta)$ the likelihood. The parameter $\\theta$ need not be a "real" physical quantity; it is a mathematically guaranteed bookkeeping device. This dissolves the objection that Bayesian priors require believing in unobservable true parameters.`,
      },
    },
  ],
  connections: [
    { toId: 'normal-distribution', relationship: 'uses Gaussian likelihoods/priors as the conjugate workhorse of' },
    { toId: 'shannon-entropy', relationship: 'updates beliefs by information gain measured with' },
    { toId: 'logarithms', relationship: 'is computed in log-space (log-odds, log-likelihood) using' },
  ],
  viz: {
    component: 'BayesCalculator',
    kind: 'interactive',
    defaultParams: { prevalence: 0.001, sensitivity: 0.99, specificity: 0.99 },
    caption: 'A disease-test explorer: set prevalence, sensitivity, and specificity, and a unit-square / natural-frequency grid makes the posterior (and the base-rate fallacy) visible.',
    whatToTry: [
      'Set prevalence to 0.1% and watch a 99%-accurate test still mostly cry wolf.',
      'Raise prevalence to 50% and see the positive result become trustworthy.',
      'Improve specificity toward 100% and watch false positives vanish.',
    ],
  },
  primarySources: [
    {
      authors: 'T. Bayes (communicated by R. Price)',
      title: 'An Essay towards solving a Problem in the Doctrine of Chances',
      venue: 'Philosophical Transactions of the Royal Society 53, 370',
      year: 1763,
      url: 'https://doi.org/10.1098/rstl.1763.0053',
      note: 'the original posthumous essay',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'E. T. Jaynes', title: 'Probability Theory: The Logic of Science', venue: 'Cambridge University Press', year: 2003 },
    { authors: 'A. Gelman et al.', title: 'Bayesian Data Analysis', venue: 'CRC Press', year: 2013 },
  ],
  historyNote: `Thomas Bayes, a Presbyterian minister and amateur mathematician, never published his theorem; it was found in his papers and communicated to the Royal Society by his friend Richard Price in 1763, two years after Bayes' death. Price saw it partly as an argument for design and the existence of God. Laplace, unaware of Bayes, independently developed and vastly generalized the idea, applying it to everything from the masses of Saturn's moons to the ratio of male-to-female births.

After a 20th-century eclipse — frequentist statistics dominated, and "Bayesian" was nearly a slur in some circles — the approach roared back with cheap computation (MCMC in the 1990s) and now pervades machine learning, with Bayes' theorem rebranded as the very logic of learning from data.`,
};

export default bayes;
