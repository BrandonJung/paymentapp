export const API_SERVICES = {
  user: 'http://localhost:3001/api/user/',
  customer: 'http://localhost:3001/api/customer/',
  service: 'http://localhost:3001/api/service/',
  job: 'http://localhost:3001/api/job/',
  report: 'http://localhost:3001/api/report/',
  location: 'http://localhost:3001/api/location/',
  organization: 'http://localhost:3001/api/organization/',
  email: 'http://localhost:3001/api/email/',
  payment: 'http://localhost:3001/api/payment/',
};
export const COLOURS = {
  primary: '#282935',
  secondary: '#333543',
  tertiary: '#AE9EEE',
};

export const paymentOptions = [
  {
    label: 'Credit Card',
    value: 'cc',
  },
  {
    label: 'Cash',
    value: 'cash',
  },
];

export const dateRangeOptions = [
  {
    label: 'Single-Day',
    value: 'single',
  },
  {
    label: 'Multi-Day',
    value: 'multi',
  },
];

export const taxAndFeeTypes = [
  {
    label: 'Tax',
    value: 'percent',
  },
  {
    label: 'Fee',
    value: 'flat',
  },
];

export const containerMaxHeight = 'calc(100vh - 16px)';

export const defaultCustomerObj = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  username: '',
  _id: null,
};

export const defaultLocationObj = {
  city: '',
  country: 'Canada',
  postalCode: '',
  province: '',
  street: '',
  unitNumber: '',
  _id: null,
};

export const defaultServiceObj = {
  name: '',
  description: '',
  taxesAndFees: [],
  quantity: 1,
  price: null,
  rate: 'flat',
};

export const defaultDateObj = {
  type: 'single',
  startDate: '',
  endDate: '',
};

export const defaultOrgObj = {
  name: '',
  tag: '',
  taxesAndFees: [],
  email: '',
  phoneNumber: '',
};

export const defaultTaxAndFeeObj = {
  name: '',
  amount: null,
  type: taxAndFeeTypes[0].value,
};

export const defaultPaymentInformation = {
  method: 'cc',
  creditCard: {
    _id: '',
    firstName: '',
    lastName: '',
    number: '',
    expiryDate: '',
    cvc: '',
  },
};

export const defaultBillingInformation = {
  billing: {
    _id: '',
    firstName: '',
    lastName: '',
  },
};
