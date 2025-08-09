const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

const updateNavbar = () => {
  const loggedIn = isLoggedIn();
  const navHome = document.getElementById("nav-home");
  const navAdd = document.getElementById("nav-add");
  const navLogin = document.getElementById("nav-login");
  const navRegister = document.getElementById("nav-register");
  const navLogout = document.getElementById("nav-logout");

  if (loggedIn) {
    navHome.style.display = "list-item";
    navAdd.style.display = "list-item";
    navLogout.style.display = "list-item";
    navLogin.style.display = "none";
    navRegister.style.display = "none";
  } else {
    navHome.style.display = "none";
    navAdd.style.display = "none";
    navLogout.style.display = "none";
    navLogin.style.display = "list-item";
    navRegister.style.display = "list-item";
  }
};

const setupLogout = () => {
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("token");
      window.location.hash = "#/login";
      updateNavbar();
    });
  }
};

export { updateNavbar, setupLogout };
