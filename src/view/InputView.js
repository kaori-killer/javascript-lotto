import readLineAsync from './readLineAsync.js';
import {
  validateMoney, validateLottoNumber, validateBonus, validateRestart,
} from '../domain/validation.js';
import CONFIG from '../constants/config.js';
import OutputView from './OutputView.js';

const INPUT_MESSAGES = Object.freeze({
  READ_MONEY: '> 구입금액을 입력해 주세요.',
  READ_WINNING_LOTTO: `${CONFIG.NEW_LINE}> 당첨 번호를 입력해 주세요.`,
  READ_BONUS: `${CONFIG.NEW_LINE}> 보너스 번호를 입력해 주세요.`,
  READ_RESTART: `${CONFIG.NEW_LINE}> 다시 시작하시겠습니까? (y/n)`,
});

async function reRead(error, method) {
  OutputView.printErrorMessage(error.message);
  return await method();
}

const InputView = {
  async readMoney() {
    try {
      const input = await readLineAsync(INPUT_MESSAGES.READ_MONEY);
      const money = parseInt(input, CONFIG.DECIMAL);
      validateMoney(money);
      return money;
    } catch (error) {
      return reRead(error, this.readMoney);
    }
  },
  async readWinningNumber() {
    try {
      const input = await readLineAsync(INPUT_MESSAGES.READ_WINNING_LOTTO);
      const winningLotto = input?.split(',').map((item) => parseInt(item, CONFIG.DECIMAL));
      validateLottoNumber(winningLotto);
      return winningLotto;
    } catch (error) {
      return reRead(error, this.readWinningNumber);
    }
  },
  async readBonusNumber(winningLotto) {
    try {
      const input = await readLineAsync(INPUT_MESSAGES.READ_BONUS);
      const bonus = parseInt(input, CONFIG.DECIMAL);
      validateBonus(bonus, winningLotto);
      return bonus;
    } catch (error) {
      return reRead(error, () => this.readBonusNumber(winningLotto));
    }
  },
  async readReStart() {
    try {
      const input = await readLineAsync(INPUT_MESSAGES.READ_RESTART);
      const lowerCaseInput = input.toLowerCase();
      validateRestart(lowerCaseInput);
      return !(lowerCaseInput === CONFIG.ANSWER.NO) && lowerCaseInput === CONFIG.ANSWER.YES;
    } catch (error) {
      return reRead(error, this.readReStart);
    }
  },
};

export default InputView;
