import { useMemo } from 'react';
import katex from 'katex';

interface MathBlockProps {
  tex: string;
  /** Plain-language transcription for screen readers. */
  alt?: string;
  caption?: string;
  /** `hero` = large, unboxed (equation-page hero). Default boxed display. */
  variant?: 'block' | 'hero';
  className?: string;
}

/** Display math: $$...$$ */
export function MathBlock({ tex, alt, caption, variant = 'block', className }: MathBlockProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false,
        output: 'htmlAndMathml',
        strict: false,
      }),
    [tex],
  );

  return (
    <figure className={className}>
      <div
        className={variant === 'hero' ? 'math-hero' : 'math-block'}
        dangerouslySetInnerHTML={{ __html: html }}
        {...(alt ? { 'aria-label': alt, role: 'math' } : {})}
      />
      {caption && (
        <figcaption className="font-ui mt-1 text-center text-sm text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
