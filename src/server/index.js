var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();

app.use(express.static(__dirname +'./../../'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(4000);

// API
app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname + '/../../index.html'));
});