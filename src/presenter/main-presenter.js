import MainView from '../view/main-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { sortByDefault, sortByPrice, sortByTime } from '../utils/point.js';
import { SortType } from '../const.js';

export default class MainPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #sortComponent = null;

  #mainComponent = new MainView();
  #tripListComponent = new TripListView();
  #noPointComponent = new NoPointView();

  #destinations = [];
  #offers = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(mainContainer, pointsModel, destinationsModel, offersModel) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
      default:
        return [...this.#pointsModel.points].sort(sortByDefault);
    }
    return this.#pointsModel.points;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  init = () => {
    this.#renderMain();
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderTripList();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#mainComponent.element);
  };

  #renderSort = (sortType = SortType.DEFAULT) => {
    if (this.#sortComponent instanceof SortView) {
      remove(this.#sortComponent);
    }
    this.#sortComponent = new SortView(sortType);
    render(this.#sortComponent, this.#mainComponent.element);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#handleViewAction, this.#handleModeChange);

    pointPresenter.init(point, this.#offers, this.#destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#mainComponent.element);
    this.#renderPoints(this.points);
  };

  #renderMain = () => {
    render(this.#mainComponent, this.#mainContainer);

    if (this.points.length < 1) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  };
}
