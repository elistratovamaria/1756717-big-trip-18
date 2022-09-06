import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point.js';
import { POINTS_AMOUNT } from '../const.js';

export default class PointsModel extends Observable {
  #points = Array.from({length: POINTS_AMOUNT}, generatePoint);

  get points() {
    return this.#points;
  }
}
