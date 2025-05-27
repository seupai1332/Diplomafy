const CACHE_NAME = 'diplomafy-v1';
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_RESOURCES);
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Estratégia de cache: Network First, fallback to cache
self.addEventListener('fetch', (event) => {
  // Ignorar requisições para o Supabase
  if (event.request.url.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar a resposta antes de armazenar no cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // Se não houver cache, retornar página offline
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          return new Response('', {
            status: 408,
            statusText: 'Request timed out',
          });
        });
      })
  );
});

// Sincronização em background
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-certificates') {
    event.waitUntil(syncCertificates());
  }
});

// Notificações push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/logo192.png',
    badge: '/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver certificado',
      },
      {
        action: 'close',
        title: 'Fechar',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification('Diplomafy', options)
  );
});

// Função para sincronizar certificados
async function syncCertificates() {
  try {
    const response = await fetch('/api/certificates/sync');
    if (!response.ok) throw new Error('Falha na sincronização');
    return response;
  } catch (error) {
    console.error('Erro na sincronização:', error);
    throw error;
  }
} 