import MainView from '../view/main-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
import { render } from '../framework/render.js';

export default class MainPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #mainComponent = new MainView();
  #tripListComponent = new TripListView();

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

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point);

    const replacePointToForm = () => {
      this.#tripListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#tripListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#tripListComponent.element);
  };

  #renderMain = () => {
    render(this.#mainComponent, this.#mainContainer);

    if (this.#mainPoints.length < 1) {
      render (new NoPointView, this.#mainComponent.element);
    } else {

      render(new SortView(), this.#mainComponent.element);
      render(this.#tripListComponent, this.#mainComponent.element);

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
    }
  };
}
