const productsRouter = require('express').Router();
const { productsController } = require('../controllers');

productsRouter.get('/', productsController.getAllProductsController);

productsRouter.get('/:productId', productsController.getProductByIdController);

module.exports = productsRouter;
