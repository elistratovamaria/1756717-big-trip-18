import FilterView from './view/filter-view.js';
import { render } from './render.js';
import MainPresenter from './presenter/main-presenter.js';

const tripControlElement = document.querySelector('.trip-main__trip-controls');
const tripEventsElement = document.querySelector('.trip-events');
const mainPresenter = new MainPresenter();

render(new FilterView(), tripControlElement);

mainPresenter.init(tripEventsElement);
