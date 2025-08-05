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

const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

const handleRouting = () => {
  const path = window.location.hash.slice(1).toLowerCase() || "/";
  const privateRoutes = ["/", "/home", "/add"];
  const publicRoutes = ["/login", "/register"];

  if (privateRoutes.includes(path) && !isLoggedIn()) {
    window.location.hash = "#/login";
    return;
  }

  if (publicRoutes.includes(path) && isLoggedIn()) {
    window.location.hash = "#/";
    return;
  }

  const View = routes[path] || routes["/"];
  const view = new View();

  const appContent = document.getElementById("app-content");
  if (appContent) {
    appContent.innerHTML = "";
    view.render();
  } else {
    console.error("Elemen dengan ID 'app-content' tidak ditemukan!");
  }
};

export { handleRouting };
