import Lotto from '../src/domain/model/Lotto.js';

test('숫자 6개를 가진 로또 1장을 발행한다.', () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];

  const lotto = new Lotto(lottoNumbers);

  expect(lotto.getNumbers()).toHaveLength(6);
});

test.each([
  [[1, 2, 3, 4, 5, 6]], [[40, 41, 42, 43, 44, 45]],
])('로또의 번호의 숫자 범위는 1 ~ 45이다.', (lottoNumbers) => {
  const lotto = new Lotto(lottoNumbers);

  expect(lotto.getNumbers()).toHaveLength(6);
});


test('로또 번호는 오름차순이여야 한다.', () => {
  const lottoNumbers = [5, 35, 24, 1, 2, 9];
  
  const lotto = new Lotto(lottoNumbers);

  expect(lotto.getNumbers()).toEqual([1, 2, 5, 9, 24, 35]);
});


describe('사용자가 구매한 로또 번호와 주어진 번호를 비교한 후 참/거짓 값을 반환한다.', () => {
  const machineLotto = new Lotto([1, 2, 3, 4, 5, 6]);

  test('참을 값을 반환한다.', () => {
    const number = 6;
    expect(machineLotto.hasNumber(number)).toBe(true);
  });

  test('거짓을 값을 반환한다.', () => {
    const number = 7;
    expect(machineLotto.hasNumber(number)).toBe(false);
  });


test('사용자가 구매한 로또 번호와 당첨 번호의 일치 개수를 반환한다', () => {
  const lottoNumbers = [5, 35, 24, 1, 2, 9];

  const lotto = new Lotto(lottoNumbers);

  expect(lotto.getMatchedNumberCount([1, 2, 24, 33, 34, 45])).toBe(3);
});

});
