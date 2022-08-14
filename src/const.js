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

export { POINTS_AMOUNT, MAX_MINUTE_GAP, destinationId, MAX_LENGTH_DESTINATION_ARRAY, descriptionLength, offerId, mockPrice, OFFER_TITLES, DESCRIPTIONS_VARIANTS, DESTINATION_NAMES, mockOfferPrice, TYPES, MINUTES_IN_DAY, MINUTES_IN_HOUR };