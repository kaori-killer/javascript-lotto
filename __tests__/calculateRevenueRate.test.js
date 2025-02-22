import calculateRevenueRate from "../src/domain/model/calculateRevenueRate";

test('사용자가 구매한 로또 번호화 당첨 번호를 비교하여 수익률을 구한다.', () => {
    const profit = 5000;
    const investmentCost = 8000;
    expect(calculateRevenueRate(profit, investmentCost)).toBe(62.5);
  });
  
  test.each([
    [5000,13000, 38.5],
    [5000,14000, 35.7],
    [5000,16000, 31.3],
  ])('소숫점 둘째짜리에서 반올림한다.', (profit, investmentCost, result) => {
    expect(calculateRevenueRate(profit, investmentCost)).toBe(result);
  })