// Cache resources shared across all pages
const CACHED_URLS = [
  "/_styles/reset.css",
  "/_styles/globals.css",
  "/_components/header/header.js",
  "/_components/header/header.css",
  "/_components/footer/footer.js",
  "/_components/footer/footer.css",
  "/_components/menu/menu.js",
  "/_components/menu/menu.css",
  "/_assets/broccoli.png",
  "/_assets/favicon.ico",
  "/_scripts/meta.js",
  "/index.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(populateCache());
  console.log("Service worker installed.");
});

async function populateCache() {
  console.log("Populating cache...");
  const cache = await caches.open("onlytheplatform");
  return cache.addAll(CACHED_URLS);
}

self.addEventListener("activate", (event) => {
  console.log("Service worker activated.");
});

self.addEventListener("fetch", (event) => {
  const strategy = "network-first";
  console.log(`Service worker intercepted fetch (${strategy})...`);
  event.respondWith(fetcher[strategy](event));
});

const fetcher = {
  "cache-first": cacheFirst,
  "network-first": networkFirst,
  "cache-only": cacheOnly,
  "network-only": networkOnly,
  "stale-while-revalidate": staleWhileRevalidate,
};

async function cacheFirst(event) {
  const response = await caches.match(event.request);
  return response ?? fetch(event.request);
}

async function networkFirst(event) {
  let response;

  try {
    response = await fetch(event.request);
  } catch (error) {
    response = await caches.match(event.request);
    // TODO: offline fallback
  }

  return response;
}

async function cacheOnly(event) {
  return caches.match(event.request);
}

async function networkOnly(event) {
  return fetch(event.request);
}

async function staleWhileRevalidate(event) {
  const cache = await caches.open("onlytheplatform");
  const cachedResponse = await cache.match(event.request);
  const networkResponse = fetch(event.request).then((res) => {
    cache.put(event.request, res);
    return res;
  });

  return cachedResponse ?? networkResponse;
}
