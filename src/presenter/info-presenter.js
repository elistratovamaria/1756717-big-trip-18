import InfoView from '../view/info-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';

export default class InfoPresenter {
  #infoContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #infoComponent = null;

  constructor(infoContainer, pointsModel, destinationsModel, offersModel) {
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointsModel.points;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  init = () => {
    this.#renderInfo();
  };

  #handleModelEvent = () => {
    if (this.destinations.length !== 0 && Object.keys(this.offers).length !== 0) {
      this.init();
    }
  };

  #renderInfo = () => {
    if (this.#infoComponent instanceof InfoView) {
      remove(this.#infoComponent);
    }
    this.#infoComponent = new InfoView(this.points, this.destinations, this.offers);
    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  };
}
