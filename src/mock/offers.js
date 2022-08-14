import { offerId, OFFER_TITLES, mockOfferPrice, TYPES } from '../const.js';
import { getArrayRandomLength, getRandomInteger } from '../util.js';

const generateOffer = (i) => ({
  id: i + 1,
  title: OFFER_TITLES[getRandomInteger(0, OFFER_TITLES.length - 1)],
  price: getRandomInteger(mockOfferPrice.MIN, mockOfferPrice.MAX),
});

const mockOffers = [];
for (let i = 0; i < offerId.MAX; i++) {
  mockOffers.push(generateOffer(i));
}

const generateOfferByType = (i) => ({
  type: TYPES[i],
  offers: getArrayRandomLength(mockOffers),
});

const mockOffersByType = [];
for (let i = 0; i < TYPES.length; i++) {
  mockOffersByType.push(generateOfferByType(i));
}

export { mockOffers, mockOffersByType };
