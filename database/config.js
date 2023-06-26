const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'desafio',
    password: '@Niko2021',
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 60000,
  });

module.exports = pool;