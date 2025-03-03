var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _numbers, _rankResult;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function calculateRevenueRate(profit, investmentCost) {
  return Number((profit / investmentCost * 100).toFixed(1));
}
const CONFIG = Object.freeze({
  LOTTO: Object.freeze({
    PRICE: Object.freeze({
      MIN: 1e3,
      MAX: 1e5
    }),
    LENGTH: 6,
    NUMBER: Object.freeze({
      MIN: 1,
      MAX: 45
    })
  }),
  RANK: Object.freeze({
    MIN_COUNT: 3,
    SECOND_PRIZE_MATCH_COUNT: 5,
    OBJECT_KEY: Object.freeze({
      BONUS: (sameCount) => `${sameCount}개 일치, 보너스 볼 일치`,
      NORMAL: (sameCount) => `${sameCount}개 일치`
    })
  }),
  INITIAL_MONEY: 0,
  INITIAL_PROFIT: 0,
  DECIMAL: 10,
  ANSWER: Object.freeze({
    YES: "y",
    NO: "n"
  }),
  NEW_LINE: "\n"
});
const ERROR_MESSAGES = Object.freeze({
  MONEY: Object.freeze({
    EMPTY_VALUE: `로또 구입 금액은 ${CONFIG.LOTTO.PRICE.MIN}원 이하일 수 없다.`,
    REST_VALUE: `로또 구입 금액은 ${CONFIG.LOTTO.PRICE.MIN}원으로 나눠떨어져야 한다.`,
    MAX_VALUE: `로또 구입 금액은 ${CONFIG.LOTTO.PRICE.MAX}원 이하만 가능하다.`
  }),
  LOTTO: Object.freeze({
    NUMBER: Object.freeze({
      QUANTITY: `로또 번호는 ${CONFIG.LOTTO.LENGTH}자리여야 한다.`,
      RANGE: `로또 번호의 숫자 범위는 ${CONFIG.LOTTO.NUMBER.MIN} ~ ${CONFIG.LOTTO.NUMBER.MAX}이다.`,
      DUPLICATION: "로또 번호의 숫자는 중복될 수 없다."
    }),
    BONUS: Object.freeze({
      RANGE: `보너스 번호의 숫자 범위는 ${CONFIG.LOTTO.NUMBER.MIN} ~ ${CONFIG.LOTTO.NUMBER.MAX}이다.`,
      DUPLICATION: "보너스 번호는 당첨 로또에 있는 숫자와 중복되면 안된다."
    })
  }),
  RESTART: Object.freeze({
    YES_OR_NO: `${CONFIG.ANSWER.YES} 혹은 ${CONFIG.ANSWER.NO} 중에 하나를 입력해주세요.`
  })
});
function validateMoney(money) {
  if (money <= CONFIG.INITIAL_MONEY) {
    throw new Error(ERROR_MESSAGES.MONEY.EMPTY_VALUE);
  }
  if (money % CONFIG.LOTTO.PRICE.MIN !== 0) {
    throw new Error(ERROR_MESSAGES.MONEY.REST_VALUE);
  }
  if (money > CONFIG.LOTTO.PRICE.MAX) {
    throw new Error(ERROR_MESSAGES.MONEY.MAX_VALUE);
  }
}
function lottoNumberCondition(number) {
  return number >= CONFIG.LOTTO.NUMBER.MIN && number <= CONFIG.LOTTO.NUMBER.MAX;
}
function validateLottoNumber(numbers) {
  if (numbers.length !== CONFIG.LOTTO.LENGTH) {
    throw new Error(ERROR_MESSAGES.LOTTO.NUMBER.QUANTITY);
  }
  if (!numbers.every(lottoNumberCondition)) {
    throw new Error(ERROR_MESSAGES.LOTTO.NUMBER.RANGE);
  }
  if (new Set(numbers).size !== CONFIG.LOTTO.LENGTH) {
    throw new Error(ERROR_MESSAGES.LOTTO.NUMBER.DUPLICATION);
  }
}
function validateBonus(bonus, winningLotto) {
  if (!lottoNumberCondition(bonus)) {
    throw new Error(ERROR_MESSAGES.LOTTO.BONUS.RANGE);
  }
  if (winningLotto.includes(bonus)) {
    throw new Error(ERROR_MESSAGES.LOTTO.BONUS.DUPLICATION);
  }
}
class Lotto {
  constructor(numbers) {
    __privateAdd(this, _numbers);
    validateLottoNumber(numbers);
    __privateSet(this, _numbers, numbers);
  }
  getNumbers() {
    return __privateGet(this, _numbers).sort((a, b) => a - b);
  }
  hasNumber(number) {
    return __privateGet(this, _numbers).includes(number);
  }
  getMatchedNumberCount(lotto) {
    return lotto.filter((number) => this.hasNumber(number)).length;
  }
}
_numbers = new WeakMap();
function pickNumberInList({ min, max, maxLength }) {
  const randomNumbers = /* @__PURE__ */ new Set();
  while (randomNumbers.size < maxLength) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.add(randomNumber);
  }
  return [...randomNumbers];
}
function getLottoQuantity(money) {
  return money / CONFIG.LOTTO.PRICE.MIN;
}
function createLotto() {
  const randomNumbers = pickNumberInList({
    min: CONFIG.LOTTO.NUMBER.MIN,
    max: CONFIG.LOTTO.NUMBER.MAX,
    maxLength: CONFIG.LOTTO.LENGTH
  });
  return new Lotto(randomNumbers);
}
function createLottos(money) {
  const quantity = getLottoQuantity(money);
  return Array.from({ length: quantity }).map(() => createLotto());
}
class LottoStatistics {
  constructor() {
    __privateAdd(this, _rankResult);
    this.init();
  }
  init() {
    __privateSet(this, _rankResult, {
      "3개 일치": { name: "3", count: 0, price: 5e3 },
      "4개 일치": { name: "4", count: 0, price: 5e4 },
      "5개 일치": { name: "5", count: 0, price: 15e5 },
      "5개 일치, 보너스 볼 일치": { name: "5+1", count: 0, price: 3e7 },
      "6개 일치": { name: "6", count: 0, price: 2e9 }
    });
  }
  compareLottos(userLottos, winningLotto) {
    userLottos.forEach((userLotto) => {
      const sameNumberCount = userLotto.getMatchedNumberCount(winningLotto.lottoNumber);
      const isIncludedBonusNumber = userLotto.hasNumber(winningLotto.bonusNumber);
      this.determineRank(sameNumberCount, isIncludedBonusNumber);
    });
    return __privateGet(this, _rankResult);
  }
  determineRank(sameNumberCount, isIncludedBonusNumber) {
    if (sameNumberCount === CONFIG.RANK.SECOND_PRIZE_MATCH_COUNT && isIncludedBonusNumber) {
      return this.increaseCount(sameNumberCount, CONFIG.RANK.OBJECT_KEY.BONUS(sameNumberCount));
    }
    return this.increaseCount(sameNumberCount, CONFIG.RANK.OBJECT_KEY.NORMAL(sameNumberCount));
  }
  increaseCount(sameCount, name) {
    const ONE_TICKET = 1;
    if (sameCount < CONFIG.RANK.MIN_COUNT) {
      return;
    }
    __privateGet(this, _rankResult)[name].count += ONE_TICKET;
  }
  calculateProfit() {
    return Object.keys(__privateGet(this, _rankResult)).reduce(
      (acc, key) => acc + __privateGet(this, _rankResult)[key].price * __privateGet(this, _rankResult)[key].count,
      CONFIG.INITIAL_PROFIT
    );
  }
}
_rankResult = new WeakMap();
const normalizeErrorMessage = (message) => `[ERROR] ${message}`;
function catchError(validate) {
  try {
    validate();
    return false;
  } catch (error) {
    alert(normalizeErrorMessage(error.message));
    return true;
  }
}
function toggleClassName(element, className) {
  if (element.classList.contains(className)) {
    return element.classList.remove(className);
  }
  return element.classList.add(className);
}
function createElement(type, text) {
  const element = document.createElement(type);
  element.innerText = text;
  return element;
}
const LottoFormView = {
  readMoney() {
    const userMoney = document.querySelector("#user-money").value;
    if (!catchError(() => validateMoney(userMoney))) {
      return userMoney;
    }
    return false;
  },
  readWinningNumbers() {
    const winningNumbers = [...document.querySelectorAll(".input-winning-number")].map((element) => Number(element.value));
    if (!catchError(() => validateLottoNumber(winningNumbers))) {
      return winningNumbers;
    }
    return false;
  },
  readBonusNumber(winningLotto) {
    const bonusNumber = Number(document.querySelector("#input-bonus-number").value);
    if (!catchError(() => validateBonus(bonusNumber, winningLotto))) {
      return bonusNumber;
    }
    return false;
  },
  renderWinningLotto() {
    const $lottoBottom = document.querySelector(".lotto-bottom");
    toggleClassName($lottoBottom, "hidden");
  },
  renderUserLottos(userLottos) {
    userLottos.forEach((userLotto) => {
      const $parent = document.querySelector(".lotto-item-container");
      const $element = createElement("p", `🎟️ ${userLotto.getNumbers().join(", ")}`);
      $parent.appendChild($element);
    });
  }
};
const LottoResultView = {
  toggleModal() {
    const $modal = document.querySelector(".modal");
    const $modalDimmed = document.querySelector(".modal-dimmed");
    toggleClassName($modal, "hidden");
    toggleClassName($modalDimmed, "hidden");
  },
  renderStatisticsResult(rankResult) {
    const parent = document.querySelector(".modal-item-container");
    Object.keys(rankResult).forEach((key) => {
      const row = this.createStatisticsRow(rankResult[key]);
      parent.appendChild(row);
    });
  },
  createStatisticsRow({ name, price, count }) {
    const row = createElement("tr", "");
    row.classList.add("modal-items");
    const elementName = createElement("td", name === "5+1" ? "5개+보너스불" : `${name}개`);
    const elementPrice = createElement("td", `${price.toLocaleString()}`);
    const elementCount = createElement("td", `${count}개`);
    row.appendChild(elementName);
    row.appendChild(elementPrice);
    row.appendChild(elementCount);
    return row;
  },
  renderRevenueRate(revenueRate) {
    const $boldText = document.querySelector(".bold-text");
    const $element = createElement("p", `당신의 총 수익률은 ${revenueRate}% 입니다`);
    $boldText.appendChild($element);
    $element.classList.add("modal-items");
  }
};
function changeButtonStatus(identifier) {
  const element = document.querySelector(identifier);
  element.disabled = true;
  element.classList.add("button-disabled");
}
class LottoGame {
  constructor() {
    this.userLottos = null;
    this.userMoney = null;
    this.lottoStatistics = new LottoStatistics();
  }
  handlePurchaseLottos() {
    this.userMoney = LottoFormView.readMoney();
    if (!this.userMoney) {
      return;
    }
    changeButtonStatus("#purchase-button");
    this.userLottos = createLottos(this.userMoney);
    LottoFormView.renderUserLottos(this.userLottos);
    LottoFormView.renderWinningLotto();
  }
  getRevenueRate() {
    const profit = this.lottoStatistics.calculateProfit();
    const revenueRate = calculateRevenueRate(profit, this.userMoney);
    return revenueRate;
  }
  handleCheckResults() {
    const winningNumbers = LottoFormView.readWinningNumbers();
    if (!this.userLottos || !winningNumbers) {
      return;
    }
    const bonusNumber = LottoFormView.readBonusNumber(winningNumbers);
    if (!bonusNumber) {
      return;
    }
    const winningLotto = { bonusNumber, lottoNumber: winningNumbers };
    const rankResult = this.lottoStatistics.compareLottos(this.userLottos, winningLotto);
    changeButtonStatus("#result-button");
    LottoResultView.toggleModal();
    LottoResultView.renderStatisticsResult(rankResult);
    LottoResultView.renderRevenueRate(this.getRevenueRate());
  }
  handleCloseModal() {
    document.querySelectorAll(".modal-items").forEach((element) => {
      element.remove();
    });
    this.lottoStatistics.init();
    LottoResultView.toggleModal();
  }
}
const lottoGame = new LottoGame();
document.getElementById("purchase-button").addEventListener("click", () => lottoGame.handlePurchaseLottos());
document.getElementById("result-button").addEventListener("click", () => lottoGame.handleCheckResults());
document.getElementById("reset-button").addEventListener("click", () => location.reload(true));
document.getElementById("reset-close-button").addEventListener("click", () => lottoGame.handleCloseModal());
