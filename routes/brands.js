var brands = require('../companies.json');

exports.brands = function(req, res) {
	// get a random palette from the top ones
	//var randomPalette = palettes[Math.floor(palettes.length * Math.random())];
	//res.send('Your random palette is called: ' + randomPalette['title']);

	//console.log( brands["companies"]);
	//res.json( brands  );
	var companies = brands["companies"];
	res.render( "brands",{ companies: companies });

}
