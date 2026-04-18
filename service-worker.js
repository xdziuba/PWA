const CACHE_NAME = "60-tka-cache-v1";
const APP_SHELL = [
  "/index.html",
  "/manifest.json",
  "/src/css/style.css",
  "/src/js/main.js",
  "/service-worker.js",
  "/assets/1024x1024_logo.png",
  "/assets/android-chrome-192x192.png",
  "/assets/android-chrome-512x512.png",
  "/assets/apple-touch-icon.png",
  "/assets/favicon-16x16.png",
  "/assets/favicon-32x32.png",
];

self.addEventListener("install", (event) => {
  console.log("[SW] install");

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      for (const url of APP_SHELL) {
        try {
          const response = await fetch(url, { cache: "no-store" });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          await cache.put(url, response.clone());
        } catch (error) {
          console.error(`[SW] Nie udało się dodać do cache: ${url}`, error);
        }
      }

      console.log("[SW] cache gotowy");
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  console.log("[SW] activate");

  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );

      await self.clients.claim();
      console.log("[SW] aktywny");
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestURL = new URL(event.request.url);

  if (requestURL.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(event.request);

        if (networkResponse && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        if (event.request.mode === "navigate") {
          const fallback = await caches.match("./index.html");
          if (fallback) return fallback;
        }

        throw error;
      }
    })(),
  );
});
