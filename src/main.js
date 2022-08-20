import FilterView from './view/filter-view.js';
import { render } from './framework/render.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripControlElement = document.querySelector('.trip-main__trip-controls');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const mainPresenter = new MainPresenter(tripEventsElement, pointsModel, destinationsModel, offersModel);

render(new FilterView(), tripControlElement);

mainPresenter.init();
