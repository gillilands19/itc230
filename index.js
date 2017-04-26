'use strict';


const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const band = require('./lib/bands.js');

function serveStaticFile(res, path, contentType, responseCode) {
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
}

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
