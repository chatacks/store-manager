const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { allSalesServiceMock, allSalesMockModel, saleServiceByIdMock, saleByIdMockModel, salesServiceByIdNotFoundMock } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Testes Unitários - Sales:Controller', function () {
  it('GET:SalesController - Recupera com sucesso as vendas', async function () {
    sinon.stub(salesService, 'getAllSalesService').resolves(allSalesServiceMock);

    const req = null;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSalesController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesMockModel);
  });

  it('GET:SalesController - Recupera com sucesso a venda correspondente ao id recebido', async function () {
    sinon.stub(salesService, 'getSaleByIdService').resolves(saleServiceByIdMock);

    const req = {
      params: { saleId: 1 },
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleByIdMockModel);
  });

  it('GET:SalesController:/id - Error ao passar um id inválido', async function () {
    sinon.stub(salesService, 'getSaleByIdService').resolves(salesServiceByIdNotFoundMock);

    const req = {
      params: { saleId: 999 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});