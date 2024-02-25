const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProductsMock, allProductsServiceMock, productServiceByIdMock, productMockById, productServiceByIdNotFoundMock, createdProductServiceByMock, errorProductServiceByMock, errorProductServiceWithoutNameMock } = require('../mocks/products.mock');

chai.use(sinonChai);

describe('Testes Unitários - Products:Controller', function () {
  it('GET:Controller - Recupera com sucesso os produtos', async function () {
    sinon.stub(productsService, 'getAllProductsService').resolves(allProductsServiceMock);

    const req = null;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProductsController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsMock);
  });

  it('GET:Controller/:id  - Recupera com sucesso o produto correspondente ao id recebido', async function () {
    sinon.stub(productsService, 'getProductByIdService').resolves(productServiceByIdMock);

    const req = {
      params: { productId: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductByIdController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMockById);
  });

  it('GET:Controller/:id  - Error ao passar um id inválido', async function () {
    sinon.stub(productsService, 'getProductByIdService').resolves(productServiceByIdNotFoundMock);

    const req = {
      params: { productId: 999 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductByIdController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('POST:Controller - Cadastra com sucesso um produto', async function () {
    sinon.stub(productsService, 'insertProductService').resolves(createdProductServiceByMock);

    const req = {
      body: {
        name: 'ProdutoX',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insertProductController(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'ProdutoX' });
  });

  it('POST:Controller - Erro ao tentar cadastrar um produto com menos de 5 caracteres', async function () {
    sinon.stub(productsService, 'insertProductService').resolves(errorProductServiceByMock);

    const req = {
      body: {
        name: 'Prod',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insertProductController(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('POST:Controller - Erro ao tentar cadastrar um produto sem "name"', async function () {
    sinon.stub(productsService, 'insertProductService').resolves(errorProductServiceWithoutNameMock);

    const req = {
      body: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insertProductController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
