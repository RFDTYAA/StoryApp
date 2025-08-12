export class StoryPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async loadStories() {
    this.view.showLoading && this.view.showLoading();
    try {
      const stories = await this.model.getStories();
      await this.view.renderStories(stories);
      await this.view.renderMap(stories);
    } catch (err) {
      try {
        const local = await this.model.getSavedStories();
        if (local && local.length > 0) {
          await this.view.renderStories(local);
          await this.view.renderMap(local);
          this.view.showError &&
            this.view.showError("Menampilkan cerita lokal (offline).");
        } else {
          this.view.showError &&
            this.view.showError(
              err.message ||
                "Gagal memuat cerita. Periksa koneksi internet Anda."
            );
        }
      } catch (err2) {
        this.view.showError &&
          this.view.showError(
            err.message || "Gagal memuat cerita. Periksa koneksi internet Anda."
          );
      }
    } finally {
      this.view.hideLoading && this.view.hideLoading();
    }
  }

  async saveStoryForOffline(story) {
    try {
      await this.model.saveStoryOffline(story);
      this.view.showSuccess &&
        this.view.showSuccess("Cerita disimpan offline.");
    } catch (err) {
      this.view.showError && this.view.showError("Gagal menyimpan offline.");
    }
  }
}
