import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointEditDate, isSubmitDisabledDate } from '../utils/point.js';
import { TYPES, OFFERS_OPTIONS, BLANC_POINT, DESTINATION_NAMES } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createPointEditTemplate = (point) => {
  const { dateFrom, dateTo, type, basePrice, offersByType, checkedOffers, checkedDestination } = point;

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

  const getCheckedOffersID = () => checkedOffers.map((offer) => offer.id);
  const checkedOffersID = getCheckedOffersID();

  const isOfferChecked = (offer) => checkedOffersID.includes(offer.id) ? 'checked' : '';

  const createEditOffersTemplate = () => offersByType
    .map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" data-offer-id="${offer.id}" id="event-offer-${getOfferOption(offer)}-${offer.id}" type="checkbox" name="event-offer-luggage" ${isOfferChecked(offer)}>
        <label class="event__offer-label" for="event-offer-${getOfferOption(offer)}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');

  const createEditOffersWrapperTemplate = () => {
    if (offersByType) {
      return (` <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${createEditOffersTemplate()}
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

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabledDate(dateTo, dateFrom) ? 'disabled' : ''}>Save</button>
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
  #destinations = null;
  #offers = null;
  #datepicker = null;

  constructor(point = BLANC_POINT, offers, destinations) {
    super();
    this._state = PointEditView.parsePointToState(point, offers, destinations);

    this.#destinations = destinations;
    this.#offers = offers;

    this.#setInnerHandlers();
    this.#setDateFrompicker();
    this.#setDateTopicker();
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  #dueDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dueDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  reset = (point, offers, destinations) => {
    this.updateElement(
      PointEditView.parsePointToState(point, offers, destinations),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.#setDateFrompicker();
    this.#setDateTopicker();
  };

  #offerToggleHandler = (evt) => {
    const allOffers = this.#offers[this._state.type];
    const allCheckedOffers = allOffers.filter((offer) => this._state.offers.includes(offer.id));
    const allCheckedOffersId = allCheckedOffers.map((offer) => offer.id);

    const newCheckedOfferIndexInAll = allOffers
      .findIndex((offer) => offer.id === Number(evt.target.dataset.offerId));

    const newCheckedOffer = this.#offers[this._state.type][newCheckedOfferIndexInAll];

    const getUpdatedCheckedOffers = () => {
      const isChecked = () => allCheckedOffersId.includes(newCheckedOffer.id);
      const isCheckedBoolean = isChecked();
      if (!isCheckedBoolean) {
        allCheckedOffers.push(newCheckedOffer);
      } else {
        const newCheckedOfferIndexInCheckedOffers = allCheckedOffers
          .findIndex((offer) => offer.id === newCheckedOffer.id);
        allCheckedOffers.splice(newCheckedOfferIndexInCheckedOffers, 1);
      }
      return allCheckedOffers;
    };
    const updatedCheckedOffers = getUpdatedCheckedOffers();
    this._setState({
      checkedOffers: updatedCheckedOffers,
      offers: allCheckedOffers.map((offer) => offer.id),
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offersByType: this.#offers[evt.target.value],
      checkedOffers: [],
      offers: [],
    });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedDestination: this.#destinations.find((elem) => elem.name === evt.target.value),
      destination: this.#destinations.find((elem) => elem.name === evt.target.value).id,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._state);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointEditView.parseStateToPoint(this._state, this.#offers, this.#destinations));
  };

  #setDateFrompicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('[name = "event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dueDateFromChangeHandler,
        enableTime: true,
        'time_24hr': true,
      },
    );
  };

  #setDateTopicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('[name = "event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dueDateToChangeHandler,
        enableTime: true,
        'time_24hr': true,
      },
    );
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #setInnerHandlers = () => {
    Array.from(this.element.querySelectorAll('.event__type-input')).forEach((typeElement) => typeElement
      .addEventListener('click', this.#typeToggleHandler)
    );
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationToggleHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    Array.from(this.element.querySelectorAll('.event__offer-checkbox')).forEach((offerElement) => offerElement
      .addEventListener('click', this.#offerToggleHandler)
    );
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  static parsePointToState = (point, offers, destinations) => ({
    ...point,
    offersByType: offers[point.type],
    checkedDestination: destinations.find((elem) => (elem.id === point.destination)),
    checkedOffers: offers[point.type].filter((offer) => point.offers.includes(offer.id)),
  });

  static parseStateToPoint = (state, offersByType, checkedDestination) => {
    const point = { ...state };

    point.offers = Array.from(Object.values(offersByType)[0]);

    point.destination = checkedDestination.id;

    delete point.checkedDestination;
    delete point.offersByType;
    delete point.checkedOffers;

    return point;
  };
}
