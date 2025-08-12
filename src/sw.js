const CACHE_NAME = "story-app-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles/main.css",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (
    url.pathname.startsWith("/api/") ||
    url.hostname.includes("story-api.dicoding.dev")
  ) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  event.respondWith(caches.match(req).then((cached) => cached || fetch(req)));
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notifikasi Baru";
  const body = data.body || "Ada konten baru untuk Anda.";

  const promiseChain = self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((clients) => {
      for (const client of clients) {
        client.postMessage({ type: "SHOW_TOAST", title, body });
      }
      return self.registration.showNotification(title, {
        body,
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
      });
    });

  event.waitUntil(promiseChain);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      if (clients.length > 0) {
        clients[0].focus();
        clients[0].postMessage({
          type: "NOTIFICATION_CLICK",
          data: event.notification.data || null,
        });
      } else {
        self.clients.openWindow("/");
      }
    })
  );
});
