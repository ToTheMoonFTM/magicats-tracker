export const performanceCalculator = (score: number, price: string): string =>
  (Math.round((score * 1e21) / parseInt(price)) / 1e3).toFixed(3);
