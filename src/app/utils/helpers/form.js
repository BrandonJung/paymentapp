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

const validateEmail = (email) => {
  // TODO: Add in validator
  return true;
};

const validatePhone = (phone) => {
  // TODO: Add in validator;
  return true;
};

export const validateUserFields = (user) => {
  let ret = { valid: true };

  if (!user.firstName) {
    ret.valid = false;
    ret.message = 'Invalid first name';
    return ret;
  } else if (!user.lastName) {
    ret.valid = false;
    ret.message = 'Invalid last name';
    return ret;
  }

  const emailValid = validateEmail(user.email);
  if (!emailValid) {
    ret.valid = false;
    ret.message = 'Invalid email';
    return ret;
  }
  const phoneValid = validatePhone(user.phoneNumber);
  if (!phoneValid) {
    ret.valid = false;
    ret.message = 'Invalid phone number';
    return ret;
  }
  return ret;
};

export const validateLocationFields = (location) => {
  let ret = { valid: true };
  if (!location.street) {
    ret.valid = false;
    ret.message = 'Invalid street';
    return ret;
  } else if (!location.city) {
    ret.valid = false;
    ret.message = 'Invalid city';
    return ret;
  } else if (!location.province) {
    ret.valid = false;
    ret.message = 'Invalid province';
    return ret;
  } else if (!location.postalCode) {
    ret.valid = false;
    ret.message = 'Invalid postal code';
    return ret;
  } else if (!location.country) {
    ret.valid = false;
    ret.message = 'Invalid country';
    return ret;
  }
  return ret;
};

export const validateServices = (servicesList) => {};
