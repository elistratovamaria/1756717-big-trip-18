import dayjs from 'dayjs';
import { MINUTES_IN_DAY, MINUTES_IN_HOUR } from '../const.js';

const humanizePointRouteTime = (pointRouteTime) => dayjs(pointRouteTime).format('HH:mm');

const humanizePointEventDate = (pointEventDate) => dayjs(pointEventDate).format('MMM DD');

const humanizePointEditDate = (pointEditDate) => dayjs(pointEditDate).format('DD/MM/YY HH:mm');

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

export { humanizePointEditDate, humanizePointEventDate, humanizePointRouteTime, humanizeRouteDuration };
