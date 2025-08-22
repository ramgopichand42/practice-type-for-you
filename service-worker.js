const CACHE_NAME = 'typemaster-cache-v1';
const urlsToCache = [
  '/index.html',
  '/tutorials.html',
  '/practice.html',
  '/test.html',
  '/progress.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/js/keyboard.js',
  '/assets/js/hand.js',
  '/assets/js/practice.js',
  '/assets/js/test.js',
  '/assets/js/progress.js',
  '/assets/js/utils.js'
];

// Install SW
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch SW
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
