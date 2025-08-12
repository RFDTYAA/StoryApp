import { AuthModel } from "../model/auth-model.js";
import { LoginPresenter } from "../presenter/login-presenter.js";

export class LoginView {
  render() {
    const app = document.getElementById("app-content");
    app.innerHTML = `
      <h2>Login</h2>
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="Email" />
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Password" />
      <button id="loginBtn">Masuk</button>
      <p id="loginStatus"></p>
    `;
    this.afterRender();
  }

  async afterRender() {
    const model = new AuthModel();
    const presenter = new LoginPresenter(model, this);
    document.getElementById("loginBtn").addEventListener("click", () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      presenter.login(email, password);
    });
  }

  showSuccess(message) {
    const statusEl = document.getElementById("loginStatus");
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.style.color = "green";
    } else {
      console.error("Elemen #loginStatus tidak ditemukan di halaman login");
    }
  }

  showError(error) {
    const statusEl = document.getElementById("loginStatus");
    if (statusEl) {
      statusEl.textContent = `Gagal: ${error}`;
      statusEl.style.color = "red";
    } else {
      console.error("Elemen #loginStatus tidak ditemukan di halaman login");
    }
  }
}
