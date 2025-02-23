import createLottos from "../src/domain/model/createLottos";

test('구입 금액만큼 로또를 발행한다.', () => {
  const money = 8000;

  expect(createLottos(money)).toHaveLength(8);
});
