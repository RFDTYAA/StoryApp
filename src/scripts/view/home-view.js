import DbHelper from "../utils/db-helper.js";

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export class HomeView {
  constructor() {
    this.map = null;
  }

  render() {
    const app = document.getElementById("app-content");
    if (!app) return;
    app.innerHTML = `
      <div class="home-container">
        <h2>Daftar Cerita</h2>
        <div id="map-home" style="height:320px;margin-bottom:16px"></div>
        <div id="stories-container"></div>
      </div>
    `;
  }

  showLoading() {
    const app = document.getElementById("app-content");
    const status = document.createElement("p");
    status.id = "home-loading";
    status.textContent = "Memuat cerita...";
    app.prepend(status);
  }

  hideLoading() {
    const el = document.getElementById("home-loading");
    if (el) el.remove();
  }

  async renderStories(stories = []) {
    const container = document.getElementById("stories-container");
    if (!container) return;
    container.innerHTML = "";
    const list = document.createElement("div");
    list.className = "story-list";

    stories.forEach((s) => {
      const id = escapeHtml(s.id || s._id || `id-${Date.now()}`);
      const title = escapeHtml(s.name || s.title || "Tanpa Judul");
      const desc = escapeHtml(s.description || "");
      const img = escapeHtml(
        s.photoUrl || s.photo || "/icons/icon-192x192.png"
      );
      const created = escapeHtml(s.createdAt || "");

      const lat = s.lat ?? s.latitude ?? s.location?.lat ?? null;
      const lon = s.lon ?? s.longitude ?? s.location?.lon ?? null;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${img}" alt="${title}" />
        <div class="card-content">
          <h3>${title}</h3>
          <p>${desc}</p>
          <small>${created}</small>
          <div style="margin-top:12px;">
            <button class="save-offline-btn" data-id="${id}">Simpan Offline</button>
          </div>
        </div>
      `;
      list.appendChild(card);

      // Event simpan offline
      card
        .querySelector(".save-offline-btn")
        .addEventListener("click", async () => {
          await DbHelper.putStory({
            id,
            name: title,
            description: desc,
            photoUrl: img,
            createdAt: created || new Date().toISOString(),
            lat,
            lon,
          });
          this.showSuccess("Cerita disimpan offline!");
        });
    });

    container.appendChild(list);
  }

  renderMap(stories = []) {
    const mapEl = document.getElementById("map-home");
    if (!mapEl) return;
    if (this.map) {
      try {
        this.map.off();
        this.map.remove();
      } catch {}
      this.map = null;
    }
    const defaultCoords = [-2.5489, 118.0149];
    try {
      this.map = L.map(mapEl).setView(defaultCoords, 5);
    } catch (err) {
      this.map = L.map(mapEl.id).setView(defaultCoords, 5);
    }
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.map
    );

    stories.forEach((s) => {
      const lat = s.lat ?? s.latitude ?? s.location?.lat;
      const lon = s.lon ?? s.longitude ?? s.location?.lon;
      if (lat != null && lon != null) {
        try {
          L.marker([Number(lat), Number(lon)])
            .addTo(this.map)
            .bindPopup(
              `<strong>${escapeHtml(s.name || "")}</strong><br>${escapeHtml(
                s.description || ""
              )}`
            );
        } catch (err) {
          console.warn("Marker fail", err);
        }
      }
    });

    setTimeout(() => {
      try {
        this.map.invalidateSize();
      } catch {}
    }, 200);
  }

  showError(message) {
    const container =
      document.getElementById("stories-container") ||
      document.getElementById("app-content");
    if (!container) return;
    container.innerHTML = `<div class="form-container"><p style="color:red; font-weight:bold;">Error: ${escapeHtml(
      message
    )}</p></div>`;
  }

  showSuccess(message) {
    const toast = document.createElement("div");
    toast.style =
      "position:fixed;top:80px;right:20px;background:#2ecc71;color:#fff;padding:10px;border-radius:6px;z-index:10000;";
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}
