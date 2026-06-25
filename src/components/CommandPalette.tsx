import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDefaultLevel } from '@/lib/prefs';
import { levelName } from '@/lib/format';
import type { Level } from '@/content/types';

interface Ctx {
  open: () => void;
  close: () => void;
  toggle: () => void;
}
const PaletteContext = createContext<Ctx | null>(null);
export const useCommandPalette = () => {
  const c = useContext(PaletteContext);
  if (!c) throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  return c;
};

interface Item {
  id: string;
  label: string;
  sub?: string;
  group: string;
  keywords?: string;
  run: () => void;
}

const PAGES = [
  { to: '/', label: 'Home' },
  { to: '/equations', label: 'Browse equations' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/connections', label: 'Connections' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/about', label: 'About' },
];

interface EqMeta { id: string; name: string; oneLine: string; keywords: string; }

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const [eqMeta, setEqMeta] = useState<EqMeta[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [, setDefaultLevel] = useDefaultLevel();
  const chordRef = useRef<number>(0);

  // Load the (heavy) equation corpus lazily on first open so it stays out of
  // the initial bundle.
  const loadEquations = useCallback(() => {
    if (eqMeta.length) return;
    void import('@/content/index').then((m) => {
      setEqMeta(
        m.equations.map((eq) => ({
          id: eq.id,
          name: eq.name,
          oneLine: eq.oneLine,
          keywords: `${eq.fields.join(' ')} ${eq.symbols.map((s) => s.name).join(' ')} ${eq.nickname ?? ''}`,
        })),
      );
    });
  }, [eqMeta.length]);

  const open = useCallback(() => { setOpen(true); setQuery(''); setSel(0); loadEquations(); }, [loadEquations]);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => { if (!o) loadEquations(); return !o; }), [loadEquations]);

  // current equation id (if on an equation page)
  const currentEqId = location.pathname.startsWith('/e/') ? location.pathname.slice(3) : null;

  const items: Item[] = useMemo(() => {
    const list: Item[] = [];
    for (const p of PAGES) {
      list.push({ id: `page:${p.to}`, label: p.label, group: 'Pages', run: () => navigate(p.to) });
    }
    // level actions
    ([1, 2, 3, 4, 5] as Level[]).forEach((l) => {
      if (currentEqId) {
        list.push({
          id: `level:${l}`,
          label: `Read this equation at Level ${l}`,
          sub: levelName(l),
          group: 'Reading level',
          keywords: `level ${l} ${levelName(l)}`,
          run: () => { setDefaultLevel(l); navigate(`/e/${currentEqId}?level=${l}`, { replace: true }); },
        });
      } else {
        list.push({
          id: `deflevel:${l}`,
          label: `Set default reading level → L${l}`,
          sub: levelName(l),
          group: 'Reading level',
          keywords: `level ${l} ${levelName(l)} default`,
          run: () => setDefaultLevel(l),
        });
      }
    });
    for (const eq of eqMeta) {
      list.push({
        id: `eq:${eq.id}`,
        label: eq.name,
        sub: eq.oneLine,
        group: 'Equations',
        keywords: eq.keywords,
        run: () => navigate(`/e/${eq.id}`),
      });
    }
    return list;
  }, [navigate, currentEqId, setDefaultLevel, eqMeta]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => `${it.label} ${it.sub ?? ''} ${it.keywords ?? ''}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => { setSel(0); }, [query]);
  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  // run a selection
  const choose = useCallback((it?: Item) => {
    if (!it) return;
    close();
    it.run();
  }, [close]);

  // global keyboard: Cmd/Ctrl-K, /, and g-chords
  useEffect(() => {
    const inField = (el: EventTarget | null) => {
      const tag = (el as HTMLElement)?.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || (el as HTMLElement)?.isContentEditable;
    };
    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl-K toggles from anywhere
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggle();
        return;
      }
      if (isOpen) return; // palette handles its own keys while open
      if (inField(e.target)) return;

      // "/" focuses search (or opens palette as a search surface)
      if (e.key === '/') {
        const search = document.getElementById('global-search') as HTMLInputElement | null;
        if (search) { e.preventDefault(); search.focus(); }
        else { e.preventDefault(); open(); }
        return;
      }
      // g-chords: g then b/t/c/h
      const now = Date.now();
      if (e.key === 'g') { chordRef.current = now; return; }
      if (now - chordRef.current < 1000) {
        const map: Record<string, string> = { b: '/equations', t: '/timeline', c: '/connections', h: '/' };
        const to = map[e.key.toLowerCase()];
        if (to) { e.preventDefault(); chordRef.current = 0; navigate(to); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, toggle, open, navigate]);

  const ctx = useMemo(() => ({ open, close, toggle }), [open, close, toggle]);

  return (
    <PaletteContext.Provider value={ctx}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[12vh]"
          onClick={close}
          role="presentation"
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump to an equation, level, or page…"
              aria-label="Command palette search"
              role="combobox"
              aria-expanded
              aria-controls="cmdk-list"
              className="font-ui w-full border-b border-border bg-transparent px-4 py-3.5 text-base text-ink outline-none placeholder:text-ink-faint"
              onKeyDown={(e) => {
                if (e.key === 'Escape') { e.preventDefault(); close(); }
                else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                else if (e.key === 'Enter') { e.preventDefault(); choose(filtered[sel]); }
              }}
            />
            <ul id="cmdk-list" role="listbox" className="max-h-[50vh] overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="font-ui px-4 py-6 text-center text-sm text-ink-faint">No matches.</li>
              )}
              {filtered.map((it, i) => {
                const showGroup = i === 0 || filtered[i - 1].group !== it.group;
                return (
                  <li key={it.id} role="option" aria-selected={i === sel}>
                    {showGroup && (
                      <div className="font-ui px-4 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-wide text-ink-faint">
                        {it.group}
                      </div>
                    )}
                    <button
                      type="button"
                      onMouseEnter={() => setSel(i)}
                      onClick={() => choose(it)}
                      className={`font-ui flex w-full items-baseline gap-2 px-4 py-2 text-left text-sm ${i === sel ? 'bg-accent-soft text-ink' : 'text-ink-muted'}`}
                    >
                      <span className="font-medium text-ink">{it.label}</span>
                      {it.sub && <span className="truncate text-xs text-ink-faint">{it.sub}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="font-ui flex items-center gap-3 border-t border-border px-4 py-2 text-[0.7rem] text-ink-faint">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>esc</kbd> close</span>
              <span className="ml-auto"><kbd>g</kbd> then <kbd>b</kbd>/<kbd>t</kbd>/<kbd>c</kbd> to jump</span>
            </div>
          </div>
        </div>
      )}
    </PaletteContext.Provider>
  );
}
