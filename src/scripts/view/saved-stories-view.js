import DbHelper from "../utils/db-helper.js";

export class SavedStoriesView {
  async render() {
    document.getElementById("app-content").innerHTML = `
      <section class="saved-stories">
        <h2>Saved Stories</h2>
        <div id="saved-list" class="story-list"></div>
      </section>
    `;
    await this._loadStories();
  }

  async _loadStories() {
    const stories = await DbHelper.getAllStories();
    const container = document.getElementById("saved-list");

    if (!stories.length) {
      container.innerHTML = `<p>Tidak ada cerita tersimpan.</p>`;
      return;
    }

    stories.forEach((story) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${story.photoUrl}" alt="${story.description}">
        <div class="card-content">
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <small>${story.createdAt}</small>
          <button class="delete-btn" data-id="${story.id}">Hapus</button>
        </div>
      `;
      container.appendChild(card);
    });

    this._addDeleteListeners();
  }

  _addDeleteListeners() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        await DbHelper.deleteStory(id);
        await this._loadStories();
      });
    });
  }
}
