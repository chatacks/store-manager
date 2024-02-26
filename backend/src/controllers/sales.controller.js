const { salesService } = require('../services');
const { mapStatusHTTP } = require('../utils/mapStatusHttp');

const getAllSalesController = async (_req, res) => {
  try {
    const { status, data } = await salesService.getAllSalesService();
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getSaleController = async (req, res) => {
  try {
    const { saleId } = req.params;
    const { status, data } = await salesService.getSaleByIdService(saleId);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

const insertSaleController = async (req, res) => {
  try {
    const { status, data } = await salesService.insertSaleService(req.body);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAllSalesController,
  getSaleController,
  insertSaleController,
};