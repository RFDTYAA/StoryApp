// Jalankan: node generate-vapid.js
const webpush = require("web-push");

// Generate key pair
const vapidKeys = webpush.generateVAPIDKeys();

console.log("Public Key:\n", vapidKeys.publicKey);
console.log("\nPrivate Key:\n", vapidKeys.privateKey);
