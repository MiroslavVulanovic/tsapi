// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:date([0-9]*)', function(req, res) {
	var result = { "unix": null, "natural": null };
	var timestamp = parseInt(req.params.date);

	var date = new Date(timestamp * 1000);
	result.unix = timestamp;
	result.natural = (months[date.getMonth()]) + ' ' + date.getDate() + ', ' + date.getFullYear();

	res.send(result);
});

app.get('/:natString([a-zA-Z]*)', function(req, res) {
	var result = { "unix": null, "natural": null };
	var dateArr = req.params.natString.split(' ');

	if (months.indexOf(dateArr[0]) > -1) {
		var month = months.indexOf(dateArr[0]);
		var day = dateArr[1].replace(',', '');
		var year = dateArr[2];

		var date = new Date(year, month, day);
		result.unix = date.getTime() / 1000;
		result.natural = (months[date.getMonth()]) + ' ' + date.getDate() + ', ' + date.getFullYear();

		res.send(result);
	}

	res.send(result);
});




// your first API endpoint... 
//app.get("/api/hello", function (req, res) {
// res.json({greeting: 'hello API'});
//});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});