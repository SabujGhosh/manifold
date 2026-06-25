import { Suspense } from 'react';
import { getViz } from '@/viz/registry';
import { Card, CardBody } from './ui/Card';
import type { VizSpec } from '@/content/types';

export function VizPanel({ viz }: { viz: VizSpec }) {
  const Component = getViz(viz.component);

  return (
    <section aria-labelledby="viz-heading" className="mt-10">
      <h2 id="viz-heading" className="font-ui mb-3 text-xl font-semibold">
        Explore it
      </h2>
      <Card>
        <CardBody>
          {Component ? (
            <Suspense
              fallback={
                <div className="font-ui flex h-48 items-center justify-center text-sm text-ink-faint">
                  Loading visualization…
                </div>
              }
            >
              <Component params={viz.defaultParams} />
            </Suspense>
          ) : (
            <p className="font-ui text-sm text-ink-faint">
              Visualization “{viz.component}” is not registered yet.
            </p>
          )}

          <p className="font-ui mt-4 text-sm text-ink-muted">{viz.caption}</p>

          {viz.whatToTry.length > 0 && (
            <div className="mt-4 rounded-lg bg-surface-2 p-4">
              <h3 className="font-ui mb-2 text-sm font-semibold text-ink">What to try</h3>
              <ul className="font-ui list-disc space-y-1 pl-5 text-sm text-ink-muted">
                {viz.whatToTry.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>
    </section>
  );
}
