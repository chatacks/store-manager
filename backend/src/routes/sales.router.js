const salesRouter = require('express').Router();
const { salesController } = require('../controllers');

salesRouter.get('/', salesController.getAllSalesController);

salesRouter.get('/:saleId', salesController.getSaleController);

module.exports = salesRouter;
