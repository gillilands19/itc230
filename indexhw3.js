'use strict';


const express = require('express');
//const fs = require('fs');
//const qs = require('querystring')
const band = require('./lib/bandshw3.js');

const app = express();
const setRoot = {root : __dirname + '/public'};

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set the Static file location. __dirname is string that returns the current module's directory path
app.use(require('body-parser').urlencoded({extended : true})); //used to parse form submissions that use POST method


   /* function serveStaticFile(res, path, contentType, responseCode) {
        if(!responseCode) responseCode = 200;
        fs.readFile(__dirname + path, function(err, data) {
            if(err) {
                res.writeHead(500, { 'Content-Type' : 'text/plain' });
                res.end('500 - Internal Error');
            } else {
                res.writeHead(responseCode, { 'Content-Type' : contentType });
                res.end(data);
            }
        });
    }*/

app.get('/', function(req, res){
    res.sendFile('/home2.html', setRoot);
});

app.get('/search', function(req, res){
    res.type('text/plain');
    let searchMatch = '';
    if(req.query.name){ 
        searchMatch = band.getBand(req.query.name);
    } else if (req.query.yearsActive){
        searchMatch = band.getBand(req.query.yearsActive);
    } else {
        searchMatch = band.getBand(req.query.genre);
    }
    res.send(searchMatch);
});

app.post('/add', function(req, res){
    res.type('text/plain');
    let name = req.body.name;
    let years = req.body.yearsActive;
    let genre = req.body.genre;
    let addMatch = band.addBand(name, years, genre);
    res.send(addMatch);
});

app.post('/delete', function(req, res){
    res.type('text/plain');
    let name = req.body.name;
    let deleteMatch = band.deleteBand(name);
    res.send(deleteMatch);
});

app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});



app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
                  app.get('port') + '; press Ctrl+C to terminate.');
});

/*
http.createServer((req, res) => {
    //normalize url by removing querystring, optional
    // trailing slash, and making it lowercase
    let path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    let splitUrl = req.url.split('?');
    let bandParam = qs.parse(splitUrl[1]);
    switch(path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html' );
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/search':
            let searchMatch = band.getBand(bandParam.name);
            res.writeHead(200, { 'Content-Type' : 'text/plain' });
            res.end(searchMatch);
            break;
        case '/delete':
            let deleteMatch = band.deleteBand(bandParam.name);
            res.writeHead(200, { 'Content-Type' : 'text/plain' });
            res.end(deleteMatch);
            break;
        case '/add':
            let addMatch = band.addBand(bandParam.name);
            res.writeHead(200, { 'Content-Type' : 'text/plain' });
            res.end(addMatch);
        default:
            res.writeHead(404, { 'Content-Type' : 'text/plain' });
            res.end('Not Found');
            break;
               }
}).listen(3000);
console.log('Server started on localhost:3000; Press Ctrl-C to terminate....');
*/
