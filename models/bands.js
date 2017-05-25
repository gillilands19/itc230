let fs = require('fs');
let config = require('../lib/config.js');
let tunnel = require('tunnel-ssh');
let mongoose = require('mongoose');


let sshTunnel = tunnel(config.sshConfig, (error, server) => {
	if(error) {
		console.log('ssh connection error:' + error);
	}
	
	mongoose.connect(config.mongo.development.connectionUrl);
	
	let db = mongoose.connection;
	db.on('error', console.error.bind(console, 'DB connection error:'));
	db.once('open', () => {
		console.log('DB connection successful');
	});
});

let bandSchema = mongoose.Schema({
	name: String,
	yearsActive: Number,
	genre: String,
});

module.exports = mongoose.model('Band', bandSchema); 