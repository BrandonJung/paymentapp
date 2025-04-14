export const convertPriceToDisplay = (price) => {
  if (isNaN(price) || price === null) return price;
  let retPrice = price / 100;
  return retPrice;
};
