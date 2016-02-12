var brands = require('../companies.json');

exports.menu = function(req, res) {

	//console.log( "Beverage brands ");
	res.render( "menu", {} );
}
