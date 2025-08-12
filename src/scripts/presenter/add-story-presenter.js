export class AddStoryPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async addStory(formData) {
    try {
      this.view.showLoading();
      const res = await this.model.addStory(formData);
      const created = res && res.story ? res.story : res;
      try {
        await this.model.saveStoryOffline({
          id: created.id || `srv-${Date.now()}`,
          name: created.name || "Cerita",
          description: created.description || formData.get("description"),
          lat: formData.get("lat"),
          lon: formData.get("lon"),
          photoUrl: created.photoUrl || created.photo || "",
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Gagal menyimpan salinan offline:", err);
      }

      this.view.showSuccess("Cerita berhasil ditambahkan!");
      setTimeout(() => {
        window.location.hash = "#/home";
      }, 900);
    } catch (err) {
      this.view.showError(err.message || "Gagal menambahkan cerita.");
    } finally {
      this.view.hideLoading();
    }
  }
}
