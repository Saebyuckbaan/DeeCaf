var companies = require('../companies.json');

exports.companies = function(req, res) {
	// get a random palette from the top ones
	//var randomPalette = palettes[Math.floor(palettes.length * Math.random())];
	//res.send('Your random palette is called: ' + randomPalette['title']);
	res.json( companies  );
}