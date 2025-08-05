export class StoryModel {
  constructor() {
    this.API_ENDPOINT = "/api/v1";
  }

  getToken() {
    return localStorage.getItem("token");
  }

  async getStories() {
    const token = this.getToken();
    if (!token) {
      throw new Error("Anda harus login untuk melihat cerita.");
    }

    const response = await fetch(`${this.API_ENDPOINT}/stories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
