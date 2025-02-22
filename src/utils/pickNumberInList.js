import CONFIG from '../constants/config.js';

export default function pickNumberInList(min, max) {
  const randomNumbers = new Set();
  while (randomNumbers.size < CONFIG.LOTTO.LENGTH) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.add(randomNumber);
  }
  return [...randomNumbers];
}
