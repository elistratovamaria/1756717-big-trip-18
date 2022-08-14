import { createElement } from '../render.js';
import { humanizePointEditDate } from '../util.js';
import { TYPES } from '../const.js';
import { destinations } from '../mock/destination.js';
import { mockOffersByType } from '../mock/offers.js';

const createPointEditTemplate = (point) => {
  const { dateFrom, dateTo, type, destination, basePrice, offers } = point;
  const makeTypeToUpperCase = (typeToChange) => typeToChange[0].toUpperCase() + typeToChange.slice(1);

  const createEditTypeTemplate = (currentType) => TYPES.map((typeToShow) => `<div
  class="event__type-item">
  <input id="event-type-${typeToShow}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeToShow}" ${currentType === typeToShow ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${typeToShow}" for="event-type-${typeToShow}-1">${makeTypeToUpperCase(typeToShow)}</label>
</div>`).join('');

  const typesTemplate = createEditTypeTemplate(type);

  const getDestinationName = () => {
    for (const mockDestination of destinations) {
      if (destination === mockDestination.id) {
        return mockDestination.nameDest;
      }
    }
  };

  const getDestinationDescription = () => {
    for (const mockDestination of destinations) {
      if (destination === mockDestination.id) {
        return mockDestination.description;
      }
    }
  };

  const humanDateFrom = humanizePointEditDate(dateFrom);
  const humanDateTo = humanizePointEditDate(dateTo);

  const isOfferChecked = (offer) => offers.includes(offer.id) ? 'checked' : '';

  const createEditOffersTemplate = () => {
    if (mockOffersByType) {
      const pointTypeOffers = mockOffersByType
        .find((offer) => offer.type === type);
      return pointTypeOffers.offers
        .map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isOfferChecked(offer)}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');
    }
  };

  const offersTemplate = createEditOffersTemplate();

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${getDestinationName()}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam" selected></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanDateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanDateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${getDestinationDescription()}</p>
        </section>
      </section>
    </form>
  </li>`
  );
};

export default class PointEditView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointEditTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
