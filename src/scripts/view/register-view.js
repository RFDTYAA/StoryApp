import { AuthModel } from "../model/auth-model.js";

export class RegisterView {
  render() {
    const app = document.getElementById("app-content");
    app.innerHTML = `
      <h2>Daftar Akun</h2>
      <label for="name">Nama</label>
      <input type="text" id="name" placeholder="Nama" />
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="Email" />
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Password (min 8 karakter)" />
      <button id="registerBtn">Daftar</button>
      <p id="registerStatus"></p>
    `;
    this.afterRender();
  }

  afterRender() {
    const model = new AuthModel();
    document
      .getElementById("registerBtn")
      .addEventListener("click", async () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!name || !email || password.length < 8) {
          document.getElementById("registerStatus").textContent =
            "Semua field wajib diisi dan password minimal 8 karakter";
          return;
        }

        try {
          const result = await model.register(name, email, password);
          document.getElementById("registerStatus").textContent =
            result.message;
        } catch (err) {
          document.getElementById(
            "registerStatus"
          ).textContent = `Gagal: ${err.message}`;
        }
      });
  }
}
