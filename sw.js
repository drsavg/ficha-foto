// Funcionamiento sin conexión. Cambia VERSION cada vez que actualices archivos.
const VERSION = 'ficha-1.0.1';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  'icons/apple-touch-icon.png', 'icons/app-192.png', 'icons/app-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  if (isPage) {
    // Red primero (para recibir actualizaciones), caché si no hay conexión
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put('./', copy));
        return res;
      }).catch(() => caches.match('./', {ignoreSearch: true}).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || fetch(req)));
});
