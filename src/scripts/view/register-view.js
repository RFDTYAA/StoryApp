import { RegisterPresenter } from "../presenter/register-presenter.js";

export class RegisterView {
  constructor() {
    this.presenter = null;
  }

  render() {
    const app = document.getElementById("app-content");
    app.innerHTML = `
      <div class="form-container">
        <h2>Daftar</h2>
        <label for="name">Nama</label>
        <input id="reg-name" type="text" />
        <label for="email">Email</label>
        <input id="reg-email" type="email" />
        <label for="password">Password</label>
        <input id="reg-password" type="password" />
        <button id="reg-btn">Daftar</button>
        <p id="reg-status"></p>
      </div>
    `;

    this.afterRender();
  }

  afterRender() {
    import("../model/auth-model.js").then(({ AuthModel }) => {
      this.presenter = new RegisterPresenter(new AuthModel(), this);
      document.getElementById("reg-btn").addEventListener("click", () => {
        const name = document.getElementById("reg-name").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;
        this.presenter.register(name, email, password);
      });
    });
  }

  showSuccess(msg) {
    const el = document.getElementById("reg-status");
    if (el) {
      el.style.color = "green";
      el.textContent = msg;
    }
  }

  showError(msg) {
    const el = document.getElementById("reg-status");
    if (el) {
      el.style.color = "red";
      el.textContent = msg;
    }
  }
}
