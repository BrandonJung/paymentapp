export const validateServiceFields = (
  name,
  description,
  taxes,
  quantity,
  price,
  rate,
) => {
  let ret = { valid: true };
  if (!name) {
    ret.valid = false;
    ret.message = 'Invalid service name';
  } else if (quantity < 1) {
    ret.valid = false;
    ret.message = `Invalid hours ${quantity}`;
  } else if (price < 0) {
    ret.valid = false;
    ret.message = 'Invalid price';
  } else if (rate !== 'flat' && rate !== 'hourly') {
    ret.valid = false;
    ret.message = 'Invalid service rate';
  }
  return ret;
};

export const formatPriceDisplay = (price) => {
  if (isNaN(price)) return price;
  let tempPrice = price / 100;
  let retString = `$${tempPrice.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
  return retString;
};
