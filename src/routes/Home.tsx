import { Link } from 'react-router-dom';
import { useState } from 'react';
import logisticMap from '@/content/equations/logistic-map';
import { APP_NAME, APP_TAGLINE, TOTAL_EQUATIONS } from '@/config';
import { MathBlock } from '@/components/math/MathBlock';
import { LevelSwitcher } from '@/components/LevelSwitcher';
import { Markdown } from '@/components/Markdown';
import { Button } from '@/components/ui/Button';
import { useDefaultLevel } from '@/lib/prefs';
import { levelName } from '@/lib/format';
import { Seo } from '@/components/Seo';
import type { Level } from '@/content/types';

export default function Home() {
  // Live mini-demo of the level switcher on the flagship equation (imported
  // directly so the landing page doesn't pull the whole corpus).
  const demo = logisticMap;
  const [demoLevel, setDemoLevel] = useState<Level>(1);
  const [defaultLevel, setDefaultLevel] = useDefaultLevel();

  return (
    <div className="mx-auto max-w-4xl px-4">
      <Seo
        title="The equations that remade the world — at five levels"
        description={APP_TAGLINE}
        path="/"
      />
      {/* Hero */}
      <section className="animate-fade-in-up py-16 text-center sm:py-24">
        <p className="font-ui mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-accent shadow-sm backdrop-blur">
          {TOTAL_EQUATIONS} equations · 5 levels each
        </p>
        <h1 className="font-ui bg-gradient-to-br from-ink to-ink-muted bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {APP_NAME}
        </h1>
        <p className="font-serif mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-ink-muted">
          {APP_TAGLINE} The same equation reads as a fairy tale or a research brief —
          you choose the altitude. Nobody is talked down to; nobody is left behind.
        </p>
        <div className="font-ui mt-8 flex justify-center gap-3">
          <Link to="/equations">
            <Button variant="primary">Browse equations</Button>
          </Link>
          <Link to={`/e/${demo.id}`}>
            <Button>Start with the flagship →</Button>
          </Link>
        </div>
      </section>

      {/* Live level-switcher demo */}
      {demo && (
        <section className="surface-card mb-16 p-6 sm:p-8">
          <div className="font-ui mb-1 text-sm text-ink-faint">Try the idea, live:</div>
          <h2 className="font-ui mb-5 text-2xl font-semibold text-ink">{demo.name}</h2>
          <div className="mb-6 max-w-md">
            <LevelSwitcher level={demoLevel} onChange={setDemoLevel} />
          </div>
          <MathBlock
            tex={demo.levels[demoLevel - 1].equationForms[0]?.latex ?? demo.canonicalLatex}
          />
          <p className="font-ui mb-2 mt-4 text-sm uppercase tracking-wide text-accent">
            {levelName(demoLevel)}
          </p>
          <Markdown source={demo.levels[demoLevel - 1].summary} />
          <div className="mt-5">
            <Link to={`/e/${demo.id}?level=${demoLevel}`} className="font-ui text-sm text-accent underline underline-offset-2">
              Read the full {demo.name} page at this level →
            </Link>
          </div>
        </section>
      )}

      {/* Default-level preference */}
      <section className="mb-16">
        <h2 className="font-ui mb-3 text-xl font-semibold">Read everything at…</h2>
        <p className="font-serif mb-4 text-ink-muted">
          Pick a default reading level. Every equation opens here first — you can still slide
          up or down on any page.
        </p>
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3, 4, 5] as Level[]).map((l) => (
            <Button
              key={l}
              size="sm"
              variant={defaultLevel === l ? 'primary' : 'secondary'}
              onClick={() => setDefaultLevel(l)}
            >
              L{l} · {levelName(l)}
            </Button>
          ))}
        </div>
      </section>

      {/* Entry points */}
      <section className="mb-20 grid gap-4 sm:grid-cols-3">
        {[
          { to: '/timeline', t: 'Timeline', d: 'From Pythagoras to the Mandelbrot set — watch discovery accelerate.' },
          { to: '/connections', t: 'Connections', d: 'The web of ideas: which equations are secretly the same.' },
          { to: '/glossary', t: 'Glossary', d: 'Every symbol, with meaning and units, in one place.' },
        ].map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="card-interactive group p-5"
          >
            <h3 className="font-ui font-semibold text-ink transition-colors group-hover:text-accent">{c.t}</h3>
            <p className="font-serif mt-1 text-sm text-ink-muted">{c.d}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
