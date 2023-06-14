export const formatPrice = (price) =>
  new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(price);
