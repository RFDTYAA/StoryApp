import { StoryModel } from "../model/story-model.js";
import { AddStoryPresenter } from "../presenter/add-story-presenter.js";

export class AddStoryView {
  constructor() {
    this._mediaStream = null;
    this.map = null;
    this.marker = null;
  }

  render() {
    document.getElementById("app-content").innerHTML = `
      <div class="add-story-container">
        <h2>Tambah Cerita Baru</h2>
        <form id="add-story-form">
          <div class="form-group">
            <label for="description">Deskripsi Cerita</label>
            <textarea id="description" name="description" required></textarea>
          </div>

          <div class="form-group">
            <label>Ambil Gambar dari Kamera</label>
            <video id="camera-preview" autoplay muted playsinline></video>
            <canvas id="photo-canvas" style="display:none;"></canvas>
            <button type="button" id="capture-btn">Ambil Gambar</button>
            <img id="photo-result" style="max-width: 100%; margin-top: 10px; display: none;" />
          </div>

          <div class="form-group">
            <label>Pilih Lokasi di Peta</label>
            <div id="map-picker" style="height: 300px; width: 100%;"></div>
            <input type="hidden" id="latitude" name="lat">
            <input type="hidden" id="longitude" name="lon">
          </div>
          
          <button type="submit" id="submit-story-btn">Unggah Cerita</button>
          <p id="upload-status" class="upload-status"></p>
        </form>
      </div>
    `;

    this._initializeCamera();
    this._initializeMap();
    this._addEventListeners();
  }

  async _initializeCamera() {
    try {
      this._mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const videoElement = document.getElementById("camera-preview");
      videoElement.srcObject = this._mediaStream;
    } catch (err) {
      console.error("Gagal mengakses kamera:", err);
      alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.");
    }
  }

  _initializeMap() {
    const defaultCoords = [-2.5489, 118.0149];
    this.map = L.map("map-picker").setView(defaultCoords, 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.map
    );
    this.marker = L.marker(defaultCoords, { draggable: true }).addTo(this.map);

    this._updateCoordinates(defaultCoords[0], defaultCoords[1]);

    this.map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.marker.setLatLng([lat, lng]);
      this._updateCoordinates(lat, lng);
    });

    this.marker.on("dragend", () => {
      const { lat, lng } = this.marker.getLatLng();
      this._updateCoordinates(lat, lng);
    });
  }

  _updateCoordinates(lat, lng) {
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lng;
  }

  _addEventListeners() {
    document.getElementById("capture-btn").addEventListener("click", () => {
      const video = document.getElementById("camera-preview");
      const canvas = document.getElementById("photo-canvas");
      const photoResult = document.getElementById("photo-result");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);

      photoResult.src = canvas.toDataURL("image/jpeg");
      photoResult.style.display = "block";
    });

    const form = document.getElementById("add-story-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const model = new StoryModel();
      const presenter = new AddStoryPresenter(model, this);

      const description = document.getElementById("description").value;
      const latitude = document.getElementById("latitude").value;
      const longitude = document.getElementById("longitude").value;
      const canvas = document.getElementById("photo-canvas");

      if (canvas.toDataURL() === document.createElement("canvas").toDataURL()) {
        this.showError("Silakan ambil gambar terlebih dahulu.");
        return;
      }

      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append("description", description);
        formData.append("lat", latitude);
        formData.append("lon", longitude);
        formData.append("photo", blob, "story.jpg");

        presenter.addStory(formData);
      }, "image/jpeg");
    });
  }

  showLoading() {
    document.getElementById("upload-status").innerText = "Mengunggah...";
    document.getElementById("upload-status").style.color = "black";
    document.getElementById("submit-story-btn").disabled = true;
  }

  hideLoading() {
    document.getElementById("upload-status").innerText = "";
    document.getElementById("submit-story-btn").disabled = false;
  }

  showSuccess(message) {
    document.getElementById("upload-status").innerText = message;
    document.getElementById("upload-status").style.color = "green";
  }

  showError(message) {
    document.getElementById("upload-status").innerText = `Error: ${message}`;
    document.getElementById("upload-status").style.color = "red";
  }

  _stopCamera() {
    if (this._mediaStream) {
      this._mediaStream.getTracks().forEach((track) => track.stop());
      this._mediaStream = null;
    }
  }

  cleanup() {
    this._stopCamera();
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
