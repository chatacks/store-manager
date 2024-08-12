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

const insertSale = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales(date) VALUES(CURRENT_TIMESTAMP())');

  return insertId;
};

const sales = async (products) => {
  const insertId = await insertSale();

  products.forEach(({ productId, quantity }) =>
    connection.execute(
      'INSERT INTO sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    )); 

  return {
    id: insertId,
    itemsSold: products,
  };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  sales,
};