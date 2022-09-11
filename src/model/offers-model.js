import Observable from '../framework/observable.js';
import { resultOffers } from '../mock/offers.js';

export default class OffersModel extends Observable{
  #offers = resultOffers;

  get offers() {
    return this.#offers;
  }
}
