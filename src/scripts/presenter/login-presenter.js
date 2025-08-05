export class LoginPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async login(email, password) {
    try {
      const result = await this.model.login(email, password);
      this.view.showSuccess(`Selamat datang, ${result.loginResult.name}`);
      window.location.hash = "#/home";
    } catch (err) {
      this.view.showError(err.message);
    }
  }
}
