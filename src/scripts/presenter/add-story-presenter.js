export class AddStoryPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async addStory(formData) {
    try {
      this.view.showLoading();
      await this.model.addStory(formData);
      this.view.showSuccess("Cerita berhasil ditambahkan!");
      window.location.hash = "#/";
    } catch (err) {
      this.view.showError(err.message);
    } finally {
      this.view.hideLoading();
    }
  }
}
