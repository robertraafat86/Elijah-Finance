const CACHE_NAME = 'elijah-cache-v2'; // Incremented version
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install: Cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching essential assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Better strategy (Network-First for HTML/SPA, Cache-First for others)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // For navigation requests (SPA routes), try network first, then fallback to index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }

  // For other assets, try cache first, then network
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).then(fetchResponse => {
        // Optionally cache new assets here if desired
        return fetchResponse;
      }).catch(() => {
        // Fallback for failed fetches if necessary
      });
    })
  );
});
