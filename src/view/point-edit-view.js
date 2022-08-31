import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointEditDate } from '../utils/point.js';
import { TYPES, OFFERS_OPTIONS, BLANC_POINT, DESTINATION_NAMES } from '../const.js';

const createPointEditTemplate = (point) => {
  const { dateFrom, dateTo, type, basePrice, offers, checkedOffersByType, checkedDestination } = point;

  const makeTypeToUpperCase = (typeToChange) => typeToChange[0].toUpperCase() + typeToChange.slice(1);

  const createEditTypeTemplate = (currentType) => TYPES.map((typeToShow) => `<div
  class="event__type-item">
  <input id="event-type-${typeToShow}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeToShow}" ${currentType === typeToShow ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${typeToShow}" for="event-type-${typeToShow}-1">${makeTypeToUpperCase(typeToShow)}</label>
</div>`).join('');

  const typesTemplate = createEditTypeTemplate(type);

  const humanDateFrom = humanizePointEditDate(dateFrom);
  const humanDateTo = humanizePointEditDate(dateTo);

  const getOfferOption = (offer) => {
    const offerTitle = offer.title;
    return offerTitle in OFFERS_OPTIONS ? OFFERS_OPTIONS[offerTitle] : 'default';
  };

  const isOfferChecked = (offer) => offers.includes(offer.id) ? 'checked' : '';

  const createEditOffersTemplate = () => checkedOffersByType
    .map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getOfferOption(offer)}-1" type="checkbox" name="event-offer-luggage" ${isOfferChecked(offer)}>
        <label class="event__offer-label" for="event-offer-${getOfferOption(offer)}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');

  const createEditOffersWrapperTemplate = () => {
    if (checkedOffersByType) {
      return (` <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${createEditOffersTemplate()};
                  </div>
                </section>`);
    }
  };

  const createDestinationDescriptionTemplate = () => {
    if (checkedDestination.description) {
      return (`<p class="event__destination-description">${checkedDestination.description}</p>`);
    }
  };

  const createPicturesTemplate = (pictures) => pictures
    .map((pictureToShow) => `<img class="event__photo" src="${pictureToShow.src}" alt="${pictureToShow.description}">`)
    .join('');

  const createDestinationPicturesTemplate = () => {
    if (checkedDestination.pictures) {
      return (
        `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${createPicturesTemplate(checkedDestination.pictures)}
            </div>
          </div>`
      );
    }
  };

  const createEditDestinationTemplate = () => {
    if (checkedDestination.description || checkedDestination.pictures) {
      return (`<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                ${createDestinationDescriptionTemplate()}
                ${createDestinationPicturesTemplate()}
              </section>`);
    }
  };

  const isSelectedDestinationName = (name) => checkedDestination.name === name ? 'selected' : '';

  const createDestinationOptionTemplate = () => DESTINATION_NAMES
    .map((name) => `<option value="${name}" ${isSelectedDestinationName(name)}></option>`)
    .join('');

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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${checkedDestination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationOptionTemplate()}
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
        ${createEditOffersWrapperTemplate()}
        ${createEditDestinationTemplate()}
      </section>
    </form>
  </li>`
  );
};

export default class PointEditView extends AbstractStatefulView {

  constructor(point = BLANC_POINT, offers, destinations) {
    super();
    this._state = PointEditView.parsePointToState(point, offers, destinations);

    const typeElements = this.element.querySelectorAll('.event__type-input');
    typeElements.forEach((typeElement) => typeElement
      .addEventListener('click', this.#typeToggleHandler)
    );
    this.element.querySelector('.event__input--destination')
      .addEventListener('click', this.#destinationToggleHandler);
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#formSubmitHandler);
  };

  #typeToggleHandler = () => {

  };

  #destinationToggleHandler = () => {

  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._state);
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  static parsePointToState = (point, offers, destinations) => ({
    ...point,
    checkedOffersByType: offers[point.type],
    checkedDestination: destinations.find((elem) => (elem.id === point.destination)),
  });

  static parseStateToPoint = (state, checkedOffersByType, checkedDestination) => {
    const point = { ...state };

    point.offers = Array.from(Object.values(checkedOffersByType)[0]);

    point.destination = checkedDestination.id;

    delete point.checkedDestination;
    delete point.checkedOffersByType;

    return point;
  };
}
