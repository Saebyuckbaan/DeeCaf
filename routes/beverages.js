var beverages = require('../beverages.json');
var companies = require('../companies.json');


exports.beverage_types = function(req, res) {

	//get the parameter passed 
	var cid = req.param('cid');

	//get beverages JSON object
	var beverageTypeObj = companies["companies"];
	//console.log( beverageTypeObj);
	
	//Sort out beverages that belongs to specific brands
	var selectedCompany;

	for (i = 0; i < beverageTypeObj.length ; i++) {
		if ( beverageTypeObj[i]['cid'] == cid )
		{
			selectedCompany = beverageTypeObj[i]['beverageType'];
		}
	}

	console.log( cid);


	res.render( "types", { 
		type: selectedCompany, 
		selectedCid: cid,
	});
}

exports.beverages = function(req, res) {
	
	//get the parameter passed 
	var bid = req.param( 'bid');
	var beverageObj = beverages["beverages"];
	var cid;
	console.log ( "bid = " + bid );
	//console.log( beverageObj);

	//Sort out beverages that belongs to specific type
	var sortedBeverages = new Array();

	for (i = 0; i < beverageObj.length ; i++) {
		if ( beverageObj[i]['bid'] == bid )
		{
			sortedBeverages.push( beverageObj[i] );
			cid = beverageObj[i]['cid'];
		}

	}

	console.log( cid );

	


	res.render( "beverages", {
		beverages: sortedBeverages,
		selectedCid : cid,
	} );
}

exports.beverage_sizes = function(req, res) {
	
	//get the parameter passed 
	var name = req.param( 'name');
	var beverageObj = beverages["beverages"];
	var bid;
	//Sort out beverages that belongs to specific type
	var selectedBeverage;

	for (i = 0; i < beverageObj.length ; i++) {
		if ( beverageObj[i]['name'] == name )
		{
			selectedBeverage =  beverageObj[i]['fact'] ;
			bid = beverageObj[i]['bid'] ;
		}
	}

	console.log( selectedBeverage );

	res.render( "sizes", {
		sizes: selectedBeverage,
		bid: bid,
	} );
}
