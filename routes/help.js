var helps = require('../help.json');

exports.view = function(req, res){

	var help = helps["helps"];
	
	console.log("help = " + helps["helps"]);
	res.render('help', {
		"helps": help
	});
}
