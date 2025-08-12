// Jalankan: node generate-placeholders.js
// Pastikan sudah install canvas: npm install canvas

const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

// Fungsi untuk membuat placeholder
function createPlaceholder(filePath, width, height, text) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Latar belakang oranye
  ctx.fillStyle = "#FF6600";
  ctx.fillRect(0, 0, width, height);

  // Teks putih di tengah
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `${Math.floor(height / 6)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  // Simpan file
  const buffer = canvas.toBuffer(
    path.extname(filePath) === ".jpg" ? "image/jpeg" : "image/png"
  );
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ Created: ${filePath}`);
}

// Buat folder jika belum ada
const iconsPath = path.join(__dirname, "public", "icons");
const screenshotsPath = path.join(__dirname, "public", "screenshots");
fs.mkdirSync(iconsPath, { recursive: true });
fs.mkdirSync(screenshotsPath, { recursive: true });

// Icons
createPlaceholder(
  path.join(iconsPath, "icon-192x192.png"),
  192,
  192,
  "192x192"
);
createPlaceholder(
  path.join(iconsPath, "icon-512x512.png"),
  512,
  512,
  "512x512"
);
createPlaceholder(path.join(iconsPath, "icon-add-96x96.png"), 96, 96, "Add");

// Screenshots
createPlaceholder(
  path.join(screenshotsPath, "desktop-screenshot-1.jpg"),
  1280,
  720,
  "Desktop"
);
createPlaceholder(
  path.join(screenshotsPath, "mobile-screenshot-1.jpg"),
  540,
  720,
  "Mobile"
);

console.log("🎯 Semua placeholder berhasil dibuat!");
