import type { Equation } from '../types';

const blackScholes: Equation = {
  id: 'black-scholes',
  name: 'The Black–Scholes Equation',
  nickname: 'the equation that priced risk',
  canonicalLatex: '\\partial_t V+\\tfrac12\\sigma^2 S^2\\partial_S^2 V+rS\\partial_S V-rV=0',
  canonicalAlt:
    'partial-t V plus one-half sigma squared S squared times the second S-derivative of V, plus r S times the S-derivative of V, minus r V, equals zero',
  alternativeForms: [
    { latex: 'C = S\\,N(d_1) - K e^{-rT}N(d_2)', label: 'Black–Scholes call-price formula' },
    { latex: 'd_{1,2} = \\dfrac{\\ln(S/K) + (r \\pm \\sigma^2/2)T}{\\sigma\\sqrt{T}}', label: 'the d₁, d₂ terms' },
  ],
  fields: ['finance', 'pde'],
  era: { display: '1973', sortKey: 1973 },
  discoverers: [
    { name: 'Fischer Black & Myron Scholes', note: 'the option-pricing model, 1973' },
    { name: 'Robert Merton', note: 'rigorous derivation and extensions; shared 1997 Nobel' },
  ],
  oneLine: 'A way to put a fair price on a financial option by continuously hedging away its risk.',
  significance:
    'Black–Scholes gave the first widely accepted, theoretically grounded formula for pricing options, launching the modern multi-trillion-dollar derivatives industry. Its core idea — that a risky payoff can be replicated (and thus priced) by a continuously rebalanced portfolio, eliminating risk — reshaped quantitative finance. Mathematically it is the heat equation in disguise, and it earned the 1997 Nobel Prize. Its assumptions and famous failures (the volatility "smile," crashes) are equally instructive.',
  applications: [
    'Pricing and hedging options and other derivatives',
    'Risk management; implied volatility as a market expectation gauge',
    'Real options in corporate finance and capital budgeting',
    'Foundations for the entire quantitative-finance industry',
  ],
  symbols: [
    { symbol: 'V', name: 'option value', meaning: 'price of the derivative as a function of S and t', units: 'currency' },
    { symbol: 'S', name: 'underlying price', meaning: 'current price of the underlying asset (stock)', units: 'currency' },
    { symbol: 't', name: 'time', meaning: 'current time (T is expiry)', units: 'years' },
    { symbol: '\\sigma', name: 'volatility', meaning: 'standard deviation of the asset’s returns', units: 'per √year' },
    { symbol: 'r', name: 'risk-free rate', meaning: 'continuously compounded interest rate', units: 'per year' },
    { symbol: 'K', name: 'strike price', meaning: 'agreed exercise price of the option', units: 'currency' },
    { symbol: 'N', name: 'normal CDF', meaning: 'cumulative standard normal distribution', units: 'dimensionless' },
  ],
  levels: [
    {
      level: 1,
      audience: 'Curious Visitor',
      summary: 'How much should you pay today for the *right* to buy something later at a set price? This equation gives the fair answer — by canceling out the risk.',
      equationForms: [{ latex: '\\partial_t V+\\tfrac12\\sigma^2 S^2\\partial_S^2 V+rS\\partial_S V-rV=0', caption: 'the fair price obeys this balance' }],
      body: `Suppose someone offers you, for a fee today, the **right (but not the obligation)** to buy a stock next year at a fixed price. If the stock soars, you cash in; if it sinks, you simply walk away. That contract is an **option**, and it clearly has value — but how much, exactly? For decades, no one had a principled answer; options were priced by gut feeling.

Black, Scholes, and Merton found the fair price with a brilliant trick. They showed that by holding the option *and* continuously buying or selling just the right amount of the underlying stock, you can build a portfolio whose ups and downs **exactly cancel** — leaving something as safe as a bank deposit. Since a risk-free thing can only earn the risk-free interest rate, the option's fair price is pinned down completely.

This idea — **price risk by hedging it away** — created modern finance. Trillions of dollars of contracts are priced with its descendants every day.`,
      keyIdeas: [
        'An option is the right, not the obligation, to trade later at a set price.',
        'Continuously hedging with the stock cancels the risk.',
        'A risk-free portfolio must earn the risk-free rate — this fixes the price.',
      ],
      glossedOver: 'We say risk "exactly cancels." That requires continuous, frictionless trading and a specific model of randomness — Level 2/3.',
    },
    {
      level: 2,
      audience: 'High School',
      summary:
        'Assuming stock prices wander randomly with volatility σ, the formula gives a call option’s price from today’s price, strike, time, interest rate, and σ.',
      equationForms: [
        { latex: 'C = S\\,N(d_1) - K e^{-rT}N(d_2)' },
        { latex: 'd_1 = \\dfrac{\\ln(S/K)+(r+\\sigma^2/2)T}{\\sigma\\sqrt T},\\quad d_2 = d_1 - \\sigma\\sqrt T' },
      ],
      body: `The model assumes a stock's price drifts and jiggles randomly, with the size of the jiggles set by the **volatility** $\\sigma$. From five inputs — current price $S$, strike $K$, time to expiry $T$, interest rate $r$, and volatility $\\sigma$ — the Black–Scholes formula spits out a fair price for a "call" option (the right to buy).

The formula looks intimidating but reads sensibly: the option is worth the stock you might receive ($S$, weighted by the probability $N(d_1)$ you'll exercise) minus the discounted strike you'd pay ($Ke^{-rT}$, weighted by $N(d_2)$). Higher volatility makes options **more** valuable — more chance of a big favorable move, while your downside is capped at zero. Of the five inputs, four are observable; only $\\sigma$ must be estimated, and in practice traders run the formula *backward* from market prices to extract the market's **implied volatility**.`,
      keyIdeas: [
        'Five inputs: price, strike, time, interest rate, and volatility σ.',
        'Higher volatility → higher option value (capped downside, open upside).',
        'σ is the one hidden input; markets quote "implied volatility" via the formula.',
      ],
      workedExample: {
        prompt: 'Why does an option’s value rise with volatility, even though more volatility means more chance of the stock falling?',
        solution: `An option's payoff is **asymmetric**: a call pays $\\max(S - K, 0)$ — you profit if the stock rises above the strike, but lose nothing extra if it falls (you just don't exercise; the loss is capped at the premium paid).

So increasing volatility widens the range of outcomes *both ways*, but only the upside helps you while the downside is floored at zero. Averaging over the wider distribution, the expected payoff goes **up**. Mathematically, the option value is a convex function of $S$, and by Jensen's inequality spreading out $S$ raises the average of a convex function.

This is why option traders are fundamentally "long volatility": they profit from turbulence. The sensitivity of price to volatility, called **vega**, is always positive for vanilla options.`,
      },
      misconceptions: [
        {
          claim: 'Black–Scholes tells you whether a stock will go up, so you can use it to predict prices.',
          correction:
            'It does no such thing — the expected return of the stock cancels out of the pricing entirely (risk-neutral valuation). It prices the *option relative to* the stock; it forecasts nothing about direction.',
        },
      ],
      glossedOver: 'We treated "random jiggling" loosely. The precise model — geometric Brownian motion — and the derivation are Level 3.',
    },
    {
      level: 3,
      audience: 'Undergraduate',
      summary:
        'Model S by geometric Brownian motion; Itô’s lemma plus a delta-hedged (risk-free) portfolio yields the PDE, which transforms exactly into the heat equation.',
      equationForms: [
        { latex: 'dS = \\mu S\\,dt + \\sigma S\\,dW', caption: 'geometric Brownian motion' },
        { latex: '\\Pi = V - \\Delta S,\\quad \\Delta = \\partial_S V \\Rightarrow d\\Pi = r\\Pi\\,dt', caption: 'delta-hedged portfolio is risk-free' },
      ],
      body: `Assume the stock follows **geometric Brownian motion** $dS = \\mu S\\,dt + \\sigma S\\,dW$, where $dW$ is a Wiener (Brownian) increment. Because $V(S,t)$ is a function of the random $S$, its differential needs **Itô's lemma**, which adds the crucial second-order term $\\tfrac12\\sigma^2 S^2\\partial_S^2 V\\,dt$ (stochastic calculus: $(dW)^2 = dt$).

Now form a portfolio long the option and short $\\Delta = \\partial_S V$ shares. The random $dW$ terms **cancel** — the portfolio is instantaneously **risk-free** (this is "delta hedging"). No-arbitrage demands it earn the risk-free rate, $d\\Pi = r\\Pi\\,dt$. Equating gives the Black–Scholes PDE. Notably the drift $\\mu$ has vanished — pricing is **risk-neutral**, depending only on $r$ and $\\sigma$. With the substitution $\\tau = T - t$ and logarithmic price $x = \\ln S$, the equation becomes literally the **heat equation** $\\partial_\\tau u = \\tfrac12\\sigma^2\\partial_x^2 u$ (plus drift), which is why the solution involves the Gaussian/normal CDF $N(\\cdot)$ — and ties option pricing to diffusion.`,
      keyIdeas: [
        'Itô’s lemma adds the $\\tfrac12\\sigma^2S^2\\partial_S^2V$ term (stochastic calculus).',
        'Delta-hedging cancels the randomness → risk-free portfolio → the PDE.',
        'The drift μ drops out (risk-neutral); the PDE is the heat equation in disguise.',
      ],
      workedExample: {
        prompt: 'Show that delta-hedging removes the random term, forcing the portfolio to be instantaneously risk-free.',
        solution: `By Itô's lemma, $dV = \\Big(\\partial_t V + \\mu S\\partial_S V + \\tfrac12\\sigma^2 S^2\\partial_S^2 V\\Big)dt + \\sigma S\\,\\partial_S V\\,dW.$

Form $\\Pi = V - \\Delta S$ with $\\Delta = \\partial_S V$. Then

$$d\\Pi = dV - \\Delta\\,dS = \\Big(\\partial_t V + \\tfrac12\\sigma^2 S^2\\partial_S^2 V\\Big)dt + \\sigma S\\partial_S V\\,dW - \\partial_S V(\\mu S\\,dt + \\sigma S\\,dW).$$

The $\\mu S\\,dt$ and both $\\sigma S\\,dW$ terms **cancel**, leaving

$$d\\Pi = \\Big(\\partial_t V + \\tfrac12\\sigma^2 S^2\\partial_S^2 V\\Big)dt,$$

with **no $dW$** — deterministic, hence risk-free. Setting $d\\Pi = r\\Pi\\,dt = r(V - S\\partial_S V)\\,dt$ and matching gives the Black–Scholes PDE. The vanishing of $\\mu$ is the heart of it: how fast the stock is *expected* to grow never enters the option's fair price.`,
      },
      glossedOver: 'We assumed constant σ, continuous trading, and Gaussian returns. Each fails in reality — the corrections are Level 4.',
    },
    {
      level: 4,
      audience: 'Graduate / Practitioner',
      summary:
        'Risk-neutral pricing $V = e^{-rT}\\mathbb{E}^{\\mathbb{Q}}[\\text{payoff}]$ generalizes via martingales; the Greeks quantify risk, and the volatility smile exposes the model’s broken assumptions.',
      equationForms: [
        { latex: 'V_0 = e^{-rT}\\,\\mathbb{E}^{\\mathbb{Q}}[\\,\\text{payoff}(S_T)\\,]', caption: 'risk-neutral (martingale) pricing' },
        { latex: '\\Delta = \\partial_S V,\\ \\Gamma = \\partial_S^2 V,\\ \\mathcal{V} = \\partial_\\sigma V,\\ \\Theta = \\partial_t V', caption: 'the Greeks' },
      ],
      body: `The modern formulation is **risk-neutral valuation**: there exists an equivalent martingale measure $\\mathbb{Q}$ under which discounted asset prices are martingales, and any derivative's price is $V_0 = e^{-rT}\\mathbb{E}^{\\mathbb{Q}}[\\text{payoff}]$ (the Fundamental Theorem of Asset Pricing ties no-arbitrage to the existence of $\\mathbb{Q}$, and completeness to its uniqueness). Black–Scholes is the special case of a complete market with one risky asset and constant $\\sigma$. The **Greeks** — $\\Delta,\\Gamma,\\mathcal{V},\\Theta,\\rho$ — are the partial derivatives that traders hedge: delta-hedging neutralizes first-order price risk, gamma measures its instability, vega the volatility exposure.

In practice the model's assumptions visibly fail. Plotting the **implied volatility** back-solved from market prices against strike is not flat (as the model demands) but a **smile/skew** — markets price in fat tails and crash risk that lognormal returns ignore. Real returns are heavy-tailed, volatility is stochastic and clusters, trading is discrete and costly, and jumps occur. This drives the extensions practitioners actually use: **local volatility** (Dupire), **stochastic volatility** (Heston, SABR), and **jump-diffusion** (Merton). Black–Scholes survives as the *lingua franca* — prices are even quoted *in* implied vol — precisely because it is a transparent, invertible benchmark against which richer models are calibrated.`,
      keyIdeas: [
        'Risk-neutral/martingale pricing: $V = e^{-rT}\\mathbb{E}^{\\mathbb{Q}}[\\text{payoff}]$ (no-arbitrage ⇔ measure $\\mathbb{Q}$).',
        'The Greeks (Δ, Γ, vega, Θ, ρ) are the hedging sensitivities.',
        'The volatility smile reveals fat tails; fixes = local/stochastic vol, jumps.',
      ],
      workedExample: {
        prompt: 'What is the volatility "smile," and what does its existence tell you about the Black–Scholes assumptions?',
        solution: `Take market prices of options on one underlying at one expiry but different strikes $K$. Invert the Black–Scholes formula on each to get the **implied volatility** $\\sigma_{\\text{imp}}(K)$ — the σ that makes the formula match the market.

If Black–Scholes were exactly right, $\\sigma_{\\text{imp}}$ would be **constant** across strikes (σ is a property of the stock, not the option). Instead, plotting $\\sigma_{\\text{imp}}$ vs. $K$ shows a **smile** (or, for equities since 1987, a downward **skew**): out-of-the-money options trade at higher implied vol.

This is the market's correction to the model: real return distributions have **fatter tails** (and negative skew) than the lognormal assumption, so far-from-the-money options — which pay off in those tail scenarios — are worth more than Black–Scholes says. The smile is a direct, daily measurement of the model being wrong in a specific, structured way, and motivates stochastic-volatility and jump models.`,
      },
      glossedOver: 'Stochastic calculus was used operationally. Its rigorous foundations and the deep math/economics frontier are Level 5.',
    },
    {
      level: 5,
      audience: 'Expert / Researcher',
      summary:
        'Black–Scholes rests on Itô calculus and martingale theory; the frontier spans incomplete-market pricing, rough volatility, market microstructure, and the systemic and model risks that hedging itself creates.',
      equationForms: [
        { latex: 'dX_t = b\\,dt + \\sigma\\,dW_t,\\quad \\mathbb{E}\\Big[\\int_0^t \\sigma\\,dW\\Big]=0', caption: 'Itô integral / martingale structure' },
        { latex: '\\sigma_t^2:\\ \\text{rough, Hurst } H \\approx 0.1\\ (\\text{fractional Brownian})', caption: 'rough-volatility models' },
      ],
      body: `Rigorously, the theory is built on **Itô stochastic calculus** and the martingale representation theorem: hedging is the statement that a contingent claim's payoff can be written as a stochastic integral against the asset, and risk-neutral pricing is Girsanov's change of measure. Harrison and Pliska's martingale formulation generalizes Black–Scholes to general semimartingale markets, sharply distinguishing **complete** markets (every claim replicable, unique price) from **incomplete** ones (stochastic volatility, jumps, transaction costs), where pricing requires choosing among many measures via utility, risk preferences, or superhedging — an active area linking finance to optimal transport and BSDEs (backward stochastic differential equations).

Contemporary frontiers: empirically, volatility is best modeled as **"rough"** (driven by fractional Brownian motion with Hurst exponent $H \\approx 0.1$), which fits the term structure of implied vol strikingly well and has reshaped the field since 2014. **Market microstructure** and high-frequency data demand models beyond continuous diffusion; **liquidity, transaction costs, and the impossibility of truly continuous hedging** make perfect replication a fiction (Leland's discrete hedging, gamma risk). Most soberingly, the model's own success carries **systemic risk**: the 1987 crash, the 1998 LTCM collapse (Scholes and Merton were principals), and the 2008 crisis all involved derivatives priced and hedged with Black–Scholes descendants, where correlated hedging and underpriced tail risk amplified instability. The equation that priced risk also, by being believed too literally, helped manufacture it — a permanent caution in mathematical finance.`,
      keyIdeas: [
        'Foundations: Itô calculus, martingale representation, Girsanov; complete vs. incomplete markets.',
        'Rough-volatility (fractional Brownian, H≈0.1) is the modern empirical model.',
        'Discrete hedging, transaction costs, and model risk turn perfect replication into an approximation — with systemic consequences.',
      ],
      workedExample: {
        prompt: 'Why does the impossibility of continuous, costless hedging undermine the exactness of Black–Scholes, and what risk dominates?',
        solution: `Black–Scholes assumes you rebalance the hedge $\\Delta = \\partial_S V$ **continuously** at zero cost. In reality you rebalance at discrete times, incurring transaction costs each time.

Between rebalancings, the hedge drifts. The leftover P&L over a step $\\delta t$ is governed by **gamma**: a Taylor expansion gives a hedging error $\\approx \\tfrac12\\Gamma\\,(\\delta S)^2 - \\tfrac12\\Gamma\\sigma^2 S^2\\delta t$, i.e. the discrepancy between *realized* squared moves and the *expected* variance. So a delta-hedger is implicitly trading realized vs. implied volatility, with exposure scaling as $\\Gamma$.

Trying to hedge more often shrinks this discretization error but **raises transaction costs** without bound (Leland showed costs effectively add to volatility). The result: perfect replication is unattainable, residual risk is irreducible, and the dominant exposure is **gamma/volatility risk**. This is why options books are never truly riskless, and why crowded, correlated hedging strategies can destabilize markets — the gap between the elegant continuous-time ideal and discrete, costly reality.`,
      },
    },
  ],
  connections: [
    { toId: 'heat-equation', relationship: 'transforms by a change of variables exactly into the' },
    { toId: 'normal-distribution', relationship: 'prices options using the cumulative Gaussian of the' },
    { toId: 'logarithms', relationship: 'models log-returns and discounts continuously using' },
  ],
  viz: {
    component: 'BlackScholes',
    kind: 'interactive',
    defaultParams: { S: 100, K: 100, sigma: 0.2, r: 0.05, T: 1 },
    caption: 'A European call/put pricer with live Greeks: slide the spot, volatility, rate, and time to expiry and watch the price and its sensitivities respond.',
    whatToTry: [
      'Raise volatility σ and watch the option price (and vega) climb.',
      'Move the spot through the strike to see delta sweep from 0 to 1.',
      'Shorten time to expiry and watch theta erode the value (time decay).',
    ],
  },
  primarySources: [
    {
      authors: 'F. Black & M. Scholes',
      title: 'The Pricing of Options and Corporate Liabilities',
      venue: 'Journal of Political Economy 81, 637',
      year: 1973,
      url: 'https://doi.org/10.1086/260062',
      note: 'the option-pricing model',
      primary: true,
    },
    {
      authors: 'R. C. Merton',
      title: 'Theory of Rational Option Pricing',
      venue: 'Bell Journal of Economics 4, 141',
      year: 1973,
      note: 'rigorous derivation and extensions',
      primary: true,
    },
  ],
  furtherReading: [
    { authors: 'J. C. Hull', title: 'Options, Futures, and Other Derivatives', venue: 'Pearson', year: 2017 },
    { authors: 'E. Derman', title: 'My Life as a Quant', venue: 'Wiley', year: 2004 },
  ],
  historyNote: `Fischer Black and Myron Scholes struggled to publish their 1973 paper — it was rejected by two journals before the Journal of Political Economy accepted it, partly thanks to Merton Miller's and Eugene Fama's intervention. The same year, the Chicago Board Options Exchange opened, and within months traders were using the formula (soon programmed into Texas Instruments calculators). Theory and market arrived together.

Scholes and Merton won the 1997 Nobel Memorial Prize (Black had died in 1995 and was ineligible). With cruel irony, the very next year the hedge fund **Long-Term Capital Management**, with both laureates on its board, collapsed spectacularly when markets moved in ways its models deemed nearly impossible — requiring a Fed-organized bailout. The episode became the classic cautionary tale about trusting elegant models past their assumptions.`,
};

export default blackScholes;
