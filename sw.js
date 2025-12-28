const CACHE_NAME = 'amchi-mumbai-ai-v1';
const API_CACHE_NAME = 'amchi-mumbai-api-v1';

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/translate',
  '/api/suggestions',
  '/api/food/recommendations',
  '/api/food/nearby',
  '/api/traffic/estimate',
  '/api/traffic/alternatives',
  '/api/culture/info',
  '/api/culture/location',
  '/api/culture/festivals'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Ensure the service worker takes control immediately
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Handle static assets
  if (request.destination === 'document' || 
      request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'image') {
    event.respondWith(handleStaticAsset(request));
    return;
  }
  
  // Default: try network first, then cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Handle API requests with cache-first strategy for offline support
async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Try network first
    const networkResponse = await fetch(request.clone());
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(API_CACHE_NAME);
      
      // Only cache GET requests and successful responses
      if (request.method === 'GET') {
        cache.put(request, networkResponse.clone());
      }
      
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache for', url.pathname);
    
    // Try to get from cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('Service Worker: Serving from cache', url.pathname);
      return cachedResponse;
    }
    
    // If no cache available, return offline response
    return createOfflineResponse(url.pathname);
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If not in cache, try network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // If both cache and network fail, return a fallback
    return caches.match('/') || new Response('Offline', { status: 503 });
  }
}

// Create offline response for API requests
function createOfflineResponse(pathname) {
  const offlineData = getOfflineData(pathname);
  
  return new Response(JSON.stringify({
    success: true,
    data: offlineData,
    offline: true,
    timestamp: new Date().toISOString(),
    requestId: 'offline-' + Date.now()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

// Get offline fallback data based on endpoint
function getOfflineData(pathname) {
  if (pathname.includes('/translate')) {
    return {
      originalPhrase: 'Offline mode',
      translation: 'You are currently offline. Some translations may be cached.',
      confidence: 0.5,
      alternatives: ['Please connect to internet for live translations']
    };
  }
  
  if (pathname.includes('/food')) {
    return [
      {
        name: 'Offline Food Recommendations',
        location: {
          name: 'Cached Location',
          coordinates: { latitude: 19.0760, longitude: 72.8777 },
          address: 'Mumbai, Maharashtra',
          area: 'Mumbai'
        },
        priceRange: { min: 50, max: 200, currency: 'INR' },
        safetyRating: 4,
        operatingHours: { start: '09:00', end: '22:00' },
        popularItems: ['Cached recommendations available offline'],
        dietaryInfo: ['no_restrictions']
      }
    ];
  }
  
  if (pathname.includes('/traffic')) {
    return {
      estimatedTime: 30,
      distance: 5000,
      trafficCondition: 'moderate',
      alternativeRoutes: [],
      lastUpdated: new Date().toISOString()
    };
  }
  
  if (pathname.includes('/culture')) {
    return {
      title: 'Offline Cultural Information',
      description: 'You are currently offline. Limited cultural information is available from cache.',
      practicalTips: [
        'Mumbai is a cosmopolitan city with diverse cultures',
        'Respect local customs and traditions',
        'English and Hindi are widely spoken'
      ],
      doAndDonts: {
        dos: ['Be respectful', 'Try local food', 'Use public transport'],
        donts: ['Avoid rush hours', 'Don\'t litter', 'Don\'t ignore traffic rules']
      }
    };
  }
  
  return { message: 'Offline mode - limited functionality available' };
}

// Handle background sync for when connection is restored
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(syncOfflineData());
  }
});

// Sync offline data when connection is restored
async function syncOfflineData() {
  try {
    // Get pending requests from IndexedDB or localStorage
    // This would sync any offline actions when connection is restored
    console.log('Service Worker: Syncing offline data...');
    
    // Implementation would depend on specific offline actions to sync
    // For now, just clear old API cache to get fresh data
    const apiCache = await caches.open(API_CACHE_NAME);
    const requests = await apiCache.keys();
    
    // Clear cache entries older than 1 hour
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    for (const request of requests) {
      const response = await apiCache.match(request);
      if (response) {
        const dateHeader = response.headers.get('date');
        if (dateHeader && new Date(dateHeader).getTime() < oneHourAgo) {
          await apiCache.delete(request);
        }
      }
    }
    
    console.log('Service Worker: Offline data sync completed');
  } catch (error) {
    console.error('Service Worker: Failed to sync offline data', error);
  }
}