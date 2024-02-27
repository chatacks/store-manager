const allSalesMockModel = [
  {
    saleId: 1,
    date: '2024-02-24T22:20:22.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-02-24T22:20:22.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-02-24T22:20:22.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleByIdMockModel = [
  {
    date: '2024-02-25T16:57:12.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2024-02-25T16:57:12.000Z',
    productId: 2,
    quantity: 10,
  },
];

const saleCreatedMockModel = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 1,
    },
  ],
};

const allSalesServiceMock = {
  status: 'SUCCESSFUL', data: allSalesMockModel,
};

const saleServiceByIdMock = {
  status: 'SUCCESSFUL', data: saleByIdMockModel,
};

const salesServiceByIdNotFoundMock = {
  status: 'NOT_FOUND', data: { message: 'Sale not found' },
};

const insertSalesErrorRequiredProduct = {
  status: 'BAD_REQUEST', data: { message: '"productId" is required' },
};

const insertSalesErrorRequiredQuantity = {
  status: 'BAD_REQUEST', data: { message: '"quantity" is required' },
};

const insertSalesErrorQuantityThan0 = {
  status: 'INVALID_VALUE', data: { message: '"quantity" must be greater than or equal to 1' },
};

const insertSalesErrorProductIdNotFound = {
  status: 'NOT_FOUND', data: { message: 'Product not found' },
};

const insertSaleCreated = {
  status: 'CREATED', data: saleCreatedMockModel,
};

module.exports = {
  allSalesMockModel,
  saleByIdMockModel,
  allSalesServiceMock,
  saleServiceByIdMock,
  salesServiceByIdNotFoundMock,
  saleCreatedMockModel,
  insertSaleCreated,
  insertSalesErrorRequiredProduct,
  insertSalesErrorRequiredQuantity,
  insertSalesErrorQuantityThan0,
  insertSalesErrorProductIdNotFound,
};