Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");


$(document).keypress(function(event) {
	/* Act on the event */
    if (event.keyCode == 13) {
    	console.log( "Enter Pressed ");
		$("#formSubmit").click();    	
        return false;
    }
});


$("#formSubmit").click(submitForm);
$("#forgetPW").click(forgotPassword);

function forgotPassword( event ) {

	alert("Working!");


}

function submitForm( event ) {
	
	var user     = new Parse.User();
	var username = $("#username").val();
	var password = $("#password").val();
	
	console.log (username);
	console.log (password);
	
	Parse.User.logIn( username , password, {
	  success: function(user) {
	    // Do stuff after successful login.
	    console.log ( user.get( "todayscaffeine") );
	    resetIntakeDaily ( user );
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("Login FAILEd")
	  }
	}).then( function () { 
		alert("Login successful")
	    window.location.href = "/";

	});

}

function resetIntakeDaily ( event )
{

	//Variables
	var currentUser = event
	var lastInputTime = currentUser.get("lastInputTime");
	var currentIntake = currentUser.get("todayscaffeine");	
	var todaysDate = new Date ();
	var pastHistory = { 
						"intake" : currentIntake,
						"Date" : lastInputTime
						};

	//Remove all HH:MM:SS to compare date only
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
		currentUser.save();	
	}
}