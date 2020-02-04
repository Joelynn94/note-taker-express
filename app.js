const express = require("express");
const fs = require("fs");
const path = require("path");

// const noteRoutes = require('./routes/notes')
const homeRoute = require('./routes/html')

const app = express();
const PORT = process.env.PORT || 8080;

app
	.use(express.urlencoded({ extended: true }))
	.use(express.json())
	// .use(noteRoutes)
	.use(homeRoute);


app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`)
});