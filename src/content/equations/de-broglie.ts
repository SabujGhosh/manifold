import type { Equation } from '../types';

const deBroglie: Equation = {
  id: 'de-broglie',
  name: 'De Broglie Relation',
  nickname: 'matter is a wave',
  canonicalLatex: '\\lambda=\\dfrac{h}{p}',
  canonicalAlt: 'lambda equals h over p',
  alternativeForms: [
    { latex: '\\vec p = \\hbar\\vec k', label: 'momentum and wavevector' },
    { latex: '\\lambda = \\dfrac{h}{\\sqrt{2mE}}', label: 'for a non-relativistic particle of energy E' },
  ],
  fields: ['quantum', 'physics'],
  era: { display: '1924', sortKey: 1924 },
  discoverers: [{ name: 'Louis de Broglie', note: 'doctoral thesis proposing matter waves, 1924' }],
  oneLine: 'Every particle is also a wave, with a wavelength set by its momentum.',
  significance:
    'De Broglie proposed that wave–particle duality, known for light, applies to all matter: an electron, atom, or baseball has a wavelength λ = h/p. This unified the dual nature of light and matter, explained why atomic orbits are quantized (standing electron waves), and directly inspired Schrödinger’s wave equation. It is confirmed daily in electron microscopy and neutron/atom interferometry.',
  applications: [
    'Electron microscopes (electron wavelength ≪ light → far higher resolution)',
    'Neutron and atom interferometry; matter-wave sensors',
    'Explaining quantized atomic orbitals (standing waves)',
    'Electron diffraction for crystal-structure determination',
  ],
  symbols: [
    { symbol: '\\lambda', name: 'de Broglie wavelength', meaning: 'wavelength associated with a particle', units: 'm' },
    { symbol: 'h', name: 'Planck constant', meaning: '6.626×10⁻³⁴ J·s', units: 'J·s' },
    { symbol: 'p', name: 'momentum', meaning: 'particle momentum mv (or relativistic γmv)', units: 'kg·m/s' },
    { symbol: '\\vec k', name: 'wavevector', meaning: 'direction and 2π/λ of the wave', units: '1/m' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'If light can act like particles, de Broglie asked, can particles act like waves? Yes — everything has a hidden wavelength, but it’s only noticeable for the very small.',
      equationForms: [{ latex: '\\lambda=\\dfrac{h}{p}', caption: 'wavelength = constant ÷ momentum' }],
      body: `Physics had just learned that light, long thought a wave, also behaves like particles (photons). A young French aristocrat, Louis de Broglie, asked the daring reverse question in his PhD thesis: if waves can be particles, can **particles be waves**?

His answer — yes, everything — turned out to be correct. An electron, an atom, even a baseball has a wavelength. The catch is that the wavelength shrinks as momentum grows, and for anything bigger than an atom it is so absurdly tiny as to be undetectable. A thrown baseball's wavelength is far smaller than an atomic nucleus, which is why we never see it ripple or diffract.

But for electrons it's large enough to matter — and measurable. Electrons fired at a crystal spread out and interfere like ripples in a pond, exactly as waves do. This wave nature is why electron microscopes can see far finer detail than light microscopes, and why atoms have the orbital structure they do.`,
      keyIdeas: [
        'Particles, like light, have a wave nature.',
        'Wavelength shrinks as momentum grows — tiny for big objects.',
        'For electrons it’s measurable: they diffract and interfere.',
      ],
      glossedOver: 'We call it "a wave," but a wave of *what*? That question — the wavefunction — is answered by Schrödinger at Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'A particle’s wavelength is $\\lambda = h/p$. Big momentum → tiny wavelength, which is why wave behavior is invisible for everyday objects but real for electrons.',
      equationForms: [{ latex: '\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}' }],
      body: `The formula is short: wavelength equals Planck's constant divided by momentum, $\\lambda = h/p$. Because $h$ is so small ($6.6\\times10^{-34}$), you need an extremely small momentum to get a noticeable wavelength — which means a tiny mass, like an electron's.

This explains a beautiful puzzle: why are electron orbits in atoms "quantized," allowed only at certain energies? Think of the electron as a wave wrapped around the nucleus. Only whole numbers of wavelengths fit around the loop — like the standing waves on a guitar string. Orbits where the wave meets itself smoothly survive; others cancel out. That single picture explained the mysterious quantum jumps of atomic spectra. The visualization lets you slide a particle's speed and watch its wavelength change.`,
      keyIdeas: [
        '$\\lambda = h/p$: faster/heavier means shorter wavelength.',
        'Everyday objects have immeasurably small wavelengths.',
        'Atomic orbits = standing electron waves that "fit" around the nucleus.',
      ],
      workedExample: {
        prompt: 'Find the de Broglie wavelength of an electron ($m = 9.1\\times10^{-31}\\,\\text{kg}$) moving at $1\\times10^6\\,\\text{m/s}$, and compare to a $0.15\\,\\text{kg}$ baseball at $40\\,\\text{m/s}$.',
        solution: `Electron: $p = mv = 9.1\\times10^{-31}\\times10^6 = 9.1\\times10^{-25}\\,\\text{kg·m/s}$, so

$$\\lambda = \\frac{6.6\\times10^{-34}}{9.1\\times10^{-25}} \\approx 7.3\\times10^{-10}\\,\\text{m} \\approx 0.7\\,\\text{nm}.$$

That's about an atom's width — large enough to diffract off crystals.

Baseball: $p = 0.15\\times40 = 6\\,\\text{kg·m/s}$, so $\\lambda = \\dfrac{6.6\\times10^{-34}}{6} \\approx 1.1\\times10^{-34}\\,\\text{m}$ — a billion-trillion times smaller than a proton. Utterly unmeasurable, which is why baseballs never visibly behave as waves.`,
      },
      misconceptions: [
        {
          claim: 'Only electrons and light have wavelengths; bigger things are purely particles.',
          correction:
            'Everything has a de Broglie wavelength — it’s just unmeasurably small for macroscopic objects. Interference has been demonstrated for whole molecules of hundreds of atoms.',
        },
      ],
      glossedOver: 'We used non-relativistic $p = mv$. Near light speed, use $p = \\gamma mv$ — Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'De Broglie’s hypothesis $p = \\hbar k$ pairs with $E = \\hbar\\omega$; the Bohr quantization condition becomes a standing-wave condition, and it directly seeds the Schrödinger equation.',
      equationForms: [
        { latex: '\\vec p = \\hbar\\vec k,\\quad E = \\hbar\\omega', caption: 'the matter-wave dispersion' },
        { latex: '2\\pi r = n\\lambda \\;\\Leftrightarrow\\; L = n\\hbar', caption: 'Bohr quantization as a standing wave' },
      ],
      body: `De Broglie extended the photon relations $E = \\hbar\\omega$ and $p = \\hbar k$ to *all* matter, assigning a plane wave $\\psi \\sim e^{i(\\vec k\\cdot\\vec x - \\omega t)}$ to a free particle. This instantly demystifies **Bohr's quantization**: requiring an integer number of wavelengths around a circular orbit, $2\\pi r = n\\lambda = nh/p$, is equivalent to quantized angular momentum $L = pr = n\\hbar$ — the wave must close on itself or destructively interfere. The standing-wave picture replaced Bohr's ad hoc postulate with a physical mechanism.

Experimental confirmation came fast: **Davisson–Germer** (1927) saw electrons diffract off a nickel crystal with exactly the predicted $\\lambda$. The relativistic version uses $p = \\gamma mv$ (and for fast electrons $\\lambda = h/\\sqrt{2mE}$ corrected relativistically). Crucially, de Broglie's matter wave was the direct stimulus for **Schrödinger**, who sought the wave *equation* whose solutions are these matter waves — generalizing the plane wave to bound states and arbitrary potentials, and turning $p \\to -i\\hbar\\nabla$.`,
      keyIdeas: [
        'Matter waves: $E = \\hbar\\omega$, $p = \\hbar k$, for all particles.',
        'Bohr quantization = standing-wave (integer-wavelength) condition.',
        'Davisson–Germer confirmed it; it directly inspired Schrödinger’s equation.',
      ],
      workedExample: {
        prompt: 'Show that an integer number of de Broglie wavelengths fitting a circular orbit gives Bohr’s quantized angular momentum.',
        solution: `Demand a standing wave around the orbit of radius $r$: the circumference holds a whole number of wavelengths,

$$2\\pi r = n\\lambda = n\\frac{h}{p}.$$

Rearrange: $pr = \\dfrac{nh}{2\\pi} = n\\hbar$. But $pr = mvr = L$, the angular momentum, so

$$L = n\\hbar,\\quad n = 1,2,3,\\dots$$

This is exactly Bohr's 1913 quantization postulate — but now *derived* from the requirement that the electron's matter wave interfere constructively with itself. Non-integer orbits would have the wave cancel, so only discrete radii (and energies) survive. The mysterious quantum jumps of hydrogen become a resonance condition.`,
      },
      glossedOver: 'A plane wave has definite momentum but is spread over all space. Localized particles need wave packets — and the resulting uncertainty is Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'A localized particle is a wave packet superposing many k; its group velocity is the particle velocity, and the spread in x vs. k is the uncertainty principle.',
      equationForms: [
        { latex: 'v_g = \\dfrac{d\\omega}{dk} = \\dfrac{p}{m}', caption: 'group velocity = particle velocity' },
        { latex: '\\Delta x\\,\\Delta p \\ge \\dfrac{\\hbar}{2}', caption: 'Heisenberg uncertainty (Fourier-conjugate x and p)' },
      ],
      body: `A single plane wave $e^{i(kx-\\omega t)}$ has perfectly definite momentum but is delocalized everywhere — not a localized particle. A real particle is a **wave packet**: a superposition $\\psi(x) = \\int A(k)e^{ikx}\\,dk$ of many wavelengths. The packet's envelope moves at the **group velocity** $v_g = d\\omega/dk$, which (using the non-relativistic dispersion $\\omega = \\hbar k^2/2m$) equals $\\hbar k/m = p/m$ — the classical particle velocity. So de Broglie waves transport the particle at the right speed.

Because position and momentum are **Fourier conjugates** ($x$ and $k$), localizing the packet in space requires a broad spread of $k$, and vice versa — this *is* the **Heisenberg uncertainty principle** $\\Delta x\\,\\Delta p \\ge \\hbar/2$, a theorem about Fourier transforms rather than a measurement disturbance. Matter waves also **disperse** (different $k$ travel at different speeds, since $\\omega \\propto k^2$), so free wave packets spread over time. This framework underpins electron optics, neutron and atom interferometry (matter-wave gravimeters and gyroscopes), and the de Broglie wavelength sets the resolution limit of electron microscopes — about 1000× finer than visible light.`,
      keyIdeas: [
        'Localized particle = wave packet; group velocity $d\\omega/dk = p/m$.',
        'x and k are Fourier conjugates ⇒ uncertainty $\\Delta x\\Delta p \\ge \\hbar/2$.',
        'Matter waves disperse; basis of electron microscopy and atom interferometry.',
      ],
      workedExample: {
        prompt: 'Use the wave-packet/Fourier picture to argue the uncertainty principle, then estimate the minimum speed spread of an electron confined to an atom (~0.1 nm).',
        solution: `A packet localized to width $\\Delta x$ is built from a range of wavevectors $\\Delta k \\gtrsim 1/\\Delta x$ (a basic Fourier-transform fact). Since $p = \\hbar k$, $\\Delta p = \\hbar\\Delta k \\gtrsim \\hbar/\\Delta x$, i.e.

$$\\Delta x\\,\\Delta p \\gtrsim \\hbar \\quad(\\text{sharp bound } \\hbar/2).$$

For an electron confined to $\\Delta x \\approx 0.1\\,\\text{nm} = 10^{-10}\\,\\text{m}$:

$$\\Delta p \\gtrsim \\frac{\\hbar}{\\Delta x} = \\frac{1.05\\times10^{-34}}{10^{-10}} \\approx 10^{-24}\\,\\text{kg·m/s},$$

so $\\Delta v = \\Delta p/m_e \\approx 10^{-24}/9.1\\times10^{-31} \\approx 1\\times10^6\\,\\text{m/s}$. Confining an electron to atomic size forces a momentum spread corresponding to ~$10^6\\,\\text{m/s}$ — comparable to actual orbital speeds, which is *why* atoms are the size they are: squeezing the electron smaller costs prohibitive kinetic energy.`,
      },
      glossedOver: 'We worked single-particle. Identical-particle statistics (the wave’s symmetry) and field quantization are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'De Broglie’s wave is the one-particle sector of a quantum field; its phase is gauge-dependent, its statistics dictate boson/fermion behavior, and macroscopic matter-wave coherence powers precision physics and tests of quantum limits.',
      equationForms: [
        { latex: '\\psi(x) = \\langle x | \\psi\\rangle,\\quad \\psi \\to e^{i e\\chi/\\hbar}\\psi', caption: 'wavefunction phase and U(1) gauge freedom' },
        { latex: '\\lambda_{\\text{th}} = \\dfrac{h}{\\sqrt{2\\pi m k_B T}}', caption: 'thermal de Broglie wavelength (onset of quantum statistics)' },
      ],
      body: `In the mature theory, de Broglie's matter wave is the single-particle wavefunction $\\psi = \\langle x|\\psi\\rangle$, and ultimately the one-particle sector of a quantum field. Its overall phase is unobservable and **gauge-dependent** (a local $U(1)$ phase change is compensated by the electromagnetic potential), which is the deep origin of the Aharonov–Bohm effect — matter waves accrue a phase $\\tfrac{e}{\\hbar}\\oint A\\cdot d\\ell$ from a vector potential even where the field vanishes. The wave's exchange **symmetry** under particle swap splits matter into bosons (symmetric) and fermions (antisymmetric), the root of the Pauli principle and of Bose–Einstein vs. Fermi–Dirac statistics.

The **thermal de Broglie wavelength** $\\lambda_{\\text{th}}$ marks where wave nature becomes collective: when $\\lambda_{\\text{th}}$ approaches the interparticle spacing, classical statistics fail and quantum degeneracy sets in — Bose–Einstein condensation, superfluidity, Fermi seas. Macroscopic matter-wave coherence is now engineered: atom interferometers measure $g$, rotation, and fundamental constants at extraordinary precision; matter-wave interference has been demonstrated for molecules of thousands of atomic mass units, probing the quantum-classical boundary and proposed gravitational decoherence. De Broglie's own pilot-wave interpretation, dismissed for decades, survives as **Bohmian mechanics**, an empirically equivalent (nonlocal, deterministic) reading of the same wave — a live thread in quantum foundations. The 1924 thesis question "can particles be waves?" now anchors quantum statistics, gauge physics, metrology, and foundational debate.`,
      keyIdeas: [
        'Wavefunction phase is gauge-dependent ⇒ Aharonov–Bohm; exchange symmetry ⇒ boson/fermion statistics.',
        'Thermal de Broglie wavelength sets the onset of quantum degeneracy (BEC, Fermi seas).',
        'Matter-wave coherence drives precision metrology and tests of the quantum-classical boundary; pilot-wave/Bohmian reading persists.',
      ],
      workedExample: {
        prompt: 'Estimate the temperature at which a dilute gas of rubidium-87 atoms ($m \\approx 1.4\\times10^{-25}\\,\\text{kg}$) at density $n \\approx 10^{19}\\,\\text{m}^{-3}$ undergoes Bose–Einstein condensation.',
        solution: `BEC sets in when the thermal de Broglie wavelength reaches the interparticle spacing, $n\\lambda_{\\text{th}}^3 \\sim 1$, i.e. $\\lambda_{\\text{th}} \\sim n^{-1/3} \\approx (10^{19})^{-1/3} \\approx 4.6\\times10^{-7}\\,\\text{m}$.

Invert $\\lambda_{\\text{th}} = \\dfrac{h}{\\sqrt{2\\pi m k_B T}}$ for $T$:

$$T \\sim \\frac{h^2}{2\\pi m k_B \\lambda_{\\text{th}}^2} \\approx \\frac{(6.6\\times10^{-34})^2}{2\\pi(1.4\\times10^{-25})(1.38\\times10^{-23})(4.6\\times10^{-7})^2}.$$

This evaluates to $T \\sim 10^{-7}\\,\\text{K}$ — hundreds of nanokelvin, exactly the regime where Cornell, Wieman, and Ketterle achieved BEC in 1995. The macroscopic overlap of de Broglie waves *is* the condensate.`,
      },
    },
  ],
  connections: [
    { toId: 'planck-einstein', relationship: 'extends to matter the photon relation of' },
    { toId: 'schrodinger', relationship: 'is the plane-wave solution that motivated' },
    { toId: 'fourier', relationship: 'makes position and momentum conjugate variables of' },
    { toId: 'ideal-gas', relationship: 'sets via the thermal wavelength the quantum-degeneracy limit of' },
  ],
  viz: {
    component: 'WavelengthMomentum',
    kind: 'interactive',
    defaultParams: { velocity: 1e6, mass: 9.1e-31 },
    caption: 'Slide a particle’s mass and velocity and watch its de Broglie wavelength grow as momentum shrinks — visible for electrons, vanishing for baseballs.',
    whatToTry: [
      'Slow an electron down and watch its wavelength grow.',
      'Switch to a heavier particle and see the wavelength collapse.',
      'Find the speed where λ matches an atomic spacing (diffraction regime).',
    ],
  },
  primarySources: [
    {
      authors: 'L. de Broglie',
      title: 'Recherches sur la théorie des quanta',
      venue: 'Doctoral thesis, University of Paris',
      year: 1924,
      note: 'proposes matter waves',
      primary: true,
    },
    {
      authors: 'C. Davisson & L. Germer',
      title: 'Diffraction of Electrons by a Crystal of Nickel',
      venue: 'Physical Review 30, 705',
      year: 1927,
      url: 'https://doi.org/10.1103/PhysRev.30.705',
      note: 'experimental confirmation of electron waves',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'D. J. Griffiths', title: 'Introduction to Quantum Mechanics', venue: 'Cambridge University Press', year: 2018 },
    { authors: 'M. Arndt et al.', title: 'Wave–particle duality of C60 molecules', venue: 'Nature 401, 680', year: 1999 },
  ],
  historyNote: `De Broglie's 1924 thesis was so audacious — matter waves had zero experimental support — that his examiners were unsure how to judge it. Einstein, asked for an opinion, endorsed it warmly ("he has lifted a corner of the great veil"), which secured de Broglie his doctorate. Three years later Davisson and Germer's electron-diffraction experiment (partly serendipitous, after a lab accident recrystallized their nickel target) confirmed the wavelength, and de Broglie received the 1929 Nobel Prize.

His thesis directly spurred Schrödinger: at a seminar, Peter Debye reportedly remarked that a wave ought to have a wave equation — prompting Schrödinger to go find it over a 1925 Christmas holiday, producing the equation that bears his name.`,
};

export default deBroglie;
