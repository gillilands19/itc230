'use strict';


const express = require('express');
const band = require('./models/bands.js');
const app = express();
const handlebars = require('express-handlebars');
	//.create({ defaultLayout: 'main'});
const setRoot = {root : __dirname + '/public'}; // set root directory sendFile method
const bodyParser = require('body-parser');


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set the Static file location. __dirname is string that returns the current module's directory path
app.use(require('body-parser').urlencoded({extended : true})); //used to parse form submissions that use POST method
app.use(bodyParser.json());
app.engine( '.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

//start routes

app.get('/', (req, res) => {
	band.find( (err, bands) => {
		if (err) {
			res.status(500).send(err);
		}
		res.render('home', { bands: bands });
	});
});

app.get('/about', (req, res) => {
	res.render('about');
});

//APIs

//find all
app.get('/api/v1/bands', (req, res, next) => {
	band.find( (err, bands) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.json(bands);
	});
});

//find single
app.get('/api/v1/bands/:name', (req, res) => {
	let name = req.params.name;
	band.findOne({name: name}, (err, band) => {
		if (err) {
			return res.send('Database Error');
		}
		if (!band) {
			return res.send('Not Found');
		}
		res.json(band);
	});
});

//remove api route
app.get('/api/v1/remove/:name', (req, res) => {
	let name = req.params.name;
	band.remove({name: name}, (err, items) => {
		if(err){
			return res.send('Database Error');
		}
		band.count((err, total) => {
			res.json({removed: items.result.n, remaining: total});
		});
	});
});

app.get('/api/v1/add/:name/:yearsActive/:genre', (req, res) =>{
	let name = req.params.name; // get value from name field
	let years = parseInt(req.params.yearsActive); //get value from years field
	let genre = req.params.genre; // get value from genre field
	band.find({name: name}, (err, items) => {
		if(err) {
			return res.send('Database Error');
		}
		if(items.length >= 1) {
			res.json({added: 0, status: 'band exists'});
		} else {
			new band({name: name, yearsActive: years, genre: genre}).save(); // pass form field values to addBand function
			res.json({added: 1, status: 'new band'});
		}
	});
});


// set 404 route
app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});



app.listen(app.get('port'), () => {
	console.log( 'Express started on http://localhost:' +
                  app.get('port') + '; press Ctrl+C to terminate.');
});