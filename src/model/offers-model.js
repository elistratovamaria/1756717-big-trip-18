import { generateMockOffersByType } from '../mock/offers.js';

export default class OffersModel {
  #offers = generateMockOffersByType();

  get offers() {
    return this.#offers;
  }
}
