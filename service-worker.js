// 🚀 Қарақалпақстан Даўысы - Service Worker
const CACHE_VERSION = 'karakalpak-voice-v1';
const CACHE_NAME = `karakalpakvoice-${CACHE_VERSION}`;

// Кэшке салынатын файллар
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/styles/main.css',
  '/src/js/main.js',
  '/manifest.webmanifest',
  '/offline.html'
];

// Орнатыў ўақыясы-ресурсларды кешке салыў.
self.addEventListener('install', (event) => {
  console.log('🎤 Service Worker орнатылыўда...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Файллар кэшке салыныўда');
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => {
        console.log('✅ Барлық файллар кэшке салынды');
        return self.skipWaiting();
      })
  );
});

// Активлестириў ўақыясы - ески кешлерди тазалаў.
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker жеделлестирилмекте...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Ескі кэш өшірілуде:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker актив');
      return self.clients.claim();
    })
  );
});

// Сораў ўақыясы - кеште бериў.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Кэште бар болса, кэштен бериў
        if (response) {
          return response;
        }
        
        // Кеште жоқ болса, тармақтан алыў
        return fetch(event.request).then(response => {
          // Жуўап дурыс болса кешке түсириў.
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // Офлайн режимде
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      })
  );
});

// Push хабарландырыўлары
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/public/assets/images/icons/icon-192.png',
      badge: '/public/assets/images/icons/badge.png',
      tag: 'karakalpak-voice-notification',
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'Көру',
          icon: '/public/assets/images/icons/view.png'
        },
        {
          action: 'close',
          title: 'Жабыў',
          icon: '/public/assets/images/icons/close.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Хабарландырыўға басыў
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('https://karakalpakvoice.org')
    );
  }
});

console.log('🎤 Қарақалпақстан Даўысы Service Worker жүкленди');
