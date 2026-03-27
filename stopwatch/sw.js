const CACHE_NAME = 'stopwatch-cache-v1';
const urlsToCache = [
  './time.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 安裝時快取檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 離線時攔截請求，從快取讀取檔案
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});