import { resultOffers } from '../mock/offers.js';

export default class OffersModel {
  #offers = resultOffers;

  get offers() {
    return this.#offers;
  }
}
