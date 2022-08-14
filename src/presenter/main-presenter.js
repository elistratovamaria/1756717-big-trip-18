import MainView from '../view/main-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointAddView from '../view/point-add-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class MainPresenter {
  mainComponent = new MainView();
  tripListComponent = new TripListView();

  init = (mainContainer, pointsModel) => {
    this.mainContainer = mainContainer;
    this.pointsModel = pointsModel;
    this.mainPoints = [...this.pointsModel.getPoints()];

    render(this.mainComponent, this.mainContainer);
    render(new SortView(), this.mainComponent.getElement());
    render(this.tripListComponent, this.mainComponent.getElement());
    render(new PointEditView(this.mainPoints[0]), this.tripListComponent.getElement());

    for (let i = 1; i < this.mainPoints.length; i++) {
      render(new PointView(this.mainPoints[i]), this.tripListComponent.getElement());
    }

    render(new PointAddView(), this.tripListComponent.getElement());
  };
}
