import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { showErrorLoadMessage } from '../utils/common.js';

export default class DestinationsModel extends Observable{
  #destinationsApiService = null;
  #destinations = [];

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      showErrorLoadMessage('Can\'t receive data');
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };
}
