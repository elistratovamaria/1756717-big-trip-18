const POINTS_AMOUNT = 4;

const MAX_MINUTE_GAP = 10080;

const OFFER_TITLES = [
  'Upgrade to a business class',
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
];

const OFFERS_OPTIONS = {
  'Upgrade to a business class': 'comfort',
  'Add luggage': 'luggage',
  'Switch to comfort class': 'comfort',
  'Add meal': 'meal',
  'Choose seats': 'seats',
  'Travel by train': 'train',
};

const DESCRIPTIONS_VARIANTS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const DESTINATION_NAMES = [
  'Chamonix',
  'Geneva',
  'Amsterdam',
  'Moscow',
];

const MAX_LENGTH_DESTINATION_ARRAY = 20;

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const MINUTES_IN_HOUR = 60;

const MINUTES_IN_DAY = 1440;

const destinationId = {
  MIN: 1,
  MAX: 20,
};

const offerId = {
  MIN: 1,
  MAX: 5,
};

const mockPrice = {
  MIN: 200,
  MAX: 1500,
};

const mockOfferPrice = {
  MIN: 5,
  MAX: 120,
};

const descriptionLength = {
  MIN: 1,
  MAX: 5,
};

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
  dateFrom: '2022-09-10T22:55:56.845Z',
  dateTo: '2022-09-10T22:55:56.845Z',
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
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

export { POINTS_AMOUNT, MAX_MINUTE_GAP, destinationId, MAX_LENGTH_DESTINATION_ARRAY, descriptionLength, offerId, mockPrice, OFFER_TITLES, DESCRIPTIONS_VARIANTS, DESTINATION_NAMES, mockOfferPrice, TYPES, MINUTES_IN_DAY, MINUTES_IN_HOUR, OFFERS_OPTIONS, FilterType, Mode, SortType, BLANC_POINT, UserAction, UpdateType, NoPointsTextType };
