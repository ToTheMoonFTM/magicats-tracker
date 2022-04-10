export const priceHandler = (price: string) =>
  new Intl.NumberFormat().format(Math.round(parseInt(price) / 1e16) / 1e2);
