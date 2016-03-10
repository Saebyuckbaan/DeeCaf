Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

//--------------- jQuery Functions ----------------?/
$(document).ready(function ( event ) {

	//Check user login status
	isUserSignedIn(event);
	//Check if day passed
	resetIntakeDaily(event);

	//Append name of the user and show the coffee rate
	appendFirstName(event);
	calculateMaxCaffeineIntake(event);
	appendWarning(event);

});
$("#addNewCoffee").click(goToAddNewCoffeePage);



//------------------- Javascript Functions --------------//
function isUserSignedIn ( event ) {

	var currentUser = Parse.User.current();

	if ( !currentUser ) {
	    // show the signup or login page
	    bootbox.alert("You have to sign in first", function(){
			window.location.href = "./sign_in";

	    });

	}
	else
	{
		//show name after user

	}

}

function appendFirstName ( event ){

	var currentUser = Parse.User.current();
	if ( currentUser )
	{
		var firstname = currentUser.get("firstname");

		$("#firstname").append(firstname);
		$("#firstname").show();
	}

}


function appendWarning ( event ){

	var currentUser = Parse.User.current();
	if ( currentUser )
	{
		var maxCaffeine = currentUser.get("maxCaffeine");
		var todayscaffeine = currentUser.get("todayscaffeine");
		var intakeRate = parseInt( 100 * ( todayscaffeine / maxCaffeine ) ) ;

		// if user consume full amount
		if( intakeRate >= 100 )
		{
			$("#danger").show();
			$("#warning").hide();
		}
		//if user consume 80% of daily recommendation
		else if ( intakeRate >= 80 )
		{
			$("#danger").hide();
			$("#warning").show();
		}
		else
		{
			$("#danger").hide();
			$("#warning").hide();
		}

//		$("#firstname").append(firstname);
//		$("#firstname").show();
	}

}



function goToAddNewCoffeePage( event ) {

	window.location.href = "./brands";

}

function water( event ){
    $('.waterFill').animate({
        height: '75%'
    }, 1000)
}

function calculateMaxCaffeineIntake ( event ) {

	var maxCaffeine
	var currentUser = Parse.User.current();

	if ( currentUser )
	{

		var weight        = currentUser.get("weight");
		var currentIntake = currentUser.get("todayscaffeine");
		var ratio;

		maxCaffeine       = 2.72155 * weight;
		var remainingIntake = maxCaffeine - currentIntake;

	    currentUser.set("maxCaffeine", parseInt(maxCaffeine));
	    currentUser.save();

	    ratio = parseInt( ( currentIntake / maxCaffeine ) * 100 );
	   // $("#maxCaffeine").append( currentIntake + " mg" + " / " + parseInt(maxCaffeine) + "mg" );

	    if ( ratio == 0 )
	    	ratio = "10%";
	    else if ( ratio < 100 )
	    	ratio += "%";
	    else
	    	ratio = "100%";

			if(currentIntake == undefined) {
				console.log("first time user, no data yet")
			}
			else {
				$('.waterFill').animate({
         	height: ratio
     		}, 1000);
			}

	    appendIntakeReport( currentIntake, parseInt(maxCaffeine), parseInt(remainingIntake));
	 }

}

function appendIntakeReport ( current, max, remaining)
{
	//Clear
	$("#current").empty();
	$("#max").empty();
	$("#remaining").empty();

	//append
	if(current == undefined)
		$("#current").append(0);
	else {
		$("#current").append( current );
	}
	$("#max").append( max );
	if(remaining > 0) {
		$("#remaining").css("color", "#00FF00");
	} else {
		$("#remaining").css("color", "#FF0000")
	}
	$("#remaining").append( remaining );
}


function resetIntakeDaily ( event )
{

	var currentUser = Parse.User.current();
	if( currentUser )
	{
		var lastInputTime = currentUser.get("lastInputTime");
		var currentIntake = currentUser.get("todayscaffeine");
		var todaysDate = new Date ();
		var pastHistory = {
							"intake" : currentIntake,
							"date" : lastInputTime
							};

		todaysDate.setHours(0,0,0,0);
		if ( typeof lastInputTime == "undefined")
			lastInputTime = new Date();

		lastInputTime.setHours(0,0,0,0);

		if ( ( lastInputTime.getTime() < todaysDate.getTime() ) && ( currentIntake != 0 ) )
		{
			//Reset the today's caffeine input into 0
			currentUser.set("todayscaffeine", 0 );

			//update last input time
			currentUser.set("lastInputTime", todaysDate);

			// Add current intake to past History
			currentUser.add("intakeHistory", pastHistory);

			//Reset first coffee boolean
			currentUser.set("isFirstCoffee", true);

			//Push new user data into Parse.com DB
			currentUser.save().then( function ( ) { location.reload();});

		}
	}
}
