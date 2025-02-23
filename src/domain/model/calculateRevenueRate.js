export default function calculateRevenueRate(profit, investmentCost) {
  return Number(((profit / investmentCost) * 100).toFixed(1));
}
