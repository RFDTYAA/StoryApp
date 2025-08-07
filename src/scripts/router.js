import { HomeView } from "./view/home-view.js";
import { AddStoryView } from "./view/add-story-view.js";
import { LoginView } from "./view/login-view.js";
import { RegisterView } from "./view/register-view.js";

const routes = {
  "/": HomeView,
  "/home": HomeView,
  "/add": AddStoryView,
  "/login": LoginView,
  "/register": RegisterView,
};

let currentView = null;

const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

const handleRouting = () => {
  const path = window.location.hash.slice(1).toLowerCase() || "/";
  const privateRoutes = ["/", "/home", "/add"];
  const publicRoutes = ["/login", "/register"];

  // Aturan 1: Jika mencoba akses halaman privat TAPI belum login,
  // paksa ke halaman login.
  if (privateRoutes.includes(path) && !isLoggedIn()) {
    window.location.hash = "#/login";
    return;
  }

  // Aturan 2: Jika mencoba akses halaman publik TAPI sudah login,
  // paksa ke halaman utama.
  if (publicRoutes.includes(path) && isLoggedIn()) {
    window.location.hash = "#/";
    return;
  }

  // Panggil cleanup pada view lama sebelum render yang baru
  if (currentView && typeof currentView.cleanup === "function") {
    currentView.cleanup();
  }

  const View = routes[path] || routes["/login"]; // Default ke login jika path tidak valid
  const view = new View();

  currentView = view;

  const appContent = document.getElementById("app-content");
  if (appContent) {
    appContent.innerHTML = "";
    view.render();
  }
};

export { handleRouting };
