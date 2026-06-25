import type { Equation } from '../types';

const planckEinstein: Equation = {
  id: 'planck-einstein',
  name: 'Planck–Einstein Relation',
  nickname: 'the equation that quantized light',
  canonicalLatex: 'E=h\\nu',
  canonicalAlt: 'E equals h nu',
  alternativeForms: [
    { latex: 'E = \\hbar\\omega', label: 'with angular frequency ω and reduced ℏ' },
    { latex: 'E = \\dfrac{hc}{\\lambda}', label: 'in terms of wavelength' },
  ],
  fields: ['quantum', 'physics'],
  era: { display: '1900–1905', sortKey: 1900 },
  discoverers: [
    { name: 'Max Planck', note: 'introduced the quantum of action h to fit blackbody radiation, 1900' },
    { name: 'Albert Einstein', note: 'light quanta (photons) explaining the photoelectric effect, 1905' },
  ],
  oneLine: 'Light comes in discrete packets whose energy is set by their frequency — the birth of quantum theory.',
  significance:
    'The Planck–Einstein relation introduced the quantum: energy exchanged with light is not continuous but comes in packets ("quanta," later photons) of size hν. It resolved the ultraviolet catastrophe of blackbody radiation and explained the photoelectric effect, launching quantum mechanics. The constant h is the fundamental scale separating classical from quantum behavior and recurs throughout modern physics.',
  applications: [
    'Solar cells and photodetectors (photoelectric effect)',
    'LEDs and lasers (photon energy sets color)',
    'Spectroscopy and chemical analysis; photosynthesis',
    'Digital cameras, night-vision, and quantum technologies',
  ],
  symbols: [
    { symbol: 'E', name: 'photon energy', meaning: 'energy of a single quantum of light', units: 'J (or eV)' },
    { symbol: 'h', name: 'Planck constant', meaning: 'the quantum of action, 6.626×10⁻³⁴', units: 'J·s' },
    { symbol: '\\nu', name: 'frequency', meaning: 'oscillation frequency of the light', units: 'Hz' },
    { symbol: '\\hbar', name: 'reduced Planck constant', meaning: 'h/2π', units: 'J·s' },
    { symbol: '\\lambda', name: 'wavelength', meaning: 'wavelength of the light, c/ν', units: 'm' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Light isn’t a smooth stream — it arrives in tiny indivisible packets, and bluer light packs more punch per packet than redder light.',
      equationForms: [{ latex: 'E=h\\nu', caption: 'one packet’s energy = constant × its color (frequency)' }],
      body: `We used to think light was a smooth, continuous wave you could dim down infinitely. Quantum theory revealed something stranger: light comes in **indivisible packets** called photons, like coins rather than a flowing liquid. You can have one photon or two, but never half a photon.

The energy of each packet depends only on the light's **color** (frequency): blue and ultraviolet photons are individually energetic; red and infrared photons are individually feeble. This is why ultraviolet light gives you sunburn while the much "warmer"-feeling infrared from a heat lamp does not — a single UV photon carries enough energy to damage skin cells, while infrared photons individually can't, no matter how many arrive.

This tiny idea — that energy comes in lumps — was the crack that split classical physics wide open and gave us the quantum world.`,
      keyIdeas: [
        'Light comes in indivisible packets (photons).',
        'A photon’s energy depends on its frequency (color), not its brightness.',
        'Bluer/UV photons are individually more energetic than red/infrared.',
      ],
      glossedOver: 'We say light is "packets," but it’s also a wave — the wave/particle duality resolved at Level 3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Each photon carries energy $E = h\\nu$. Brightness is the *number* of photons; color (frequency) sets each photon’s energy.',
      equationForms: [
        { latex: 'E = h\\nu = \\dfrac{hc}{\\lambda}' },
        { latex: 'KE_{\\max} = h\\nu - \\phi', caption: 'photoelectric effect (ejected electron energy)' },
      ],
      body: `Planck's constant $h = 6.63\\times10^{-34}\\,\\text{J·s}$ is tiny, so a single photon's energy is minuscule — but the relation $E = h\\nu$ has sharp consequences. A brighter light means *more photons*, not more energetic ones; the energy *per* photon is fixed by frequency.

This explains the **photoelectric effect**, which puzzled classical physics: shining light on a metal can knock out electrons, but only if the light's frequency is high enough — no amount of dim red light works, while even faint blue light does. Einstein's explanation: each electron is freed by *one* photon, and only if that photon carries more than the metal's "escape energy" (the work function $\\phi$). The leftover becomes the electron's kinetic energy, $KE_{\\max} = h\\nu - \\phi$. The visualization lets you tune the light's frequency and watch electrons fly off only past a threshold.`,
      keyIdeas: [
        'Photon energy $E = h\\nu = hc/\\lambda$; brightness = number of photons.',
        'Photoelectric effect: only high-enough frequency ejects electrons.',
        'Leftover energy is the electron’s kinetic energy: $KE = h\\nu - \\phi$.',
      ],
      workedExample: {
        prompt: 'A green photon has wavelength $\\lambda = 500\\,\\text{nm}$. Find its energy in joules and electronvolts.',
        solution: `Use $E = hc/\\lambda$ with $hc = 1.99\\times10^{-25}\\,\\text{J·m}$:

$$E = \\frac{1.99\\times10^{-25}}{500\\times10^{-9}} = 3.98\\times10^{-19}\\ \\text{J}.$$

Convert to eV (divide by $1.6\\times10^{-19}$):

$$E \\approx \\frac{3.98\\times10^{-19}}{1.6\\times10^{-19}} \\approx 2.5\\ \\text{eV}.$$

A handy rule: $E(\\text{eV}) \\approx 1240/\\lambda(\\text{nm})$. Visible photons are a few eV — enough to drive chemistry (vision, photosynthesis) but not, individually, to ionize most atoms.`,
      },
      misconceptions: [
        {
          claim: 'A very bright red light can do anything a blue light can, given enough intensity.',
          correction:
            'No. If each red photon lacks the energy to free an electron (or break a bond), piling on more red photons doesn’t help — each interaction is one photon at a time. Frequency, not intensity, sets the per-photon energy.',
        },
      ],
      glossedOver: 'We treated photons as little bullets. They also interfere like waves — duality, at Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Combined with $p = h/\\lambda$, $E = h\\nu$ makes light both wave and particle; it derives Planck’s blackbody law and connects to the photon’s relativistic $E = pc$.',
      equationForms: [
        { latex: 'E = \\hbar\\omega,\\quad \\vec p = \\hbar\\vec k', caption: 'energy–momentum of a photon' },
        { latex: 'u(\\nu) = \\dfrac{8\\pi h\\nu^3}{c^3}\\dfrac{1}{e^{h\\nu/kT}-1}', caption: 'Planck blackbody spectrum' },
      ],
      body: `Planck originally introduced $E = h\\nu$ as a desperate mathematical fix to derive the **blackbody spectrum** $u(\\nu)$ without the "ultraviolet catastrophe" (classical physics predicted infinite energy at high frequency). Quantizing the oscillator energies in units of $h\\nu$ cuts off the high-frequency modes — the Boltzmann factor $e^{-h\\nu/kT}$ suppresses quanta too expensive to excite — yielding the correct, finite spectrum and recovering the classical Rayleigh–Jeans law only when $h\\nu \\ll kT$.

Einstein went further: the quantum is a real **particle**, the photon, with energy $E = \\hbar\\omega$ and momentum $\\vec p = \\hbar\\vec k$. Since photons are massless, the relativistic relation $E = pc$ holds, consistent with $E = h\\nu$ and $p = h/\\lambda$ (because $\\nu\\lambda = c$). The **Compton effect** — X-rays scattering off electrons with a wavelength shift — confirmed photon momentum directly. This frequency↔energy, wavelength↔momentum dictionary is the bridge to de Broglie's matter waves and the Schrödinger equation.`,
      keyIdeas: [
        'Quantizing oscillator energies in units of $h\\nu$ fixes the blackbody spectrum.',
        'Photon: $E = \\hbar\\omega$, $p = \\hbar k$, massless so $E = pc$.',
        'Compton scattering confirms photon momentum; bridges to matter waves.',
      ],
      workedExample: {
        prompt: 'Show that Planck’s law reduces to the classical Rayleigh–Jeans result when $h\\nu \\ll kT$.',
        solution: `Planck's law has the factor $\\dfrac{h\\nu}{e^{h\\nu/kT}-1}$. For $h\\nu \\ll kT$, expand the exponential: $e^{h\\nu/kT} \\approx 1 + \\dfrac{h\\nu}{kT}$, so

$$\\frac{h\\nu}{e^{h\\nu/kT}-1} \\approx \\frac{h\\nu}{h\\nu/kT} = kT.$$

Each mode then carries the classical energy $kT$ (equipartition), and $u(\\nu) \\to \\dfrac{8\\pi\\nu^2}{c^3}kT$ — exactly **Rayleigh–Jeans**, which diverges as $\\nu\\to\\infty$ (the ultraviolet catastrophe). The quantum factor $h\\nu$ is precisely what tames the high-frequency divergence: modes with $h\\nu \\gg kT$ are exponentially frozen out. Classical physics is the $h\\to0$ limit.`,
      },
      glossedOver: 'We quantized "by hand." The full quantum theory of the EM field (QED) explains photons as field excitations — Level 4/5.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'In quantum field theory the photon is the quantized excitation of the EM field; h sets the commutator scale, and $E = \\hbar\\omega$ labels the energy of each field mode (Fock states).',
      equationForms: [
        { latex: '\\hat H = \\sum_{\\vec k,s} \\hbar\\omega_k\\Big(\\hat a^\\dagger_{\\vec k,s}\\hat a_{\\vec k,s} + \\tfrac12\\Big)', caption: 'quantized EM field: photons are quanta of each mode' },
        { latex: '[\\hat x,\\hat p] = i\\hbar', caption: 'h sets the scale of quantum noncommutativity' },
      ],
      body: `Quantizing the electromagnetic field promotes each Fourier mode to a quantum harmonic oscillator; its excitations are **photons**, with the $n$-photon (Fock) state of mode $(\\vec k, s)$ carrying energy $n\\hbar\\omega_k$. So $E = \\hbar\\omega$ is now the energy *ladder spacing* of a field mode, and creation/annihilation operators $\\hat a^\\dagger, \\hat a$ add or remove single quanta. This framework (QED) explains spontaneous emission, the Lamb shift, and the Casimir effect (from the zero-point $\\tfrac12\\hbar\\omega$ per mode), and makes $E = h\\nu$ a statement about field excitations rather than little bullets.

More broadly, $h$ (or $\\hbar$) is *the* quantum scale: it sets the size of the fundamental commutator $[\\hat x,\\hat p] = i\\hbar$, the area of a phase-space cell ($h$ per degree of freedom, which fixes the entropy normalization in statistical mechanics), and the action scale at which path-integral phases $e^{iS/\\hbar}$ stop canceling classically. The classical limit is $\\hbar\\to 0$ (or actions $\\gg \\hbar$). Modern metrology has inverted the relation: since 2019 the **kilogram is defined by fixing $h$**, via the Kibble balance — energy and mass tied through $E = h\\nu$ and $E = mc^2$.`,
      keyIdeas: [
        'Photons are quantized field-mode excitations; $E = \\hbar\\omega$ is the ladder spacing.',
        '$h$ sets $[\\hat x,\\hat p]=i\\hbar$, the phase-space cell, and the path-integral phase.',
        'The SI kilogram is now defined by fixing $h$ (Kibble balance).',
      ],
      workedExample: {
        prompt: 'Why does each electromagnetic mode contribute a zero-point energy, and what observable does it produce?',
        solution: `Each field mode is a quantum harmonic oscillator with energy levels $E_n = \\hbar\\omega(n + \\tfrac12)$. Even the ground state ($n=0$) has $\\tfrac12\\hbar\\omega \\neq 0$ — irreducible **zero-point energy**, a direct consequence of $[\\hat x,\\hat p]=i\\hbar$ (you can't have both zero amplitude and zero momentum).

Summed over all modes this is formally infinite, but *differences* are physical. Between two close conducting plates, the allowed modes are restricted, so the zero-point energy is lower inside than outside, producing a measurable attractive **Casimir force** $\\propto \\hbar c/d^4$. Measured to percent accuracy, it is direct evidence that the quantized field — and the $\\tfrac12\\hbar\\omega$ per mode implied by $E = h\\nu$ — is real.`,
      },
      glossedOver: 'We assumed h is simply a constant. Whether it (and quantum theory) is truly fundamental, and interpretational issues, touch Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'h is the action quantum threading all of quantum theory; its appearance unifies thermodynamics, information, and gravity, and frames open questions from the measurement problem to the Planck scale.',
      equationForms: [
        { latex: '\\ell_P = \\sqrt{\\dfrac{\\hbar G}{c^3}},\\quad t_P = \\sqrt{\\dfrac{\\hbar G}{c^5}}', caption: 'h combines with G, c to set the Planck scale' },
        { latex: 'T_H = \\dfrac{\\hbar c^3}{8\\pi G M k_B}', caption: 'Hawking temperature — h enters gravity' },
      ],
      body: `As the **quantum of action**, $h$ is the connective tissue of modern physics. It fixes the absolute entropy scale (the Sackur–Tetrode formula and the third law need $h$ to count phase-space cells), it appears in the fluctuation–dissipation theorem and the quantum limits of measurement and communication (Holevo bound), and combined with $G$ and $c$ it defines the **Planck scale** $\\ell_P, t_P, E_P$ where quantum gravity must take over. It even enters gravity directly through **Hawking radiation**: a black hole's temperature $T_H \\propto \\hbar$ vanishes classically, so its thermality is irreducibly quantum — a place where $E = h\\nu$, thermodynamics, and general relativity collide.

The relation also anchors the deepest open questions. Quantum **foundations** — the measurement problem, the status of the wavefunction, and interpretations (Copenhagen, many-worlds, Bohmian, objective-collapse) — concern exactly what the "quantum" introduced by $h\\nu$ means; proposals like gravitationally-induced collapse (Penrose, Diósi) predict tiny, possibly testable deviations tied to $\\hbar$ and $G$. Whether $h$ is truly constant across cosmic time, whether spacetime itself is quantized at $\\ell_P$, and how to reconcile the unitary $\\hbar$-evolution with gravitational physics (the information paradox) remain unresolved. Planck's reluctant 1900 fudge factor turned out to be one of the two or three most fundamental constants of nature.`,
      keyIdeas: [
        '$h$ sets the entropy/phase-space scale and the quantum limits of measurement and information.',
        'With $G, c$ it defines the Planck scale; it makes Hawking radiation an inherently quantum effect.',
        'It frames the open measurement problem and the search for quantum gravity.',
      ],
      workedExample: {
        prompt: 'Combine $h$, $G$, and $c$ to construct the Planck length, and explain its significance.',
        solution: `Seek a length $\\ell_P = G^a \\hbar^b c^d$. Matching dimensions ([G] = m³kg⁻¹s⁻², [ℏ] = kg m²s⁻¹, [c] = m s⁻¹) to a length gives $a = b = \\tfrac12$, $d = -\\tfrac32$:

$$\\ell_P = \\sqrt{\\frac{\\hbar G}{c^3}} \\approx 1.6\\times10^{-35}\\ \\text{m}.$$

Significance: at this scale the Compton wavelength of an object equals its Schwarzschild radius — i.e. the energy needed to localize a particle within $\\ell_P$ (from $E = h\\nu$, quantum) is enough to form a black hole around it (from GR). Quantum mechanics ($h$) and gravity ($G$) become equally important, so a sub-Planckian description requires quantum gravity. That $\\ell_P$ involves $h$ is why probing it needs energies $\\sim 10^{19}\\,\\text{GeV}$, far beyond experiment.`,
      },
    },
  ],
  connections: [
    { toId: 'de-broglie', relationship: 'is paired with the matter-wave relation of' },
    { toId: 'schrodinger', relationship: 'supplies the energy–frequency quantization built into' },
    { toId: 'mass-energy', relationship: 'gives the massless photon E = pc consistent with' },
    { toId: 'boltzmann-entropy', relationship: 'provides the Boltzmann factor that quantization combines with from' },
  ],
  viz: {
    component: 'Photoelectric',
    kind: 'interactive',
    defaultParams: { frequency: 6e14, workFunction: 2 },
    caption: 'A photoelectric-effect demo: tune the light’s frequency past the metal’s threshold and watch electrons eject with energy hν − φ.',
    whatToTry: [
      'Below the threshold frequency, no electrons emerge no matter how bright.',
      'Cross the threshold and watch electrons fly off; raise frequency for faster electrons.',
      'Change the metal (work function) and see the threshold shift.',
    ],
  },
  primarySources: [
    {
      authors: 'M. Planck',
      title: 'Zur Theorie des Gesetzes der Energieverteilung im Normalspectrum',
      venue: 'Verhandlungen der Deutschen Physikalischen Gesellschaft 2, 237',
      year: 1900,
      note: 'introduces the energy quantum hν',
      primary: true,
    },
    {
      authors: 'A. Einstein',
      title: 'Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt',
      venue: 'Annalen der Physik 17, 132',
      year: 1905,
      note: 'light quanta and the photoelectric effect',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'A. Pais', title: 'Subtle is the Lord: The Science and the Life of Albert Einstein', venue: 'Oxford University Press', year: 1982 },
    { authors: 'D. J. Griffiths', title: 'Introduction to Quantum Mechanics', venue: 'Cambridge University Press', year: 2018 },
  ],
  historyNote: `Planck called his 1900 quantization "an act of desperation" — a mathematical trick to fit the blackbody data that he spent years trying to explain away, never quite believing energy was truly granular. It was Einstein, in 1905, who took the quantum literally and proposed real particles of light to explain the photoelectric effect — the work for which he won the 1921 Nobel Prize (not relativity!).

Ironically, Planck later opposed Einstein's photon as too radical even as he championed Einstein's other work. The name "photon" wasn't coined until 1926 (by chemist Gilbert Lewis). The reluctant constant $h$ now defines the kilogram and underlies every quantum technology.`,
};

export default planckEinstein;
