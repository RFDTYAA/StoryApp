module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{html,js,css,png,jpg,json}"],
  swDest: "dist/sw.js",
  importScripts: ["/js/sw-push-listener.js"],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/story-api\.dicoding\.dev\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
};
