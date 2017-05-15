'use strict';


const express = require('express');
const band = require('./lib/bandshw3.js');
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
	let getAll = band.allBands();
	res.render('home', { bands: getAll });
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/search', (req, res) => {
    
	let searchMatch = ''; // declare searchMatch
    
    //set variable to pass to getBand function based on which form values were filled out.
	if(req.query.name){ 
		searchMatch = band.getBand(req.query.name); 
	} else if (req.query.yearsActive){
		searchMatch = band.getBand(req.query.yearsActive);
	} else {
		searchMatch = band.getBand(req.query.genre);
	}
	res.render('detail', { searchResults: searchMatch, searchAction: 'Search Results'});
});

// add route
app.post('/add', (req, res) =>{
	let name = req.body.name; // get value from name field
	let years = req.body.yearsActive; //get value from years field
	let genre = req.body.genre; // get value from genre field
	let addMatch = band.addBand(name, years, genre); // pass form field values to addBand function
	
	res.render('detail', {addResults: addMatch, addAction: 'Band Added' });
});

app.post('/delete', (req, res) => {
	let name = req.body.name; // get value from name field
	let deleteMatch = band.deleteBand(name);
	let results = '';
	
	if (deleteMatch > 1) {
		results = `Band removed, there are ${deleteMatch} bands left`;
	} else if (deleteMatch == 1) {
		results = `Band Removed, there is ${deleteMatch} band left`;
	} else if (deleteMatch == 0) {
		results = 'Band removed, no bands left!';
	} else {
		results = 'Band not found, no bands removed.';
	}
	
	res.render('detail', {deleteResults: results, deleteAction: 'Band Removed'});
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