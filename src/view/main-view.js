import AbstractView from '../framework/view/abstract-view.js';

const createMainTemplate = () => '<section class="trip-events"></section>';

export default class MainView extends AbstractView {
  get template() {
    return createMainTemplate();
  }
}
