let band = require('./models/bands.js');

 	/*new band ({name : 'At The Drive-in', yearsActive : 25, genre : 'Post Hardcore'}).save();
    new band ({name : 'Polar Bear Club', yearsActive : 9, genre : 'Pop Punk'}).save();
    new band ({name : 'Lifetime', yearsActive : 27, genre : 'Pop Punk'}).save();
    new band ({name : 'Supertramp', yearsActive : 47, genre : 'Progressive Rock'}).save();
    new band ({name : 'The Alan Parsons Project', yearsActive : 15, genre : 'Progressive Rock'}).save();*/

band.find(function(err, bands) {
    if (err) {
        console.log(err);
    } else {
        return bands;
    }
});

band.remove({ name : 'N.W.A' }, (err, result) => {
	if(err) {
		return next(err);
	}
});

band.count((err, result) => {
	console.log(result);
});