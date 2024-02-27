const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allSalesMockModel, saleByIdMockModel, saleCreatedMockModel } = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models');

describe('Testes Unitários Sales:Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recupera todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMockModel]);

    const response = await salesModel.getAllSales();

    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal(allSalesMockModel);
  });

  it('Recupera com sucesso a venda correspondente ao id correto', async function () {
    sinon.stub(connection, 'execute').resolves([saleByIdMockModel]);
    const saleId = 1;
    
    const response = await salesModel.getSaleById(saleId);

    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal(saleByIdMockModel);
  });

  it('Recupera com sucesso o id da venda cadastrada', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const response = await salesModel.insertSale();

    expect(response).to.be.an('number');
    expect(response).to.be.deep.equal(42);
  });

  it('Insere a venda com sucesso no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

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

    const response = await salesModel.sales(reqBody);

    expect(response).to.be.an('object');
    expect(response).to.be.deep.equal(saleCreatedMockModel);
  });
});