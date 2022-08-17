import { createElement } from '../render.js';

const createMainTemplate = () => '<section class="trip-events"></section>';

export default class MainView {
  #element = null;

  get template() {
    return createMainTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
