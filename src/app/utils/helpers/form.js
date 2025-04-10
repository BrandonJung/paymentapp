import { dateRangeOptions } from '../constants';

export const validateServiceFields = (
  name,
  description,
  taxes,
  quantity,
  price,
  rate,
) => {
  if (!name) {
    return newValidityObject(false, 'Invalid service name');
  } else if (quantity < 1) {
    return newValidityObject(false, `Invalid hours ${quantity}`);
  } else if (price < 0) {
    return newValidityObject(false, 'Invalid price');
  } else if (rate !== 'flat' && rate !== 'hourly') {
    return newValidityObject(false, 'Invalid service rate');
  }
  return newValidityObject(true);
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

const validatePhone = (phone) => {
  // Example regex for US phone numbers
  const phoneRegex = /^(?:\+1\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  if (!phoneRegex.test(phone)) {
    return false;
  }
  return true;
};

export const validateUserFields = (user) => {
  if (!user.firstName) {
    return newValidityObject(false, 'Invalid first name');
  } else if (!user.lastName) {
    return newValidityObject(false, 'Invalid last name');
  }

  const emailValid = validateEmail(user.email);
  if (!emailValid) {
    return newValidityObject(false, 'Invalid email');
  }
  const phoneValid = validatePhone(user.phoneNumber);
  if (!phoneValid) {
    return newValidityObject(false, 'Invalid phone number');
  }
  return newValidityObject(true);
};

export const validateLocationFields = (location) => {
  if (!location.street) {
    return newValidityObject(false, 'Invalid street');
  } else if (!location.city) {
    return newValidityObject(false, 'Invalid city');
  } else if (!location.province) {
    return newValidityObject(false, 'Invalid province');
  } else if (!location.postalCode) {
    return newValidityObject(false, 'postal code');
  } else if (!location.country) {
    return newValidityObject(false, 'Invalid country');
  }
  return newValidityObject(true);
};

export const validateServices = (servicesList) => {
  const tempServicesList = servicesList;
  if (tempServicesList.length < 1) {
    return false;
  }
  return true;
};

export const validateDate = (mode, start, end) => {
  if (mode === dateRangeOptions.value[0]) {
    // single
    if (!DateIsValid(start)) {
      return newValidityObject(false, 'Invalid start date');
    }
    return newValidityObject(true);
  } else if (mode === dateRangeOptions.value[1]) {
    // multi
    if (!DateIsValid(start)) {
      return newValidityObject(false, 'Invalid start date');
    } else if (!DateIsValid(end)) {
      return newValidityObject(false, 'Invalid end date');
    }
    return newValidityObject(true);
  } else {
    return newValidityObject(false, 'Invalid date type');
  }
};

const DateIsValid = (date) => {
  if (!date) {
    return false;
  } else if (isNaN(Date.parse(date))) {
    return false;
  } else {
    return true;
  }
};

const newValidityObject = (valid = true, message = '') => {
  const ret = { valid, message };
  return ret;
};
