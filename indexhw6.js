'use strict';


const express = require('express');
const band = require('./models/bands.js');
const app = express();
const handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main'});
const setRoot = {root : __dirname + '/public'}; // set root directory sendFile method


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set the Static file location. __dirname is string that returns the current module's directory path
app.use(require('body-parser').urlencoded({extended : true})); //used to parse form submissions that use POST method

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

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

app.get('/search', (req, res) => {
	if(req.query.name) {
		band.find({ name: req.query.name }, (err, items) => {
			res.render('detail', { searchResults: items, searchAction: 'Search Results'});
		});
	}else if (req.query.yearsActive) {
		band.find({ yearsActive: req.query.yearsActive}, (err, items) => {
			res.render('detail', { searchResults: items, searchAction: 'Search Results'});
		});
	} else {
		band.find({ genre: req.query.genre }, (err, items) => {
			res.render('detail', { searchResults: items, searchAction: 'Search Results'});
		});
	}
});

// add route
app.post('/add', (req, res) =>{
	let name = req.body.name; // get value from name field
	let years = parseInt(req.body.yearsActive); //get value from years field
	let genre = req.body.genre; // get value from genre field
	band.find({name: name}, (err, items) => {
		if(items.length >= 1) {
			res.render('detail', {addAction: 'Band Added'});
		} else {
			new band({name: name, yearsActive: years, genre: genre}).save(); // pass form field values to addBand function
			res.render('detail', {addResults: name, addAction: 'Band Added' });
		}
	});
});

app.post('/delete', (req, res) => {
	let name = req.body.name;
	band.remove({name: name}, (err, items) => {
		band.count((err, total) => {
		res.render('detail', {deleteResults: items, deleteAction: 'Band Removed', total: total});
		});
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