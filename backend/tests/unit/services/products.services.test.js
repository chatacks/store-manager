const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsMock, productMockById } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('Testes Unitários - Camada SERVICE', function () {
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
      expect(response.data).to.be.deep.equal({
        message: 'Product not found',
      });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});