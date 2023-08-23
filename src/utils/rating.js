// use rating function to make a number of stars to each product
export const rating = (num) => {
  if (num >= 4 && num < 4.25) {
    return 2;
  } else if (num >= 4.25 && num < 4.5) {
    return 3;
  } else if (num >= 4.5 && num < 4.75) {
    return 4;
  } else if (num >= 4.75) {
    return 5;
  } else {
    return 2;
  }
};
