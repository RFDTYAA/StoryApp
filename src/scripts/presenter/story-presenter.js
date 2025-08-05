export class StoryPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async loadStories(token) {
    try {
      // Panggil nama method yang benar dan teruskan token-nya
      const stories = await this.model.getStories(token);

      this.view.renderStories(stories);
      this.view.renderMap(stories);
    } catch (err) {
      console.error("Gagal memuat cerita:", err);
      // Anda bisa tambahkan logika untuk menampilkan error ke pengguna di sini
      // contoh: this.view.showError(err.message);
    }
  }
}
