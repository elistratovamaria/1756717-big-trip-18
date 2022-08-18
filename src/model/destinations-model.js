import { generateDestinations } from '../mock/destination.js';

export default class DestinationsModel {
  #destinations = generateDestinations();

  get destinations() {
    return this.#destinations;
  }
}
