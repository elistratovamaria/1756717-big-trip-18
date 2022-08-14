import { generatePoint } from '../mock/point.js';
import { POINTS_AMOUNT } from '../const.js';

export default class PointsModel {
  points = Array.from({length: POINTS_AMOUNT}, generatePoint);

  getPoints = () => this.points;
}
