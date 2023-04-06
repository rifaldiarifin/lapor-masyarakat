require('dotenv').config();

const mysql = require("mysql2");

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_DIALECT,
} = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
}).promise();

module.exports = {
  pool
}