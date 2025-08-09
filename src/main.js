import "./styles/main.css";
import { handleRouting } from "./scripts/router.js";
import { setupLogout } from "./utils/navigation.js";
import NotificationHelper from "./scripts/utils/notification-helper.js";

window.addEventListener("hashchange", handleRouting);

window.addEventListener("load", () => {
  setupLogout();
  handleRouting();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Service Worker berhasil didaftarkan.");
        NotificationHelper.init();
      })
      .catch((error) => {
        console.error("Pendaftaran Service Worker gagal:", error);
      });
  }
});
