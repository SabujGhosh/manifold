import { useMemo } from 'react';
import katex from 'katex';

interface MathProps {
  /** LaTeX source (without delimiters). */
  tex: string;
  /**
   * Plain-language transcription for screen readers. KaTeX emits MathML too,
   * but a human transcription ("a squared plus b squared equals c squared")
   * is clearer than machine-read MathML, so we prefer it when supplied.
   */
  alt?: string;
  className?: string;
}

/** Inline math: $...$ */
export function Math({ tex, alt, className }: MathProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: false,
        throwOnError: false,
        output: 'htmlAndMathml',
        strict: false,
      }),
    [tex],
  );

  return (
    <span
      className={className}
      // KaTeX output is generated from trusted, authored TeX strings.
      dangerouslySetInnerHTML={{ __html: html }}
      {...(alt ? { 'aria-label': alt, role: 'math' } : {})}
    />
  );
}
