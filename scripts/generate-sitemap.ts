/**
 * Generates public/sitemap.xml from the static routes plus every equation page.
 * Set SITE_URL to your deploy origin (defaults to a placeholder). Run via
 * `pnpm sitemap` (wired into prebuild).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { equations } from '../src/content/corpus';

const SITE_URL = (process.env.SITE_URL ?? 'https://the-equations.example').replace(/\/$/, '');

const staticPaths = ['/', '/equations', '/timeline', '/connections', '/glossary', '/about'];
const equationPaths = equations.map((e) => `/e/${e.id}`);
const all = [...staticPaths, ...equationPaths];

const today = new Date().toISOString().slice(0, 10);
const urls = all
  .map(
    (p) =>
      `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml');
writeFileSync(out, xml);
console.log(`✓  Wrote sitemap with ${all.length} URLs to public/sitemap.xml (base: ${SITE_URL})`);
