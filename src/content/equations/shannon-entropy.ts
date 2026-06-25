import type { Equation } from '../types';

const shannonEntropy: Equation = {
  id: 'shannon-entropy',
  name: 'Shannon Information Entropy',
  nickname: 'the equation that measured information',
  canonicalLatex: 'H=-\\sum_i p_i\\log p_i',
  canonicalAlt: 'H equals minus the sum over i of p sub i times log p sub i',
  alternativeForms: [
    { latex: 'H(X) = \\mathbb{E}[-\\log p(X)]', label: 'as an expected surprise' },
    { latex: 'H(X) = -\\int f(x)\\log f(x)\\,dx', label: 'differential entropy (continuous)' },
    { latex: 'C = \\max_{p(x)} I(X;Y)', label: 'channel capacity (the noisy-channel theorem)' },
  ],
  fields: ['information-theory', 'mathematics'],
  era: { display: '1948', sortKey: 1948 },
  discoverers: [{ name: 'Claude Shannon', note: 'A Mathematical Theory of Communication, 1948' }],
  oneLine: 'Measures information as the average surprise of an outcome — and sets the hard limit on how much you can compress or transmit.',
  significance:
    'Shannon entropy founded information theory by giving "information" a precise, quantitative meaning: the average uncertainty (in bits) of a random source. It sets the absolute limits of data compression (the source-coding theorem) and reliable communication over noisy channels (the channel-coding theorem), underlying every modem, hard drive, phone, and streaming service. Mathematically identical to Boltzmann–Gibbs entropy, it bridges physics, statistics, and computation.',
  applications: [
    'Data compression (ZIP, JPEG, MP3) — the entropy is the compression limit',
    'Reliable communication: error-correcting codes, modems, deep-space links',
    'Cryptography (measuring key/password unpredictability)',
    'Machine learning (cross-entropy loss, decision-tree information gain)',
  ],
  symbols: [
    { symbol: 'H', name: 'entropy', meaning: 'average information/uncertainty of the source', units: 'bits (log₂) or nats (ln)' },
    { symbol: 'p_i', name: 'probability', meaning: 'probability of outcome/symbol i', units: 'dimensionless' },
    { symbol: 'I(X;Y)', name: 'mutual information', meaning: 'information one variable carries about another', units: 'bits' },
    { symbol: 'C', name: 'channel capacity', meaning: 'maximum reliable transmission rate', units: 'bits per use' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Information is surprise. A predictable message carries little; a surprising one carries a lot — and you can measure exactly how much.',
      equationForms: [{ latex: 'H=-\\sum_i p_i\\log p_i', caption: 'average surprise of a source' }],
      body: `If a friend texts "the sun rose today," you've learned almost nothing — you knew it already. If they text "it snowed in the Sahara," you've learned a great deal. **Information is surprise**, and Shannon found how to measure it.

A coin flip you can't predict carries exactly **one bit** of information — one yes/no question's worth. A coin that always lands heads carries *zero* bits: no surprise, no information. A loaded coin lands somewhere in between. Shannon's formula takes any source of outcomes and computes its average surprise — its **entropy** — in bits.

This humble-looking idea built the digital age. It tells you the absolute minimum number of bits needed to store a file (the limit every compression program chases) and the maximum rate you can reliably send data down a noisy wire or through the air. Every photo you compress and every call you make rides on Shannon's measure of information.`,
      keyIdeas: [
        'Information = surprise; predictable messages carry little.',
        'A fair coin flip is exactly one bit; a certain outcome is zero bits.',
        'Entropy sets the limits of compression and communication.',
      ],
      glossedOver: 'We say "surprise" loosely. Why surprise should be the *logarithm* of probability is the Level 2/3 reason.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'The surprise of an outcome is $-\\log_2 p$ (bits); entropy $H = -\\sum p_i\\log_2 p_i$ is the average surprise. It is largest when all outcomes are equally likely.',
      equationForms: [
        { latex: 'H=-\\sum_i p_i\\log_2 p_i\\ \\text{(bits)}' },
        { latex: '\\text{surprise of outcome } i = -\\log_2 p_i', caption: 'rare ⇒ surprising ⇒ many bits' },
      ],
      body: `Why the logarithm? We want two sensible properties. Rare events should be more surprising, so surprise grows as $p$ shrinks — $-\\log p$ does this ($p=1$ gives 0 surprise, $p\\to 0$ gives huge surprise). And information from **independent** events should *add*: learning two independent facts is twice the bits. Since independent probabilities multiply and logs turn multiplication into addition, $-\\log p$ is the unique measure (up to the base) with both properties. Choosing base 2 measures in **bits**.

Entropy $H = -\\sum p_i\\log_2 p_i$ is just the *average* surprise, weighting each outcome's surprise by how often it occurs. It is **maximized** when all $n$ outcomes are equally likely (then $H = \\log_2 n$ — total ignorance) and **zero** when one outcome is certain. The visualization lets you bias a coin and watch its entropy peak at 1 bit for a fair coin.`,
      keyIdeas: [
        'Surprise of an outcome is $-\\log_2 p$ bits.',
        'Logs make independent information add up.',
        'Entropy is max for equal probabilities, zero for certainty.',
      ],
      workedExample: {
        prompt: 'Compute the entropy of a fair coin, and of a biased coin that lands heads 90% of the time.',
        solution: `Fair coin ($p = 0.5$ each):

$$H = -0.5\\log_2 0.5 - 0.5\\log_2 0.5 = -0.5(-1) - 0.5(-1) = 1\\ \\text{bit}.$$

Biased coin ($p_H = 0.9,\\ p_T = 0.1$):

$$H = -0.9\\log_2 0.9 - 0.1\\log_2 0.1 \\approx -0.9(-0.152) - 0.1(-3.32) \\approx 0.137 + 0.332 = 0.47\\ \\text{bits}.$$

The biased coin carries less than half a bit — it's more predictable, so each flip tells you less. This is also why a stream of mostly-heads flips compresses to under half its naive size.`,
      },
      misconceptions: [
        {
          claim: 'Information measures meaning or importance.',
          correction:
            'No — Shannon entropy ignores meaning entirely. "xqzj" and "hello" of equal length from the same source carry the same information. It measures statistical unpredictability, not significance.',
        },
      ],
      glossedOver: 'We stated that entropy is the compression limit. The source-coding theorem that proves it is Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The source-coding theorem makes $H$ the exact compression limit; mutual information and the noisy-channel theorem set the limit on reliable transmission.',
      equationForms: [
        { latex: '\\bar L \\ge H(X)', caption: 'no code beats entropy (source coding)' },
        { latex: 'I(X;Y) = H(X) - H(X\\mid Y),\\quad C = \\max_{p(x)} I(X;Y)' },
      ],
      body: `Shannon's **source-coding theorem**: the average code length $\\bar L$ for losslessly encoding a source satisfies $\\bar L \\ge H(X)$, and codes approaching $H$ exist (Huffman, arithmetic coding get within a bit). So entropy is not a metaphor for compressibility — it is the exact bound. Conditional entropy $H(X\\mid Y)$ measures leftover uncertainty about $X$ once $Y$ is known, and **mutual information** $I(X;Y) = H(X) - H(X\\mid Y)$ measures how much $Y$ tells you about $X$ (symmetric, nonnegative, zero iff independent).

The crown jewel is the **noisy-channel coding theorem**: every channel has a **capacity** $C = \\max_{p(x)} I(X;Y)$, and you can transmit at any rate below $C$ with arbitrarily small error (using long codes), but not above it. This was revolutionary — before Shannon, people assumed noise inevitably corrupted messages and the only fix was to slow down or shout louder; Shannon proved that clever *coding* achieves essentially error-free communication right up to a hard speed limit. The relative entropy (**KL divergence**) $D(p\\|q) = \\sum p_i\\log(p_i/q_i)$ measures the cost of using the wrong distribution and grounds the whole edifice.`,
      keyIdeas: [
        'Source coding: $H$ is the exact lossless-compression limit.',
        'Mutual information $I(X;Y)$ quantifies shared information.',
        'Channel capacity $C$ is the hard limit for reliable communication.',
      ],
      workedExample: {
        prompt: 'A source emits 4 symbols with probabilities 1/2, 1/4, 1/8, 1/8. Find its entropy and a matching code.',
        solution: `Entropy:

$$H = -\\tfrac12\\log_2\\tfrac12 - \\tfrac14\\log_2\\tfrac14 - 2\\cdot\\tfrac18\\log_2\\tfrac18 = \\tfrac12(1) + \\tfrac14(2) + 2\\cdot\\tfrac18(3) = 0.5+0.5+0.75 = 1.75\\ \\text{bits}.$$

A Huffman code assigns short codewords to frequent symbols: $0,\\ 10,\\ 110,\\ 111$ (lengths 1, 2, 3, 3). Average length:

$$\\bar L = \\tfrac12(1)+\\tfrac14(2)+\\tfrac18(3)+\\tfrac18(3) = 1.75\\ \\text{bits}.$$

The code *exactly* achieves the entropy bound — possible here because all probabilities are powers of $\\tfrac12$. No code can do better than 1.75 bits/symbol on average.`,
      },
      glossedOver: 'We worked with discrete sources. Continuous (differential) entropy, capacity of physical channels, and the role of energy are Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'For continuous channels the Gaussian is worst/most-robust and gives the Shannon–Hartley capacity; the AEP and typical sets explain why the theorems work, and entropy permeates statistics and ML.',
      equationForms: [
        { latex: 'C = B\\log_2\\!\\Big(1 + \\dfrac{S}{N}\\Big)', caption: 'Shannon–Hartley capacity (bandwidth B, SNR S/N)' },
        { latex: '-\\tfrac1n\\log p(X_1,\\dots,X_n) \\to H(X)', caption: 'asymptotic equipartition property (AEP)' },
      ],
      body: `For the bandlimited Gaussian channel, capacity is the celebrated **Shannon–Hartley** formula $C = B\\log_2(1 + S/N)$: capacity grows linearly with bandwidth but only logarithmically with signal power — the law every wireless engineer lives by. Gaussian noise is the worst case for a given power (max differential entropy at fixed variance), so designing for it is robust.

The theorems' proofs rest on the **asymptotic equipartition property**: for long sequences, $-\\tfrac1n\\log p(X^n)\\to H$, so probability concentrates on a "typical set" of about $2^{nH}$ roughly-equiprobable sequences — you only need to encode those, which is *why* $H$ bits suffice. This same KL/entropy machinery saturates modern statistics and ML: **cross-entropy** is the standard classification loss (minimizing it is maximum likelihood), KL divergence is the regularizer/variational objective (see Bayes' ELBO), **information gain** (entropy reduction) splits decision trees, and the **maximum-entropy principle** (Jaynes) derives least-biased distributions from constraints — recovering the Gaussian (fixed variance) and Boltzmann (fixed energy) distributions. Rate–distortion theory extends source coding to *lossy* compression (JPEG, MP3), trading bits for fidelity.`,
      keyIdeas: [
        'Shannon–Hartley: $C = B\\log_2(1+S/N)$ — power helps only logarithmically.',
        'AEP/typical sets: ~$2^{nH}$ likely sequences explain why $H$ bits suffice.',
        'Cross-entropy/KL/info-gain/max-entropy permeate statistics and ML.',
      ],
      workedExample: {
        prompt: 'Show that minimizing cross-entropy loss in classification is equivalent to maximum-likelihood estimation.',
        solution: `For one example with true label distribution $p$ (a one-hot vector) and model prediction $q_\\theta$, the cross-entropy is $H(p,q_\\theta) = -\\sum_i p_i\\log q_\\theta(i) = -\\log q_\\theta(\\text{true class})$.

Summing over a dataset, minimizing total cross-entropy is

$$\\min_\\theta -\\sum_{n}\\log q_\\theta(y_n\\mid x_n) = \\max_\\theta \\sum_n \\log q_\\theta(y_n\\mid x_n),$$

which is exactly **maximizing the log-likelihood**. Equivalently, cross-entropy $H(p,q) = H(p) + D(p\\|q)$; since $H(p)$ is fixed by the data, minimizing cross-entropy minimizes the KL divergence $D(p\\|q)$ from model to truth. Shannon's information measures are literally the loss functions of modern machine learning.`,
      },
      glossedOver: 'Classical (Shannon) information assumes classical bits. Quantum information replaces them with qubits and a richer entropy — Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Shannon entropy generalizes to quantum (von Neumann) entropy, governing qubits, entanglement, and the thermodynamics of information — connecting communication, computation, and the physics of black holes.',
      equationForms: [
        { latex: 'S(\\rho) = -\\mathrm{Tr}(\\rho\\log\\rho)', caption: 'von Neumann (quantum) entropy' },
        { latex: 'W_{\\text{erase}} \\ge k_B T\\ln 2\\ \\text{per bit}', caption: 'Landauer’s principle' },
      ],
      body: `Replacing the probability vector by a density matrix gives the **von Neumann entropy** $S(\\rho) = -\\mathrm{Tr}(\\rho\\log\\rho)$, the foundation of **quantum information**. Here new phenomena appear: entropy can be *subadditive* in counterintuitive ways (a pure entangled state has zero total entropy but maximally mixed parts), and quantum analogues of Shannon's theorems hold — Schumacher compression (qubits as the unit), the Holevo bound limiting accessible classical information, and quantum channel capacities. Entanglement entropy (the von Neumann entropy of a subsystem) classifies phases of matter and, via Ryu–Takayanagi, ties to spacetime geometry (see Boltzmann entropy).

Information is also irreducibly **physical**. **Landauer's principle** sets a thermodynamic cost $k_B T\\ln 2$ to *erase* one bit, resolving Maxwell's demon (the demon must erase its memory, paying entropy) and linking Shannon's $H$ to Boltzmann's $S$ — they are the same quantity in different units, $S = k_B\\ln 2\\cdot H$. This identity underwrites the thermodynamics of computation, reversible computing, and the black-hole information paradox. Frontiers include network information theory (still lacking a general multi-user capacity region), polar and LDPC codes that finally achieve capacity in practice, and the deepening dialogue between quantum information and quantum gravity. Shannon's 1948 measure has become a unifying currency across communication, computation, and fundamental physics.`,
      keyIdeas: [
        'Von Neumann entropy extends Shannon to qubits, entanglement, and quantum channels.',
        'Landauer: erasing a bit costs $k_B T\\ln 2$ — information is physical; $S = k_B\\ln2\\cdot H$.',
        'Information theory now intertwines with quantum gravity and the thermodynamics of computation.',
      ],
      workedExample: {
        prompt: 'Use Landauer’s principle to resolve the Maxwell’s-demon paradox.',
        solution: `The demon seemingly violates the second law by sorting fast and slow molecules using only information, lowering entropy "for free."

The resolution (Landauer–Bennett): the demon must *store* the measurement outcomes in memory. To run as a cycle, it must eventually **erase** that memory — and erasing one bit in an environment at temperature $T$ dissipates at least

$$W_{\\text{erase}} \\ge k_B T\\ln 2.$$

This erasure cost exactly compensates the entropy the demon removed from the gas, so total entropy never decreases. The bookkeeping closes only when Shannon information ($H$, bits) is converted to Boltzmann entropy ($S = k_B\\ln 2\\cdot H$, J/K). The paradox dissolves precisely because information is physical — Shannon's and Boltzmann's entropies are one.`,
      },
    },
  ],
  connections: [
    { toId: 'boltzmann-entropy', relationship: 'is mathematically identical (different units) to' },
    { toId: 'logarithms', relationship: 'requires the additive-over-independence logarithm of' },
    { toId: 'bayes', relationship: 'measures the information gained when updating with' },
    { toId: 'normal-distribution', relationship: 'is the maximum-entropy distribution at fixed variance, namely' },
  ],
  viz: {
    component: 'EntropyCoin',
    kind: 'interactive',
    defaultParams: { p: 0.5 },
    caption: 'Slide a coin’s bias (or a distribution) and watch its entropy rise to a maximum of 1 bit at p = 0.5 and fall to 0 at the certain extremes.',
    whatToTry: [
      'Set p = 0.5 for the maximum 1 bit; slide toward 0 or 1 to watch entropy vanish.',
      'Add more outcomes and see the max entropy rise to log₂ n.',
      'Compare a near-certain distribution’s tiny entropy to a uniform one’s.',
    ],
  },
  primarySources: [
    {
      authors: 'C. E. Shannon',
      title: 'A Mathematical Theory of Communication',
      venue: 'Bell System Technical Journal 27, 379 & 623',
      year: 1948,
      url: 'https://doi.org/10.1002/j.1538-7305.1948.tb01338.x',
      note: 'founds information theory',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'T. Cover & J. Thomas', title: 'Elements of Information Theory', venue: 'Wiley', year: 2006 },
    { authors: 'J. Gleick', title: 'The Information', venue: 'Pantheon', year: 2011 },
  ],
  historyNote: `Claude Shannon's 1948 paper appeared, fully formed, with almost no precedent — it created an entire field in one stroke. The story goes that John von Neumann advised Shannon to call his quantity "entropy," both because the formula matched Boltzmann's and because "no one knows what entropy really is, so in a debate you will always have the advantage."

Shannon was famously playful — he built a juggling, unicycle-riding persona and a "Ultimate Machine" whose only function was to switch itself off. Beneath the whimsy, his work made the digital revolution possible: the word "bit" (binary digit, coined by his colleague John Tukey) and the very idea that information is a measurable, fungible quantity both trace to this single paper.`,
};

export default shannonEntropy;
