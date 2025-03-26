export const formatPriceDisplay = (price) => {
  if (isNaN(price)) return price;
  let tempPrice = price / 100;
  let retString = `$${tempPrice.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
  return retString;
};
