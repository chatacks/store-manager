const connection = require('./connection');

const getAllSales = async () => {
  const [allSales] = connection.execute(
    `SELECT
    sale_id,
    date,
    product_id,
    quantity
  FROM sales
    INNER JOIN sales_products
      ON sales.id = sales_products.sale_id
  ORDER BY sale_id ASC, product_id;`,
  );

  return allSales;
};

const getSaleById = async (saleId) => {
  const [[sale]] = connection.execute(`SELECT
    sale_id,
    date,
    product_id,
    quantity
  FROM sales
    INNER JOIN sales_products
      ON sales.id = sales_products.sale_id
  WHERE id = ?;`, [saleId]);
  
  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
};