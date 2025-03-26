export const items = [
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Features',
    icon: 'pi pi-star',
  },
  {
    label: 'Our Partners',
    icon: 'pi pi-search',
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
  },
];

export const dashboardItems = [
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
  },
];

export const dummyUsers = [
  {
    name: 'Test Name',
    firstName: 'Test',
    lastName: 'Name',
    email: 'test@example.com',
    phoneNumber: '1111111111',
  },

  {
    name: 'Test Name2',
    firstName: 'Test',
    lastName: 'Name2',
    email: 'test2@example.com',
    phoneNumber: '2222222222',
  },

  {
    name: 'Test Name3',
    firstName: 'Test',
    lastName: 'Name3',
    email: 'test3@example.com',
    phoneNumber: '3333333333',
  },

  {
    name: 'Test Name4',
    firstName: 'Test',
    lastName: 'Name4',
    email: 'test4@example.com',
    phoneNumber: '4444444444',
  },
];

export const dummyAddresses = [
  {
    address: {
      street: '1111 Random Street',
      unitNumber: 4,
      city: 'Burnaby',
      province: 'BC',
      postalCode: 'A1A 2B2',
      country: 'Canada',
    },
    search: '1111 Random Street, Burnaby, BC, Canada',
  },
  {
    address: {
      street: '2222 Random Street',
      unitNumber: '',
      city: 'Burnaby',
      province: 'BC',
      postalCode: 'A2A 2B2',
      country: 'Canada',
    },
    search: '2222 Random Street, Burnaby, BC, Canada',
  },
  {
    address: {
      street: '3333 Random Street',
      unitNumber: 4,
      city: 'Burnaby',
      province: 'BC',
      postalCode: 'A3A 2B2',
      country: 'Canada',
    },
    search: '3333 Random Street, Burnaby, BC, Canada',
  },
];

export const dummyServicesList = [
  {
    name: 'Local Moving',
    displayName: 'Local Moving - $340',
    description: 'Moving from your old place to your new place!',
    taxes: [
      {
        name: 'GST',
        code: 'gst',
        amount: 0.05,
      },
    ],
    quantity: 1,
    price: 34000,
    // Add Date object
  },
  {
    name: 'Packing',
    displayName: 'Packing - $240',
    description: 'With a big enough box, anything can be packed',
    taxes: [
      {
        name: 'GST',
        code: 'gst',
        amount: 0.05,
      },
    ],
    quantity: 1,
    price: 24000,
    // Add Date object
  },
];

export const dummyTaxes = [
  {
    name: 'GST',
    code: 'gst',
    amount: 0.05,
  },
  {
    name: 'PST',
    code: 'pst',
    amount: 0.07,
  },
  {
    name: 'Alcohol',
    code: 'alc',
    amount: 0.1,
  },
];
