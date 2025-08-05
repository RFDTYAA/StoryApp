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

export const router = () => {
  const hash = window.location.hash.slice(1).toLowerCase() || "/home";
  const token = localStorage.getItem("token");

  // Tidak ada lagi rute yang diproteksi
  const protectedRoutes = [];

  if (protectedRoutes.includes(hash) && !token) {
    window.location.hash = "#/login";
    return;
  }

  // Jika pengguna sudah login tapi mencoba akses halaman login/register,
  // alihkan ke halaman utama.
  if ((hash === "/login" || hash === "/register") && token) {
    window.location.hash = "#/home";
    return;
  }

  const View = routes[hash] || routes["/home"];

  if (currentView && typeof currentView.cleanup === "function") {
    currentView.cleanup();
  }

  currentView = new View();
  currentView.render();
};
