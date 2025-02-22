import { ERROR, OUTPUT_MESSAGE } from '../constants/message.js';

const OutputView = {
  printLottoQuantity(quantity) {
    console.log(OUTPUT_MESSAGE.LOTTO_QUANTITY(quantity));
  },
  printSingleLotto(lotto) {
    console.log(OUTPUT_MESSAGE.SINGLE_LOTTO(lotto));
  },
  printUserLottos(userLottos) {
    OutputView.printLottoQuantity(userLottos.length);
    userLottos.forEach((lotto) => (
      OutputView.printSingleLotto(lotto.getNumbers())
    ));
  },

  printRankResultHeadLine() {
    console.log(OUTPUT_MESSAGE.RANK_RESULT_HEADLINE);
  },
  printRankResult(key, value) {
    console.log(OUTPUT_MESSAGE.RANK_RESULT(key, value));
  },
  printStatisticsResult(rankResult) {
    OutputView.printRankResultHeadLine();
    Object.keys(rankResult).forEach((key) => (
      OutputView.printRankResult(key, rankResult[key])
    ));
  },

  printRevenueRate(revenueRate) {
    console.log(OUTPUT_MESSAGE.REVENUE_RATE(revenueRate));
  },
  printErrorMessage(message) {
    console.log(ERROR.NORMALIZATION(message));
  },
};

export default OutputView;
