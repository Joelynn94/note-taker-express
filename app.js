// Dependencies 
// ===================================================
const express = require("express");
const fs = require("fs");
const path = require("path");

// Sets up the Express App
// ===================================================
const app = express();
const PORT = process.env.PORT || 8080;

app
	.use(express.urlencoded({ extended: true }))
	.use(express.static("public"))
	.use(express.json());

// Routes
// ===================================================

// Displays the index page
app.get('/', (_, response) => {
	response.sendfile(path.join(__dirname, "./public/index.html"));
});

// Displays the notes page
app.get("/notes", (_, response) => {
	response.sendFile(path.join(__dirname, "./public/notes.html"));
});


// Create a new array to save the notes
let notesArray = [];
// Read the file where the notes are stored
let storedData = fs.readFileSync("./public/db/db.json", "utf8");

// Displays the api route for all the notes 
app.get("/api/notes", (_, response) => {
	return response.json(JSON.parse(storedData));
});

// Displays the api route for individual note
app.get("/api/notes/:note", (request, response) => {
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

// Create New Note 
app.post("/api/notes", function(request, response) {
	// req.body is the json post sent from the user 
	const newNote = request.body;

	// reads the db.json file
	const data = fs.readFileSync("./public/db/db.json", "utf8");
	// converts the note strings into an object
	notesArray = JSON.parse(data);

	// pushes new note to the notes array
	notesArray.push(newNote);
	// converts the new note object back to json
	const noteJSON = JSON.stringify(notesArray);

	// writes to the db.json file
	fs.writeFileSync("./public/db/db.json", noteJSON, "utf8", err => {
		if (err) {
			throw err;
		}
	});

});

// Starts the server to begin listening on the port
// ===================================================
app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`)
});