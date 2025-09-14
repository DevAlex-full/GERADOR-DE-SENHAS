// sw.js - Service Worker para o Gerador de Senhas Seguras

const CACHE_NAME = 'password-generator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/css/reset.css',
  '/src/css/main.css',
  '/src/scripts/engine.js',
  '/favicon.ico'
];

// Instalação do Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições e serve do cache quando offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retorna do cache se encontrado
        if (response) {
          return response;
        }
        
        // Caso contrário, busca na rede
        return fetch(event.request);
      }
    )
  );
});

// Atualização do Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});