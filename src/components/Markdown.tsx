import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';

/**
 * Markdown + math renderer.
 *
 * Pipeline:
 *  1. Pull math spans ($$...$$ display, $...$ inline) out and replace them with
 *     inert alphanumeric placeholders, so Markdown parsing can't mangle the TeX.
 *  2. Parse Markdown -> HTML and sanitize it with DOMPurify (defence in depth;
 *     content is authored/trusted but we never trust-by-default).
 *  3. Render each math span with KaTeX and splice the (locally generated,
 *     trusted) KaTeX HTML back in, so sanitization can't strip KaTeX internals.
 */

marked.setOptions({ gfm: true, breaks: false });

interface Segment {
  token: string;
  html: string;
}

function renderMathSegments(src: string): { text: string; segments: Segment[] } {
  const segments: Segment[] = [];
  let i = 0;

  const make = (tex: string, display: boolean) => {
    const token = `xEQMATH${i}Zx`;
    i += 1;
    const html = katex.renderToString(tex.trim(), {
      displayMode: display,
      throwOnError: false,
      output: 'htmlAndMathml',
      strict: false,
    });
    segments.push({ token, html: display ? `<div class="math-block">${html}</div>` : html });
    return token;
  };

  // Display math first so $$ isn't eaten by the inline pass.
  let text = src.replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex) => make(tex, true));
  // Inline math: a single $...$ not spanning newlines.
  text = text.replace(/(?<!\\)\$([^$\n]+?)\$/g, (_m, tex) => make(tex, false));
  return { text, segments };
}

export function Markdown({ source, className }: { source: string; className?: string }) {
  const html = useMemo(() => {
    const { text, segments } = renderMathSegments(source);
    const parsed = marked.parse(text) as string;
    let clean = DOMPurify.sanitize(parsed, {
      ADD_ATTR: ['target', 'rel'],
    });
    // Splice trusted KaTeX HTML back into the sanitized markup.
    for (const seg of segments) {
      clean = clean.replace(seg.token, seg.html);
    }
    return clean;
  }, [source]);

  return (
    <div
      className={className ?? 'prose-eq'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
