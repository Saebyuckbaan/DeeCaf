Parse.initialize("WSw9tShiRqVNExj4V7QQ2uxZMGYrZpzqune2fn6i", "RnMNB3sfpKXXQz8j7XTjiruQ7xRl34jwmYvdv89P");

$(document).ready(function ( event ) {

	isUserSignedIn(event);
	appendFirstName(event);

});


$("#signOut").click(signOut);
$("#addNewCoffee").click(goToAddNewCoffeePage);


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

function appendFirstName ( event ){

	var currentUser = Parse.User.current();
	var firstname = currentUser.get("firstname");

	$("#firstname").append(firstname);
	$("#firstname").show();
}


function goToAddNewCoffeePage( event ) {
	window.location.href = "./add-new-coffee.html";

}