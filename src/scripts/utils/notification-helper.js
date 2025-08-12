import { showToast } from "./toast.js";

const NotificationHelper = {
  async init() {
    console.log("🔔 Inisialisasi Notification Helper...");
    if (!("Notification" in window)) {
      showToast("Browser tidak mendukung notifikasi", "error");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      this._subscribeToPush();
    } else {
      showToast("Izin notifikasi ditolak", "error");
    }
  },

  async _subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;

      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: this._urlBase64ToUint8Array(
          "BLXy8gNJ5aM-xIf9hvC5oT2TvZf7PMq6ZbeAWSq_-DyUMva6S6T1qfKTIWyA2NYORYHxCpNuFkN34yHa0px549Q"
        ),
      };

      const pushSubscription = await registration.pushManager.subscribe(
        subscribeOptions
      );

      console.log("Push Subscription:", JSON.stringify(pushSubscription));
      showToast("Berhasil berlangganan push notification", "success");
    } catch (error) {
      console.error("Gagal berlangganan push notification:", error);
      showToast("Gagal berlangganan push notification", "error");
    }
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
};

export default NotificationHelper;
