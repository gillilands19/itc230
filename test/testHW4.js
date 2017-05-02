const expect = require('chai').expect;
const band = require ('../lib/bandshw3.js');

describe('Bands Module', () => {
	it ('getBand returns requested band', () => {
		let result = band.getBand('at the drive-in');
		expect(result).to.deep.equal({name: 'at the drive-in', yearsActive: 25, genre: 'post hardcore'});
	});
	
	it ('getBand fails with invalid band.', () => {
		let result = band.getBand('invalid');
		expect(result).to.be.undefined;
	});
	
	it ('deleteBand returns length of bands array on successful removal.', () => {
		let result = band.deleteBand('lifetime');
		expect(result).to.deep.equal(4);
	});
	
	it ('deleteBand fails if band doesn\'t exist', () => {
		let result = band.deleteBand('ashanti');
		expect(result).to.be.undefined;
	});
	
	it ('addBand adds and returns new band as object', () =>{
		let result = band.addBand('the beatles', 50, 'rock and roll');
		expect(result).to.deep.equal({name: 'the beatles', yearsActive: 50, genre: 'rock and roll'});
	});
	
	it ('addBand fails if band already exists', () => {
		let result = band.addBand('at the drive-in', 27, 'post hardcore');
		expect(result).to.be.undefined;
	});
});

