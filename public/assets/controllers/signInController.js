Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");



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
	    alert("Login successful")
	    window.location.href = "/";
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("Login FAILEd")
	  }
	});

}