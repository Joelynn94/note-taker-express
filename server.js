// Dependencies
// ===================================================
const express = require('express');
const fs = require('fs');
const path = require('path');
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
// let connection = '';

// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     host: process.env.JAWSDB_HOST,
//     user: process.env.JAWSDB_USERNAME,
//     password: process.env.JAWSDB_PASSWORD,
//     database: process.env.JAWSDB_DATABASE,
//   });
// }

// connection.connect();

// GET HTML Routes
// ===================================================

// Displays the index page
app.get('/', (_, response) => {
  response.sendFile(path.join(__dirname, './public/index.html'));
});

// Displays the notes page
app.get('/notes', (_, response) => {
  response.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET API Routes
// ===================================================

// Read the file where the notes are stored
let storedData = fs.readFileSync('./public/db/db.json', 'utf8');

// Create array to save the notes
let notesArray = JSON.parse(storedData);

// Displays the api route for all the notes
app.get('/api/notes', (_, response) => {
  return response.json(notesArray);
});

// Displays the api route for individual note
app.get('/api/notes/:note', (request, response) => {
  // get what the user types in
  const singleNote = request.params.note;

  // loop through the array to find the title and return the response to the user
  for (var i = 0; i < notesArray.length; i++) {
    if (singleNote === notesArray[i].title) {
      return response.json(notesArray[i]);
    }
  }

  // const findNote = notesArray.find(({ title }) => title === singleNote);

  // Return false is no data comes back
  return response.json(false);
});

// POST Route
// ===================================================

// Creates random ID for note
const id = () => {
  return Math.floor(Math.random() * 200);
};

// Create New Note
app.post('/api/notes', function (request, response) {
  // reads the db.json file
  const data = fs.readFileSync('./public/db/db.json', 'utf8');
  // converts the note strings into an object
  notesArray = JSON.parse(data);

  // creates a new note object
  let newNote = {
    id: id(),
    title: request.body.title,
    text: request.body.text,
  };

  console.log(newNote);

  // pushes new note to the notes array
  notesArray.push(newNote);
  // converts the new note object back to json
  const noteJSON = JSON.stringify(notesArray);

  // writes to the db.json file
  fs.writeFile('./public/db/db.json', noteJSON, 'utf8', (err) => {
    if (err) {
      throw err;
    }
    // sends the new back to the user
    response.json(newNote);
  });
});

// DELETE Route
// ===================================================

// When thetrashcan icon is clicked...
// Deletes the note by the id in the db json file.
app.delete('/api/notes/:id', function (request, response) {
  // req.body is the json id sent from the user
  const deletedNote = request.params.id;

  notesArray = notesArray.filter((note) => {
    return note.id != deletedNote;
  });

  console.log(notesArray);
  const deletedNotes = JSON.stringify(notesArray);

  fs.writeFileSync('./db/db.json', deletedNotes, 'utf8', (err) => {
    if (err) throw err;
  });

  response.json(deletedNotes);
});

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
