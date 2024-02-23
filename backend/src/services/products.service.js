const { productsModel } = require('../models');

const getAllProductsService = async () => {
  const products = await productsModel.getAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const getProductByIdService = async (productId) => {
  const product = await productsModel.getById(productId);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
};