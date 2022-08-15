import { generateDestinations } from '../mock/destination.js';

export default class DestinationsModel {
  destinations = generateDestinations();

  getDestinations = () => this.destinations;
}
