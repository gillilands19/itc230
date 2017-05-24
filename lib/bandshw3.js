'use strict';

let bands = [
    
    {name : 'At The Drive-in', yearsActive : 25, genre : 'Post Hardcore'},
    {name : 'Polar Bear Club', yearsActive : 9, genre : 'Pop Punk'},
    {name : 'Lifetime', yearsActive : 27, genre : 'Pop Punk'},
    {name : 'Supertramp', yearsActive : 47, genre : 'Progressive Rock'},
    {name : 'The Alan Parsons Project', yearsActive : 15, genre : 'Progressive Rock'},
    
];

exports.getBand = function(name) {
	const foundBand = bands.find(band => {
		if(name == band.name || name == band.yearsActive || name == band.genre){
			return band;
		}
	});
	return foundBand;
};

exports.deleteBand = function(name) {
	const getIndex = bands.findIndex(band => {
		return name == band.name;
	});
	if(getIndex >= 0){
		const removeBand = bands.splice(getIndex, 1);
		return bands.length;
	} else {
		return;
	}
};

exports.addBand = function(name, years, genre) {
	const findBand = bands.find(band => {
		return name == band.name;
	});
	if(!findBand){
		let newBand = bands.push({name : name, yearsActive : years, genre : genre});
		return bands[newBand - 1];
	}
};

exports.allBands = function() {
	return bands;
};

exports.searchBands = function(name) {
	let regex = new RegExp(name, 'i');
	const searchAll = bands.filter( band => {
		if (regex.test(band.genre) || regex.test(band.name) || regex.test(band.yearsActive)) {
			return band;
		}
	});
	return searchAll;
};