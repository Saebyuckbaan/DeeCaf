Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");


$(document).keypress(function(event) {
	/* Act on the event */
    if (event.keyCode == 13) {
		$("#formSubmit").click();    	
        return false;
    }
});


$("#formSubmit").click(submitForm);
$("#forgetPW").click(forgotPassword);

function forgotPassword( event ) {

	bootbox.prompt("What is your email address?", function(result) {                
	  if (result) {
	  	Parse.User.requestPasswordReset( result , {
		  success: function() {
		  	bootbox.alert("Email sent to your email address!");
		  },
		  error: function(error) {
		    // Show the error message somewhere
		    bootbox.alert("Error: " + error.message);
		  }
		});
	                              
	  }
	});

}

function submitForm( event ) {
	
	var user     = new Parse.User();
	var username = $("#username").val();
	var password = $("#password").val();
		
	Parse.User.logIn( username , password, {
	  success: function(user) {
	    // Do stuff after successful login.
	    resetIntakeDaily ( user );
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    //bootbox.alert("Sign In Failed: username or password is incorrect");
	    bootbox.alert("Sign In Failed: " + error.message);
	  }
	}).then( function () { 
		bootbox.alert("Sign In successful", function(){

		    window.location.href = "/";			
		});


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
		currentUser.save();	
	}
}