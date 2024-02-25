const { productsModel } = require('../models');
const validationNameProductValue = require('./validations/validationNameProductValue');

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

const insertProductService = async (nameProduct) => { 
  const productToBeInserted = await productsModel.insertProduct(nameProduct);

  const error = validationNameProductValue(nameProduct);
  if (error) return { status: error.status, data: { message: error.message } };

  if (!productToBeInserted) {
    return { status: 'INVALID_VALUE', data: { message: 'Need a product to be registered' } };
  }

  return { status: 'CREATED', data: productToBeInserted };
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
  insertProductService,
};