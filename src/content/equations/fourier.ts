import type { Equation } from '../types';

const fourier: Equation = {
  id: 'fourier',
  name: 'The Fourier Transform',
  nickname: 'the mathematical prism',
  canonicalLatex: '\\hat f(\\xi)=\\int_{-\\infty}^{\\infty} f(x)\\,e^{-2\\pi i x\\xi}\\,dx',
  canonicalAlt:
    'f hat of xi equals the integral over all x of f of x times e to the minus two pi i x xi, d x',
  alternativeForms: [
    { latex: 'f(x)=\\int_{-\\infty}^{\\infty}\\hat f(\\xi)\\,e^{2\\pi i x\\xi}\\,d\\xi', label: 'inverse transform' },
    { latex: 'X_k = \\sum_{n=0}^{N-1} x_n\\,e^{-2\\pi i kn/N}', label: 'discrete Fourier transform (DFT)' },
    { latex: '\\widehat{f*g} = \\hat f\\,\\hat g', label: 'convolution theorem' },
  ],
  fields: ['mathematics', 'analysis'],
  era: { display: '1822', sortKey: 1822 },
  discoverers: [
    { name: 'Joseph Fourier', note: 'Théorie analytique de la chaleur, 1822' },
    { name: 'Cooley & Tukey', note: 'the Fast Fourier Transform algorithm, 1965' },
  ],
  oneLine: 'Splits any signal into the pure frequencies that compose it — like a prism splitting light.',
  significance:
    'The Fourier transform expresses a function as a superposition of pure oscillations, turning differentiation and convolution into simple multiplication. It is the backbone of signal and image processing (JPEG, MP3), the spectral method for PDEs, the uncertainty principle, diffraction and crystallography, and the very notion of frequency content. The Fast Fourier Transform made it computationally ubiquitous, arguably one of the most important algorithms ever devised.',
  applications: [
    'Audio (MP3) and image (JPEG) compression via frequency thresholding',
    'Filtering, equalization, noise removal; spectral analysis',
    'Solving PDEs (heat, wave) by diagonalizing derivatives',
    'X-ray crystallography, MRI, radar, and optical diffraction',
  ],
  symbols: [
    { symbol: 'f', name: 'signal', meaning: 'the function being analyzed (in time or space)', units: 'any' },
    { symbol: '\\hat f', name: 'spectrum', meaning: 'the transform: amplitude/phase at each frequency', units: 'units of f × units of x' },
    { symbol: '\\xi', name: 'frequency', meaning: 'cycles per unit of x (ordinary frequency convention)', units: '1/units of x' },
    { symbol: 'x', name: 'variable', meaning: 'time or position', units: 'any' },
    { symbol: 'i', name: 'imaginary unit', meaning: 'i² = −1, carrying phase via e^{iθ}', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Every sound, every signal, is a chord — a stack of pure tones. The Fourier transform is the machine that hears each note.',
      equationForms: [{ latex: '\\text{signal} = \\sum \\text{pure waves}', caption: 'any signal is a sum of simple oscillations' }],
      body: `Shine white light through a prism and it fans out into a rainbow — the prism reveals that "white" was secretly all colors at once. The Fourier transform is a prism for *any* signal.

Play a chord on a piano and your ear hears a single rich sound, but it is really several pure notes sounding together. The Fourier transform takes the combined sound and tells you **exactly which pure tones are present and how loud each one is**. Run it on a photograph and it reports the coarse shapes versus the fine details; run it on a heartbeat and it finds the rhythm.

This "recipe of frequencies" is so useful that it quietly runs the modern world: it is how your phone compresses music and photos, how Wi-Fi packs data onto radio waves, and how doctors turn MRI measurements into images.`,
      keyIdeas: [
        'Any signal is a sum of pure waves.',
        'The transform reports the amount of each frequency present.',
        'It powers MP3, JPEG, Wi-Fi, MRI, and more.',
      ],
      glossedOver: 'We said "sum of pure waves." For non-repeating signals it is really an *integral* over a continuum of frequencies — Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Build complicated waves by adding sines of different frequencies and amplitudes; the transform runs this in reverse to recover the amplitudes.',
      equationForms: [
        { latex: 'f(x) = \\sum_n a_n\\sin(2\\pi n x) + b_n\\cos(2\\pi n x)', caption: 'Fourier series (periodic signal)' },
      ],
      body: `Start with pure sine waves of frequencies $1,2,3,\\dots$ Add them with the right amplitudes and you can build remarkably complex shapes — even a square wave with sharp corners, from smooth sines. The interactive builder on this page lets you stack harmonics and watch a square or sawtooth wave emerge.

The amplitudes $a_n, b_n$ are the **spectrum** — the recipe. The Fourier transform is the procedure that goes the other way: given the finished wave, it computes how much of each frequency went in. More terms means a better match; the corners of a square wave need infinitely many, and the slight overshoot near a jump that never fully disappears is the famous **Gibbs phenomenon**.`,
      keyIdeas: [
        'Add sines of integer-multiple frequencies (harmonics) to build any periodic shape.',
        'The amplitudes are the spectrum; the transform recovers them.',
        'Sharp corners need many harmonics; jumps cause Gibbs overshoot.',
      ],
      workedExample: {
        prompt: 'The square wave’s recipe is $\\frac{4}{\\pi}\\big(\\sin x + \\tfrac13\\sin 3x + \\tfrac15\\sin 5x + \\cdots\\big)$. Estimate its value at $x=\\pi/2$ using the first two terms.',
        solution: `At $x=\\pi/2$: $\\sin(\\pi/2)=1$ and $\\sin(3\\pi/2)=-1$.

First two terms: $\\frac{4}{\\pi}\\big(1 + \\tfrac13(-1)\\big) = \\frac{4}{\\pi}\\cdot\\frac{2}{3} \\approx 0.85.$

The true square wave equals $1$ there; adding more odd harmonics ($\\tfrac15\\sin 5x,\\dots$) pushes the partial sum toward 1, illustrating how the recipe converges.`,
      },
      misconceptions: [
        {
          claim: 'You need curvy building blocks to make a curvy or jagged signal.',
          correction:
            'No — smooth sines and cosines suffice to build even discontinuous shapes (in the limit). Sharpness comes from *high frequencies*, not from special-shaped pieces.',
        },
      ],
      glossedOver: 'Periodic signals use a *series* (discrete frequencies). Non-periodic signals need the *integral* transform — Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'The transform projects $f$ onto the orthonormal family $e^{2\\pi i x\\xi}$; it diagonalizes differentiation ($\\widehat{f\'}=2\\pi i\\xi\\,\\hat f$) and turns convolution into multiplication.',
      equationForms: [
        { latex: '\\hat f(\\xi)=\\int_{-\\infty}^{\\infty} f(x)e^{-2\\pi i x\\xi}\\,dx,\\quad f(x)=\\int_{-\\infty}^{\\infty}\\hat f(\\xi)e^{2\\pi i x\\xi}\\,d\\xi' },
        { latex: '\\widehat{f\'}(\\xi) = 2\\pi i\\xi\\,\\hat f(\\xi)' },
      ],
      body: `For a non-periodic signal, frequencies form a continuum and the sum becomes the integral defining $\\hat f$. The complex exponentials $e^{2\\pi i x\\xi}$ are (generalized) eigenfunctions, so the transform acts like a change to a basis in which the relevant operators are diagonal.

Two properties drive nearly every application. **Differentiation becomes multiplication:** $\\widehat{f'}(\\xi) = 2\\pi i\\xi\\,\\hat f(\\xi)$, which converts linear constant-coefficient differential equations (heat, wave) into algebra — solve in frequency, transform back. **The convolution theorem:** $\\widehat{f*g} = \\hat f\\,\\hat g$, so filtering (a convolution) is just frequency-by-frequency scaling. **Parseval/Plancherel** $\\int|f|^2 = \\int|\\hat f|^2$ says the transform preserves energy (Pythagoras in an orthonormal basis). And the time–frequency **uncertainty** $\\Delta x\\,\\Delta\\xi \\ge \\frac{1}{4\\pi}$ says you cannot be sharply localized in both domains.`,
      keyIdeas: [
        'Differentiation ↦ multiply by $2\\pi i\\xi$; convolution ↦ multiplication.',
        'Plancherel: the transform is unitary (energy-preserving).',
        'Uncertainty: localization in $x$ and $\\xi$ trade off.',
      ],
      workedExample: {
        prompt: 'Solve the heat equation $\\partial_t u = \\alpha\\,\\partial_x^2 u$ on the line via the Fourier transform.',
        solution: `Transform in $x$. Using $\\widehat{\\partial_x^2 u} = (2\\pi i\\xi)^2\\hat u = -4\\pi^2\\xi^2\\hat u$, the PDE becomes an ODE in time for each frequency:

$$\\partial_t \\hat u(\\xi,t) = -\\alpha\\,4\\pi^2\\xi^2\\,\\hat u(\\xi,t) \\;\\Rightarrow\\; \\hat u(\\xi,t) = \\hat u(\\xi,0)\\,e^{-4\\pi^2\\alpha\\xi^2 t}.$$

High frequencies decay fastest — diffusion smooths. Transforming back convolves the initial data with a spreading Gaussian (the heat kernel). The transform diagonalized $\\partial_x^2$.`,
      },
      glossedOver: 'We integrated freely. For which functions $\\hat f$ exists, and in what sense the inverse recovers $f$, needs $L^1/L^2$ theory — Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'On $L^2$ the transform is a unitary operator; extended to tempered distributions it handles deltas and sinusoids, and the FFT computes the DFT in $O(N\\log N)$.',
      equationForms: [
        { latex: '\\mathcal{F}: L^2(\\mathbb{R})\\to L^2(\\mathbb{R}) \\text{ unitary},\\quad \\mathcal{F}^4 = I' },
        { latex: 'X_k=\\sum_{n=0}^{N-1}x_n e^{-2\\pi i kn/N},\\quad \\text{FFT: } O(N\\log N)' },
      ],
      body: `Rigorously, $\\mathcal{F}$ is defined first on the Schwartz space, extends by density to a **unitary** map on $L^2(\\mathbb{R})$ (Plancherel), and by duality to **tempered distributions** $\\mathcal{S}'$ — which is what lets us transform the delta ($\\hat\\delta = 1$), constants, and pure sinusoids ($\\widehat{e^{2\\pi i x\\xi_0}} = \\delta(\\xi-\\xi_0)$) that are not integrable. Its eigenfunctions are the Hermite functions, with eigenvalues $i^{-n}$; hence $\\mathcal{F}^4=I$.

Computationally, sampling gives the **DFT**, and the **Cooley–Tukey FFT** factorizes it into $O(N\\log N)$ operations by recursively splitting even/odd indices — a speedup that turned spectral methods from theory into the engine of digital audio, comms, and imaging. Practical use brings real subtleties: the sampling theorem and **aliasing** (Nyquist), **spectral leakage** and windowing for finite records, and the difference between circular (DFT) and linear convolution. The same harmonic-analysis framework generalizes to locally compact abelian groups (Pontryagin duality) — Fourier series, DFT, and integral transform are one theory on $\\mathbb{T}$, $\\mathbb{Z}_N$, and $\\mathbb{R}$.`,
      keyIdeas: [
        '$\\mathcal{F}$ is unitary on $L^2$ ($\\mathcal{F}^4=I$); distributions handle δ and sinusoids.',
        'FFT computes the DFT in $O(N\\log N)$ — a transformative algorithm.',
        'Sampling/aliasing (Nyquist), leakage, and windowing govern real DSP.',
      ],
      workedExample: {
        prompt: 'Why must a signal be sampled above twice its highest frequency (the Nyquist rate)?',
        solution: `Sampling at rate $f_s$ replaces the spectrum $\\hat f(\\xi)$ with its periodic summation $\\sum_k \\hat f(\\xi - k f_s)$ (multiplication by a Dirac comb in time = convolution with a comb in frequency).

If $f$ contains frequencies above $f_s/2$, adjacent copies **overlap** and add — high frequencies masquerade as lower ones (**aliasing**), irreversibly corrupting the spectrum. Only if $\\hat f$ is band-limited to $|\\xi| < f_s/2$ do the copies stay separate, allowing exact reconstruction (Shannon–Nyquist). Hence sample above twice the highest frequency.`,
      },
      glossedOver: 'We worked on $\\mathbb{R}$ and finite grids. Non-abelian and time-frequency (wavelet, Wigner) generalizations are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'The transform is the Plancherel decomposition for the group; non-commutative harmonic analysis, the metaplectic representation, and time–frequency phase space situate it in modern analysis and mathematical physics.',
      equationForms: [
        { latex: '\\hat f(\\pi) = \\int_G f(g)\\,\\pi(g)^{*}\\,dg', caption: 'operator-valued transform on a group G with representation π' },
        { latex: '[\\hat x, \\hat\\xi] = \\tfrac{1}{2\\pi i}', caption: 'position–frequency as conjugate (Heisenberg) variables' },
      ],
      body: `The Fourier transform is the realization of **Pontryagin duality**: on a locally compact abelian group $G$, $\\mathcal{F}$ maps functions on $G$ to functions on its character group $\\hat G$, diagonalizing all translations. For **non-abelian** $G$ the characters become irreducible unitary representations and the transform is operator-valued, with the Plancherel measure on $\\hat G$ replacing $d\\xi$ — the Peter–Weyl theorem for compact groups, and harmonic analysis on Lie groups (Harish-Chandra) for the general case.

Quantum mechanically, position and frequency are **conjugate** operators generating the Heisenberg group; the Fourier transform is the quarter-turn of the **metaplectic representation** of $SL(2,\\mathbb{R})$ acting on phase space, with the fractional Fourier transform its full one-parameter rotation. This phase-space view organizes time–frequency analysis (Gabor, wavelets, the Wigner distribution and its uncertainty/positivity constraints) and microlocal analysis, where the wavefront set tracks singularities in $(x,\\xi)$ jointly. The classical prism is thus a shadow of representation theory, symplectic geometry, and the analysis of PDE singularities.`,
      keyIdeas: [
        'Fourier = Pontryagin duality; non-abelian version is operator-valued (Peter–Weyl / Plancherel).',
        'It is the metaplectic quarter-turn of phase space; fractional FT interpolates.',
        'Time–frequency/microlocal analysis (Wigner, wavefront set) lives in $(x,\\xi)$ phase space.',
      ],
      workedExample: {
        prompt: 'Derive the Heisenberg uncertainty bound $\\Delta x\\,\\Delta\\xi \\ge \\frac{1}{4\\pi}$ as a statement about $\\mathcal{F}$.',
        solution: `For unit-norm $f$, define spreads $\\Delta x^2 = \\int (x-\\bar x)^2|f|^2$ and $\\Delta\\xi^2 = \\int(\\xi-\\bar\\xi)^2|\\hat f|^2$. Using $\\widehat{xf} \\propto \\hat f{}'$ and the Cauchy–Schwarz inequality applied to the commutator of multiplication-by-$x$ and differentiation,

$$\\Delta x\\,\\Delta\\xi \\ge \\frac{1}{4\\pi},$$

with equality exactly for Gaussians (the ground state of the harmonic oscillator, fixed by $\\mathcal{F}$). It is the analytic face of $[\\hat x,\\hat\\xi]=\\tfrac{1}{2\\pi i}$ — concentration in one domain forces spread in the dual.`,
      },
    },
  ],
  connections: [
    { toId: 'euler-identity', relationship: 'uses the rotating exponentials e^{iθ} of' },
    { toId: 'heat-equation', relationship: 'diagonalizes the derivatives of' },
    { toId: 'schrodinger', relationship: 'relates position and momentum bases of' },
    { toId: 'pythagoras', relationship: 'preserves energy by the Parseval relation, a form of' },
  ],
  viz: {
    component: 'FourierBuilder',
    kind: 'interactive',
    defaultParams: { harmonics: 5, target: 'square' },
    caption: 'Add sine harmonics to approximate a square, triangle, or sawtooth wave; watch the partial sum chase the target and the amplitude spectrum fill in.',
    whatToTry: [
      'Increase the number of harmonics and watch the square wave sharpen.',
      'Look near the jumps for the Gibbs overshoot that never quite vanishes.',
      'Switch the target to a triangle wave — its harmonics fall off faster.',
    ],
  },
  primarySources: [
    {
      authors: 'J. Fourier',
      title: 'Théorie analytique de la chaleur',
      venue: 'Paris',
      year: 1822,
      note: 'introduces Fourier series to solve heat conduction',
      primary: true,
    },
    {
      authors: 'J. W. Cooley & J. W. Tukey',
      title: 'An algorithm for the machine calculation of complex Fourier series',
      venue: 'Mathematics of Computation 19, 297',
      year: 1965,
      url: 'https://doi.org/10.1090/S0025-5718-1965-0178586-1',
      note: 'the FFT',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'E. M. Stein & R. Shakarchi', title: 'Fourier Analysis: An Introduction', venue: 'Princeton University Press', year: 2003 },
    { authors: 'R. Bracewell', title: 'The Fourier Transform and Its Applications', venue: 'McGraw-Hill', year: 2000 },
  ],
  historyNote: `Fourier introduced his series to solve heat conduction, claiming *any* function could be built from sines and cosines. The leading mathematicians of the day — Lagrange, Laplace, Legendre — were skeptical, and the question of exactly which functions his series represent drove a century of analysis: it motivated Dirichlet's definition of a function, Riemann's theory of integration, Cantor's set theory (born from studying convergence sets), and Lebesgue's integral.

The Cooley–Tukey FFT (1965) is often called one of the most important algorithms of the 20th century; its core idea was later traced back to an unpublished method of Gauss (c. 1805), predating Fourier's own publication.`,
};

export default fourier;
