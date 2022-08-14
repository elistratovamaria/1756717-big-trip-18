import dayjs from 'dayjs';
import { MINUTES_IN_DAY, MINUTES_IN_HOUR } from './const';

const humanizePointRouteTime = (pointRouteTime) => dayjs(pointRouteTime).format('HH:mm');

const humanizePointEventDate = (pointEventDate) => dayjs(pointEventDate).format('MMM DD');

const humanizePointEditDate = (pointEditDate) => dayjs(pointEditDate).format('DD/MM/YY HH:mm');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getArrayRandomLength = (arr) => shuffle(arr).slice(getRandomInteger(0, arr.length - 1));

const getRouteDurationInMinutes = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

const getDurationInMinutes = (duration) => (duration < 10)
  ? `0${duration}M`
  : `${duration}M`;

const getDurationInHours = (duration) => (Math.floor(duration / MINUTES_IN_HOUR) < 10)
  ? `0${Math.floor(duration / MINUTES_IN_HOUR)}H
    ${getDurationInMinutes(duration - Math.floor(duration / MINUTES_IN_HOUR) * MINUTES_IN_HOUR)}`
  : `${Math.floor(duration / MINUTES_IN_HOUR)}H
    ${getDurationInMinutes(duration - Math.floor(duration / MINUTES_IN_HOUR) * MINUTES_IN_HOUR)}`;

const getDurationInDays = (duration) => (Math.floor(duration / MINUTES_IN_DAY) < 10)
  ? `0${Math.floor(duration / MINUTES_IN_DAY)}D
     ${getDurationInHours(duration - Math.floor(duration / MINUTES_IN_DAY) * MINUTES_IN_DAY)}`
  : `${Math.floor(duration / MINUTES_IN_DAY)}D
    ${getDurationInHours(duration - Math.floor(duration / MINUTES_IN_DAY) * MINUTES_IN_DAY)}`;


const humanizeRouteDuration = (dateFrom, dateTo) => {
  const routeDurationInMinutes = getRouteDurationInMinutes(dateFrom, dateTo);

  if (routeDurationInMinutes < MINUTES_IN_HOUR) {
    return `${getDurationInMinutes(routeDurationInMinutes)}`;
  } else if (routeDurationInMinutes > MINUTES_IN_HOUR && routeDurationInMinutes < MINUTES_IN_DAY) {
    return `${getDurationInHours(routeDurationInMinutes)}`;
  } else {
    return `${getDurationInDays(routeDurationInMinutes)}`;
  }
};

export { humanizePointRouteTime, humanizePointEventDate, getRandomInteger, getArrayRandomLength, humanizePointEditDate, humanizeRouteDuration };
