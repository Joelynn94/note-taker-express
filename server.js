// Dependencies
// ===================================================
const express = require('express');
const mysql = require('mysql2');
// Import the connection object
const sequelize = require('./config/connection');
// import routes
const routes = require('./routes');

// Sets up the Express App
// ===================================================
const app = express();
const PORT = process.env.PORT || 8080;

app
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))
  .use(express.json())
  .use('/', routes);

// Sets up mysql connection
// ===================================================
let connection = '';

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: process.env.JAWSDB_HOST,
    user: process.env.JAWSDB_USERNAME,
    password: process.env.JAWSDB_PASSWORD,
    database: process.env.JAWSDB_DATABASE,
  });
}

connection.connect();

// Testing sequelize connection
// ===================================================
async function testSequelize() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testSequelize();

// Starts the server to begin listening on the port
// ===================================================

// Connect to the database before starting the Express.js server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
