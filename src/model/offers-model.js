import { generateMockOffersByType } from '../mock/offers.js';

export default class OffersModel {
  offers = generateMockOffersByType();

  getOffers = () => this.offers;
}
