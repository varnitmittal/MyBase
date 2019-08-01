var cacheName = 'my-base-page';
var filesToCache = [
  '/',
  '/index.html',
  '/css/icomoon.css',
  '/css/bootstrap.css',
  '/fonts/flaticon/font/flaticon.css',
  '/css/style.css',
  '/css/mycss.css',
  '/js/modernizr-2.6.2.min.js',
	'/js/jquery.min.js',
	'/js/jquery.easing.1.3.js',
	'/js/bootstrap.min.js',
  '/js/jquery.waypoints.min.js',
  '/js/jquery.flexslider-min.js',
	'/js/jquery.countTo.js',
  '/js/main.js',
  '/icons/android-icon-36x36.png',
  '/icons/android-icon-48x48.png',
  '/icons/android-icon-72x72.png',
  '/icons/android-icon-96x96.png',
  '/icons/android-icon-144x144.png',
  '/icons/android-icon-192x192.png',
  '/icons/ms-icon-512x512.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
