import { HomeView } from "./view/home-view.js";
import { AddStoryView } from "./view/add-story-view.js";
import { LoginView } from "./view/login-view.js";
import { RegisterView } from "./view/register-view.js";
import { SavedStoriesView } from "./view/saved-stories-view.js";

import { StoryModel } from "./model/story-model.js";
import { StoryPresenter } from "./presenter/story-presenter.js";
import { AddStoryPresenter } from "./presenter/add-story-presenter.js";

import { updateNavbar } from "./utils/navigation.js";

export const handleRouting = () => {
  const hash = window.location.hash || "#/home";
  updateNavbar();

  if (hash === "#/home" || hash === "#/") {
    const view = new HomeView();
    view.render();
    const model = new StoryModel();
    const presenter = new StoryPresenter(model, view);
    window.app = window.app || {};
    window.app.storyPresenter = presenter;
    presenter.loadStories();
  } else if (hash === "#/add") {
    const view = new AddStoryView();
    view.render();
    const model = new StoryModel();
    const presenter = new AddStoryPresenter(model, view);
    window.app = window.app || {};
    window.app.addPresenter = presenter;
  } else if (hash === "#/login") {
    const view = new LoginView();
    view.render();
  } else if (hash === "#/register") {
    const view = new RegisterView();
    view.render();
  } else if (hash === "#/saved") {
    const view = new SavedStoriesView();
    view.render();
  } else {
    window.location.hash = "#/home";
  }
};
