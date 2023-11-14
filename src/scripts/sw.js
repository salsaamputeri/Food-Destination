import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/icon16x16.png',
  './icons/icon24x24.png',
  './icons/icon32x32.png',
  './icons/icon64x64.png',
  './icons/icon128x128.png',
  './icons/icon256x256.png',
  './icons/icon-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    event.respondWith(CacheHelper.revalidateCache(event.request));
  } else if (requestUrl.origin === 'https://stackpath.bootstrapcdn.com') {
    event.respondWith(CacheHelper.revalidateCache(event.request));
  }
});
