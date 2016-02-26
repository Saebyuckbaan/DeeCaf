Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$("#formSubmit").click(submitForm);




function submitForm( event ) {

	var user = new Parse.User();
	user.set("username" , $("#newUsername").val());
	user.set("password" , $("#newPassword").val());
	user.set("email"    , $("#newEmail").val());
	user.set("firstname", $("#newFirstname").val());
	user.set("lastname" , $("#newLastname").val());
	user.set("weight"   , $("#newWeight").val());
	

	// Initialize with empty or initial variable
	user.set("isFirstCoffee"  , true );
	user.set("todayscaffeine" , 0    );
	user.set("intakeHistory"  , []   );
	user.set("sleepHistory"   , []   );
	user.set("drinkHistory"   , []   );
	user.set("statistics"     , []   );
	user.set("lastInputTime"  , new Date() );

	user.signUp(null, {
	  success: function(user) {
	    // Hooray! Let them use the app now.
	    bootbox.alert("You are successfully signed up!", function(){

		    window.location.href = "/sign_in";	    	
	    });


	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    bootbox.alert("Sign Up Error: " + error.message);
	  }
	});

}