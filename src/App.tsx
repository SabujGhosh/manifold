import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import { CommandPaletteProvider, useCommandPalette } from './components/CommandPalette';
import { LogoMark } from './components/Logo';
import { APP_NAME } from './config';
import NotFound from './routes/NotFound';

// Routes are code-split so the initial bundle stays lean.
const Home = lazy(() => import('./routes/Home'));
const Browse = lazy(() => import('./routes/Browse'));
const EquationPage = lazy(() => import('./routes/EquationPage'));
const Timeline = lazy(() => import('./routes/Timeline'));
const Connections = lazy(() => import('./routes/Connections'));
const Glossary = lazy(() => import('./routes/Glossary'));
const About = lazy(() => import('./routes/About'));

const NAV = [
  { to: '/equations', label: 'Browse' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/connections', label: 'Connections' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/about', label: 'About' },
];

function Header() {
  const palette = useCommandPalette();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/70 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          to="/"
          aria-label={`${APP_NAME} — home`}
          className="font-ui flex items-center gap-2 font-semibold text-ink"
        >
          <LogoMark size={34} />
          <span>{APP_NAME}</span>
        </Link>
        <nav aria-label="Primary" className="font-ui ml-auto hidden items-center gap-1 text-sm md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 transition-colors ${
                  isActive
                    ? 'bg-accent-soft text-accent'
                    : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={palette.open}
          aria-label="Open command palette"
          className="font-ui ml-auto inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-ink-muted shadow-sm transition-all duration-200 ease-smooth hover:border-accent/40 hover:text-ink md:ml-0"
        >
          <span aria-hidden>⌘</span>
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-border px-1 text-[0.65rem] sm:inline">⌘K</kbd>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}

/** Scroll to top + focus main on route change (a11y). */
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus();
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <RouteEffects />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense
          fallback={
            <div className="font-ui flex h-[50vh] items-center justify-center text-sm text-ink-faint">
              Loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equations" element={<Browse />} />
            <Route path="/e/:id" element={<EquationPage />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
        <footer className="border-t border-border">
          <div className="font-ui mx-auto max-w-6xl px-4 py-6 text-sm text-ink-faint">
            {APP_NAME} — equations explained at five levels. Built for the curious and the rigorous alike.
          </div>
        </footer>
      </div>
    </CommandPaletteProvider>
  );
}
