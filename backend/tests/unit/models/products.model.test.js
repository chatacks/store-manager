const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProductsMock, productMockById } = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');

describe('Testes Unitários Products:Model', function () {
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
  
  it('Cadastra com SUCCESSFUL um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
  
    const nameProduct = {
      name: 'ProdutoX', 
    };

    const finalProduct = {
      id: 4,
      name: 'ProdutoX',
    };

    const responseInsertProduct = await productsModel.insertProduct(nameProduct);

    expect(responseInsertProduct).to.be.an('object');
    expect(responseInsertProduct).to.be.deep.equal(finalProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});
