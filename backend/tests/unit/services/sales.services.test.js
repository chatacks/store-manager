const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesMockModel, saleByIdMockModel } = require('../mocks/sales.mock');
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

  afterEach(function () {
    sinon.restore();
  });
});