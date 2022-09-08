import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const tripControlElement = document.querySelector('.trip-main__trip-controls');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter(tripEventsElement, pointsModel, destinationsModel, offersModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlElement, filterModel, pointsModel);

filterPresenter.init();
mainPresenter.init();
