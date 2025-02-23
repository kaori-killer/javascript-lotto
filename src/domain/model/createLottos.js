import CONFIG from '../../constants/config.js';
import Lotto from './Lotto.js';
import pickNumberInList from '../../utils/pickNumberInList.js';

function createLotto() {
  const randomNumbers = pickNumberInList({
    min: CONFIG.LOTTO.NUMBER.MIN,
    max: CONFIG.LOTTO.NUMBER.MAX,
    length: CONFIG.LOTTO.LENGTH,
  });
  return new Lotto(randomNumbers);
}

export default function createLottos(money) {
  const quantity = money / CONFIG.LOTTO.PRICE;
  return Array.from({ length: quantity }).map(() => createLotto());
}
