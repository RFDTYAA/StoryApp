export class StoryModel {
  constructor() {
    this.API_ENDPOINT = "https://story-api.dicoding.dev/v1";
  }

  //-- Metode Pengelola Token --//
  saveToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  //-- Metode API Cerita --//
  async getStories(token) {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch("https://story-api.dicoding.dev/v1/stories/", {
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Gagal memuat cerita.");
    }
    return data.listStory;
  }

  async addStory(formData) {
    const token = this.getToken();
    if (!token) {
      throw new Error("Anda harus login untuk menambah cerita.");
    }

    const response = await fetch(`${this.API_ENDPOINT}/stories`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Gagal menambahkan cerita.");
    return data;
  }
}
