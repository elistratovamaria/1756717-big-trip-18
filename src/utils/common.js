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

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { getRandomInteger, getArrayRandomLength, isEscapeKey };
