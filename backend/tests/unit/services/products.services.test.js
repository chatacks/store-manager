const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsMock, productMockById, productInserted } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('Testes Unitários - Products:Service', function () {
  it('Recupera com SUCCESSFUL os produtos pela camada Service', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(allProductsMock);

    const response = await productsService.getAllProductsService();

    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.an('array');
    expect(response.data).to.be.deep.equal(allProductsMock);
  });

  it('Recupera com SUCCESSFUL o produto correspondente ao id recebido', async function () {
    sinon.stub(productsModel, 'getById').resolves(productMockById);
    const productId = 1;

    const response = await productsService.getProductByIdService(productId);

    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.an('object');
    expect(response.data).to.be.deep.equal({
      id: 1,
      name: 'Martelo de Thor',
    });
  });

  it('Ao receber um id inválido retorna um error', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
    const productIdError = 999;

    const response = await productsService.getProductByIdService(productIdError);

    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.an('object');
    expect(response.data.message).to.be.equal('Product not found');
  });

  it('Cadastra produto com CREATED', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(productInserted);
    const product = {
      name: 'ProdutoX',
    };

    const response = await productsService.insertProductService(product);

    expect(response.status).to.be.equal('CREATED');
    expect(response.data).to.be.an('object');
    expect(response.data).to.be.deep.equal(productInserted);
  });

  it('Recebe a mensagem { "message": "name" is required" } ao não informar o campo name', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves({});

    const response = await productsService.insertProductService({});

    expect(response.status).to.be.equal('BAD_REQUEST');
    expect(response.data).to.be.an('object');
    expect(response.data.message).to.be.equal('"name" is required');
  });

  it('Recebe a mensagem { "message": "name" length must be at least 5 characters long } ao não informar o campo name', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves({ id: 4, name: 'Prod' });

    const response = await productsService.insertProductService({ id: 4, name: 'Prod' });

    expect(response.status).to.be.equal('INVALID_VALUE');
    expect(response.data).to.be.an('object');
    expect(response.data.message).to.be.equal('"name" length must be at least 5 characters long');
  });

  afterEach(function () {
    sinon.restore();
  });
});
