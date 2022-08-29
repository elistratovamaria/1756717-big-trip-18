import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointRouteTime, humanizePointEventDate, humanizeRouteDuration } from '../utils/point.js';

const createPointTemplate = (point, offersData, destinationData) => {
  const { dateFrom, dateTo, type, destination, basePrice, offers, isFavorite } = point;

  const humanDateFrom = humanizePointRouteTime(dateFrom);
  const humanDateTo = humanizePointRouteTime(dateTo);
  const humanEventDate = humanizePointEventDate(dateFrom);

  const humanRouteDuration = humanizeRouteDuration(dateFrom, dateTo);

  const makeTypeToUpperCase = () => type[0].toUpperCase() + type.slice(1);

  const name = destinationData.find((dest) => (dest.id === destination)).name;

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const createOffersTemplate = () => {
    const offersToAd = [];
    const offersByType = offersData[type];
    for (const offer of offersByType) {
      if (offers.includes(offer.id)) {
        offersToAd.push(offer);
      }
    }
    return offersToAd
      .map((offer) =>
        `<li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>`
      )
      .join('');
  };

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${humanEventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${makeTypeToUpperCase()} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${humanDateFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${humanDateTo}</time>
        </p>
        <p class="event__duration">${humanRouteDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffersTemplate()}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;

  constructor(point, offers, destinations) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
