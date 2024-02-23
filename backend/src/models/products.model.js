const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC');

  return products;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

module.exports = { 
  getAllProducts,
  getById,
};