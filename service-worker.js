const CACHE = 'langooric-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/assets/logo-64.png',
  '/assets/logo-192.png',
  '/assets/logo-512.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Dancing+Script:wght@400;600;700&family=Special+Elite&family=IM+Fell+English:ital@0;1&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Courier+Prime:ital@0;1&display=swap'
];

// Install — cache everything
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate — clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch — cache-first, network fallback
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        // Cache new valid responses
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      });
    }).catch(() => caches.match('/index.html')) // offline fallback
  );
});
