import CONFIG from './constants/config.js';

function validateMoney(money) {
  if (money <= 0) {
    throw new Error();
  }
  if (money % 1000 !== 0) {
    throw new Error();
  }
}
function lottoNumberCondition(number) {
  return number >= CONFIG.MIN.LOTTO_NUMBER && number <= CONFIG.MAX.LOTTO_NUMBER;
}

function validateLottoNumber(numbers) {
  if (numbers.length !== 6) {
    throw new Error('[ERROR] 로또 번호는 6자리여야 한다.');
  }

  if (!numbers.every(lottoNumberCondition)) {
    throw new Error('[ERROR] 로또 번호의 숫자 범위 1 ~ 45이다.');
  }

  if (new Set(numbers).size !== 6) {
    throw new Error('[ERROR] 로또 번호의 숫자는 중복될 수 없다.');
  }
}

function validateBonus(bonus) {
  if (!lottoNumberCondition(bonus)) {
    throw new Error('[ERROR] 보너스 번호의 숫자 범위 1 ~ 45이다.');
  }
}

export { validateMoney, validateLottoNumber, validateBonus };
