const { productsService } = require('../services');
const { mapStatusHTTP } = require('../utils/mapStatusHttp');

const getAllProductsController = async (_req, res) => {
  try {
    const { status, data } = await productsService.getAllProductsService();
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getProductByIdController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { status, data } = await productsService.getProductByIdService(productId);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

const insertProductController = async (req, res) => {
  try {
    const name = req.body;
    const { status, data } = await productsService.insertProductService(name);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const name = req.body;
    const { status, data } = await productsService.updateProductService(name, Number(productId));
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  insertProductController,
  updateProductController,
};