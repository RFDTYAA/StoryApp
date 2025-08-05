import "./styles/main.css";
import { router } from "./scripts/router.js";

window.addEventListener("hashchange", () => {
  router();
});

window.addEventListener("load", () => {
  router();
});
