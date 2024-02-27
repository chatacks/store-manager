const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { allSalesServiceMock, allSalesMockModel, saleServiceByIdMock, saleByIdMockModel, salesServiceByIdNotFoundMock, insertSaleCreated, saleCreatedMockModel, insertSalesErrorRequiredProduct, insertSalesErrorRequiredQuantity, insertSalesErrorProductIdNotFound, insertSalesErrorQuantityThan0 } = require('../mocks/sales.mock');
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

  it('POST:SalesController - Cadastra uma venda com sucesso', async function () {
    sinon.stub(salesService, 'insertSaleService').resolves(insertSaleCreated);

    const req = {
      body: [
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

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSaleController(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleCreatedMockModel);
  });

  it('POST:SalesController - Retorna um erro ao tentar cadastrar uma venda sem o campo "productId"', async function () {
    sinon.stub(salesService, 'insertSaleService').resolves(insertSalesErrorRequiredProduct);

    const req = {
      body: [
        {
          quantity: 1,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSaleController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('POST:SalesController - Retorna um erro ao tentar cadastrar uma venda sem o campo "quantity"', async function () {
    sinon.stub(salesService, 'insertSaleService').resolves(insertSalesErrorRequiredQuantity);

    const req = {
      body: [
        {
          productId: 1,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSaleController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('POST:SalesController - Retorna um erro ao tentar cadastrar uma venda com um id inexistente', async function () {
    sinon.stub(salesService, 'insertSaleService').resolves(insertSalesErrorProductIdNotFound);

    const req = {
      body: [
        {
          productId: 99,
          quantity: 1,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSaleController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('POST:SalesController - Retorna um erro ao tentar cadastrar uma venda com o campo "quantity" igual a 0', async function () {
    sinon.stub(salesService, 'insertSaleService').resolves(insertSalesErrorQuantityThan0);

    const req = {
      body: [
        {
          productId: 1,
          quantity: 0,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSaleController(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  afterEach(function () {
    sinon.restore();
  });
});