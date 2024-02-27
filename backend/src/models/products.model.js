const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC');

  return products;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

const insertProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute(`INSERT INTO products (name)
      VALUES (?)`, [name]);
  
  return {
    id: insertId,
    name,
  };
};

const updateProduct = async (updatedName, productId) => {
  await connection.execute(`UPDATE 
    products 
  SET name = ? 
  WHERE id = ?;`, [updatedName, productId]);

  return {
    id: productId,
    name: updatedName,
  };
};

module.exports = { 
  getAllProducts,
  getById,
  insertProduct,
  updateProduct,
};