const Sequelize = require('sequelize');
// Enable access to .env variables
require('dotenv').config();

// Create a connection object
const sequelize = new Sequelize(
  // Database name
  process.env.DB_NAME,
  // User
  process.env.DB_USER,
  // Password
  process.env.DB_PASSWORD,
  {
    // Database location
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
