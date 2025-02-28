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
    PRICE: 1e3,
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
    EMPTY_VALUE: "로또 구입 금액은 0원 이하일 수 없다.",
    REST_VALUE: "로또 구입 금액은 1,000원으로 나눠떨어져야 한다."
  }),
  LOTTO: Object.freeze({
    NUMBER: Object.freeze({
      QUANTITY: "로또 번호는 6자리여야 한다.",
      RANGE: "로또 번호의 숫자 범위 1 ~ 45이다.",
      DUPLICATION: "로또 번호의 숫자는 중복될 수 없다."
    }),
    BONUS: Object.freeze({
      RANGE: "보너스 번호의 숫자 범위 1 ~ 45이다.",
      DUPLICATION: "보너스 번호는 당첨 로또에 있는 숫자와 중복되면 안된다."
    })
  }),
  RESTART: Object.freeze({
    YES_OR_NO: "y 혹은 n 중에 하나를 입력해주세요."
  })
});
function validateMoney(money) {
  const ZERO = 0;
  if (money <= CONFIG.INITIAL_MONEY) {
    throw new Error(ERROR_MESSAGES.MONEY.EMPTY_VALUE);
  }
  if (money % CONFIG.LOTTO.PRICE !== ZERO) {
    throw new Error(ERROR_MESSAGES.MONEY.REST_VALUE);
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
function pickNumberInList({ min, max, length }) {
  const randomNumbers = /* @__PURE__ */ new Set();
  while (randomNumbers.size < length) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.add(randomNumber);
  }
  return [...randomNumbers];
}
function getLottoQuantity(money) {
  return money / CONFIG.LOTTO.PRICE;
}
function createLotto() {
  const randomNumbers = pickNumberInList({
    min: CONFIG.LOTTO.NUMBER.MIN,
    max: CONFIG.LOTTO.NUMBER.MAX,
    length: CONFIG.LOTTO.LENGTH
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
  compareLottos(userLottos2, winningLotto) {
    userLottos2.forEach((userLotto) => {
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
let userMoney;
let userLottos = [];
const lottoStatistics = new LottoStatistics();
function toggleClassName(element, className) {
  if (element.classList.contains(className)) {
    return element.classList.remove(className);
  }
  return element.classList.add(className);
}
function toggleModal() {
  const $modal = document.querySelector(".modal");
  const $modalDimmed = document.querySelector(".modal-dimmed");
  toggleClassName($modal, "modal-close");
  toggleClassName($modalDimmed, "modal-close");
}
function createElement(type, text) {
  const element = document.createElement(type);
  element.innerText = text;
  return element;
}
function printUserLottos() {
  userLottos.forEach((userLotto) => {
    const parent = document.querySelector(".lotto-item-container");
    const element = createElement("p", `🎟️ ${userLotto.getNumbers().join(", ")}`);
    parent.appendChild(element);
  });
}
document.getElementById("purchase-button").addEventListener("click", () => {
  userMoney = document.querySelector("#user-money").value;
  try {
    validateMoney(userMoney);
    userLottos = createLottos(userMoney);
    printUserLottos();
  } catch (error) {
    alert(normalizeErrorMessage(error.message));
  }
});
function printRevenueRate(revenueRate) {
  const $boldText = document.querySelector(".bold-text");
  const element = createElement("p", `당신의 총 수익률은 ${revenueRate}% 입니다`);
  $boldText.appendChild(element);
  element.classList.add("modal-items");
}
function printStatisticsResult(rankResult) {
  toggleModal();
  Object.keys(rankResult).forEach((key) => {
    const { name, price, count } = rankResult[key];
    const parent = document.querySelector(".modal-item-container");
    const child = createElement("tr", "");
    child.classList.add("modal-items");
    parent.appendChild(child);
    let elementName = createElement("td", `${name}개`);
    if (name === "5+1") {
      elementName = createElement("td", "5개+보너스볼");
    }
    child.appendChild(elementName);
    const elementPrice = createElement("td", `${price.toLocaleString()}원`);
    child.appendChild(elementPrice);
    const elementCount = createElement("td", `${count}개`);
    child.appendChild(elementCount);
  });
  const profit = lottoStatistics.calculateProfit();
  const revenueRate = calculateRevenueRate(profit, userMoney);
  printRevenueRate(revenueRate);
}
document.getElementById("result-button").addEventListener("click", () => {
  const bonusNumber = Number(document.querySelector("#input-bonus-number").value);
  const winningNumbers = [...document.querySelectorAll(".input-winning-number")].map((element) => Number(element.value));
  const winningLotto = { bonusNumber, lottoNumber: winningNumbers };
  try {
    validateLottoNumber(winningNumbers);
    validateBonus(bonusNumber, winningNumbers);
    const rankResult = lottoStatistics.compareLottos(userLottos, winningLotto);
    printStatisticsResult(rankResult);
  } catch (error) {
    alert(normalizeErrorMessage(error.message));
  }
});
document.getElementById("reset-button").addEventListener("click", () => {
  location.reload(true);
});
document.getElementById("reset-close-button").addEventListener("click", () => {
  document.querySelectorAll(".modal-items").forEach((element) => {
    element.remove();
  });
  lottoStatistics.init();
  toggleModal();
});
