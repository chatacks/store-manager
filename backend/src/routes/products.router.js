const productsRouter = require('express').Router();
const { productsController } = require('../controllers');

productsRouter.get('/', productsController.getAllProductsController);

productsRouter.put('/:productId', productsController.updateProductController);

productsRouter.get('/:productId', productsController.getProductByIdController);

productsRouter.post('/', productsController.insertProductController);

module.exports = productsRouter;
