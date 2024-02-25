const { salesModel } = require('../models');

const getAllSalesService = async () => {
  const allSales = await salesModel.getAllSales();
  return { status: 'SUCCESSFUL', data: allSales };
};

const getSaleByIdService = async (saleId) => {
  const sale = await salesModel.getSaleById(saleId);

  if (!sale.length) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
};