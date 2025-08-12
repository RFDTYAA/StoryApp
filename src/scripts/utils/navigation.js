// src/scripts/utils/navigation.js

export const isLoggedIn = () => Boolean(localStorage.getItem("token"));

export function updateNavbar() {
  // ambil elemen NAV (boleh beberapa null — kita cek sebelum mengakses)
  const navHome = document.getElementById("nav-home");
  const navAdd = document.getElementById("nav-add");
  const navSaved = document.getElementById("nav-saved");
  const navLogin = document.getElementById("nav-login");
  const navRegister = document.getElementById("nav-register");
  const navLogout = document.getElementById("nav-logout");

  // Jika tidak ada satu pun elemen, mungkin DOM belum ter-parse -> keluar lebih aman
  if (
    !navHome &&
    !navAdd &&
    !navSaved &&
    !navLogin &&
    !navRegister &&
    !navLogout
  ) {
    // bukan error fatal, hanya log informasi supaya mudah debugging
    console.warn("updateNavbar: elemen navbar belum tersedia di DOM.");
    return;
  }

  const loggedIn = isLoggedIn();

  if (loggedIn) {
    if (navHome) navHome.style.display = "list-item";
    if (navAdd) navAdd.style.display = "list-item";
    if (navSaved) navSaved.style.display = "list-item";
    if (navLogout) navLogout.style.display = "list-item";

    if (navLogin) navLogin.style.display = "none";
    if (navRegister) navRegister.style.display = "none";
  } else {
    if (navHome) navHome.style.display = "none";
    if (navAdd) navAdd.style.display = "none";
    if (navSaved) navSaved.style.display = "none";
    if (navLogout) navLogout.style.display = "none";

    if (navLogin) navLogin.style.display = "list-item";
    if (navRegister) navRegister.style.display = "list-item";
  }
}

export function setupLogout() {
  const logoutButton = document.getElementById("logout-button");
  if (!logoutButton) {
    // nothing to do
    return;
  }

  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    updateNavbar();
    window.location.hash = "#/login";
  });
}
