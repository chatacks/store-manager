const { productsModel } = require('../../models');

const validationProductIdField = async (array) => {
  const products = await Promise
    .all(array.map(({ productId }) => productsModel.getById(productId)));

  const hasInvalidId = products.some((product) => product === undefined);

  if (hasInvalidId) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
};

module.exports = validationProductIdField;