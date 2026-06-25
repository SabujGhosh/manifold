import { APP_NAME, TOTAL_EQUATIONS } from '@/config';
import { Seo } from '@/components/Seo';

export default function About() {
  return (
    <div className="mx-auto max-w-prose px-4 py-10">
      <Seo
        title={`About ${APP_NAME}`}
        description={`How ${APP_NAME} explains ${TOTAL_EQUATIONS} consequential equations at five selectable levels, and the principles behind it.`}
        path="/about"
      />
      <h1 className="font-ui text-3xl font-bold text-ink">About {APP_NAME}</h1>
      <div className="prose-eq mt-4">
        <p>
          {APP_NAME} explains {TOTAL_EQUATIONS} of the most consequential equations in human
          history at <strong>five selectable levels</strong> — from a curious twelve-year-old to a
          working researcher. The same page can be read as a story or as a review article; you
          choose the altitude with the level switcher.
        </p>
        <h2>Principles</h2>
        <ul>
          <li>
            <strong>Accuracy first.</strong> Forms, constants, dates, and attributions are
            verified. Where a level simplifies, it says so rather than stating a half-truth as
            fact.
          </li>
          <li>
            <strong>Each level adds, not repeats.</strong> Sliding up should feel like climbing.
          </li>
          <li>
            <strong>Honest caveats.</strong> Load-bearing simplifications carry a “what we glossed
            over” note pointing to where the full story lives.
          </li>
        </ul>
        <h2>How it’s built</h2>
        <p>
          A fully static, client-only web app (Vite + React + TypeScript). Math is typeset with
          KaTeX; visualizations are hand-built on canvas and SVG. No backend, no tracking. Content
          is authored as typed data modules and validated at build time.
        </p>
      </div>
    </div>
  );
}
