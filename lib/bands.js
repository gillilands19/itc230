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
        return name == band.name;
        });
    if(foundBand) {
        return `Found Match: ${foundBand.name}, Years Active: ${foundBand.yearsActive}, Genre: ${foundBand.genre}`;
    }
    else {
        return 'No Matches!';
    }
}


exports.deleteBand = function(name) {
    const getIndex = bands.findIndex(band => {
        return name == band.name;
    });
    if(getIndex >= 0){
        const removeBand = bands.splice(getIndex, 1);
        if(bands.length > 1){
            return `Found and removed ${name}, there are now ${bands.length} bands.`;
        } else {
            return `Found and removed ${name}, there is only ${bands.length} band left!`;
        }
    } else {
        return `${name} not found, no bands removed!`;
    }
}

exports.addBand = function(name) {
    const findBand = bands.find(band => {
        return name == band.name;
    });
    if(findBand){
        return `${name} already exists! Please try another band.`
    } else {
        /*let newName = prompt('Enter The Band Name: ');
        let newYears = prompt('How many years have they been active?');
        let newGenre = window.prompt('What genre is the band?');
        let newBand = {name : newName, yearsActive : newYears, genre : newGenre};*/ 
        bands.push({name : name, yearsActive : '?', genre : '?'});
        return `${name} has been added, Thanks for the entry!`;
    }
}