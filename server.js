// Dependencies
// ===================================================
const express = require('express');
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
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

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
