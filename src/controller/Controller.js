import OutputView from '../view/OutputView.js';
import InputView from '../view/InputView.js';

import LottoStatistics from '../domain/model/LottoStatistics.js';
import createLottos from '../domain/model/createLottos.js';
import calculateRevenueRate from '../domain/model/calculateRevenueRate.js';

class Controller {
  #lottoStatistics;

  constructor() {
    this.#lottoStatistics = new LottoStatistics();
  }

  async start() {
    const money = await InputView.readMoney();

    const userLottos = await this.buyUserLottos(money);
    OutputView.printUserLottos(userLottos);

    const statisticsResult = await this.getStatisticsResult(userLottos);
    OutputView.printStatisticsResult(statisticsResult);

    const revenueRate = this.getRevenueRate(money);
    OutputView.printRevenueRate(revenueRate);

    await this.restart();
  }

  async buyUserLottos(money) {
    const userLottos = createLottos(money);
    return userLottos;
  }

  async getStatisticsResult(userLottos) {
    const winningNumber = await InputView.readWinningNumber();
    const bonusNumber = await InputView.readBonusNumber(winningNumber);
    const winningLotto = { bonusNumber, lottoNumber: winningNumber };
    const statisticsResult = this.#lottoStatistics.compareLottos(
      userLottos,
      winningLotto,
    );
    return statisticsResult;
  }

  getRevenueRate(money) {
    const profit = this.#lottoStatistics.calculateProfit();
    const revenueRate = calculateRevenueRate(profit, money);
    return revenueRate;
  }

  async restart() {
    const condition = await InputView.readReStart();
    if (condition) {
      await this.start();
    }
  }
}
export default Controller;
