const { salesModel } = require('../models');
const validationProductIdField = require('./validations/validationProductIdField');
const validationSaleFields = require('./validations/validationSaleFields');

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

const insertSaleService = async (sale) => {
  const error = validationSaleFields(sale);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const errorIdField = await validationProductIdField(sale);
  
  if (errorIdField) {
    return { status: errorIdField.status, 
      data: { message: errorIdField.data.message } }; 
  }
  
  const insertSale = await salesModel.sales(sale);

  return { status: 'CREATED', data: insertSale };
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
  insertSaleService,
};