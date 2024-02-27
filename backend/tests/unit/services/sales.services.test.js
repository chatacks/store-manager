const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesMockModel, saleByIdMockModel, saleCreatedMockModel, insertSalesErrorRequiredProduct, insertSalesErrorRequiredQuantity, insertSalesErrorQuantityThan0, insertSalesErrorProductIdNotFound } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');

describe('Testes unitários Sales:Services', function () {
  it('Recupera com SUCCESSFUL todas as vendas pela camada Service', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSalesMockModel);

    const response = await salesService.getAllSalesService();

    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.an('array');
    expect(response.data).to.be.deep.equal(allSalesMockModel);
  });

  it('Recupera com SUCCESFUL a venda correspondente ao id recebido', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(saleByIdMockModel);
    const saleId = 1;

    const response = await salesService.getSaleByIdService(saleId);

    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.an('array');
    expect(response.data).to.be.deep.equal(saleByIdMockModel);
  });

  it('Ao receber um id inválido retorna um error', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const saleIdError = 999;

    const response = await salesService.getSaleByIdService(saleIdError);

    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data.message).to.be.equal('Sale not found');
  });

  it('Ao receber os produtos válidos cadastra uma venda com sucesso', async function () {
    sinon.stub(salesModel, 'sales').resolves(saleCreatedMockModel);

    const reqBody = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 1,
      },
    ];

    const response = await salesService.insertSaleService(reqBody);

    expect(response.status).to.be.equal('CREATED');
    expect(response.data).to.be.an('object');
    expect(response.data).to.be.deep.equal(saleCreatedMockModel);
  });

  it('Ao receber uma venda sem "productId" retorna um error', async function () {
    sinon.stub(salesModel, 'sales').resolves(insertSalesErrorRequiredProduct);

    const reqBody = [
      {
        quantity: 1,
      },
    ];

    const response = await salesService.insertSaleService(reqBody);

    expect(response.status).to.be.equal('BAD_REQUEST');
    expect(response.data).to.be.an('object');
    expect(response.data.message).to.be.deep.equal('"productId" is required');
  });

  it('Ao receber uma venda sem "quantity" retorna um error', async function () {
    sinon.stub(salesModel, 'sales').resolves(insertSalesErrorRequiredQuantity);

    const reqBody = [
      {
        productId: 1,
      },
    ];

    const response = await salesService.insertSaleService(reqBody);

    expect(response.status).to.be.equal('BAD_REQUEST');
    expect(response.data).to.be.an('object');
    expect(response.data.message).to.be.deep.equal('"quantity" is required');
  });

  it('Ao receber uma venda com "quantity" no valor "0" retorna um error', async function () {
    sinon.stub(salesModel, 'sales').resolves(insertSalesErrorQuantityThan0);

    const reqBody = [
      {
        productId: 1,
        quantity: 0,
      },
    ];

    const response = await salesService.insertSaleService(reqBody);

    expect(response.status).to.be.equal('INVALID_VALUE');
    expect(response.data).to.be.an('object');
    expect(response.data.message).to.be.deep.equal('"quantity" must be greater than or equal to 1');
  });

  it('Ao receber uma venda com "productId" no valor inexistente retorna um error', async function () {
    sinon.stub(salesModel, 'sales').resolves(insertSalesErrorProductIdNotFound);

    const reqBody = [
      {
        productId: 99,
        quantity: 1,
      },
    ];

    const response = await salesService.insertSaleService(reqBody);

    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.an('object');
    expect(response.data.message).to.be.deep.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});