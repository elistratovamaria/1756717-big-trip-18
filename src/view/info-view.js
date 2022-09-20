import AbstractView from '../framework/view/abstract-view.js';
import { getFormatInfoDates, getFormatRouteNames } from '../utils/point.js';
import { sortByDefault } from '../utils/point.js';

const getRouteNames = (points, destinations) => {
  const sorteredPoints = points.sort(sortByDefault);
  const routeNamesIDs = sorteredPoints.map((point) => point.destination);
  return getFormatRouteNames(routeNamesIDs, destinations);
};

const getDates = (points) => {
  const sorteredPoints = points.sort(sortByDefault);
  const dateA = sorteredPoints[0].dateFrom;
  const dateB = sorteredPoints[points.length - 1].dateTo;

  return getFormatInfoDates(dateA, dateB);
};

const getPrice = (points, offers) => {
  const baseTotalPrice = points.reduce((priceA, priceB) => priceA + priceB.basePrice, 0);
  const getCheckedOffers = () => {
    const checkedOffers = [];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      checkedOffers.push(offers[point.type].filter((offer) => point.offers.includes(offer.id)));
    }
    return checkedOffers;
  };
  const checkedOffersToCount = getCheckedOffers().flat(Infinity);
  const checkedOffersPrice = [...checkedOffersToCount].reduce((priceA, priceB) => priceA + priceB.price, 0);
  return baseTotalPrice + checkedOffersPrice;
};

const createInfoTemplate = (points, destinations, offers) => {
  if (points.length !== 0 && destinations.length !== 0 && Object.keys(offers).length !== 0) {
    return (
      `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getRouteNames(points, destinations)}</h1>

      <p class="trip-info__dates">${getDates(points)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPrice(points, offers)}</span>
    </p>
  </section>`
    );
  } else {
    return (
      `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">My route</h1>

        <p class="trip-info__dates">Sometimes</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">Much</span>
      </p>
    </section>`
    );
  }
};

export default class InfoView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
