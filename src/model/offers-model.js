import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { showErrorLoadMessage } from '../utils/common.js';

export default class OffersModel extends Observable{
  #offersApiService = null;
  #offers = [];

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = Object.assign.apply({}, offers.map( (v) => ( {[v.type]: v.offers} ) ) );
    } catch(err) {
      showErrorLoadMessage('Can\'t receive data');
      this.#offers = [];
    } finally {
      this._notify(UpdateType.INIT_OFFERS);
    }
  };
}
