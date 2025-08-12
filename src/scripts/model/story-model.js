import DbHelper from "../utils/db-helper.js";
export class StoryModel {
  constructor() {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    this.API_ENDPOINT = isLocal
      ? "/api/v1"
      : "https://story-api.dicoding.dev/v1";
  }

  getToken() {
    return localStorage.getItem("token");
  }

  async getStories() {
    const token = this.getToken();
    if (!token) {
      throw new Error("Anda harus login untuk melihat cerita.");
    }

    try {
      const response = await fetch(`${this.API_ENDPOINT}/stories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Gagal memuat cerita dari API.");
      }

      const data = await response.json();
      return data.listStory || [];
    } catch (err) {
      throw err;
    }
  }

  async addStory(formData) {
    const token = this.getToken();
    if (!token) throw new Error("Anda harus login untuk menambah cerita.");

    const response = await fetch(`${this.API_ENDPOINT}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || "Gagal menambahkan cerita.");
    }

    return data;
  }

  async saveStoryOffline(story) {
    if (!story.id) {
      story.id = `local-${Date.now()}`;
    }
    await DbHelper.putStory(story);
    return story;
  }

  async getSavedStories() {
    return await StoryDb.getAllStories();
  }

  async deleteSavedStory(id) {
    return await StoryDb.deleteStory(id);
  }
}
