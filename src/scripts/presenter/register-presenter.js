export class RegisterPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async register(name, email, password) {
    try {
      const res = await this.model.register(name, email, password);
      this.view.showSuccess("Registrasi berhasil. Silakan login.");
      setTimeout(() => (window.location.hash = "#/login"), 900);
    } catch (err) {
      this.view.showError(err.message || "Gagal registrasi.");
    }
  }
}
