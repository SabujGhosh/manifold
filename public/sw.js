/* Simple offline-capable service worker for The Equations.
 * Strategy:
 *  - navigations: network-first, falling back to the cached app shell ("/")
 *    so the SPA loads offline; then client-side routing takes over.
 *  - same-origin GET assets (hashed JS/CSS/fonts): stale-while-revalidate.
 * Vite fingerprints asset filenames, so cached assets are safe and a new
 * deploy fetches fresh files on next online visit.
 */
const CACHE = 'equations-v1';
const SHELL = ['/', '/index.html', '/favicon.svg', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('/', copy));
          return res;
        })
        .catch(() => caches.match('/').then((r) => r || caches.match('/index.html'))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
