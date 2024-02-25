const appRouter = require('express').Router();
const productsRouter = require('./products.router');
const salesRouter = require('./sales.router');

appRouter.use('/products', productsRouter);
appRouter.use('/sales', salesRouter);

module.exports = appRouter;