const appRouter = require('express').Router();
const productsRouter = require('./products.router');

appRouter.use('/products', productsRouter);

module.exports = appRouter;