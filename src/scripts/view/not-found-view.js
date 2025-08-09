export class NotFoundView {
  render() {
    document.getElementById("app-content").innerHTML = `
      <div class="not-found-container" style="text-align: center; padding-top: 5rem;">
        <h1>404</h1>
        <h2>Halaman Tidak Ditemukan</h2>
        <p>Maaf, halaman yang Anda cari tidak ada.</p>
        <a href="#/" style="color: #ff6600; text-decoration: none; font-weight: bold;">Kembali ke Halaman Utama</a>
      </div>
    `;
  }

  cleanup() {}
}
