Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

// ----------------- jQuery Function ----------------- //
$(document).ready(function ( event ) {

	isUserSignedIn( event );
	appendSwipe( event );
	$('.bxslider').bxSlider({

  	});

});



$("#signOut").click(signOut);

// Company ( Brand ) selection is Step 1
$(".company").click( function (event ) {
	event.preventDefault();

	//console.log(this.id);
	companyID = this.id;
	selectFromSwipeList ( event, "./types" + "?" + "cid=" + companyID);
});

// Type of Beverage selection is Step 2
$(".type").click( function (event ) {
	event.preventDefault();
	beverageID = this.id;
	companyID = $(this).data('cid');
//	console.log($(this).data('cid'));
	//beverageId = this.id;
	selectFromSwipeList ( event, "./beverages" + "?" + "cid=" + companyID + "&bid=" + beverageID);
});

// Beverage Selection is Step 3
$(".beverage").click( function (event ) { //future class for beverage.handlebars = .beverage
	event.preventDefault();
	//console.log(this.id);

	companyID = $(this).data('cid');
	beverageName = this.id;
	selectFromSwipeList ( event, "./sizes"+ "?" + "cid=" + companyID + "&name=" + beverageName);
});

//Size Selection is Step 4
$(".size").click( function ( event ) { //future class for size.handlebars = .size
	event.preventDefault();


	// Create Caffeine intake information object
	var caffeineObj;
	var caffeineVal = $(this).val();
	var companyID = $(this).data('cid');
	var beverageID = $(this).data('bid');
	var beverageName = $(this).data('name');
	var size = $(this).data("size");
	var currentDate = new Date();

	caffeineObj = {
					"name": beverageName,
					"bid": beverageID,
					"cid" : companyID,
					"caffeine" : caffeineVal,
					"size": size,
					"date" : currentDate
					};

	showExceedingWarning ( event, caffeineObj );

});

// ----------------- Javascript ---------------------//
function signOut( event ) {


	var currentUser = Parse.User.current();

	if (currentUser) {
		//log out when user is sign in
		alert("You are successfully sign out");
	    Parse.User.logOut();
	} else {
	    // show the signup or login page
	    alert("You have to sign in first");
	}

	window.location.href = "./sign-in.html";

	var currentUser = Parse.User.current();  // this will now be null

}



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

function appendSwipe ( event ) {
	// pure JS
	var elem = document.getElementById('mySwipe');
	window.mySwipe = Swipe(elem, {
	  // startSlide: 4,
	  // auto: 3000,
	  // continuous: true,
	  // disableScroll: true,
	  // stopPropagation: true,
	  // callback: function(index, element) {},
	  // transitionEnd: function(index, element) {}
	});
}


function selectFromSwipeList ( event, url ) {
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

		console.log ( "year = " + todaysDateWithoutTime.getFullYear() );
		console.log ( "Day = " + todaysDateWithoutTime.getDay() );
		console.log ( "Date = " + todaysDateWithoutTime.getDate() );
		console.log ( "Month = " + todaysDateWithoutTime.getMonth() );

		//if user drink first coffee of the day, please ask how long have they slept
		if ( isFirstCoffee )
		{
			bootbox.prompt("How long have you slept last night?", function(result)
			{
				if (result)
				{
			    	console.log ( "Your sleep time = " + result);
			    	updateIntake( event, caffeine );
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
			currentUser.set("todayscaffeine",newCaffeine);
			currentUser.set("lastInputTime", todaysDate);
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

	$.each( array, function( index, value ){

		var date = new Date ( value["date"]);
		console.log( value["date"]);
		console.log( date);
		if ( date.getTime() == todaysDateWithoutTime.getTime() )
		{
			
			value["intake"] = Number( value["intake"] ) + Number( caffeine );
			isUpdated = true;
			console.log("found, and new value = " + value["intake"]);
			//value["intake"] += caffeine;
		}

	});

	if ( !isUpdated )
	{
		var newIntake = 
		{
			"date": todaysDateWithoutTime,
			"intake" : caffeine,
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
		var intakeRate = parseInt( 100 * ( ( todayscaffeine + intakeCaffeine ) / maxCaffeine ) ) ;

		// if user consume full amount
		if( intakeRate >= 100 )
		{
			bootbox.confirm("You may have caffeine overdoes. Are you sure?", function(result) {
				if( result )
				{
					incrementCaffeineIntake( event, caffeine );
				}
				else
				{
					console.log( "NAH ");
				}
			});

		}
		else
		{
			incrementCaffeineIntake( event, caffeine );
		}
	}

}
