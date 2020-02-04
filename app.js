const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
app.use(express.static('public'))
const PORT = process.env.PORT || 8080;

app
	.use(express.urlencoded({ extended: true }))
	.use(express.json());

app.use('/*', (req, res) => {
	res.sendfile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`)
});