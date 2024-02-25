const productsRouter = require('express').Router();
const { productsController } = require('../controllers');

productsRouter.get('/', productsController.getAllProductsController);

productsRouter.get('/:productId', productsController.getProductByIdController);

productsRouter.post('/', productsController.insertProductController);

module.exports = productsRouter;
