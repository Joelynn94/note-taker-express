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
app.get('/', (_, res) => {
	res.sendfile(path.join(__dirname, "./public/index.html"));
});

// Displays the notes page
app.get("/notes", (_, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays the api route for the notes 
app.get("/api/notes", (_, res) => {
	const storedData = fs.readFileSync("./public/db/db.json", "utf8");
	return res.json(JSON.parse(storedData));
});

// Starts the server to begin listening on the port
// ===================================================
app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`)
});