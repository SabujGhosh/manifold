# BUILD PROMPT — "The Equations" : A Multi-Level Educational Web App

> Paste this entire file into Claude Code (VS Code) as the task. It is self-contained.
> Build the app described below in one coherent pass, then iterate on polish.

---

## 0. ROLE & MISSION

You are building a production-quality, static, single-page web application called **The Equations** (working title — pick a refined final name and make it a constant in config). Its purpose: explain **32 of the most consequential equations in human history** to *everyone from a curious 12-year-old to a working researcher*, by presenting each equation at **five distinct, selectable levels of proficiency**.

The same equation, on the same page, can be read as a fairy tale or as a research brief depending on a level switch. Nobody is talked down to; nobody is left behind.

The primary maintainer/reader is a physicist (PhD, nonlinear dynamics) who will *consume* this content seriously, so **rigor, honest caveats, and correct notation are non-negotiable**. Where something is simplified for a lower level, say so explicitly rather than stating a half-truth as fact. Never overclaim. Prefer "this is the leading-order picture; the full story requires X" over hand-waving.

This is a **real local/deployable app**, NOT a sandboxed artifact: `localStorage`, IndexedDB, service workers, and external CDNs are all permitted and encouraged where useful.

---

## 1. AUDIENCE & THE FIVE PROFICIENCY LEVELS

Every equation MUST have content authored at all five levels. Treat these as a strict rubric.

| # | Name | Assumed background | Goal of this level | Math allowed | Tone |
|---|------|--------------------|--------------------|--------------|------|
| **L1** | **Curious Visitor** | None. A bright child or non-technical adult. | "What is this, why should I care, what does it let humanity *do*?" | None or a single trivial number. Words + analogy only. | Storytelling, vivid, zero jargon. |
| **L2** | **High School** | Algebra, basic functions, graphs. | Understand the variables, read the equation, follow one concrete worked example. | Algebra, plotting, arithmetic. | Friendly teacher. |
| **L3** | **Undergraduate** | Calculus, linear algebra, intro physics/stats. | A derivation *sketch*, assumptions, units, domain of validity, why the form is what it is. | Calculus, vectors, probability, ODEs. | Lecture notes. |
| **L4** | **Graduate / Practitioner** | Full undergrad STEM degree. | Full derivation or rigorous statement, generalizations, edge cases, limits, connections to neighboring theory, how it's actually used. | Whatever the topic demands. | Seminar / textbook. |
| **L5** | **Expert / Researcher** | Domain specialist. | Modern formulation, deep structure, universality/symmetry, open problems, frontier, and primary-source pointers. | Unrestricted. | Review article. |

**Hard rules for level authoring:**
- Notation should **scale with level** (e.g., L2 may write `F = ma`; L4/L5 may write it as `d**p**/dt = Σ**F**` and discuss when mass is constant). Store multiple LaTeX forms.
- Each higher level should *add*, not merely *repeat*. A reader sliding up should feel they're climbing, not re-reading.
- Lower levels must remain **true**. If a simplification is load-bearing, add a one-line "⚠︎ what we glossed over" note that points to the level where it's resolved.
- Include at least one **worked example** at L2 and L3, and at least one **misconception** entry at L2–L4 where one commonly exists.

---

## 2. THE EQUATION CORPUS (all 32 — author every one)

Group by `era`/`field` for filtering, but each gets its own page. Canonical LaTeX is the *starting* form; add level-appropriate alternates. The `viz` column names the required interactive visualization (Section 9). "concept" = a non-numeric explanatory visual is acceptable.

| # | id (slug) | Name | Canonical form (LaTeX) | Primary field(s) | Era (sortKey) | Interactive viz |
|---|-----------|------|------------------------|------------------|---------------|-----------------|
| 1 | `pythagoras` | Pythagorean Theorem | `a^2 + b^2 = c^2` | mathematics, geometry | ~530 BCE (-530) | Draggable right triangle with squares on each side |
| 2 | `logarithms` | Logarithms | `\log(xy)=\log x+\log y` | mathematics | 1614 | Log/exp curve + slide-rule demo |
| 3 | `derivative` | The Derivative (Calculus) | `f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}` | mathematics, analysis | 1666 | Secant→tangent animation on a curve |
| 4 | `gravitation` | Newton's Universal Gravitation | `F=G\dfrac{m_1 m_2}{r^2}` | physics | 1687 | Two-body orbit sandbox |
| 5 | `newton-second` | Newton's Second Law | `\vec F=m\vec a` | physics, mechanics | 1687 | Force/mass → acceleration sandbox |
| 6 | `euler-identity` | Euler's Identity | `e^{i\pi}+1=0` | mathematics | 1748 | Rotating phasor on the unit circle tracing `e^{i\theta}` |
| 7 | `normal-distribution` | The Normal Distribution | `f(x)=\dfrac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}` | statistics | 1809 | μ, σ sliders + shaded area / CLT demo |
| 8 | `wave-equation` | The Wave Equation | `\dfrac{\partial^2 u}{\partial t^2}=c^2\dfrac{\partial^2 u}{\partial x^2}` | physics, PDE | 1746 | 1-D vibrating string, adjustable c, standing modes |
| 9 | `fourier` | The Fourier Transform | `\hat f(\xi)=\int_{-\infty}^{\infty} f(x)\,e^{-2\pi i x\xi}\,dx` | mathematics, signal | 1822 | Build a square wave from sines + live spectrum |
| 10 | `navier-stokes` | Navier–Stokes Equations | `\rho\!\left(\partial_t\vec v+\vec v\!\cdot\!\nabla\vec v\right)=-\nabla p+\mu\nabla^2\vec v+\vec f` | physics, fluids | 1845 | 2-D flow / vortex shedding (lightweight) |
| 11 | `boltzmann-entropy` | Boltzmann Entropy | `S=k\ln W` | physics, thermo | 1877 | Particles in a box, live microstate count |
| 12 | `maxwell` | Maxwell's Equations | `\nabla\!\cdot\!\vec E=\rho/\varepsilon_0,\ \nabla\!\cdot\!\vec B=0,\ \nabla\!\times\!\vec E=-\partial_t\vec B,\ \nabla\!\times\!\vec B=\mu_0\vec J+\mu_0\varepsilon_0\partial_t\vec E` | physics, EM | 1865 | EM wave propagation / field lines |
| 13 | `bayes` | Bayes' Theorem | `P(A\mid B)=\dfrac{P(B\mid A)\,P(A)}{P(B)}` | statistics | 1763 | Prior→posterior + disease-test base-rate calculator |
| 14 | `mass-energy` | Mass–Energy Equivalence | `E=mc^2` | physics | 1905 | Mass-defect / binding-energy calculator |
| 15 | `einstein-field` | Einstein Field Equations | `G_{\mu\nu}+\Lambda g_{\mu\nu}=\dfrac{8\pi G}{c^4}T_{\mu\nu}` | physics, GR | 1915 | Spacetime curvature grid + geodesic on a warped sheet |
| 16 | `planck-einstein` | Planck–Einstein Relation | `E=h\nu` | physics, QM | 1900 | Photoelectric-effect demo |
| 17 | `schrodinger` | The Schrödinger Equation | `i\hbar\,\partial_t\psi=\hat H\psi` | physics, QM | 1926 | Particle-in-a-box / barrier tunneling |
| 18 | `shannon-entropy` | Shannon Information Entropy | `H=-\sum_i p_i\log p_i` | information theory | 1948 | Entropy of a biased coin / distribution slider |
| 19 | `logistic-map` | The Logistic Map | `x_{n+1}=r\,x_n(1-x_n)` | nonlinear dynamics | 1976 | **Bifurcation diagram + cobweb + time series (flagship)** |
| 20 | `black-scholes` | The Black–Scholes Equation | `\partial_t V+\tfrac12\sigma^2 S^2\partial_S^2 V+rS\partial_S V-rV=0` | finance | 1973 | Option-price + Greeks calculator |
| 21 | `ideal-gas` | The Ideal Gas Law | `PV=nRT` | physics, chemistry | 1834 | P–V–T sandbox |
| 22 | `coulomb` | Coulomb's Law | `F=k\dfrac{q_1 q_2}{r^2}` | physics, EM | 1785 | Charges with field/force visualization |
| 23 | `de-broglie` | De Broglie Relation | `\lambda=\dfrac{h}{p}` | physics, QM | 1924 | Wavelength vs momentum/velocity slider |
| 24 | `dirac` | The Dirac Equation | `(i\gamma^\mu\partial_\mu-m)\psi=0` | physics, QFT | 1928 | concept: spin + antimatter explainer |
| 25 | `euler-lagrange` | The Euler–Lagrange Equation | `\dfrac{d}{dt}\dfrac{\partial L}{\partial\dot q}-\dfrac{\partial L}{\partial q}=0` | physics, math | 1755 | Brachistochrone / least-action path explorer |
| 26 | `yang-mills` | Yang–Mills Equations | `D_\mu F^{\mu\nu}=J^\nu,\ F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu+g[A_\mu,A_\nu]` | physics, QFT | 1954 | concept: gauge field / non-abelian self-interaction |
| 27 | `heat-equation` | The Heat / Diffusion Equation | `\partial_t u=\alpha\nabla^2 u` | physics, PDE | 1822 | 1-D/2-D heat diffusion sim |
| 28 | `boltzmann-transport` | Boltzmann Transport Equation | `\partial_t f+\vec v\!\cdot\!\nabla_x f+\tfrac{\vec F}{m}\!\cdot\!\nabla_v f=\left(\partial_t f\right)_{\text{coll}}` | physics, stat-mech | 1872 | concept: distribution relaxation toward equilibrium |
| 29 | `renormalization-group` | RG / Beta Function | `\mu\dfrac{dg}{d\mu}=\beta(g)` | physics, QFT | 1954 | Coupling-flow plot (running coupling) |
| 30 | `mandelbrot` | The Mandelbrot Iteration | `z_{n+1}=z_n^2+c` | nonlinear dynamics | 1980 | **Zoomable interactive fractal (flagship)** |
| 31 | `kdv` | Korteweg–de Vries Equation | `\partial_t u+u\,\partial_x u+\partial_x^3 u=0` | nonlinear PDE | 1895 | Soliton collision animation |
| 32 | `lotka-volterra` | Lotka–Volterra Equations | `\dot x=\alpha x-\beta xy,\quad \dot y=\delta xy-\gamma y` | mathematical biology | 1925 | Phase portrait + time series with sliders |

> Verify every date, discoverer, and form against reliable sources while authoring. Flag genuine historical ambiguity (e.g., Newton vs. Leibniz, Cauchy vs. Weierstrass for limits) rather than picking one silently.

---

## 3. CONTENT DATA MODEL (TypeScript)

Author **all content as typed data modules**, not hardcoded JSX, so it stays editable. One file per equation under `src/content/equations/<id>.ts`, each `export default` a fully-typed `Equation`. Centralize types in `src/content/types.ts`. Validate the whole corpus at build time (a script that throws if any equation is missing a level, a symbol, or a citation).

```ts
export type Level = 1 | 2 | 3 | 4 | 5;
export type Field =
  | 'mathematics' | 'geometry' | 'analysis' | 'physics' | 'mechanics'
  | 'electromagnetism' | 'thermodynamics' | 'statistical-mechanics'
  | 'quantum' | 'relativity' | 'qft' | 'fluids' | 'pde'
  | 'statistics' | 'probability' | 'information-theory'
  | 'nonlinear-dynamics' | 'finance' | 'mathematical-biology' | 'chemistry';

export interface Citation {
  authors: string;
  title: string;
  venue?: string;       // journal / publisher
  year: number;
  url?: string;         // prefer DOI or stable link
  note?: string;        // e.g. "the original 1976 Nature paper"
  primary?: boolean;    // true = primary historical source
}

export interface SymbolDef {
  symbol: string;       // LaTeX, e.g. "\\sigma"
  name: string;         // "standard deviation"
  meaning: string;      // one sentence
  units?: string;       // SI where applicable, e.g. "kg·m/s²" or "dimensionless"
}

export interface WorkedExample {
  prompt: string;       // markdown + $...$
  solution: string;     // markdown + $...$, show steps
}

export interface LevelContent {
  level: Level;
  audience: string;            // "Curious visitor", etc.
  summary: string;             // 1–2 sentence hook for this level
  body: string;                // markdown; inline math $...$, display math $$...$$
  equationForms: { latex: string; caption?: string }[]; // notation for THIS level
  keyIdeas: string[];          // 2–5 bullet takeaways
  workedExample?: WorkedExample;
  misconceptions?: { claim: string; correction: string }[];
  glossedOver?: string;        // optional "what we simplified" note + which level resolves it
}

export interface Connection {
  toId: string;                // another equation's id
  relationship: string;        // "is a special case of", "generalizes", "is the static limit of", ...
}

export interface VizSpec {
  component: string;           // React component name registered in the viz registry
  kind: 'interactive' | 'concept';
  defaultParams: Record<string, number | string | boolean>;
  caption: string;
  whatToTry: string[];         // guided prompts: "Push r past 3.57 and watch order dissolve."
}

export interface Equation {
  id: string;
  name: string;
  nickname?: string;           // "the most beautiful equation", etc. (sourced/qualified)
  canonicalLatex: string;
  alternativeForms?: { latex: string; label: string }[];
  fields: Field[];
  era: { display: string; sortKey: number };  // sortKey = year (negative = BCE)
  discoverers: { name: string; note?: string }[];
  oneLine: string;             // elevator pitch (used in cards/search)
  significance: string;        // why it's on the list (2–4 sentences)
  applications: string[];      // concrete real-world uses
  symbols: SymbolDef[];        // EVERY symbol in canonical + alt forms
  levels: [LevelContent, LevelContent, LevelContent, LevelContent, LevelContent]; // exactly 5, L1..L5
  connections: Connection[];   // ≥2 where sensible
  viz?: VizSpec;
  primarySources: Citation[];  // ≥1 primary where it exists
  furtherReading: Citation[];  // accessible follow-ups, can include books/sites
  historyNote?: string;        // discovery story, disputes, anecdotes
}
```

Also produce `src/content/index.ts` exporting the ordered array and lookup maps, and `src/content/connections.ts` deriving the bidirectional graph from each equation's `connections`.

---

## 4. GOLD-STANDARD CONTENT EXEMPLAR (the quality bar)

Author **all 32** to the depth, honesty, and notation-scaling shown here for `logistic-map`. This is the calibration target — match this density and care everywhere. (Render math, don't leave raw LaTeX in the UI.)

**L1 — Curious Visitor.** Imagine rabbits in a meadow. Few rabbits → they breed and multiply. Too many rabbits → they run out of food and the population crashes. There's a single dial — call it the "boom factor" — that controls how fast they breed. Turn the dial gently and the population settles to a steady number. Turn it further and the population starts flip-flopping between a big year and a small year, forever. Turn it further still and something astonishing happens: the population jumps around with no pattern at all — *as unpredictable as dice* — even though the rule never changed and there's no luck involved. This little rabbit rule was a thunderclap in science: it proved that *simple, exact rules can produce total unpredictability*. The world doesn't need to be complicated to be wild.

**L2 — High School.** Let `xₙ` be this year's population written as a fraction of the maximum the meadow can hold, so `0 ≤ xₙ ≤ 1`. Let `r` be the growth (boom) factor. Next year's fraction is `x_{n+1} = r·xₙ·(1 − xₙ)`. The `xₙ` term is breeding (more rabbits → more babies); the `(1 − xₙ)` term is the crowding brake (more rabbits → less food per rabbit). *Worked example:* take `r = 2.5`, `x₀ = 0.4`. Then `x₁ = 2.5·0.4·0.6 = 0.6`, `x₂ = 2.5·0.6·0.4 = 0.6` → it locks onto `0.6`. Now take `r = 3.2`: the sequence settles into a two-year cycle, alternating ≈ `0.513` and ≈ `0.799`. Same equation, one number changed, completely different destiny. *Misconception:* "bigger r always means more rabbits" — false; beyond a point bigger r means *less predictable*, not more.

**L3 — Undergraduate.** Fixed points solve `x* = r x*(1−x*)`, giving `x* = 0` and `x* = 1 − 1/r`. Linear stability uses `f'(x) = r(1−2x)`; a fixed point is stable iff `|f'(x*)| < 1`. The nonzero fixed point is stable for `1 < r < 3`. At `r = 3` it loses stability (`f' = −1`) and a stable 2-cycle is born — a **period-doubling (flip) bifurcation**. The cascade 2→4→8→… accumulates at `r∞ ≈ 3.56995`, beyond which lies chaos interleaved with periodic windows. Chaos means **sensitive dependence on initial conditions**, quantified by a positive Lyapunov exponent `λ = lim_{N→∞} (1/N) Σ ln|f'(xₙ)|`. *Cobweb plots* make the dynamics visible: stairstep toward a stable point, box around a 2-cycle, space-filling tangle in chaos. *What we glossed at L2:* the 2-cycle isn't "alternating forever by luck" — it's a genuine attracting periodic orbit, stable under perturbation.

**L4 — Graduate / Practitioner.** The period-doubling cascade exhibits **Feigenbaum universality**: ratios of successive bifurcation intervals converge to `δ ≈ 4.66920`, and the rescaling of the attractor by `α ≈ 2.50291`. These constants are *universal* across all smooth unimodal maps with a quadratic maximum (e.g. `r sin(πx)`), not special to the quadratic. At `r = 4` the map is topologically conjugate to the tent map (via `x = sin²(πθ/2)`) and hence to a Bernoulli shift — exact, provable chaos with invariant density `ρ(x) = 1/(π√(x(1−x)))`. **Sharkovskii's theorem** orders periods; the appearance of a period-3 orbit (in the window near `r ≈ 3.8284`) implies orbits of *every* period (Li–Yorke "period three implies chaos"). Periodic windows open by tangent (saddle-node) bifurcations and close by their own period-doubling cascades — self-similarity all the way down. The Lyapunov exponent is positive on a complicated, positive-measure parameter set, negative inside windows.

**L5 — Expert / Researcher.** Feigenbaum universality is explained by a **renormalization-group** argument: the doubling operator `(Tψ)(x) = α ψ(ψ(x/α))` has a fixed-point function `ψ*` whose linearization has a single relevant eigenvalue `δ`; this is *exactly* a phase transition with `δ` the analogue of a critical exponent, and it was confirmed experimentally in Rayleigh–Bénard convection (Libchaber). Complexifying to `z ↦ z² + c` embeds the real logistic family in the **Mandelbrot set** along the real axis; the period-doubling points are the cusps of the real-axis cardioid/disk chain, and parameter-space universality connects to the Mandelbrot set's self-similar structure (Milnor, Douady–Hubbard). **Jakobson's theorem** establishes a positive-Lebesgue-measure set of parameters with an absolutely continuous invariant measure (genuinely chaotic, not merely topologically transitive), while dense windows mean chaos is *not* structurally stable. Frontier links: measure-theoretic/ergodic dynamics, the density of hyperbolicity (proved for real quadratics: Lyubich, Graczyk–Świątek), and MLC. *Primary sources:* R. May, "Simple mathematical models with very complicated dynamics," **Nature** 261, 459 (1976); M. Feigenbaum, **J. Stat. Phys.** 19, 25 (1978).

> Note how notation, claims, and citations escalate while every level stays *true*. Replicate this discipline for all 32.

---

## 5. AUTHORING GUIDELINES (apply to every equation)

1. **Accuracy first.** Verify forms, constants, dates, and attributions. Cite ≥1 primary source where one exists, plus accessible further reading. No invented references — if unsure, omit.
2. **Honest caveats.** When a level simplifies, flag it with `glossedOver`. Never present a pedagogical lie as settled fact.
3. **Notation scaling.** Provide `equationForms` appropriate to each level. Lower levels may use scalar/explicit forms; higher levels use the compact, general, or coordinate-free forms.
4. **Symbols.** Every symbol appearing in any form gets a `SymbolDef` with units (mark dimensionless explicitly). The UI renders a hover/tap glossary.
5. **Connections.** Wire each equation to ≥2 others with a *relationship phrase* (e.g. `coulomb` "shares inverse-square form with" `gravitation`; `schrodinger` "non-relativistic limit related to" `dirac`; `black-scholes` "is the heat equation in disguise" `heat-equation`; `mandelbrot` "complexifies" `logistic-map`).
6. **Worked examples** with real numbers at L2 and L3. Show steps.
7. **Applications**: concrete, modern, verifiable ("GPS clock correction" for `einstein-field`, "JPEG/MP3" for `fourier`).
8. **History note**: the human story — disputes, anecdotes, the moment it landed.
9. **Voice**: precise, warm, never breathless. The maintainer dislikes overclaiming; reward skepticism.
10. **`whatToTry`** prompts for each viz must teach the key phenomenon (e.g. for `bayes`, "set disease prevalence to 0.1% and watch a 99%-accurate test still mostly cry wolf").

---

## 6. TECH STACK & ARCHITECTURE

- **Build:** Vite + React 18 + TypeScript (strict).
- **Routing:** React Router (hash or browser router; choose browser + a static fallback). Routes: `/` (home), `/equations` (browse), `/e/:id` (equation page), `/timeline`, `/connections`, `/glossary`, `/about`.
- **Styling:** Tailwind CSS + a small set of CSS variables for theming (light/dark). No component-library lock-in; build a tiny in-house primitives layer (Button, Card, Tabs, Slider, Tooltip, Badge).
- **Math rendering:** **KaTeX** (fast, deterministic). Wrap in a `<Math>` (inline) and `<MathBlock>` (display) component. Render a MathML fallback / `aria-label` from a plain-text transcription for screen readers.
- **Markdown:** a markdown renderer that supports inline/display math delimiters (`$...$`, `$$...$$`) and is XSS-safe. Content is trusted (authored by you), but sanitize anyway.
- **Charts/Viz:** Use lightweight, dependency-frugal tools. Prefer **D3** for custom math viz (bifurcation, cobweb, phase portraits, fields), `<canvas>` for pixel-heavy ones (Mandelbrot, heat diffusion, fluid), and **Recharts** only for simple line/area plots. **Do NOT use any notebook/Jupyter-style embedding.**
- **Animation:** Framer Motion for level transitions and micro-interactions (respect `prefers-reduced-motion`).
- **State:** URL is the source of truth for *which equation* and *which level* (`/e/logistic-map?level=3`) so views are shareable/bookmarkable. Local UI state via React hooks/Context; persisted prefs (theme, default level, bookmarks, "mark as read") via `localStorage`.
- **Search:** client-side full-text over name/oneLine/significance/fields/symbols using a small index (e.g. MiniSearch or a hand-rolled inverted index). No server.
- **Type-safe content:** content validated at build by a script (`scripts/validate-content.ts`) run in CI / `pnpm prebuild`.
- **Package manager:** pnpm. **No backend.** Fully static; deployable to any static host (Netlify/Vercel/GitHub Pages) and runnable via `pnpm dev` locally on Linux.

---

## 7. FILE / FOLDER STRUCTURE (target)

```
the-equations/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ README.md                      # how to run, add an equation, add a viz
├─ scripts/
│  └─ validate-content.ts         # fails build on missing levels/symbols/citations
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ routes/
│  │  ├─ Home.tsx
│  │  ├─ Browse.tsx
│  │  ├─ EquationPage.tsx
│  │  ├─ Timeline.tsx
│  │  ├─ Connections.tsx
│  │  ├─ Glossary.tsx
│  │  └─ About.tsx
│  ├─ components/
│  │  ├─ math/{Math.tsx,MathBlock.tsx}
│  │  ├─ LevelSwitcher.tsx        # the 5-level control (slider + tabs)
│  │  ├─ EquationCard.tsx
│  │  ├─ SymbolGlossaryPopover.tsx
│  │  ├─ SearchBar.tsx
│  │  ├─ FilterBar.tsx
│  │  ├─ ConnectionsGraph.tsx
│  │  ├─ ThemeToggle.tsx
│  │  ├─ Markdown.tsx
│  │  └─ ui/{Button,Card,Tabs,Slider,Tooltip,Badge,Drawer}.tsx
│  ├─ viz/
│  │  ├─ registry.ts              # maps VizSpec.component -> React component
│  │  ├─ LogisticMap.tsx          # bifurcation + cobweb + time series
│  │  ├─ Mandelbrot.tsx
│  │  ├─ NormalDistribution.tsx
│  │  ├─ FourierBuilder.tsx
│  │  ├─ WaveString.tsx
│  │  ├─ LotkaVolterra.tsx
│  │  ├─ BayesCalculator.tsx
│  │  ├─ EulerPhasor.tsx
│  │  ├─ TwoBodyOrbit.tsx
│  │  ├─ HeatDiffusion.tsx
│  │  ├─ ... (one per equation that has a viz)
│  │  └─ shared/{useCanvas.ts, plotAxes.tsx, colorScales.ts}
│  ├─ content/
│  │  ├─ types.ts
│  │  ├─ index.ts                 # ordered array + maps
│  │  ├─ connections.ts
│  │  └─ equations/<id>.ts        # 32 files
│  ├─ lib/{search.ts, theme.ts, storage.ts, format.ts}
│  └─ styles/{globals.css, katex-overrides.css}
└─ public/{favicon, og-image, manifest.webmanifest}
```

---

## 8. FEATURE SPECIFICATION

### 8.1 Equation page (`/e/:id`) — the core
- Hero: name, nickname (qualified), canonical equation (large, beautifully typeset), field badges, era, discoverers, one-line.
- **Level switcher**: a 5-stop control combining a labeled slider *and* tab buttons (L1…L5 with their audience names). Keyboard accessible (←/→ change level). Selected level reflected in URL `?level=n` and persisted as the user's default. Smooth crossfade/height animation between levels (reduced-motion friendly).
- Body: rendered markdown for the active level — summary, body, level-appropriate equation forms, key ideas, worked example (collapsible), misconceptions (callout style), gloss note.
- **Interactive visualization** panel (if `viz`): the registered component with controls, a caption, and "What to try" guided prompts. Lazy-load heavy viz.
- **Symbol glossary**: every symbol clickable/hoverable → popover with name, meaning, units. Also a full symbol table in a collapsible section.
- **Connections**: chips linking to related equations with the relationship phrase; clicking navigates.
- **Sources**: primary sources (badged) + further reading, with links.
- **History note** section.
- Prev/next navigation (chronological by default; respect active sort).
- Per-equation actions: bookmark (★), mark-as-read (persisted), copy-LaTeX of any form, "print this equation" (clean print stylesheet), and a "share at this level" link.

### 8.2 Home (`/`)
- A compelling intro to the project and the five-level idea (with a tiny live demo of the level switcher on one equation).
- Featured/flagship equations. Entry points to Browse, Timeline, Connections.
- A global **default-level** preference picker ("Read everything at: L1…L5"), persisted.

### 8.3 Browse (`/equations`)
- Responsive grid of `EquationCard`s (equation typeset + name + one-line + field badges + era).
- **Search** (instant, client-side) and **filters**: by field, era bucket (Ancient / Enlightenment / 19th c. / Modern / 20th c.+), has-visualization, difficulty/most-abstract. Sort: chronological, alphabetical, by field.

### 8.4 Timeline (`/timeline`)
- Horizontal/vertical scrollable timeline placing all 32 by `era.sortKey`, grouped into eras, with hover previews and links. Show the *acceleration* of discovery visually (sparse antiquity → dense modernity).

### 8.5 Connections (`/connections`)
- A force-directed (D3) graph: nodes = equations (colored by field), edges = relationships (hover shows the relationship phrase). Click a node → go to its page. Include a legend and the ability to highlight a node's neighborhood. Provide a non-graph accessible list fallback.

### 8.6 Glossary (`/glossary`)
- Aggregated, deduplicated symbol table across all equations (symbol, name, meaning, units, "appears in" links). Searchable.

### 8.7 Global
- **Theme**: light/dark/system, persisted; KaTeX colors adapt.
- **Default reading level**: a global pref that every equation page respects on first open (overridable per page).
- **Progress**: "read" checkmarks and bookmarks visible in Browse; a small "X of 32 explored" indicator.
- **Command palette** (Cmd/Ctrl-K): jump to any equation, level, or page.
- **Keyboard shortcuts**: `/` focus search, `←/→` change level on an equation page, `g b/t/c` go to Browse/Timeline/Connections.
- **PWA**: installable, offline-capable (service worker caches the static app + content), web manifest, theme color.

---

## 9. INTERACTIVE VISUALIZATION SPECS

Build a `viz/registry.ts` mapping names to lazy-loaded components. Each viz: clean controls (sliders/inputs with live numeric readouts), a caption, `whatToTry` prompts, responsive sizing, reduced-motion fallback (freeze animation, allow stepping), and dark-mode-aware colors. Minimum specs:

- **LogisticMap (flagship):** three linked panels — (a) **bifurcation diagram** over `r ∈ [2.4, 4.0]` rendered to canvas (iterate, discard transient, plot attractor), with a draggable vertical `r` cursor; (b) **cobweb plot** for the current `r`; (c) **time series** `xₙ`. Sliders: `r`, `x₀`, iterations, transient. Show the period-doubling cascade and onset of chaos live. Optional Lyapunov-exponent overlay.
- **Mandelbrot (flagship):** canvas, click/scroll to zoom, escape-time coloring, adjustable max-iterations, smooth coloring option, show the real-axis slice and mark its correspondence to the logistic family (cross-link to `logistic-map`).
- **NormalDistribution:** sliders for μ, σ; shaded P(a<X<b) with draggable bounds; a CLT mini-demo (sum of dice/uniforms → bell).
- **FourierBuilder:** add up N sine harmonics to approximate square/triangle/sawtooth; show partial sum vs. target and the live amplitude spectrum; Gibbs phenomenon visible.
- **WaveString:** 1-D string with adjustable `c`, choose standing-wave mode `n` or pluck shape; animate `u(x,t)`; show nodes/antinodes.
- **TwoBodyOrbit:** integrate gravitation (symplectic integrator), adjustable masses/initial velocity; trace ellipse/parabola/hyperbola; show conic-section dependence on energy.
- **BayesCalculator:** disease-test base-rate explorer (prevalence, sensitivity, specificity → posterior), with a unit-square / natural-frequencies visualization that makes the base-rate fallacy obvious.
- **EulerPhasor:** unit circle, slider for θ, vector `e^{iθ}` with its cos/sin projections; sweep to θ = π to land on −1.
- **LotkaVolterra:** phase portrait (predator vs prey) + time series; sliders α, β, γ, δ; show closed orbits / the conserved quantity.
- **HeatDiffusion:** 1-D (or 2-D canvas) initial profile relaxing via explicit/implicit scheme; adjustable α; show smoothing/irreversibility; connect to `black-scholes`.
- **BlackScholes:** European call/put price + Greeks vs. spot/vol/time; sliders S, K, σ, r, T.
- **Optional/Concept viz** for `maxwell`, `coulomb`, `ideal-gas`, `schrodinger` (particle-in-a-box / tunneling), `einstein-field` (warped-grid geodesic), `kdv` (two-soliton collision), `renormalization-group` (running coupling), `boltzmann-entropy` (gas microstates), `planck-einstein` (photoelectric), `de-broglie` (λ–p slider), `euler-lagrange` (brachistochrone), `dirac`/`yang-mills`/`boltzmann-transport` (clear explanatory/animated concept visuals if a full sim is impractical — but ship *something* visual).

Performance: run heavy iteration off the main thread (Web Workers) where it would jank (Mandelbrot, bifurcation), with progressive rendering.

---

## 10. DESIGN SYSTEM

Aim for **"scientific journal meets modern web"** — calm, typographic, confident, *not* a generic dashboard. Read `frontend-design` skill guidance and avoid templated defaults.

- **Typography:** a humanist **serif** for prose (e.g. Source Serif / Spectral / Newsreader), a clean **grotesk** for UI/labels (e.g. Inter), and a **mono** for symbol/units/code (e.g. JetBrains Mono). Prose line length ~66–72ch, generous leading.
- **Math:** KaTeX styled to sit harmoniously with the serif; display equations get breathing room and a subtle container; let them be the visual heroes.
- **Color:** restrained neutral base + one disciplined accent; per-field accent hues used *sparingly* (badges, graph nodes). Full light/dark parity; ensure KaTeX and canvases adapt.
- **Layout:** spacious, grid-aligned, content-first. Equation page reads like a beautifully set article with an instrument panel.
- **Motion:** purposeful and subtle (level crossfades, chip hovers); honor `prefers-reduced-motion`.
- **Components:** cohesive primitives; consistent focus rings; tasteful empty/loading states.
- Provide a tiny **style guide** route or section documenting tokens.

---

## 11. ACCESSIBILITY (must-haves)
- WCAG 2.1 AA contrast in both themes.
- Full keyboard operability (level switcher, command palette, graph fallback, sliders).
- Every equation has a screen-reader text alternative (plain-language transcription, not raw LaTeX) via `aria-label`/visually-hidden text; KaTeX MathML output enabled.
- Visualizations: provide a textual summary and, where feasible, a data-table or stepping alternative; never convey meaning by color alone.
- Respect reduced motion; provide pause controls on animations.
- Semantic landmarks, skip-to-content, focus management on route change.

---

## 12. QUALITY, PERFORMANCE & SEO
- TypeScript **strict**, ESLint + Prettier, zero `any` in content/types.
- Code-split routes and lazy-load viz; keep initial JS lean. Target Lighthouse ≥ 95 across Performance/Accessibility/Best-Practices/SEO on the home and a representative equation page.
- Per-page `<title>`/meta/Open Graph/Twitter cards; generate a static OG image fallback; JSON-LD where sensible.
- `sitemap.xml` and prerender/SSG the routes if feasible (Vite SSG or a simple prerender step) so equation pages are crawlable and shareable.
- Build-time content validation must pass (no missing levels/symbols/citations).

---

## 13. TESTING
- Vitest unit tests for: content validator, search index, Bayes/Black–Scholes math helpers, logistic/Lotka integrators (sanity values).
- A snapshot/smoke test that every equation route renders all five levels without throwing.
- Type-level test that each `Equation.levels` tuple has exactly five entries L1…L5.

---

## 14. BUILD ORDER (do it in this sequence)
1. Scaffold (Vite+React+TS+Tailwind+Router), theming, fonts, KaTeX `<Math>` components, base UI primitives.
2. Define `content/types.ts` + the `validate-content.ts` script.
3. Build the **EquationPage** shell + **LevelSwitcher** + Markdown/Math rendering + symbol glossary, wired to URL state.
4. Author **`logistic-map`** content (Section 4) **and** build its flagship **viz** end-to-end as the reference implementation. Get this one *perfect* — it sets every pattern.
5. Build the viz **registry** + 2–3 more viz (NormalDistribution, Bayes, EulerPhasor) to prove the pattern across types (D3, canvas, calculator).
6. Author the remaining 30 equations to the gold-standard depth, wiring connections, symbols, sources.
7. Build remaining visualizations (Mandelbrot + flagship-heavy ones via Web Workers).
8. Build Home, Browse (search/filter), Timeline, Connections graph, Glossary, command palette.
9. Accessibility pass, dark mode parity, reduced-motion, print styles.
10. Performance pass (code-split, lazy viz, workers), SEO/PWA, tests, README.

After step 4, pause and show me the logistic-map page so I can sanity-check tone, depth, and notation before you scale to all 32.

---

## 15. DEFINITION OF DONE
- All **32** equations authored at **all 5** levels, validator passing.
- Every equation has symbols-with-units, ≥1 primary source, ≥2 connections, applications, history note.
- Every equation has a working visualization (interactive where specified, a real visual concept where a full sim is impractical).
- Home, Browse (search+filter), Timeline, Connections graph, Glossary, command palette all functional.
- Level switching is URL-driven, persistent, keyboard-accessible, animated (reduced-motion safe).
- Light/dark, PWA/offline, AA accessibility, Lighthouse ≥95, tests green, build is static and runs with `pnpm install && pnpm dev` and `pnpm build && pnpm preview`.
- `README.md` documents: running locally, the content schema, how to add a new equation, and how to register a new visualization.

---

## 16. CONSTRAINTS & ANTI-REQUIREMENTS
- **No backend, no auth, no database** — fully static, client-only.
- **No Jupyter / notebook embedding** of any kind.
- **No fabricated facts or citations.** When uncertain, verify or omit and leave a clearly-marked `// TODO: verify` so I can review — never invent a source, constant, or date.
- **No dumbing-down that becomes false.** Simplify with a flagged gloss, not a lie.
- Keep dependencies lean and well-justified; prefer the standard library / small focused libs over heavy frameworks.
- Mobile-first responsive; everything must work on a phone.

Begin with the scaffold and the logistic-map reference page, then check in with me.
