self.addEventListener("push", (event) => {
  console.log("Push event diterima:", event);

  const notificationData = event.data.json();
  const title = notificationData.title || "Notifikasi Baru";
  const options = {
    body: notificationData.body || "Ada konten baru untuk Anda.",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
