import MainView from '../view/main-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointAddView from '../view/point-add-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

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

  init = (mainContainer, pointsModel, destinationsModel, offersModel) => {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#mainPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    render(this.#mainComponent, this.#mainContainer);
    render(new SortView(), this.#mainComponent.element);
    render(this.#tripListComponent, this.#mainComponent.element);

    const destinationPointEdit = this.#destinations.find((dest) => dest.id === this.#mainPoints[0].destination);

    const pointTypeOffers = this.#offers.find((offer) => offer.type === this.#mainPoints[0].type);

    this.#mainPoints[0].destination = destinationPointEdit;
    this.#mainPoints[0].offers = pointTypeOffers;

    render(new PointEditView(this.#mainPoints[0]), this.#tripListComponent.element);

    for (let i = 1; i < this.#mainPoints.length; i++) {

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

      render(new PointView(this.#mainPoints[i]), this.#tripListComponent.element);
    }

    render(new PointAddView(), this.#tripListComponent.element);
  };
}
