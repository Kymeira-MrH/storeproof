// StoreProof service worker — conservative by design.
// Satisfies PWA installability (has a fetch handler) without risking stale
// authenticated content: API, auth and dashboard requests are never intercepted.
const CACHE = "sp-shell-v1";
const OFFLINE_FALLBACK = "/";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/auth") ||
    url.pathname.startsWith("/dashboard")
  ) {
    return;
  }

  // Network-first for page navigations; fall back to cache when offline.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const net = await fetch(req);
          const cache = await caches.open(CACHE);
          cache.put(req, net.clone());
          return net;
        } catch {
          const cache = await caches.open(CACHE);
          const cached = await cache.match(req);
          return cached || (await cache.match(OFFLINE_FALLBACK)) || Response.error();
        }
      })(),
    );
  }
});
