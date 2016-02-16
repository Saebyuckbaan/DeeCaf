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

});
$("#signOut").click(signOut);
$("#addNewCoffee").click(goToAddNewCoffeePage);



//------------------- Javascript Functions --------------//
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

	window.location.href = "./sign_in";

	var currentUser = Parse.User.current();  // this will now be null

}


function isUserSignedIn ( event ) {

	var currentUser = Parse.User.current();

	if ( !currentUser ) {
	    // show the signup or login page
	    alert("You have to sign in first");
		window.location.href = "./sign_in";
	}
	else
	{
		//show name after user

	}

}

function appendFirstName ( event ){

	var currentUser = Parse.User.current();
	var firstname = currentUser.get("firstname");

	$("#firstname").append(firstname);
	$("#firstname").show();
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
	var weight = currentUser.get("weight");	
	var currentIntake = currentUser.get("todayscaffeine");
	var ratio;

	if ( currentUser ) {
	    maxCaffeine = 2.72155 * weight;
	    ratio = parseInt( ( currentIntake / maxCaffeine ) * 100 );
	    $("#maxCaffeine").append( currentIntake + " mg" + " / " + parseInt(maxCaffeine) + "mg" );

	    if ( ratio == 0 )
	    	ratio = "10%";
	    else if ( ratio < 100 )
	    	ratio += "%";
	    else
	    	ratio = "100%";
	    
	     $('.waterFill').animate({
        	height: ratio
    	}, 1000);
	 }

}


function resetIntakeDaily ( event )
{

	var currentUser = Parse.User.current();
	var lastInputTime = currentUser.get("lastInputTime");
	var currentIntake = currentUser.get("todayscaffeine");	
	var todaysDate = new Date ();
	var pastHistory = { 
						"intake" : currentIntake,
						"Date" : lastInputTime
						};

	todaysDate.setHours(0,0,0,0);
	lastInputTime.setHours(0,0,0,0);

	if ( ( lastInputTime.getTime() < todaysDate.getTime() ) && ( currentIntake != 0 ) )
	{
		//Reset the today's caffeine input into 0
		currentUser.set("todayscaffeine", 0 );

		//update last input time
		currentUser.set("lastInputTime", todaysDate);

		// Add current intake to past History
		currentUser.add("intakeHistory", pastHistory);

		//Push new user data into Parse.com DB
		currentUser.save().then( function ( ) { location.reload();});
		
	}
}