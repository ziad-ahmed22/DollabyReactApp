export const priceDiscount = (price, discount) => {
  return price - price * (discount / 100);
};
