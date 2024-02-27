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
  const error = validationNameProductValue(nameProduct);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const productToBeInserted = await productsModel.insertProduct(nameProduct);

  return { status: 'CREATED', data: productToBeInserted };
};

const updateProductService = async (nameProduct, productId) => {
  const error = validationNameProductValue(nameProduct);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const errorProductField = await productsModel.getById(productId);

  if (!errorProductField) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const productToBeUpdated = await productsModel
    .updateProduct(nameProduct.name, productId);
  
  return { status: 'SUCCESSFUL', data: productToBeUpdated };
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
  insertProductService,
  updateProductService,
};