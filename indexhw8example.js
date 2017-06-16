'use strict'

let express = require("express");
let bodyParser = require("body-parser");
let Book = require("./models/bands.js"); // use database model

let app = express();

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err);
});

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html' }));
app.set("view engine", ".html");

app.get('/', (req,res) => {
    Book.find((err, bands) => {
        if (err) return next(err);
        res.render('home', {bands: JSON.stringify(bands)});    
    })
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

// api's
app.get('/api/v1/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Book.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});


/*app.get('/api/v1/delete/:id', (req,res, next) => {
    Book.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});*/

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

//find all
app.get('/api/v1/bands', (req, res, next) => {
	band.find( (err, bands) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.json(bands);
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

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});