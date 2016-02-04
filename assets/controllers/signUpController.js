Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$("#formSubmit").click(submitForm);

function submitForm( event ) {
	console.log ($("#newUsername").val());
	console.log ($("#newPassword").val());
	console.log ($("#newEmail").val());
	console.log ($("#newFirstname").val());
	console.log ($("#newLastname").val());
	console.log ($("#newWeight").val());
	
	var user = new Parse.User();
	user.set("username" , $("#newUsername").val());
	user.set("password" , $("#newPassword").val());
	user.set("email"    , $("#newEmail").val());
	user.set("firstname", $("#newFirstname").val());
	user.set("lastname" , $("#newLastname").val());
	user.set("weight"   , $("#newWeight").val());

	user.signUp(null, {
	  success: function(user) {
	    // Hooray! Let them use the app now.
	    alert("You are successfully signed up!");

	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});

}