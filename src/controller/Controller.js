import Machine from '../Machine.js';
import LottoStatistics from '../LottoStatistics.js';

import readLineAsync from '../view/InputView.js';
import { validateMoney, validateLottoNumber, validateBonus } from '../validation.js';
import OutputView from '../view/OutputView.js';

class Controller {
  #machine;

  #lottoStatistics;

  constructor() {
    this.#machine = new Machine();
    this.#lottoStatistics = new LottoStatistics();
  }

  async start() {
    let condition = true;
    while (condition) {
      const money = await this.readMoney();
      this.#machine.createLottos(money);
      OutputView.printLottoQuantity(this.#machine.getLottoQuantity());
      this.#machine.getLottos().forEach((lotto) => (
        OutputView.printSingLotto(lotto.getNumbers())
      ));

      const winningLotto = await this.readWinningLotto();
      const bonus = await this.readBonus(winningLotto);
      const winningNumber = { bonus, lotto: winningLotto };
      this.#lottoStatistics.compareLottos(this.#machine.getLottos(), winningNumber);
      condition = await this.readReStart();
    }
  }

  async readMoney() {
    const input = await readLineAsync('> 구입금액을 입력해 주세요.');
    const money = parseInt(input, 10);
    validateMoney(money);
    return money;
  }

  async readWinningLotto() {
    const input = await readLineAsync('> 당첨 번호를 입력해 주세요.');
    const winningLotto = input?.split(',').map((item) => parseInt(item, 10));
    validateLottoNumber(winningLotto);
    return winningLotto;
  }

  async readBonus(winningLotto) {
    const input = await readLineAsync('> 보너스 번호를 입력해 주세요.');
    const bonus = parseInt(input, 10);
    validateBonus(bonus, winningLotto);
    return bonus;
  }

  async readReStart() {
    const input = await readLineAsync('> 다시 시작하시겠습니까? (y/n)');
    if (input.toLowerCase() === 'n') {
      return false;
    }
    return true;
  }
}

export default Controller;
