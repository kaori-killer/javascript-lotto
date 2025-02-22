import CONFIG from '../../constants/config.js';
import Lotto from './Lotto.js';
import pickNumberInList from '../../utils/pickNumberInList.js';

function createLotto() {
  const randomNumbers = pickNumberInList(
    CONFIG.MIN.LOTTO_NUMBER,
    CONFIG.MAX.LOTTO_NUMBER,
  );
  return new Lotto(randomNumbers);
}

export default function createLottos(money) {
  const quantity = money / CONFIG.LOTTO_PRICE;
  return Array.from({ length: quantity }).map(() => createLotto());
}
