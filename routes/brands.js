var brands = require('../companies.json');

exports.brands = function(req, res) {
	// get a random palette from the top ones
	//var randomPalette = palettes[Math.floor(palettes.length * Math.random())];
	//res.send('Your random palette is called: ' + randomPalette['title']);

	console.log( "Beverage brands ");
	//res.json( brands  );

	res.render( "brands",{});
}
