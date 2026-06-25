import type { Equation } from '../types';

const idealGas: Equation = {
  id: 'ideal-gas',
  name: 'The Ideal Gas Law',
  nickname: 'the bridge from atoms to thermometers',
  canonicalLatex: 'PV = nRT',
  canonicalAlt: 'P times V equals n times R times T',
  alternativeForms: [
    { latex: 'PV = N k_B T', label: 'per-molecule form (N molecules, Boltzmann constant)' },
    { latex: 'P = \\rho\\,\\dfrac{R}{M}\\,T', label: 'in terms of mass density ρ' },
    { latex: '\\Big(P + \\dfrac{a n^2}{V^2}\\Big)(V - nb) = nRT', label: 'van der Waals correction for real gases' },
  ],
  fields: ['thermodynamics', 'chemistry'],
  era: { display: '1834', sortKey: 1834 },
  discoverers: [
    { name: 'Émile Clapeyron', note: 'combined the gas laws into PV = nRT, 1834' },
    { name: 'Boyle, Charles, Gay-Lussac, Avogadro', note: 'the empirical component laws' },
  ],
  oneLine: 'Pressure, volume, and temperature of a gas are locked together: squeeze or heat it and the other two must respond.',
  significance:
    'The ideal gas law unifies the separate empirical laws of Boyle, Charles, and Avogadro into one relation and defines the absolute (Kelvin) temperature scale. It is the simplest equation of state and the workhorse of chemistry, meteorology, and engineering. Crucially, it is *derivable* from the kinetic theory of atoms, making it a historic empirical bridge between the macroscopic world of gauges and thermometers and the microscopic world of molecules in motion.',
  applications: [
    'Chemistry: stoichiometry of gases, reaction yields, partial pressures',
    'Engines, refrigeration, and HVAC thermodynamic cycles',
    'Weather and atmospheric science (pressure, density, lapse rates)',
    'Scuba diving gas planning; airbags, tire pressures',
  ],
  symbols: [
    { symbol: 'P', name: 'pressure', meaning: 'force per unit area exerted by the gas', units: 'Pa = N/m²' },
    { symbol: 'V', name: 'volume', meaning: 'volume occupied by the gas', units: 'm³' },
    { symbol: 'n', name: 'amount', meaning: 'number of moles of gas', units: 'mol' },
    { symbol: 'R', name: 'gas constant', meaning: 'universal gas constant, 8.314', units: 'J/(mol·K)' },
    { symbol: 'T', name: 'temperature', meaning: 'absolute temperature', units: 'K' },
    { symbol: 'N', name: 'molecule count', meaning: 'number of gas molecules', units: 'dimensionless' },
    { symbol: 'k_B', name: 'Boltzmann constant', meaning: 'R per molecule, 1.381×10⁻²³', units: 'J/K' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'Squeeze a gas and its pressure rises; heat it and it pushes harder or swells. Three dials — pressure, volume, temperature — that move together.',
      equationForms: [{ latex: 'PV = nRT', caption: 'the three dials of a gas, tied together' }],
      body: `Air is restless. It's made of countless tiny molecules zipping around and drumming on every surface they hit — that drumming is **pressure**. The ideal gas law is the bookkeeping of that drumming.

Three things describe a trapped gas: how hard it pushes (**pressure**), how much room it has (**volume**), and how hot it is (**temperature**). The law says you can't change one without the others responding. Squeeze a balloon (less volume) and the pressure inside climbs. Warm it up and it swells or pushes harder. Leave a sealed bottle in a hot car and the pressure rises until — sometimes — it pops.

This single relationship is why bread rises, why a hot-air balloon floats, why your ears pop on a plane, and why divers must ascend slowly. It was also a clue, later confirmed, that heat is really just molecules moving faster.`,
      keyIdeas: [
        'Gas pressure is molecules drumming on the walls.',
        'Pressure, volume, and temperature change together.',
        'Heating a sealed gas raises its pressure.',
      ],
      glossedOver: 'We use "temperature" loosely. The law needs the *absolute* (Kelvin) scale where 0 means molecules barely move — Level 2.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        '$PV = nRT$ ties pressure, volume, moles, and absolute temperature, with $R = 8.314\\,\\text{J/(mol·K)}$. It contains Boyle’s and Charles’s laws as special cases.',
      equationForms: [
        { latex: 'PV = nRT' },
        { latex: '\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}', caption: 'combined gas law (fixed amount)' },
      ],
      body: `For $n$ moles of gas, $PV = nRT$ with temperature $T$ in **kelvin** ($T_{\\text{K}} = T_{\\text{C}} + 273.15$) — using Celsius would break the law, since doubling from 10°C to 20°C does *not* double the molecular energy.

Hold two variables fixed and the others follow. At constant temperature, $PV = \\text{const}$ (**Boyle's law**): halve the volume, double the pressure. At constant pressure, $V \\propto T$ (**Charles's law**): heat it and it expands. At constant volume, $P \\propto T$. One mole at $0^\\circ\\text{C}$ and atmospheric pressure occupies $22.4\\,\\text{L}$ — a number every chemistry student meets.`,
      keyIdeas: [
        'Always use absolute temperature (kelvin).',
        'Boyle ($PV$=const), Charles ($V\\propto T$) are special cases.',
        'One mole at STP ≈ 22.4 L.',
      ],
      workedExample: {
        prompt: 'A sealed $2.0\\,\\text{L}$ container of gas at $300\\,\\text{K}$ and $1.0\\,\\text{atm}$ is heated to $450\\,\\text{K}$ at constant volume. What is the new pressure?',
        solution: `Volume and amount are fixed, so $P/T$ is constant:

$$\\frac{P_1}{T_1} = \\frac{P_2}{T_2} \\;\\Rightarrow\\; P_2 = P_1\\frac{T_2}{T_1} = 1.0\\ \\text{atm}\\times\\frac{450}{300} = 1.5\\ \\text{atm}.$$

A 50% temperature rise (in kelvin) gives a 50% pressure rise. Had we used Celsius (27°C → 177°C) the ratio would be wrong — a classic mistake.`,
      },
      misconceptions: [
        {
          claim: 'You can plug temperature in Celsius if you’re consistent.',
          correction:
            'No. $PV = nRT$ requires absolute (kelvin) temperature because $P$ and $V$ go to zero only at $T = 0\\,\\text{K}$. Ratios in Celsius give nonsense (and a negative temperature would imply negative pressure).',
        },
      ],
      glossedOver: 'We treat the gas as "ideal." Real gases deviate at high pressure / low temperature — the van der Waals fix at Level 4.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Kinetic theory derives $PV = Nk_BT$ from molecular collisions, identifying temperature with mean kinetic energy: $\\tfrac32 k_B T = \\langle \\tfrac12 m v^2\\rangle$.',
      equationForms: [
        { latex: 'P = \\dfrac{1}{3}\\dfrac{N}{V} m\\langle v^2\\rangle' },
        { latex: '\\tfrac{3}{2}k_B T = \\big\\langle \\tfrac12 m v^2\\big\\rangle', caption: 'temperature is mean kinetic energy' },
      ],
      body: `Model the gas as $N$ point molecules of mass $m$ bouncing elastically in a box, with no interactions except collisions. Computing the momentum delivered to a wall per unit time gives the pressure $P = \\tfrac13 (N/V) m\\langle v^2\\rangle$. Comparing with $PV = Nk_BT$ forces the identification

$$\\tfrac32 k_B T = \\big\\langle \\tfrac12 m v^2\\big\\rangle,$$

i.e. **temperature is (proportional to) the average translational kinetic energy** per molecule. This is the **equipartition theorem**: each quadratic degree of freedom holds $\\tfrac12 k_B T$. The molecular speeds follow the **Maxwell–Boltzmann distribution**, and $R = N_A k_B$ links the molar and per-molecule constants. The assumptions (point particles, no attraction, elastic collisions) define "ideal" and tell you exactly when the law should fail.`,
      keyIdeas: [
        'Pressure = rate of momentum transfer from molecular collisions.',
        'Temperature ∝ mean kinetic energy (equipartition: $\\tfrac12 k_BT$ per DOF).',
        '$R = N_A k_B$; ideal = point particles, no interactions.',
      ],
      workedExample: {
        prompt: 'Estimate the root-mean-square speed of nitrogen molecules ($m = 4.65\\times10^{-26}\\,\\text{kg}$) at room temperature $T = 300\\,\\text{K}$.',
        solution: `From $\\tfrac32 k_B T = \\tfrac12 m\\langle v^2\\rangle$,

$$v_{\\text{rms}} = \\sqrt{\\langle v^2\\rangle} = \\sqrt{\\frac{3 k_B T}{m}} = \\sqrt{\\frac{3\\times 1.38\\times10^{-23}\\times 300}{4.65\\times10^{-26}}}.$$

Numerator $= 1.24\\times10^{-20}$; dividing gives $\\langle v^2\\rangle \\approx 2.67\\times10^{5}$, so $v_{\\text{rms}} \\approx 517\\ \\text{m/s}$ — faster than sound, which is why gases mix and effuse quickly.`,
      },
      glossedOver: 'We ignored molecular size and attraction. Including them (van der Waals) and quantum statistics at low $T$ is the higher-level refinement.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'The ideal gas law is the leading term of the virial expansion; real-gas corrections, the Sackur–Tetrode entropy, and the breakdown into quantum statistics define its domain.',
      equationForms: [
        { latex: '\\dfrac{PV}{nRT} = 1 + B_2(T)\\dfrac{n}{V} + B_3(T)\\dfrac{n^2}{V^2} + \\cdots', caption: 'virial expansion' },
        { latex: 'Z = \\dfrac{1}{N!}\\Big(\\dfrac{V}{\\lambda_{\\text{th}}^3}\\Big)^N,\\quad \\lambda_{\\text{th}} = \\dfrac{h}{\\sqrt{2\\pi m k_B T}}' },
      ],
      body: `Statistical mechanics derives the law from the partition function $Z$ of a non-interacting gas; $P = k_B T\\,\\partial\\ln Z/\\partial V$ recovers $PV = Nk_BT$ exactly, and the free energy yields the **Sackur–Tetrode** entropy — which requires the $1/N!$ indistinguishability factor (resolving the Gibbs paradox) and Planck's constant via the thermal wavelength $\\lambda_{\\text{th}}$, a quantum fingerprint hiding inside a classical law.

Real gases are organized by the **virial expansion** in density; the second coefficient $B_2(T)$ captures pair interactions (negative at low $T$ where attraction dominates, positive at high $T$). The **van der Waals** equation is the simplest closed model, with $a$ for attraction and $b$ for finite molecular volume, and it qualitatively predicts the liquid–gas critical point and phase transition. The ideal law holds when the gas is **dilute and hot**: mean spacing $\\gg$ molecular size and $\\gg \\lambda_{\\text{th}}$. When $\\lambda_{\\text{th}}$ becomes comparable to the spacing (cold, dense), classical statistics fail and Bose–Einstein or Fermi–Dirac statistics take over.`,
      keyIdeas: [
        'Ideal law = leading virial term; $B_2(T)$ encodes pair interactions.',
        'Sackur–Tetrode entropy needs $1/N!$ (Gibbs paradox) and $h$ — quantum input.',
        'Validity: dilute, hot; fails when $\\lambda_{\\text{th}}\\sim$ interparticle spacing.',
      ],
      workedExample: {
        prompt: 'Use the van der Waals equation to express the critical temperature in terms of $a$ and $b$.',
        solution: `The critical point is the inflection where $\\partial P/\\partial V = \\partial^2 P/\\partial V^2 = 0$. Applying both conditions to $P = \\dfrac{nRT}{V-nb} - \\dfrac{an^2}{V^2}$ yields

$$V_c = 3nb,\\quad T_c = \\frac{8a}{27 R b},\\quad P_c = \\frac{a}{27 b^2}.$$

The combination $\\dfrac{P_c V_c}{nRT_c} = \\dfrac{3}{8}$ is *universal* (independent of $a,b$) — an early hint of the corresponding-states principle and critical universality, which the renormalization group later explained.`,
      },
      glossedOver: 'The classical-to-quantum crossover is sketched; degenerate Bose/Fermi gases and their equations of state are the Level 5 territory.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'PV = nRT is the high-temperature, non-degenerate limit of quantum gases; the full landscape includes Bose–Einstein condensation, Fermi degeneracy pressure, and the equation of state of matter from white dwarfs to ultracold atoms.',
      equationForms: [
        { latex: 'PV = N k_B T\\Big[1 \\pm \\dfrac{1}{2^{5/2}}\\,n\\lambda_{\\text{th}}^3 + \\cdots\\Big]', caption: 'quantum virial: + for fermions, − for bosons' },
        { latex: 'P_{\\text{deg}} \\propto \\Big(\\dfrac{N}{V}\\Big)^{5/3}', caption: 'non-relativistic Fermi degeneracy pressure (T-independent)' },
      ],
      body: `The ideal gas law survives as the **classical limit** ($n\\lambda_{\\text{th}}^3 \\ll 1$) of the quantum ideal gas. The leading quantum correction already splits the two statistics: bosons attract statistically (lowering pressure) and fermions repel (raising it). As $T$ drops or density rises, the behaviour diverges dramatically. **Bosons** undergo Bose–Einstein condensation, with a macroscopic ground-state occupation — realized in dilute ultracold atomic gases (Cornell–Wieman–Ketterle) where the BEC–BCS crossover and unitary Fermi gas are now precision testbeds. **Fermions** develop a degeneracy pressure that persists at $T=0$, $P \\propto (N/V)^{5/3}$, independent of temperature — the pressure that supports white dwarfs (until the relativistic $4/3$ scaling and the Chandrasekhar limit) and neutron stars.

These regimes connect to the broadest themes: the equation of state $P(\\rho, T)$ is what closes the equations of stellar structure and cosmology, and the critical behaviour of the liquid–gas transition shares universality classes with magnets via the renormalization group. The schoolroom $PV = nRT$ is the gentle dilute corner of a vast phase diagram that runs from a balloon to the interior of a collapsed star.`,
      keyIdeas: [
        'Ideal law = non-degenerate ($n\\lambda_{\\text{th}}^3\\ll1$) limit of quantum gases.',
        'Bosons → BEC; fermions → degeneracy pressure $P\\propto (N/V)^{5/3}$ at $T=0$.',
        'Quantum equations of state support white dwarfs/neutron stars and ultracold-atom physics.',
      ],
      workedExample: {
        prompt: 'Explain why a white dwarf is supported against gravity by a pressure that does not vanish at zero temperature.',
        solution: `As a star cools, classical $PV=nRT$ would predict $P\\to 0$ and collapse. But electrons are **fermions**: the Pauli exclusion principle forbids two from sharing a quantum state, so even at $T=0$ they fill momentum states up to the Fermi momentum, giving a **degeneracy pressure**

$$P_{\\text{deg}} \\propto \\Big(\\frac{N}{V}\\Big)^{5/3}\\quad(\\text{non-relativistic}),$$

independent of $T$. This pressure halts the collapse. When electrons become relativistic at high density the exponent softens to $4/3$, which scales the same way as gravity — so above the **Chandrasekhar mass** ($\\approx 1.4\\,M_\\odot$) no equilibrium exists and the star collapses to a neutron star or black hole. The failure of the ideal gas law at high density is literally a matter of stellar life and death.`,
      },
    },
  ],
  connections: [
    { toId: 'boltzmann-entropy', relationship: 'shares the kinetic/statistical foundation with' },
    { toId: 'boltzmann-transport', relationship: 'is the equilibrium limit of the gas dynamics in' },
    { toId: 'maxwell', relationship: 'has molecular speeds set by the same Maxwell distribution kin to' },
  ],
  viz: {
    component: 'IdealGasBox',
    kind: 'interactive',
    defaultParams: { temperature: 300, volume: 1, particles: 80 },
    caption: 'A box of bouncing molecules with live pressure and temperature readouts; change the volume or temperature and watch PV = nRT hold.',
    whatToTry: [
      'Shrink the volume at fixed temperature and watch pressure rise (Boyle).',
      'Raise the temperature and watch molecules speed up and hammer the walls harder.',
      'Compare the measured PV/nT to R as you change conditions.',
    ],
  },
  primarySources: [
    {
      authors: 'É. Clapeyron',
      title: 'Mémoire sur la puissance motrice de la chaleur',
      venue: 'Journal de l’École Polytechnique',
      year: 1834,
      note: 'first combination of the gas laws into PV = nRT form',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'F. Reif', title: 'Fundamentals of Statistical and Thermal Physics', venue: 'McGraw-Hill', year: 1965 },
    { authors: 'D. Schroeder', title: 'An Introduction to Thermal Physics', venue: 'Addison-Wesley', year: 2000 },
  ],
  historyNote: `The ideal gas law is a synthesis: Boyle (1662) found $P\\propto 1/V$, Charles and Gay-Lussac (c. 1800) found $V\\propto T$, and Avogadro (1811) proposed equal volumes hold equal numbers of molecules. Clapeyron stitched them together in 1834. The deepest payoff came later, when Maxwell, Boltzmann, and Gibbs showed the law *follows* from atoms in motion — at a time when atoms were still controversial.

The gas constant $R$ and Boltzmann's constant $k_B$ were long known only empirically; the 2019 SI redefinition turned the relation around, *fixing* $k_B$ to an exact value and thereby defining the kelvin itself in terms of energy — the ideal gas law promoted from description to definition.`,
};

export default idealGas;
