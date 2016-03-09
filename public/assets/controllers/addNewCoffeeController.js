Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

// ----------------- jQuery Function ----------------- //
$(document).ready(function ( event ) {

	pageTrack();

	isUserSignedIn( event );
	appendSwipe( event );

});

function pageTrack() {
	$('.backBtn').click(backClick);
	$('.homeBtn').click(homeClick);
}

function backClick(e) {
	console.log("Back Clicked!");
	ga('send', 'event', 'back', 'click');
}

function homeClick(e) {
	console.log("Home clicked!");
	ga('send', 'event', 'home', 'click');
}

// Company ( Brand ) selection is Step 1
$("#brands").on("change", function (event ) {
	event.preventDefault();

	//alert("YEAH");
	//console.log(this.id);
	companyID = this.value;
});

$("#toTypes").click( function( event ) {
	event.preventDefault();
	var companyID = $("#brands").val();

	if ( companyID != "description"  )
	{
		selectFromSwipeList ( event, "./types" + "?" + "cid=" + companyID);
	}
});

$("#toBeverages").click( function( event ) {
	event.preventDefault();
	var beverageID = $("#type").find(':selected').data("bid");
	var companyID  = $("#type").val();
	if ( companyID != "description"  )
		selectFromSwipeList ( event, "./beverages" + "?" + "cid=" + companyID + "&bid=" + beverageID);
});

$("#toSizes").click( function( event ) {
	event.preventDefault();
	var companyID    = $("#beverage").find(':selected').data('cid');
	var beverageName = $("#beverage").find(':selected').data("name");
	if ( $("#beverage").find(':selected').val() != "description"  )
		selectFromSwipeList ( event, "./sizes"+ "?" + "cid=" + companyID + "&name=" + beverageName);
});


$("#toComplete").click( function( event ) {
	event.preventDefault();

	// Create Caffeine intake information object
	var caffeineObj;
	var caffeineVal  = $("#size").find(':selected').val();

	if ( caffeineVal != "description"  )
	{
		var companyID    = $("#size").find(':selected').data('cid');
		var beverageID   = $("#size").find(':selected').data('bid');
		var beverageName = $("#size").find(':selected').data('name');
		var size         = $("#size").find(':selected').data("size");


		var currentDate  = new Date();
		var mon          = currentDate.getMonth()+1;
		var day          = currentDate.getDate();
		var year         = currentDate.getFullYear();
		var dateString   = mon + "/" + day + "/" + year;
		console.log(dateString);

		caffeineObj = {
						"name": beverageName,
						"bid": beverageID,
						"cid" : companyID,
						"caffeine" : caffeineVal,
						"size": size,
						"date" : dateString
						};

		showExceedingWarning ( event, caffeineObj );
	}


});

// ----------------- Javascript ---------------------//
function isUserSignedIn ( event ) {

	var currentUser = Parse.User.current();

	if ( !currentUser ) {
	    // show the signup or login page
	    alert("You have to sign in first");
		window.location.href = "./sign-in.html";
	}
	else
	{
		//show name after user

	}

}


function selectFromSwipeList ( event, url ) {
	//$('.page-type').append("<");
	window.location.href = url;
}




function incrementCaffeineIntake( event, caffeineObj ) {
	//Call current user
	var currentUser = Parse.User.current();
	var caffeine = caffeineObj["caffeine"];

	console.log( caffeine);
	if ( currentUser )
	{
		var isFirstCoffee = currentUser.get("isFirstCoffee");
		var newCaffeine = currentUser.get( "todayscaffeine") + Number(caffeine);
		var todaysDate  = new Date();
		var todaysDateWithoutTime = new Date();
		todaysDateWithoutTime.setHours(0,0,0,0);

		//if user drink first coffee of the day, please ask how long have they slept
		if ( isFirstCoffee )
		{
			bootbox.prompt("How long did you sleep last night? (hours)", function(result)
			{
				if (result)
				{
			    	updateIntake( event, caffeine );

			    	//Update both sleep and caffeine intake
			    	updateHistory( event, "sleep", result );
  					updateHistory( event, "caffeine", caffeine);

			    	//Update information
					currentUser.set("todayscaffeine",newCaffeine);
					currentUser.set("lastInputTime", todaysDate);
					currentUser.set("isFirstCoffee", false);
					currentUser.add("drinkHistory",  caffeineObj);
					currentUser.add("sleepHistory",  addSleepingTime(event, result));
					currentUser.save(null, {
					  success: function(user) {
					    // Hooray! Let them use the app now.
					   	selectFromSwipeList ( event, "/");

					  },
					  error: function(user, error) {
					    // Show the error message somewhere and let the user try again.
					    alert("Error: " + error.code + " " + error.message);
					  }
					});

				}
			});
		}
		// If user already has the first cup of coffee for day
		else
		{
			//Just Update information
			updateIntake( event, caffeine );

			//Update caffeine intake
  			updateHistory( event, "caffeine", caffeine);

			currentUser.set("todayscaffeine",newCaffeine);
			currentUser.set("lastInputTime", todaysDate);
			currentUser.add("drinkHistory",  caffeineObj);
			currentUser.save(null, {
			  success: function(user) {
			    // Hooray! Let them use the app now.
			   	selectFromSwipeList ( event, "/");

			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		}

	}
}

function addSleepingTime ( event, sleepTime ){

	var todaysDateWithoutTime = new Date();
	var sleepObj;
	todaysDateWithoutTime.setHours(0,0,0,0);

	sleepObj = {
					"date": todaysDateWithoutTime,
					"sleepTime": sleepTime,
				}

	return sleepObj;
}

function updateIntake ( event, caffeine ){

	var currentUser = Parse.User.current();
	var todaysDateWithoutTime = new Date();
	var array;
	var isUpdated = false;
	todaysDateWithoutTime.setHours(0,0,0,0);

	array = currentUser.get("intakeHistory");

	if(array == undefined) 
	{
		console.log("first time user, no history yet")
		var array = [];
	}
	else 
	{
		$.each( array, function( index, value )
		{
			var date = new Date ( value["date"]);
			console.log( value["date"]);
			console.log( date );
			if ( date.getTime() == todaysDateWithoutTime.getTime() )
			{

				value["intake"] = Number( value["intake"] ) + Number( caffeine );
				isUpdated = true;
				console.log("found, and new value = " + value["intake"]);
				return false;
				//value["intake"] += caffeine;
			}
		});
	}

	if ( !isUpdated )
	{
		var newIntake =
		{
			"date": todaysDateWithoutTime,
			"intake" : caffeine,
			"sleep" : 0,
		};

		array.push ( newIntake );
	}


	currentUser.set("intakeHistory", array );
//	alert(isUpdated);

}


function showExceedingWarning ( event, caffeine ){

	var currentUser = Parse.User.current();
	var isExceeding = false;
	var intakeCaffeine = caffeine["caffeine"];
	if ( currentUser )
	{
		var maxCaffeine = currentUser.get("maxCaffeine");
		var todayscaffeine = currentUser.get("todayscaffeine");
		var intakeRate = ( ( Number( todayscaffeine ) + Number( intakeCaffeine ) ) / Number( maxCaffeine ) ) ;
		// if user consume full amount
		if( intakeRate >= 1 )
		{
			bootbox.confirm("You are having more than your daily recommended caffeine value. Are you sure you want to add?", function(result) {
				if( result )
				{
					incrementCaffeineIntake( event, caffeine );
				}
			});

		}
		else
		{
			incrementCaffeineIntake( event, caffeine );
		}
	}

}





// ---------------- Beta testing functions ---------------- //
/*
* type - "sleep" or "caffeine"
*
*
*/
function updateHistory ( event,  type, newValue ){


	// Declare Variables
	var currentUser = Parse.User.current();
	var statArray;
	var isUpdated = false;
	var todaysDateWithoutTime = new Date();
	todaysDateWithoutTime.setHours(0,0,0,0);

	if( type == "sleep" )
	{
		todaysDateWithoutTime.setDate(todaysDateWithoutTime.getDate() - 1);
	}

	//Try to querying current user's history.
	//if they are empty, create new object
	statArray = currentUser.get("statistics");

	if(typeof statArray == "undefined") {
    	statArray = new Array();
	}
	// if array obejct exist, Loop through them
	else
	{
		$.each( statArray, function( index, value ){
			var date = new Date ( value["date"] );
			if ( date.getTime() == todaysDateWithoutTime.getTime() )
			{
				//update the value according to the type
				switch( type )
				{
					case "sleep":
					{
						value["sleep"] = Number( newValue );
						isUpdated = true;
					}
					break;
					case "caffeine":
					{
						value["intake"] = Number( value["intake"] ) + Number( newValue );
						isUpdated = true;
					}
					break;
					default:
					{
						bootbox.alert("Choice must be sleep or caffeine you dumb programmer");
					}
					break;
				}

			}

		});
	}

	// if currently do not have such a date input
	if ( !isUpdated )
	{
		switch( type )
		{
			case "sleep":
			{
				var newIntake =
				{
					"date": todaysDateWithoutTime,
					"intake" : 0,
					"sleep" : Number( newValue ),
				};
			}
			break;
			case "caffeine":
			{
				var newIntake =
				{
					"date": todaysDateWithoutTime,
					"intake" : Number( newValue ),
					"sleep" : 0,
				};
			}
			break;
			default:
			{
				bootbox.alert("Choice must be sleep or caffeine you dumb programmer");
			}
		}


		statArray.push ( newIntake );
	}

	statArray.sort( function( a, b )
	{
	    var keyA = new Date(a.date),
	        keyB = new Date(b.date);
	    // Compare the 2 dates
	    if(keyA < keyB) return -1;
	    if(keyA > keyB) return 1;
	    return 0;
	});

	currentUser.set("statistics", statArray );
}
