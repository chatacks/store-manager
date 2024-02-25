const connection = require('./connection');

const getAllSales = async () => {
  const [allSales] = await connection.execute(
    `SELECT
    sale_id 'saleId',
    date,
    product_id 'productId',
    quantity
  FROM sales
    INNER JOIN sales_products
      ON sales.id = sales_products.sale_id
  ORDER BY sale_id ASC, product_id;`,
  );

  return allSales;
};

const getSaleById = async (saleId) => {
  const [sale] = await connection.execute(`SELECT
    date,
    product_id 'productId',
    quantity
  FROM sales
    INNER JOIN sales_products
      ON sales.id = sales_products.sale_id
  WHERE sale_id = ?;`, [saleId]);

  return sale;
};

const insertProduct = async (name) => {
  const [[{ insertId }]] = await connection.execute(`INSERT INTO products (name)
      VALUES (?)`, [name]);
  return {
    id: insertId,
    name,
  };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertProduct,
};