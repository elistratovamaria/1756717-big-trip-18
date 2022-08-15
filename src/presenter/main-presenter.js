import MainView from '../view/main-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointAddView from '../view/point-add-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class MainPresenter {
  mainComponent = new MainView();
  tripListComponent = new TripListView();

  init = (mainContainer, pointsModel, destinationsModel, offersModel) => {
    this.mainContainer = mainContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.mainPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.destinationsModel.getDestinations()];
    this.offers = [...this.offersModel.getOffers()];

    render(this.mainComponent, this.mainContainer);
    render(new SortView(), this.mainComponent.getElement());
    render(this.tripListComponent, this.mainComponent.getElement());

    const destinationPointEdit = this.destinations.find((dest) => dest.id === this.mainPoints[0].destination);

    const pointTypeOffers = this.offers.find((offer) => offer.type === this.mainPoints[0].type);

    this.mainPoints[0].destination = destinationPointEdit;
    this.mainPoints[0].offers = pointTypeOffers;

    render(new PointEditView(this.mainPoints[0]), this.tripListComponent.getElement());

    for (let i = 1; i < this.mainPoints.length; i++) {

      const filteredOffers = () => {
        const pointOffers = this.offers;
        const offersByType = pointOffers.find((offer) => offer.type === this.mainPoints[i].type);
        const offersToAd = [];
        const offers = offersByType.offers;
        for (const offer of offers) {
          if (this.mainPoints[i].offers.includes(offer.id)) {
            offersToAd.push(offer);
          }
        }
        return {
          type: offersByType.type,
          offers: offersToAd,
        };
      };

      const destination = this.destinations.find((dest) => dest.id === this.mainPoints[i].destination);

      this.mainPoints[i].destination = destination;
      this.mainPoints[i].offers = filteredOffers();

      render(new PointView(this.mainPoints[i]), this.tripListComponent.getElement());
    }

    render(new PointAddView(), this.tripListComponent.getElement());
  };
}
