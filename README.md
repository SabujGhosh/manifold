# Manifold

*One equation, many levels.*

33 of the most consequential equations in human history, each explained at **five
selectable levels of proficiency** — from a curious 12-year-old (L1) to a working
researcher (L5). The same equation, on the same page, reads as a fairy tale or a
review article depending on a level switch.

Fully static, client-only (Vite + React + TypeScript). No backend, no tracking.

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

```bash
pnpm build        # validate + generate sitemap + typecheck, then build to dist/
pnpm preview      # serve the production build
pnpm test         # vitest unit tests (399: math, content integrity, KaTeX, code-split)
pnpm validate     # run the content validator on its own
pnpm gen:meta     # regenerate src/content/meta.generated.ts from the corpus
pnpm sitemap      # regenerate public/sitemap.xml (set SITE_URL for your domain)
pnpm typecheck    # tsc --noEmit
```

> Set `SITE_URL=https://your-domain` before `pnpm build` so the sitemap and
> `robots.txt` reference your real origin (defaults to a placeholder).

## Status

**All 33 equations are authored** (the 32 from the build prompt plus the Laplace
transform) at the full five-level depth — symbols with units, ≥2 connections, L2/L3
worked examples, primary sources, history notes — validated at build time, and each has
a working visualization (interactive where specified, a real concept animation otherwise).

Functional routes: **Home**, **Browse** (search/filter), per-equation pages, **Glossary**,
**Timeline** (era-grouped, with a discovery-density strip), and **Connections** (a
force-directed graph with neighborhood highlighting, a legend, and an accessible list
fallback).

**Command palette & keyboard shortcuts:**
- <kbd>⌘K</kbd> / <kbd>Ctrl-K</kbd> (or the header Search button) opens a palette to jump to any
  equation, page, or reading level.
- <kbd>/</kbd> focuses the Browse search (or opens the palette elsewhere).
- <kbd>g</kbd> then <kbd>b</kbd>/<kbd>t</kbd>/<kbd>c</kbd>/<kbd>h</kbd> → Browse / Timeline / Connections / Home.
- <kbd>←</kbd>/<kbd>→</kbd> change the reading level on an equation page.

**Accessibility / performance / PWA / SEO** (build-prompt §14 steps 9–10) are done:
- **A11y:** skip link, semantic landmarks (labelled primary nav, `aria-current`), focus
  moved to `#main` on route change, `prefers-reduced-motion` honored throughout, KaTeX
  MathML + plain-language `aria-label`s on every equation and visualization, full keyboard
  operability.
- **Performance:** routes are `React.lazy` code-split; vendors (react/router, KaTeX,
  framer-motion, markdown) are separate cacheable chunks. Content is split **per equation**:
  listing/search/graph views read a small generated metadata chunk (~20 kB gzip for all 33),
  and each equation's full prose loads as its own ~5 kB-gzip chunk only when its page opens —
  so opening one equation no longer downloads all of them. The entry chunk is ~15 kB.
- **PWA:** web manifest + an offline-capable service worker (network-first navigations
  with a cached app shell; stale-while-revalidate for assets), installable, registered in
  production.
- **SEO:** per-route `<title>`, description, Open Graph, Twitter, and canonical tags (via
  the `Seo` component), JSON-LD on equation pages, a generated `sitemap.xml`, and
  `robots.txt`.

Note on SSG: meta tags are applied client-side rather than via full static
prerendering (a heavier build step); for maximal crawlability a prerender/SSG pass could
emit them statically later.

## Architecture

```
src/
  content/          Typed content. The single source of truth.
    types.ts        The Equation data model (+ lightweight EquationMeta projection).
    corpus.ts       Eager full corpus — BUILD-TIME/TEST ONLY (generator, validator, tests).
    meta.generated.ts   Generated lightweight metadata (pnpm gen:meta). Do not hand-edit.
    index.ts        Runtime API: metadata index + lazy loadEquation(id) (one chunk/equation).
    connections.ts  Bidirectional relationship graph derived from connections[].
    equations/<id>.ts   One module per equation, `export default` an Equation.
  components/        UI: Math/MathBlock (KaTeX), Markdown, LevelSwitcher, primitives (ui/).
  viz/              Visualizations. registry.tsx maps a name -> lazy component.
  routes/           Home, Browse, EquationPage, Timeline, Connections, Glossary, About.
  lib/              theme, storage, prefs, format, dynamics (logistic math).
scripts/
  validate-content.ts   Fails the build on missing levels/symbols/citations.
```

State: the **URL is the source of truth** for which equation and which level
(`/e/logistic-map?level=3`), so any view is shareable. Theme, default reading
level, bookmarks, and read-marks persist in `localStorage`.

## Add a new equation

1. Create `src/content/equations/<id>.ts` exporting a default `Equation`. Author
   **all five levels** (L1–L5), every symbol with units, ≥2 connections, ≥1 primary
   source where one exists, applications, and a history note. Match the depth and
   honesty of `logistic-map.ts` (the calibration bar).
2. Register it in `src/content/corpus.ts` (`import` + add to the `equations` array).
   The filename stem **must** equal the equation's `id` (that's how `loadEquation` finds it).
3. Run `pnpm validate` then `pnpm gen:meta` (both run automatically in `prebuild`/`predev`).
   Validation throws on missing levels, symbols, worked examples (L2/L3), connections, or
   citations; `gen:meta` refreshes the runtime metadata. `pnpm test` covers the rest.

Authoring rules (see the build prompt §1, §5): each higher level should *add*, not
repeat. Lower levels must stay **true** — flag any load-bearing simplification with
`glossedOver` rather than stating a half-truth. Never invent a source, constant, or date.

## Register a new visualization

1. Build the component in `src/viz/<Name>.tsx` as a `default` export taking
   `{ params }: VizProps`. Use `shared/useCanvas.ts` for HiDPI/theme-aware canvases.
   Provide a reduced-motion fallback and an `aria-label`/text summary.
2. Add it to the `registry` map in `src/viz/registry.tsx` (lazy-imported).
3. Reference it from the equation's `viz.component` field, with `defaultParams`,
   a `caption`, and `whatToTry` prompts that teach the key phenomenon.

## Conventions

- **Math** is rendered with KaTeX via `<Math>` (inline) and `<MathBlock>` (display);
  pass a plain-language `alt` for screen readers. Inside `.ts` content modules,
  escape every LaTeX backslash (`\\frac`, `\\lambda`) — they are JS strings.
- **Markdown** bodies support `$...$` / `$$...$$` and are sanitized with DOMPurify.
- Theme is driven by CSS variables in `src/styles/globals.css`; Tailwind reads them.
