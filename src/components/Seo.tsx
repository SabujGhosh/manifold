import { useEffect } from 'react';
import { APP_NAME } from '@/config';

interface SeoProps {
  title: string;
  description: string;
  /** Path for canonical/OG url; defaults to the current pathname. */
  path?: string;
  /** Optional JSON-LD structured data object. */
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets per-route document title and meta tags (description, Open Graph, Twitter,
 * canonical) and optional JSON-LD. This is client-side; for a fully crawlable
 * build a prerender/SSG step would emit these statically (see README).
 */
export function Seo({ title, description, path, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = `${title} · ${APP_NAME}`;
    const url = (typeof location !== 'undefined' ? location.origin : '') + (path ?? location.pathname);

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', APP_NAME);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertCanonical(url);

    const id = 'route-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, path, jsonLd]);

  return null;
}
