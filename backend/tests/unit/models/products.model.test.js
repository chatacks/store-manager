const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProductsMock, productMockById } = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');

describe('Testes - PRODUCTS MODEL', function () {
  it('Recupera todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);

    const responseAllProducts = await productsModel.getAllProducts();

    expect(responseAllProducts).to.be.an('array');
    expect(responseAllProducts).to.be.deep.equal(allProductsMock);
  });

  it('Recupera com sucesso o produto correspondente ao id correto', async function () {
    sinon.stub(connection, 'execute').resolves([[productMockById]]);
    const productId = 1;

    const responseProductById = await productsModel.getById(productId);

    expect(responseProductById).to.be.an('object');
    expect(responseProductById).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });

  it('Ao receber um id inválido retorna um erro', async function () {
    sinon.stub(connection, 'execute').resolves([[{
      message: 'Product not found',
    }]]);

    const productId = 999;

    const responseProductById = await productsModel.getById(productId);

    expect(responseProductById).to.be.an('object');
    expect(responseProductById).to.be.deep.equal({
      message: 'Product not found',
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});