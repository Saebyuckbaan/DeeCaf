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
			console.log ( "beverageTypeObj[i]['cid'] == cid = ", beverageTypeObj[i]['cid'] == cid);
			console.log ( "beverage = " + beverageTypeObj[i]['name'] + " CID =" + beverageTypeObj[i]['cid'] );
			selectedCompany = beverageTypeObj[i]['beverageType'];
			selectedCompany
		}
	}


	res.render( "types", { 
		type: selectedCompany, 
		selectedCid: cid,
	});
}

exports.beverages = function(req, res) {
	
	//get the parameter passed 
	var bid         = req.param( 'bid');
	var beverageObj = beverages["beverages"];
	var cid         = req.param( 'cid' );

	//Sort out beverages that belongs to specific type
	var sortedBeverages = new Array();

	console.log ( "bid = " + bid + " cid = " + cid);

	// Get all beverages information according to the bid
	for (i = 0; i < beverageObj.length ; i++) {
		if ( beverageObj[i]['bid'] == bid && beverageObj[i]['cid'] == cid  )
		{
			sortedBeverages.push( beverageObj[i] );
		}

	}


	
	//Render the handlebar page using following passed value
	res.render( "beverages", {
		beverages: sortedBeverages,
		selectedCid : cid,
	} );
}

exports.beverage_sizes = function(req, res) {
	
	//get the parameter passed 
	var name        = req.param( 'name');
	var cid         = req.param( 'cid');
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

	res.render( "sizes", {
		sizes: selectedBeverage,
		bid: bid,
		cid: cid,
		name: name,
	} );
}
