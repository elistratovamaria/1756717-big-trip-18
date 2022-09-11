import Observable from '../framework/observable.js';
import { generateDestinations } from '../mock/destination.js';

export default class DestinationsModel extends Observable{
  #destinations = generateDestinations();

  get destinations() {
    return this.#destinations;
  }
}
