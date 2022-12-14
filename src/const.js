const MINUTES_IN_HOUR = 60;

const MINUTES_IN_DAY = 1440;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const BLANC_POINT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: 1,
  isFavorite: false,
  offers: [],
  type: 'bus',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT_POINTS: 'INIT_POINTS',
  INIT_OFFERS: 'INIT_OFFERS',
  INIT_DESTINATIONS: 'INIT_DESTINATIONS',
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


const AUTHORIZATION = 'Basic h2odbsycbep84ohd';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const tripControlElement = document.querySelector('.trip-main__trip-controls');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

export { MINUTES_IN_DAY, MINUTES_IN_HOUR, FilterType, Mode, SortType, BLANC_POINT, UserAction, UpdateType, NoPointsTextType, Method, AUTHORIZATION, END_POINT, TimeLimit, tripControlElement, tripEventsElement, tripMainElement };
