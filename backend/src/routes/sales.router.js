const salesRouter = require('express').Router();
const { salesController } = require('../controllers');

salesRouter.get('/', salesController.getAllSalesController);

salesRouter.get('/:saleId', salesController.getSaleController);

salesRouter.post('/', salesController.insertSaleController);

module.exports = salesRouter;
