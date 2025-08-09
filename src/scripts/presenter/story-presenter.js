import { StoryDb } from "../utils/db-helper.js";
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

  async saveStoryForOffline(story) {
    try {
      await StoryDb.putStory(story);
      console.log(`Cerita '${story.name}' berhasil disimpan offline.`);
    } catch (err) {
      console.error("Gagal menyimpan cerita offline:", err);
    }
  }
}
