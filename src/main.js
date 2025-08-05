import "./styles/main.css";
import { handleRouting } from "./scripts/router.js";

window.addEventListener("hashchange", handleRouting);
window.addEventListener("load", handleRouting);
