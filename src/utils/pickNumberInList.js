export default function pickNumberInList({ min, max, length }) {
  const randomNumbers = new Set();
  while (randomNumbers.size < length) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.add(randomNumber);
  }
  return [...randomNumbers];
}
