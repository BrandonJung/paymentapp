export const COLOURS = {
  primary: '#282935',
  secondary: '#333543',
  tertiary: '#AE9EEE',
};

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

export const containerMaxHeight = 'calc(100vh - 16px)';

export const API_SERVICES = {
  user: 'http://localhost:3001/api/user/',
  customer: 'http://localhost:3001/api/customer/',
  service: 'http://localhost:3001/api/service/',
  job: 'http://localhost:3001/api/job/',
  report: 'http://localhost:3001/api/report/',
  location: 'http://localhost:3001/api/location/',
  organization: 'http://localhost:3001/api/organization/',
};

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
