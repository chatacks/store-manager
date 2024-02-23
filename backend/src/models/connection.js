const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  database: 'StoreManager',
});

module.exports = connection;