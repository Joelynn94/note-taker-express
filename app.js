const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 8080;

app
	.use(express.static("public"))
	.use(express.urlencoded({ extended: true }))
	.use(express.json());

app.get('/', (req, res) => {
	res.sendfile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`)
});