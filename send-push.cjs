const fs = require("fs");
const webpush = require("web-push");

const VAPID_PUBLIC =
  "BLXy8gNJ5aM-xIf9hvC5oT2TvZf7PMq6ZbeAWSq_-DyUMva6S6T1qfKTIWyA2NYORYHxCpNuFkN34yHa0px549Q";
const VAPID_PRIVATE = "zqQYQdVR2N2d-shffdgcwc9lWJiLWpLXLMHL051jnZY";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  VAPID_PUBLIC,
  VAPID_PRIVATE
);

const subscription = JSON.parse(fs.readFileSync("./subscription.json", "utf8"));

const payload = JSON.stringify({
  title: "Hello from server",
  body: "Ini test push notification",
});

webpush
  .sendNotification(subscription, payload)
  .then(() => console.log("Push sent!"))
  .catch((err) => console.error("Error sending push:", err));
