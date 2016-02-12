var beverages = require('../beverages.json');
var companies = require('../companies.json');


exports.beverage_types = function(req, res) {

	//get the parameter passed 
	var cid = req.param( 'cid');

	//get beverages JSON object
	var beverageTypeObj = companies["companies"];
	//console.log( beverageTypeObj);
	
	//Sort out beverages that belongs to specific brands
	var selectedCompany;

	for (i = 0; i < beverageTypeObj.length ; i++) {
		if ( beverageTypeObj[i]['cid'] == cid )
			selectedCompany = beverageTypeObj[i]['beverageType'];
	}

	console.log( selectedCompany);


	res.render( "types", { 
		type: selectedCompany, 
		selectedCid : cid,
	});
}

exports.beverages = function(req, res) {
	
	//get the parameter passed 
	var type = req.param( 'type');
	var beverageObj = beverages["beverages"];
	console.log ( "type = " + type );
	//console.log( beverageObj);

	//Sort out beverages that belongs to specific type
	var sortedBeverages = new Array();

	for (i = 0; i < beverageObj.length ; i++) {
		if ( beverageObj[i]['type'] == type )
			sortedBeverages.push( beverageObj[i] );
	}

	console.log( sortedBeverages );

	


	res.render( "beverages", {
		beverages: sortedBeverages
	} );
}

exports.beverage_sizes = function(req, res) {
	
	//get the parameter passed 
	var name = req.param( 'name');
	var beverageObj = beverages["beverages"];
	
	//Sort out beverages that belongs to specific type
	var selectedBeverage;

	for (i = 0; i < beverageObj.length ; i++) {
		if ( beverageObj[i]['name'] == name )
			selectedBeverage =  beverageObj[i]['fact'] ;
	}

	console.log( selectedBeverage );

	res.render( "sizes", {
		sizes: selectedBeverage
	} );
}
