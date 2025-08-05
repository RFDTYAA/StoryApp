import { StoryModel } from "../model/story-model.js";
import { StoryPresenter } from "../presenter/story-presenter.js";

export class HomeView {
  render() {
    document.getElementById("app-content").innerHTML =
      '<h2>Semua Cerita</h2><div id="storyList"></div><div id="map" style="height: 400px"></div>';
    this.afterRender();
  }

  async afterRender() {
    const model = new StoryModel();
    const presenter = new StoryPresenter(model, this);
    presenter.loadStories();
  }

  renderStories(stories) {
    const list = document.getElementById("storyList");
    list.innerHTML = "";
    stories.forEach((story) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" />
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <small>${new Date(story.createdAt).toLocaleString()}</small>
      `;
      list.appendChild(div);
    });
  }

  renderMap(stories) {
    const map = L.map("map").setView([-2, 118], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );
    stories.forEach((s) => {
      if (s.lat && s.lon) {
        const marker = L.marker([s.lat, s.lon]).addTo(map);
        marker.bindPopup(`<b>${s.name}</b><br>${s.description}`);
      }
    });
  }

  showError(message) {
    const list = document.getElementById("storyList");
    list.innerHTML = `<p class="error-message">${message}</p>`;
  }
}
