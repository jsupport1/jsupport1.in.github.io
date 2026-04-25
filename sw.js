const CACHE_NAME = 'dnt-v1.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './pages/tool.html',
  './pages/emi-calculator.html',
  './pages/about.html',
  './pages/contact.html',
  './pages/privacy-policy.html',
  './pages/terms.html',
  './pages/disclaimer.html',
  './pages/cookie-policy.html',
  './pages/copyright.html',
  './css/main.css',
  './js/engine.js',
  './js/emi-engine.js',
  './js/layout.js',
  './manifest.json',
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request) || caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});