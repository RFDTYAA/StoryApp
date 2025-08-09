import { openDB } from "idb";

const DB_NAME = "story-app-db";
const DB_VERSION = 1;
const OBJECT_STORE_NAME = "stories";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

export const StoryDb = {
  async getAllStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putStory(story) {
    return (await dbPromise).put(OBJECT_STORE_NAME, story);
  },
  async putAllStories(stories) {
    const tx = (await dbPromise).transaction(OBJECT_STORE_NAME, "readwrite");
    stories.forEach((story) => {
      tx.store.put(story);
    });
    return tx.done;
  },
};
