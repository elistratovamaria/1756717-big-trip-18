import MainView from '../view/main-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import NoPointView from '../view/no-point-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class MainPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #mainComponent = new MainView();
  #tripListComponent = new TripListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #mainPoints = [];
  #destinations = [];
  #offers = [];
  #pointPresenter = new Map();

  constructor(mainContainer, pointsModel, destinationsModel, offersModel) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = () => {
    this.#mainPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#renderMain();
  };

  #handlePointChange = (updatedPoint) => {
    this.#mainPoints = updateItem(this.#mainPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#mainComponent.element);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainComponent.element);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    for (let i = 0; i < this.#mainPoints.length; i++) {

      const filterOffers = () => {
        const pointOffers = this.#offers.find((offer) => offer.type === this.#mainPoints[i].type);
        const offersToAd = pointOffers.offers.filter((offer) => this.#mainPoints[i].offers.includes(offer.id));
        return {
          type: pointOffers.type,
          offers: offersToAd,
        };
      };

      const destination = this.#destinations.find((dest) => dest.id === this.#mainPoints[i].destination);

      this.#mainPoints[i].destination = destination;
      this.#mainPoints[i].offers = filterOffers();

      this.#renderPoint(this.#mainPoints[i]);
    }
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#mainComponent.element);
    this.#renderPoints();
  };

  #renderMain = () => {
    render(this.#mainComponent, this.#mainContainer);

    if (this.#mainPoints.length < 1) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  };
}
