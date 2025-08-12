export class SavedStoriesPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async loadSaved() {
    try {
      const stories = await this.model.getSavedStories();
      await this.view.renderList(stories);
    } catch (err) {
      this.view.showError && this.view.showError("Gagal memuat saved stories.");
    }
  }

  async deleteSaved(id) {
    try {
      await this.model.deleteSavedStory(id);
      this.view.showSuccess("Cerita dihapus.");
      await this.loadSaved();
    } catch (err) {
      this.view.showError("Gagal menghapus cerita.");
    }
  }
}
