import Lotto from './Lotto';

class Machine {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  createLottos(money) {
    const lottoPrice = 1000;
    const quantity = money / lottoPrice;
    this.#lottos = Array.from({ length: quantity }).map(() => this.createLotto());
  }

  createLotto() {
    return new Lotto([1, 2, 3, 4, 5, 6]);
  }

  getLottos() {
    return this.#lottos;
  }
}

export default Machine;
