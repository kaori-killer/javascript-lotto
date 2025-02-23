import { validateLottoNumber } from '../validation.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    validateLottoNumber(numbers);
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }

  countSameNumber(lotto) {
    return lotto.filter((number) => this.hasNumber(number)).length;
  }
}

export default Lotto;
