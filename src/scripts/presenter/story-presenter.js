export class StoryPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async loadStories() {
    try {
      const stories = await this.model.getStories();

      this.view.renderStories(stories);
      this.view.renderMap(stories);
    } catch (err) {
      console.error("Gagal memuat cerita:", err);
      this.view.showError(err.message);
    }
  }
}
