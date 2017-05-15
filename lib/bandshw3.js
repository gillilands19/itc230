'use strict';

let bands = [
    
    {name : 'at the drive-in', yearsActive : 25, genre : 'post hardcore'},
    {name : 'polar bear club', yearsActive : 9, genre : 'pop punk'},
    {name : 'lifetime', yearsActive : 27, genre : 'pop punk'},
    {name : 'supertramp', yearsActive : 47, genre : 'progressive rock'},
    {name : 'the alan parsons project', yearsActive : 15, genre : 'progressive rock'},
    
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