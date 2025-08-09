import { StoryDb } from "../utils/db-helper.js";

export class StoryModel {
  constructor() {
    this.API_ENDPOINT = "/api/v1";
  }

  getToken() {
    return localStorage.getItem("token");
  }

  async getStories() {
    try {
      const stories = await this._fetchFromApi();
      await StoryDb.putAllStories(stories);
      return stories;
    } catch (err) {
      console.log(
        "Gagal mengambil dari API, mencoba mengambil dari database lokal..."
      );
      const stories = await StoryDb.getAllStories();
      if (stories && stories.length > 0) {
        return stories;
      }
      throw new Error("Gagal memuat cerita. Periksa koneksi internet Anda.");
    }
  }

  async _fetchFromApi() {
    const token = this.getToken();
    if (!token) {
      throw new Error("Anda harus login untuk melihat cerita.");
    }

    const response = await fetch(`${this.API_ENDPOINT}/stories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Gagal memuat cerita dari API.");
    }

    const data = await response.json();
    return data.listStory;
  }

  async addStory(formData) {
    const token = this.getToken();
    if (!token) {
      throw new Error("Anda harus login untuk menambah cerita.");
    }

    const response = await fetch(`${this.API_ENDPOINT}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Gagal menambahkan cerita.");
    }
    return data;
  }
}
