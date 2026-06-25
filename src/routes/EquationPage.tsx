import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { loadEquation, neighbours } from '@/content/index';
import { connectionsOf } from '@/content/connections';
import type { Equation, Level } from '@/content/types';
import { MathBlock } from '@/components/math/MathBlock';
import { Markdown } from '@/components/Markdown';
import { LevelSwitcher } from '@/components/LevelSwitcher';
import { SymbolChip, SymbolTable } from '@/components/SymbolGlossaryPopover';
import { VizPanel } from '@/components/VizPanel';
import { Seo } from '@/components/Seo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { fieldColor, fieldLabel, levelName, clamp } from '@/lib/format';
import { useDefaultLevel, usePersistedSet } from '@/lib/prefs';
import NotFound from './NotFound';

function useLevelState(): [Level, (l: Level) => void] {
  const [params, setParams] = useSearchParams();
  const [defaultLevel, setDefaultLevel] = useDefaultLevel();
  const raw = params.get('level');
  const level = (raw ? clamp(parseInt(raw, 10), 1, 5) : defaultLevel) as Level;

  const set = useCallback(
    (l: Level) => {
      const next = new URLSearchParams(params);
      next.set('level', String(l));
      setParams(next, { replace: true });
      setDefaultLevel(l); // remember as the user's default
    },
    [params, setParams, setDefaultLevel],
  );

  return [level, set];
}

export default function EquationPage() {
  const { id } = useParams();
  const [level, setLevel] = useLevelState();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const bookmarks = usePersistedSet('bookmarks');
  const readSet = usePersistedSet('read');

  // The full equation body is loaded on demand (its own chunk). `undefined`
  // means still loading; `null` means no such equation.
  const [eq, setEq] = useState<Equation | null | undefined>(undefined);
  useEffect(() => {
    let alive = true;
    setEq(undefined);
    if (!id) {
      setEq(null);
      return;
    }
    loadEquation(id)
      .then((e) => alive && setEq(e ?? null))
      .catch(() => alive && setEq(null));
    return () => {
      alive = false;
    };
  }, [id]);

  // Mark as read shortly after viewing.
  useEffect(() => {
    if (!eq) return;
    const t = setTimeout(() => {
      if (!readSet.has(eq.id)) readSet.toggle(eq.id);
    }, 4000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eq?.id]);

  // ←/→ change level when not typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') setLevel(clamp(level + 1, 1, 5) as Level);
      if (e.key === 'ArrowLeft') setLevel(clamp(level - 1, 1, 5) as Level);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [level, setLevel]);

  if (eq === undefined) {
    return (
      <div
        className="font-ui flex h-[60vh] items-center justify-center text-sm text-ink-faint"
        role="status"
        aria-live="polite"
      >
        Loading equation…
      </div>
    );
  }
  if (eq === null) return <NotFound />;

  const lc = eq.levels[level - 1];
  const { prev, next } = neighbours(eq.id);
  const related = connectionsOf(eq);

  const copyLatex = async () => {
    try {
      await navigator.clipboard.writeText(eq.canonicalLatex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Seo
        title={eq.name}
        description={eq.oneLine}
        path={`/e/${eq.id}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: eq.name,
          alternativeHeadline: eq.nickname,
          description: eq.significance,
          about: eq.fields.map((f) => ({ '@type': 'Thing', name: f })),
          author: eq.discoverers.map((d) => ({ '@type': 'Person', name: d.name })),
          datePublished: String(eq.era.sortKey),
        }}
      />
      {/* Hero */}
      <header className="border-b border-border pb-6">
        <div className="font-ui mb-3 flex flex-wrap items-center gap-2">
          {eq.fields.map((f) => (
            <Badge key={f} color={fieldColor(f)}>
              {fieldLabel(f)}
            </Badge>
          ))}
          <span className="ml-auto text-sm text-ink-faint">{eq.era.display}</span>
        </div>

        <h1 className="font-ui text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {eq.name}
        </h1>
        {eq.nickname && (
          <p className="font-serif mt-1 text-lg italic text-ink-muted">“{eq.nickname}”</p>
        )}

        <MathBlock tex={eq.canonicalLatex} alt={eq.canonicalAlt} variant="hero" className="my-5" />

        <p className="font-serif text-lg text-ink-muted">{eq.oneLine}</p>

        <p className="font-ui mt-3 text-sm text-ink-faint">
          {eq.discoverers.map((d, i) => (
            <span key={d.name}>
              {i > 0 && ' · '}
              {d.name}
              {d.note ? ` (${d.note})` : ''}
            </span>
          ))}
        </p>

        {/* Actions */}
        <div className="font-ui mt-5 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={bookmarks.has(eq.id) ? 'primary' : 'secondary'}
            onClick={() => bookmarks.toggle(eq.id)}
            aria-pressed={bookmarks.has(eq.id)}
          >
            {bookmarks.has(eq.id) ? '★ Bookmarked' : '☆ Bookmark'}
          </Button>
          <Button
            size="sm"
            variant={readSet.has(eq.id) ? 'primary' : 'secondary'}
            onClick={() => readSet.toggle(eq.id)}
            aria-pressed={readSet.has(eq.id)}
          >
            {readSet.has(eq.id) ? '✓ Read' : 'Mark as read'}
          </Button>
          <Button size="sm" onClick={copyLatex}>
            {copied ? 'Copied!' : 'Copy LaTeX'}
          </Button>
        </div>
      </header>

      {/* Level switcher */}
      <div className="sticky top-[57px] z-30 -mx-4 mt-6 border-b border-border/70 bg-bg/80 px-4 py-4 shadow-sm backdrop-blur-xl">
        <LevelSwitcher level={level} onChange={setLevel} />
      </div>

      {/* Level content (crossfade) */}
      <AnimatePresence mode="wait">
        <motion.section
          key={level}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-6"
          aria-label={`${levelName(level)} explanation`}
        >
          <p className="font-ui mb-4 text-sm uppercase tracking-wide text-accent">
            {lc.audience}
          </p>
          <Markdown
            source={lc.summary}
            className="font-serif mb-4 text-xl leading-relaxed text-ink [&_p]:m-0"
          />

          {lc.equationForms.length > 0 && (
            <div className="mb-4">
              {lc.equationForms.map((f, i) => (
                <MathBlock key={i} tex={f.latex} caption={f.caption} />
              ))}
            </div>
          )}

          <Markdown source={lc.body} />

          {/* Key ideas */}
          <div className="mt-6 rounded-lg border border-border bg-surface-2/60 p-4">
            <h3 className="font-ui mb-2 text-sm font-semibold text-ink">Key ideas</h3>
            <ul className="font-serif list-disc space-y-1 pl-5 text-ink-muted">
              {lc.keyIdeas.map((k, i) => (
                <li key={i}>
                  <Markdown source={k} className="inline" />
                </li>
              ))}
            </ul>
          </div>

          {/* Worked example */}
          {lc.workedExample && (
            <details className="mt-4 rounded-lg border border-border bg-surface p-4" open>
              <summary className="font-ui cursor-pointer font-semibold text-ink">
                Worked example
              </summary>
              <div className="mt-3">
                <p className="font-ui mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Problem
                </p>
                <Markdown source={lc.workedExample.prompt} />
                <p className="font-ui mb-1 mt-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Solution
                </p>
                <Markdown source={lc.workedExample.solution} />
              </div>
            </details>
          )}

          {/* Misconceptions */}
          {lc.misconceptions && lc.misconceptions.length > 0 && (
            <div className="mt-4 space-y-3">
              {lc.misconceptions.map((m, i) => (
                <div
                  key={i}
                  className="rounded-lg border-l-4 border-amber-500/70 bg-amber-500/5 p-4"
                >
                  <p className="font-ui text-sm font-semibold text-ink">
                    Misconception: <span className="font-normal italic">“{m.claim}”</span>
                  </p>
                  <div className="font-serif mt-1 text-sm text-ink-muted">
                    <Markdown source={m.correction} className="inline" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Glossed over */}
          {lc.glossedOver && (
            <div className="font-ui mt-4 flex gap-2 rounded-lg bg-surface-2 p-3 text-sm text-ink-muted">
              <span className="shrink-0 font-semibold text-ink">⚠︎ What we glossed over:</span>
              <Markdown source={lc.glossedOver} className="[&_p]:m-0" />
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      {/* Visualization */}
      {eq.viz && <VizPanel viz={eq.viz} />}

      {/* Symbols */}
      <section className="mt-10">
        <h2 className="font-ui mb-3 text-xl font-semibold">Symbols</h2>
        <div className="mb-3 flex flex-wrap gap-1">
          {eq.symbols.map((s, i) => (
            <SymbolChip key={i} def={s} />
          ))}
        </div>
        <Card>
          <CardBody className="overflow-x-auto">
            <SymbolTable symbols={eq.symbols} />
          </CardBody>
        </Card>
      </section>

      {/* Connections */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-ui mb-3 text-xl font-semibold">Connections</h2>
          <ul className="flex flex-col gap-2">
            {related.map(({ equation, relationship }) => (
              <li key={equation.id}>
                <Link
                  to={`/e/${equation.id}`}
                  className="font-ui flex flex-wrap items-baseline gap-x-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow-sm transition-all duration-200 ease-smooth hover:translate-x-0.5 hover:border-accent/40"
                >
                  <span className="text-ink-muted">{relationship}</span>
                  <span className="font-semibold text-accent">{equation.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Applications */}
      <section className="mt-10">
        <h2 className="font-ui mb-3 text-xl font-semibold">Where it shows up</h2>
        <ul className="font-serif list-disc space-y-1 pl-5 text-ink-muted">
          {eq.applications.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>

      {/* History */}
      {eq.historyNote && (
        <section className="mt-10">
          <h2 className="font-ui mb-3 text-xl font-semibold">History</h2>
          <Markdown source={eq.historyNote} />
        </section>
      )}

      {/* Sources */}
      <section className="mt-10">
        <h2 className="font-ui mb-3 text-xl font-semibold">Sources & further reading</h2>
        <ul className="space-y-2">
          {[...eq.primarySources, ...eq.furtherReading].map((c, i) => (
            <li key={i} className="font-ui text-sm text-ink-muted">
              {c.primary && (
                <Badge color={fieldColor('physics')} className="mr-2 align-middle">
                  primary
                </Badge>
              )}
              {c.authors}, {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">
                  <em>{c.title}</em>
                </a>
              ) : (
                <em>{c.title}</em>
              )}
              {c.venue ? `, ${c.venue}` : ''} ({c.year}).
              {c.note && <span className="text-ink-faint"> {c.note}</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Prev / next */}
      <nav className="font-ui mt-12 flex items-stretch justify-between gap-3 border-t border-border pt-6 text-sm">
        {prev ? (
          <Link to={`/e/${prev.id}`} className="text-ink-muted hover:text-accent">
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/e/${next.id}`} className="text-right text-ink-muted hover:text-accent">
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
