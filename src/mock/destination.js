import { MAX_LENGTH_DESTINATION_ARRAY, descriptionLength, DESCRIPTIONS_VARIANTS, DESTINATION_NAMES } from '../const.js';
import { getRandomInteger } from '../utils/common.js';

const generateDescription = () => {
  const descriptions = [];
  for (let i = 0; i < getRandomInteger(descriptionLength.MIN, descriptionLength.MAX); i++) {
    descriptions.push(DESCRIPTIONS_VARIANTS[getRandomInteger(0, DESCRIPTIONS_VARIANTS.length - 1)]);
  }
  return descriptions.join('');
};

const generateDestination = (i) => ({
  id: i + 1,
  description: generateDescription(),
  nameDest: DESTINATION_NAMES[getRandomInteger(0, DESTINATION_NAMES.length - 1)],
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: generateDescription(),
    }
  ],
});

const generateDestinations = () => {
  const destinations = [];
  for (let i = 0; i < MAX_LENGTH_DESTINATION_ARRAY; i++) {
    destinations.push(generateDestination(i));
  }
  return destinations;
};

export { generateDestinations };
