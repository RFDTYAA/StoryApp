// src/main.js
import "./styles/main.css";
import { handleRouting } from "./scripts/router.js";
import { setupLogout, updateNavbar } from "./scripts/utils/navigation.js";
import NotificationHelper from "./scripts/utils/notification-helper.js";
import { showToast } from "./scripts/utils/toast.js";

// Pastikan DOM sudah siap (elemen navbar sudah ada di DOM)
document.addEventListener("DOMContentLoaded", () => {
  // update navbar & setup logout setelah DOM tersedia
  updateNavbar();
  setupLogout();

  // Setup routing
  handleRouting();
  window.addEventListener("hashchange", handleRouting);

  // Register Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Service Worker berhasil didaftarkan.");
        // init notifications (memeriksa permission & subscribe)
        NotificationHelper.init();

        // Menerima pesan dari service worker (mis. SHOW_TOAST)
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data && event.data.type === "SHOW_TOAST") {
            showToast(`${event.data.title}: ${event.data.body}`, "success");
          }
        });
      })
      .catch((error) => {
        console.error("Pendaftaran Service Worker gagal:", error);
      });
  }
});
