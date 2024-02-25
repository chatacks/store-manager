const allProductsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productMockById = {
  id: 1,
  name: 'Martelo de Thor',
};

const allProductsServiceMock = {
  status: 'SUCCESSFUL', data: allProductsMock,
};

const productServiceByIdMock = {
  status: 'SUCCESSFUL', data: productMockById,
};

const productServiceByIdNotFoundMock = {
  status: 'NOT_FOUND', data: { message: 'Product not found' },
};

const productInserted = {
  id: 4,
  name: 'ProdutoX',
};

module.exports = {
  allProductsMock,
  productMockById,
  allProductsServiceMock,
  productServiceByIdMock,
  productServiceByIdNotFoundMock,
  productInserted,
};