import MainView from '../view/main-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';

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

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#mainComponent.element);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainComponent.element);
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setClickHandler(() => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#tripListComponent.element);
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
