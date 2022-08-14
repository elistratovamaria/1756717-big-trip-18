import { getRandomInteger, getArrayRandomLength } from '../util.js';
import { MAX_MINUTE_GAP, destinationId, mockPrice, TYPES } from '../const.js';
import dayjs from 'dayjs';

const generateDateFrom = () => {
  const minuteGap = getRandomInteger(0, MAX_MINUTE_GAP);
  return dayjs().add(minuteGap, 'minute').toISOString();
};

const generateDateTo = () => {
  const minuteGap = getRandomInteger(MAX_MINUTE_GAP + 1, MAX_MINUTE_GAP * 2);
  return dayjs().add(minuteGap, 'minute').toISOString();
};

const generateOffersID = () => {
  const offersID = [];
  for (let i = 0; i < destinationId.MAX; i++) {
    offersID.push(i + 1);
  }
  return offersID;
};

const generatePoint = () => ({
  basePrice: getRandomInteger(mockPrice.MIN, mockPrice.MAX),
  dateFrom: generateDateFrom(),
  dateTo: generateDateTo(),
  destination: getRandomInteger(destinationId.MIN, destinationId.MAX),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: getArrayRandomLength(generateOffersID()),
  type: TYPES[getRandomInteger(0, TYPES.length - 1)],
});

export { generatePoint };
