import { Suspense, lazy, useEffect, useState } from 'react';
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

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 transition-colors ${
    isActive ? 'bg-accent-soft text-accent' : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
  }`;

function Header() {
  const palette = useCommandPalette();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Collapse the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/70 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4">
        <Link
          to="/"
          aria-label={`${APP_NAME} — home`}
          className="font-ui flex items-center gap-2 font-semibold text-ink"
        >
          <LogoMark size={34} />
          <span>{APP_NAME}</span>
        </Link>

        {/* Desktop nav (present in the a11y tree only ≥ md). */}
        <nav aria-label="Primary" className="font-ui ml-auto hidden items-center gap-1 text-sm md:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={navLinkClass}>
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

        {/* Hamburger — mobile only. */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="font-ui inline-flex items-center justify-center rounded-lg border border-border bg-surface p-1.5 text-ink-muted shadow-sm transition-colors hover:border-accent/40 hover:text-ink md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {menuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3.5" y1="7" x2="20.5" y2="7" />
                <line x1="3.5" y1="12" x2="20.5" y2="12" />
                <line x1="3.5" y1="17" x2="20.5" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer — present in the a11y tree only < md and when open. */}
      <nav
        id="mobile-nav"
        aria-label="Primary"
        className={`font-ui overflow-hidden border-t border-border/70 md:hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3 text-sm">
          {NAV.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 transition-colors ${
                    isActive ? 'bg-accent-soft text-accent' : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
                  }`
                }
              >
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
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
